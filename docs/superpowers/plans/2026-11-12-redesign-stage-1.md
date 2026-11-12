# Redesign Stage 1 — Design system, navigation, homepage — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the new purple design system, the new top bar + phone bottom tab bar, and the rebuilt homepage.

**Architecture:** Design tokens live in `globals.css` (Tailwind v4 `@theme`), small single-purpose UI components live in `src/components/ui/`, homepage sections live in `src/components/home/`. Other pages keep their current markup and only inherit the new navigation and tokens; stages 2–5 redesign them later.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind v4, Clerk. Dev-only testing with Playwright + `@axe-core/playwright` against `next start`.

**Spec:** `docs/specs/2026-11-12-redesign.md` (sections 3, 3.4, 4 Stage 1, 6, 7, 8)

## Global Constraints

- Colours: bg `#08051A`, surface `#110A2B`, raised `#1A1140`, border `rgb(168 85 247 / 0.18)`, primary `#7C3AED`, primary-hover `#6D28D9`, lilac `#C4B5FD`, text `#F5F3FF`, muted `#B9AED9`, success `#34D399`. `#8B5CF6` decorative only.
- Type scale 14/16/18/22/28/36/48/64px; body ≥16px on phones; inputs 16px. Radius 10/16/24px. Section padding 64px phone / 112px desktop.
- Motion 150–400ms, easing `cubic-bezier(.2,.8,.2,1)`, transform/opacity only; everything off under `prefers-reduced-motion: reduce`.
- Tap targets ≥ 44×44px; visible 2px lilac focus ring; no horizontal scroll at 320px.
- No new runtime dependencies. Homepage first-load JS ≤ 195 kB.
- Do not change: API routes, middleware, `src/data/*`, `src/lib/*` (except new files), page URLs, metadata.
- Copy: plain English, sentence case, no "sovereign"/"masterpiece".

## Review Focus

1. **Signed-in vs signed-out nav** — Account tab must go to `/login` when signed out and show Clerk's `UserButton` when signed in; test both states render without errors.
2. **Very small phones (320px) and long template names** — cards and chips must wrap/truncate, never overflow; ui-check runs at 320px.
3. **Reduced motion** — with `reducedMotion: 'reduce'`, Reveal content must be visible immediately (opacity 1) and the hero carousel must not advance.
4. **Keyboard users** — Tab reaches every nav link, chip and FAQ item with a visible focus ring; bottom tab bar has `aria-current` on the active route.
5. **Bottom bar covering content** — page content and footer must not be hidden behind the 56px bar (body gets bottom padding below 768px), including on iOS safe-area.

---

### Task 1: UI test harness

**Files:**
- Create: `scripts/ui-check.mjs`
- Modify: `package.json` (devDependencies `playwright`, `@axe-core/playwright`; script `"ui-check": "node scripts/ui-check.mjs"`)

**Interfaces:**
- Produces: `npm run ui-check -- --base=http://127.0.0.1:3123 --pages=/,/templates` → exits 0 when all checks pass, 1 otherwise; writes screenshots to `ui-check-output/<page>-<width>.png`.

- [ ] **Step 1:** Write `ui-check.mjs` with these checks per page at widths 320, 390, 1440:
  - `noHorizontalOverflow`: `document.documentElement.scrollWidth <= innerWidth`.
  - `tapTargets`: every visible `a, button, [role=tab], summary, input` has bounding box ≥ 44×44 (inline text links inside `p`/`li` of `.legal-prose` excluded).
  - `axe`: zero violations with impact `serious` or `critical`.
  - `reducedMotion` (390 only, `reducedMotion:'reduce'`): every `[data-reveal]` has computed opacity `1` without scrolling.
  - Sets cookie `__client_uat=0` before navigation (avoids Clerk handshake locally).
- [ ] **Step 2:** Run against the current build (`next build && next start -p 3123`). Expected: FAIL (current homepage overflows tap-target and has no `[data-reveal]`), proving the harness catches problems.
- [ ] **Step 3:** Add `ui-check-output/` to `.gitignore`. Commit `chore: add UI check harness`.

### Task 2: Design tokens and base styles

**Files:**
- Modify: `src/app/globals.css` (add `@theme` tokens, base focus ring, reduced-motion rules, `[data-reveal]` styles; keep existing utility classes for not-yet-redesigned pages)

