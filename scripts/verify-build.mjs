import { readFile, access } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
const pages = ['home', 'products', 'about', 'recipes', 'contact', 'privacy'];
const titles = new Set();
let origin;
for (const page of pages) {
  const file = page === 'home' ? 'dist/index.html' : `dist/${page}/index.html`;
  const html = await readFile(file, 'utf8');
  const document = new JSDOM(html).window.document;
  assert.equal(document.querySelectorAll('h1').length, 1, `${page}: one H1`);
  assert.ok(document.querySelector('main')?.textContent.trim().length > 100, `${page}: readable prerendered content`);
  assert.ok(!titles.has(document.title), `${page}: unique title`); titles.add(document.title);
  for (const selector of ['meta[name="description"]', 'meta[property="og:title"]', 'meta[property="og:description"]', 'meta[name="twitter:card"]']) {
    assert.ok(document.querySelector(selector)?.content, `${page}: ${selector}`);
  }
  for (const image of document.querySelectorAll('img')) {
    assert.ok(image.hasAttribute('alt'), `${page}: image alt`);
    assert.ok(Number(image.getAttribute('width')) > 0 && Number(image.getAttribute('height')) > 0, `${page}: image dimensions`);
    const src = image.getAttribute('src');
    if (src?.startsWith('/') && !src.startsWith('//')) await access('dist' + decodeURIComponent(src));
  }
  const canonical = document.querySelector('link[rel="canonical"]')?.href;
  if (canonical) {
    origin = new URL(canonical).origin;
    assert.equal(new URL(canonical).pathname, page === 'home' ? '/' : `/${page}/`);
    assert.equal(document.querySelector('meta[property="og:url"]').content, canonical);
    assert.equal(document.querySelector('meta[property="og:image"]').content, `${origin}/social-preview.jpg`);
    assert.equal(document.querySelector('meta[name="robots"]').content, 'index,follow');
    assert.equal(JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent)['@type'], 'WebSite');
  } else {
    assert.equal(document.querySelector('meta[name="robots"]').content, 'noindex,nofollow');
  }
}
const robots = await readFile('dist/robots.txt', 'utf8');
if (origin) {
  assert.ok(robots.includes(`${origin}/sitemap.xml`));
  const sitemap = await readFile('dist/sitemap.xml', 'utf8');
  for (const page of pages) assert.ok(sitemap.includes(origin + (page === 'home' ? '/' : `/${page}/`)));
} else assert.ok(robots.includes('Disallow: /'));
await access('dist/social-preview.jpg');
console.log(`Verified all ${pages.length} prerendered pages, metadata, image dimensions/paths, sharing assets, and ${origin ? 'production sitemap/canonicals' : 'preview indexing restrictions'}.`);
