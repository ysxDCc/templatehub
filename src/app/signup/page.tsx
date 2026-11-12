import { SignUp } from '@clerk/nextjs';

export default async function SignUpPage({
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
              Step 1 of 2: Create Account
            </div>
            <h2 className="text-white text-base font-bold">
              Start Your 3-Day Free Trial
            </h2>
            <p className="text-purple-200/75 text-xs mt-1">
              Create your account to continue. Next, you&apos;ll enter payment credentials to verify your 3-day trial (&euro;0 charged today).
            </p>
          </div>
        </>
      )}
      <SignUp
        routing="hash"
        forceRedirectUrl={afterAuth}
        fallbackRedirectUrl={afterAuth}
        signInUrl={paidPlan ? `/login?plan=${paidPlan}` : '/login'}
      />
    </div>
  );
}
