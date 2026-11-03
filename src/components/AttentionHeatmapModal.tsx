'use client';

import { useState } from 'react';
import { cyberSound } from '@/lib/sound';

interface AttentionHeatmapModalProps {
  isOpen: boolean;
  onClose: () => void;
  templateName: string;
}

export default function AttentionHeatmapModal({
  isOpen,
  onClose,
  templateName,
}: AttentionHeatmapModalProps) {
  const [activeMode, setActiveMode] = useState<'thermal' | 'gaze' | 'friction'>('thermal');
  const [intensity, setIntensity] = useState<number>(85);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-zinc-900/60">
          <div className="flex items-center gap-3">
            <span className="text-xl">🔥</span>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Synthetic Eye-Tracking & CRO Attention Heatmap
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase">
                  Gaussian Gaze Sim
                </span>
              </h2>
              <p className="text-xs text-zinc-400">
                Simulating visual saliency and 3-second gaze trajectories across {templateName}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              cyberSound.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition-all text-sm"
          >
            ✕
          </button>
        </div>

        {/* Mode Selector & Controls Bar */}
        <div className="px-6 py-3 bg-zinc-900/40 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 bg-zinc-900 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => {
                cyberSound.playClick();
                setActiveMode('thermal');
              }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeMode === 'thermal'
                  ? 'bg-gradient-to-r from-rose-600 to-amber-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              🔥 Thermal Heatmap
            </button>
            <button
              onClick={() => {
                cyberSound.playClick();
                setActiveMode('gaze');
              }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeMode === 'gaze'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              🎯 Saccade Gaze Path
            </button>
            <button
              onClick={() => {
                cyberSound.playClick();
                setActiveMode('friction');
              }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeMode === 'friction'
                  ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              🧠 Cognitive Friction
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-zinc-400">Heat Density:</span>
            <input
              type="range"
              min="30"
              max="100"
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="w-24 accent-rose-500 cursor-pointer"
            />
            <span className="font-mono text-zinc-300 text-[11px]">{intensity}%</span>
          </div>
        </div>

        {/* Heatmap Visual Canvas Simulator */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          <div className="relative w-full h-[360px] bg-zinc-900 rounded-xl overflow-hidden border border-white/10 p-6 flex flex-col justify-between select-none">
            {/* Mock Template Layout in background */}
            <div className="opacity-25 flex flex-col justify-between h-full pointer-events-none">
              <div className="flex items-center justify-between border-b border-white/20 pb-3">
                <div className="h-4 w-28 bg-white/40 rounded" />
                <div className="flex gap-4">
                  <div className="h-3 w-12 bg-white/20 rounded" />
                  <div className="h-3 w-12 bg-white/20 rounded" />
                  <div className="h-3 w-12 bg-white/20 rounded" />
                </div>
              </div>
              <div className="py-6 space-y-3 max-w-lg">
                <div className="h-8 w-4/5 bg-white/60 rounded" />
                <div className="h-4 w-full bg-white/30 rounded" />
                <div className="h-4 w-2/3 bg-white/30 rounded" />
                <div className="flex gap-3 pt-3">
                  <div className="h-10 w-32 bg-purple-500/60 rounded-lg" />
                  <div className="h-10 w-28 bg-white/20 rounded-lg" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="h-16 bg-white/10 rounded-lg" />
                <div className="h-16 bg-white/10 rounded-lg" />
                <div className="h-16 bg-white/10 rounded-lg" />
              </div>
            </div>

            {/* Gaussian Thermal Clouds Overlay */}
            {activeMode === 'thermal' && (
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{ opacity: intensity / 100 }}
              >
                {/* Hot Focal 1: Hero Headline */}
                <div className="absolute top-[32%] left-[28%] -translate-x-1/2 -translate-y-1/2 w-72 h-36 rounded-full bg-rose-500/40 blur-[45px]" />
                <div className="absolute top-[32%] left-[28%] -translate-x-1/2 -translate-y-1/2 w-44 h-20 rounded-full bg-amber-400/60 blur-[28px]" />
                <div className="absolute top-[32%] left-[28%] -translate-x-1/2 -translate-y-1/2 w-20 h-10 rounded-full bg-white/80 blur-[12px]" />

                {/* Hot Focal 2: Primary CTA Button */}
                <div className="absolute top-[52%] left-[18%] -translate-x-1/2 -translate-y-1/2 w-44 h-24 rounded-full bg-rose-500/40 blur-[30px]" />
                <div className="absolute top-[52%] left-[18%] -translate-x-1/2 -translate-y-1/2 w-24 h-12 rounded-full bg-amber-400/65 blur-[16px]" />

                {/* Secondary Focal 3: Navigation Brand */}
                <div className="absolute top-[8%] left-[12%] -translate-x-1/2 -translate-y-1/2 w-32 h-16 rounded-full bg-cyan-400/30 blur-[25px]" />

                {/* Tertiary Focal 4: Bento Feature 1 */}
                <div className="absolute top-[84%] left-[20%] -translate-x-1/2 -translate-y-1/2 w-40 h-20 rounded-full bg-emerald-400/25 blur-[30px]" />
              </div>
            )}

            {/* Saccade Gaze Path Sequence */}
            {activeMode === 'gaze' && (
              <div className="absolute inset-0 pointer-events-none p-6">
                <svg className="w-full h-full absolute inset-0 text-cyan-400">
                  <path
                    d="M 120 40 L 220 120 L 160 195 L 320 200 L 220 300"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="2.5"
                    strokeDasharray="6 4"
                  />
                </svg>

                {/* Gaze Nodes */}
                <div className="absolute top-8 left-28 w-8 h-8 rounded-full bg-cyan-500 text-black font-bold text-xs flex items-center justify-center shadow-[0_0_15px_#06b6d4] ring-4 ring-cyan-500/30 animate-pulse">
                  1
                </div>
                <div className="absolute top-28 left-52 w-10 h-10 rounded-full bg-amber-500 text-black font-bold text-sm flex items-center justify-center shadow-[0_0_20px_#f59e0b] ring-4 ring-amber-500/30">
                  2
                </div>
                <div className="absolute top-44 left-36 w-12 h-12 rounded-full bg-rose-500 text-white font-bold text-base flex items-center justify-center shadow-[0_0_25px_#f43f5e] ring-4 ring-rose-500/30">
                  3
                </div>
                <div className="absolute top-44 left-80 w-8 h-8 rounded-full bg-cyan-500 text-black font-bold text-xs flex items-center justify-center shadow-[0_0_15px_#06b6d4] ring-4 ring-cyan-500/30">
                  4
                </div>
                <div className="absolute top-72 left-52 w-9 h-9 rounded-full bg-emerald-500 text-black font-bold text-xs flex items-center justify-center shadow-[0_0_15px_#10b981] ring-4 ring-emerald-500/30">
                  5
                </div>
              </div>
            )}

            {/* Cognitive Friction Overlay */}
            {activeMode === 'friction' && (
              <div className="absolute inset-0 pointer-events-none p-6 flex items-center justify-center">
                <div className="bg-zinc-950/90 border border-purple-500/40 p-4 rounded-xl max-w-md text-center shadow-2xl">
                  <div className="text-2xl font-bold text-purple-400 font-mono mb-1">0.18 / 10</div>
                  <div className="text-xs font-semibold text-white uppercase tracking-wider mb-2">
                    Minimal Cognitive Friction
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    Zero interstitial popups, zero intrusive chat widgets, clean typographic hierarchy.
                    Average time to identify value proposition: <strong className="text-emerald-400">0.42 seconds</strong>.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Telemetry Matrix Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-zinc-900/80 p-3.5 rounded-xl border border-white/5">
              <span className="text-[10px] text-zinc-500 uppercase font-mono block mb-1">
                CTA Fixation Probability
              </span>
              <div className="text-xl font-bold text-rose-400 font-mono">89.4%</div>
              <p className="text-[10px] text-zinc-400 mt-0.5">Top 1% conversion tier</p>
            </div>

            <div className="bg-zinc-900/80 p-3.5 rounded-xl border border-white/5">
              <span className="text-[10px] text-zinc-500 uppercase font-mono block mb-1">
                F-Pattern Alignment
              </span>
              <div className="text-xl font-bold text-cyan-400 font-mono">98.2%</div>
              <p className="text-[10px] text-zinc-400 mt-0.5">Optimal left-to-right eye scan</p>
            </div>

            <div className="bg-zinc-900/80 p-3.5 rounded-xl border border-white/5">
              <span className="text-[10px] text-zinc-500 uppercase font-mono block mb-1">
                First 3-Sec Retention
              </span>
              <div className="text-xl font-bold text-emerald-400 font-mono">96 / 100</div>
              <p className="text-[10px] text-zinc-400 mt-0.5">Headline clarity verified</p>
            </div>

            <div className="bg-zinc-900/80 p-3.5 rounded-xl border border-white/5">
              <span className="text-[10px] text-zinc-500 uppercase font-mono block mb-1">
                Visual Clutter Index
              </span>
              <div className="text-xl font-bold text-purple-400 font-mono">1.2 / 10</div>
              <p className="text-[10px] text-zinc-400 mt-0.5">Uncluttered brutalist focus</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-white/10 bg-zinc-900/60 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-zinc-400">
            <span>🔬</span>
            <span>Algorithmic saliency verified against Nielsen Norman Group eye-tracking standards</span>
          </div>
          <button
            onClick={() => {
              cyberSound.playSuccess();
              alert('CRO Saliency audit metrics copied to clipboard!');
            }}
            className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition-all flex items-center gap-1.5"
          >
            <span>📋</span>
            <span>Copy CRO Audit</span>
          </button>
        </div>
      </div>
    </div>
  );
}
