import type { Template } from '@/types';

export type SortKey = 'popular' | 'rating' | 'newest';
export type Palette = 'all' | 'purple' | 'cyan' | 'emerald' | 'amber' | 'fuchsia' | 'slate';
export type TierFilter = 'all' | 'free' | 'basic' | 'pro' | 'enterprise';

export interface TemplateFilters {
  q: string;
  category: string;
  tier: TierFilter;
  palette: Palette;
  saved: boolean;
  sort: SortKey;
}

export const DEFAULT_FILTERS: TemplateFilters = {
  q: '',
  category: 'all',
  tier: 'all',
  palette: 'all',
  saved: false,
  sort: 'popular',
};

const TIERS: TierFilter[] = ['all', 'free', 'basic', 'pro', 'enterprise'];
const SORTS: SortKey[] = ['popular', 'rating', 'newest'];
export const PALETTES: { id: Palette; label: string; swatch: string }[] = [
  { id: 'all', label: 'Any colour', swatch: 'conic-gradient(#a855f7,#22d3ee,#34d399,#fbbf24,#e879f9,#a855f7)' },
  { id: 'purple', label: 'Purple', swatch: '#a855f7' },
  { id: 'cyan', label: 'Cyan', swatch: '#22d3ee' },
  { id: 'emerald', label: 'Green', swatch: '#34d399' },
  { id: 'amber', label: 'Gold', swatch: '#fbbf24' },
  { id: 'fuchsia', label: 'Pink', swatch: '#e879f9' },
  { id: 'slate', label: 'Dark / mono', swatch: '#94a3b8' },
];

/** Rough dominant colour of a template, derived from its category. */
export function getTemplatePalette(template: Pick<Template, 'category'>): Palette {
  const cat = template.category.toLowerCase();
  if (['crypto', 'cyberpunk', 'quantum', 'space', 'spatial', 'security', 'cybersecurity', 'oceanic'].includes(cat)) return 'cyan';
  if (['green', 'agriculture', 'geothermal', 'biotech', 'fitness', 'healthcare'].includes(cat)) return 'emerald';
  if (['luxury', 'auction', 'motorsport', 'dining', 'food', 'yachts', 'hypercar'].includes(cat)) return 'amber';
  if (['beauty', 'podcast', 'culture', 'arcade', 'spa', 'bionics'].includes(cat)) return 'fuchsia';
  if (['portfolio', 'blog', 'architecture', 'industrial', 'furniture'].includes(cat)) return 'slate';
  return 'purple';
}

export function filterTemplates(list: Template[], f: TemplateFilters, favorites: string[]): Template[] {
  const q = f.q.trim().toLowerCase();
  return list
    .filter((t) => {
      if (f.saved && !favorites.includes(t.id)) return false;
      if (f.category !== 'all' && t.category !== f.category) return false;
      if (f.tier !== 'all' && t.tier !== f.tier) return false;
      if (f.palette !== 'all' && getTemplatePalette(t) !== f.palette) return false;
      if (!q) return true;
      return (
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    })
    .sort((a, b) => {
      if (f.sort === 'rating') return b.rating - a.rating;
      if (f.sort === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return b.downloads - a.downloads;
    });
}

/** Reads filters from a URL query string; unknown values fall back to defaults. */
export function parseFilters(params: URLSearchParams): TemplateFilters {
  const tier = params.get('tier') as TierFilter;
  const sort = params.get('sort') as SortKey;
  const palette = params.get('palette') as Palette;
  return {
    q: params.get('q') ?? '',
    category: params.get('category') || 'all',
    tier: TIERS.includes(tier) ? tier : 'all',
    palette: PALETTES.some((p) => p.id === palette) ? palette : 'all',
    saved: params.get('saved') === '1',
    sort: SORTS.includes(sort) ? sort : 'popular',
  };
}

/** Builds a query string containing only the non-default filters. */
export function filtersToQuery(f: TemplateFilters): string {
  const p = new URLSearchParams();
  if (f.q) p.set('q', f.q);
  if (f.category !== 'all') p.set('category', f.category);
  if (f.tier !== 'all') p.set('tier', f.tier);
  if (f.palette !== 'all') p.set('palette', f.palette);
  if (f.saved) p.set('saved', '1');
  if (f.sort !== 'popular') p.set('sort', f.sort);
  return p.toString();
}

/** Number of active filters (search and sort aren't counted). */
export function countActive(f: TemplateFilters): number {
  return (
    Number(f.category !== 'all') + Number(f.tier !== 'all') + Number(f.palette !== 'all') + Number(f.saved)
  );
}
