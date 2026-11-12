import type { Metadata } from 'next';
import Link from 'next/link';
import InfoPage from '@/components/legal/InfoPage';
import { AFFILIATE_EMAIL, SITE_NAME, SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Partner Programme — Earn 30% Commission',
  description: `Recommend ${SITE_NAME} and earn 30% recurring commission on every customer you refer.`,
  alternates: { canonical: '/affiliate' },
};

export default function AffiliatePage() {
  return (
    <InfoPage
      eyebrow="Partner programme"
      title="Earn 30% for every customer you refer"
      intro="Write about us, make a video, or recommend us to clients. When someone subscribes through your link, you get 30% of every payment they make, for as long as they stay subscribed."
    >
      <h2>How it works</h2>
      <ol>
        <li>Sign in and open <strong>Affiliate</strong> in the top menu to copy your personal link. It looks like <code>{SITE_URL}?ref=yourcode</code>.</li>
        <li>Share it. When someone opens your link, we remember the referral for 60 days. The first partner link they opened gets the credit.</li>
        <li>If they buy a plan or a template within those 60 days, the sale is credited to you.</li>
        <li>Email <a href={`mailto:${AFFILIATE_EMAIL}`}>{AFFILIATE_EMAIL}</a> with your link to join and set up payouts.</li>
      </ol>

      <h2>Payout terms</h2>
      <ul>
        <li><strong>30% recurring commission</strong> on every payment from customers you referred.</li>
        <li>Commissions are confirmed 30 days after each payment, so refunds and chargebacks can be removed.</li>
        <li>Payouts are made monthly by bank transfer or PayPal. There&apos;s no minimum balance.</li>
        <li>You&apos;re responsible for any tax on your commission.</li>
      </ul>

      <h2>Rules</h2>
      <ul>
        <li>No self-referrals, and no coupon, cashback or incentive sites.</li>
        <li>No paid ads on our brand name, and no spam or misleading claims.</li>
        <li>Say clearly that you earn a commission (your local advertising rules usually require it).</li>
        <li>We can end the programme or remove partners who break these rules. Confirmed commissions are still paid.</li>
      </ul>

      <p>
        Questions? <Link href="/contact">Contact us</Link>.
      </p>
    </InfoPage>
  );
}
