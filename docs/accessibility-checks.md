# Accessibility verification

Run `npm test` for automated axe checks on all six pages and recipe/product details, plus simulated keyboard checks for dialog focus trapping and restoration, Escape dismissal, navigation, mobile-menu dismissal, and the enquiry form. Run `npm run lint`, `npm run build`, and `npm run test:seo` for the type and generated-page checks.

## Browser automation on your Mac

With Google Chrome installed, run:

```bash
npm run build
npm run test:browser
```

This uses your existing Chrome through Playwright's `chrome` channel; it does not download Chromium. It starts the production preview, runs real keyboard journeys and full axe scans including contrast, checks reduced-motion CSS, and writes `artifacts/accessibility-browser.json`. Review any `incomplete` contrast findings manually. To test a deployed preview instead, set `A11Y_BASE_URL=https://your-preview.example` when running the browser script. Safari still needs the manual pass below.

## Limits of the automated checks

These tests use jsdom. It does not implement real layout, native dialog inertness, pointer target measurements, or computed colour contrast; axe's colour-contrast rule is disabled in this environment. Motion is mocked so the tests verify document structure and interactions. Passing these checks does not establish WCAG compliance or replace browser testing.

## Browser keyboard pass before launch

Use the production preview from `npm run preview`. In Safari, enable Settings → Advanced → “Press Tab to highlight each item on a webpage” (wording varies by version). Use Tab, Shift+Tab, Enter, and Escape without a mouse:

- On each of Home, Products, About, Recipes, Contact, and Privacy, reach every visible control in a sensible order. Confirm the first Tab reveals Skip to content, Enter reaches the main content, and focus stays visible against cream, red, images, and cocoa backgrounds.
- Activate header and footer page links with Enter. Confirm the URL, title, active-page indication, and main-content focus change. Confirm browser Back and Forward work, including existing `/#products` links.
- Open a product with Enter. Focus should land on Close. Tab and Shift+Tab should wrap through the dialog controls; background links must be unavailable. Escape and Close must dismiss the dialog, restore focus to the product button, and restore page scrolling. The enquiry action should focus the Contact page.
- Open each recipe with Enter. Confirm focus moves to its heading. Activate All recipes with Enter and confirm focus returns to the same card.
- At a narrow viewport, open the navigation with Enter, Tab through its links, and close with Escape. Focus must return to the menu toggle. Tabbing beyond the navigation should close it without losing focus.
- On Contact, Tab through Name, Email or phone, Message, and Continue in WhatsApp. Confirm browser validation for empty fields, that the opened draft contains the entered information, and that no follow-up status text or fallback link is displayed. The visitor must tap Send in WhatsApp; do not send a test enquiry without intending to contact the business.

## Visual and assistive checks

- Run a browser-based axe scan or Lighthouse accessibility audit on every page and with the product dialog and a recipe open. Review contrast over gradients/photography manually as well as checking automated results.
- Inspect touch targets at phone/tablet widths: aim for at least 44×44 CSS pixels, with space around adjacent targets. Check links in the footer and navigation, social icons, and modal controls.
- Zoom to 200% and 400%; check reflow, clipped text, and visible keyboard focus.
- Enable the operating system's Reduce Motion setting and reload. Confirm jar drifting, bounce, hover transforms, sticky-story transforms, and smooth scrolling are disabled or reduced. Content must remain visible.
- Use VoiceOver in Safari to check landmarks, page headings, labelled fields, dialog announcement.

Record actual browser/version, date, failures and fixes when this pass is performed. Real-browser verification remains pending until it has been run.
