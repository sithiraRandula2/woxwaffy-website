export const SITE_URL = (import.meta.env.VITE_SITE_URL ?? 'https://woxwaffy.com').replace(/\/$/, '');

export const PAGE_IDS = ['home', 'products', 'about', 'recipes', 'contact', 'privacy'] as const;
export type PageId = typeof PAGE_IDS[number];

export const PAGE_META: Record<PageId, { title: string; description: string }> = {
  home: { title: 'Woxwaffy | Sri Lankan Chocolate Spread', description: 'Discover Woxwaffy, a joyful Sri Lankan chocolate spread brand. Explore the collection, serving inspiration, and ways to get in touch.' },
  products: { title: 'Chocolate Spread Collection | Woxwaffy', description: 'Explore the Woxwaffy chocolate spread collection and ask the team about product details, availability, and serving suggestions.' },
  about: { title: 'Our Story | Woxwaffy', description: 'Meet Woxwaffy, a Sri Lankan chocolate spread brand shaped around everyday joy and a playful love of chocolate.' },
  recipes: { title: 'Recipes & Serving Inspiration | Woxwaffy', description: 'Find Woxwaffy serving inspiration for toast, crepes, cookies, shakes, and other chocolate moments.' },
  contact: { title: 'Contact Woxwaffy | Product & Retail Enquiries', description: 'Contact Woxwaffy by WhatsApp or telephone for chocolate spread, retail, and wholesale enquiries. Find our contact and social links.' },
  privacy: { title: 'Privacy Policy | Woxwaffy', description: 'Learn how Woxwaffy handles WhatsApp enquiries, contact form details, third-party services, and privacy questions.' },
};

export function pagePath(page: PageId) { return page === 'home' ? '/' : `/${page}/`; }
export function pageFromLocation(pathname: string, hash = ''): PageId {
  const legacy = hash.replace(/^#/, '');
  const value = PAGE_IDS.includes(legacy as PageId) ? legacy : pathname.replace(/^\/+|\/+$/g, '');
  return PAGE_IDS.includes(value as PageId) ? value as PageId : 'home';
}
