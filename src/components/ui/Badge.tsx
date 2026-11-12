import type { ReactNode } from 'react';

type Tone = 'free' | 'basic' | 'pro' | 'enterprise' | 'neutral';

const TONES: Record<Tone, string> = {
  free: 'bg-success/15 text-success border-success/30',
  basic: 'bg-lilac/10 text-lilac border-lilac/30',
  pro: 'bg-primary/25 text-ink border-primary/60',
  enterprise: 'bg-amber-400/15 text-amber-200 border-amber-300/30',
  neutral: 'bg-white/5 text-muted border-line',
};

/** Small label for plan tiers and statuses. */
export default function Badge({ tone = 'neutral', children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold capitalize border ${TONES[tone]}`}>
      {children}
    </span>
  );
}
