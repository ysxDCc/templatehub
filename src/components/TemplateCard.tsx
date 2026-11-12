'use client';

import { useRef, type PointerEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Template } from '@/types';
import { useFavorites } from '@/context/FavoritesContext';
import Badge from '@/components/ui/Badge';

interface TemplateCardProps {
  template: Template;
  onQuickView?: (template: Template) => void;
}

const CATEGORY_LABEL = (c: string) => c.replace(/-/g, ' ');

export default function TemplateCard({ template, onQuickView }: TemplateCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(template.id);
  const ref = useRef<HTMLElement>(null);

  // Gentle 3D tilt that follows a mouse (never on touch, never with reduced motion).
  const onMove = (e: PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty('--ry', `${(x - 0.5) * 7}deg`);
    el.style.setProperty('--rx', `${(0.5 - y) * 7}deg`);
    el.style.setProperty('--lift', '-4px');
    el.style.setProperty('--mx', `${x * 100}%`);
    el.style.setProperty('--my', `${y * 100}%`);
    el.classList.add('is-tilting');
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.classList.remove('is-tilting');
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
    el.style.setProperty('--lift', '0px');
  };

  return (
    <article
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="th-tilt th-sheen group relative h-full flex flex-col rounded-card border border-line bg-surface overflow-hidden transition-[border-color,box-shadow] duration-300 hover:border-line-strong hover:shadow-[0_20px_44px_-20px_rgb(124_58_237/0.55)] focus-within:border-line-strong"
    >
      <div className="relative aspect-[16/10] w-full bg-bg overflow-hidden">
        <Image
          src={template.previewImage}
          alt=""
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
        />
        <div className="absolute top-2 right-2 z-10">
          <Badge tone={template.tier}>{template.tier}</Badge>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-4">
        <h3 className="text-base font-semibold text-ink leading-snug">
          {/* The whole card is clickable via this link's ::after overlay. */}
          <Link href={`/templates/${template.id}`} data-stretched-link="" className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {template.name}
          </Link>
        </h3>
        <p className="mt-0.5 text-xs text-muted capitalize">{CATEGORY_LABEL(template.category)}</p>
        <p className="mt-2 text-sm text-muted line-clamp-2 leading-relaxed flex-1">{template.description}</p>

        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="text-xs text-muted">
            <span className="text-amber-300">★ {template.rating.toFixed(1)}</span> · {template.downloads.toLocaleString()} downloads
          </span>
          <div className="relative z-10 flex items-center">
            {onQuickView && (
              <button
                type="button"
                onClick={() => onQuickView(template)}
                aria-label={`Quick look at ${template.name}`}
                className="inline-flex items-center justify-center w-11 h-11 rounded-control text-muted hover:text-ink hover:bg-white/5"
              >
                <svg aria-hidden="true" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                  <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>
            )}
            <button
              type="button"
              onClick={() => toggleFavorite(template.id)}
              aria-label={favorited ? `Remove ${template.name} from saved` : `Save ${template.name}`}
              aria-pressed={favorited}
              className={`inline-flex items-center justify-center w-11 h-11 rounded-control hover:bg-white/5 ${favorited ? 'text-rose-300' : 'text-muted hover:text-ink'}`}
            >
              <svg aria-hidden="true" className="w-5 h-5" viewBox="0 0 24 24" fill={favorited ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.8}>
                <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.8 4.5c2.2 0 3.6 1.2 5.2 3 1.6-1.8 3-3 5.2-3 3.8 0 5.9 3.9 4.4 7.3C19.5 16.4 12 21 12 21z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
