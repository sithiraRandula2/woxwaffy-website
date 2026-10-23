import { useEffect } from 'react';
import { PAGE_META, pagePath, SITE_URL, type PageId } from '../data/site';

export function Seo({ page }: { page: PageId }) {
  useEffect(() => {
    const meta = PAGE_META[page];
    document.title = meta.title;
    const set = (selector: string, content: string) => {
      let tag = document.querySelector(selector);
      if (!tag) {
        const match = selector.match(/meta\[(name|property)="([^"]+)"\]/);
        if (!match) return;
        tag = document.createElement('meta');
        tag.setAttribute(match[1], match[2]);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };
    set('meta[name="description"]', meta.description);
    set('meta[property="og:title"]', meta.title);
    set('meta[property="og:description"]', meta.description);
    set('meta[name="twitter:title"]', meta.title);
    set('meta[name="twitter:description"]', meta.description);
    const origin = SITE_URL;
    if (origin) {
      const url = origin + pagePath(page);
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) { canonical = document.createElement('link'); canonical.setAttribute('rel', 'canonical'); document.head.appendChild(canonical); }
      canonical.setAttribute('href', url);
      set('meta[property="og:url"]', url);
    }
  }, [page]);
  return null;
}
