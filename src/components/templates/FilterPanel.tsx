'use client';

import { categories } from '@/data/templates';
import { PALETTES, type TemplateFilters, type TierFilter } from '@/lib/template-filters';

interface FilterPanelProps {
  filters: TemplateFilters;
  onChange: (next: Partial<TemplateFilters>) => void;
  categoryCounts: Record<string, number>;
  savedCount: number;
}

const TIERS: { id: TierFilter; label: string }[] = [
  { id: 'all', label: 'All plans' },
  { id: 'free', label: 'Free' },
  { id: 'basic', label: 'Basic' },
  { id: 'pro', label: 'Pro' },
  { id: 'enterprise', label: 'Enterprise' },
];

const heading = 'text-sm font-semibold text-ink mb-2';
const pill = (on: boolean) =>
  `inline-flex items-center gap-2 min-h-11 px-3.5 rounded-full text-sm font-medium border transition-colors ${
    on ? 'bg-primary border-primary text-white' : 'bg-surface border-line text-muted hover:text-ink hover:border-line-strong'
  }`;

/** Filter controls shared by the desktop sidebar and the phone bottom sheet. */
export default function FilterPanel({ filters, onChange, categoryCounts, savedCount }: FilterPanelProps) {
  return (
    <div className="space-y-6">
      <fieldset>
        <legend className={heading}>Plan</legend>
        <div className="flex flex-wrap gap-2">
          {TIERS.map((t) => (
            <button key={t.id} type="button" aria-pressed={filters.tier === t.id} onClick={() => onChange({ tier: t.id })} className={pill(filters.tier === t.id)}>
              {t.label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className={heading}>Colour</legend>
        <div className="flex flex-wrap gap-2">
          {PALETTES.map((p) => (
            <button key={p.id} type="button" aria-pressed={filters.palette === p.id} onClick={() => onChange({ palette: p.id })} className={pill(filters.palette === p.id)}>
              <span aria-hidden="true" className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ background: p.swatch }} />
              {p.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <button
          type="button"
          role="switch"
          aria-checked={filters.saved}
          onClick={() => onChange({ saved: !filters.saved })}
          className="w-full flex items-center justify-between min-h-11 gap-3 text-sm font-medium text-ink"
        >
          <span>Saved only {savedCount > 0 && <span className="text-muted">({savedCount})</span>}</span>
          <span className={`relative w-11 h-6 rounded-full transition-colors ${filters.saved ? 'bg-primary' : 'bg-white/15'}`}>
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${filters.saved ? 'translate-x-5' : ''}`} />
          </span>
        </button>
      </div>

      <fieldset>
        <legend className={heading}>Industry</legend>
        <ul className="space-y-0.5">
          {[{ id: 'all', name: 'All industries' }, ...categories.filter((c) => c.id !== 'all')].map((c) => {
            const on = filters.category === c.id;
            const count = c.id === 'all' ? undefined : categoryCounts[c.id] ?? 0;
            if (count === 0) return null;
            return (
              <li key={c.id}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => onChange({ category: c.id })}
                  className={`w-full flex items-center justify-between min-h-11 px-3 rounded-control text-sm text-left transition-colors ${
                    on ? 'bg-primary/25 text-ink font-semibold' : 'text-muted hover:text-ink hover:bg-white/5'
                  }`}
                >
                  <span>{c.name}</span>
                  {count !== undefined && <span className="text-xs text-muted">{count}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </fieldset>
    </div>
  );
}
