'use client';

import { useState, useRef } from 'react';

type GenerationState = 'idle' | 'loading' | 'success' | 'error' | 'no-key';

export default function AIGeneratorPage() {
  const [prompt, setPrompt] = useState('');
  const [state, setState] = useState<GenerationState>('idle');
  const [progress, setProgress] = useState(0);
  const [generatedHtml, setGeneratedHtml] = useState('');
  const [copied, setCopied] = useState(false);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startProgress = () => {
    setProgress(0);
    progressRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 85) {
          clearInterval(progressRef.current!);
          return prev;
        }
        return prev + Math.random() * 8;
      });
    }, 400);
  };

  const finishProgress = () => {
    if (progressRef.current) clearInterval(progressRef.current);
    setProgress(100);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setState('loading');
    startProgress();

    try {
      const res = await fetch('/api/ai-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      finishProgress();

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (res.status === 401 || data?.error === 'no-key') {
          setState('no-key');
        } else {
          setState('error');
        }
        return;
      }

      const data = await res.json();
      setGeneratedHtml(data.html ?? '');
      setState('success');
    } catch {
      finishProgress();
      setState('no-key');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([generatedHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-template.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const examplePrompts = [
    'Dark SaaS landing page for a project management tool with pricing table and testimonials',
    'Luxury real estate portfolio with property listings and mortgage calculator',
    'Neon gaming esports team site with roster and tournament results',
    'Clean meditation & wellness app landing page with soft pastels',
  ];

  return (
    <div className="min-h-screen bg-[#070314] text-purple-100">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-purple-500/20 bg-gradient-to-b from-[#0e0624] to-[#070314]">
        {/* Glow blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-purple-600/15 blur-[140px]" />
          <div className="absolute top-0 left-1/4 w-[350px] h-[250px] rounded-full bg-fuchsia-600/10 blur-[120px]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/35 bg-purple-500/10 text-purple-300 text-xs font-semibold mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.25)]">
            <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 animate-pulse" />
            <span>Powered by Gemini 2.5 Flash</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-4">
            AI Template{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-fuchsia-200 to-violet-300 drop-shadow-[0_0_35px_rgba(168,85,247,0.5)]">
              Generator
            </span>
          </h1>
          <p className="text-purple-200/75 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Describe your dream website, get production-ready HTML in seconds.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Prompt area */}
        <div className="bg-[#0d0622]/90 border border-purple-500/25 rounded-2xl p-6 mb-6 backdrop-blur-xl shadow-2xl">
          <label className="block text-sm font-bold text-white mb-3">
            Describe your website
          </label>
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="e.g. 'Dark SaaS landing page for a project management tool with pricing table and testimonials'"
            rows={4}
            disabled={state === 'loading'}
            className="w-full bg-[#070314] border border-purple-500/30 rounded-xl px-4 py-3 text-sm text-white placeholder-purple-300/40 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all resize-none disabled:opacity-50"
          />

          {/* Example prompts */}
          <div className="mt-3 flex flex-wrap gap-2">
            {examplePrompts.map((ex, i) => (
              <button
                key={i}
                onClick={() => setPrompt(ex)}
                disabled={state === 'loading'}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-[#070314] hover:bg-[#1a0b3b] text-purple-300 hover:text-white border border-purple-500/25 transition-colors disabled:opacity-40 text-left font-mono"
              >
                {ex.length > 50 ? ex.slice(0, 50) + '…' : ex}
              </button>
            ))}
          </div>

          <div className="mt-5 flex justify-end">
            <button
              onClick={handleGenerate}
              disabled={state === 'loading' || !prompt.trim()}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 hover:from-purple-500 hover:via-violet-500 hover:to-fuchsia-500 text-white text-xs font-bold rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {state === 'loading' ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  <span>Generating…</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Generate Template</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Loading state */}
        {state === 'loading' && (
          <div className="bg-[#0d0622]/90 border border-purple-500/25 rounded-2xl p-8 mb-6 text-center backdrop-blur-xl shadow-2xl">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:-0.3s]" />
              <div className="w-2 h-2 rounded-full bg-fuchsia-400 animate-bounce [animation-delay:-0.15s]" />
              <div className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" />
            </div>
            <p className="text-sm font-bold text-white mb-2">Generating your template…</p>
            <p className="text-xs text-purple-300/70 mb-6">Gemini is crafting production-ready HTML with embedded CSS</p>

            {/* Progress bar */}
            <div className="w-full max-w-sm mx-auto bg-[#070314] rounded-full h-2 overflow-hidden border border-purple-500/20">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <p className="text-[11px] text-purple-400/80 font-mono mt-2">{Math.round(Math.min(progress, 100))}%</p>
          </div>
        )}

        {/* No API key state */}
        {state === 'no-key' && (
          <div className="bg-amber-500/5 border border-amber-500/25 rounded-2xl p-8 mb-6 text-center">
            <div className="text-4xl mb-4">🔑</div>
            <h3 className="text-base font-bold text-amber-300 mb-2">Connect Gemini API key to enable generation</h3>
            <p className="text-sm text-purple-200/70 max-w-md mx-auto mb-4 leading-relaxed">
              The AI generator requires a Gemini API key configured in your environment.
              Add <code className="px-1.5 py-0.5 bg-[#070314] border border-purple-500/25 rounded text-amber-300 text-[11px] font-mono">GEMINI_API_KEY</code> to your{' '}
              <code className="px-1.5 py-0.5 bg-[#070314] border border-purple-500/25 rounded text-purple-200 text-[11px] font-mono">.env.local</code> to activate this feature.
            </p>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/35 text-amber-300 text-xs font-semibold rounded-xl transition-colors"
            >
              Get a free API key →
            </a>
          </div>
        )}

        {/* Generic error state */}
        {state === 'error' && (
          <div className="bg-rose-500/10 border border-rose-500/25 rounded-2xl p-6 mb-6 text-center">
            <div className="text-3xl mb-3">⚠️</div>
            <h3 className="text-sm font-bold text-rose-300 mb-1">Generation failed</h3>
            <p className="text-xs text-purple-300/70">Something went wrong. Try again or rephrase your prompt.</p>
          </div>
        )}

        {/* Success state — iframe preview + actions */}
        {state === 'success' && generatedHtml && (
          <div className="space-y-4">
            {/* Action bar */}
            <div className="flex items-center justify-between bg-[#0d0622]/90 border border-purple-500/25 rounded-xl px-4 py-3 backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-white">Template generated</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#070314] hover:bg-[#1a0b3b] border border-purple-500/30 text-purple-200 hover:text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  {copied ? (
                    <>
                      <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy HTML
                    </>
                  )}
                </button>
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-xs font-bold rounded-lg transition-colors shadow-sm shadow-purple-500/30 hover:scale-105"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Template
                </button>
              </div>
            </div>

            {/* iframe preview */}
            <div className="rounded-2xl overflow-hidden border border-purple-500/30 shadow-2xl bg-[#070314]">
              <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#0e0624] border-b border-purple-500/20">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                <span className="ml-3 text-[11px] text-purple-400/80 font-mono">generated-template.html</span>
              </div>
              <iframe
                srcDoc={generatedHtml}
                title="Generated Template Preview"
                className="w-full"
                style={{ height: '70vh', border: 'none' }}
                sandbox="allow-scripts"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
