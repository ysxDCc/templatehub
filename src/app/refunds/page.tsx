import type { Metadata } from 'next';
import Link from 'next/link';
import InfoPage from '@/components/legal/InfoPage';
import { SITE_NAME, SUPPORT_EMAIL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: `How cancellations, free trials and refunds work at ${SITE_NAME}.`,
  alternates: { canonical: '/refunds' },
};

export default function RefundsPage() {
  return (
    <InfoPage
      eyebrow="Legal"
      title="Refund Policy"
      showUpdated
      intro="Short version: cancel any time, and if something we sold you doesn't work as described, we'll fix it or refund you."
    >
      <h2 id="trial">Free trial</h2>
      <p>
        The Pro plan starts with a 3-day free trial. Cancel before it ends and you&apos;re never charged. If you forget and are
        charged for a month you didn&apos;t use — no downloads after the trial ended — email us within 7 days of the charge and
        we&apos;ll refund it.
      </p>

      <h2 id="subscriptions">Subscriptions</h2>
      <ul>
        <li>You can cancel any time. You keep access until the end of the month you&apos;ve paid for, and won&apos;t be charged again.</li>
        <li>We don&apos;t usually refund part-used months, because downloaded templates can&apos;t be returned.</li>
        <li>If you were charged by mistake (for example, a double charge), we always refund in full.</li>
      </ul>

      <h2 id="single">Single-template purchases</h2>
      <p>
        If the template you bought doesn&apos;t work as shown in its live preview, tell us within 14 days. We&apos;ll fix it, or refund
        you in full if we can&apos;t.
      </p>

      <h2 id="withdrawal">EU right of withdrawal</h2>
      <p>
        EU consumers normally have 14 days to withdraw from an online purchase. For digital content, that right ends once the
        download or access starts, if you agreed to this at checkout. Our &ldquo;doesn&apos;t work as described&rdquo; promise above still
        applies, and none of this affects your legal rights if content is faulty.
      </p>

      <h2 id="how">How to ask for a refund</h2>
      <p>
        Email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> from the address on your account, with your order or receipt
        number and a short reason. We reply within 2 business days. Approved refunds go back to your original payment method,
        usually within 5–10 business days.
      </p>
      <p>
        See also our <Link href="/terms#subscriptions">Terms of Service</Link>.
      </p>
    </InfoPage>
  );
}
