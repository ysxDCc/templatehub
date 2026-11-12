'use client';

import { useState } from 'react';
import BottomSheet from '@/components/ui/BottomSheet';

export interface PreviewTool {
  id: string;
  icon: string;
  label: string;
  description: string;
  onSelect: () => void;
  /** For toggles (X-Ray, 3D frame): current on/off state. */
  active?: boolean;
}

interface PreviewToolsMenuProps {
  tools: PreviewTool[];
  vision: { value: string; options: Record<string, { label: string }>; onChange: (v: string) => void };
}

/**
 * The secondary preview tools (Sniper, Speed, X-Ray, Heatmap…) live behind one
 * "More tools" button so the toolbar stays usable on phones.
 */
export default function PreviewToolsMenu({ tools, vision }: PreviewToolsMenuProps) {
  const [open, setOpen] = useState(false);
  const activeCount = tools.filter((t) => t.active).length + (vision.value !== 'none' ? 1 : 0);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="inline-flex items-center gap-2 min-h-11 px-3.5 rounded-control bg-surface border border-line text-sm font-medium text-ink hover:border-line-strong"
      >
        <svg aria-hidden="true" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z" />
        </svg>
        More tools
        {activeCount > 0 && (
          <span className="inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-primary text-white text-xs">{activeCount}</span>
        )}
      </button>

      <BottomSheet open={open} onClose={() => setOpen(false)} title="Preview tools">
        <ul className="space-y-1">
          {tools.map((t) => (
            <li key={t.id}>
              <button
                type="button"
                aria-pressed={t.active === undefined ? undefined : t.active}
                onClick={() => {
                  t.onSelect();
                  // Toggles stay open so you can see the state change; other tools open their own dialog.
                  if (t.active === undefined) setOpen(false);
                }}
                className="w-full flex items-start gap-3 min-h-14 p-3 rounded-control text-left hover:bg-white/5"
              >
                <span aria-hidden="true" className="text-xl leading-none mt-0.5">{t.icon}</span>
                <span className="flex-1">
                  <span className="flex items-center gap-2 text-[15px] font-semibold text-ink">
                    {t.label}
                    {t.active !== undefined && (
                      <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${t.active ? 'bg-success/20 text-success' : 'bg-white/5 text-muted'}`}>
                        {t.active ? 'On' : 'Off'}
                      </span>
                    )}
                  </span>
                  <span className="block text-sm text-muted leading-snug mt-0.5">{t.description}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-3 pt-3 border-t border-line">
          <label htmlFor="vision-filter" className="block text-sm font-semibold text-ink mb-1.5">
            Colour-vision simulator
          </label>
          <select
            id="vision-filter"
            value={vision.value}
            onChange={(e) => vision.onChange(e.target.value)}
            className="w-full min-h-11 px-3 rounded-control bg-surface border border-line text-base text-ink"
          >
            {Object.entries(vision.options).map(([k, o]) => (
              <option key={k} value={k}>{o.label}</option>
            ))}
          </select>
        </div>
      </BottomSheet>
    </>
  );
}
