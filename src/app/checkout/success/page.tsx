import Link from 'next/link';

export default function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center px-4 py-16 bg-[#09090b]">
      <div className="max-w-md w-full bg-surface border border-line rounded-2xl p-8 text-center backdrop-blur-md shadow-2xl relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/20 blur-3xl pointer-events-none rounded-full" />

        {/* Checkmark badge */}
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6 text-emerald-400">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-3">
          Payment Confirmed
        </span>

        <h1 className="text-2xl font-bold tracking-tight text-white mb-2">
          Welcome to TemplateHub!
        </h1>
        <p className="text-sm text-muted mb-8 leading-relaxed">
          Your subscription via Dodo Payments is now active. You have unlocked unlimited template access and full commercial licenses.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/templates"
            className="w-full py-3 px-4 bg-white text-zinc-950 font-semibold text-sm rounded-lg hover:bg-zinc-200 transition-colors shadow-xs"
          >
            Explore & Download Templates
          </Link>
          <Link
            href="/builder"
            className="w-full py-3 px-4 bg-raised text-zinc-200 font-medium text-sm rounded-lg hover:bg-zinc-700 border border-line transition-colors"
          >
            Open Visual No-Code Customizer
          </Link>
          <Link
            href="/"
            className="text-xs text-muted hover:text-white pt-2 transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
