# TemplateHub — brief for new templates

Every template is ONE self-contained file: `templates-src/<id>/index.html`. It is sold to small
businesses who edit it in our in-browser "Auto-Edit Studio" and host it as plain HTML.

## Hard rules
1. **One file, no build.** Inline `<style>` and `<script>`. Vanilla JS only — no frameworks, no CDNs,
   no npm. Google Fonts via one `<link>` is allowed (max 2 families). Target 500–900 lines, < 70 KB.
2. **No external images.** Do not hotlink Unsplash, Pexels, etc. Build visuals with CSS gradients,
   inline SVG illustrations/patterns, shapes and typography. Emoji only as small accents.
3. **Fictional business.** Invent the name, people, prices and copy. No real brands, logos,
   celebrities or trademarks. Contact details use `example.com` emails and `+1 555 …` phones.
4. **Studio compatibility (required markup — the Auto-Edit Studio rewrites these with regexes):**
   - Brand link in the header: `<a href="#" class="logo">Brand Name</a>` (class must contain `logo`).
   - Hero: `<section class="hero" …>` containing exactly one `<h1>` and, after it, a `<p>` subheadline.
   - Products/services/menu cards: titles as `<h3 class="card-title">…</h3>` and prices as
     `<span class="price">…</span>` (at least 3 cards).
   - Brand colour: define `--accent` in `:root` and use `var(--accent)` for buttons/links/highlights
     (the Studio overrides `--accent`). Buttons use class `btn` (primary: `btn btn-primary`).
   - `<title>` = "Brand — short tagline".
5. **Working contact form** in a contact section:
   ```html
   <form action="https://www.templatehub.website/api/forms/submit?to=you@example.com" method="POST">
     <input type="text" name="_gotcha" tabindex="-1" autocomplete="off" style="display:none">
     … labelled name / email / message fields …
   </form>
   ```
6. **Responsive:** looks great from 320px to 1440px+. No horizontal scrolling at 320px.
   Mobile nav = accessible hamburger (`<button aria-expanded aria-controls>`), closes on link tap and Esc.
7. **Accessible:** semantic landmarks (`header`, `nav`, `main`, `footer`), one `h1`, logical headings,
   every input has a `<label>`, visible focus styles, text contrast ≥ 4.5:1 (AA),
   tap targets ≥ 44×44px, `alt`/`aria-hidden` on decorative SVG, `lang="en"`.
8. **Motion:** every template has its own **signature animation** (assigned below) plus tasteful
   scroll reveals (IntersectionObserver). All motion must:
   - turn off completely under `@media (prefers-reduced-motion: reduce)` (and JS must check
     `matchMedia('(prefers-reduced-motion: reduce)')` before starting loops/canvas);
   - never hijack or block scrolling, never auto-play sound;
   - pause canvas/rAF loops when off-screen or `document.hidden`;
   - animate `transform`/`opacity` (avoid layout thrash); keep content readable without JS
     (no content hidden until JS runs — use a `.js` class on `<html>` to opt into hidden-before-reveal states).
9. **Sections (adapt names to the business):** header/nav, hero, 3+ feature/service blocks,
   cards with prices, social proof (testimonials with invented first names only), an
   FAQ or details block, contact (form + email/phone/address), footer with © year.
10. **Distinct art direction.** Each template needs its own palette, font pairing and layout feel.
    Avoid generic "dark purple SaaS". Make it look like a premium theme someone would pay for.

## Metadata file
For each template also write `docs/templates/meta/<id>.json`:
```json
{
  "id": "ember-roastery",
  "name": "Ember Roastery",
  "description": "One sentence, max 160 chars, says what the business is and the standout feature.",
  "category": "food",
  "tier": "pro",
  "logo": "☕ EMBER",
  "tags": ["Coffee", "Roastery", "Subscriptions", "Warm", "Steam Animation"],
  "features": ["4 short bullet points describing real features of the page", "…", "…", "…"],
  "signature": "Steam particles rise from the hero cup; roast slider recolours the page"
}
```

## Self-check before you finish (required)
Serve the folder and test in the shared headless Chrome (already running on port 9222):
```bash
cd /home/claude/templatehub/templates-src && (python3 -m http.server <PORT> --bind 127.0.0.1 >/dev/null 2>&1 &)
```
Then with Python Playwright (`from playwright.async_api import async_playwright`), use
`await p.chromium.connect_over_cdp('http://127.0.0.1:9222')`, `ctx = browser.contexts[0]`,
`page = await ctx.new_page()`, and `await page.route(lambda u: '127.0.0.1' not in u, lambda r: r.abort())`
(outside requests such as Google Fonts are blocked here — fallback fonts are fine). Do NOT launch your own
browser and do NOT close the shared browser — only close your own pages. For every template check:
- no `pageerror` / console errors;
- at widths 320, 390 and 1440: `document.documentElement.scrollWidth <= innerWidth`;
- exactly one `h1`; `.logo` link exists; `section.hero` contains the h1; ≥3 `h3.card-title` and `.price`;
- the form action contains `/api/forms/submit` and a `_gotcha` field;
- with `await page.emulate_media(reduced_motion='reduce')` all content is visible (no element in `main`
  with computed opacity 0 after load);
- take a 1440×900 screenshot and a 390×844 screenshot and LOOK at them; fix anything ugly or broken.
Stop your http.server when done.
