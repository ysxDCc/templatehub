interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  /** Play the assemble animation on mount (default true). */
  animated?: boolean;
  className?: string;
}

const SIZES = {
  sm: { icon: 30, text: 'text-[17px]' },
  md: { icon: 34, text: 'text-lg' },
  lg: { icon: 40, text: 'text-xl' },
  xl: { icon: 56, text: 'text-3xl' },
};

/**
 * TemplateHub mark: three cube faces that fly in and snap together on load,
 * then part slightly on hover. All motion is CSS (see .th-logo in globals.css)
 * and is disabled for people who prefer reduced motion.
 */
export default function Logo({ size = 'md', showText = true, animated = true, className = '' }: LogoProps) {
  const { icon, text } = SIZES[size];
  return (
    <span className={`th-logo ${animated ? 'th-logo--animate' : ''} inline-flex items-center gap-2.5 select-none ${className}`}>
      <svg width={icon} height={icon} viewBox="0 0 40 40" fill="none" aria-hidden="true" className="shrink-0 overflow-visible">
        <defs>
          <linearGradient id="th-a" x1="6" y1="6" x2="34" y2="34" gradientUnits="userSpaceOnUse">
            <stop stopColor="#C4B5FD" />
            <stop offset="1" stopColor="#7C3AED" />
          </linearGradient>
          <linearGradient id="th-b" x1="34" y1="8" x2="8" y2="34" gradientUnits="userSpaceOnUse">
            <stop stopColor="#A78BFA" />
            <stop offset="1" stopColor="#4C1D95" />
          </linearGradient>
          <linearGradient id="th-shine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0.55" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <clipPath id="th-cube">
            <path d="M20 8 31 14.5v12L20 33 9 26.5v-12Z" />
          </clipPath>
        </defs>
        <rect className="th-logo__tile" x="1" y="1" width="38" height="38" rx="11" fill="#110A2B" stroke="rgb(196 181 253 / 0.35)" />
        <g className="th-logo__cube">
          <path className="th-logo__face th-logo__face--top" d="M20 8 31 14.5 20 21 9 14.5Z" fill="url(#th-a)" />
          <path className="th-logo__face th-logo__face--left" d="M9 14.5 20 21v12L9 26.5Z" fill="url(#th-b)" />
          <path className="th-logo__face th-logo__face--right" d="M20 21 31 14.5v12L20 33Z" fill="#7C3AED" />
          <g clipPath="url(#th-cube)">
            <rect className="th-logo__shine" x="-14" y="4" width="10" height="34" fill="url(#th-shine)" transform="skewX(-20)" />
          </g>
        </g>
      </svg>
      {showText && (
        <span className={`th-logo__word ${text} font-bold tracking-tight text-ink`}>
          Template<span className="text-lilac">Hub</span>
        </span>
      )}
    </span>
  );
}
