'use client';

import { useState, useRef } from 'react';

interface InteractivePreviewFrameProps {
  templateId: string;
  templateName: string;
  livePreviewUrl: string;
}

type ViewportMode = 'desktop' | 'laptop' | 'tablet' | 'mobile';

export default function InteractivePreviewFrame({
  templateId,
  templateName,
  livePreviewUrl,
}: InteractivePreviewFrameProps) {
  const [viewport, setViewport] = useState<ViewportMode>('desktop');
  const [primaryColor, setPrimaryColor] = useState('#6366f1');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const viewports: Record<ViewportMode, { label: string; icon: string; width: string }> = {
    desktop: { label: 'Desktop', icon: '🖥️', width: '100%' },
    laptop: { label: 'Laptop', icon: '💻', width: '1024px' },
    tablet: { label: 'Tablet', icon: '📱', width: '768px' },
    mobile: { label: 'Mobile', icon: '📲', width: '375px' },
  };

  const colorPresets = [
    { name: 'Indigo', color: '#6366f1' },
    { name: 'Cyan', color: '#06b6d4' },
    { name: 'Emerald', color: '#10b981' },
    { name: 'Rose', color: '#e11d48' },
    { name: 'Amber', color: '#f59e0b' },
    { name: 'Purple', color: '#a855f7' },
  ];

  const handleColorChange = (newColor: string) => {
    setPrimaryColor(newColor);
    // Attempt postMessage to iframe for dynamic live variable override
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        iframeRef.current.contentWindow.postMessage(
          { type: 'TEMPLATEHUB_THEME_OVERRIDE', primaryColor: newColor },
          '*'
        );
      } catch {
        // Fallback silent
      }
    }
  };

  return (
    <div className="border border-white/10 rounded-2xl overflow-hidden bg-zinc-950 shadow-2xl transition-all">
      {/* Interactive Browser Topbar */}
      <div className="bg-zinc-900/90 backdrop-blur-md px-4 py-3 border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
        {/* Left: Window Controls & Simulated URL */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
          </div>
          <span className="text-[11px] font-mono text-zinc-400 truncate max-w-xs bg-zinc-950 px-2.5 py-1 rounded-md border border-white/[0.06]">
            https://templatehub.website/sandbox/{templateId}
          </span>
        </div>

        {/* Center: Device Viewport Breakpoint Switcher */}
        <div className="flex items-center bg-zinc-950 border border-white/10 rounded-lg p-1 gap-1">
          {(Object.keys(viewports) as ViewportMode[]).map((mode) => {
            const vp = viewports[mode];
            const isActive = viewport === mode;
            return (
              <button
                key={mode}
                onClick={() => setViewport(mode)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-zinc-800 text-white shadow-xs'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                }`}
                title={`Switch to ${vp.label} view (${vp.width})`}
              >
                <span>{vp.icon}</span>
                <span className="hidden sm:inline">{vp.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Actions (Theme Customizer Toggle + Full Window) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md border transition-all flex items-center gap-1.5 ${
              isDrawerOpen
                ? 'bg-indigo-600 border-indigo-500 text-white'
                : 'bg-zinc-950 border-white/10 text-zinc-300 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <span>🎨</span>
            <span className="hidden md:inline">Tokens</span>
          </button>

          <a
            href={livePreviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-zinc-300 hover:text-white px-2.5 py-1 rounded-md bg-zinc-950 border border-white/10 hover:bg-zinc-800 flex items-center gap-1 font-medium transition-colors"
          >
            <span>Full Window</span>
            <span>↗</span>
          </a>
        </div>
      </div>

      {/* Optional Slide-down Theme Token Customizer Bar */}
      {isDrawerOpen && (
        <div className="bg-zinc-900/95 border-b border-white/[0.08] px-4 py-3 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-zinc-300">Live Brand Palette:</span>
            <div className="flex items-center gap-1.5">
              {colorPresets.map((p) => (
                <button
                  key={p.name}
                  onClick={() => handleColorChange(p.color)}
                  style={{ backgroundColor: p.color }}
                  className={`w-5 h-5 rounded-full transition-transform ${
                    primaryColor === p.color
                      ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-zinc-900'
                      : 'hover:scale-110 opacity-80'
                  }`}
                  title={p.name}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-zinc-400">
            <span>Current Token:</span>
            <code className="bg-zinc-950 px-2 py-0.5 rounded-md font-mono text-zinc-200 border border-white/10">
              --primary: {primaryColor}
            </code>
          </div>
        </div>
      )}

      {/* Responsive Viewport Container */}
      <div className="bg-zinc-950/80 p-2 sm:p-4 flex justify-center items-center overflow-x-auto min-h-[580px]">
        <div
          style={{ width: viewports[viewport].width }}
          className="h-[580px] bg-zinc-950 rounded-xl overflow-hidden border border-white/[0.08] shadow-2xl transition-all duration-300"
        >
          <iframe
            ref={iframeRef}
            src={livePreviewUrl}
            title={`${templateName} interactive preview`}
            className="w-full h-full border-0"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
