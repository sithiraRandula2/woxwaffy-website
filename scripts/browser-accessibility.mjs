// Uses an existing Google Chrome installation; no Playwright browser download required.
import { chromium } from 'playwright';
import { createRequire } from 'node:module';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';
const require = createRequire(import.meta.url);
const axeSource = await readFile(require.resolve('axe-core/axe.min.js'), 'utf8');
const baseURL = process.env.A11Y_BASE_URL || 'http://127.0.0.1:4175';
let server, browser;
const results = [];
try {
  if (!process.env.A11Y_BASE_URL) {
    server = spawn('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', '4175', '--strictPort'], { stdio: 'ignore' });
    let ready = false;
    for (let attempt = 0; attempt < 100; attempt++) {
      try { ready = (await fetch(baseURL)).ok; } catch {}
      if (ready) break;
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    assert.ok(ready, 'Production preview did not start; run npm run build first.');
  }
  browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const scan = async label => {
    await page.evaluate(axeSource);
    const { violations, incomplete } = await page.evaluate(() => window.axe.run(document));
    results.push({ label, violations, incomplete });
    assert.equal(violations.length, 0, `${label}: ${violations.map(v => `${v.id}: ${v.nodes.map(n => n.target.join(' ')).join(', ')}`).join('\n')}`);
  };
  for (const route of ['', 'products/', 'about/', 'recipes/', 'contact/', 'privacy/']) {
    await page.goto(`${baseURL}/${route}`);
    await page.locator('h1').waitFor();
    await page.keyboard.press('Tab');
    await page.getByRole('link', { name: 'Skip to content' }).evaluate(el => {
      if (document.activeElement !== el) throw new Error('Skip link must be first in keyboard order.');
    });
    await page.keyboard.press('Enter');
    await page.locator('main').evaluate(el => {
      if (document.activeElement !== el) throw new Error('Skip link did not focus main.');
    });
    await scan(route || 'home');
  }
  await page.goto(`${baseURL}/products/`);
  const product = page.locator('main article button').first();
  await product.focus(); await page.keyboard.press('Enter');
  const dialog = page.getByRole('dialog');
  await dialog.waitFor();
  const close = dialog.getByRole('button', { name: 'Close', exact: true });
  const inquire = dialog.getByRole('button', { name: 'Ask about this product' });
  const focused = async locator => assert.ok(await locator.evaluate(el => el === document.activeElement));
  await focused(close);
  await page.keyboard.press('Shift+Tab'); await focused(inquire);
  await page.keyboard.press('Tab'); await focused(close);
  await scan('product dialog');
  await page.keyboard.press('Escape'); await focused(product);

  await page.goto(`${baseURL}/recipes/`);
  const recipe = page.locator('[data-recipe-id]').first();
  await recipe.focus(); await page.keyboard.press('Enter');
  await focused(page.locator('main h1')); await scan('recipe detail');
  await page.getByRole('button', { name: 'All recipes' }).focus(); await page.keyboard.press('Enter');
  await focused(page.locator('[data-recipe-id]').first());

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(baseURL);
  const menu = page.getByRole('button', { name: 'Open menu' });
  await menu.focus(); await page.keyboard.press('Enter');
  await page.keyboard.press('Tab'); await page.keyboard.press('Escape');
  await focused(page.getByRole('button', { name: 'Open menu' }));
  await scan('mobile home');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  assert.equal(await page.locator('.jar-drift').evaluate(el => getComputedStyle(el).animationName), 'none');
  console.log('Real Chrome keyboard journeys, reduced-motion CSS, and axe scans passed. Review incomplete contrast results and complete the manual Safari checklist.');
} finally {
  await mkdir('artifacts', { recursive: true });
  await writeFile('artifacts/accessibility-browser.json', JSON.stringify({ checkedAt: new Date().toISOString(), baseURL, results }, null, 2));
  await browser?.close(); server?.kill();
}
