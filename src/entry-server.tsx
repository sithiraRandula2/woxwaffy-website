import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { PAGE_IDS, PAGE_META, pagePath, SITE_URL, type PageId } from './data/site';
export { PAGE_IDS, PAGE_META, pagePath, SITE_URL };
export function renderPage(page: PageId) { return renderToString(<App initialPage={page}/>); }
