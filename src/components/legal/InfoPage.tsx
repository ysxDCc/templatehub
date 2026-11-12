import Link from 'next/link';
import { LEGAL_LAST_UPDATED } from '@/lib/site';

interface InfoPageProps {
  eyebrow?: string;
  title: string;
  intro?: React.ReactNode;
  /** Show the "last updated" line (legal documents). */
  showUpdated?: boolean;
  children: React.ReactNode;
}

const RELATED = [
  { href: '/terms', label: 'Terms of Service' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/refunds', label: 'Refund Policy' },
  { href: '/licensing', label: 'Licensing' },
  { href: '/contact', label: 'Contact' },
];

/** Shared shell for text pages: terms, privacy, licensing, about, contact… */
export default function InfoPage({ eyebrow, title, intro, showUpdated, children }: InfoPageProps) {
  return (
    <div className="bg-[#070314] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <nav aria-label="Breadcrumb" className="text-xs font-mono text-muted mb-6">
          <Link href="/" className="inline-flex items-center min-h-11 min-w-11 hover:text-white">Home</Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <span className="text-purple-200">{title}</span>
        </nav>

        {eyebrow && (
          <div className="text-xs font-mono uppercase tracking-widest text-fuchsia-400 font-bold mb-3">
            {eyebrow}
          </div>
        )}
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">{title}</h1>
        {intro && <p className="text-base sm:text-lg text-muted leading-relaxed mb-4">{intro}</p>}
        {showUpdated && (
          <p className="text-xs font-mono text-muted mb-10">Last updated: {LEGAL_LAST_UPDATED}</p>
        )}

        <article className="legal-prose">{children}</article>

        <div className="mt-16 pt-8 border-t border-purple-500/20">
          <div className="text-xs font-mono uppercase tracking-wider text-purple-400 mb-3">Related pages</div>
          <ul className="flex flex-wrap gap-2">
            {RELATED.map((r) => (
              <li key={r.href}>
                <Link
                  href={r.href}
                  className="min-h-11 inline-block px-3 py-1.5 rounded-lg text-xs border border-purple-500/25 bg-[#0e0624] text-purple-200 hover:text-white hover:border-purple-400/50"
                >
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
