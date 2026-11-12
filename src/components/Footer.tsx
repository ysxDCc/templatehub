import Link from 'next/link';
import Logo from '@/components/Logo';
import { TEMPLATE_COUNT } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="bg-[#05020f] border-t border-purple-500/20 pt-20 pb-12 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-56 bg-purple-600/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
          
          {/* Brand Col */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block">
              <Logo size="lg" />
            </Link>
            <p className="mt-4 text-xs sm:text-sm text-purple-200/70 leading-relaxed max-w-sm">
              Fast, dependency-free website templates you can preview, customise in your browser and host anywhere.
              Made for small businesses, freelancers and agencies.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{TEMPLATE_COUNT} templates live</span>
              </span>

            </div>
          </div>

          {/* Links Col 1: Templates */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4 text-purple-300 font-mono">
              Templates
            </h4>
            <ul className="space-y-2.5 text-xs text-purple-200/70">
              <li><Link href="/templates" className="hover:text-white transition-colors">All {TEMPLATE_COUNT} templates</Link></li>
              <li><Link href="/templates/astral-aerospace" className="hover:text-white transition-colors">ASTRAL Aerospace</Link></li>
              <li><Link href="/templates/neo-tokyo-cyberpunk" className="hover:text-white transition-colors">Neo-Tokyo Cyberpunk</Link></li>
              <li><Link href="/templates/velox-f1-racing" className="hover:text-white transition-colors">VELOX F1 Racing</Link></li>
              <li><Link href="/templates/monolith-architecture" className="hover:text-white transition-colors">Monolith Studio</Link></li>
              <li><Link href="/templates/neuro-biotech" className="hover:text-white transition-colors">NEURO BioTech</Link></li>
            </ul>
          </div>

          {/* Links Col 2: Plans & Access */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4 text-fuchsia-300 font-mono">
              Plans &amp; Tools
            </h4>
            <ul className="space-y-2.5 text-xs text-purple-200/70">
              <li><Link href="/#pricing" className="hover:text-white transition-colors">Free Plan (€0)</Link></li>
              <li><Link href="/#pricing" className="hover:text-white transition-colors">Basic Plan (€3/mo)</Link></li>
              <li><Link href="/#pricing" className="hover:text-white transition-colors">Pro Plan (€10/mo)</Link></li>
              <li><Link href="/#pricing" className="hover:text-white transition-colors">Enterprise License</Link></li>
              <li><Link href="/studio" className="hover:text-white transition-colors">Auto-Edit Studio</Link></li>
              <li><Link href="/ai-generator" className="hover:text-white transition-colors">AI Template Studio</Link></li>
              <li><Link href="/compare" className="hover:text-white transition-colors">Compare Tool</Link></li>
              <li><Link href="/builder" className="hover:text-white transition-colors">Page Builder</Link></li>
            </ul>
          </div>

          {/* Links Col 3: Community & Governance */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4 text-purple-300 font-mono">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs text-purple-200/70">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/licensing" className="hover:text-white transition-colors">Licensing</Link></li>
              <li><Link href="/affiliate" className="hover:text-white transition-colors">Partner programme (30%)</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-purple-500/20 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-purple-300/60 font-mono text-center md:text-left">
          <p>© {new Date().getFullYear()} TemplateHub. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            <Link href="/terms" className="hover:text-purple-200">Terms</Link>
            <Link href="/privacy" className="hover:text-purple-200">Privacy</Link>
            <Link href="/privacy#cookies" className="hover:text-purple-200">Cookies</Link>
            <Link href="/refunds" className="hover:text-purple-200">Refunds</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
