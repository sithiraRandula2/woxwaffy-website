import React, { useEffect, useRef, useState } from 'react';
import { MotionConfig, useReducedMotion } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { Seo } from './components/Seo';
import { Product } from './data/products';
import { Recipe } from './data/recipes';
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
  const reducedMotion = useReducedMotion();
  const focusAfterNavigation = useRef(false);
  useEffect(() => {
    const sync = () => {
      focusAfterNavigation.current = true;
      setPage(pageFromLocation(location.pathname, location.hash));
      setProduct(null);
    };
    // Preserve existing shared hash links while moving to crawlable page paths.
    if (location.hash && ['home', 'products', 'about', 'recipes', 'contact', 'privacy'].includes(location.hash.slice(1))) {
      history.replaceState(null, '', pagePath(page));
    }
    addEventListener('popstate', sync);
    addEventListener('hashchange', sync);
    return () => { removeEventListener('popstate', sync); removeEventListener('hashchange', sync); };
  }, []);
  useEffect(() => {
    if (focusAfterNavigation.current) {
      mainRef.current?.focus({ preventScroll: true });
      focusAfterNavigation.current = false;
    }
  }, [page]);
  const navigate = (next: PageId) => {
    if (next === page) mainRef.current?.focus({ preventScroll: true });
    else {
      focusAfterNavigation.current = true;
      history.pushState(null, '', pagePath(next));
      setPage(next);
    }
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'instant' : 'smooth' });
  };
  return <MotionConfig reducedMotion="user"><div className="min-h-screen bg-[#fffaf2] text-[#2b140d]">
    <Seo page={page}/>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <Navbar currentPage={page} onNavigate={navigate}/>
    <main id="main-content" ref={mainRef} tabIndex={-1}>
      {page === 'home' && <HomePage onNavigate={navigate} onSelectProduct={setProduct} onSelectRecipe={r => { setRecipe(r); navigate('recipes'); }}/>}
      {page === 'products' && <ProductsPage onSelectProduct={setProduct}/>}
      {page === 'about' && <AboutPage onNavigate={navigate}/>}
      {page === 'recipes' && <RecipesPage selectedRecipe={recipe} onSelectRecipe={setRecipe}/>}
      {page === 'contact' && <ContactPage/>}
      {page === 'privacy' && <PrivacyPage onNavigate={navigate}/>}
    </main>
    <ProductModal product={product} onClose={() => setProduct(null)} onInquire={() => { setProduct(null); navigate('contact'); }}/>
    <Footer onNavigate={navigate}/>
  </div></MotionConfig>;
}
