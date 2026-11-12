import type { Metadata } from 'next';
import Link from 'next/link';
import InfoPage from '@/components/legal/InfoPage';
import { AFFILIATE_EMAIL, LEGAL_EMAIL, SITE_NAME, SUPPORT_EMAIL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get help with templates, billing or licensing from the ${SITE_NAME} team.`,
  alternates: { canonical: '/contact' },
};

const channels = [
  {
    title: 'Help & billing',
    body: 'Questions about a template, your plan, a download or a payment.',
    email: SUPPORT_EMAIL,
    subject: 'Help with TemplateHub',
  },
  {
    title: 'Licensing & agencies',
    body: 'Not sure which licence fits your project, or need an Enterprise plan?',
    email: SUPPORT_EMAIL,
    subject: 'Licensing question',
  },
  {
    title: 'Partners & affiliates',
    body: 'Join the partner programme or ask about a payout.',
    email: AFFILIATE_EMAIL,
    subject: 'Partner programme',
  },
  {
    title: 'Privacy & legal',
    body: 'Data requests, takedown notices and anything legal.',
    email: LEGAL_EMAIL,
    subject: 'Privacy / legal request',
  },
];

export default function ContactPage() {
  return (
    <InfoPage
      eyebrow="Contact"
      title="Talk to a human"
      intro="We reply to every message, usually within 1–2 business days (Central European Time)."
    >
      <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
        {channels.map((c) => (
          <a
            key={c.title}
            href={`mailto:${c.email}?subject=${encodeURIComponent(c.subject)}`}
            className="block p-5 rounded-2xl border border-purple-500/25 bg-[#0d0622] hover:border-purple-400/60 transition-colors no-underline"
            style={{ textDecoration: 'none' }}
          >
            <div className="text-white font-bold mb-1">{c.title}</div>
            <div className="text-sm text-purple-200/75 mb-3">{c.body}</div>
            <div className="text-sm font-mono text-fuchsia-300">{c.email} →</div>
          </a>
        ))}
      </div>

      <h2>Before you write</h2>
      <ul>
        <li>For download problems, include the template name and the email on your account.</li>
        <li>For billing, include your receipt or order number.</li>
        <li>
          Many answers are already in our <Link href="/#license">FAQ</Link>, <Link href="/licensing">licensing guide</Link> and{' '}
          <Link href="/refunds">refund policy</Link>.
        </li>
      </ul>
    </InfoPage>
  );
}
