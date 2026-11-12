import { SignIn } from '@clerk/nextjs';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const resolvedParams = await searchParams;
  const plan = resolvedParams?.plan;
  const isProTrial = plan === 'pro';
  // Any paid plan picked before signing in continues to checkout afterwards.
  const paidPlan = plan === 'basic' || plan === 'pro' || plan === 'enterprise' ? plan : null;
  const afterAuth = paidPlan ? `/checkout/start?plan=${paidPlan}` : '/templates';

  return (
    <div className="flex flex-col min-h-[calc(100vh-160px)] items-center justify-center px-4 py-16 bg-[#070314]">
      {isProTrial && (
        <>
          <script
            dangerouslySetInnerHTML={{
              __html: `localStorage.setItem('pending_trial_checkout', 'pro');`,
            }}
          />
          <div className="mb-6 p-4 rounded-2xl bg-[#0e0626] border border-purple-500/40 text-center max-w-md w-full shadow-[0_0_30px_rgba(168,85,247,0.3)]">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/35 text-emerald-300 text-[11px] font-mono font-bold uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Sign In to Continue Free Trial
            </div>
            <p className="text-muted text-xs">
              Sign in to your account. You will then be redirected to activate your 3-day Pro trial (&euro;0 today).
            </p>
          </div>
        </>
      )}
      <SignIn
        routing="hash"
        forceRedirectUrl={afterAuth}
        fallbackRedirectUrl={afterAuth}
        signUpUrl={paidPlan ? `/signup?plan=${paidPlan}` : '/signup'}
      />
    </div>
  );
}
