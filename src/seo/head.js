// Page <head> tags: ONE definition, used twice.
//  - At build time, scripts/prerender.mjs writes headToHtml(buildHead(props)) into each page's
//    prerendered HTML (the props come from the page's own <SEO> element, collected while it renders).
//  - In the browser, the SEO component calls applyHead(buildHead(props)) after every navigation.
// So the raw HTML a crawler or link preview reads and the tags the running site sets can never
// drift apart: they are the same function of the same props.
import { IMAGE_SIZES } from '../data/imageSizes.js';

export const SITE_URL = 'https://www.apexdentalmalta.com';
export const DEFAULT_IMAGE = `${SITE_URL}/images/H1.jpg`;

// Every meta tag this module manages, as [attribute, key]. Tags in this list that a page does not
// set are removed on navigation (e.g. robots after leaving the 404 page).
const MANAGED_META = [
  ['name', 'description'],
  ['name', 'robots'],
  ['property', 'og:title'],
  ['property', 'og:description'],
  ['property', 'og:type'],
  ['property', 'og:url'],
  ['property', 'og:image'],
  ['property', 'og:image:width'],
  ['property', 'og:image:height'],
  ['property', 'og:locale'],
  ['name', 'twitter:card'],
  ['name', 'twitter:title'],
  ['name', 'twitter:description'],
  ['name', 'twitter:image'],
];
const SCHEMA_ID_PREFIX = 'seo-schema-';

export function absoluteUrl(url) {
  return url.startsWith('/') ? `${SITE_URL}${url}` : url;
}

// The head of one page. noindex pages (the 404 page) get robots=noindex and no canonical / og:url.
export function buildHead({
  title,
  description,
  canonical = null,
  type = 'website',
  image = DEFAULT_IMAGE,
  noindex = false,
  schema = null,
  schemas = null,
}) {
  const imageUrl = absoluteUrl(image);
  // The image's real pixel size (src/data/imageSizes.js). Left out when unknown, never guessed.
  const size = imageUrl.startsWith(`${SITE_URL}/`) ? IMAGE_SIZES[imageUrl.slice(SITE_URL.length)] : null;
  const url = noindex ? null : canonical;

  const meta = [
    ['name', 'description', description],
    noindex ? ['name', 'robots', 'noindex'] : null,
    ['property', 'og:title', title],
    ['property', 'og:description', description],
    ['property', 'og:type', type],
    url ? ['property', 'og:url', url] : null,
    ['property', 'og:image', imageUrl],
    size ? ['property', 'og:image:width', String(size[0])] : null,
    size ? ['property', 'og:image:height', String(size[1])] : null,
    ['property', 'og:locale', 'en_MT'],
    ['name', 'twitter:card', 'summary_large_image'],
    ['name', 'twitter:title', title],
    ['name', 'twitter:description', description],
    ['name', 'twitter:image', imageUrl],
  ].filter(Boolean);

  return {
    title,
    meta,
    canonical: url,
    jsonLd: [schema, ...(schemas || [])].filter(Boolean),
  };
}

const escapeText = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escapeAttr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
// JSON inside <script>: "<" is escaped so no string in the data can close the tag.
const jsonForScript = (data) => JSON.stringify(data).replace(/</g, '\\u003c');

// The tags as HTML, for the build (scripts/prerender.mjs), one per line.
export function headToHtml(head, indent = '    ') {
  const lines = [
    `<title>${escapeText(head.title)}</title>`,
    ...head.meta.map(([attr, key, value]) => `<meta ${attr}="${key}" content="${escapeAttr(value)}" />`),
    head.canonical ? `<link rel="canonical" href="${escapeAttr(head.canonical)}" />` : null,
    ...head.jsonLd.map(
      (data, i) => `<script type="application/ld+json" id="${SCHEMA_ID_PREFIX}${i}">${jsonForScript(data)}</script>`,
    ),
  ].filter(Boolean);
  return lines.map((line) => indent + line).join('\n');
}

// Browser: make document.head match `head` (called by the SEO component after each render that
// changes it). On the first load the prerendered tags already match, so this changes nothing.
export function applyHead(head) {
  document.title = head.title;

  const wanted = new Map(head.meta.map(([attr, key, value]) => [`${attr}:${key}`, value]));
  for (const [attr, key] of MANAGED_META) {
    const selector = `meta[${attr}="${key}"]`;
    const value = wanted.get(`${attr}:${key}`);
    const existing = document.head.querySelectorAll(selector);
    if (value === undefined) {
      existing.forEach((el) => el.remove());
      continue;
    }
    let el = existing[0];
    existing.forEach((extra, i) => i > 0 && extra.remove());
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute('content', value);
  }

  const canonicals = document.head.querySelectorAll('link[rel="canonical"]');
  if (!head.canonical) {
    canonicals.forEach((el) => el.remove());
  } else {
    let link = canonicals[0];
    canonicals.forEach((extra, i) => i > 0 && extra.remove());
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', head.canonical);
  }

  document.head.querySelectorAll(`script[id^="${SCHEMA_ID_PREFIX}"]`).forEach((el) => el.remove());
  head.jsonLd.forEach((data, i) => {
    const tag = document.createElement('script');
    tag.type = 'application/ld+json';
    tag.id = `${SCHEMA_ID_PREFIX}${i}`;
    tag.textContent = JSON.stringify(data);
    document.head.appendChild(tag);
  });
}
