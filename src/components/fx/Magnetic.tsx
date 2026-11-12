'use client';

import { useRef, type ReactNode } from 'react';

/** Child drifts slightly toward the mouse (desktop mouse only, never with reduced motion). */
export default function Magnetic({ children, strength = 0.25 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  return (
    <span
      ref={ref}
      className="th-magnetic inline-flex"
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el || e.pointerType !== 'mouse' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * strength;
        const y = (e.clientY - (r.top + r.height / 2)) * strength;
        el.classList.add('is-pulling');
        el.style.transform = `translate(${x}px, ${y}px)`;
      }}
      onPointerLeave={() => {
        const el = ref.current;
        if (!el) return;
        el.classList.remove('is-pulling');
        el.style.transform = '';
      }}
    >
      {children}
    </span>
  );
}
