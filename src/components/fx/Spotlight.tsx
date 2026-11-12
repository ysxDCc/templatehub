'use client';

import { useRef, type ReactNode } from 'react';

/** Soft purple light that follows the mouse across a section. */
export default function Spotlight({ children, className = '', as: Tag = 'div' }: { children: ReactNode; className?: string; as?: 'div' | 'section' }) {
  const ref = useRef<HTMLElement>(null);
  return (
    <Tag
      ref={ref as never}
      className={`th-spotlight ${className}`}
      onPointerMove={(e: React.PointerEvent<HTMLElement>) => {
        const el = ref.current;
        if (!el || e.pointerType !== 'mouse') return;
        const r = el.getBoundingClientRect();
        el.style.setProperty('--sx', `${e.clientX - r.left}px`);
        el.style.setProperty('--sy', `${e.clientY - r.top}px`);
        el.classList.add('is-lit');
      }}
      onPointerLeave={() => ref.current?.classList.remove('is-lit')}
    >
      {children}
    </Tag>
  );
}
