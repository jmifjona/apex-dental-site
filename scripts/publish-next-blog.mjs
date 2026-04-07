/**
 * publish-next-blog.mjs
 * Picks the next due blog post from blog-queue.json,
 * appends it to src/data/blogPosts.js, updates sitemap.xml,
 * updates vercel.json rewrites, and updates scripts/prerender-meta.mjs.
 * 
 * Run: node scripts/publish-next-blog.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const siteUrl = 'https://www.apexdentalmalta.com';

const queuePath = join(__dirname, 'blog-queue.json');
const blogDataPath = join(root, 'src/data/blogPosts.js');
const sitemapPath = join(root, 'public/sitemap.xml');
const vercelPath = join(root, 'vercel.json');
const prerenderPath = join(__dirname, 'prerender-meta.mjs');

// Load queue
const queue = JSON.parse(readFileSync(queuePath, 'utf-8'));

if (queue.length === 0) {
  console.log('📭 Queue is empty — no posts to publish.');
  process.exit(0);
}

const today = new Date().toISOString().slice(0, 10);
const post = queue[0];

// Check if due (datePublished <= today)
if (post.datePublished > today) {
  console.log(`⏳ Next post "${post.title}" is scheduled for ${post.datePublished}. Nothing to publish today.`);
  process.exit(0);
}

console.log(`📝 Publishing: "${post.title}" (${post.slug})`);

// ── 1. Append to blogPosts.js ──────────────────────────────
const blogData = readFileSync(blogDataPath, 'utf-8');

// Build the new post entry as a JS object literal string
const contentStr = JSON.stringify(post.content, null, 4).replace(/"type"/g, 'type').replace(/"text"/g, 'text').replace(/"h3"/g, "'h3'").replace(/"p"/g, "'p'").replace(/"cta"/g, "'cta'").replace(/"to"/g, 'to');

const newEntry = `
  {
    id: ${post.id},
    slug: '${post.slug}',
    title: '${post.title.replace(/'/g, "\\'")}',
    excerpt: '${post.excerpt.replace(/'/g, "\\'")}',
    category: '${post.category}',
    readTime: '${post.readTime}',
    datePublished: '${post.datePublished}',
    image: '${post.image}',
    content: ${JSON.stringify(post.content, null, 6)},
  },`;

const updatedBlogData = blogData.replace(
  /(\];[\s\S]*?\/\/ Derived meta map)/,
  `${newEntry}\n];\n\n// Derived meta map`
);
writeFileSync(blogDataPath, updatedBlogData, 'utf-8');
console.log('  ✅ Added to src/data/blogPosts.js');

// ── 2. Update sitemap.xml ──────────────────────────────────
const sitemap = readFileSync(sitemapPath, 'utf-8');
const sitemapEntry = `  <url><loc>${siteUrl}${post.slug}</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>\n`;
const updatedSitemap = sitemap.replace('</urlset>', `${sitemapEntry}</urlset>`);
writeFileSync(sitemapPath, updatedSitemap, 'utf-8');
console.log('  ✅ Updated sitemap.xml');

// ── 3. Update vercel.json ──────────────────────────────────
const vercel = JSON.parse(readFileSync(vercelPath, 'utf-8'));
const slugNoTrailing = post.slug.replace(/\/$/, '');
const htmlPath = `${slugNoTrailing}/index.html`;
// Insert before the catch-all
const catchAllIdx = vercel.rewrites.findIndex(r => r.source === '/(.*)');;
vercel.rewrites.splice(catchAllIdx, 0, { source: slugNoTrailing, destination: htmlPath });
writeFileSync(vercelPath, JSON.stringify(vercel, null, 2), 'utf-8');
console.log('  ✅ Updated vercel.json');

// ── 4. Update prerender-meta.mjs ──────────────────────────
const prerender = readFileSync(prerenderPath, 'utf-8');
const prerenderEntry = `
  {
    path: '${post.slug}',
    title: '${post.title.replace(/'/g, "\\'")} | Apex Dental Malta',
    description: '${post.excerpt.replace(/'/g, "\\'")}',
    image: \`\${siteUrl}${post.image}\`,
  },`;
const updatedPrerender = prerender.replace('];', `${prerenderEntry}\n];`);
writeFileSync(prerenderPath, updatedPrerender, 'utf-8');
console.log('  ✅ Updated prerender-meta.mjs');

// ── 5. Remove from queue ───────────────────────────────────
queue.shift();
writeFileSync(queuePath, JSON.stringify(queue, null, 2), 'utf-8');
console.log(`  ✅ Removed from queue (${queue.length} posts remaining)`);

console.log(`\n🎉 Done! "${post.title}" is ready to deploy.`);
console.log(`   URL will be: ${siteUrl}${post.slug}`);
