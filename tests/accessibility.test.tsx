import React, { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import App from '../src/App';
import { ProductModal } from '../src/components/ProductModal';
import { PRODUCTS } from '../src/data/products';
import { PAGE_IDS, PAGE_META, pageFromLocation } from '../src/data/site';

function ModalFixture() {
  const [open, setOpen] = useState(false);
  return <><button onClick={() => setOpen(true)}>Open product</button><ProductModal product={open ? PRODUCTS[0] : null} onClose={() => setOpen(false)} onInquire={() => setOpen(false)}/></>;
}

describe('Product dialog keyboard behavior', () => {
  it('opens with Enter, traps Tab in both directions, and restores opener on close', async () => {
    const user = userEvent.setup();
    render(<ModalFixture/>);
    const opener = screen.getByRole('button', { name: 'Open product' });
    await user.tab();
    expect(document.activeElement).toBe(opener);
    await user.keyboard('{Enter}');
    const dialog = screen.getByRole('dialog');
    const close = within(dialog).getByRole('button', { name: 'Close' });
    const inquire = within(dialog).getByRole('button', { name: 'Ask about this product' });
    expect(document.activeElement).toBe(close);
    expect(document.body.style.overflow).toBe('hidden');
    await user.tab({ shift: true }); expect(document.activeElement).toBe(inquire);
    await user.tab(); expect(document.activeElement).toBe(close);
    await user.tab(); expect(document.activeElement).toBe(inquire);
    await user.tab(); expect(document.activeElement).toBe(close);
    await user.keyboard('{Enter}');
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(document.activeElement).toBe(opener);
    expect(document.body.style.overflow).toBe('');
  });
  it('handles the native Escape cancel event and restores focus', async () => {
    const user = userEvent.setup(); render(<ModalFixture/>);
    const opener = screen.getByRole('button', { name: 'Open product' });
    await user.click(opener);
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).toBeNull(); expect(document.activeElement).toBe(opener);
  });
  it('has no detectable axe violations while open', async () => {
    const user = userEvent.setup(); const { container } = render(<ModalFixture/>);
    await user.click(screen.getByRole('button', { name: 'Open product' }));
    const result = await axe.run(container, { rules: { 'color-contrast': { enabled: false }, region: { enabled: false } } });
    expect(result.violations).toEqual([]);
  });
});

describe('Site accessibility', () => {
  for (const page of PAGE_IDS) {
    it(`${page}: has named controls, labelled fields and no detectable structural axe violations`, async () => {
      history.replaceState(null, '', page === 'home' ? '/' : `/${page}`);
      const { container } = render(<App/>);
      expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
      const result = await axe.run(container, { rules: { 'color-contrast': { enabled: false } } });
      expect(result.violations.map(x => ({ id: x.id, nodes: x.nodes.map(n => n.html) }))).toEqual([]);
      expect(document.title).toBe(PAGE_META[page].title);
    });
  }
  it('puts the skip link first, navigates with Enter, and focuses main content', async () => {
    const user = userEvent.setup(); render(<App/>);
    await user.tab(); expect(document.activeElement).toBe(screen.getByRole('link', { name: 'Skip to content' }));
    const shop = screen.getAllByRole('link', { name: 'Shop' })[0];
    shop.focus(); await user.keyboard('{Enter}');
    expect(location.pathname).toBe('/products/');
    expect(document.activeElement).toBe(screen.getByRole('main'));
  });
  it('closes the mobile menu with Escape and focuses its toggle', async () => {
    const user = userEvent.setup(); render(<App/>);
    const toggle = screen.getByRole('button', { name: 'Open menu' });
    await user.click(toggle); expect(toggle.getAttribute('aria-expanded')).toBe('true');
    await user.keyboard('{Escape}'); expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(toggle);
  });
  it('maps legacy hash links and clean routes', () => {
    expect(pageFromLocation('/', '#products')).toBe('products');
    expect(pageFromLocation('/contact/')).toBe('contact');
    expect(pageFromLocation('/', '#main-content')).toBe('home');
    expect(pageFromLocation('/products', '#main-content')).toBe('products');
  });
});

