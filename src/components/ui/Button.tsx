import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-primary text-white hover:bg-primary-hover shadow-[0_8px_24px_-8px_rgb(124_58_237/0.6)]',
  secondary: 'bg-raised text-ink border border-line hover:border-line-strong hover:bg-[#21164f]',
  ghost: 'text-lilac hover:text-ink hover:bg-white/5',
};
const SIZES: Record<Size, string> = {
  sm: 'min-h-11 px-4 text-sm',
  md: 'min-h-11 px-5 text-[15px]',
  lg: 'min-h-12 px-7 text-base',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  children: ReactNode;
}

/** Primary/secondary/ghost button. Renders a Next.js link when `href` is set. Always ≥ 44px tall. */
export default function Button({ variant = 'primary', size = 'md', href, className = '', children, ...rest }: ButtonProps) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-control font-semibold transition-[background-color,border-color,transform,color] duration-150 ease-[var(--ease-out-soft)] active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none ${VARIANTS[variant]} ${SIZES[size]} ${className}`;
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  );
}