**Interfaces:**
- Produces Tailwind tokens: colours `bg`, `surface`, `raised`, `line`, `primary`, `primary-hover`, `lilac`, `ink`, `muted`, `success` (usable as `bg-surface`, `text-muted`, `border-line`…); radii `rounded-control`/`rounded-card`/`rounded-section`; `--ease-out-soft`.
- Produces CSS: `[data-reveal]` (opacity 0, translateY 12px) → `[data-reveal].is-visible` (opacity 1, none); `:focus-visible { outline: 2px solid #C4B5FD; outline-offset: 2px }`; `@media (prefers-reduced-motion: reduce)` sets all `[data-reveal]` visible and `animation/transition: none`.

- [ ] **Step 1:** Add tokens and rules above; set `body` background to `#08051A`.
- [ ] **Step 2:** `npx next build` passes. Commit `feat(ui): design tokens`.

### Task 3: UI components

**Files (one component each):** `src/components/ui/Button.tsx`, `Card.tsx`, `Chip.tsx`, `ChipScroller.tsx`, `Section.tsx`, `Reveal.tsx`, `Accordion.tsx`, `Badge.tsx`

**Interfaces (Produces):**
- `Button({ variant?: 'primary'|'secondary'|'ghost', size?: 'sm'|'md'|'lg', href?: string, ...ButtonHTMLAttributes })` → renders `next/link` when `href`, else `<button>`; min-height 44px (sm also 44px); press scale 0.97.
- `Card({ interactive?: boolean, as?: 'div'|'article'|'li', className?, children })` — interactive adds hover/focus lift 4px.
- `Chip({ selected: boolean, onClick, children })` → `<button aria-pressed={selected}>`, min 44px tall.
- `ChipScroller({ label: string, children })` → `<div role="group" aria-label={label}>` horizontal scroll with snap and edge fade.
- `Section({ id?, eyebrow?, title, intro?, children, className? })` → `<section>` with spec padding, `<h2>`.
- `Reveal({ as?, delay?: number, className?, children })` → element with `data-reveal`; IntersectionObserver (threshold 0.15) adds `is-visible` once; `delay` sets `transition-delay` ms.
- `Accordion({ items: { q: string; a: React.ReactNode }[] })` → list of `<details><summary>` with rotating chevron.
- `Badge({ tone?: 'free'|'basic'|'pro'|'enterprise'|'neutral', children })`.

- [ ] **Step 1:** Create a throwaway page `src/app/ui-test/page.tsx` (robots noindex) rendering every component.
- [ ] **Step 2:** `npm run ui-check -- --pages=/ui-test` → Expected FAIL before components exist (build error), then implement components.
- [ ] **Step 3:** `npm run ui-check -- --pages=/ui-test` passes at all widths, including reducedMotion. Delete `src/app/ui-test`. Commit `feat(ui): base components`.

### Task 4: Top bar + phone bottom tab bar

**Files:**
- Create: `src/components/nav/TopBar.tsx`, `src/components/nav/BottomTabBar.tsx`, `src/components/nav/nav-links.ts`
- Modify: `src/app/layout.tsx` (render `TopBar` + `BottomTabBar` instead of `Navbar`; add `pb-[calc(56px+env(safe-area-inset-bottom))] md:pb-0` to body)
- Delete: `src/components/Navbar.tsx` (after grep confirms no other importers)

**Interfaces:**
- `nav-links.ts` exports `PRIMARY_LINKS: { href: string; label: string }[]` = Templates `/templates`, Studio `/studio`, AI Studio `/ai-generator`, Pricing `/#pricing`, Licensing `/licensing`; and `TAB_LINKS` = Home `/`, Templates `/templates`, Studio `/studio`, Pricing `/#pricing`, Account (`/login` signed-out, `/admin` never — signed-in opens Clerk `UserButton` menu).
- `TopBar` (client): logo (existing `Logo` size `md`), desktop links (≥1024px), search button opening existing `CommandPalette` (⌘K / Ctrl+K shortcut kept), Affiliate button opening existing `ReferralModal`, sound toggle moved into an overflow menu, Clerk `<Show when="signed-out">` Sign in / Start free, `<Show when="signed-in">` `UserButton`.
- `BottomTabBar` (client): fixed bottom, `md:hidden`, 5 tabs with icon + label, active via `usePathname()` → `aria-current="page"`; height 56px + `env(safe-area-inset-bottom)`.

