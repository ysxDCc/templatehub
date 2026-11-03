'use client';

import { useState } from 'react';
import type { Template } from '@/types';

interface TemplateLogoProps {
  template: Template;
  size?: number;
  className?: string;
}

// Map of template IDs that have verified vector SVG logos
const VERIFIED_LOGOS = new Set([
  'solaris-fusion', 'velvet-atelier', 'aether-neuro', 'obsidian-terminal', 'valkyrie-aero',
  'horology-complication', 'arcane-distillery', 'hyperion-robotics', 'magma-deepcore', 'apex-endurance',
  'monolith-acoustics', 'terra-mycelium', 'helios-orbital', 'kaiseki-sanctuary', 'vanguard-quant',
  'hydros-foil', 'solarium-conservatory', 'sentinel-swarm', 'brutalist-sanctuary', 'pulselab-crispr'
]);

export default function TemplateLogo({ template, size = 28, className = '' }: TemplateLogoProps) {
  const [imgError, setImgError] = useState(false);
  const hasDedicatedLogo = VERIFIED_LOGOS.has(template.id);

  if (hasDedicatedLogo && !imgError) {
    return (
      <span
        style={{ width: `${size}px`, height: `${size}px` }}
        className={`inline-flex items-center justify-center shrink-0 rounded-lg bg-zinc-900/90 border border-white/10 p-1 shadow-sm ${className}`}
      >
        <img
          src={`/logos/${template.id}.svg`}
          alt={`${template.name} logo`}
          width={size - 4}
          height={size - 4}
          onError={() => setImgError(true)}
          className="w-full h-full object-contain"
        />
      </span>
    );
  }

  // Fallback to emoji or first token in template.logo
  const fallbackIcon = template.logo?.split(' ')[0] || '✦';

  return (
    <span
      style={{ width: `${size}px`, height: `${size}px`, fontSize: `${Math.round(size * 0.55)}px` }}
      className={`inline-flex items-center justify-center shrink-0 rounded-lg bg-purple-950/40 border border-purple-500/20 text-purple-200 select-none ${className}`}
    >
      {fallbackIcon}
    </span>
  );
}
