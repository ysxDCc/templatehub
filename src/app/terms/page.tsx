import type { Metadata } from 'next';
import Link from 'next/link';
import InfoPage from '@/components/legal/InfoPage';
import { LEGAL_EMAIL, OPERATOR, SITE_NAME, SUPPORT_EMAIL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `The terms that apply when you use ${SITE_NAME}, create an account, start a trial or buy a subscription.`,
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <InfoPage eyebrow="Legal" title="Terms of Service" showUpdated intro={`These terms apply when you use ${SITE_NAME}. They're written to be read, not skimmed past — please do.`}>
      <h2 id="who-we-are">1. Who we are</h2>
      <p>
        {SITE_NAME} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is operated by {OPERATOR.name}, based in {OPERATOR.country}. You can reach us at{' '}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> for support and <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a> for legal matters.
      </p>

      <h2 id="service">2. The service</h2>
      <p>
        {SITE_NAME} lets you preview website templates, customise them in your browser and download them as HTML, CSS and
        image files. Some templates and features are free; others need a paid plan or a one-time purchase.
      </p>

      <h2 id="accounts">3. Your account</h2>
      <ul>
        <li>You must give accurate details and keep your login secure. You&apos;re responsible for activity on your account.</li>
        <li>You must be at least 16 years old, or have permission from a parent or guardian.</li>
        <li>One account is for one person. Enterprise plans can be used by the agency that bought them.</li>
      </ul>

      <h2 id="subscriptions">4. Subscriptions, trials and payments</h2>
      <ul>
        <li>Prices are shown in euros on the <Link href="/#pricing">pricing section</Link>. Taxes such as VAT are calculated at checkout where they apply.</li>
        <li>Payments are processed by our payment partner, Dodo Payments, which acts as merchant of record. We never see or store your full card details.</li>
        <li>Subscriptions renew automatically each month until you cancel.</li>
        <li>
          <strong>Free trial:</strong> the Pro plan includes a 3-day free trial. You pay €0 when you start. If you don&apos;t cancel before
          the trial ends, your card is charged the monthly price and the subscription continues.
        </li>
        <li>
          <strong>Cancelling:</strong> you can cancel any time from the link in your payment receipt email or by writing to{' '}
          <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. Your plan stays active until the end of the period you already paid for.
        </li>
        <li>If a payment fails, we may pause paid features until it succeeds.</li>
        <li>We may change prices. Changes never apply to a period you&apos;ve already paid for, and we&apos;ll tell you at least 30 days before a new price applies to your subscription.</li>
      </ul>
      <p>Refunds are covered in our <Link href="/refunds">Refund Policy</Link>.</p>

      <h2 id="licence">5. Using the templates</h2>
      <p>
        When you download a template you get a licence to use it. What you may do depends on the plan you had at the time of
        download — see <Link href="/licensing">Licensing</Link> for the details. In every case you may not resell or give away the
        templates themselves (as templates, themes or in a template marketplace), or claim you made them.
      </p>

      <h2 id="acceptable-use">6. Acceptable use</h2>
      <p>Don&apos;t use {SITE_NAME} or our templates to:</p>
      <ul>
        <li>break the law, or build sites for fraud, phishing, malware or impersonation;</li>
        <li>scrape, bulk-download or share account access to get around plan limits;</li>
        <li>attack, overload or try to break into the service.</li>
      </ul>
      <p>We may suspend accounts that do. Where reasonable, we&apos;ll warn you first.</p>

      <h2 id="ai">7. AI Studio</h2>
      <p>
        AI Studio generates page drafts from your prompts. Output can be wrong or resemble existing material — review it before you
        publish. Don&apos;t enter personal or confidential information in prompts.
      </p>

      <h2 id="availability">8. Availability and changes</h2>
      <p>
        We work to keep {SITE_NAME} running, but can&apos;t promise it will always be available or error-free. We may add, change or
        remove templates and features. If we remove something that is a core part of a paid plan, we&apos;ll tell you and you can
        cancel or ask for a pro-rata refund.
      </p>

      <h2 id="liability">9. Liability</h2>
      <p>
        Templates are provided &ldquo;as is&rdquo;. You&apos;re responsible for the content you publish and for checking that your final site
        meets the laws that apply to you (for example accessibility, cookie and privacy rules). To the extent the law allows, our
        total liability to you is limited to the amount you paid us in the 12 months before the claim. Nothing in these terms limits
        rights you have as a consumer that can&apos;t be limited by law.
      </p>

      <h2 id="law">10. Governing law</h2>
      <p>
        These terms are governed by the laws of {OPERATOR.country}. If you&apos;re a consumer in the EU, you also keep the protection of
        the mandatory laws of your own country, and can use the courts there. The EU&apos;s Online Dispute Resolution platform is at{' '}
        <a href="https://ec.europa.eu/consumers/odr" rel="noopener noreferrer" target="_blank">ec.europa.eu/consumers/odr</a>.
      </p>

      <h2 id="changes">11. Changes to these terms</h2>
      <p>
        If we make important changes we&apos;ll email account holders at least 14 days before they take effect. If you don&apos;t agree, you
        can cancel before then.
      </p>
    </InfoPage>
  );
}
