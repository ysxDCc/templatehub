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
    <div className="min-h-screen bg-[#09090b]">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-white/[0.08] bg-gradient-to-b from-zinc-950 to-[#09090b]">
        {/* Glow blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-indigo-600/10 blur-3xl" />
          <div className="absolute top-0 left-1/4 w-[300px] h-[200px] rounded-full bg-violet-600/10 blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold mb-6 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Powered by Gemini
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-4">
            AI Template{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-violet-300 to-cyan-300">
              Generator
            </span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Describe your dream website, get production-ready HTML in seconds.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Prompt area */}
        <div className="bg-zinc-900/60 border border-white/[0.08] rounded-2xl p-6 mb-6 backdrop-blur-xl">
          <label className="block text-sm font-semibold text-zinc-300 mb-3">
            Describe your website
          </label>
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="e.g. 'Dark SaaS landing page for a project management tool with pricing table and testimonials'"
            rows={4}
            disabled={state === 'loading'}
            className="w-full bg-zinc-950/80 border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none disabled:opacity-50"
          />

          {/* Example prompts */}
          <div className="mt-3 flex flex-wrap gap-2">
            {examplePrompts.map((ex, i) => (
              <button
                key={i}
                onClick={() => setPrompt(ex)}
                disabled={state === 'loading'}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 border border-white/[0.06] transition-colors disabled:opacity-40 text-left"
              >
                {ex.length > 50 ? ex.slice(0, 50) + '…' : ex}
              </button>
            ))}
          </div>

          <div className="mt-5 flex justify-end">
            <button
              onClick={handleGenerate}
              disabled={state === 'loading' || !prompt.trim()}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {state === 'loading' ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Generating…
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Generate Template
                </>
              )}
            </button>
          </div>
        </div>

        {/* Loading state */}
        {state === 'loading' && (
          <div className="bg-zinc-900/60 border border-white/[0.08] rounded-2xl p-8 mb-6 text-center backdrop-blur-xl">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:-0.3s]" />
              <div className="w-2 h-2 rounded-full bg-violet-400 animate-bounce [animation-delay:-0.15s]" />
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" />
            </div>
            <p className="text-sm font-semibold text-zinc-300 mb-4">Generating your template…</p>
            <p className="text-xs text-zinc-500 mb-6">Gemini is crafting production-ready HTML with embedded CSS</p>

            {/* Progress bar */}
            <div className="w-full max-w-sm mx-auto bg-zinc-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <p className="text-[11px] text-zinc-600 mt-2">{Math.round(Math.min(progress, 100))}%</p>
          </div>
        )}

        {/* No API key state */}
        {state === 'no-key' && (
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-8 mb-6 text-center">
            <div className="text-4xl mb-4">🔑</div>
            <h3 className="text-base font-bold text-amber-300 mb-2">Connect Gemini API key to enable generation</h3>
            <p className="text-sm text-zinc-400 max-w-md mx-auto mb-4 leading-relaxed">
              The AI generator requires a Gemini API key configured in your environment.
              Add <code className="px-1.5 py-0.5 bg-zinc-800 rounded text-amber-300 text-[11px]">GEMINI_API_KEY</code> to your{' '}
              <code className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-300 text-[11px]">.env.local</code> to activate this feature.
            </p>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold rounded-xl transition-colors"
            >
              Get a free API key →
            </a>
          </div>
        )}

        {/* Generic error state */}
        {state === 'error' && (
          <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 mb-6 text-center">
            <div className="text-3xl mb-3">⚠️</div>
            <h3 className="text-sm font-bold text-red-400 mb-1">Generation failed</h3>
            <p className="text-xs text-zinc-500">Something went wrong. Try again or rephrase your prompt.</p>
          </div>
        )}

        {/* Success state — iframe preview + actions */}
        {state === 'success' && generatedHtml && (
          <div className="space-y-4">
            {/* Action bar */}
            <div className="flex items-center justify-between bg-zinc-900/60 border border-white/[0.08] rounded-xl px-4 py-3 backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold text-zinc-300">Template generated</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 border border-white/[0.08] text-zinc-300 hover:text-white text-xs font-medium rounded-lg transition-colors"
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
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm shadow-indigo-500/20"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Template
                </button>
              </div>
            </div>

            {/* iframe preview */}
            <div className="rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/40 bg-white">
              <div className="flex items-center gap-1.5 px-4 py-2.5 bg-zinc-900 border-b border-white/[0.06]">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                <span className="ml-3 text-[11px] text-zinc-500 font-mono">generated-template.html</span>
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
