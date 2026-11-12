import type { ReactNode } from 'react';

/** Horizontally swipeable row of chips with soft edge fades. */
export default function ChipScroller({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="relative -mx-4 sm:mx-0">
      <div
        role="group"
        aria-label={label}
        className="flex gap-2 overflow-x-auto snap-x scroll-px-4 hide-scrollbar px-4 sm:px-0 py-1 [mask-image:linear-gradient(to_right,transparent,black_16px,black_calc(100%-16px),transparent)] sm:[mask-image:none] sm:flex-wrap"
      >
        {children}
      </div>
    </div>
  );
}
