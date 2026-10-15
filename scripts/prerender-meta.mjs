/**
 * Meta-tag prerender script for Apex Dental
 * After `vite build`, this creates a static index.html per route with
 * exactly one page-specific <title>, <meta description>, set of og:/twitter: tags and
 * <canonical> (the template's homepage tags are replaced, not appended to).
 * Google executes JS anyway; this ensures crawlers + social previews work.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { blogPosts, blogPostMeta } from '../src/data/blogPosts.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '../dist');
const siteUrl = 'https://www.apexdentalmalta.com';
const defaultImage = `${siteUrl}/images/H1.jpg`;

const routes = [
  {
    path: '/',
    title: 'Apex Dental Malta | Dental Implants, Invisalign & Cosmetic Dentistry',
    description: 'Apex Dental Malta offers dental implants, Invisalign, veneers, cosmetic dentistry, teeth whitening, hygiene, and emergency dental care at Trident Park, Birkirkara.',
    image: `${siteUrl}/images/H1.jpg`,
  },
  {
    path: '/about-us/',
    title: 'About Apex Dental Malta | Our Dental Team',
    description: "Meet the team at Apex Dental Malta. Dr Jonathan Mifsud (Implantologist), Dr Aleksandra Syrico Mallia (Orthodontist, Polish-speaking), Dr Charlotte Axisa, Dr Massimo D'Alessandro (Italian-speaking), Dr Adam Borg and Dr Martha Lopez (Spanish-speaking). Trident Park, Mrieħel, Birkirkara.",
    image: `${siteUrl}/images/AB1.jpg`,
  },
  {
    path: '/services/',
    title: 'Dental Services Malta | Apex Dental',
    description: 'Explore Apex Dental\'s services in Malta including dental implants, Invisalign, veneers, whitening, crowns, root canal treatment, prosthetics, hygiene, and emergency dentistry.',
    image: `${siteUrl}/images/H2.jpg`,
  },
  {
    path: '/dental-implants/',
    title: 'Dental Implants Malta | Apex Dental',
    description: 'Apex Dental provides dental implants in Malta for single missing teeth, multiple teeth, All-on-4, and advanced restorative cases. Free consultation and 3D scan with treatment.',
    image: `${siteUrl}/images/I1.jpg`,
  },
  {
    path: '/straumann-implants-malta/',
    title: 'Straumann Implants Malta | Premium Swiss Implants | Apex Dental',
    description: 'Straumann dental implants in Malta at Apex Dental. Premium Swiss implants with SLActive surface technology and a long published track record, placed by Dr Jonathan Mifsud.',
    image: `${siteUrl}/images/I1.jpg`,
  },
  {
    path: '/all-on-4-malta/',
    title: 'All-on-4 Dental Implants Malta | Full Arch | Apex Dental',
    description: 'All-on-4 dental implants in Malta at Apex Dental. A fixed full arch of teeth on four implants, often with same-day temporary teeth. Placed by implantologist Dr Jonathan Mifsud.',
    image: `${siteUrl}/images/I4.jpg`,
  },
  {
    path: '/all-on-6-malta/',
    title: 'All-on-6 Dental Implants Malta | Full Arch | Apex Dental',
    description: 'All-on-6 dental implants in Malta at Apex Dental. A fixed full arch of teeth on six implants for wider load distribution, placed by implantologist Dr Jonathan Mifsud.',
    image: `${siteUrl}/images/I1.jpg`,
  },
  {
    path: '/invisalign-malta/',
    title: 'Invisalign Malta | Clear Aligners | Apex Dental',
    description: 'Invisalign and clear aligner treatment in Malta at Apex Dental. Discreet, removable orthodontics for adults. Digital planning and multilingual consultations available.',
    image: `${siteUrl}/images/A1.jpg`,
  },
  {
    path: '/cosmetic-dentistry-malta',
    title: 'Cosmetic Dentistry Malta | Apex Dental',
    description: 'Cosmetic dentistry in Malta at Apex Dental. Veneers, smile design, whitening, and aesthetic treatments for a natural, refined result.',
    image: `${siteUrl}/images/C1.jpg`,
  },
  {
    path: '/veneers/',
    title: 'Dental Veneers Malta | Porcelain Veneers | Apex Dental',
    description: 'Porcelain dental veneers in Malta at Apex Dental. Custom smile design for chipped, stained, or misshapen teeth. Book a veneer consultation today.',
    image: `${siteUrl}/images/C1.jpg`,
  },
  {
    path: '/teeth-whitening/',
    title: 'Teeth Whitening Malta | Apex Dental',
    description: 'Professional teeth whitening in Malta at Apex Dental. Custom home whitening trays and in-clinic options for a brighter, whiter smile.',
    image: `${siteUrl}/images/C2.jpg`,
  },
  {
    path: '/crowns-and-bridgework/',
    title: 'Crowns and Bridges Malta | Apex Dental',
    description: 'Dental crowns and bridges in Malta at Apex Dental. Protect damaged teeth and replace missing teeth with high-quality ceramic and zirconia restorations.',
    image: `${siteUrl}/images/C4.jpg`,
  },
  {
    path: '/general-dentistry/',
    title: 'General Dentistry Malta | Apex Dental',
    description: 'Modern general dentistry in Malta at Apex Dental. Routine check-ups, fillings, diagnosis, and preventive care delivered to a premium standard.',
    image: `${siteUrl}/images/H5.jpg`,
  },
  {
    path: '/dental-hygiene/',
    title: 'Dental Hygiene Malta | Apex Dental',
    description: 'Professional dental hygiene appointments in Malta at Apex Dental. Scaling, polishing, and preventive care to keep your smile healthy long-term.',
    image: `${siteUrl}/images/H8.jpg`,
  },
  {
    path: '/periodontology/',
    title: 'Periodontology Malta | Apex Dental',
    description: 'Gum care and periodontal treatment in Malta at Apex Dental. Healthy gums are the foundation of a healthy smile.',
    image: `${siteUrl}/images/H9.jpg`,
  },
  {
    path: '/orthodontics/',
    title: 'Orthodontist Malta | Braces & Clear Aligners | Apex Dental',
    description: 'Orthodontics in Malta with orthodontist Dr Aleksandra Syrico Mallia at Apex Dental. Fixed braces, clear aligners and our in-house Orthix aligner, plus Invisalign, ClearCorrect, Ordoline and Cristaline.',
    image: `${siteUrl}/images/A3.jpg`,
  },
  {
    path: '/fixed-braces-malta/',
    title: 'Fixed Braces Malta | Metal & Ceramic Braces | Apex Dental',
    description: 'Fixed dental braces in Malta at Apex Dental. Metal and clear ceramic braces for children, teenagers and adults, fitted by orthodontist Dr Aleksandra Syrico Mallia.',
    image: `${siteUrl}/images/A2.jpg`,
  },
  {
    path: '/orthix-aligners/',
    title: 'Orthix Clear Aligners Malta | Made In-House | Apex Dental',
    description: "Orthix is Apex Dental's own clear aligner, designed and produced in-house in Malta. Faster to start and more affordable than international brands, planned by our orthodontist.",
    image: `${siteUrl}/images/A1.jpg`,
  },
  {
    path: '/clearcorrect-malta/',
    title: 'ClearCorrect Malta | Clear Aligners | Apex Dental',
    description: 'ClearCorrect clear aligners in Malta at Apex Dental. A Straumann Group aligner system for discreet teeth straightening, planned and monitored by our orthodontist.',
    image: `${siteUrl}/images/A2.jpg`,
  },
  {
    path: '/ordoline-aligners-malta/',
    title: 'Ordoline Aligners Malta | Clear Aligners for Complex Cases | Apex Dental',
    description: 'Ordoline clear aligners in Malta at Apex Dental. A clinician-led aligner system with hybrid mechanics for more complex orthodontic cases, planned by our orthodontist.',
    image: `${siteUrl}/images/A3.jpg`,
  },
  {
    path: '/cristaline-aligners-malta/',
    title: 'Cristaline Aligners Malta | German-Made Clear Aligners | Apex Dental',
    description: 'Cristaline clear aligners in Malta at Apex Dental. German-made, ISO 13485 aligners in a three-layer biocompatible material with a 3D treatment preview, planned by our orthodontist.',
    image: `${siteUrl}/images/A4.jpg`,
  },
  {
    path: '/dental-prosthetics/',
    title: 'Dental Prosthetics Malta | Apex Dental',
    description: 'Dental prosthetic solutions in Malta at Apex Dental. Fixed and removable restorations to replace missing teeth and restore function.',
    image: `${siteUrl}/images/H5.jpg`,
  },
  {
    path: '/removable-prosthesis/',
    title: 'Removable Prosthesis Malta | Apex Dental',
    description: 'Removable denture and prosthesis options in Malta at Apex Dental. Practical, comfortable tooth replacement tailored to your needs.',
    image: `${siteUrl}/images/H8.jpg`,
  },
  {
    path: '/root-canal-treatment/',
    title: 'Root Canal Treatment Malta | Apex Dental',
    description: 'Root canal treatment in Malta at Apex Dental. Comfortable, effective treatment for infected or damaged teeth — saving your natural tooth and relieving pain.',
    image: `${siteUrl}/images/I2.jpg`,
  },
  {
    path: '/emergency-dental-service-malta/',
    title: 'Emergency Dentist Malta | Apex Dental',
    description: 'Need an emergency dentist in Malta? Apex Dental provides urgent dental care for toothache, swelling, broken teeth, abscesses, and lost restorations. Open Sunday 9-12.',
    image: `${siteUrl}/images/CT1.jpg`,
  },
  {
    path: '/price-list/',
    title: 'Dental Price List Malta | Apex Dental',
    description: 'View Apex Dental\'s price list in Malta for checkups, hygiene, whitening, crowns, veneers, implants, root canal treatment, dentures, and orthodontics.',
    image: `${siteUrl}/images/CT1.jpg`,
  },
  {
    path: '/blog/',
    title: 'Dental Blog Malta | Apex Dental',
    description: 'Helpful dental articles from Apex Dental Malta. Read about implant costs, veneers vs whitening, emergency dental care, clear aligners, and preventive dentistry.',
    image: `${siteUrl}/images/H5.jpg`,
  },
  {
    path: '/appointment-booking/',
    title: 'Book a Dentist Appointment Malta | Apex Dental',
    description: 'Book a dental appointment at Apex Dental Malta for implants, Invisalign, veneers, hygiene, restorative treatment, and emergency dental care.',
    image: `${siteUrl}/images/CT2.jpg`,
  },
  {
    path: '/contact-us/',
    title: 'Contact Apex Dental Malta | Book an Appointment',
    description: 'Contact Apex Dental Malta at Trident Park, Mrieħel, Birkirkara. Call 27016017, WhatsApp 99722185 or fill in our contact form to book your appointment.',
    image: `${siteUrl}/images/CT1.jpg`,
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy | Apex Dental',
    description: 'Privacy policy for the internal Google Ads management application used by Apex Dental Malta.',
    image: `${siteUrl}/images/H1.jpg`,
  },
  {
    path: '/terms',
    title: 'Terms of Service | Apex Dental',
    description: 'Terms of service for the internal Google Ads management application used by Apex Dental Malta.',
    image: `${siteUrl}/images/H1.jpg`,
  },
  // Blog posts: one entry per post in src/data/blogPosts.js (the same data the pages and routes
  // use), so a published post can never be in the sitemap without its page.
  ...blogPosts.map((post) => {
    const meta = blogPostMeta[post.id];
    return { path: meta.slug, title: meta.seoTitle, description: meta.description, image: meta.image, type: 'article' };
  }),
];

// Intrinsic width/height of a JPEG or PNG, read from its header (no dependencies). Used so og:image
// declares the image's REAL size - the old tags claimed 1200x630 for every image, including the
// 469x892 portrait H1.jpg.
function imageSize(buf) {
  if (buf.length > 24 && buf[0] === 0x89 && buf.toString('ascii', 1, 4) === 'PNG') {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i + 9 < buf.length) {
      if (buf[i] !== 0xff) { i++; continue; }
      const marker = buf[i + 1];
      const len = buf.readUInt16BE(i + 2);
      // SOF0..SOF15 carry the frame size (C4/C8/CC are other tables)
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
      }
      i += 2 + len;
    }
  }
  return null;
}

const sizeCache = new Map();
function ogImageSize(imageUrl) {
  if (!sizeCache.has(imageUrl)) {
    let size = null;
    if (imageUrl.startsWith(`${siteUrl}/`)) {
      const file = join(distDir, decodeURIComponent(imageUrl.slice(siteUrl.length + 1)));
      if (existsSync(file)) size = imageSize(readFileSync(file));
    }
    if (!size) console.warn(`⚠️  og:image size unknown for ${imageUrl} - width/height left out`);
    sizeCache.set(imageUrl, size);
  }
  return sizeCache.get(imageUrl);
}

// The template (Vite's dist/index.html, built from /index.html) carries the homepage's SEO tags.
// They are REMOVED here and one page-specific set is written in their place, so every page has
// exactly one title, description, canonical and set of og:/twitter: tags. (The old script appended
// a second set, so crawlers and link previews saw the homepage's canonical and description first.)
const SEO_TAG_PATTERNS = [
  /[ \t]*<meta\s+name="description"[^>]*>\r?\n?/gi,
  /[ \t]*<meta\s+name="robots"[^>]*>\r?\n?/gi,
  /[ \t]*<meta\s+property="og:[^"]*"[^>]*>\r?\n?/gi,
  /[ \t]*<meta\s+name="twitter:[^"]*"[^>]*>\r?\n?/gi,
  /[ \t]*<link\s+rel="canonical"[^>]*>\r?\n?/gi,
  /[ \t]*<!-- Prerendered meta:[^>]*-->\r?\n?/gi,
];

function buildHtml(template, route) {
  const canonical = route.noindex ? null : `${siteUrl}${route.path}`;
  const image = route.image || defaultImage;
  const size = ogImageSize(image);

  let html = template;
  for (const re of SEO_TAG_PATTERNS) html = html.replace(re, '');

  const tags = [
    `<title>${escapeHtml(route.title)}</title>`,
    `<meta name="description" content="${escapeAttr(route.description)}" />`,
    route.noindex ? '<meta name="robots" content="noindex" />' : null,
    `<meta property="og:title" content="${escapeAttr(route.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(route.description)}" />`,
    `<meta property="og:type" content="${route.type || 'website'}" />`,
    canonical ? `<meta property="og:url" content="${canonical}" />` : null,
    `<meta property="og:image" content="${image}" />`,
    size ? `<meta property="og:image:width" content="${size.width}" />` : null,
    size ? `<meta property="og:image:height" content="${size.height}" />` : null,
    '<meta property="og:locale" content="en_MT" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeAttr(route.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(route.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    canonical ? `<link rel="canonical" href="${canonical}" />` : null,
  ].filter(Boolean);

  const titleRe = /([ \t]*)<title>[^<]*<\/title>/;
  const m = html.match(titleRe);
  if (!m) throw new Error('template has no <title>');
  const indent = m[1] || '    ';
  html = html.replace(titleRe, tags.map((t) => indent + t).join('\n'));

  checkOnce(html, route.path, canonical !== null);
  return html;
}

// Fail the build rather than ship a page with duplicate or missing head tags.
function checkOnce(html, path, wantCanonical) {
  const count = (re) => (html.match(re) || []).length;
  const checks = {
    title: count(/<title>/g),
    description: count(/<meta\s+name="description"/g),
    canonical: count(/<link\s+rel="canonical"/g),
    'og:title': count(/<meta\s+property="og:title"/g),
    'og:description': count(/<meta\s+property="og:description"/g),
    'og:image': count(/<meta\s+property="og:image"/g),
    'twitter:title': count(/<meta\s+name="twitter:title"/g),
  };
  for (const [tag, n] of Object.entries(checks)) {
    const want = tag === 'canonical' && !wantCanonical ? 0 : 1;
    if (n !== want) throw new Error(`${path}: ${n} ${tag} tag(s), expected ${want}`);
  }
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function escapeAttr(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

const templatePath = join(distDir, 'index.html');
if (!existsSync(templatePath)) {
  console.error('❌ dist/index.html not found — run vite build first');
  process.exit(1);
}

const template = readFileSync(templatePath, 'utf-8');

// Write root
writeFileSync(templatePath, buildHtml(template, routes[0]));
console.log(`✅ / → dist/index.html`);

// Write each sub-route
for (const route of routes.slice(1)) {
  const routePath = route.path.endsWith('/')
    ? route.path.slice(1, -1) // strip leading/trailing slash
    : route.path.slice(1);    // strip leading slash only

  const dir = join(distDir, routePath);
  mkdirSync(dir, { recursive: true });
  const outPath = join(dir, 'index.html');
  writeFileSync(outPath, buildHtml(template, route));
  console.log(`✅ ${route.path} → dist/${routePath}/index.html`);
}

console.log(`\n🎉 Done — ${routes.length} pages pre-rendered with meta tags`);
