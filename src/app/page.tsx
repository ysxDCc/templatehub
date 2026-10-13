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
