'use client';

import { cyberSound } from '@/lib/sound';

interface BloatTeardownModalProps {
  isOpen: boolean;
  onClose: () => void;
  templateName: string;
}

export default function BloatTeardownModal({
  isOpen,
  onClose,
  templateName,
}: BloatTeardownModalProps) {
  if (!isOpen) return null;

  const comparisonRows = [
    {
      metric: 'HTTP Network Requests',
      templatehub: '1 Request',
      wp: '58–84 Requests',
      framer: '38–52 Requests',
      winner: 'th',
    },
    {
      metric: 'Compressed Payload',
      templatehub: '~28 KB',
      wp: '3.4 MB – 5.8 MB',
      framer: '1.9 MB – 2.6 MB',
      winner: 'th',
    },
    {
      metric: 'Time to Interactive (TTI)',
      templatehub: '14ms',
      wp: '1,420ms',
      framer: '620ms',
      winner: 'th',
    },
    {
      metric: 'Runtime JavaScript Overhead',
      templatehub: '0 KB (Zero-JS Engine)',
      wp: '1.2 MB (jQuery + 16 Plugins)',
      framer: '860 KB (Hydration Runtime)',
      winner: 'th',
    },
    {
      metric: 'Hosting Infrastructure Cost',
      templatehub: '€0/mo (Free Static Cloud)',
      wp: '€15–€35/mo (PHP/MySQL Server)',
      framer: '€20–€40/mo (Per-site Subscription)',
      winner: 'th',
    },
    {
      metric: 'Code Sovereignty & Ownership',
      templatehub: '100% Standalone (You Own It)',
      wp: 'Database Dependency Lock-in',
      framer: 'Proprietary Closed Platform',
      winner: 'th',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md transition-all animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl rounded-3xl bg-[#090317] border border-purple-500/35 p-6 sm:p-8 shadow-[0_0_80px_rgba(168,85,247,0.3)] relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 right-1/4 w-48 h-20 bg-purple-500/15 blur-[60px] pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              ⚖️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  The Bloat Teardown Benchmark
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Engineering Audit
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono">
                {templateName} vs. Monolithic CMS &amp; Closed Site Builders
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              cyberSound.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-[#070314] border border-white/10 text-zinc-400 hover:text-white flex items-center justify-center text-xs transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Comparison Matrix Table */}
        <div className="overflow-x-auto rounded-2xl border border-white/10 mb-6">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="bg-[#0e0624] text-zinc-400 border-b border-white/10">
                <th className="p-3.5 font-bold">Metric</th>
                <th className="p-3.5 font-bold text-purple-300 bg-purple-500/10">
                  ⚡ TemplateHub
                </th>
                <th className="p-3.5 font-bold text-zinc-400">WordPress / Elementor</th>
                <th className="p-3.5 font-bold text-zinc-400">Framer / Webflow</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-3.5 font-sans font-medium text-white text-xs">
                    {row.metric}
                  </td>
                  <td className="p-3.5 font-bold text-emerald-400 bg-emerald-500/[0.04]">
                    {row.templatehub}
                  </td>
                  <td className="p-3.5 text-rose-400/90">
                    {row.wp}
                  </td>
                  <td className="p-3.5 text-amber-400/90">
                    {row.framer}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Callout */}
        <div className="p-4 rounded-2xl bg-[#0e0624] border border-purple-500/20 text-xs text-purple-200/90 space-y-1 mb-6">
          <div className="font-bold text-white flex items-center gap-1.5">
            <span>✦</span>
            <span>Why Sovereign Code Matters:</span>
          </div>
          <p className="text-[11px] leading-relaxed text-zinc-400">
            When you build on TemplateHub, there is no vendor lock-in, no mandatory monthly platform fee, and no background JavaScript trackers slowing down your visitors’ devices. You receive raw, standalone HTML5 and CSS that you own forever.
          </p>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-[11px] text-zinc-500 font-mono">
            Benchmarks measured on standard Gigabit edge network
          </span>
          <button
            onClick={() => {
              cyberSound.playClick();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-all"
          >
            Close Teardown
          </button>
        </div>
      </div>
    </div>
  );
}
