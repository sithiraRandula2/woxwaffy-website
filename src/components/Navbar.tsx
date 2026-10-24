import React, { useEffect, useRef, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { pagePath } from '../data/site';
import { navigateLink } from '../utils/navigation';
import { WoxwaffyLogo } from './WoxwaffyLogo';
import { WhatsAppIcon } from './WhatsAppIcon';

import type { PageId } from '../data/site';
export type { PageId } from '../data/site';
export const Navbar: React.FC<{ currentPage: PageId; onNavigate: (page: PageId) => void }> = ({ currentPage, onNavigate }) => {
  const [open, setOpen] = useState(false); const [scrolled, setScrolled] = useState(false);
  const [offset, setOffset] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); menuButtonRef.current?.focus(); }
    };
    document.addEventListener('keydown', escape);
    return () => document.removeEventListener('keydown', escape);
  }, [open]);
  useEffect(() => {
    let previousY = Math.max(0, window.scrollY);
    setScrolled(previousY > 24);
    const onScroll = () => {
      const currentY = Math.max(0, window.scrollY);
      setScrolled(currentY > 24);
      const delta = currentY - previousY;
      const height = headerRef.current?.offsetHeight ?? 80;
      setOffset(previous => open || headerRef.current?.contains(document.activeElement) || currentY === 0 ? 0 : Math.min(height, Math.max(0, previous + delta)));
      previousY = currentY;
    };
    if (open) setOffset(0);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [open]);
  const links: { label: string; page: PageId }[] = [{label:'Shop',page:'products'},{label:'Our story',page:'about'},{label:'Recipes',page:'recipes'},{label:'Contact',page:'contact'}];
  const go = (page: PageId) => { onNavigate(page); setOpen(false); };
  return <header onBlurCapture={event => { if (open && !event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false); }} ref={headerRef} onFocusCapture={() => setOffset(0)} style={{ transform: `translateY(-${offset}px)` }} className={`sticky top-0 z-50 bg-[#fffaf2]/75 backdrop-blur-[22px] backdrop-saturate-[180%] border-b border-white/50 transition-shadow duration-300 motion-reduce:transition-none ${scrolled ? 'shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_8px_28px_rgba(72,35,18,0.1)]' : 'shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]'}`}>
    <nav className="page-shell h-20 flex items-center justify-between" aria-label="Primary navigation">
      <a href="/" onClick={event => navigateLink(event, () => go('home'))} aria-label="Woxwaffy home"><WoxwaffyLogo variant="dark" size="sm" showTagline={false} /></a>
      <div className="hidden lg:flex items-center gap-8">{links.map(link => <a key={link.page} href={pagePath(link.page)} aria-current={currentPage === link.page ? 'page' : undefined} onClick={event => navigateLink(event, () => go(link.page))} className={`inline-flex items-center text-sm font-semibold hover:text-[#b72a30] ${currentPage === link.page ? 'text-[#b72a30]' : 'text-[#2b140d]/70'}`}>{link.label}</a>)}</div>
      <div className="ml-auto flex items-center gap-2 lg:ml-0"><a href="https://wa.me/94744108853?text=Hi%2C%20I%27m%20interested%20in%20WoxWaffy%20Chocolate%20Spread." target="_blank" rel="noopener noreferrer" aria-label="Chat with Woxwaffy on WhatsApp" title="WhatsApp" className="liquid-glass-green hidden md:inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition hover:-translate-y-0.5"><WhatsAppIcon className="w-6 h-6"/></a>
      <button ref={menuButtonRef} onClick={() => setOpen(!open)} className="lg:hidden min-h-11 min-w-11 inline-flex items-center justify-center p-2 rounded-full" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X /> : <Menu />}</button></div>
    </nav>
    <AnimatePresence>{open && <motion.div id="mobile-navigation" initial={false} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} className="lg:hidden bg-[#fffaf2] border-t border-[#2b140d]/10 px-4 py-5 shadow-xl"><div className="page-shell flex flex-col gap-1">{links.map(link => <a key={link.page} href={pagePath(link.page)} aria-current={currentPage === link.page ? 'page' : undefined} onClick={event => navigateLink(event, () => go(link.page))} className="min-h-12 text-left text-xl font-serif px-4 py-3 rounded-xl hover:bg-white">{link.label}</a>)}<a href="https://wa.me/94744108853?text=Hi%2C%20I%27m%20interested%20in%20WoxWaffy%20Chocolate%20Spread." target="_blank" rel="noopener noreferrer" className="liquid-glass-green md:hidden mt-3 min-h-12 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-white"><WhatsAppIcon className="w-5 h-5"/> WhatsApp <ArrowUpRight className="w-4 h-4" /></a></div></motion.div>}</AnimatePresence>
  </header>;
};
