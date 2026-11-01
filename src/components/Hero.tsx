import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative border-b border-white/[0.08] bg-[#09090b] pt-20 pb-20 md:pt-28 md:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-zinc-900/60 text-zinc-300 text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>30 production-grade templates available</span>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-400">Commercial licenses included</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.08]">
            Pre-built website templates for developers and teams.
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-zinc-400 leading-relaxed font-normal mb-8 max-w-2xl">
            Clean, semantic HTML and Tailwind CSS code bases crafted for SaaS, dashboards, e-commerce, and portfolios. Download, customize, and deploy.
          </p>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link 
              href="/templates" 
              className="px-6 py-3 text-sm font-semibold text-zinc-950 bg-white rounded-lg hover:bg-zinc-200 transition-colors text-center shadow-xs"
            >
              Browse all templates
            </Link>
            <Link 
              href="/#pricing" 
              className="px-6 py-3 text-sm font-medium text-zinc-300 border border-white/10 bg-zinc-900/50 rounded-lg hover:bg-zinc-800 hover:text-white transition-colors text-center"
            >
              Subscription pricing (from €3/mo)
            </Link>
          </div>
        </div>

        {/* Value Proof Badges */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div>
            <div className="text-sm font-semibold text-white">Standalone Files</div>
            <div className="text-xs text-zinc-500 mt-0.5">Zero npm configuration required</div>
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Live In-Browser Sandboxes</div>
            <div className="text-xs text-zinc-500 mt-0.5">Inspect and test before downloading</div>
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Commercial Rights</div>
            <div className="text-xs text-zinc-500 mt-0.5">Use across unlimited client projects</div>
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Regular Releases</div>
            <div className="text-xs text-zinc-500 mt-0.5">New industry templates added monthly</div>
          </div>
        </div>
      </div>
    </div>
  );
}
