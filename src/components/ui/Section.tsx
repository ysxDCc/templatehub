import type { ReactNode } from 'react';
import Reveal from './Reveal';

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  className?: string;
  children?: ReactNode;
}

/** Page section with consistent padding and an h2 heading. */
export default function Section({ id, eyebrow, title, intro, className = '', children }: SectionProps) {
  return (
    <section id={id} className={`py-16 md:py-28 scroll-mt-20 ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal className="max-w-2xl mb-8 md:mb-12">
          {eyebrow && <p className="text-sm font-semibold text-lilac mb-2">{eyebrow}</p>}
          <h2 className="text-[28px] leading-tight md:text-[36px] font-bold text-ink tracking-tight text-balance">{title}</h2>
          {intro && <p className="mt-3 text-base md:text-lg text-muted leading-relaxed">{intro}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
