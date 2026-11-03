'use client';

import { useState } from 'react';
import { cyberSound } from '@/lib/sound';

interface BlueprintXRayOverlayProps {
  isActive: boolean;
  onToggle: () => void;
  templateName: string;
}

export default function BlueprintXRayOverlay({
  isActive,
  onToggle,
  templateName,
}: BlueprintXRayOverlayProps) {
  const [showTags, setShowTags] = useState(true);
  const [showBoxes, setShowBoxes] = useState(true);
  const [showGrid, setShowGrid] = useState(true);

  if (!isActive) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden flex flex-col justify-between">
      {/* Isometric/Blueprint Grid Background */}
      {showGrid && (
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, #06b6d4 1px, transparent 1px),
              linear-gradient(to bottom, #06b6d4 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      )}

      {/* Top Floating Engineering Telemetry HUD */}
      <div className="p-3 sm:p-4 flex items-center justify-between w-full pointer-events-auto z-40">
        <div className="bg-[#050914]/95 backdrop-blur-md px-3 sm:px-4 py-2 rounded-xl border border-cyan-500/40 text-xs shadow-[0_0_30px_rgba(6,182,212,0.3)] flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#06b6d4]" />
            <span className="font-mono text-cyan-300 font-bold tracking-wider uppercase text-[11px]">
              Blueprint X-Ray Active
            </span>
          </div>
          <span className="text-zinc-600 hidden sm:inline">|</span>
          <div className="hidden sm:flex items-center gap-3 font-mono text-[11px] text-zinc-300">
            <span>DOM: <strong className="text-cyan-400">142 nodes</strong></span>
            <span>Flex: <strong className="text-cyan-400">22</strong></span>
            <span>Grid: <strong className="text-cyan-400">4</strong></span>
            <span>CLS: <strong className="text-emerald-400">0.000</strong></span>
          </div>
        </div>

        {/* Control Toggles */}
        <div className="bg-[#050914]/95 backdrop-blur-md p-1.5 rounded-xl border border-cyan-500/30 text-xs flex items-center gap-1.5 shadow-lg">
          <button
            onClick={() => {
              cyberSound.playClick();
              setShowTags(!showTags);
            }}
            className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition-all ${
              showTags ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Tags: {showTags ? 'ON' : 'OFF'}
          </button>
          <button
            onClick={() => {
              cyberSound.playClick();
              setShowBoxes(!showBoxes);
            }}
            className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition-all ${
              showBoxes ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Wireframes: {showBoxes ? 'ON' : 'OFF'}
          </button>
          <button
            onClick={() => {
              cyberSound.playClick();
              setShowGrid(!showGrid);
            }}
            className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition-all ${
              showGrid ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Grid: {showGrid ? 'ON' : 'OFF'}
          </button>
          <button
            onClick={() => {
              cyberSound.playClick();
              onToggle();
            }}
            className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-mono text-[11px] transition-all ml-1"
          >
            ✕ Exit
          </button>
        </div>
      </div>

      {/* Semantic Layout Wireframe Overlays */}
      {showBoxes && (
        <div className="relative w-full h-full px-6 py-2 flex flex-col justify-between pointer-events-none">
          {/* Header Region */}
          <div className="w-full h-12 rounded-lg border border-dashed border-cyan-500/40 bg-cyan-500/[0.03] p-2 flex items-center justify-between mb-4 relative">
            {showTags && (
              <span className="font-mono text-[10px] text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                &lt;header className="sticky top-0 z-50 flex items-center"&gt;
              </span>
            )}
            <span className="font-mono text-[9px] text-zinc-500">h-12 w-full</span>
          </div>

          {/* Hero Section */}
          <div className="w-full h-48 rounded-lg border border-dashed border-cyan-500/50 bg-cyan-500/[0.04] p-3 flex flex-col justify-between mb-4 relative shadow-[inset_0_0_20px_rgba(6,182,212,0.05)]">
            <div className="flex items-center justify-between">
              {showTags && (
                <span className="font-mono text-[10px] text-cyan-300 bg-cyan-950/90 px-2 py-0.5 rounded border border-cyan-500/40 font-semibold">
                  &lt;section className="hero max-w-7xl mx-auto flex-col"&gt;
                </span>
              )}
              <span className="font-mono text-[9px] text-cyan-400/80">CSS Grid / Flex-1</span>
            </div>
            <div className="grid grid-cols-2 gap-3 h-24">
              <div className="border border-dashed border-cyan-500/30 rounded p-1.5 flex items-start">
                {showTags && (
                  <span className="font-mono text-[9px] text-cyan-400/80">&lt;div className="headline space-y-4"&gt;</span>
                )}
              </div>
              <div className="border border-dashed border-cyan-500/30 rounded p-1.5 flex items-start">
                {showTags && (
                  <span className="font-mono text-[9px] text-cyan-400/80">&lt;div className="hero-graphic canvas/webgl"&gt;</span>
                )}
              </div>
            </div>
            {showTags && (
              <span className="font-mono text-[9px] text-cyan-400/70">&lt;div className="cta-cluster flex gap-3"&gt;</span>
            )}
          </div>

          {/* Bento Section */}
          <div className="w-full h-36 rounded-lg border border-dashed border-cyan-500/40 bg-cyan-500/[0.03] p-2 flex flex-col justify-between relative">
            <div className="flex items-center justify-between">
              {showTags && (
                <span className="font-mono text-[10px] text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                  &lt;section className="bento-grid grid grid-cols-3 gap-4"&gt;
                </span>
              )}
              <span className="font-mono text-[9px] text-zinc-500">3-col responsive layout</span>
            </div>
            <div className="grid grid-cols-3 gap-3 h-20">
              <div className="border border-dashed border-cyan-500/30 rounded p-1 text-[8px] font-mono text-cyan-400/70">
                col-span-1
              </div>
              <div className="border border-dashed border-cyan-500/30 rounded p-1 text-[8px] font-mono text-cyan-400/70">
                col-span-1
              </div>
              <div className="border border-dashed border-cyan-500/30 rounded p-1 text-[8px] font-mono text-cyan-400/70">
                col-span-1
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Architectural Legend Bar */}
      <div className="p-3 bg-[#050914]/95 border-t border-cyan-500/30 flex items-center justify-between text-[11px] font-mono text-zinc-400 z-40 pointer-events-auto">
        <div className="flex items-center gap-4">
          <span className="text-cyan-300 font-semibold">{templateName}</span>
          <span>·</span>
          <span>Zero Runtime CSS (Compiled Tailwind)</span>
          <span>·</span>
          <span>GPU Render Layer: <span className="text-emerald-400">transform: translateZ(0)</span></span>
        </div>
        <div className="text-[10px] text-zinc-500 hidden md:block">
          Click any element in code tab to copy isolated JSX/HTML
        </div>
      </div>
    </div>
  );
}
