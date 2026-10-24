# Woxwaffy — Premium Sri Lankan Chocolate Spread

A responsive brand website for Woxwaffy, showcasing chocolate spreads, serving ideas, and ways to contact the business.

## Features

- Home page with product highlights and serving inspiration
- Product collection with detail modals
- About page introducing the brand
- Recipe gallery with individual recipe views
- Contact page with WhatsApp, telephone, and social links
- Privacy page describing WhatsApp enquiries and current third-party services
- Responsive navigation, page transitions, and reduced-motion support

Navigation uses real page URLs such as `/products/` and `/recipes/`. Existing links such as `/#products` are still accepted and converted to the new URLs.

## Technology

React 19, TypeScript, Vite 8, Tailwind CSS 4, Motion, and Lucide icons.

## Run locally

Install [Node.js](https://nodejs.org/) compatible with Vite 8 (20.19+ or 22.12+).

```bash
npm install
npm run dev
```

Open http://localhost:3000. The current website does not require a Gemini API key or other environment variables.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server on port 3000 |
| `npm run build` | Generate the social preview and prerender six pages into `dist/` |
| `npm test` | Run structural axe and simulated keyboard interaction checks |
| `npm run test:browser` | Run real browser keyboard and axe checks using locally installed Google Chrome |
| `npm run test:seo` | Check generated page metadata, image paths/dimensions, sitemap and canonical URLs |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run TypeScript checks without emitting files |
| `npm run clean` | Remove `dist/`, `.prerender/`, and `artifacts/` |

## Project structure

```text
src/
  App.tsx          Page navigation and shared page layout
  main.tsx         React entry point
  index.css        Theme, shared styles, and animations
  components/      Navigation, footer, product cards, modal, and brand visuals
  pages/           Home, Products, About, Recipes, Contact, and Privacy
  data/            Products, recipes, and business contact details
assets/            Images and video, including assets imported by the app
public/            Static files served directly
index.html         HTML entry point, metadata, and font loading
vite.config.ts     Vite configuration
```

Update business details in `src/data/business.ts`, products in `src/data/products.ts`, and recipes in `src/data/recipes.ts`. Some WhatsApp links are also written directly in the navigation and contact components.

## Preview status

The website currently contains preview content:

- The contact form opens WhatsApp with the visitor’s name, contact details, and message prefilled. The visitor must tap Send in WhatsApp. No application database stores the enquiry; a TODO comment preserves the future database-backed submission task.
- Product specifications, ingredients, availability, and commercial details require brand confirmation.
- Recipe quantities, methods, and allergen guidance require verification.
- The business name, address, and phone/WhatsApp number have been confirmed. The displayed email address is not yet official; delivery information remains to be confirmed.
- The privacy policy describes the current WhatsApp handoff. Update it when hosting, database-backed submissions, ordering, or analytics services are finalized.

## Deployment

Run `npm run build` and deploy the generated `dist/` directory to a static hosting service. The build creates actual `index.html` files for `/`, `/products/`, `/about/`, `/recipes/`, `/contact/`, and `/privacy/`. Keep directory-index support enabled; no SPA catch-all rewrite is required. Keep genuine unknown URLs as 404s using the generated `404.html`.

The confirmed production origin defaults to `https://woxwaffy.com`. Override it with `VITE_SITE_URL` if the domain changes. The build generates unique titles and descriptions, Open Graph/Twitter tags, a 1200×630 brand preview image, canonical URLs, WebSite structured data, `robots.txt`, and a sitemap. In-app navigation updates the title, descriptions, and canonical URL; crawlers and social platforms receive metadata directly in each page's HTML.

For a private/staging preview that should not be indexed, build with an explicit empty origin:

```bash
VITE_SITE_URL= npm run build
```

That build emits `noindex,nofollow`, a disallow-all robots file, and no production canonical or sitemap. Use `npm run test:seo` after either build. Set the production origin again when creating the public release. After deployment, check direct page loads and social previews, then submit `https://woxwaffy.com/sitemap.xml` in Google Search Console.

Accessibility changes and the remaining manual browser pass are documented in [docs/accessibility-checks.md](docs/accessibility-checks.md). Automated tests cover structure and keyboard handlers in jsdom; visual contrast, native browser focus behavior, and real touch-target sizes still require a browser pass.

## Image assets

The React site serves WebP images at quality 88, preserving transparency. Full-resolution images retain their original dimensions; responsive versions are generated at 320, 640, 960, 1280, and 1600 pixels wide where smaller than the original (never upscaled). Full-size WebP files are kept as the image sources. PNG copies have been removed; unique unused artwork has been preserved as WebP under `assets/`, including `assets/originals/`. The social preview is generated as JPEG for sharing compatibility.

To regenerate responsive variants and metadata after replacing a full-size WebP source:

```bash
python3 -m pip install Pillow
python3 scripts/convert-images.py
```

The generator leaves full-size WebP sources unchanged and creates missing or outdated responsive variants, preserving transparency and checking their dimensions. It also regenerates `src/data/image-manifest.ts`, used by `src/utils/imageProps.ts` to supply `srcset`, layout-specific `sizes`, and intrinsic dimensions. The homepage hero loads eagerly with high fetch priority; below-the-fold images load lazily.

To validate performance, run mobile Lighthouse against the same deployed preview URL before and after the change, using the same settings and comparing the median of three runs. Check LCP, CLS, image transfer sizes, and image sharpness on a high-density phone as well as desktop. Local builds alone do not establish a deployed Lighthouse improvement.
