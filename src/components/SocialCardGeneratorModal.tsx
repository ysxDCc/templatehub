'use client';

import { useState, useRef, useEffect } from 'react';
import { cyberSound } from '@/lib/sound';

interface SocialCardGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  templateName: string;
  storeName: string;
  tagline: string;
  category: string;
  primaryColor?: string;
}

export default function SocialCardGeneratorModal({
  isOpen,
  onClose,
  templateName,
  storeName,
  tagline,
  category,
  primaryColor = '#a855f7',
}: SocialCardGeneratorModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [headlineText, setHeadlineText] = useState(storeName || templateName);
  const [subText, setSubText] = useState(tagline || 'Modern High-Conversion Web Architecture');
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    drawCanvas();
  }, [isOpen, headlineText, subText, primaryColor, category]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 1200;
    const height = 630;

    // 1. Background Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, '#070314');
    bgGrad.addColorStop(0.5, '#0e0624');
    bgGrad.addColorStop(1, '#05020f');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Subtle Grid Lines
    ctx.strokeStyle = 'rgba(168, 85, 247, 0.08)';
    ctx.lineWidth = 1;
    const gridSize = 40;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // 3. Glowing Ambient Orbs
    const orbGrad = ctx.createRadialGradient(width - 250, 150, 20, width - 250, 150, 380);
    orbGrad.addColorStop(0, primaryColor + '55');
    orbGrad.addColorStop(0.5, primaryColor + '20');
    orbGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = orbGrad;
    ctx.beginPath();
    ctx.arc(width - 250, 150, 380, 0, Math.PI * 2);
    ctx.fill();

    const orbGrad2 = ctx.createRadialGradient(200, height - 100, 10, 200, height - 100, 300);
    orbGrad2.addColorStop(0, '#e879f933');
    orbGrad2.addColorStop(1, 'transparent');
    ctx.fillStyle = orbGrad2;
    ctx.beginPath();
    ctx.arc(200, height - 100, 300, 0, Math.PI * 2);
    ctx.fill();

    // 4. Border Frame
    ctx.strokeStyle = 'rgba(168, 85, 247, 0.28)';
    ctx.lineWidth = 3;
    ctx.strokeRect(30, 30, width - 60, height - 60);

    // Corner Accents
    ctx.strokeStyle = primaryColor;
    ctx.lineWidth = 5;
    const corner = 30;
    // Top-left
    ctx.beginPath();
    ctx.moveTo(30, 30 + corner);
    ctx.lineTo(30, 30);
    ctx.lineTo(30 + corner, 30);
    ctx.stroke();
    // Top-right
    ctx.beginPath();
    ctx.moveTo(width - 30 - corner, 30);
    ctx.lineTo(width - 30, 30);
    ctx.lineTo(width - 30, 30 + corner);
    ctx.stroke();
    // Bottom-left
    ctx.beginPath();
    ctx.moveTo(30, height - 30 - corner);
    ctx.lineTo(30, height - 30);
    ctx.lineTo(30 + corner, height - 30);
    ctx.stroke();
    // Bottom-right
    ctx.beginPath();
    ctx.moveTo(width - 30 - corner, height - 30);
    ctx.lineTo(width - 30, height - 30);
    ctx.lineTo(width - 30, height - 30 - corner);
    ctx.stroke();

    // 5. Header Brand Tag
    ctx.font = 'bold 15px "JetBrains Mono", monospace';
    ctx.fillStyle = '#cbd5e1';
    ctx.fillText('✦ TEMPLATEHUB SOVEREIGN MASTERPIECE', 80, 100);

    ctx.fillStyle = primaryColor;
    ctx.font = 'bold 14px "JetBrains Mono", monospace';
    ctx.fillText(`CATEGORY // ${category.toUpperCase()}`, width - 380, 100);

    // 6. Main Headline
    ctx.font = '900 64px "Inter", sans-serif';
    ctx.fillStyle = '#ffffff';
    // Wrap headline if too long
    const words = headlineText.split(' ');
    let line = '';
    let y = 230;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > 900 && n > 0) {
        ctx.fillText(line.trim(), 80, y);
        line = words[n] + ' ';
        y += 75;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line.trim(), 80, y);

    // 7. Subtitle / Tagline
    ctx.font = '500 24px "Inter", sans-serif';
    ctx.fillStyle = '#cbd5e1';
    ctx.fillText(subText.slice(0, 95), 80, y + 65);

    // 8. Footer Telemetry & Badges
    const footerY = 530;
    ctx.fillStyle = '#140838';
    ctx.strokeStyle = 'rgba(168, 85, 247, 0.4)';
    ctx.lineWidth = 1.5;

    // Badge 1: 100/100 Lighthouse
    roundRect(ctx, 80, footerY, 210, 42, 10);
    ctx.fill();
    ctx.stroke();
    ctx.font = 'bold 14px "JetBrains Mono", monospace';
    ctx.fillStyle = '#34d399';
    ctx.fillText('⚡ 100/100 LIGHTHOUSE', 98, footerY + 26);

    // Badge 2: Zero Dependencies
    roundRect(ctx, 310, footerY, 230, 42, 10);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#e879f9';
    ctx.fillText('🛡️ ZERO DEPENDENCIES', 328, footerY + 26);

    // Badge 3: Commercial License
    roundRect(ctx, 560, footerY, 230, 42, 10);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#60a5fa';
    ctx.fillText('⚖️ COMMERCIAL LICENSE', 578, footerY + 26);

    // Domain watermark
    ctx.font = 'bold 16px "JetBrains Mono", monospace';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.fillText('templatehub.website', width - 280, footerY + 26);
  };

  const handleDownloadPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    cyberSound.playSuccess();
    setDownloading(true);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${headlineText.toLowerCase().replace(/[^a-z0-9]/g, '-')}-social-og.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      setDownloading(false);
    }, 'image/png');
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md transition-all animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl rounded-3xl bg-[#0d0622] border border-purple-500/35 p-6 shadow-[0_0_70px_rgba(168,85,247,0.35)] relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-purple-500/25 mb-5">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">📸</span>
            <div>
              <h3 className="text-base font-bold text-white">
                Social Card &amp; OpenGraph Generator (1200×630)
              </h3>
              <p className="text-xs text-purple-300/70">
                Generate high-res Twitter, LinkedIn, and ProductHunt cards directly from your canvas
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

        {/* Live Canvas Preview (scaled down to fit UI) */}
        <div className="bg-[#070314] rounded-2xl border border-purple-500/30 p-2 sm:p-4 mb-5 overflow-hidden flex items-center justify-center shadow-inner">
          <canvas
            ref={canvasRef}
            width={1200}
            height={630}
            className="w-full h-auto max-h-[340px] rounded-xl object-contain border border-purple-500/20 shadow-2xl"
          />
        </div>

        {/* Form Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          <div>
            <label className="block text-[11px] font-mono text-purple-300 mb-1">
              Headline
            </label>
            <input
              type="text"
              value={headlineText}
              onChange={(e) => setHeadlineText(e.target.value)}
              className="w-full bg-[#070314] border border-purple-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono text-purple-300 mb-1">
              Tagline / Subtitle
            </label>
            <input
              type="text"
              value={subText}
              onChange={(e) => setSubText(e.target.value)}
              className="w-full bg-[#070314] border border-purple-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-purple-500/25 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] text-purple-400 font-mono">
            Full 1200×630px lossless PNG export
          </span>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs text-purple-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleDownloadPng}
              disabled={downloading}
              className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-bold text-xs shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <span>📸</span>
              <span>{downloading ? 'Rendering PNG…' : 'Download 1200×630 PNG'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}
