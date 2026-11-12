'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { templates } from '@/data/templates';

interface SectionBlock {
  id: string;
  type: 'hero' | 'features' | 'cta' | 'testimonials' | 'pricing' | 'footer';
  title: string;
  subtitle?: string;
  badge?: string;
  primaryBtnText?: string;
  secondaryBtnText?: string;
  items?: Array<{ title: string; desc: string; icon?: string }>;
}

function BuilderContent() {
  const searchParams = useSearchParams();
  const templateIdParam = searchParams.get('template') || 'apex-landing';

  const [selectedTemplateId, setSelectedTemplateId] = useState(templateIdParam);
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [primaryColor, setPrimaryColor] = useState('#6366f1');
  const [fontFamily, setFontFamily] = useState('font-sans');
  const [bgTheme, setBgTheme] = useState<'dark' | 'light' | 'midnight'>('dark');
  const [activeTab, setActiveTab] = useState<'edit' | 'styles' | 'code'>('edit');
  const [selectedSectionId, setSelectedSectionId] = useState<string>('hero');

  // Modular customizable blocks
  const [sections, setSections] = useState<SectionBlock[]>([
    {
      id: 'hero',
      type: 'hero',
      badge: '⚡ Version 2.0 Released',
      title: 'Build & Scale Without Code Boundaries',
      subtitle: 'Customize text, colors, layouts, and interactive modules directly in the browser with live visual feedback.',
      primaryBtnText: 'Get Started Free',
      secondaryBtnText: 'Schedule Demo',
    },
    {
      id: 'features',
      type: 'features',
      title: 'Engineered for Complete Independence',
      subtitle: 'Everything you need to launch a distinct online presence.',
      items: [
        { icon: '🚀', title: 'Zero Coding Required', desc: 'Click any headline or paragraph to rewrite and preview immediately.' },
        { icon: '🎨', title: 'Custom Color Themes', desc: 'Change accent colors, fonts, and dark/light modes with one click.' },
        { icon: '📦', title: 'Export Ready HTML', desc: 'Export standalone, production-ready code whenever you are done.' },
      ],
    },
    {
      id: 'cta',
      type: 'cta',
      title: 'Ready to publish your custom website?',
      subtitle: 'Join over 10,000 creators and businesses building with TemplateHub.',
      primaryBtnText: 'Launch Now',
    },
  ]);

  // Sync state if template changes from dropdown
  useEffect(() => {
    const found = templates.find(t => t.id === selectedTemplateId);
    if (found) {
      setSections(prev => [
        {
          ...prev[0],
          title: found.name,
          subtitle: found.description,
        },
        ...prev.slice(1),
      ]);
    }
  }, [selectedTemplateId]);

  // Section updater
  const updateSectionField = (id: string, field: keyof SectionBlock, value: any) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const updateItemField = (sectionId: string, itemIdx: number, field: string, value: string) => {
    setSections(prev => prev.map(s => {
      if (s.id !== sectionId || !s.items) return s;
      const newItems = [...s.items];
      newItems[itemIdx] = { ...newItems[itemIdx], [field]: value };
      return { ...s, items: newItems };
    }));
  };

  // Generated Clean HTML
  const generateExportCode = () => {
    const bgStyles = 
      bgTheme === 'light' ? 'background: #ffffff; color: #18181b;' :
      bgTheme === 'midnight' ? 'background: #030712; color: #f8fafc;' :
      'background: #09090b; color: #f4f4f5;';

    const fontImport = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');`;

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${sections[0]?.title || 'Custom Website'}</title>
  <style>
    ${fontImport}
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { ${bgStyles} font-family: 'Inter', sans-serif; line-height: 1.6; }
    .container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }
    .btn-primary { background: ${primaryColor}; color: #fff; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block; }
    .btn-secondary { border: 1px solid rgba(255,255,255,0.15); color: inherit; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 500; display: inline-block; margin-left: 12px; }
    .hero { padding: 100px 0 80px; text-align: center; }
    .hero h1 { font-size: 52px; font-weight: 800; line-height: 1.15; margin-bottom: 20px; }
    .hero p { font-size: 18px; max-width: 650px; margin: 0 auto 32px; opacity: 0.8; }
    .badge { display: inline-block; padding: 4px 12px; border-radius: 99px; font-size: 12px; font-weight: 600; background: rgba(99,102,241,0.1); color: ${primaryColor}; margin-bottom: 16px; border: 1px solid rgba(99,102,241,0.2); }
    .features { padding: 80px 0; border-top: 1px solid rgba(255,255,255,0.08); }
    .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; margin-top: 40px; }
    .card { padding: 32px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.02); }
    .card-icon { font-size: 32px; margin-bottom: 12px; }
    .cta { padding: 90px 0; text-align: center; border-top: 1px solid rgba(255,255,255,0.08); }
  </style>
