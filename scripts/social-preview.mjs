import { readFile } from 'node:fs/promises';
import sharp from 'sharp';
const logo = (await readFile('src/components/woxwaffy-professional-logo.svg', 'utf8'))
  .replace(/<svg[^>]+>/, '<svg x="64" y="252" width="620" height="100" viewBox="0 0 1650 264">');
const jar = (await sharp('public/assets/woxwaffy-chocolate-spread-jar.webp').png().toBuffer()).toString('base64');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#fffaf2"/>
<circle cx="960" cy="315" r="285" fill="#f1dfc8"/>
<circle cx="960" cy="315" r="230" fill="none" stroke="#e8b777" stroke-width="2"/>
<rect x="64" y="215" width="88" height="6" rx="3" fill="#b72a30"/>
${logo}
<rect x="64" y="390" width="540" height="2" fill="#d4964d"/>
<image x="758" y="50" width="390" height="522" href="data:image/png;base64,${jar}"/>
</svg>`;
await sharp(Buffer.from(svg)).jpeg({ quality: 90, mozjpeg: true }).toFile('public/social-preview.jpg');
console.log('Generated 1200×630 social-preview.jpg using the existing brand assets.');
