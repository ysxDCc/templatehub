import type { Metadata } from 'next';
import Link from 'next/link';
import InfoPage from '@/components/legal/InfoPage';
import { OPERATOR, SITE_NAME, TEMPLATE_COUNT } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description: `Why ${SITE_NAME} exists and how we build our dependency-free website templates.`,
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <InfoPage
      eyebrow="About"
      title={`Why ${SITE_NAME} exists`}
      intro="Most website templates come wrapped in frameworks, page builders and hundreds of packages. We think a website should be a few files you actually understand."
    >
      <h2>What we make</h2>
      <p>
        {SITE_NAME} is an independent template studio based in {OPERATOR.country}. We design and hand-build every template in our
        catalogue — {TEMPLATE_COUNT} so far, from restaurant and fitness sites to SaaS landing pages and portfolios.
      </p>
      <p>Every template follows the same rules:</p>
      <ul>
        <li><strong>Plain files.</strong> HTML, CSS and a little vanilla JavaScript. No npm, no build step.</li>
        <li><strong>Works everywhere.</strong> Responsive on phones, tablets and desktops; hosts on any static server.</li>
        <li><strong>Easy to rebrand.</strong> Colours live in CSS variables, and the Auto-Edit Studio swaps in your text and photos for you.</li>
        <li><strong>Preview before you pay.</strong> Every template has a full live preview, not just a screenshot.</li>
      </ul>

      <h2>How we&apos;re funded</h2>
      <p>
        By subscriptions and one-off template sales — nothing else. No ads, no selling data. That keeps our only job simple: make
        templates good enough that you want to stay.
      </p>

      <h2>Get in touch</h2>
      <p>
        Ideas for a template, found a bug, or just want to say hi? <Link href="/contact">Contact us</Link>. Want to earn by
        recommending us? See the <Link href="/affiliate">partner programme</Link>.
      </p>
    </InfoPage>
  );
}
