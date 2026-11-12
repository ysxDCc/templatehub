# Redesign Stage 2 — Templates list — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Rebuild `/templates` so finding a template is fast on phones: sticky search, filters in a bottom sheet on phones / sidebar on desktop, bigger cards, shareable filter URLs.

**Architecture:** Pure filtering/sorting logic moves to `src/lib/template-filters.ts` (unit-tested with `node:test` via `tsx`). The page reads/writes filters from the URL query string. A reusable `BottomSheet` UI component is added for the phone filter panel.

**Tech Stack:** Next.js 15, React 19, Tailwind v4, Playwright ui-check, `tsx` (dev only) for unit tests.

**Spec:** `docs/specs/2026-11-12-redesign.md` (3.3 BottomSheet, 4 Stage 2, 6, 7)

## Global Constraints
- Same tokens, motion, tap-target (≥44px), contrast and reduced-motion rules as stage 1.
- No new runtime dependencies. `/templates` first-load JS must not grow by more than 5 kB versus today.
- Keep: QuickViewModal behaviour, favourites, all 76 templates searchable by name, description and tags.

## Review Focus
1. **No results** — any filter combination with zero matches shows a clear empty state with one "Clear filters" button.
2. **Shared URLs** — opening `/templates?tier=free&q=coffee` shows those filters applied; unknown values are ignored, not crashes.
3. **Bottom sheet on phones** — opens from "Filters", traps focus, closes with Esc, the close button, or tapping the backdrop; page behind doesn't scroll.
4. **Keyboard** — every filter reachable and operable with Tab/Space/Enter; sort is a native `<select>`.
5. **Search typing** — results update as you type without the page jumping; search input is 16px (no iOS zoom).

---

### Task 1: Filter logic + tests
**Files:** Create `src/lib/template-filters.ts`, `src/lib/template-filters.test.ts`; dev dep `tsx`; script `"test": "tsx --test src/**/*.test.ts"`.
**Produces:**
- `type SortKey = 'popular' | 'rating' | 'newest'`, `type Palette = 'all'|'purple'|'cyan'|'emerald'|'amber'|'fuchsia'|'slate'`
- `interface TemplateFilters { q: string; category: string; tier: 'all'|'free'|'basic'|'pro'|'enterprise'; palette: Palette; saved: boolean; sort: SortKey }`
- `DEFAULT_FILTERS: TemplateFilters` (q '', category 'all', tier 'all', palette 'all', saved false, sort 'popular')
- `getTemplatePalette(t: Pick<Template,'category'>): Palette` (moved verbatim from page)
- `filterTemplates(list: Template[], f: TemplateFilters, favorites: string[]): Template[]`
- `parseFilters(params: URLSearchParams): TemplateFilters` (invalid values → defaults) and `filtersToQuery(f): string` (omits defaults)
- `countActive(f): number` (non-default filters excluding q and sort)
- [ ] Tests first: search matches name/description/tag case-insensitively; tier filter; category filter; saved uses favorites; sort by rating/newest/popular; parseFilters ignores `tier=gold`; filtersToQuery round-trips and omits defaults; countActive. Run `npm test` → FAIL (module missing). Implement → PASS. Commit.

### Task 2: BottomSheet component
**Files:** Create `src/components/ui/BottomSheet.tsx`.
**Produces:** `BottomSheet({ open: boolean; onClose: () => void; title: string; children; footer?: ReactNode })` — portal to body; phones: slides up from bottom, max-height 85vh, drag handle; ≥768px: centred dialog 480px. `role="dialog" aria-modal="true" aria-labelledby`; focus first focusable on open, trap Tab, Esc closes, backdrop click closes, restores focus; locks body scroll while open; slide 250ms, none under reduced motion.
- [ ] Verified through Task 3's ui-check + sheet script (open, Esc, focus restore).

### Task 3: Templates page
**Files:** Create `src/components/templates/FilterPanel.tsx`; rewrite `src/app/templates/page.tsx` (client; wrap in `Suspense` for `useSearchParams`).
- `FilterPanel({ filters, onChange, counts })` — sections: Plan (radio-style chips: All/Free/Basic/Pro/Enterprise), Industry (category list with counts, `aria-pressed` buttons), Colour (swatch chips with text labels), Saved only (switch). Used in desktop sidebar and phone sheet.
- Page: header (h1 "Website templates", count); sticky bar (top: 64px) with search input (type search, 16px, label), phone "Filters" button with active-count badge, sort `<select>`; desktop 260px sidebar + grid (1 col phone / 2 sm / 3 xl); result count `aria-live="polite"`; empty state with "Clear filters"; URL updated with `router.replace` (no scroll) on change.
- Cards: existing `TemplateCard` with `onQuickView` → `QuickViewModal` (unchanged).
- [ ] RED: `npm run ui-check -- --pages=/templates --scope=main` fails today (tap targets/axe). Implement → PASS at 320/390/1440 incl. axe + nojs (h1 visible).
- [ ] Review-focus script: `/templates?tier=free&q=coffee` → inputs show "coffee" and Free selected; `?tier=gold` → no crash, All selected; zero-result search → empty state + Clear filters restores 76; phone sheet opens, Esc closes and focus returns to Filters button; typing in search keeps scrollY stable.
- [ ] Build: `/templates` first-load JS within +5 kB. Commit.

### Task 4: Ship
- [ ] Full regression: ui-check `/` and `/templates` full scope; Studio flow script; `npm test`.
- [ ] Push `redesign/2-templates`, PR, wait for Vercel preview READY, screenshots to Leo, merge on approval.
