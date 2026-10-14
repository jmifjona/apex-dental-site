// Tests for api/enquiry.js - run with:  node --test scripts/test-enquiry.mjs
// (Kept out of api/: every file there becomes a deployed function.)
//
// VECTOR_* is the same fixed vector the Jarvis backend's tests check (tests/test_web_enquiry.py):
// same secret, timestamp and UTF-8 body give the same hex on both sides, so a signature made here
// is one Jarvis accepts.
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { test } from 'node:test';

import handler, { cleanFields, forward, originAllowed, sign } from '../api/enquiry.js';

const SECRET = 'dummy-secret-for-tests-only';
const VECTOR_TS = '1760450000';
const VECTOR_BODY = '{"form":"appointment","name":"Jane Testa","phone":"99000001","message":"Ħ café 🦷"}';
const VECTOR_SIG = 'bed0a93d0b5151d0647c540c7de94f90d177f6796920469565a0ec3eba56734e';

test('the signature matches the shared vector', () => {
  const body = JSON.stringify({ form: 'appointment', name: 'Jane Testa', phone: '99000001', message: 'Ħ café 🦷' });
  assert.equal(body, VECTOR_BODY);
  assert.equal(sign(SECRET, VECTOR_TS, body), VECTOR_SIG);
});

test('forward signs exactly the bytes it sends, as Jarvis verifies them', async () => {
  let seen;
  const fetchImpl = async (url, init) => {
    seen = { url, init };
    return { status: 202 };
  };
  const fields = cleanFields({ form: 'contact', name: 'Jane Testa', phone: '99000001', message: 'Ħ café 🦷' });
  const status = await forward(fields, { url: 'https://jarvis.example/web/enquiry', secret: SECRET, fetchImpl, now: () => 1760450000123 });
  assert.equal(status, 202);
  assert.equal(seen.init.headers['X-Jarvis-Timestamp'], '1760450000');
  // Verify the way the Python side does: HMAC over b"<ts>." + the raw UTF-8 body bytes.
  const raw = Buffer.from(seen.init.body, 'utf8');
  const want = crypto.createHmac('sha256', SECRET).update(Buffer.concat([Buffer.from('1760450000.'), raw])).digest('hex');
  assert.equal(seen.init.headers['X-Jarvis-Signature'], want);
  assert.deepEqual(JSON.parse(seen.init.body), fields);
});

test('only the site, a Vercel preview and local development are allowed', () => {
  assert.ok(originAllowed('https://www.apexdentalmalta.com'));
  assert.ok(originAllowed('https://apex-dental-site-git-jarvis-enquiry-someone.vercel.app'));
  assert.ok(originAllowed('http://localhost:5173'));
  assert.ok(!originAllowed('https://apexdentalmalta.com.evil.example'));
  assert.ok(!originAllowed('http://www.apexdentalmalta.com'));
  assert.ok(!originAllowed('https://vercel.app.evil.example'));
  assert.ok(!originAllowed(''));
  assert.ok(!originAllowed('not a url'));
});

test('fields are capped by character and flattened', () => {
  const f = cleanFields({ name: 'J'.repeat(500), message: 'a\nb\u0000' + '🦷'.repeat(3000), form: 'other', id: 'bad id!<x>', extra: 'x', phone: 99000001 });
  assert.equal(f.name.length, 100);
  assert.equal(Array.from(f.message).length, 2000);
  assert.ok(f.message.startsWith('a b 🦷'));
  assert.equal(f.form, 'contact');
  assert.equal(f.id, 'badidx');
  assert.equal(f.phone, '99000001');
  assert.equal(f.extra, undefined);
  assert.ok(f.sent_at);
});

function fakeRes() {
  return {
    code: 0, body: undefined, headers: {},
    setHeader(k, v) { this.headers[k] = v; },
    status(c) { this.code = c; return this; },
    json(o) { this.body = o; return this; },
    end() { return this; },
  };
}

function req(body, headers = {}) {
  return { method: 'POST', headers: { origin: 'https://www.apexdentalmalta.com', ...headers }, body };
}

