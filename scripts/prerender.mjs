import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { PAGE_IDS, PAGE_META, pagePath, renderPage, SITE_URL } from '../.prerender/entry-server.js';

const siteUrl = SITE_URL;
if (siteUrl && (!/^https:\/\/[^/]+$/.test(siteUrl) || new URL(siteUrl).origin !== siteUrl)) {
  throw new Error('VITE_SITE_URL must be the final HTTPS origin, e.g. https://example.com');
}
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const template = await readFile('dist/index.html', 'utf8');
for (const page of PAGE_IDS) {
  const { title, description } = PAGE_META[page];
  const url = siteUrl + pagePath(page);
  const tags = `
    <meta name="description" content="${escape(description)}" />
    <meta name="robots" content="${siteUrl ? 'index,follow' : 'noindex,nofollow'}" />
    <meta property="og:site_name" content="Woxwaffy" />
    <meta property="og:title" content="${escape(title)}" />
    <meta property="og:description" content="${escape(description)}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="en_LK" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escape(title)}" />
    <meta name="twitter:description" content="${escape(description)}" />
    ${siteUrl ? `<link rel="canonical" href="${escape(url)}" />
    <script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebSite', name: 'Woxwaffy', url: siteUrl + '/' }).replaceAll('<', '\u003c')}</script>
    <meta property="og:url" content="${escape(url)}" />
    <meta property="og:image" content="${escape(siteUrl)}/social-preview.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Woxwaffy chocolate spread — spread happiness" />
    <meta name="twitter:image" content="${escape(siteUrl)}/social-preview.png" />
    <meta name="twitter:image:alt" content="Woxwaffy chocolate spread — spread happiness" />` : ''}`;
  const html = template.replace(/<title>.*?<\/title>/s, `<title>${escape(title)}</title>`)
    .replace('</head>', `${tags}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${renderPage(page)}</div>`);
  const directory = page === 'home' ? 'dist' : `dist/${page}`;
  await mkdir(directory, { recursive: true });
  await writeFile(`${directory}/index.html`, html);
}
await writeFile('dist/robots.txt', siteUrl ? `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n` : 'User-agent: *\nDisallow: /\n');
if (siteUrl) {
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${PAGE_IDS.map(page => `<url><loc>${escape(siteUrl + pagePath(page))}</loc></url>`).join('')}</urlset>\n`);
}
// Unknown URLs remain real 404 responses on static hosts.
await writeFile('dist/404.html', '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Page not found | Woxwaffy</title><h1>Page not found</h1><p><a href="/">Return to Woxwaffy</a></p></html>');
await rm('.prerender', { recursive: true, force: true });
console.log(`Prerendered ${PAGE_IDS.length} pages. ${siteUrl ? `Canonical origin: ${siteUrl}` : 'Preview build is noindex; set VITE_SITE_URL for production SEO.'}`);
