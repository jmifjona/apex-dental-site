/**
 * Static prerender (SSG) for Apex Dental - the last step of `npm run build`:
 *
 *   vite build                                               -> dist/ (browser bundle + index.html template)
 *   vite build --ssr src/entry-server.jsx --outDir dist-ssr  -> the same app as a Node module
 *   node scripts/prerender.mjs                               -> this file
 *
 * For every public URL this renders the real page with React (src/entry-server.jsx, no browser)
 * and writes dist/<path>/index.html containing the page's content in #root and its own head:
 * exactly one title, description, canonical, og:/twitter: set and its JSON-LD. The browser then
 * hydrates that HTML (src/main.jsx). Crawlers, AI answer engines, link previews and visitors
 * without JavaScript get the full page; nobody waits for the script to see content.
 *
 * The head is not kept in a table here: it comes from each page's own <SEO> element through
 * src/seo/head.js, the same code the browser runs, so the two can never drift apart.
 *
 * The public URLs are the ones in public/sitemap.xml plus EXTRA_PATHS. The build fails if a page in
 * the router's table is missing from that list, if a listed URL renders the 404 page, or if any
 * page's head is incomplete or duplicated.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { blogPosts } from '../src/data/blogPosts.js';
import { IMAGE_SIZES } from '../src/data/imageSizes.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const distDir = join(rootDir, 'dist');
const ssrDir = join(rootDir, 'dist-ssr');
const siteUrl = 'https://www.apexdentalmalta.com';

// Public pages that are deliberately not in the sitemap.
const EXTRA_PATHS = ['/privacy-policy', '/terms'];
// Any URL the router does not know renders the 404 page.
const NOT_FOUND_PROBE = '/404';

const fail = (message) => {
  console.error(`❌ ${message}`);
  process.exit(1);
};

// ---- inputs -------------------------------------------------------------------------------------

const templatePath = join(distDir, 'index.html');
if (!existsSync(templatePath)) fail('dist/index.html not found - run `vite build` first');
const template = readFileSync(templatePath, 'utf-8');
const HEAD_PLACEHOLDER = /[ \t]*<!--app-head[\s\S]*?-->/;
const ROOT_EMPTY = '<div id="root"></div>';
if (!HEAD_PLACEHOLDER.test(template) || !template.includes(ROOT_EMPTY)) {
  fail('dist/index.html is not the unrendered template (no <!--app-head--> / empty #root) - run `npm run build`');
}

const serverEntry = join(ssrDir, 'entry-server.js');
if (!existsSync(serverEntry)) {
  fail('dist-ssr/entry-server.js not found - run `vite build --ssr src/entry-server.jsx --outDir dist-ssr` first');
}
const { render } = await import(pathToFileURL(serverEntry).href);

const sitemap = readFileSync(join(rootDir, 'public/sitemap.xml'), 'utf-8');
const sitemapUrls = [...sitemap.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
const pagePaths = [];
for (const url of sitemapUrls) {
  if (!url.startsWith(`${siteUrl}/`)) fail(`sitemap URL ${url} is not on ${siteUrl}`);
  pagePaths.push(url.slice(siteUrl.length));
}
pagePaths.push(...EXTRA_PATHS);

// Every page in the router's table (src/App.jsx <Route path="..."> plus the blog posts) must be
// prerendered, or it would ship as an empty 404 file.
const bare = (path) => path.replace(/\/+$/, '') || '/';
const appSource = readFileSync(join(rootDir, 'src/App.jsx'), 'utf-8');
const routerPaths = [
  ...[...appSource.matchAll(/<Route\s+path="([^"]+)"/g)].map((m) => m[1]).filter((p) => p !== '*'),
  ...blogPosts.map((post) => post.slug),
];
const listed = new Set(pagePaths.map(bare));
const unlisted = routerPaths.filter((p) => !listed.has(bare(p)));
if (unlisted.length) {
  fail(`routes not in public/sitemap.xml or EXTRA_PATHS (they would not be prerendered): ${unlisted.join(', ')}`);
}

// ---- render -------------------------------------------------------------------------------------

const count = (html, re) => (html.match(re) || []).length;

function renderPage(path, { expectNotFound = false } = {}) {
  const { html, head, headHtml } = render(path);
  if (!head) fail(`${path}: the page rendered no <SEO> element`);
  const noindex = head.meta.some(([, key, value]) => key === 'robots' && /noindex/.test(value));
  if (expectNotFound !== noindex) {
    fail(expectNotFound ? `${path}: expected the 404 page` : `${path}: renders the 404 page (no matching route in src/App.jsx)`);
  }
  if (!expectNotFound && head.canonical !== `${siteUrl}${path}`) {
    fail(`${path}: canonical is ${head.canonical}, expected ${siteUrl}${path} (the URL in the sitemap)`);
  }
  if (!html) fail(`${path}: rendered no content`);

  // React's server renderer puts <link rel="preload" as="image"> hints for the first images it
  // meets (the logo and the hero, with fetchpriority=high) at the very start of its output. They
  // belong in <head>, where the browser finds them before the stylesheet and script; inside #root
  // they would also not match the tree the browser hydrates.
  const preloads = html.match(/^(?:<link [^>]*>)+/)?.[0] ?? '';
  const body = html.slice(preloads.length);
  const preloadLines = preloads.match(/<link [^>]*>/g) ?? [];
  const headLines = [headHtml, ...preloadLines.map((tag) => `    ${tag}`)].join('\n');

  // Function replacements: the page text must not be read as "$&"-style replacement patterns.
  const page = template
    .replace(HEAD_PLACEHOLDER, () => headLines)
    .replace(ROOT_EMPTY, () => `<div id="root">${body}</div>`);
  if (/<div id="root"><link /.test(page)) fail(`${path}: a <link> is left at the start of #root`);
  checkHead(page, path, head);

  const h1 = count(html, /<h1[\s>]/g);
  if (h1 !== 1) console.warn(`⚠️  ${path}: ${h1} <h1> elements`);
  return { page, head, h1 };
}

// Fail the build rather than ship a page with a missing or duplicated head tag.
function checkHead(page, path, head) {
  const headPart = page.slice(0, page.indexOf('</head>'));
  const checks = {
    title: [count(headPart, /<title>/g), 1],
    description: [count(headPart, /<meta\s+name="description"/g), 1],
    canonical: [count(headPart, /<link\s+rel="canonical"/g), head.canonical ? 1 : 0],
    'og:title': [count(headPart, /<meta\s+property="og:title"/g), 1],
    'og:description': [count(headPart, /<meta\s+property="og:description"/g), 1],
    'og:url': [count(headPart, /<meta\s+property="og:url"/g), head.canonical ? 1 : 0],
    'og:image': [count(headPart, /<meta\s+property="og:image"/g), 1],
    'twitter:title': [count(headPart, /<meta\s+name="twitter:title"/g), 1],
    'JSON-LD': [count(headPart, /<script type="application\/ld\+json"/g), head.jsonLd.length],
  };
  for (const [tag, [n, want]] of Object.entries(checks)) {
    if (n !== want) fail(`${path}: ${n} ${tag} tag(s), expected ${want}`);
  }
}

function outFile(path) {
  const dir = path.replace(/^\/+|\/+$/g, '');
  return dir ? join(distDir, dir, 'index.html') : templatePath;
}

const results = [];
for (const path of pagePaths) {
  const { page, head, h1 } = renderPage(path);
  const file = outFile(path);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, page);
  results.push({ path, head, h1 });
  console.log(`✅ ${path} → ${file.slice(rootDir.length + 1).replace(/\\/g, '/')}`);
}

// Not-found page. With no catch-all rewrite in vercel.json, Vercel answers any URL that is not a
// file, a function or a listed rewrite with HTTP 404 and this file; the app hydrates it as
// NotFoundPage (noindex, no canonical).
writeFileSync(join(distDir, '404.html'), renderPage(NOT_FOUND_PROBE, { expectNotFound: true }).page);
console.log('✅ 404 page → dist/404.html (noindex, no canonical)');

// ---- consistency checks -------------------------------------------------------------------------

// og:image declares the image's real size from src/data/imageSizes.js. Warn if that table is stale.
function imageSize(buf) {
  if (buf.length > 24 && buf[0] === 0x89 && buf.toString('ascii', 1, 4) === 'PNG') {
    return [buf.readUInt32BE(16), buf.readUInt32BE(20)];
  }
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i + 9 < buf.length) {
      if (buf[i] !== 0xff) {
        i++;
        continue;
      }
      const marker = buf[i + 1];
      // SOF0..SOF15 carry the frame size (C4/C8/CC are other tables)
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return [buf.readUInt16BE(i + 7), buf.readUInt16BE(i + 5)];
      }
      i += 2 + buf.readUInt16BE(i + 2);
    }
  }
  return null;
}
const ogImages = new Set(results.map((r) => r.head.meta.find(([, key]) => key === 'og:image')[2]));
for (const url of ogImages) {
  const rel = url.startsWith(`${siteUrl}/`) ? url.slice(siteUrl.length) : null;
  const file = rel && join(distDir, decodeURIComponent(rel));
  const real = file && existsSync(file) ? imageSize(readFileSync(file)) : null;
  const listedSize = rel && IMAGE_SIZES[rel];
  if (!listedSize) {
    console.warn(`⚠️  og:image ${url} is not in src/data/imageSizes.js - width/height left out`);
  } else if (!real || real[0] !== listedSize[0] || real[1] !== listedSize[1]) {
    console.warn(`⚠️  og:image ${url}: imageSizes.js says ${listedSize.join('x')}, the file is ${real ? real.join('x') : 'unreadable'}`);
  }
}

// Every prerendered page must be reachable with and without its trailing slash, and nothing may
// send unknown URLs to the homepage again (that made every typo a 200 "soft 404").
const vercel = JSON.parse(readFileSync(join(rootDir, 'vercel.json'), 'utf-8'));
const rewrites = new Map((vercel.rewrites || []).map((r) => [r.source, r.destination]));
const problems = [];
for (const { path } of results) {
  if (path === '/') continue;
  const b = bare(path);
  for (const source of [b, `${b}/`]) {
    if (rewrites.get(source) !== `${b}/index.html`) problems.push(`no rewrite ${source} -> ${b}/index.html`);
  }
}
for (const [source, destination] of rewrites) {
  if (destination === '/index.html' && source !== '/') problems.push(`catch-all rewrite ${source} -> /index.html`);
}
if (problems.length) fail(`vercel.json does not match the prerendered pages:\n  ${problems.join('\n  ')}`);

// The renderer bundle is only needed during the build; it is not deployed (Vercel serves dist/).
rmSync(ssrDir, { recursive: true, force: true });

const notOneH1 = results.filter((r) => r.h1 !== 1).length;
console.log(
  `\n🎉 Done: ${results.length} pages + 404.html prerendered with their content and head tags` +
    (notOneH1 ? ` (${notOneH1} without exactly one <h1>)` : ''),
);
