'use client';

import { useEffect, useRef, type ElementType, type ReactNode } from 'react';

interface RevealProps {
  as?: ElementType;
  delay?: number;
  className?: string;
  children: ReactNode;
}

/**
 * Fades and lifts its content in the first time it scrolls into view.
 * CSS in globals.css handles the animation and the reduced-motion fallback.
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.classList.add('is-visible');
            io.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -5% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} data-reveal="" className={className} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </Tag>
  );
}
