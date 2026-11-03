'use client';

import { useState } from 'react';
import { Template } from '@/types';
import { cyberSound } from '@/lib/sound';

interface CssTokensModalProps {
  template: Template;
  isOpen: boolean;
  onClose: () => void;
}

export default function CssTokensModal({
  template,
  isOpen,
  onClose,
}: CssTokensModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Derive tokens based on template metadata & tier
  const tokens = {
    '--color-primary': '#a855f7',
    '--color-primary-glow': 'rgba(168, 85, 247, 0.4)',
    '--color-accent': '#e879f9',
    '--color-bg-base': '#070314',
    '--color-surface-card': '#0d0622',
    '--color-border-glass': 'rgba(168, 85, 247, 0.25)',
    '--color-text-main': '#ffffff',
    '--color-text-muted': '#cbd5e1',
    '--font-family-display': "'Inter', system-ui, -apple-system, sans-serif",
    '--font-family-mono': "'JetBrains Mono', 'Fira Code', monospace",
    '--radius-card': '1.25rem',
    '--radius-button': '0.75rem',
    '--shadow-cyber': '0 0 35px rgba(168, 85, 247, 0.35)',
  };

  const cssString = `:root {\n${Object.entries(tokens)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join('\n')}\n}`;

  const handleCopy = () => {
    cyberSound.playSuccess();
    navigator.clipboard.writeText(cssString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-3xl bg-[#0d0622] border border-purple-500/35 p-6 shadow-[0_0_60px_rgba(168,85,247,0.35)] relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow */}
        <div className="absolute top-0 right-1/4 w-48 h-20 bg-purple-500/20 blur-[50px] pointer-events-none" />

        <div className="flex items-center justify-between pb-4 border-b border-purple-500/25 mb-5">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🎨</span>
            <div>
              <h3 className="text-base font-bold text-white">
                Design Tokens &amp; CSS Variables
              </h3>
              <p className="text-xs text-purple-300/70">
                Sovereign :root token architecture for {template.name}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              cyberSound.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-[#070314] border border-purple-500/30 text-purple-300 hover:text-white flex items-center justify-center text-xs transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Visual Swatches */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
          <div className="p-2.5 rounded-xl bg-[#070314] border border-purple-500/20">
            <div className="w-full h-8 rounded-lg bg-[#a855f7] mb-1.5 shadow-[0_0_12px_rgba(168,85,247,0.5)]" />
            <div className="text-[10px] text-purple-300 font-mono">Primary</div>
            <div className="text-[11px] font-bold text-white font-mono">#a855f7</div>
          </div>
          <div className="p-2.5 rounded-xl bg-[#070314] border border-purple-500/20">
            <div className="w-full h-8 rounded-lg bg-[#e879f9] mb-1.5 shadow-[0_0_12px_rgba(232,121,249,0.5)]" />
            <div className="text-[10px] text-purple-300 font-mono">Accent</div>
            <div className="text-[11px] font-bold text-white font-mono">#e879f9</div>
          </div>
          <div className="p-2.5 rounded-xl bg-[#070314] border border-purple-500/20">
            <div className="w-full h-8 rounded-lg bg-[#070314] border border-purple-500/40 mb-1.5" />
            <div className="text-[10px] text-purple-300 font-mono">Base BG</div>
            <div className="text-[11px] font-bold text-white font-mono">#070314</div>
          </div>
          <div className="p-2.5 rounded-xl bg-[#070314] border border-purple-500/20">
            <div className="w-full h-8 rounded-lg bg-[#0d0622] border border-purple-500/40 mb-1.5" />
            <div className="text-[10px] text-purple-300 font-mono">Surface</div>
            <div className="text-[11px] font-bold text-white font-mono">#0d0622</div>
          </div>
        </div>

        {/* Code Block with Copy Action */}
        <div className="relative mb-5">
          <div className="bg-[#070314] rounded-2xl border border-purple-500/30 p-4 font-mono text-xs text-purple-200/90 max-h-56 overflow-auto">
            <pre className="text-[11px] leading-5">{cssString}</pre>
          </div>

          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all flex items-center gap-1.5 active:scale-95"
          >
            <span>{copied ? '✓' : '📋'}</span>
            <span>{copied ? 'Copied Tokens!' : 'Copy :root'}</span>
          </button>
        </div>

        {/* Deploy Quick Links */}
        <div className="pt-4 border-t border-purple-500/25 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] text-purple-400 font-mono">
            Zero external build dependencies
          </span>
          <div className="flex items-center gap-2">
            <a
              href="https://vercel.com/new"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => cyberSound.playClick()}
              className="px-3 py-1.5 bg-black hover:bg-zinc-900 border border-white/20 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <span>▲</span>
              <span>Deploy on Vercel</span>
            </a>
            <a
              href="https://app.netlify.com/drop"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => cyberSound.playClick()}
              className="px-3 py-1.5 bg-[#00ad9f]/20 hover:bg-[#00ad9f]/30 border border-[#00ad9f]/40 text-[#2eeadc] rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <span>◆</span>
              <span>Netlify Drop</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
