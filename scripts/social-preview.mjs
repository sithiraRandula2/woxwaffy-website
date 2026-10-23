import { readFile, writeFile } from 'node:fs/promises';
import { Resvg } from '@resvg/resvg-js';
const logo = (await readFile('src/components/woxwaffy-professional-logo.svg', 'utf8'))
  .replace(/<svg[^>]+>/, '<svg x="64" y="252" width="620" height="100" viewBox="0 0 1650 264">');
const jar = (await readFile('public/assets/woxwaffy-chocolate-spread-jar.png')).toString('base64');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#fffaf2"/>
<circle cx="960" cy="315" r="285" fill="#f1dfc8"/>
<circle cx="960" cy="315" r="230" fill="none" stroke="#e8b777" stroke-width="2"/>
<rect x="64" y="215" width="88" height="6" rx="3" fill="#b72a30"/>
${logo}
<rect x="64" y="390" width="540" height="2" fill="#d4964d"/>
<image x="758" y="50" width="390" height="522" href="data:image/png;base64,${jar}"/>
</svg>`;
await writeFile('public/social-preview.png', new Resvg(svg).render().asPng());
console.log('Generated 1200×630 social-preview.png using the existing brand assets.');
