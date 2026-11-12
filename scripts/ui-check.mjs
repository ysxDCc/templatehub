#!/usr/bin/env node
// UI checks for phones and desktop: horizontal overflow, tap-target size,
// accessibility (axe) and reduced-motion visibility.
//
//   npm run ui-check -- --base=http://127.0.0.1:3123 --pages=/,/templates
//   [--cdp=http://127.0.0.1:9222]  connect to an already-running Chrome
//   [--widths=320,390,1440] [--only=overflow,tap,axe,motion]
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import fs from 'fs';
import path from 'path';

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, ...v] = a.replace(/^--/, '').split('=');
    return [k, v.join('=') || 'true'];
  })
);
const base = args.base || 'http://127.0.0.1:3123';
const pages = (args.pages || '/').split(',');
const widths = (args.widths || '320,390,1440').split(',').map(Number);
const scope = args.scope || 'body'; // e.g. --scope=main to ignore nav/footer
const only = args.only ? new Set(args.only.split(',')) : null;
const want = (c) => !only || only.has(c);
const outDir = 'ui-check-output';
fs.mkdirSync(outDir, { recursive: true });

const browser = args.cdp
  ? await chromium.connectOverCDP(args.cdp)
  : await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined });
const context = args.cdp ? browser.contexts()[0] : await browser.newContext();
await context.addCookies([{ name: '__client_uat', value: '0', url: base }]);

const failures = [];
const fail = (page, width, check, detail) => failures.push(`${page} @${width}px [${check}] ${detail}`);

async function open(url, width, reduce = false) {
  const page = await context.newPage();
  // Only talk to our own server (keeps runs fast and offline-safe).
  await page.route((u) => !u.href.startsWith(base), (r) => r.abort());
  await page.setViewportSize({ width, height: width < 768 ? 844 : 900 });
  await page.emulateMedia({ reducedMotion: reduce ? 'reduce' : 'no-preference' });
  await page.goto(url, { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(600);
  return page;
}

for (const p of pages) {
  const url = base + p;
  const slug = p === '/' ? 'home' : p.replace(/\//g, '_').replace(/^_/, '');
  for (const width of widths) {
    const page = await open(url, width);

    if (want('overflow')) {
      const o = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: innerWidth }));
      if (o.sw > o.iw) fail(p, width, 'overflow', `scrollWidth ${o.sw} > ${o.iw}`);
    }

    if (want('tap')) {
      const small = await page.evaluate((scope) => {
        const out = [];
        for (const el of document.querySelectorAll(`:is(${scope}) :is(a, button, [role=tab], summary, input, select, textarea)`)) {
          if (el.closest('.legal-prose p, .legal-prose li, .legal-prose td, [aria-hidden="true"], [data-tap-exempt]')) continue;
          // Links inside running text are exempt (WCAG 2.5.8 inline exception).
          if (el.tagName === 'A' && el.closest('p')) continue;
          // Stretched links cover their whole card via ::after; measure the card instead.
          const box = el.hasAttribute('data-stretched-link') ? el.closest('article, li, [data-card]') : el;
          const s = getComputedStyle(el);
          if (s.visibility === 'hidden' || s.display === 'none') continue;
          if (el.type === 'hidden') continue;
          const r = (box || el).getBoundingClientRect();
          if (r.width <= 1 || r.height <= 1) continue; // visually hidden (sr-only)
          if (Math.round(r.width) < 44 || Math.round(r.height) < 44) {
            const label = (el.getAttribute('aria-label') || el.textContent || el.tagName).trim().slice(0, 40);
            out.push(`${el.tagName.toLowerCase()} "${label}" ${Math.round(r.width)}x${Math.round(r.height)}`);
          }
        }
        return out;
      }, scope);
      if (small.length) fail(p, width, 'tap', `${small.length} small targets, e.g. ${small.slice(0, args.verbose ? 50 : 5).join('; ')}`);
    }

    if (want('axe') && width === 390) {
      const res = await new AxeBuilder({ page }).include(scope).disableRules(['frame-tested']).analyze();
      const bad = res.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
      for (const v of bad) fail(p, width, 'axe', `${v.id} (${v.impact}) ×${v.nodes.length}: ${v.nodes[0]?.target?.join(' ')}`);
    }

    await page.screenshot({ path: path.join(outDir, `${slug}-${width}.png`), fullPage: width !== 1440 });
    await page.close();
  }

  if (want('motion')) {
    const page = await open(url, 390, true);
    const hidden = await page.evaluate(() =>
      [...document.querySelectorAll('[data-reveal]')].filter((el) => getComputedStyle(el).opacity !== '1').length
    );
    const total = await page.evaluate(() => document.querySelectorAll('[data-reveal]').length);
    if (p === '/' && total === 0) fail(p, 390, 'motion', 'no [data-reveal] elements on page');
    if (hidden) fail(p, 390, 'motion', `${hidden}/${total} reveal elements not visible under reduced motion`);
    await page.close();
  }
}

if (!args.cdp) await browser.close();
if (failures.length) {
  console.log(`FAIL (${failures.length})`);
  for (const f of failures) console.log('  ✗ ' + f);
  process.exit(1);
}
console.log(`PASS — ${pages.length} page(s) × ${widths.length} width(s)`);
process.exit(0);
