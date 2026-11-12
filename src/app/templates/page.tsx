'use client';

import { Suspense, useCallback, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { templates } from '@/data/templates';
import TemplateCard from '@/components/TemplateCard';
import QuickViewModal from '@/components/QuickViewModal';
import FilterPanel from '@/components/templates/FilterPanel';
import BottomSheet from '@/components/ui/BottomSheet';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import { useFavorites } from '@/context/FavoritesContext';
import { TEMPLATE_COUNT } from '@/lib/site';
import {
  countActive,
  filterTemplates,
  filtersToQuery,
  parseFilters,
  type SortKey,
  type TemplateFilters,
} from '@/lib/template-filters';
import type { Template } from '@/types';

const CATEGORY_COUNTS = templates.reduce<Record<string, number>>((acc, t) => {
  acc[t.category] = (acc[t.category] ?? 0) + 1;
  return acc;
}, {});

function TemplatesContent() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const { favorites, favoritesCount } = useFavorites();

  // The URL is the source of truth so filtered views can be shared and bookmarked.
  const urlFilters = useMemo(() => parseFilters(new URLSearchParams(params.toString())), [params]);
  // Search text is kept locally so typing feels instant; the URL catches up.
  const [query, setQuery] = useState(urlFilters.q);
  const filters: TemplateFilters = { ...urlFilters, q: query };

  const [sheetOpen, setSheetOpen] = useState(false);
  const [quickView, setQuickView] = useState<Template | null>(null);

  const update = useCallback(
    (next: Partial<TemplateFilters>) => {
      const merged = { ...urlFilters, q: query, ...next };
      if (next.q !== undefined) setQuery(next.q);
      const qs = filtersToQuery(merged);
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [urlFilters, query, router, pathname]
  );

  const results = useMemo(() => filterTemplates(templates, filters, favorites), [filters, favorites]);
  const active = countActive(filters);
  const clearAll = () => {
    setQuery('');
    router.replace(pathname, { scroll: false });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
      <header className="pt-10 md:pt-14 pb-6">
        <h1 className="text-[32px] md:text-5xl font-bold tracking-tight text-ink">Website templates</h1>
        <p className="mt-2 text-base md:text-lg text-muted">
          {TEMPLATE_COUNT} templates with live previews. Filter by industry, plan or colour.
        </p>
      </header>

      {/* Sticky search + controls */}
      <div className="sticky top-16 z-30 -mx-4 sm:-mx-6 px-4 sm:px-6 py-3 bg-bg/90 backdrop-blur-xl border-b border-line">
        <div className="flex items-center gap-2">
          <label htmlFor="template-search" className="sr-only">Search templates</label>
          <div className="relative flex-1">
            <svg aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <path d="M21 21l-4.3-4.3M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z" />
            </svg>
            <input
              id="template-search"
              type="search"
              value={query}
              onChange={(e) => update({ q: e.target.value })}
              placeholder="Search by name, industry or style"
              className="w-full min-h-11 pl-10 pr-3 rounded-control bg-surface border border-line text-base text-ink placeholder:text-muted/70 focus:outline-none focus:border-lilac"
            />
          </div>
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 min-h-11 px-3.5 rounded-control bg-surface border border-line text-sm font-medium text-ink hover:border-line-strong"
          >
            <svg aria-hidden="true" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><path d="M4 6h16M7 12h10M10 18h4" /></svg>
            Filters
            {active > 0 && <span className="inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-primary text-white text-xs">{active}</span>}
          </button>
          <label htmlFor="template-sort" className="sr-only">Sort templates</label>
          <select
            id="template-sort"
            value={filters.sort}
            onChange={(e) => update({ sort: e.target.value as SortKey })}
            className="hidden sm:block min-h-11 px-3 rounded-control bg-surface border border-line text-sm text-ink"
          >
            <option value="popular">Most popular</option>
            <option value="rating">Highest rated</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      <div className="mt-6 grid lg:grid-cols-[260px_1fr] gap-8">
        <aside className="hidden lg:block" aria-label="Filters">
          <div className="sticky top-36 max-h-[calc(100vh-10rem)] overflow-y-auto pr-2 hide-scrollbar">
            <FilterPanel filters={filters} onChange={update} categoryCounts={CATEGORY_COUNTS} savedCount={favoritesCount} />
            {active > 0 && (
              <button type="button" onClick={clearAll} className="mt-4 min-h-11 text-sm font-medium text-lilac hover:text-ink">
                Clear all filters
              </button>
            )}
          </div>
        </aside>

        <section aria-label="Results">
          <div className="flex items-center justify-between gap-3 mb-4">
            <p className="text-sm text-muted" aria-live="polite">
              {results.length === templates.length ? `Showing all ${results.length} templates` : `${results.length} of ${templates.length} templates`}
            </p>
            <label htmlFor="template-sort-m" className="sr-only">Sort templates</label>
            <select
              id="template-sort-m"
              value={filters.sort}
              onChange={(e) => update({ sort: e.target.value as SortKey })}
              className="sm:hidden min-h-11 px-3 rounded-control bg-surface border border-line text-sm text-ink"
            >
              <option value="popular">Most popular</option>
              <option value="rating">Highest rated</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          {results.length > 0 ? (
            <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((t, i) => (
                <Reveal as="li" key={t.id} delay={(i % 3) * 50}>
                  <TemplateCard template={t} onQuickView={setQuickView} />
                </Reveal>
              ))}
            </ul>
          ) : (
            <div className="rounded-card border border-line bg-surface p-10 text-center">
              <h2 className="text-lg font-semibold text-ink">
                {filters.saved && favoritesCount === 0 ? 'No saved templates yet' : 'No templates match'}
              </h2>
              <p className="mt-2 text-muted">
                {filters.saved && favoritesCount === 0
                  ? 'Tap the heart on any template to save it here.'
                  : 'Try a different search or clear your filters.'}
              </p>
              <Button className="mt-6" onClick={clearAll}>Clear filters</Button>
            </div>
          )}
        </section>
      </div>

      <BottomSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        title="Filters"
        footer={
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={clearAll} disabled={active === 0}>
              Clear
            </Button>
            <Button className="flex-1" onClick={() => setSheetOpen(false)}>
              Show {results.length}
            </Button>
          </div>
        }
      >
        <FilterPanel filters={filters} onChange={update} categoryCounts={CATEGORY_COUNTS} savedCount={favoritesCount} />
      </BottomSheet>

      <QuickViewModal template={quickView} isOpen={!!quickView} onClose={() => setQuickView(null)} />
    </div>
  );
}

export default function TemplatesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <TemplatesContent />
    </Suspense>
  );
}
