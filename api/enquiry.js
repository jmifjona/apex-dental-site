// Vercel serverless function: hands a website enquiry straight to Jarvis (the clinic's WhatsApp
// booking assistant), signed, so the patient gets a WhatsApp at once instead of waiting for the
// Formspree email to be read. Formspree still receives and emails every submission - that stays
// the backup, and Jarvis skips an email copy it has already answered.
//
// Env vars (Vercel -> Project -> Settings -> Environment Variables, Preview + Production):
//   JARVIS_ENQUIRY_URL     - https://jarvis.apex-jarvis.org/web/enquiry
//   JARVIS_ENQUIRY_SECRET  - long random value, the same as WEB_ENQUIRY_SECRET on Jarvis
// Either missing: nothing is sent. The browser always gets { ok: true } - never the secret and
// never Jarvis's answer; failures are logged here (Vercel function logs) only.
//
// Signature: X-Jarvis-Timestamp = unix seconds, X-Jarvis-Signature = hex HMAC-SHA256(secret,
// `${timestamp}.${body}`) over the exact UTF-8 body sent. scripts/test-enquiry.mjs pins a vector that
// the Jarvis tests check too.
import { Buffer } from 'node:buffer';
import crypto from 'node:crypto';
import process from 'node:process';

const MAX_BYTES = 8 * 1024;
const TIMEOUT_MS = 8000;
const SITE_ORIGIN = 'https://www.apexdentalmalta.com';
const FORMS = ['appointment', 'contact'];
// Longest kept of each field (Jarvis caps the same way).
const CAPS = {
  form: 20, name: 100, email: 254, phone: 40, clinic: 120, service: 100,
  preferredDate: 40, subject: 120, message: 2000, id: 64, sent_at: 40,
};

export function sign(secret, timestamp, body) {
  return crypto.createHmac('sha256', secret).update(`${timestamp}.${body}`, 'utf8').digest('hex');
}

// The live site, a Vercel preview (*.vercel.app) and local development only.
export function originAllowed(origin) {
  if (!origin) return false;
  let u;
  try {
    u = new URL(origin);
  } catch {
    return false;
  }
  if (u.origin === SITE_ORIGIN) return true;
  if (u.protocol === 'https:' && u.hostname.endsWith('.vercel.app')) return true;
  if (u.protocol === 'http:' && (u.hostname === 'localhost' || u.hostname === '127.0.0.1')) return true;
  return false;
}

function requestOrigin(req) {
  const origin = req.headers.origin;
  if (origin && origin !== 'null') return origin;
  const referer = req.headers.referer;
  if (!referer) return '';
  try {
    return new URL(referer).origin;
  } catch {
    return '';
  }
}

// Every known field as a short single-line string; anything else dropped.
export function cleanFields(input) {
  const out = {};
  for (const [key, cap] of Object.entries(CAPS)) {
    let v = input && input[key];
    if (typeof v === 'number') v = String(v);
    if (typeof v !== 'string') v = '';
    // eslint-disable-next-line no-control-regex -- control characters are exactly what is removed
    v = v.replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim();
    out[key] = Array.from(v).slice(0, cap).join(''); // by character, never half an emoji
  }
  if (!FORMS.includes(out.form)) out.form = 'contact';
  out.id = out.id.replace(/[^A-Za-z0-9_-]/g, '').slice(0, 64) || crypto.randomUUID();
  if (!out.sent_at) out.sent_at = new Date().toISOString();
  return out;
}

function readBody(req) {
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) return req.body;
  const raw = Buffer.isBuffer(req.body) ? req.body.toString('utf8') : req.body;
  if (typeof raw !== 'string' || !raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export async function forward(fields, { url, secret, fetchImpl = fetch, now = Date.now } = {}) {
  const body = JSON.stringify(fields);
  const timestamp = String(Math.floor(now() / 1000));
  const r = await fetchImpl(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Jarvis-Timestamp': timestamp,
      'X-Jarvis-Signature': sign(secret, timestamp, body),
    },
    body,
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  return r.status;
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end();
  }
  // Every outcome leaves one log line (Vercel -> Logs), never a field of the enquiry: the first
  // preview test (15 Oct 2026) left no trace at all, so nobody could tell where it stopped.
  if (!originAllowed(requestOrigin(req))) {
    console.warn('jarvis enquiry: refused - not from the website');
    return res.status(403).end();
  }
  const declared = Number(req.headers['content-length'] || 0);
  if (declared > MAX_BYTES) return res.status(413).end();

  const input = readBody(req);
  if (!input) {
    console.warn('jarvis enquiry: refused - body is not a JSON object');
    return res.status(400).end();
  }
  // The hidden spam trap: a person never fills it. Say thank you, send nothing.
  if (typeof input.company === 'string' && input.company.trim()) {
    console.warn('jarvis enquiry: spam trap filled - not sent');
    return res.status(200).json({ ok: true });
  }

  const url = process.env.JARVIS_ENQUIRY_URL;
  const secret = process.env.JARVIS_ENQUIRY_SECRET;
  if (!url || !secret) {
    console.error(`jarvis enquiry: NOT CONFIGURED - ${!url ? 'JARVIS_ENQUIRY_URL ' : ''}${!secret ? 'JARVIS_ENQUIRY_SECRET ' : ''}missing in this environment`);
    return res.status(200).json({ ok: true });
  }

  try {
    const status = await forward(cleanFields(input), { url, secret });
    if (status === 202) console.log('jarvis enquiry: delivered to Jarvis (202)');
    else console.error(`jarvis enquiry: Jarvis answered ${status}`);
  } catch (e) {
    console.error(`jarvis enquiry: not delivered (${e && e.name ? e.name : 'error'})`);
  }
  return res.status(200).json({ ok: true });
}
