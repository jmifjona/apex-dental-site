/**
 * Meta-tag prerender script for Apex Dental
 * After `vite build`, this creates a static index.html per route with
 * correct <title>, <meta description>, <og:*>, <canonical> filled in.
 * Google executes JS anyway; this ensures crawlers + social previews work.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '../dist');
const siteUrl = 'https://apexdentalmalta.com';
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
    description: "Meet the team at Apex Dental Malta. Dr Jonathan Mifsud (Implantologist), Dr Charlotte Axisa, Dr Massimo D'Alessandro (Italian-speaking), Dr Adam Borg and Dr Martha Lopez (Spanish-speaking).",
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
    title: 'Orthodontic Treatment Malta | Apex Dental',
    description: 'Orthodontic treatment in Malta at Apex Dental for alignment, bite improvement, and a better-balanced smile.',
    image: `${siteUrl}/images/A3.jpg`,
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
    description: 'Contact Apex Dental Malta at Trident Park, Birkirkara. Call 27016017, WhatsApp 79854037 or fill in our contact form to book your appointment.',
    image: `${siteUrl}/images/CT1.jpg`,
  },
];

function buildHtml(template, route) {
  const canonical = `${siteUrl}${route.path}`;
  const image = route.image || defaultImage;

  // Replace the default title
  let html = template.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeHtml(route.title)}</title>`
  );

  // Inject pre-filled meta tags before </head>
  const metaTags = `
  <!-- Prerendered meta: ${route.path} -->
  <meta name="description" content="${escapeAttr(route.description)}" />
  <meta property="og:title" content="${escapeAttr(route.title)}" />
  <meta property="og:description" content="${escapeAttr(route.description)}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${image}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:locale" content="en_MT" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeAttr(route.title)}" />
  <meta name="twitter:description" content="${escapeAttr(route.description)}" />
  <meta name="twitter:image" content="${image}" />
  <link rel="canonical" href="${canonical}" />`;

  html = html.replace('</head>', `${metaTags}\n</head>`);
  return html;
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
