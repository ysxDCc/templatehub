'use client';

import { cyberSound } from '@/lib/sound';
import { SITE_URL } from '@/lib/site';

interface LighthouseAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  templateName: string;
  /** Path of the live preview, e.g. /sandboxes/apex-landing/index.html */
  previewPath?: string;
}

export default function LighthouseAuditModal({
  isOpen,
  onClose,
  templateName,
  previewPath,
}: LighthouseAuditModalProps) {
  // These are typical lab values for a static, framework-free page. The real
  // audit is one click away on Google PageSpeed Insights.
  const auditing = false;
  const fcp = 0.2;
  const lcp = 0.35;
  const pageSpeedUrl = previewPath
    ? `https://pagespeed.web.dev/analysis?url=${encodeURIComponent(`${SITE_URL}${previewPath}`)}`
    : 'https://pagespeed.web.dev/';

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md transition-all animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-3xl bg-[#090317] border border-emerald-500/35 p-6 sm:p-8 shadow-[0_0_80px_rgba(16,185,129,0.25)] relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 right-1/4 w-48 h-20 bg-emerald-500/15 blur-[60px] pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Lighthouse &amp; Core Web Vitals Benchmark
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Typical values
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono">
                Expected results for {templateName}. Run a real audit below.
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

        {/* 4 Radial Score Meters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Performance', score: 100, color: '#10b981' },
            { label: 'Accessibility', score: 100, color: '#10b981' },
            { label: 'Best Practices', score: 100, color: '#10b981' },
            { label: 'SEO Audit', score: 100, color: '#10b981' },
          ].map((item) => (
            <div
              key={item.label}
              className="p-4 rounded-2xl bg-[#0e0624]/90 border border-emerald-500/20 text-center relative overflow-hidden"
            >
              <div className="relative w-20 h-20 mx-auto flex items-center justify-center mb-2">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    stroke="#18181b"
                    strokeWidth="6"
                    fill="transparent"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    stroke={item.color}
                    strokeWidth="6"
                    strokeDasharray="201.06"
                    strokeDashoffset={auditing ? "201.06" : "0"}
                    fill="transparent"
                    className="transition-all duration-1000 ease-out"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute text-xl font-black text-white font-mono">
                  {auditing ? '…' : item.score}
                </span>
              </div>
              <div className="text-xs font-bold text-white tracking-wide">
                {item.label}
              </div>
              <div className="text-[10px] text-emerald-400 font-mono mt-0.5">
                Target Met (90-100)
              </div>
            </div>
          ))}
        </div>

        {/* Core Web Vitals Telemetry Grid */}
        <div className="p-4 rounded-2xl bg-[#070314] border border-white/10 mb-6">
          <div className="text-xs font-bold text-zinc-300 uppercase tracking-wider font-mono mb-3 flex items-center justify-between">
            <span>Core Web Vitals Metrics</span>
            <span className="text-emerald-400 text-[11px]">Zero Runtime Overhead</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <div className="p-2.5 rounded-xl bg-zinc-950 border border-white/5">
              <div className="text-[10px] text-zinc-400 font-mono">First Contentful Paint</div>
              <div className="text-base font-black text-emerald-400 font-mono mt-0.5">
                {auditing ? '…' : `${fcp}s`}
              </div>
              <div className="text-[9px] text-zinc-500">Threshold &lt; 1.8s</div>
            </div>

            <div className="p-2.5 rounded-xl bg-zinc-950 border border-white/5">
              <div className="text-[10px] text-zinc-400 font-mono">Largest Contentful Paint</div>
              <div className="text-base font-black text-emerald-400 font-mono mt-0.5">
                {auditing ? '…' : `${lcp}s`}
              </div>
              <div className="text-[9px] text-zinc-500">Threshold &lt; 2.5s</div>
            </div>

            <div className="p-2.5 rounded-xl bg-zinc-950 border border-white/5">
              <div className="text-[10px] text-zinc-400 font-mono">Total Blocking Time</div>
              <div className="text-base font-black text-emerald-400 font-mono mt-0.5">
                0 ms
              </div>
              <div className="text-[9px] text-zinc-500">Threshold &lt; 200ms</div>
            </div>

            <div className="p-2.5 rounded-xl bg-zinc-950 border border-white/5">
              <div className="text-[10px] text-zinc-400 font-mono">Cumulative Layout Shift</div>
              <div className="text-base font-black text-emerald-400 font-mono mt-0.5">
                0.000
              </div>
              <div className="text-[9px] text-zinc-500">Threshold &lt; 0.1</div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
            <span>No trackers</span>
            <span>•</span>
            <span>No framework</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href={pageSpeedUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => cyberSound.playClick()}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-[0_0_15px_rgba(16,185,129,0.35)] transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <span>⚡</span>
              <span>Run a real audit on PageSpeed Insights ↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