describe('Recipe and contact keyboard journeys', () => {
  it('restores a recipe from a shared URL after mounting', async () => {
    history.replaceState(null, '', '/recipes/?recipe=woxwaffy-shake-classic');
    const view = render(<App/>);
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Classic Woxwaffy Shake');
    view.unmount();
    render(<App/>);
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Classic Woxwaffy Shake');
  });
  it('returns to the gallery with Back and restores the recipe with Forward', async () => {
    const user = userEvent.setup();
    history.replaceState(null, '', '/recipes/');
    render(<App/>);
    const card = screen.getAllByRole('button').find(button => button.hasAttribute('data-recipe-id'))!;
    const id = card.getAttribute('data-recipe-id');
    await user.click(card);
    expect(new URLSearchParams(location.search).get('recipe')).toBe(id);
    history.back();
    await waitFor(() => expect(screen.queryByRole('button', { name: 'All recipes' })).toBeNull());
    expect(location.search).toBe('');
    history.forward();
    await waitFor(() => expect(screen.getByRole('button', { name: 'All recipes' })).toBeTruthy());
    expect(new URLSearchParams(location.search).get('recipe')).toBe(id);
  });
  it('shows the gallery for an unknown recipe and clears selection when navigating away', async () => {
    const user = userEvent.setup();
    history.replaceState(null, '', '/recipes/?recipe=unknown');
    render(<App/>);
    expect(screen.queryByRole('button', { name: 'All recipes' })).toBeNull();
    await user.click(screen.getAllByRole('button').find(button => button.hasAttribute('data-recipe-id'))!);
    await user.click(screen.getAllByRole('link', { name: 'Shop' })[0]);
    await user.click(screen.getAllByRole('link', { name: 'Recipes' })[0]);
    expect(location.pathname + location.search).toBe('/recipes/');
    expect(screen.queryByRole('button', { name: 'All recipes' })).toBeNull();
  });

  it('opens a recipe with Enter, focuses the title, and returns to its card', async () => {
    const user = userEvent.setup(); history.replaceState(null, '', '/recipes/'); render(<App/>);
    const recipe = screen.getAllByRole('button').find(button => button.hasAttribute('data-recipe-id'))!;
    recipe.focus(); await user.keyboard('{Enter}');
    expect(document.activeElement).toBe(screen.getByRole('heading', { level: 1 }));
    const result = await axe.run(screen.getByRole('main'), { rules: { 'color-contrast': { enabled: false } } });
    expect(result.violations).toEqual([]);
    screen.getByRole('button', { name: 'All recipes' }).focus(); await user.keyboard('{Enter}');
    expect(document.activeElement?.getAttribute('data-recipe-id')).toBe(recipe.getAttribute('data-recipe-id'));
  });
  it('opens an encoded WhatsApp draft by keyboard without adding follow-up text', async () => {
    const open = vi.spyOn(window, 'open').mockReturnValue(null);
    const user = userEvent.setup(); history.replaceState(null, '', '/contact/'); render(<App/>);
    const name = screen.getByRole('textbox', { name: 'Name' }); name.focus();
    await user.keyboard('Keyboard visitor'); await user.tab();
    expect(document.activeElement).toBe(screen.getByRole('textbox', { name: 'Email or phone (optional)' }));
    await user.keyboard('visitor@example.com'); await user.tab();
    expect(document.activeElement).toBe(screen.getByRole('textbox', { name: 'Message' }));
    await user.keyboard('Please tell me about your products.'); await user.tab(); await user.keyboard('{Enter}');
    expect(open).toHaveBeenCalledTimes(1);
    const [url, target, features] = open.mock.calls[0];
    const draft = new URL(String(url));
    expect(draft.origin + draft.pathname).toBe('https://wa.me/94744108853');
    expect(draft.searchParams.get('text')).toBe('Hello Woxwaffy!\n\nName: Keyboard visitor\nEmail or phone: visitor@example.com\n\nMessage:\nPlease tell me about your products.');
    expect(target).toBe('_blank'); expect(features).toBe('noopener,noreferrer');
    expect(screen.queryByRole('status')).toBeNull();
    expect(screen.queryByRole('link', { name: 'Open WhatsApp if it didn’t open' })).toBeNull();
    expect((screen.getByRole('textbox', { name: 'Name' }) as HTMLInputElement).value).toBe('Keyboard visitor');
    open.mockRestore();
  });
});


describe('WhatsApp enquiry validation and encoding', () => {
  it('does not open WhatsApp for missing required fields', async () => {
    const open = vi.spyOn(window, 'open').mockReturnValue(null);
    const user = userEvent.setup(); history.replaceState(null, '', '/contact/'); render(<App/>);
    await user.click(screen.getByRole('button', { name: 'Continue in WhatsApp' }));
    expect(open).not.toHaveBeenCalled();
    expect(screen.queryByRole('status')).toBeNull();
    open.mockRestore();
  });
  it('preserves special characters and line breaks in the draft', async () => {
    const open = vi.spyOn(window, 'open').mockReturnValue(null);
    const user = userEvent.setup(); history.replaceState(null, '', '/contact/'); render(<App/>);
    await user.type(screen.getByRole('textbox', { name: 'Name' }), 'N & S');
    await user.type(screen.getByRole('textbox', { name: 'Email or phone (optional)' }), 'hello+retail@example.com');
    await user.type(screen.getByRole('textbox', { name: 'Message' }), 'Price for 2 jars? & delivery #1\nThank you!');
    await user.click(screen.getByRole('button', { name: 'Continue in WhatsApp' }));
    const draft = new URL(String(open.mock.calls[0][0]));
    expect(draft.searchParams.size).toBe(1);
    expect(draft.searchParams.get('text')).toContain('N & S');
    expect(draft.searchParams.get('text')).toContain('hello+retail@example.com');
    expect(draft.searchParams.get('text')).toContain('Price for 2 jars? & delivery #1\nThank you!');
    open.mockRestore();
  });
});
