'use client';

import { useState } from 'react';
import { cyberSound } from '@/lib/sound';

interface BrandPreset {
  name: string;
  badge: string;
  primary: string;
  description: string;
}

const BRAND_PRESETS: BrandPreset[] = [
  { name: 'Stripe', badge: 'Fintech Titan', primary: '#635bff', description: 'Electric violet with high-contrast institutional depth' },
  { name: 'Supabase', badge: 'Open-Source Dev', primary: '#3ecf8e', description: 'Emerald neon hacker aesthetic with deep charcoal canvas' },
  { name: 'Linear', badge: 'Apex SaaS Tooling', primary: '#5e6ad2', description: 'Desaturated zinc elegance with purple precision accents' },
  { name: 'Ferrari Corsa', badge: 'Hypercar Racing', primary: '#ef4444', description: 'Pure visceral racing scarlet on obsidian carbon fiber' },
  { name: 'Spotify', badge: 'Audio Streaming', primary: '#1ed760', description: 'High-energy acid neon green on midnight black' },
  { name: 'Palantir Slate', badge: 'Defense & Foundry', primary: '#0ea5e9', description: 'Aerospace telemetry cyan with stealth matte panels' },
  { name: 'Tokyo Synthwave', badge: 'Neo Cyberpunk', primary: '#f43f5e', description: 'Electric neon magenta and fluorescent nocturnal glow' },
  { name: 'Vercel Mono', badge: 'Pure Brutalism', primary: '#ffffff', description: 'Zero-color high-contrast monochrome typography' },
];

interface BrandClonerModalProps {
  isOpen: boolean;
  onClose: () => void;
  templateName: string;
  onApplyColor: (hex: string) => void;
}

export default function BrandClonerModal({
  isOpen,
  onClose,
  templateName,
  onApplyColor,
}: BrandClonerModalProps) {
  const [customHex, setCustomHex] = useState('#a855f7');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-zinc-900/60">
          <div className="flex items-center gap-3">
            <span className="text-xl">🧬</span>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                AI Brand & Palette Cloner
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase">
                  1-Click CSS Injection
                </span>
              </h2>
              <p className="text-xs text-zinc-400">
                Instantly map world-class brand identities onto {templateName}
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

        {/* Brand Presets Grid */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          <div>
            <label className="text-xs font-semibold text-zinc-300 mb-3 block uppercase tracking-wider">
              Iconic Tech & Luxury Presets:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BRAND_PRESETS.map((brand) => (
                <button
                  key={brand.name}
                  onClick={() => {
                    cyberSound.playClick();
                    onApplyColor(brand.primary);
                    onClose();
                  }}
                  className="p-3.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-850 border border-white/5 hover:border-white/20 transition-all text-left flex items-start gap-3 group"
                >
                  <div
                    className="w-8 h-8 rounded-lg shrink-0 border border-white/20 shadow-md group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: brand.primary }}
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
                        {brand.name}
                      </span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-zinc-400">
                        {brand.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-tight">
                      {brand.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Hex Bar */}
          <div className="bg-zinc-900/60 p-4 rounded-xl border border-white/10">
            <label className="text-xs font-semibold text-zinc-300 mb-2 block uppercase tracking-wider">
              Or Enter Any Custom Hex Value:
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={customHex}
                onChange={(e) => setCustomHex(e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
              />
              <input
                type="text"
                value={customHex}
                onChange={(e) => setCustomHex(e.target.value)}
                placeholder="#6366f1"
                className="bg-zinc-950 border border-white/10 rounded-lg px-3 py-2 text-white font-mono text-xs w-36 focus:outline-none focus:border-purple-500"
              />
              <button
                onClick={() => {
                  cyberSound.playClick();
                  onApplyColor(customHex);
                  onClose();
                }}
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs transition-all shadow-md ml-auto"
              >
                Apply Custom Palette
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-white/10 bg-zinc-900/60 flex items-center justify-between text-xs text-zinc-400">
          <span>Injected seamlessly into CSS variables and active store configuration</span>
          <span className="text-purple-400 font-mono text-[11px]">Real-Time Hot Reload</span>
        </div>
      </div>
    </div>
  );
}
