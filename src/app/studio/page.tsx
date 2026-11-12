'use client';

import { Suspense, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { templates } from '@/data/templates';
import InteractivePreviewFrame from '@/components/InteractivePreviewFrame';
import { TEMPLATE_COUNT } from '@/lib/site';

const DEFAULT_TEMPLATE_ID = 'apex-landing';

const TIER_STYLES: Record<string, string> = {
  free: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  basic: 'bg-purple-900/50 text-purple-200 border-purple-500/30',
  pro: 'bg-fuchsia-900/50 text-fuchsia-200 border-fuchsia-500/40',
  enterprise: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
};

const STEPS = [
  { n: '1', title: 'Pick a template', body: 'Choose from the list. Free templates work without a plan.' },
  { n: '2', title: 'Add your details', body: 'Business name, headline, products, contact info and photos.' },
  { n: '3', title: 'Download & publish', body: 'Get a ZIP with index.html and upload it to any host.' },
];

function StudioContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requested = searchParams.get('template');
  const selected = templates.find((t) => t.id === requested) ?? templates.find((t) => t.id === DEFAULT_TEMPLATE_ID) ?? templates[0];

  const [query, setQuery] = useState('');
  const [tierFilter, setTierFilter] = useState<'all' | 'free'>('all');
  const [pickerOpen, setPickerOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return templates.filter((t) => {
      if (tierFilter === 'free' && t.tier !== 'free') return false;
      if (!q) return true;
      return (
        t.name.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    });
  }, [query, tierFilter]);

  const choose = (id: string) => {
    setPickerOpen(false);
    router.replace(`/studio?template=${id}`, { scroll: false });
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-fuchsia-400 font-bold mb-2">Auto-Edit Studio</div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
              Make any template yours — no code
            </h1>
            <p className="text-sm sm:text-base text-purple-200/75 max-w-2xl">
              Fill in your details and the preview updates live. Everything happens in your browser; your photos are never uploaded.
            </p>
          </div>
          <ol className="hidden sm:grid grid-cols-3 gap-3 lg:max-w-2xl">
            {STEPS.map((s) => (
              <li key={s.n} className="p-3 rounded-xl border border-purple-500/20 bg-[#0d0622]">
                <div className="flex items-center gap-2 text-white text-xs font-bold mb-1">
                  <span className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center text-[10px]">{s.n}</span>
                  {s.title}
                </div>
                <div className="text-[11px] text-purple-200/70 leading-snug">{s.body}</div>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-6">
          {/* Template picker */}
          <aside className="lg:sticky lg:top-20 lg:self-start">
            <button
              type="button"
              onClick={() => setPickerOpen((o) => !o)}
              aria-expanded={pickerOpen}
              aria-controls="studio-template-list"
              className="lg:hidden w-full flex items-center justify-between p-3 rounded-xl border border-purple-500/30 bg-[#0d0622] text-left mb-3"
            >
              <span className="text-sm text-white font-semibold">Template: {selected.name}</span>
              <span className="text-xs text-purple-300">{pickerOpen ? 'Close' : 'Change'}</span>
            </button>

            <div
              id="studio-template-list"
              className={`${pickerOpen ? 'block' : 'hidden'} lg:block rounded-2xl border border-purple-500/25 bg-[#0d0622] p-3`}
            >
              <label htmlFor="studio-search" className="sr-only">Search templates</label>
              <input
                id="studio-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search ${TEMPLATE_COUNT} templates…`}
                className="w-full min-h-11 px-3 py-2 rounded-lg bg-[#070314] border border-purple-500/30 text-base text-white placeholder:text-purple-300/50 focus:outline-none focus:border-purple-400 mb-2"
              />
              <div className="flex gap-1.5 mb-3" role="group" aria-label="Filter by plan">
                {(['all', 'free'] as const).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setTierFilter(f)}
                    aria-pressed={tierFilter === f}
                    className={`min-h-11 px-3.5 rounded-full text-sm font-medium border ${
                      tierFilter === f
                        ? 'bg-purple-600 border-purple-400 text-white'
                        : 'border-purple-500/25 text-purple-300 hover:text-white'
                    }`}
                  >
                    {f === 'all' ? 'All' : 'Free only'}
                  </button>
                ))}
              </div>

              <ul className="max-h-[60vh] overflow-y-auto space-y-1 pr-1" aria-label="Templates">
                {filtered.length === 0 && (
                  <li className="text-xs text-purple-300/70 p-3">No templates match “{query}”.</li>
                )}
                {filtered.map((t) => {
                  const active = t.id === selected.id;
                  return (
                    <li key={t.id}>
                      <button
                        type="button"
                        onClick={() => choose(t.id)}
                        aria-current={active ? 'true' : undefined}
                        className={`w-full flex items-center gap-2.5 p-2 rounded-lg text-left transition-colors ${
                          active ? 'bg-purple-600/30 border border-purple-400/50' : 'border border-transparent hover:bg-[#160a36]'
                        }`}
                      >
                        <span className="relative w-14 h-9 shrink-0 rounded overflow-hidden bg-[#070314]">
                          <Image src={t.previewImage} alt="" fill className="object-cover" sizes="56px" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-xs font-semibold text-white truncate">{t.name}</span>
                          <span className="block text-[10px] text-purple-300/70 font-mono uppercase truncate">{t.category}</span>
                        </span>
                        <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded border ${TIER_STYLES[t.tier] ?? ''}`}>
                          {t.tier}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          {/* Editor */}
          <section aria-label={`Editing ${selected.name}`} className="min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div className="text-sm text-purple-200">
                Editing <strong className="text-white">{selected.name}</strong>
              </div>
              <Link href={`/templates/${selected.id}`} className="inline-flex items-center min-h-11 text-sm text-lilac hover:text-ink underline underline-offset-4">
                Template details, reviews &amp; download options →
              </Link>
            </div>
            <InteractivePreviewFrame key={selected.id} template={selected} initialMode="autoedit" />
          </section>
        </div>
      </div>
    </div>
  );
}

export default function StudioPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#070314]" />}>
      <StudioContent />
    </Suspense>
  );
}
