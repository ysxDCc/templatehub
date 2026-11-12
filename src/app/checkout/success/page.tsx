import type { Metadata } from 'next';
import Link from 'next/link';
import CelebrateOnMount from '@/components/fx/CelebrateOnMount';
import { SuccessCheck } from '@/components/fx/Celebrate';

export const metadata: Metadata = { title: 'Payment confirmed', robots: { index: false, follow: false } };

const PLAN_TEXT: Record<string, string> = {
  basic: 'Your Basic plan is active: all Free and Basic templates, up to 5 downloads a month.',
  pro: 'Your Pro trial has started: all Free, Basic and Pro templates with a commercial licence. You can cancel any time before the trial ends.',
  enterprise: 'Your Enterprise plan is active: every template, including Enterprise-only ones, for unlimited client projects.',
  'single-template': 'Your template is unlocked. Head back to its page to download it.',
};

export default async function CheckoutSuccessPage({ searchParams }: { searchParams: Promise<{ plan?: string; type?: string; template?: string }> }) {
  const { plan, type, template } = await searchParams;
  const key = type === 'single' ? 'single-template' : plan;
  const text = (key && PLAN_TEXT[key]) || 'Your purchase is confirmed. It can take a minute for your account to update.';

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <CelebrateOnMount />
      <div className="relative max-w-md w-full rounded-section border border-line bg-surface p-8 text-center overflow-hidden">
        <div aria-hidden="true" className="absolute -top-24 left-1/2 -translate-x-1/2 w-56 h-56 rounded-full bg-[radial-gradient(closest-side,rgb(52_211_153/0.25),transparent)]" />
        <div className="relative flex justify-center mb-5">
          <SuccessCheck />
        </div>
        <h1 className="relative text-2xl font-bold tracking-tight text-ink">Payment confirmed — welcome!</h1>
        <p className="relative mt-2 text-[15px] text-muted leading-relaxed">{text}</p>
        <div className="relative mt-8 flex flex-col gap-3">
          <Link href={type === 'single' && template ? `/templates/${template}` : '/templates'} className="inline-flex items-center justify-center min-h-12 rounded-control bg-primary hover:bg-primary-hover text-white font-semibold">
            Browse & download templates
          </Link>
          <Link href="/studio" className="inline-flex items-center justify-center min-h-12 rounded-control bg-raised border border-line text-ink font-semibold hover:border-line-strong">
            Open the Auto-Edit Studio
          </Link>
          <Link href="/" className="inline-flex items-center justify-center min-h-11 text-sm text-muted hover:text-ink">
            Back to the homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
