import type { ReactNode } from 'react';

interface ChipProps {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
}

/** Toggle chip for filters. Uses aria-pressed; ≥ 44px tall. */
export default function Chip({ selected, onClick, children }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`shrink-0 snap-start inline-flex items-center justify-center gap-2 min-h-11 min-w-11 px-4 rounded-full text-sm font-medium whitespace-nowrap border transition-colors duration-150 ${
        selected
          ? 'bg-primary border-primary text-white'
          : 'bg-surface border-line text-muted hover:text-ink hover:border-line-strong'
      }`}
    >
      {children}
    </button>
  );
}