</head>
<body>
  <!-- Hero Section -->
  <section class="hero">
    <div class="container">
      <div class="badge">${sections[0]?.badge || ''}</div>
      <h1>${sections[0]?.title || ''}</h1>
      <p>${sections[0]?.subtitle || ''}</p>
      <div>
        <a href="#" class="btn-primary">${sections[0]?.primaryBtnText || 'Get Started'}</a>
        <a href="#" class="btn-secondary">${sections[0]?.secondaryBtnText || 'Learn More'}</a>
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section class="features">
    <div class="container">
      <h2 style="font-size: 32px; text-align: center;">${sections[1]?.title || 'Features'}</h2>
      <p style="text-align: center; opacity: 0.8; margin-top: 8px;">${sections[1]?.subtitle || ''}</p>
      <div class="features-grid">
        ${(sections[1]?.items || []).map(item => `
        <div class="card">
          <div class="card-icon">${item.icon}</div>
          <h3>${item.title}</h3>
          <p style="opacity: 0.75; font-size: 14px; margin-top: 8px;">${item.desc}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="cta">
    <div class="container">
      <h2 style="font-size: 36px; margin-bottom: 12px;">${sections[2]?.title || 'Get Started'}</h2>
      <p style="opacity: 0.8; margin-bottom: 24px;">${sections[2]?.subtitle || ''}</p>
      <a href="#" class="btn-primary">${sections[2]?.primaryBtnText || 'Start Now'}</a>
    </div>
  </section>
</body>
</html>`;
  };

  const handleDownloadCode = () => {
    const code = generateExportCode();
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedTemplateId}-customized.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col md:h-screen bg-bg text-ink md:overflow-hidden font-sans">
      
      {/* Top Application Bar */}
      <header className="min-h-14 py-2 border-b border-line bg-surface px-4 flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/templates" className="min-h-11 text-xs text-muted hover:text-white flex items-center gap-1.5 font-medium transition-colors">
            <span>←</span>
            <span>Back to catalog</span>
          </Link>
          <span className="text-muted">|</span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-white">Visual Website Customizer</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold border border-emerald-500/20">
              No-Code Active
            </span>
          </div>
        </div>

        {/* Viewport device switcher */}
        <div className="hidden sm:flex items-center gap-1 bg-surface p-1 rounded-lg border border-white/[0.06]">
          <button
            onClick={() => setDeviceView('desktop')}
            className={`min-h-11 px-3 py-1 text-xs font-medium rounded-md transition-all ${
              deviceView === 'desktop' ? 'bg-raised text-white shadow-xs' : 'text-muted hover:text-white'
            }`}
          >
            🖥️ Desktop
          </button>
          <button
            onClick={() => setDeviceView('tablet')}
            className={`min-h-11 px-3 py-1 text-xs font-medium rounded-md transition-all ${
              deviceView === 'tablet' ? 'bg-raised text-white shadow-xs' : 'text-muted hover:text-white'
            }`}
          >
            📱 Tablet
          </button>
          <button
            onClick={() => setDeviceView('mobile')}
            className={`min-h-11 px-3 py-1 text-xs font-medium rounded-md transition-all ${
              deviceView === 'mobile' ? 'bg-raised text-white shadow-xs' : 'text-muted hover:text-white'
            }`}
          >
            📲 Mobile
          </button>
        </div>

        {/* Action Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab(activeTab === 'code' ? 'edit' : 'code')}
            className="min-h-11 px-3 py-1.5 rounded-lg border border-line text-xs font-medium text-zinc-300 hover:text-white hover:bg-raised transition-colors"
          >
            {activeTab === 'code' ? 'Visual Editor' : 'View HTML Code'}
          </button>
          <button
            onClick={handleDownloadCode}
            className="min-h-11 px-4 py-1.5 rounded-lg bg-white text-zinc-950 text-xs font-semibold hover:bg-zinc-200 transition-colors shadow-xs flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Download Site</span>
          </button>
        </div>
      </header>

      {/* Main Workspace: Left Controls Sidebar + Canvas */}
      <div className="flex flex-col-reverse md:flex-row flex-1 md:overflow-hidden">
        
        {/* Left Sidebar Controls */}
        <aside className="w-full md:w-96 md:border-r border-line bg-surface flex flex-col shrink-0 md:overflow-y-auto">
          {/* Tabs header */}
          <div className="flex border-b border-white/[0.08] text-xs font-semibold">
            <button
              onClick={() => setActiveTab('edit')}
              className={`min-h-11 flex-1 py-3 text-center border-b-2 transition-all ${
                activeTab === 'edit' ? 'border-white text-white' : 'border-transparent text-muted hover:text-white'
              }`}
            >
              Content & Text
            </button>
            <button
              onClick={() => setActiveTab('styles')}
              className={`min-h-11 flex-1 py-3 text-center border-b-2 transition-all ${
                activeTab === 'styles' ? 'border-white text-white' : 'border-transparent text-muted hover:text-white'
              }`}
            >
              Colors & Theme
            </button>
          </div>

          <div className="p-5 space-y-6">
            
            {/* Template Selector dropdown */}
            <div>
              <label htmlFor="bui-f1" className="text-xs font-semibold uppercase tracking-wider text-muted block mb-2">
                Starting Template
              </label>
              <select
 id="bui-f1"
                value={selectedTemplateId}
                onChange={(e) => setSelectedTemplateId(e.target.value)}
                className="min-h-11 w-full bg-surface border border-line rounded-lg p-2.5 text-xs text-white outline-none focus:border-indigo-500"
              >
                {templates.map(t => (
                  <option key={t.id} value={t.id}>{t.name} ({t.category})</option>
                ))}
              </select>
            </div>

            {/* TAB: CONTENT & TEXT */}
            {activeTab === 'edit' && (
              <div className="space-y-6">
                {/* Section selection */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted block mb-2">
                    Active Section to Edit
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {sections.map(s => (
                      <button
                        key={s.id}
                        onClick={() => setSelectedSectionId(s.id)}
                        className={`min-h-11 py-2 px-2 text-xs font-semibold rounded-lg capitalize border transition-all ${
                          selectedSectionId === s.id 
                            ? 'bg-raised text-white border-white/30' 
                            : 'bg-surface text-muted border-white/[0.06] hover:text-white'
                        }`}
                      >
                        {s.type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* HERO SECTION CONTROLS */}
                {selectedSectionId === 'hero' && (
                  <div className="space-y-4 pt-2 border-t border-white/[0.06]">
                    <div className="text-xs font-semibold text-zinc-300">Hero Section Fields</div>
                    
                    <div>
                      <label htmlFor="bui-f2" className="text-xs text-muted block mb-1">Badge Text</label>
                      <input
 id="bui-f2"
                        type="text"
                        value={sections[0]?.badge || ''}
                        onChange={(e) => updateSectionField('hero', 'badge', e.target.value)}
                        className="min-h-11 w-full bg-surface border border-line rounded-lg p-2 text-xs text-white focus:border-white/30 outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="bui-f3" className="text-xs text-muted block mb-1">Main Headline</label>
                      <textarea
 id="bui-f3"
                        rows={3}
                        value={sections[0]?.title || ''}
                        onChange={(e) => updateSectionField('hero', 'title', e.target.value)}
                        className="w-full bg-surface border border-line rounded-lg p-2 text-xs text-white focus:border-white/30 outline-none resize-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="bui-f4" className="text-xs text-muted block mb-1">Subheadline Description</label>
                      <textarea
 id="bui-f4"
                        rows={3}
                        value={sections[0]?.subtitle || ''}
                        onChange={(e) => updateSectionField('hero', 'subtitle', e.target.value)}
                        className="w-full bg-surface border border-line rounded-lg p-2 text-xs text-white focus:border-white/30 outline-none resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label htmlFor="bui-f5" className="text-xs text-muted block mb-1">Primary Button</label>
                        <input
 id="bui-f5"
                          type="text"
                          value={sections[0]?.primaryBtnText || ''}
                          onChange={(e) => updateSectionField('hero', 'primaryBtnText', e.target.value)}
                          className="min-h-11 w-full bg-surface border border-line rounded-lg p-2 text-xs text-white focus:border-white/30 outline-none"
                        />
                      </div>
                      <div>
                        <label htmlFor="bui-f6" className="text-xs text-muted block mb-1">Secondary Button</label>
                        <input
 id="bui-f6"
                          type="text"
                          value={sections[0]?.secondaryBtnText || ''}
                          onChange={(e) => updateSectionField('hero', 'secondaryBtnText', e.target.value)}
                          className="min-h-11 w-full bg-surface border border-line rounded-lg p-2 text-xs text-white focus:border-white/30 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* FEATURES SECTION CONTROLS */}
                {selectedSectionId === 'features' && (
                  <div className="space-y-4 pt-2 border-t border-white/[0.06]">
                    <div className="text-xs font-semibold text-zinc-300">Feature Section Items</div>
                    
                    <div>
                      <label htmlFor="bui-f7" className="text-xs text-muted block mb-1">Section Title</label>
                      <input
 id="bui-f7"
                        type="text"
                        value={sections[1]?.title || ''}
                        onChange={(e) => updateSectionField('features', 'title', e.target.value)}
                        className="min-h-11 w-full bg-surface border border-line rounded-lg p-2 text-xs text-white focus:border-white/30 outline-none"
                      />
                    </div>

                    {sections[1]?.items?.map((item, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-surface border border-white/[0.08] space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-muted uppercase">Card #{idx + 1}</span>
                          <input
                            type="text"
                            value={item.icon || '✨'}
                            onChange={(e) => updateItemField('features', idx, 'icon', e.target.value)}
                            className="min-h-11 w-10 text-center bg-raised border border-line rounded p-1 text-xs text-white"
                          />
                        </div>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => updateItemField('features', idx, 'title', e.target.value)}
                          placeholder="Card Title"
                          className="min-h-11 w-full bg-raised border border-line rounded p-1.5 text-xs text-white"
                        />
                        <textarea
                          rows={2}
                          value={item.desc}
                          onChange={(e) => updateItemField('features', idx, 'desc', e.target.value)}
                          placeholder="Card description"
                          className="w-full bg-raised border border-line rounded p-1.5 text-xs text-zinc-300 resize-none"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA SECTION CONTROLS */}
                {selectedSectionId === 'cta' && (
                  <div className="space-y-4 pt-2 border-t border-white/[0.06]">
                    <div className="text-xs font-semibold text-zinc-300">Call to Action Fields</div>
                    <div>
                      <label htmlFor="bui-f8" className="text-xs text-muted block mb-1">Headline</label>
                      <input
 id="bui-f8"
                        type="text"
                        value={sections[2]?.title || ''}
                        onChange={(e) => updateSectionField('cta', 'title', e.target.value)}
                        className="min-h-11 w-full bg-surface border border-line rounded-lg p-2 text-xs text-white focus:border-white/30 outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="bui-f9" className="text-xs text-muted block mb-1">Subtitle</label>
                      <textarea
 id="bui-f9"
                        rows={2}
                        value={sections[2]?.subtitle || ''}
                        onChange={(e) => updateSectionField('cta', 'subtitle', e.target.value)}
                        className="w-full bg-surface border border-line rounded-lg p-2 text-xs text-white focus:border-white/30 outline-none resize-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="bui-f10" className="text-xs text-muted block mb-1">Button Text</label>
                      <input
 id="bui-f10"
                        type="text"
                        value={sections[2]?.primaryBtnText || ''}
                        onChange={(e) => updateSectionField('cta', 'primaryBtnText', e.target.value)}
                        className="min-h-11 w-full bg-surface border border-line rounded-lg p-2 text-xs text-white focus:border-white/30 outline-none"
                      />
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* TAB: STYLES & THEMING */}
            {activeTab === 'styles' && (
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted block mb-2">
                    Primary Accent Color
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {[
                      { name: 'Indigo', color: '#6366f1' },
                      { name: 'Cyan', color: '#06b6d4' },
                      { name: 'Emerald', color: '#10b981' },
                      { name: 'Orange', color: '#f97316' },
                      { name: 'Rose', color: '#f43f5e' },
                    ].map(c => (
                      <button
                        key={c.color}
                        onClick={() => setPrimaryColor(c.color)}
                        className="min-h-11 flex flex-col items-center gap-1.5 p-2 rounded-lg bg-surface hover:bg-raised transition-colors border border-white/[0.06]"
                      >
                        <span 
                          className="w-6 h-6 rounded-full border-2 transition-transform hover:scale-110"
                          style={{ 
                            backgroundColor: c.color, 
                            borderColor: primaryColor === c.color ? '#fff' : 'transparent' 
                          }}
                        />
                        <span className="text-[10px] text-muted">{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted block mb-2">
                    Background Mode
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'dark', label: 'Dark Zinc' },
                      { id: 'midnight', label: 'Midnight' },
                      { id: 'light', label: 'Clean Light' },
                    ].map(m => (
                      <button
                        key={m.id}
                        onClick={() => setBgTheme(m.id as any)}
                        className={`min-h-11 py-2 px-2 text-xs font-medium rounded-lg border transition-all ${
                          bgTheme === m.id ? 'bg-raised text-white border-white/30' : 'bg-surface text-muted border-white/[0.06]'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted block mb-2">
                    Typography Pairings
                  </label>
                  <div className="space-y-1.5">
                    {[
                      { id: 'font-sans', name: 'Inter (Modern & Neutral)' },
                      { id: 'font-mono', name: 'Space Mono (Technical)' },
                      { id: 'font-serif', name: 'Playfair / Serif (Editorial)' },
                    ].map(f => (
                      <button
                        key={f.id}
                        onClick={() => setFontFamily(f.id)}
                        className={`min-h-11 w-full text-left p-2.5 rounded-lg text-xs font-medium border transition-all ${
                          fontFamily === f.id ? 'bg-raised text-white border-white/30' : 'bg-surface text-muted border-white/[0.06]'
                        }`}
                      >
                        {f.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        </aside>

        {/* Right Canvas: Real-time Live Interactive Preview */}
        <main data-user-content="" aria-label="Your page preview" className="h-[70vh] md:h-auto flex-1 bg-bg p-4 md:p-8 flex items-center justify-center overflow-auto">
          
          {activeTab === 'code' ? (
            <div className="w-full h-full max-w-4xl bg-surface border border-line rounded-2xl p-6 font-mono text-xs overflow-auto text-zinc-300">
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-line">
                <span className="text-muted">Generated Clean Standalone HTML</span>
                <button
                  onClick={() => navigator.clipboard.writeText(generateExportCode())}
                  className="min-h-11 px-3 py-1 bg-raised hover:bg-zinc-700 text-white rounded text-xs transition-colors"
                >
                  Copy to Clipboard
                </button>
              </div>
              <pre className="whitespace-pre-wrap">{generateExportCode()}</pre>
            </div>
          ) : (
            <div 
              className={`transition-all duration-300 rounded-2xl shadow-2xl overflow-hidden border border-line ${fontFamily} ${
                deviceView === 'desktop' ? 'w-full max-w-5xl h-full' :
                deviceView === 'tablet' ? 'w-[768px] h-[90%]' :
                'w-[375px] h-[85%]'
              } ${
                bgTheme === 'light' ? 'bg-white text-zinc-900' :
                bgTheme === 'midnight' ? 'bg-[#030712] text-slate-100' :
                'bg-[#09090b] text-zinc-100'
              } overflow-y-auto`}
            >
              
              {/* Fake In-Page Browser Header */}
              <div className={`px-4 py-3 border-b flex items-center justify-between text-xs sticky top-0 z-20 backdrop-blur-md ${
                bgTheme === 'light' ? 'bg-zinc-100/90 border-zinc-200' : 'bg-surface border-white/[0.08]'
              }`}>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                  <span className="ml-2 font-mono text-[11px] opacity-60">Live Interactive Canvas — Click any text to edit inline!</span>
                </div>
                <div className="text-[11px] font-semibold opacity-60 uppercase tracking-widest">
                  Preview Mode
                </div>
              </div>

              {/* LIVE SECTION 1: HERO (INLINE EDITABLE) */}
              <section className="py-20 px-6 sm:px-12 text-center relative border-b border-white/[0.06]">
                <div className="max-w-3xl mx-auto">
                  {sections[0]?.badge && (
                    <div 
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => updateSectionField('hero', 'badge', e.currentTarget.innerText)}
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-6 outline-none hover:ring-2 hover:ring-indigo-400 cursor-text transition-all"
                      style={{ 
                        backgroundColor: `${primaryColor}15`, 
                        color: primaryColor, 
                        border: `1px solid ${primaryColor}30` 
                      }}
                    >
                      {sections[0].badge}
                    </div>
                  )}

                  <h1 
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => updateSectionField('hero', 'title', e.currentTarget.innerText)}
                    className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight outline-none hover:ring-2 hover:ring-indigo-400 rounded-md cursor-text"
                  >
                    {sections[0]?.title}
                  </h1>

                  <p 
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => updateSectionField('hero', 'subtitle', e.currentTarget.innerText)}
                    className="text-base sm:text-lg opacity-80 leading-relaxed mb-8 max-w-2xl mx-auto outline-none hover:ring-2 hover:ring-indigo-400 rounded-md cursor-text"
                  >
                    {sections[0]?.subtitle}
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button 
                      style={{ backgroundColor: primaryColor }}
                      className="min-h-11 px-6 py-3 rounded-lg text-white font-semibold text-sm shadow-md transition-transform hover:scale-105"
                    >
                      {sections[0]?.primaryBtnText}
                    </button>
                    <button 
                      className={`min-h-11 px-6 py-3 rounded-lg font-medium text-sm border transition-colors ${
                        bgTheme === 'light' ? 'border-zinc-300 hover:bg-zinc-100' : 'border-line hover:bg-raised'
                      }`}
                    >
                      {sections[0]?.secondaryBtnText}
                    </button>
                  </div>
                </div>
              </section>

              {/* LIVE SECTION 2: FEATURES (INLINE EDITABLE) */}
              <section className="py-20 px-6 sm:px-12 border-b border-white/[0.06]">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-14">
                    <h2 
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => updateSectionField('features', 'title', e.currentTarget.innerText)}
                      className="text-3xl font-bold mb-2 outline-none hover:ring-2 hover:ring-indigo-400 rounded-md cursor-text"
                    >
                      {sections[1]?.title}
                    </h2>
                    <p 
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => updateSectionField('features', 'subtitle', e.currentTarget.innerText)}
                      className="text-sm opacity-70 outline-none hover:ring-2 hover:ring-indigo-400 rounded-md cursor-text"
                    >
                      {sections[1]?.subtitle}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {sections[1]?.items?.map((item, idx) => (
                      <div 
                        key={idx}
                        className={`p-6 rounded-xl border transition-all ${
                          bgTheme === 'light' ? 'bg-zinc-50 border-zinc-200' : 'bg-surface border-white/[0.08]'
                        }`}
                      >
                        <div className="text-3xl mb-3">{item.icon}</div>
                        <h3 
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) => updateItemField('features', idx, 'title', e.currentTarget.innerText)}
                          className="font-bold text-base mb-2 outline-none hover:ring-1 hover:ring-indigo-400 cursor-text"
                        >
                          {item.title}
                        </h3>
                        <p 
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) => updateItemField('features', idx, 'desc', e.currentTarget.innerText)}
                          className="text-xs opacity-70 leading-relaxed outline-none hover:ring-1 hover:ring-indigo-400 cursor-text"
                        >
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* LIVE SECTION 3: CALL TO ACTION (INLINE EDITABLE) */}
              <section className="py-20 px-6 sm:px-12 text-center">
                <div className="max-w-2xl mx-auto">
                  <h2 
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => updateSectionField('cta', 'title', e.currentTarget.innerText)}
                    className="text-3xl sm:text-4xl font-bold mb-4 outline-none hover:ring-2 hover:ring-indigo-400 rounded-md cursor-text"
                  >
                    {sections[2]?.title}
                  </h2>
                  <p 
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => updateSectionField('cta', 'subtitle', e.currentTarget.innerText)}
                    className="text-sm opacity-70 mb-8 outline-none hover:ring-2 hover:ring-indigo-400 rounded-md cursor-text"
                  >
                    {sections[2]?.subtitle}
                  </p>
                  <button 
                    style={{ backgroundColor: primaryColor }}
                    className="min-h-11 px-8 py-3.5 rounded-lg text-white font-semibold text-sm shadow-lg transition-transform hover:scale-105"
                  >
                    {sections[2]?.primaryBtnText}
                  </button>
                </div>
              </section>

            </div>
          )}

        </main>
      </div>

    </div>
  );
}

export default function BuilderPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm text-muted">Loading No-Code Customizer...</div>}>
      <BuilderContent />
    </Suspense>
  );
}
