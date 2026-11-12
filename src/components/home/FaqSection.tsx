import Link from 'next/link';
import Section from '@/components/ui/Section';
import Accordion from '@/components/ui/Accordion';

const FAQ = [
  {
    q: 'What do I actually get?',
    a: <p>Each template downloads as an index.html with its CSS and images. Open it in a browser to check it, then upload it to any host.</p>,
  },
  {
    q: 'Can I use templates for client work?',
    a: (
      <p>
        It depends on your plan. Free is for personal sites, Basic adds your own freelance projects, Pro covers commercial and client
        sites, and Enterprise covers agencies. <Link href="/licensing" className="text-lilac underline">See licences</Link>.
      </p>
    ),
  },
  {
    q: 'How does the free trial work?',
    a: (
      <p>
        Pro starts with 3 free days. Cancel before they end and you pay nothing; otherwise it renews monthly until you cancel.{' '}
        <Link href="/terms#subscriptions" className="text-lilac underline">Subscription terms</Link>.
      </p>
    ),
  },
  {
    q: 'Can I get a refund?',
    a: (
      <p>
        If a template doesn&apos;t work as shown in its preview, we fix it or refund you. <Link href="/refunds" className="text-lilac underline">Refund policy</Link>.
      </p>
    ),
  },
  { q: 'I use React, Vue or Astro. Will it work?', a: <p>Yes. The markup is plain HTML, and members can export JSX, Vue or Astro versions from each template&apos;s code tab.</p> },
  { q: 'Where can I host my site?', a: <p>Anywhere that serves static files: Netlify, Vercel, GitHub Pages, Cloudflare Pages or a normal cPanel host.</p> },
];

export default function FaqSection() {
  return (
    <Section id="faq" eyebrow="FAQ" title="Questions, answered">
      <div className="max-w-3xl">
        <Accordion items={FAQ} />
      </div>
    </Section>
  );
}
