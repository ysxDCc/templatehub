import Link from 'next/link';
import Logo from '@/components/Logo';
import { TEMPLATE_COUNT } from '@/lib/site';

const COLUMNS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: 'Templates',
    links: [
      { href: '/templates', label: `All ${TEMPLATE_COUNT} templates` },
      { href: '/templates/astral-aerospace', label: 'ASTRAL Aerospace' },
      { href: '/templates/neo-tokyo-cyberpunk', label: 'Neo-Tokyo Cyberpunk' },
      { href: '/templates/velox-f1-racing', label: 'VELOX F1 Racing' },
      { href: '/templates/monolith-architecture', label: 'Monolith Studio' },
    ],
  },
  {
    title: 'Product',
    links: [
      { href: '/#pricing', label: 'Pricing' },
      { href: '/studio', label: 'Auto-Edit Studio' },
      { href: '/ai-generator', label: 'AI Studio' },
      { href: '/compare', label: 'Compare templates' },
      { href: '/builder', label: 'Page builder' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
      { href: '/licensing', label: 'Licensing' },
      { href: '/affiliate', label: 'Partner programme (30%)' },
    ],
  },
];

const LEGAL = [
  { href: '/terms', label: 'Terms' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/privacy#cookies', label: 'Cookies' },
  { href: '/refunds', label: 'Refunds' },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 pb-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" aria-label="TemplateHub home" className="inline-flex items-center min-h-11">
              <Logo size="md" />
            </Link>
            <p className="mt-3 text-[15px] text-muted leading-relaxed max-w-sm">
              Fast, dependency-free website templates you can preview, customise in your browser and host anywhere.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              {/* Phones: tap a heading to open its links. Desktop: always open. */}
              <details className="group md:hidden border-b border-line">
                <summary className="flex items-center justify-between min-h-12 cursor-pointer list-none text-sm font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {col.title}
                  <svg aria-hidden="true" className="w-4 h-4 text-muted transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </summary>
                <ul className="pb-3">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="flex items-center min-h-11 text-[15px] text-muted hover:text-ink">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
              <div className="hidden md:block">
                <h2 className="text-sm font-semibold text-ink mb-2">{col.title}</h2>
                <ul>
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="flex items-center min-h-11 text-sm text-muted hover:text-ink">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-line flex flex-col-reverse md:flex-row md:items-center justify-between gap-4">
          <p className="text-sm text-muted">© {new Date().getFullYear()} TemplateHub. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-2">
            {LEGAL.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex items-center justify-center min-h-11 min-w-11 px-2 text-sm text-muted hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
