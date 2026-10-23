import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
afterEach(() => { cleanup(); history.replaceState(null, '', '/'); });
Object.defineProperty(window, 'matchMedia', { writable: true, value: vi.fn().mockImplementation(query => ({ matches: false, media: query, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} })) });
window.scrollTo = vi.fn();
HTMLCanvasElement.prototype.getContext = () => null;
HTMLElement.prototype.scrollIntoView = vi.fn();
// jsdom has no native dialog top layer. Exercise our explicit keyboard and focus logic;
// native inertness, real layout and computed contrast require a browser check.
HTMLDialogElement.prototype.showModal = function () { this.setAttribute('open', ''); };
HTMLDialogElement.prototype.close = function () { this.removeAttribute('open'); };
vi.mock('motion/react', async () => {
  const React = await import('react');
  const motion = new Proxy({}, { get: (_, tag: string) => React.forwardRef<HTMLElement, Record<string, unknown>>((props, ref) => {
    const { initial, animate, exit, transition, whileHover, whileInView, viewport, ...rest } = props;
    return React.createElement(tag, { ...rest, ref });
  }) });
  return {
    motion,
    MotionConfig: ({ children }: { children: React.ReactNode }) => children,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    useReducedMotion: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    useScroll: () => ({ scrollYProgress: 0 }),
    useTransform: (_value: unknown, _range: unknown, output: number[]) => output[0],
  };
});