- [ ] **Step 1:** Implement; `npm run ui-check -- --pages=/,/licensing,/studio` → tap targets and overflow pass for nav at 320/390/1440.
- [ ] **Step 2:** Screenshot check: bottom bar visible at 390, hidden at 1440; footer fully visible above bar at 390.
- [ ] **Step 3:** Commit `feat(nav): new top bar and phone tab bar`.

### Task 5: Homepage sections

**Files:**
- Create in `src/components/home/`: `HeroSection.tsx`, `HeroPreviewCarousel.tsx`, `HowItWorks.tsx`, `TemplateShowcase.tsx`, `StudioDemo.tsx`, `WhyStrip.tsx`, `PricingSection.tsx`, `FaqSection.tsx`, `FinalCta.tsx`
- Modify: `src/app/page.tsx` (compose the sections; keep `FreeTrialModal` and `CommandPalette` behaviour)
- Modify: `src/components/TemplateCard.tsx` and `src/components/PricingCard.tsx` (restyle with tokens; props unchanged)
- Remove from homepage: `Hero`, `ShowcaseMarquee`, `MasterpieceBentoGrid`, `CosmicPurpleCanvas` (files deleted if no other importers)

**Interfaces:**
- `HeroPreviewCarousel({ templateIds: string[] })` — ids `['astral-aerospace','vortex-fitness','osteria-bella','cloudscale-saas','minimal-folio']`. One `<iframe src="/preview/{id}" loading="lazy" title="Live preview of {name}">` mounted at a time; cross-fade every 5000ms; pauses on hover, focus-within, `document.hidden`, or when <15% visible; no auto-advance under reduced motion; prev/next + dot buttons (44px) with `aria-label`.
- `TemplateShowcase` reuses the filter groups currently in `page.tsx` (`filterChips`, the 7 groups incl. "All" — move to `src/components/home/showcase-filters.ts`), shows 8 `TemplateCard`s, grid 1/2/4 columns.
- `PricingSection` maps `pricingPlans` to `PricingCard`; below 768px a horizontal snap scroller whose initial `scrollLeft` centres the plan with `highlighted: true`.
- `FaqSection` uses `Accordion` with 6 items: what you get (plain HTML), licences per plan (link `/licensing`), React/Astro use, trial & cancel (link `/terms#subscriptions`), refunds (link `/refunds`), hosting.
- `StudioDemo` — pure CSS keyframe loop (text typing into a mock headline + colour swatch change), `aria-hidden` animation with a visible text caption; static under reduced motion.
- All section headings `h2`; one `h1` in hero: "Launch a beautiful website this afternoon."

- [ ] **Step 1:** Implement sections; `npm run ui-check -- --pages=/` passes at 320/390/1440 incl. axe and reducedMotion.
- [ ] **Step 2:** Review-focus checks: 320px with longest template name has no overflow; carousel does not advance under reduced motion (assert iframe `src` unchanged after 6s).
- [ ] **Step 3:** `npx next build` — record homepage first-load JS; must be ≤ 195 kB.
- [ ] **Step 4:** Commit `feat(home): rebuilt homepage`.

### Task 6: Footer + global polish, preview env, ship

**Files:**
- Modify: `src/components/Footer.tsx` (tokens, 44px link rows on phone, accordion-style columns below 640px)
- Vercel: extend Clerk vars to Preview (edit target; if the secret can't be edited, ask Leo to re-enter it for Preview)

- [ ] **Step 1:** `npm run ui-check -- --pages=/,/templates,/templates/apex-landing,/studio,/licensing,/terms` — homepage passes fully; other pages must at least pass `noHorizontalOverflow` (their full redesign is later).
- [ ] **Step 2:** Studio flow regression: run the existing edit → Apply & Preview → Export ZIP prompt script; expect unlock prompt text "Create a free account to download".
- [ ] **Step 3:** Push branch `redesign/1-home`, open PR via `gh api`, wait for Vercel preview READY, send Leo the preview link + 390px/1440px screenshots of the homepage.
- [ ] **Step 4:** Merge only after Leo approves; confirm production deploy READY and `get_runtime_errors` clean for 10 minutes.
