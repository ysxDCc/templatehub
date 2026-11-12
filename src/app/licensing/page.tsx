import type { Metadata } from 'next';
import Link from 'next/link';
import InfoPage from '@/components/legal/InfoPage';
import { SITE_NAME, SUPPORT_EMAIL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Licensing — What You Can Do With Each Plan',
  description: `Personal, freelance, commercial and agency licences for ${SITE_NAME} templates, explained in plain language.`,
  alternates: { canonical: '/licensing' },
};

const yes = <span className="text-emerald-400 font-bold">Yes</span>;
const no = <span className="text-rose-300">No</span>;

export default function LicensingPage() {
  return (
    <InfoPage
      eyebrow="Licensing"
      title="What you can do with each plan"
      showUpdated
      intro="Your licence depends on the plan you had when you downloaded a template. Once downloaded, that licence doesn't expire — even if you cancel later."
    >
      <h2 id="compare">At a glance</h2>
      <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0" role="region" aria-label="Plan comparison" tabIndex={0}>
      <table className="min-w-[560px] [&_td:first-child]:sticky [&_td:first-child]:left-0 [&_td:first-child]:bg-bg [&_th:first-child]:sticky [&_th:first-child]:left-0 [&_th:first-child]:z-10">
        <thead>
          <tr>
            <th scope="col">You want to…</th>
            <th scope="col">Free</th>
            <th scope="col">Basic</th>
            <th scope="col">Pro</th>
            <th scope="col">Enterprise</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Build your own personal site, blog or portfolio</td><td>{yes}</td><td>{yes}</td><td>{yes}</td><td>{yes}</td></tr>
          <tr><td>Use it for your own freelance business</td><td>{no}</td><td>{yes}</td><td>{yes}</td><td>{yes}</td></tr>
          <tr><td>Use it for a company or a site that sells things</td><td>{no}</td><td>{no}</td><td>{yes}</td><td>{yes}</td></tr>
          <tr><td>Build a site for a paying client</td><td>{no}</td><td>{no}</td><td>{yes} (one client per download)</td><td>{yes} (unlimited)</td></tr>
          <tr><td>Use across many client projects at an agency</td><td>{no}</td><td>{no}</td><td>{no}</td><td>{yes}</td></tr>
          <tr><td>Edit the code as much as you like</td><td>{yes}</td><td>{yes}</td><td>{yes}</td><td>{yes}</td></tr>
          <tr><td>Resell or share the template itself</td><td>{no}</td><td>{no}</td><td>{no}</td><td>{no}</td></tr>
        </tbody>
      </table>
      </div>

      <h2 id="ownership">Who owns what</h2>
      <p>
        You own the content you add — your text, photos, logos and products. We keep the copyright in the template design and code,
        and give you a licence to use it as described above. That&apos;s how almost all template licences work, and it&apos;s what stops
        someone re-selling our templates as their own.
      </p>

      <h2 id="after-cancel">After you cancel</h2>
      <p>
        Sites you built with templates downloaded during your subscription can stay online forever, under the licence of the plan you
        had at the time. You just can&apos;t download new templates or new versions until you subscribe again.
      </p>

      <h2 id="not-allowed">Never allowed</h2>
      <ul>
        <li>Selling or giving away the templates as templates, themes or starter kits — including on marketplaces.</li>
        <li>Uploading the templates to a site builder or tool so other people can use them.</li>
        <li>Using them to train AI models or build a competing template service.</li>
        <li>Using them for illegal, deceptive or harmful sites.</li>
      </ul>

      <h2 id="third-party">Fonts, icons and images</h2>
      <p>
        Templates may load fonts from Google Fonts and use icons or sample photos under their own free licences. Sample photos are
        placeholders: replace them with your own before you publish.
      </p>

      <h2 id="questions">Not sure?</h2>
      <p>
        Email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> and describe your project — we&apos;ll tell you which plan covers it.
        Ready to choose? <Link href="/#pricing">See plans</Link>.
      </p>
    </InfoPage>
  );
}
