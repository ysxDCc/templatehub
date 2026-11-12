interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

const SIZES = {
  sm: { icon: 30, text: 'text-[17px]' },
  md: { icon: 34, text: 'text-lg' },
  lg: { icon: 40, text: 'text-xl' },
  xl: { icon: 56, text: 'text-3xl' },
};

/** TemplateHub mark + wordmark. Calm version for the 2026 redesign. */
export default function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const { icon, text } = SIZES[size];
  return (
    <span className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <svg width={icon} height={icon} viewBox="0 0 40 40" fill="none" aria-hidden="true" className="shrink-0">
        <defs>
          <linearGradient id="th-a" x1="6" y1="6" x2="34" y2="34" gradientUnits="userSpaceOnUse">
            <stop stopColor="#C4B5FD" />
            <stop offset="1" stopColor="#7C3AED" />
          </linearGradient>
          <linearGradient id="th-b" x1="34" y1="8" x2="8" y2="34" gradientUnits="userSpaceOnUse">
            <stop stopColor="#A78BFA" />
            <stop offset="1" stopColor="#4C1D95" />
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="38" height="38" rx="11" fill="#110A2B" stroke="rgb(196 181 253 / 0.35)" />
        <path d="M20 8 31 14.5 20 21 9 14.5Z" fill="url(#th-a)" />
        <path d="M9 14.5 20 21v12L9 26.5Z" fill="url(#th-b)" />
        <path d="M20 21 31 14.5v12L20 33Z" fill="#7C3AED" />
      </svg>
      {showText && (
        <span className={`${text} font-bold tracking-tight text-ink`}>
          Template<span className="text-lilac">Hub</span>
        </span>
      )}
    </span>
  );
}
