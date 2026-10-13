import Link from 'next/link';
import Hero from '@/components/Hero';
import FeaturesSection from '@/components/FeaturesSection';
import TemplateCard from '@/components/TemplateCard';
import PricingCard from '@/components/PricingCard';
import { templates } from '@/data/templates';
import { pricingPlans } from '@/data/pricing';

export default function Home() {
  const featuredTemplates = templates.slice(0, 8);

  return (
    <div className="flex flex-col bg-[#09090b]">
      <Hero />

      {/* Featured Templates Section */}
      <section className="py-20 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
                Featured Templates
              </h2>
              <p className="text-sm text-zinc-400">
                Curated designs across SaaS, dashboards, e-commerce, and portfolios.
              </p>
            </div>
            <Link 
              href="/templates" 
              className="text-xs font-semibold text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <span>View all 14 templates</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {featuredTemplates.map(template => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>

          <div className="text-center">
            <Link 
              href="/templates" 
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white text-xs font-semibold rounded-lg border border-white/10 transition-colors"
            >
              Browse entire catalog (14 templates) →
            </Link>
          </div>
        </div>
      </section>

      <FeaturesSection />

      {/* Pricing Section */}
      <section id="pricing" className="py-20 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
              Transparent, flat pricing
            </h2>
            <p className="text-sm text-zinc-400">
              Pick the tier that fits your workflow. Cancel anytime, keep downloaded template files forever.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl">
            {pricingPlans.map(plan => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>

          {/* Supported payment badges */}
          <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Encrypted global checkout via Dodo Payments</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-zinc-500">Supported methods:</span>
              <span className="px-2.5 py-1 rounded-md bg-zinc-900 border border-white/10 text-zinc-200 font-medium flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 170 170">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.81-11.96-14.34-5.97-9.13-10.66-19.43-14.07-30.89-3.41-11.46-5.12-22.18-5.12-32.16 0-14.12 3.65-25.79 10.96-35.01 7.31-9.23 16.32-13.93 27.04-14.12 5.02 0 10.53 1.29 16.53 3.88 6 2.58 10.02 3.93 12.06 4.06 1.7.01 5.92-1.39 12.66-4.18 6.74-2.79 12.51-4.06 17.3-3.8 12.44.75 22.22 5.37 29.35 13.88-10.88 6.58-16.2 15.54-15.96 26.89.26 8.84 3.73 16.14 10.41 21.9 6.69 5.76 14.54 9.17 23.57 10.23-2.22 6.89-5.1 14.28-8.64 22.16zM119.22 33.64c0-7.29 2.65-14.18 7.96-20.67 5.31-6.5 11.9-10.74 19.78-12.72.33 1.15.5 2.27.5 3.36 0 7.2-2.75 14.17-8.24 20.91-5.49 6.74-12.16 10.87-20 12.39z"/>
                </svg>
                Apple Pay
              </span>
              <span className="px-2.5 py-1 rounded-md bg-zinc-900 border border-white/10 text-zinc-200 font-medium">
                Google Pay
              </span>
              <span className="px-2.5 py-1 rounded-md bg-zinc-900 border border-white/10 text-zinc-200 font-medium">
                Visa / Mastercard
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial License & FAQ callout */}
      <section id="license" className="py-20 border-b border-white/[0.08] bg-zinc-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border border-white/[0.06] bg-zinc-900/30">
              <h3 className="text-sm font-semibold text-white mb-2">What format are templates in?</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Templates are delivered as clean standalone HTML files with embedded, modern CSS and semantic layout structures. No required toolchain to preview or deploy.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-white/[0.06] bg-zinc-900/30">
              <h3 className="text-sm font-semibold text-white mb-2">Can I use templates for clients?</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Yes. Both Basic (€3/mo) and Pro (€10/mo) tiers grant full commercial rights to customize and ship finished websites for paying clients without attribution.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-white/[0.06] bg-zinc-900/30">
              <h3 className="text-sm font-semibold text-white mb-2">What happens if I cancel?</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                All templates downloaded during your active subscription remain yours to keep and use in perpetuity. No recurring lock-in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Clean Call To Action Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-10 md:p-14 rounded-2xl border border-white/10 bg-zinc-900/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
                Start building with TemplateHub today.
              </h2>
              <p className="text-sm text-zinc-400">
                Create a free account to claim your starter template and explore interactive live sandboxes for every design.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link 
                href="/signup" 
                className="px-5 py-2.5 bg-white text-zinc-950 font-semibold text-xs rounded-lg hover:bg-zinc-200 transition-colors shadow-xs"
              >
                Create free account
              </Link>
              <Link 
                href="/templates" 
                className="px-5 py-2.5 text-zinc-300 hover:text-white border border-white/10 rounded-lg text-xs font-medium hover:bg-zinc-800 transition-colors"
              >
                Browse catalog
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
