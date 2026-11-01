'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Template } from '@/types';
import { useFavorites } from '@/context/FavoritesContext';

interface TemplateCardProps {
  template: Template;
}

export default function TemplateCard({ template }: TemplateCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(template.id);

  const tierBadge = 
    template.tier === 'free' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
    template.tier === 'basic' ? 'bg-zinc-800 text-zinc-300 border-zinc-700' :
    template.tier === 'pro' ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20' :
    'bg-amber-500/10 text-amber-300 border-amber-500/20';

  return (
    <Link href={`/templates/${template.id}`} className="group block h-full">
      <div className="h-full rounded-xl bg-zinc-900/60 border border-white/[0.08] overflow-hidden transition-all duration-200 hover:border-white/20 hover:bg-zinc-900/90 flex flex-col">
        {/* Preview Image Frame */}
        <div className="relative aspect-[16/10] w-full bg-zinc-950 overflow-hidden border-b border-white/[0.06]">
          <Image 
            src={template.previewImage} 
            alt={template.name}
            fill
            unoptimized
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />

          {/* Top Overlays: Favorite Button & Tier Badge */}
          <div className="absolute top-2.5 left-2.5 z-10">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite(template.id);
              }}
              title={favorited ? 'Remove from favorites' : 'Save to favorites'}
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all backdrop-blur-md border ${
                favorited
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-400 scale-105'
                  : 'bg-zinc-950/70 border-white/10 text-zinc-400 hover:text-white hover:bg-zinc-900/90'
              }`}
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </button>
          </div>

          <div className="absolute top-2.5 right-2.5 z-10">
            <span className={`px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase rounded-md border backdrop-blur-xs ${tierBadge}`}>
              {template.tier}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Brand tag + category */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold text-zinc-200 truncate">
              {template.name}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-mono">
              {template.category}
            </span>
          </div>

          {/* Description */}
          <p className="text-xs text-zinc-400 line-clamp-2 mb-4 flex-grow leading-relaxed">
            {template.description}
          </p>

          {/* Metadata Row */}
          <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] text-[11px] text-zinc-500">
            <div className="flex items-center gap-1.5">
              <span className="text-zinc-400">★ {template.rating.toFixed(1)}</span>
              <span>•</span>
              <span>{template.downloads.toLocaleString()} downloads</span>
            </div>
            <div className="flex items-center gap-2">
              {template.accessibilityScore && (
                <span className={`px-1.5 py-0.5 text-[9px] font-bold tracking-wide rounded border ${
                  template.accessibilityScore === 'AAA'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : template.accessibilityScore === 'AA'
                    ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                }`}>
                  WCAG {template.accessibilityScore}
                </span>
              )}
              <span className="text-zinc-400 group-hover:text-white font-medium transition-colors">
                Preview →
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
