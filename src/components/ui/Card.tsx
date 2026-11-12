import type { ReactNode } from 'react';

interface CardProps {
  interactive?: boolean;
  as?: 'div' | 'article' | 'li';
  className?: string;
  children: ReactNode;
}

/** Surface container. `interactive` adds a gentle lift on hover/focus-within. */
export default function Card({ interactive = false, as: Tag = 'div', className = '', children }: CardProps) {
  const lift = interactive
    ? 'transition-[transform,border-color,box-shadow] duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_16px_40px_-16px_rgb(124_58_237/0.45)] focus-within:-translate-y-1 focus-within:border-line-strong'
    : '';
  return <Tag className={`relative rounded-card border border-line bg-surface overflow-hidden [overflow-wrap:anywhere] ${lift} ${className}`}>{children}</Tag>;
}
