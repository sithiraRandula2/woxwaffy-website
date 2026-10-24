import { useEffect, useRef, useState } from 'react';
import { imageProps } from '../utils/imageProps';
import plainToast from '../../assets/story-plain-bread.webp';
import chocolateToast from '../../assets/story-chocolate-bread.webp';

export function ToastReveal({ reducedMotion }: { reducedMotion: boolean | null }) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);
  const [loaded, setLoaded] = useState<string[]>([]);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || reducedMotion) return;
    if (typeof IntersectionObserver === 'undefined') { setEntered(true); return; }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setEntered(true);
        observer.disconnect();
      }
    }, { threshold: 0.35 });
    observer.observe(scene);
    return () => observer.disconnect();
  }, [reducedMotion]);
  const animate = !reducedMotion && !failed;
  const playing = entered && loaded.length === 2;
  return <div className="page-shell relative py-12 sm:py-16 lg:hidden">
    <p className="eyebrow text-center !text-[#e8b777]">The everyday transformation</p>
    <h2 className="section-title mt-5 text-center">A little spread.<br/><em className="text-[#e8b777] font-normal">A little happiness.</em></h2>
    <div ref={sceneRef} className={`toast-reveal mx-auto mt-8 max-w-xl ${animate ? 'toast-reveal-animated' : ''} ${playing ? 'toast-reveal-playing' : ''}`}>
      <div className="relative isolate aspect-square overflow-hidden rounded-[2rem] border border-[#d4964d]/30 bg-[#f2d69f]">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_30%,#fffaf2,transparent_70%)]"/>
        {[plainToast, chocolateToast].map((src, index) => <img
          key={src}
          src={src}
          {...imageProps(src, '(min-width: 640px) 576px, calc(100vw - 32px)')}
          loading="lazy"
          alt={index === 0 ? '' : 'Stack of bread slices transformed with Woxwaffy chocolate spread'}
          aria-hidden={index === 0 ? true : undefined}
          onLoad={() => setLoaded(previous => previous.includes(src) ? previous : [...previous, src])}
          onError={() => setFailed(true)}
          className={`toast-reveal-${index === 0 ? 'plain' : 'finished'} absolute inset-0 h-full w-full object-contain p-6 sm:p-10 drop-shadow-xl`}
        />)}
        <div aria-hidden="true" className="toast-reveal-wipe absolute inset-y-0 left-0 w-[24%] bg-[#6e4c3e]"/>
      </div>
      <div className="relative mt-6 grid min-h-16 items-start text-center font-serif text-2xl sm:text-3xl text-[#fffaf2]">
        {['A simple start.', 'A little Woxwaffy.', 'An everyday pleasure.'].map((caption, index) => <p key={caption} aria-hidden="true" className={`toast-reveal-caption toast-reveal-caption-${index + 1} col-start-1 row-start-1`}>{caption}</p>)}
        <p className="sr-only">A simple start. A little Woxwaffy. An everyday pleasure.</p>
      </div>
    </div>
    <p className="mx-auto mt-4 max-w-md text-center leading-7 text-[#fffaf2]/80">Spread it on something warm, drizzle it over a favourite, or make up a ritual entirely your own.</p>
  </div>;
}
