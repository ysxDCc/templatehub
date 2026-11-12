import type { Metadata } from 'next';
import InfoPage from '@/components/legal/InfoPage';
import { LEGAL_EMAIL, OPERATOR, SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `What personal data ${SITE_NAME} collects, why, who we share it with, and your rights under the GDPR.`,
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <InfoPage
      eyebrow="Legal"
      title="Privacy Policy"
      showUpdated
      intro="We collect as little as we can, never sell your data, and use no advertising trackers."
    >
      <h2 id="controller">1. Who is responsible</h2>
      <p>
        The data controller is {OPERATOR.name}, {OPERATOR.country}. For anything privacy-related, email{' '}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.
      </p>

      <h2 id="what">2. What we collect and why</h2>
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Why</th>
            <th>Legal basis (GDPR)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Name, email, login details</td>
            <td>To create and secure your account</td>
            <td>Contract (Art. 6(1)(b))</td>
          </tr>
          <tr>
            <td>Plan, purchases, downloads</td>
            <td>To give you the templates you paid for and enforce plan limits</td>
            <td>Contract</td>
          </tr>
          <tr>
            <td>Billing details</td>
            <td>Handled by our payment partner to take payment and meet tax rules</td>
            <td>Contract and legal obligation</td>
          </tr>
          <tr>
            <td>Reviews you post</td>
            <td>Shown publicly on template pages with your display name</td>
            <td>Contract</td>
          </tr>
          <tr>
            <td>AI Studio prompts</td>
            <td>Sent to our AI provider to generate your page; not used to identify you</td>
            <td>Contract</td>
          </tr>
          <tr>
            <td>Emails you send us</td>
            <td>To answer you</td>
            <td>Legitimate interest (Art. 6(1)(f))</td>
          </tr>
          <tr>
            <td>Server logs (IP address, browser, time)</td>
            <td>Security and fixing errors; kept for a short time</td>
            <td>Legitimate interest</td>
          </tr>
          <tr>
            <td>Referral code (if you arrived through a partner link)</td>
            <td>To pay the partner who referred you</td>
            <td>Legitimate interest</td>
          </tr>
        </tbody>
      </table>
      <p>Your edits in the Auto-Edit Studio, including uploaded photos, are processed in your browser and are not uploaded to us.</p>

      <h2 id="processors">3. Who we share data with</h2>
      <p>We only share data with service providers that help us run {SITE_NAME}, under data processing agreements:</p>
      <ul>
        <li><strong>Clerk</strong> — account sign-in and user management</li>
        <li><strong>Dodo Payments</strong> — checkout, billing and tax (merchant of record)</li>
        <li><strong>Vercel</strong> — website hosting</li>
        <li><strong>Google (Gemini API)</strong> — AI Studio generation, only when you use it</li>
      </ul>
      <p>
        Some of these providers are outside the EU. Where that&apos;s the case, transfers are covered by the EU Standard Contractual
        Clauses or an adequacy decision. We never sell your data or share it for advertising.
      </p>

      <h2 id="cookies">4. Cookies and local storage</h2>
      <p>We only use what&apos;s needed to make the site work. We don&apos;t use advertising or cross-site tracking cookies, so there&apos;s no cookie banner.</p>
      <ul>
        <li><strong>Sign-in cookies</strong> (Clerk) — keep you logged in. Essential.</li>
        <li><strong>Referral cookie</strong> (<code>th_ref</code>, 60 days) — only set if you open a partner link, so the partner gets credit.</li>
        <li><strong>Local storage</strong> — remembers your saved templates and sound setting on your own device.</li>
      </ul>

      <h2 id="retention">5. How long we keep data</h2>
      <ul>
        <li>Account data: while your account exists, then deleted within 30 days of closing it.</li>
        <li>Billing records: as long as tax law requires (usually 10 years in Slovakia), kept by our payment partner.</li>
        <li>Server logs: up to 30 days.</li>
      </ul>

      <h2 id="rights">6. Your rights</h2>
      <p>
        You can ask to see, correct, export or delete your data, or object to how we use it. Email{' '}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a> and we&apos;ll reply within one month. You can also complain to your data
        protection authority — in Slovakia that&apos;s the{' '}
        <a href="https://dataprotection.gov.sk" target="_blank" rel="noopener noreferrer">Úrad na ochranu osobných údajov SR</a>.
      </p>

      <h2 id="changes">7. Changes</h2>
      <p>If we change this policy in a meaningful way, we&apos;ll email account holders before it takes effect.</p>
    </InfoPage>
  );
}
