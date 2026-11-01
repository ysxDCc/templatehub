'use client';

import { useState, useRef, useEffect } from 'react';

interface InteractivePreviewFrameProps {
  templateId: string;
  templateName: string;
  livePreviewUrl: string;
}

type ViewMode = 'preview' | 'code';
type ViewportMode = 'desktop' | 'laptop' | 'tablet' | 'mobile';

export default function InteractivePreviewFrame({
  templateId,
  templateName,
  livePreviewUrl,
}: InteractivePreviewFrameProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('preview');
  const [viewport, setViewport] = useState<ViewportMode>('desktop');
  const [primaryColor, setPrimaryColor] = useState('#6366f1');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [rawCode, setRawCode] = useState<string>('');
  const [codeLoading, setCodeLoading] = useState(false);
  const [codeSearch, setCodeSearch] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
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

  // Fetch HTML source code when switching to code inspector
  useEffect(() => {
    if (viewMode === 'code' && !rawCode && livePreviewUrl) {
      setCodeLoading(true);
      fetch(livePreviewUrl)
        .then((res) => res.text())
        .then((text) => {
          setRawCode(text);
          setCodeLoading(false);
        })
        .catch(() => {
          setRawCode('<!-- Failed to load template source code -->');
          setCodeLoading(false);
        });
    }
  }, [viewMode, rawCode, livePreviewUrl]);

  const handleColorChange = (newColor: string) => {
    setPrimaryColor(newColor);
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

  const handleCopyCode = () => {
    if (!rawCode) return;
    navigator.clipboard.writeText(rawCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const codeLines = rawCode ? rawCode.split('\n') : [];
  const filteredLines = codeSearch
    ? codeLines.map((line, idx) => ({ line, idx, match: line.toLowerCase().includes(codeSearch.toLowerCase()) }))
    : codeLines.map((line, idx) => ({ line, idx, match: false }));

  return (
    <div className="border border-white/10 rounded-2xl overflow-hidden bg-zinc-950 shadow-2xl transition-all">
      {/* Primary Tab Switcher Bar */}
      <div className="bg-zinc-950 px-4 py-2 border-b border-white/[0.08] flex items-center justify-between gap-4">
        <div className="flex items-center gap-1 bg-zinc-900/80 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setViewMode('preview')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              viewMode === 'preview'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <span>👁️</span>
            <span>Interactive Viewport</span>
          </button>
          <button
            onClick={() => setViewMode('code')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              viewMode === 'code'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <span>⟨/⟩</span>
            <span>Live Source Inspector</span>
            {rawCode && (
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/20 text-white font-mono">
                {codeLines.length} L
              </span>
            )}
          </button>
        </div>

        {viewMode === 'code' && rawCode && (
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-[11px] font-mono text-zinc-400">
              {(rawCode.length / 1024).toFixed(1)} KB · Zero External JS
            </span>
            <button
              onClick={handleCopyCode}
              className="px-3 py-1 text-xs font-semibold rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all flex items-center gap-1.5"
            >
              <span>{copiedCode ? '✓' : '📋'}</span>
              <span>{copiedCode ? 'Copied Code!' : 'Copy Entire HTML'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Subheader Toolbar depending on mode */}
      {viewMode === 'preview' ? (
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
      ) : (
        /* Source Code Inspector Sub-bar */
        <div className="bg-zinc-900/90 backdrop-blur-md px-4 py-2.5 border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1 max-w-sm">
            <span className="text-zinc-500 text-xs">🔍</span>
            <input
              type="text"
              value={codeSearch}
              onChange={(e) => setCodeSearch(e.target.value)}
              placeholder="Filter code by tag, class, or text..."
              className="bg-zinc-950 border border-white/10 rounded-md px-2.5 py-1 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 w-full"
            />
            {codeSearch && (
              <button
                onClick={() => setCodeSearch('')}
                className="text-[10px] text-zinc-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 text-xs">
            <button
              onClick={handleCopyCode}
              className="px-2.5 py-1 text-xs font-semibold rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-white/10 flex items-center gap-1"
            >
              <span>{copiedCode ? '✓ Copied' : 'Copy All'}</span>
            </button>
            <a
              href={livePreviewUrl}
              download={`${templateId}.html`}
              className="px-2.5 py-1 text-xs font-semibold rounded-md bg-white hover:bg-zinc-200 text-zinc-950 flex items-center gap-1"
            >
              <span>Download HTML</span>
            </a>
          </div>
        </div>
      )}

      {/* Optional Theme Tokens Drawer in Preview Mode */}
      {viewMode === 'preview' && isDrawerOpen && (
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

      {/* Main Content Area: Viewport or Code Inspector */}
      {viewMode === 'preview' ? (
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
      ) : (
        /* Source Code Inspector Terminal */
        <div className="bg-zinc-950 min-h-[580px] max-h-[580px] overflow-auto font-mono text-xs p-4 border-t border-white/[0.04]">
          {codeLoading ? (
            <div className="flex flex-col items-center justify-center h-[520px] text-zinc-500 gap-3">
              <svg className="w-6 h-6 animate-spin text-indigo-400" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              <span>Loading source code for {templateName}…</span>
            </div>
          ) : (
            <div className="table w-full">
              {filteredLines.map(({ line, idx, match }) => (
                <div
                  key={idx}
                  className={`table-row leading-5 hover:bg-white/[0.04] ${
                    match ? 'bg-indigo-500/15' : ''
                  }`}
                >
                  <span className="table-cell pr-4 text-right select-none text-zinc-600 border-r border-white/10 pr-3 w-12">
                    {idx + 1}
                  </span>
                  <span className="table-cell pl-4 text-zinc-300 whitespace-pre">
                    {formatSyntax(line)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/** Basic syntax coloring for HTML lines */
function formatSyntax(line: string) {
  if (line.trim().startsWith('<!--')) {
    return <span className="text-zinc-500 italic">{line}</span>;
  }
  if (line.trim().startsWith('<style') || line.trim().startsWith('</style>')) {
    return <span className="text-pink-400 font-semibold">{line}</span>;
  }
  if (line.trim().startsWith('<script') || line.trim().startsWith('</script>')) {
    return <span className="text-amber-400 font-semibold">{line}</span>;
  }
  if (line.includes('<') && line.includes('>')) {
    return <span className="text-sky-300">{line}</span>;
  }
  return <span className="text-zinc-300">{line}</span>;
}
