import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-950/80 border-t border-slate-850 pt-20 pb-12 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-48 bg-indigo-500/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
          
          {/* Brand Col */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl overflow-hidden p-[1px] bg-gradient-to-tr from-indigo-500 via-violet-500 to-cyan-400 shadow-md shadow-indigo-500/25">
                <img
                  src="/logo.jpg"
                  alt="TemplateHub Brand Mark"
                  className="w-full h-full object-cover rounded-[11px]"
                />
              </div>
              <span className="text-xl font-black text-white">
                Template<span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-violet-300 to-cyan-400">Hub</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-slate-400 leading-relaxed max-w-sm">
              The premium subscription marketplace for modern website templates. 
              Designed for entrepreneurs, agencies, and full-stack builders.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                All 14 Templates Live
              </span>
              <span className="text-xs text-slate-500 font-mono">v2.4.0</span>
            </div>
          </div>

          {/* Links Col 1 */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4 text-indigo-300">Templates</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/templates" className="text-slate-400 hover:text-white transition-colors">All Categories</Link></li>
              <li><Link href="/templates/aether-ai" className="text-slate-400 hover:text-white transition-colors">AI & LLM Platforms</Link></li>
              <li><Link href="/templates/cloudscale-saas" className="text-slate-400 hover:text-white transition-colors">SaaS Hubs</Link></li>
              <li><Link href="/templates/pulse-metrics" className="text-slate-400 hover:text-white transition-colors">Dashboards</Link></li>
              <li><Link href="/templates/prestige-estates" className="text-slate-400 hover:text-white transition-colors">Luxury Real Estate</Link></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4 text-violet-300">Plans & Access</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/#pricing" className="text-slate-400 hover:text-white transition-colors">Free Plan (€0)</Link></li>
              <li><Link href="/#pricing" className="text-slate-400 hover:text-white transition-colors">Basic Plan (€3/mo)</Link></li>
              <li><Link href="/#pricing" className="text-slate-400 hover:text-white transition-colors">Pro Plan (€10/mo)</Link></li>
              <li><Link href="/#pricing" className="text-slate-400 hover:text-white transition-colors">Enterprise License</Link></li>
            </ul>
          </div>

          {/* Links Col 3 */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4 text-cyan-300">Community</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">GitHub Repository</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Discord Community</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">X / Twitter</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2026 TemplateHub Inc. Built with Next.js & Tailwind CSS.</p>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Cookie Settings</span>
            <span>Security Status: Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
