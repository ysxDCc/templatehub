'use client';

import { useEffect, useRef, useState } from 'react';
import { templates } from '@/data/templates';

/**
 * Rotating live preview of a few templates. One iframe is mounted at a time.
 * Pauses on hover/focus, when the tab is hidden or the carousel is off-screen,
 * and never auto-advances for people who prefer reduced motion.
 */
export default function HeroPreviewCarousel({ templateIds }: { templateIds: string[] }) {
  const items = templateIds.map((id) => templates.find((t) => t.id === id)).filter((t): t is NonNullable<typeof t> => !!t);
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([e]) => setVisible(e.intersectionRatio >= 0.15), { threshold: [0, 0.15, 1] });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const go = (next: number) => {
    setFading(true);
    window.setTimeout(() => {
      setIndex((next + items.length) % items.length);
      setFading(false);
    }, reduced ? 0 : 200);
  };

  useEffect(() => {
    if (reduced || paused || !visible || items.length < 2) return;
    const id = window.setInterval(() => {
      if (!document.hidden) go(index + 1);
    }, 5000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, paused, visible, index, items.length]);

  if (items.length === 0) return null;
  const current = items[index];

  return (
    <div
      ref={rootRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative"
    >
      <div className="rounded-section border border-line bg-surface overflow-hidden shadow-[0_40px_80px_-40px_rgb(124_58_237/0.6)]">
        <div className="flex items-center gap-2 px-4 h-10 border-b border-line bg-raised/60">
          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <span className="ml-2 text-xs text-muted truncate" aria-live="polite">
            {current.name}
          </span>
        </div>
        <div className="relative aspect-[4/3] md:aspect-[16/11] bg-bg">
          <iframe
            key={current.id}
            src={current.livePreviewUrl}
            title={`Live preview of ${current.name}`}
            loading="lazy"
            inert
            aria-hidden="true"
            className={`absolute inset-0 w-[200%] h-[200%] origin-top-left scale-50 border-0 pointer-events-none transition-opacity duration-200 ${fading ? 'opacity-0' : 'opacity-100'}`}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-1">
        <button type="button" aria-label="Previous template" onClick={() => go(index - 1)} className="w-11 h-11 inline-flex items-center justify-center rounded-full text-muted hover:text-ink hover:bg-white/5">
          <svg aria-hidden="true" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="m15 18-6-6 6-6" /></svg>
        </button>
        {items.map((t, i) => (
          <button
            key={t.id}
            type="button"
            aria-label={`Show ${t.name}`}
            aria-current={i === index ? 'true' : undefined}
            onClick={() => go(i)}
            className="w-11 h-11 inline-flex items-center justify-center"
          >
            <span className={`block h-2 rounded-full transition-all duration-300 ${i === index ? 'w-6 bg-lilac' : 'w-2 bg-white/25'}`} />
          </button>
        ))}
        <button type="button" aria-label="Next template" onClick={() => go(index + 1)} className="w-11 h-11 inline-flex items-center justify-center rounded-full text-muted hover:text-ink hover:bg-white/5">
          <svg aria-hidden="true" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="m9 18 6-6-6-6" /></svg>
        </button>
      </div>
    </div>
  );
}
