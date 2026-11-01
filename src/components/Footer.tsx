import Link from 'next/link';
import Logo from '@/components/Logo';

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
              The sovereign subscription marketplace for high-performance website templates. 
              Engineered for founders, agencies, and full-stack builders.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>All 36 Masterpieces Live</span>
              </span>
              <span className="text-xs text-purple-400/70 font-mono">v3.0.0 Cyber</span>
            </div>
          </div>

          {/* Links Col 1: Templates */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4 text-purple-300 font-mono">
              Templates
            </h4>
            <ul className="space-y-2.5 text-xs text-purple-200/70">
              <li><Link href="/templates" className="hover:text-white transition-colors">All 36 Templates</Link></li>
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
              <li><Link href="/ai-generator" className="hover:text-white transition-colors">AI Template Studio</Link></li>
              <li><Link href="/compare" className="hover:text-white transition-colors">Compare Tool</Link></li>
            </ul>
          </div>

          {/* Links Col 3: Community & Governance */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4 text-purple-300 font-mono">
              Ecosystem
            </h4>
            <ul className="space-y-2.5 text-xs text-purple-200/70">
              <li><Link href="/#license" className="hover:text-white transition-colors">Commercial License</Link></li>
              <li><Link href="/#license" className="hover:text-white transition-colors">Code Ownership</Link></li>
              <li><Link href="/templates" className="hover:text-white transition-colors">Store Auto-Edit</Link></li>
              <li><a href="https://templatehub.website" className="hover:text-white transition-colors">Status: Operational</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-purple-500/20 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-purple-300/60 font-mono">
          <p>© 2026 TemplateHub Inc. Built with Next.js, React &amp; Tailwind CSS.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-purple-200 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-purple-200 cursor-pointer">Cookie Settings</span>
            <span className="text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              256-bit TLS Encrypted
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
