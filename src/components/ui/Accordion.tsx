import type { ReactNode } from 'react';

/** Accessible disclosure list built on native <details>. */
export default function Accordion({ items }: { items: { q: string; a: ReactNode }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex items-center justify-between gap-4 min-h-14 py-4 cursor-pointer list-none text-base md:text-lg font-semibold text-ink [&::-webkit-details-marker]:hidden">
            <span>{item.q}</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5 shrink-0 text-lilac transition-transform duration-200 group-open:rotate-45"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" d="M12 5v14M5 12h14" />
            </svg>
          </summary>
          <div className="pb-5 pr-8 text-base text-muted leading-relaxed">{item.a}</div>
        </details>
      ))}
    </div>
  );
}
