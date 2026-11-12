'use client';

import { useEffect, useState } from 'react';

const COLOURS = ['#7c3aed', '#c4b5fd', '#34d399', '#fbbf24', '#e879f9', '#f5f3ff'];

/** A short confetti burst. Re-runs whenever `burstKey` changes. Hidden under reduced motion (CSS). */
export default function Celebrate({ burstKey }: { burstKey: number }) {
  const [pieces, setPieces] = useState<{ id: number; style: React.CSSProperties }[]>([]);

  useEffect(() => {
    if (!burstKey) return;
    const list = Array.from({ length: 60 }, (_, i) => ({
      id: burstKey * 100 + i,
      style: {
        left: `${Math.random() * 100}%`,
        background: COLOURS[i % COLOURS.length],
        ['--x' as string]: `${(Math.random() - 0.5) * 240}px`,
        ['--r' as string]: `${(Math.random() - 0.5) * 1080}deg`,
        ['--d' as string]: `${1.3 + Math.random() * 1.1}s`,
        ['--delay' as string]: `${Math.random() * 0.25}s`,
      } as React.CSSProperties,
    }));
    setPieces(list);
    const t = window.setTimeout(() => setPieces([]), 2800);
    return () => window.clearTimeout(t);
  }, [burstKey]);

  if (pieces.length === 0) return null;
  return (
    <div className="th-confetti" aria-hidden="true">
      {pieces.map((p) => (
        <i key={p.id} style={p.style} />
      ))}
    </div>
  );
}

/** Animated check mark that draws itself. */
export function SuccessCheck({ size = 72 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 52 52" fill="none" aria-hidden="true">
      <circle className="th-check-circle" cx="26" cy="26" r="24" stroke="#34d399" strokeWidth="3" />
      <path className="th-check-mark" d="M15 27l7 7 15-16" stroke="#34d399" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