async function withEnv(env, fn) {
  const saved = { url: process.env.JARVIS_ENQUIRY_URL, secret: process.env.JARVIS_ENQUIRY_SECRET, fetch: globalThis.fetch };
  const calls = [];
  globalThis.fetch = async (url, init) => { calls.push({ url, init }); if (env.fail) throw new Error('down'); return { status: env.status || 202 }; };
  if (env.url) process.env.JARVIS_ENQUIRY_URL = env.url; else delete process.env.JARVIS_ENQUIRY_URL;
  if (env.secret) process.env.JARVIS_ENQUIRY_SECRET = env.secret; else delete process.env.JARVIS_ENQUIRY_SECRET;
  try {
    return await fn(calls);
  } finally {
    globalThis.fetch = saved.fetch;
    if (saved.url === undefined) delete process.env.JARVIS_ENQUIRY_URL; else process.env.JARVIS_ENQUIRY_URL = saved.url;
    if (saved.secret === undefined) delete process.env.JARVIS_ENQUIRY_SECRET; else process.env.JARVIS_ENQUIRY_SECRET = saved.secret;
  }
}

const ENV = { url: 'https://jarvis.example/web/enquiry', secret: SECRET };
const FORM = { form: 'appointment', name: 'Jane Testa', phone: '99000001', email: 'jane@example.com', company: '' };

test('a good enquiry is signed and forwarded; the browser gets only ok', async () => {
  await withEnv(ENV, async (calls) => {
    const res = fakeRes();
    await handler(req(FORM), res);
    assert.equal(res.code, 200);
    assert.deepEqual(res.body, { ok: true });
    assert.equal(calls.length, 1);
    const { init } = calls[0];
    assert.equal(init.headers['X-Jarvis-Signature'], sign(SECRET, init.headers['X-Jarvis-Timestamp'], init.body));
    assert.equal(JSON.parse(init.body).company, undefined);
  });
});

test('the spam trap filled: ok, nothing sent', async () => {
  await withEnv(ENV, async (calls) => {
    const res = fakeRes();
    await handler(req({ ...FORM, company: 'ACME Ltd' }), res);
    assert.deepEqual(res.body, { ok: true });
    assert.equal(calls.length, 0);
  });
});

test('not configured: ok, nothing sent', async () => {
  await withEnv({}, async (calls) => {
    const res = fakeRes();
    await handler(req(FORM), res);
    assert.deepEqual(res.body, { ok: true });
    assert.equal(calls.length, 0);
  });
});

test('Jarvis down or refusing: the browser still gets ok', async () => {
  for (const env of [{ ...ENV, fail: true }, { ...ENV, status: 401 }]) {
    await withEnv(env, async () => {
      const res = fakeRes();
      const errors = console.error;
      console.error = () => {};
      try {
        await handler(req(FORM), res);
      } finally {
        console.error = errors;
      }
      assert.equal(res.code, 200);
      assert.deepEqual(res.body, { ok: true });
    });
  }
});

test('wrong method, wrong origin, oversized, not JSON: refused, nothing sent', async () => {
  await withEnv(ENV, async (calls) => {
    let res = fakeRes();
    await handler({ method: 'GET', headers: {} }, res);
    assert.equal(res.code, 405);
    res = fakeRes();
    await handler(req(FORM, { origin: 'https://evil.example' }), res);
    assert.equal(res.code, 403);
    res = fakeRes();
    await handler({ method: 'POST', headers: { referer: 'https://www.apexdentalmalta.com/contact-us' }, body: FORM }, res);
    assert.equal(res.code, 200);                       // Referer when there is no Origin
    res = fakeRes();
    await handler(req(FORM, { 'content-length': String(9 * 1024) }), res);
    assert.equal(res.code, 413);
    res = fakeRes();
    await handler(req('not json'), res);
    assert.equal(res.code, 400);
    assert.equal(calls.length, 1);                     // only the Referer one
  });
});
