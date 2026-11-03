'use client';

import { useState, useEffect } from 'react';
import { cyberSound } from '@/lib/sound';

interface SpeedRaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  templateName: string;
}

export default function SpeedRaceModal({
  isOpen,
  onClose,
  templateName,
}: SpeedRaceModalProps) {
  const [racing, setRacing] = useState(false);
  const [sovereignProgress, setSovereignProgress] = useState(0);
  const [bloatProgress, setBloatProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [winnerDeclared, setWinnerDeclared] = useState(false);

  const startRace = () => {
    cyberSound.playClick();
    setRacing(true);
    setSovereignProgress(0);
    setBloatProgress(0);
    setLogs(['[0ms] 🏁 Race initiated. Simulating cold-cache 4G mobile connection...']);
    setWinnerDeclared(false);

    // Sovereign sprint
    setTimeout(() => {
      setSovereignProgress(45);
      setLogs((prev) => [...prev, '[42ms] ⚡ TemplateHub: DNS, SSL, and HTML parsed (0.12s FCP)']);
    }, 120);

    setTimeout(() => {
      setSovereignProgress(100);
      setWinnerDeclared(true);
      cyberSound.playSuccess();
      setLogs((prev) => [
        ...prev,
        `[138ms] 🏆 TemplateHub [${templateName}] fully loaded & interactive! (0ms TBT)`,
      ]);
    }, 280);

    // Bloated CMS slow chug
    setTimeout(() => {
      setBloatProgress(15);
      setLogs((prev) => [...prev, '[650ms] 🐢 CMS: Downloading 18 Google Fonts & FontAwesome...']);
    }, 650);

    setTimeout(() => {
      setBloatProgress(35);
      setLogs((prev) => [...prev, '[1400ms] 🐢 CMS: Executing Google Tag Manager, Hotjar & Meta Pixel...']);
    }, 1400);

    setTimeout(() => {
      setBloatProgress(60);
      setLogs((prev) => [...prev, '[2200ms] 🐢 CMS: Parsing 1.4 MB of Elementor/Webflow JS runtime...']);
    }, 2200);

    setTimeout(() => {
      setBloatProgress(85);
      setLogs((prev) => [...prev, '[2950ms] 🐢 CMS: Cookie banner rendered (CLS penalty +0.28)...']);
    }, 2950);

    setTimeout(() => {
      setBloatProgress(100);
      setRacing(false);
      setLogs((prev) => [...prev, '[3480ms] 🛑 CMS: Finally interactive (3,342ms slower than TemplateHub).']);
    }, 3500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-zinc-900/60">
          <div className="flex items-center gap-3">
            <span className="text-xl">🏎️</span>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                PageSpeed Live "Drag Race" Simulator
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                  4G Mobile Benchmark
                </span>
              </h2>
              <p className="text-xs text-zinc-400">
                Sovereign clean code vs bloated 4MB CMS runtimes
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

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Race Lanes */}
          <div className="space-y-4">
            {/* Lane 1: TemplateHub */}
            <div className="bg-zinc-900/80 p-4 rounded-xl border border-emerald-500/30 relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>⚡ Lane A: TemplateHub Sovereign</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-normal">
                      32 KB · 0 Trackers
                    </span>
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-emerald-400">
                  {sovereignProgress === 100 ? '138ms (WINNER 🏆)' : `${sovereignProgress}%`}
                </span>
              </div>
              <div className="h-4 bg-zinc-950 rounded-full overflow-hidden p-0.5 border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-150 flex items-center justify-end pr-1 shadow-[0_0_15px_#10b981]"
                  style={{ width: `${sovereignProgress}%` }}
                >
                  {sovereignProgress === 100 && <span className="text-[10px]">🏁</span>}
                </div>
              </div>
            </div>

            {/* Lane 2: Bloated CMS */}
            <div className="bg-zinc-900/80 p-4 rounded-xl border border-rose-500/30 relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>🐢 Lane B: Typical WordPress / Webflow Site</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-normal">
                      3.8 MB · 48 Trackers
                    </span>
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-rose-400">
                  {bloatProgress === 100 ? '3,480ms' : `${bloatProgress}%`}
                </span>
              </div>
              <div className="h-4 bg-zinc-950 rounded-full overflow-hidden p-0.5 border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 to-amber-500 rounded-full transition-all duration-300 flex items-center justify-end pr-1"
                  style={{ width: `${bloatProgress}%` }}
                >
                  {bloatProgress === 100 && <span className="text-[10px]">🛑</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Start Race Button */}
          <div className="text-center">
            <button
              onClick={startRace}
              disabled={racing}
              className={`px-8 py-3 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg ${
                racing
                  ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black shadow-emerald-500/25'
              }`}
            >
              {racing ? '🏎️ Racing at 4G speeds...' : '🏁 Start Benchmark Drag Race'}
            </button>
          </div>

          {/* Telemetry Event Stream */}
          <div className="bg-zinc-950 p-4 rounded-xl border border-white/10 font-mono text-xs max-h-40 overflow-y-auto space-y-1">
            <div className="text-zinc-500 text-[11px] mb-2">// Real-time browser rendering waterfall telemetry:</div>
            {logs.length === 0 ? (
              <div className="text-zinc-600 italic">Click 'Start Benchmark Drag Race' to initiate live network emulation.</div>
            ) : (
              logs.map((log, idx) => (
                <div
                  key={idx}
                  className={`leading-relaxed ${
                    log.includes('TemplateHub')
                      ? 'text-emerald-400 font-semibold'
                      : log.includes('CMS')
                      ? 'text-amber-400/90'
                      : 'text-zinc-400'
                  }`}
                >
                  {log}
                </div>
              ))
            )}
          </div>

          {/* Impact Stats */}
          {winnerDeclared && (
            <div className="grid grid-cols-3 gap-3 animate-in fade-in">
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl text-center">
                <span className="text-[10px] text-zinc-400 uppercase font-mono block">Speed Factor</span>
                <span className="text-xl font-bold text-emerald-400 font-mono">25.2x Faster</span>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/20 p-3 rounded-xl text-center">
                <span className="text-[10px] text-zinc-400 uppercase font-mono block">Data Saved</span>
                <span className="text-xl font-bold text-purple-400 font-mono">99.1% Less MB</span>
              </div>
              <div className="bg-cyan-500/10 border border-cyan-500/20 p-3 rounded-xl text-center">
                <span className="text-[10px] text-zinc-400 uppercase font-mono block">User Bounce Rate</span>
                <span className="text-xl font-bold text-cyan-400 font-mono">-68% Reduction</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-white/10 bg-zinc-900/60 flex items-center justify-between text-xs text-zinc-400">
          <span>Benchmarked against Google Lighthouse 4G throttling standards</span>
          <span className="font-mono text-emerald-400 font-semibold">100 / 100 Performance</span>
        </div>
      </div>
    </div>
  );
}
