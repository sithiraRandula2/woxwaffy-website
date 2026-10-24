import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppIcon } from './components/WhatsAppIcon';
import { whatsappUrl } from './data/business';
import { ProductModal } from './components/ProductModal';
import { Seo } from './components/Seo';
import { Product } from './data/products';
import { RECIPES, Recipe } from './data/recipes';
import { pageFromLocation, pagePath, type PageId } from './data/site';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { AboutPage } from './pages/AboutPage';
import { RecipesPage } from './pages/RecipesPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';

export default function App({ initialPage = 'home' }: { initialPage?: PageId }) {
  const [page, setPage] = useState<PageId>(() => typeof window === 'undefined' ? initialPage : pageFromLocation(location.pathname, location.hash));
  const [product, setProduct] = useState<Product | null>(null);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const mainRef = useRef<HTMLElement>(null);
  const scrollAfterNavigation = useRef(false);
  const focusAfterNavigation = useRef(false);
  useEffect(() => {
    const sync = () => {
      focusAfterNavigation.current = true;
      const nextPage = pageFromLocation(location.pathname, location.hash);
      setPage(nextPage);
      setRecipe(nextPage === 'recipes' ? RECIPES.find(item => item.id === new URLSearchParams(location.search).get('recipe')) ?? null : null);
      setProduct(null);
    };
    // Preserve existing shared hash links while moving to crawlable page paths.
    if (location.hash && ['home', 'products', 'about', 'recipes', 'contact', 'privacy'].includes(location.hash.slice(1))) {
      history.replaceState(null, '', pagePath(page));
    }
    // Read query state after hydration so it matches the prerendered gallery.
    setRecipe(page === 'recipes' ? RECIPES.find(item => item.id === new URLSearchParams(location.search).get('recipe')) ?? null : null);
    addEventListener('popstate', sync);
    addEventListener('hashchange', sync);
    return () => { removeEventListener('popstate', sync); removeEventListener('hashchange', sync); };
  }, []);
  useEffect(() => {
    if (focusAfterNavigation.current) {
      mainRef.current?.focus({ preventScroll: true });
      focusAfterNavigation.current = false;
    }
  }, [page, recipe]);
  useLayoutEffect(() => {
    if (scrollAfterNavigation.current) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      scrollAfterNavigation.current = false;
    }
  }, [page, recipe]);
  const navigate = (next: PageId) => {
    scrollAfterNavigation.current = next !== page || recipe !== null;
    setRecipe(null);
    if (next === page) {
      if (location.search) history.pushState(null, '', pagePath(next));
      mainRef.current?.focus({ preventScroll: true });
    }
    else {
      focusAfterNavigation.current = true;
      history.pushState(null, '', pagePath(next));
      setPage(next);
    }
    if (!scrollAfterNavigation.current) window.scrollTo({ top: 0, behavior: 'instant' });
  };
  const selectRecipe = (next: Recipe | null) => {
    const url = pagePath('recipes') + (next ? `?recipe=${encodeURIComponent(next.id)}` : '');
    if (location.pathname + location.search !== url) history.pushState(null, '', url);
    if (page !== 'recipes') {
      focusAfterNavigation.current = true;
      scrollAfterNavigation.current = true;
    }
    setPage('recipes');
    setRecipe(next);
  };
  return <MotionConfig reducedMotion="user"><div className="min-h-screen bg-[#fffaf2] text-[#2b140d]">
    <Seo page={page}/>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <Navbar currentPage={page} onNavigate={navigate}/>
    <main id="main-content" ref={mainRef} tabIndex={-1}>
      {page === 'home' && <HomePage onNavigate={navigate} onSelectProduct={setProduct} onSelectRecipe={selectRecipe}/>}
      {page === 'products' && <ProductsPage onSelectProduct={setProduct}/>}
      {page === 'about' && <AboutPage onNavigate={navigate}/>}
      {page === 'recipes' && <RecipesPage selectedRecipe={recipe} onSelectRecipe={selectRecipe}/>}
      {page === 'contact' && <ContactPage/>}
      {page === 'privacy' && <PrivacyPage onNavigate={navigate}/>}
    </main>
    <ProductModal product={product} onClose={() => setProduct(null)} onInquire={() => { setProduct(null); navigate('contact'); }}/>
    <Footer onNavigate={navigate}/>
    <a href={whatsappUrl("Hi, I'm interested in WoxWaffy Chocolate Spread.")} target="_blank" rel="noopener noreferrer" aria-label="Chat with Woxwaffy on WhatsApp" title="WhatsApp" className="liquid-glass-green z-40 inline-flex h-14 w-14 items-center justify-center rounded-full text-white transition-transform hover:-translate-y-1 motion-reduce:transition-none" style={{ position: 'fixed', right: 'max(1.25rem, env(safe-area-inset-right))', bottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}>
      <WhatsAppIcon className="h-7 w-7"/>
    </a>
  </div></MotionConfig>;
}
