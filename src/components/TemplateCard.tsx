'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Template } from '@/types';
import { useFavorites } from '@/context/FavoritesContext';
import { cyberSound } from '@/lib/sound';

interface TemplateCardProps {
  template: Template;
  onQuickView?: (template: Template) => void;
}

export default function TemplateCard({ template, onQuickView }: TemplateCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(template.id);

  const tierBadge = 
    template.tier === 'free' ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' :
    template.tier === 'basic' ? 'bg-purple-900/50 text-purple-200 border-purple-500/30' :
    template.tier === 'pro' ? 'bg-fuchsia-900/50 text-fuchsia-200 border-fuchsia-500/40 shadow-[0_0_8px_rgba(232,121,249,0.3)]' :
    'bg-amber-500/15 text-amber-300 border-amber-500/30';

  return (
    <Link href={`/templates/${template.id}`} className="group block h-full">
      <div className="h-full rounded-2xl bg-[#0d0622]/85 border border-purple-500/20 overflow-hidden transition-all duration-300 hover:border-purple-400/80 hover:bg-[#140838] hover:shadow-[0_0_35px_rgba(168,85,247,0.3)] hover:-translate-y-1 flex flex-col">
        
        {/* Preview Image Frame with 16:10 Ratio */}
        <div className="relative aspect-[16/10] w-full bg-[#070314] overflow-hidden border-b border-purple-500/20">
          <Image 
            src={template.previewImage} 
            alt={template.name}
            fill
            unoptimized
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Top Overlays: Favorite Button & Tier Badge */}
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                cyberSound.playClick();
                toggleFavorite(template.id);
              }}
              title={favorited ? 'Remove from saved' : 'Save to favorites'}
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all backdrop-blur-md border ${
                favorited
                  ? 'bg-rose-500/25 border-rose-500/50 text-rose-300 scale-105 shadow-[0_0_12px_rgba(244,63,94,0.4)]'
                  : 'bg-[#070314]/80 border-purple-500/30 text-purple-300 hover:text-white hover:bg-[#1a0b3b]'
              }`}
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </button>

            {onQuickView && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  cyberSound.playOpen();
                  onQuickView(template);
                }}
                title="Quick View Live Sandbox"
                className="w-7 h-7 rounded-full flex items-center justify-center transition-all backdrop-blur-md border bg-[#070314]/80 border-purple-500/30 text-purple-300 hover:text-white hover:bg-[#1a0b3b] shadow-md"
              >
                <span className="text-xs">👁️</span>
              </button>
            )}
          </div>

          <div className="absolute top-3 right-3 z-10">
            <span className={`px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-md border backdrop-blur-md ${tierBadge}`}>
              {template.tier}
            </span>
          </div>

          {/* Hover Overlay Buttons */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070314] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
            {onQuickView && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  cyberSound.playOpen();
                  onQuickView(template);
                }}
                className="text-[11px] font-bold text-white bg-[#0f0728]/90 hover:bg-[#1f0d4d] border border-purple-500/40 px-2.5 py-1 rounded-md shadow-md backdrop-blur-sm transition-all flex items-center gap-1"
              >
                <span>👁️</span>
                <span>Quick View</span>
              </button>
            )}
            <span className="text-[11px] font-bold text-white bg-gradient-to-r from-purple-600 to-fuchsia-600 px-2.5 py-1 rounded-md shadow-md ml-auto">
              View Specs ↗
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Brand tag + category */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors truncate">
              {template.name}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-purple-400 font-mono">
              {template.category}
            </span>
          </div>

          {/* Description */}
          <p className="text-xs text-purple-200/70 line-clamp-2 mb-4 flex-grow leading-relaxed">
            {template.description}
          </p>

          {/* Metadata Row */}
          <div className="flex items-center justify-between pt-3 border-t border-purple-500/20 text-[11px] text-purple-300/80">
            <div className="flex items-center gap-1.5">
              <span className="text-amber-400 font-semibold">★ {template.rating.toFixed(1)}</span>
              <span>•</span>
              <span className="font-mono">{template.downloads.toLocaleString()} dl</span>
            </div>
            <div className="flex items-center gap-2">
              {template.accessibilityScore && (
                <span className={`px-1.5 py-0.5 text-[9px] font-bold tracking-wide rounded border ${
                  template.accessibilityScore === 'AAA'
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                    : template.accessibilityScore === 'AA'
                    ? 'bg-blue-500/15 text-blue-300 border-blue-500/30'
                    : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                }`}>
                  WCAG {template.accessibilityScore}
                </span>
              )}
              <span className="text-purple-400 group-hover:text-white font-bold transition-colors">
                →
              </span>
            </div>
          </div>
        </div>

      </div>
    </Link>
  );
}
