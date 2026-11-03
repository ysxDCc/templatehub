'use client';

import { useState, useRef, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import type { Template, SubscriptionTier } from '@/types';
import { hasTierAccess } from '@/lib/auth-tier';
import { injectStoreDataIntoHtml, DEFAULT_STORE_DATA, StoreData, StoreProduct } from '@/lib/auto-edit';
import { createZipArchive } from '@/lib/zip';
import { cyberSound } from '@/lib/sound';
import MobileQRCodeModal from '@/components/MobileQRCodeModal';
import CssTokensModal from '@/components/CssTokensModal';

interface IndustryPreset {
  name: string;
  badge: string;
  storeData: StoreData;
}

const INDUSTRY_PRESETS: IndustryPreset[] = [
  {
    name: '🤖 AI Agent SaaS',
    badge: 'AI & Cloud',
    storeData: {
      storeName: 'OmniAI Platform',
      industry: 'Artificial Intelligence & Cloud Automation',
      tagline: 'Autonomous AI Multi-Agent Infrastructure & Low-Latency Inference',
      subheadline: 'Empowering engineering organizations to run self-healing agent pipelines with sub-50ms execution and verifiable safety.',
      primaryColor: '#a855f7',
      contactEmail: 'enterprise@omniai.sh',
      contactPhone: '+1 (555) 019-2831',
      physicalAddress: '742 Evergreen Terrace, Palo Alto, CA 94301',
      products: [
        { name: 'OmniCluster Autonomous Node', price: '€49/mo', description: 'Dedicated AI inference pod with auto-scaling vector memory.' },
        { name: 'Sovereign Agent Gateway', price: '€199/mo', description: 'Zero-latency multi-model routing with end-to-end auditability.' },
        { name: 'Enterprise Cluster Mesh', price: '€599/mo', description: 'Full air-gapped deployment with SLA-backed 99.99% uptime.' },
      ],
      logoUrl: '',
      heroImageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    },
  },
  {
    name: '☕ Specialty Coffee',
    badge: 'Artisan F&B',
    storeData: {
      storeName: 'Aura Roasters',
      industry: 'Artisan Coffee Roasting & Botanical Sourcing',
      tagline: 'Single-Origin Geisha Beans & Micro-Batch Precision Roasting',
      subheadline: 'Directly trading with heritage growers in Panama and Ethiopia to bring unadulterated botanical complexity to your cup.',
      primaryColor: '#f59e0b',
      contactEmail: 'roastery@auracoffee.co',
      contactPhone: '+44 20 7946 0912',
      physicalAddress: '14 Shoreditch High St, London E1 6PG',
      products: [
        { name: 'Panama Geisha Natural 250g', price: '€28.00', description: 'Jasmine, bergamot, and sweet apricot tasting notes.' },
        { name: 'Yirgacheffe Heirloom Washed', price: '€16.50', description: 'Bright citrus acidity with honeyed floral finish.' },
        { name: 'Monthly Cupping Reserve Sub', price: '€39/mo', description: 'Two exclusive micro-lot roasts delivered freshly unsealed.' },
      ],
      logoUrl: '',
      heroImageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&auto=format&fit=crop&q=80',
    },
  },
  {
    name: '⌚ Haute Horology',
    badge: 'Ultra Luxury',
    storeData: {
      storeName: 'Kronos Geneva',
      industry: 'Haute Horology & Fine Complications',
      tagline: 'Hand-Crafted Flying Tourbillons & Mechanical Complications',
      subheadline: 'Preserving four centuries of Swiss watchmaking excellence through hand-finished titanium calibers and bespoke commissions.',
      primaryColor: '#fbbf24',
      contactEmail: 'concierge@kronosgeneva.ch',
      contactPhone: '+41 22 819 9000',
      physicalAddress: 'Rue du Rhône 42, 1204 Genève, Switzerland',
      products: [
        { name: 'Monarch Double Tourbillon', price: '€14,800', description: 'Grade 5 titanium skeletonized case with 72-hour power reserve.' },
        { name: 'Astralis Perpetual Calendar', price: '€22,500', description: 'Astronomical moonphase complication with rose gold bezel.' },
        { name: 'Custom Bespoke Commission', price: 'Inquire', description: 'One-of-one private horological commission with master watchmaker.' },
      ],
      logoUrl: '',
      heroImageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&auto=format&fit=crop&q=80',
    },
  },
  {
    name: '🛡️ Cyber Defense',
    badge: 'Security',
    storeData: {
      storeName: 'Aegis Sentinel',
      industry: 'Cybersecurity & Kernel Defense',
      tagline: 'Kernel-Level Threat Detection & Autonomous EDR Orchestration',
      subheadline: 'Stopping nation-state intrusions in memory before code executes. Zero compromises, zero false positives.',
      primaryColor: '#06b6d4',
      contactEmail: 'soc@aegissentinel.io',
      contactPhone: '+1 (800) 555-0199',
      physicalAddress: '500 Technology Square, Cambridge, MA 02139',
      products: [
        { name: 'Sentinel Endpoint Defense', price: '€8/endpoint', description: 'Zero-overhead ring-0 telemetry and memory hook neutralization.' },
        { name: 'Autonomous SOC Mesh', price: '€450/mo', description: 'Real-time red-team emulation and automated incident triage.' },
        { name: 'Hardware Security Key Bundle', price: '€120', description: 'FIDO2 WebAuthn cryptographic keys with custom firmware.' },
      ],
      logoUrl: '',
      heroImageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&auto=format&fit=crop&q=80',
    },
  },
  {
    name: '⚡ Liquid Staking DeFi',
    badge: 'Fintech',
    storeData: {
      storeName: 'Nexus Vault',
      industry: 'Decentralized Finance & Yield Optimization',
      tagline: 'Institutional Grade Non-Custodial Liquid Staking & Yield Routing',
      subheadline: 'Maximizing capital efficiency across decentralized networks with mathematically verified automated yield hedges.',
      primaryColor: '#e879f9',
      contactEmail: 'ops@nexusvault.fi',
      contactPhone: '+65 6712 3456',
      physicalAddress: 'Marina Bay Financial Centre, Singapore 018981',
      products: [
        { name: 'stETH Algorithmic Yield Pool', price: '4.8% APY', description: 'Compounded daily with zero lockup and flash-loan protection.' },
        { name: 'Institutional Prime Gateway', price: '€1,500/mo', description: 'KYC-isolated liquidity pools for sovereign funds and desks.' },
        { name: 'Audited Smart Vault Contract', price: '€99.00', description: 'Single-deploy immutable vault codebase with formal verification.' },
      ],
      logoUrl: '',
      heroImageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&auto=format&fit=crop&q=80',
    },
  },
];

interface InteractivePreviewFrameProps {
  template: Template;
}

type ViewMode = 'preview' | 'autoedit' | 'code';
type ViewportMode = 'desktop' | 'laptop' | 'tablet' | 'mobile';

export default function InteractivePreviewFrame({ template }: InteractivePreviewFrameProps) {
  const { isLoaded, isSignedIn, user } = useUser();
  const userTier = (user?.publicMetadata?.subscription as SubscriptionTier | undefined) ?? 'free';
  const hasAccess = isSignedIn && hasTierAccess(userTier, template.tier);

  const [viewMode, setViewMode] = useState<ViewMode>('preview');
  const [viewport, setViewport] = useState<ViewportMode>('desktop');
  const [primaryColor, setPrimaryColor] = useState('#a855f7');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isIframeInteractive, setIsIframeInteractive] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [showCssTokensModal, setShowCssTokensModal] = useState(false);

  // Raw Code state (only loaded if user has access)
  const [rawCode, setRawCode] = useState<string>('');
  const [codeLoading, setCodeLoading] = useState(false);
  const [codeSearch, setCodeSearch] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  // Auto-Edit Studio state
  const [storeData, setStoreData] = useState<StoreData>(DEFAULT_STORE_DATA);
  const [autoEditTab, setAutoEditTab] = useState<'brand' | 'media' | 'products' | 'contact'>('brand');
  const [customHtml, setCustomHtml] = useState<string | null>(null);
  const [appliedCustom, setAppliedCustom] = useState(false);
  const [downloadingCustom, setDownloadingCustom] = useState(false);

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

  // Fetch HTML source code ONLY when authorized user switches to code inspector or auto-edit
  useEffect(() => {
    if ((viewMode === 'code' || viewMode === 'autoedit') && !rawCode && template.livePreviewUrl) {
      setCodeLoading(true);
      fetch(template.livePreviewUrl)
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
  }, [viewMode, rawCode, template.livePreviewUrl]);

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
    if (!hasAccess || !rawCode) return;
    navigator.clipboard.writeText(rawCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Auto-Edit Actions
  const handleApplyAutoEdit = () => {
    if (!rawCode) return;
    const transformed = injectStoreDataIntoHtml(rawCode, storeData);
    setCustomHtml(transformed);
    setAppliedCustom(true);
    setViewMode('preview');
  };

  const handleResetAutoEdit = () => {
    setCustomHtml(null);
    setAppliedCustom(false);
  };

  const handleDownloadCustomHtml = () => {
    const content = customHtml || (rawCode ? injectStoreDataIntoHtml(rawCode, storeData) : '');
    if (!content) return;
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${storeData.storeName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-custom.html`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleExportCustomZip = async () => {
    const content = customHtml || (rawCode ? injectStoreDataIntoHtml(rawCode, storeData) : '');
    if (!content) return;
    setDownloadingCustom(true);
    try {
      const readme = `# ${storeData.storeName}
${storeData.tagline}

Customized via TemplateHub Auto-Edit Studio from "${template.name}".

## Configuration
- Brand Color: ${storeData.primaryColor}
- Email: ${storeData.contactEmail}
- Phone: ${storeData.contactPhone}
- Address: ${storeData.physicalAddress}

Deploy directly to Vercel, Netlify, or any static web host.
`;

      const zipBuf = createZipArchive([
        { path: 'index.html', content },
        { path: 'README.md', content: readme },
      ]);

      const blob = new Blob([new Uint8Array(zipBuf)], { type: 'application/zip' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${storeData.storeName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-bundle.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } finally {
      setDownloadingCustom(false);
    }
  };

  const handleImageUpload = (field: 'logoUrl' | 'heroImageUrl', file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setStoreData((prev) => ({ ...prev, [field]: result }));
    };
    reader.readAsDataURL(file);
  };

  const handleProductChange = (index: number, field: keyof StoreProduct, val: string) => {
    setStoreData((prev) => {
      const prods = [...prev.products];
      prods[index] = { ...prods[index], [field]: val };
      return { ...prev, products: prods };
    });
  };

  const addProduct = () => {
    setStoreData((prev) => ({
      ...prev,
      products: [
        ...prev.products,
        { name: 'New Offering / Service', price: '$99.00', description: 'Comprehensive delivery package tailored to client requirements.' },
      ],
    }));
  };

  const removeProduct = (idx: number) => {
    setStoreData((prev) => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== idx),
    }));
  };

  const codeLines = rawCode ? rawCode.split('\n') : [];
  const filteredLines = codeSearch
    ? codeLines.map((line, idx) => ({ line, idx, match: line.toLowerCase().includes(codeSearch.toLowerCase()) }))
    : codeLines.map((line, idx) => ({ line, idx, match: false }));

  return (
    <div className="border border-purple-500/25 rounded-2xl overflow-hidden bg-[#0a041b] shadow-2xl transition-all">
      {/* Primary Tab Switcher Bar */}
      <div className="bg-[#0e0624] px-3 sm:px-4 py-2 border-b border-purple-500/20 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-1 bg-[#070314] p-1 rounded-xl border border-purple-500/25 overflow-x-auto hide-scrollbar max-w-full">
          <button
            onClick={() => setViewMode('preview')}
            className={`px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
              viewMode === 'preview'
                ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                : 'text-purple-300/70 hover:text-white hover:bg-[#1a0b3b]'
            }`}
          >
            <span>👁️</span>
            <span className="hidden xs:inline">Interactive </span>
            <span>Viewport</span>
            {appliedCustom && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Customized Store Active" />
            )}
          </button>

          {/* AUTO-EDIT STUDIO TAB */}
          <button
            onClick={() => setViewMode('autoedit')}
            className={`px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
              viewMode === 'autoedit'
                ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-[0_0_12px_rgba(232,121,249,0.4)]'
                : 'text-purple-300/70 hover:text-white hover:bg-[#1a0b3b]'
            }`}
          >
            <span>🪄</span>
            <span className="hidden sm:inline">Auto-Edit with </span>
            <span>Store Auto-Edit</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded font-bold uppercase tracking-wider bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30">
              Pro
            </span>
          </button>

          {/* CODE INSPECTOR TAB */}
          <button
            onClick={() => setViewMode('code')}
            className={`px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
              viewMode === 'code'
                ? 'bg-zinc-800 text-white shadow-xs'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <span>{hasAccess ? '⟨/⟩' : '🔒'}</span>
            <span className="hidden xs:inline">Source </span>
            <span>Code</span>
            {!hasAccess && (
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">
                Locked
              </span>
            )}
          </button>
        </div>

        {/* Viewport Top Right Actions */}
        {appliedCustom && viewMode === 'preview' && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
              <span>✓ Store Applied</span>
            </span>
            <button
              onClick={handleResetAutoEdit}
              className="text-xs text-zinc-400 hover:text-white px-2 py-1 rounded bg-zinc-900 border border-white/10"
            >
              Reset
            </button>
            <button
              onClick={handleDownloadCustomHtml}
              className="text-xs font-semibold text-zinc-950 bg-white hover:bg-zinc-200 px-3 py-1 rounded-md"
            >
              Download
            </button>
          </div>
        )}
      </div>

      {/* Subheader Toolbar */}
      {viewMode === 'preview' && (
        <div className="bg-zinc-900/90 backdrop-blur-md px-3 sm:px-4 py-2.5 sm:py-3 border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-2.5">
          {/* Left: Simulated URL */}
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex items-center gap-1.5 mr-1 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
            </div>
            <span className="text-[11px] font-mono text-zinc-400 truncate max-w-[140px] xs:max-w-xs bg-zinc-950 px-2.5 py-1 rounded-md border border-white/[0.06]">
              {appliedCustom
                ? `https://${storeData.storeName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`
                : `https://templatehub.website/sandbox/${template.id}`}
            </span>
          </div>

          {/* Center: Device Viewport Switcher */}
          <div className="flex items-center bg-zinc-950 border border-white/10 rounded-lg p-1 gap-1">
            {(Object.keys(viewports) as ViewportMode[]).map((mode) => {
              const vp = viewports[mode];
              const isActive = viewport === mode;
              const isDesktopOrMobile = mode === 'desktop' || mode === 'mobile';
              return (
                <button
                  key={mode}
                  onClick={() => setViewport(mode)}
                  className={`px-2 sm:px-2.5 py-1 text-xs font-semibold rounded-md transition-all items-center gap-1.5 ${
                    isDesktopOrMobile ? 'flex' : 'hidden sm:flex'
                  } ${
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

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                cyberSound.playClick();
                setShowQRModal(true);
              }}
              className="px-2.5 py-1 text-xs font-semibold rounded-md border bg-zinc-950 border-white/10 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all flex items-center gap-1.5"
              title="Scan QR to test on phone"
            >
              <span>📱</span>
              <span className="hidden md:inline">Phone QR</span>
            </button>

            <button
              onClick={() => {
                cyberSound.playClick();
                setShowCssTokensModal(true);
              }}
              className="px-2.5 py-1 text-xs font-semibold rounded-md border bg-zinc-950 border-white/10 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all flex items-center gap-1.5"
              title="Inspect CSS Design Tokens"
            >
              <span>🎨</span>
              <span className="hidden md:inline">Tokens</span>
            </button>

            <a
              href="https://vercel.com/new"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => cyberSound.playClick()}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-black hover:bg-zinc-900 border border-white/20 text-white transition-all"
              title="1-Click Deploy on Vercel"
            >
              <span>▲</span>
              <span>Deploy</span>
            </a>

            {!appliedCustom && (
              <a
                href={template.livePreviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => cyberSound.playClick()}
                className="text-xs text-zinc-300 hover:text-white px-2.5 py-1 rounded-md bg-zinc-950 border border-white/10 hover:bg-zinc-800 flex items-center gap-1 font-medium transition-colors"
              >
                <span>Full Window</span>
                <span>↗</span>
              </a>
            )}
          </div>
        </div>
      )}

      {/* Optional Theme Tokens Drawer in Preview Mode */}
      {viewMode === 'preview' && isDrawerOpen && (
        <div className="bg-zinc-900/95 border-b border-white/[0.08] px-4 py-3 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-3">
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
            <span>Token:</span>
            <code className="bg-zinc-950 px-2 py-0.5 rounded-md font-mono text-zinc-200 border border-white/10">
              --primary: {primaryColor}
            </code>
          </div>
        </div>
      )}

      {/* VIEWPORT MODE WITH MOBILE TOUCH TRAP PREVENTION */}
      {viewMode === 'preview' && (
        <div className="bg-zinc-950/80 p-2 sm:p-4 flex flex-col justify-center items-center overflow-x-hidden min-h-[460px] sm:min-h-[580px] relative">
          {/* Mobile Sandbox Touch Activation Banner */}
          <div className="sm:hidden w-full mb-2 flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#0e0624] border border-purple-500/25 text-[11px] text-purple-200">
            <span>{isIframeInteractive ? '🎮 Sandbox Touch Active' : '📜 Scroll Mode Active'}</span>
            <button
              onClick={() => setIsIframeInteractive(!isIframeInteractive)}
              className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${
                isIframeInteractive
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  : 'bg-purple-600 text-white shadow-xs'
              }`}
            >
              {isIframeInteractive ? 'Exit Touch' : 'Tap to Interact'}
            </button>
          </div>

          <div
            style={{ width: viewports[viewport].width }}
            className={`max-w-full h-[450px] sm:h-[580px] bg-zinc-950 rounded-xl overflow-hidden border border-white/[0.08] shadow-2xl transition-all duration-300 relative ${
              !isIframeInteractive ? 'pointer-events-none sm:pointer-events-auto' : 'pointer-events-auto'
            }`}
            onContextMenu={(e) => e.preventDefault()}
          >
            {customHtml ? (
              <iframe
                key="custom-doc"
                srcDoc={customHtml}
                title={`${storeData.storeName} customized preview`}
                className="w-full h-full border-0 select-none"
              />
            ) : (
              <iframe
                ref={iframeRef}
                key="standard-doc"
                src={template.livePreviewUrl}
                title={`${template.name} interactive preview`}
                className="w-full h-full border-0 select-none"
                loading="lazy"
              />
            )}
          </div>
        </div>
      )}

      {/* AUTO-EDIT STUDIO MODE (MEMBERSHIP GATED) */}
      {viewMode === 'autoedit' && (
        <div className="min-h-[580px] p-6 bg-zinc-950">
          {!hasAccess ? (
            /* Locked State for Non-Members */
            <div className="h-[500px] flex flex-col items-center justify-center text-center max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-3xl flex items-center justify-center mb-5 text-amber-400">
                🔒
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Auto-Edit Studio is a Membership Exclusive
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mb-6 leading-relaxed">
                Save hours of manual coding. Enter your store name, mission, product catalog, contact info, and upload pictures to let our engine automatically restructure this entire website template for your business.
              </p>
              <div className="bg-zinc-900 border border-white/10 rounded-2xl p-4 text-left w-full mb-6 font-mono text-xs space-y-1.5 text-zinc-300">
                <div className="flex items-center gap-2 text-indigo-400 font-bold">
                  <span>✦ What Auto-Edit Does:</span>
                </div>
                <div>✓ Injects your store name, logo &amp; headline into all sections</div>
                <div>✓ Swaps placeholder products with your actual items &amp; prices</div>
                <div>✓ Generates customized single-file HTML &amp; production ZIP</div>
              </div>
              <Link
                href="/#pricing"
                className="w-full py-3 px-6 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xl shadow-amber-500/20"
              >
                Upgrade to {template.tier.toUpperCase()} Plan to Unlock
              </Link>
            </div>
          ) : (
            /* Unlocked Auto-Edit Studio Interface */
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <span>🪄</span>
                    <span>Store Auto-Edit Studio</span>
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Enter your store specifications and images. Hit Apply to preview and download your tailored site.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleApplyAutoEdit}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-xs transition-all shadow-lg shadow-indigo-500/20 flex items-center gap-1.5"
                  >
                    <span>✨</span>
                    <span>Apply &amp; Preview</span>
                  </button>
                  <button
                    onClick={handleExportCustomZip}
                    disabled={downloadingCustom}
                    className="px-4 py-2 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs transition-all flex items-center gap-1.5"
                  >
                    <span>📦</span>
                    <span>{downloadingCustom ? 'Exporting...' : 'Export ZIP'}</span>
                  </button>
                </div>
              </div>

              {/* 1-Click Industry Presets Banner */}
              <div className="p-4 rounded-2xl bg-[#0e0624] border border-purple-500/25 mb-4">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">⚡</span>
                    <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                      1-Click Industry Presets
                    </span>
                    <span className="text-[10px] text-purple-300 bg-purple-500/15 border border-purple-500/30 px-2 py-0.5 rounded-full font-mono">
                      Instant Load
                    </span>
                  </div>
                  <span className="text-[11px] text-purple-400/70 hidden sm:inline">
                    Select a niche to populate tailored copy, pricing &amp; products
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                  {INDUSTRY_PRESETS.map((preset) => {
                    const isSelected = storeData.storeName === preset.storeData.storeName;
                    return (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => {
                          cyberSound.playSuccess();
                          setStoreData(preset.storeData);
                        }}
                        className={`p-2.5 rounded-xl border text-left transition-all group ${
                          isSelected
                            ? 'bg-purple-600/30 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.35)]'
                            : 'bg-[#070314] border-purple-500/20 hover:border-purple-400/50 hover:bg-[#140838]'
                        }`}
                      >
                        <div className="text-xs font-bold text-white group-hover:text-purple-300 truncate">
                          {preset.name}
                        </div>
                        <div className="text-[10px] text-purple-400 font-mono mt-0.5">
                          {preset.badge}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Internal Subtabs */}
              <div className="flex gap-2 border-b border-white/10 pb-2 text-xs font-semibold">
                <button
                  onClick={() => setAutoEditTab('brand')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    autoEditTab === 'brand' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  1. Brand &amp; Identity
                </button>
                <button
                  onClick={() => setAutoEditTab('media')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    autoEditTab === 'media' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  2. Photos &amp; Logo
                </button>
                <button
                  onClick={() => setAutoEditTab('products')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    autoEditTab === 'products' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  3. Products &amp; Pricing ({storeData.products.length})
                </button>
                <button
                  onClick={() => setAutoEditTab('contact')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    autoEditTab === 'contact' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  4. Contact &amp; Location
                </button>
              </div>

              {/* Form Panels */}
              {autoEditTab === 'brand' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-zinc-400 font-medium mb-1">Store / Business Name</label>
                    <input
                      type="text"
                      value={storeData.storeName}
                      onChange={(e) => setStoreData({ ...storeData, storeName: e.target.value })}
                      className="w-full bg-zinc-900 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 font-medium mb-1">Industry / Category</label>
                    <input
                      type="text"
                      value={storeData.industry}
                      onChange={(e) => setStoreData({ ...storeData, industry: e.target.value })}
                      className="w-full bg-zinc-900 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-zinc-400 font-medium mb-1">Main Headline / Tagline</label>
                    <input
                      type="text"
                      value={storeData.tagline}
                      onChange={(e) => setStoreData({ ...storeData, tagline: e.target.value })}
                      className="w-full bg-zinc-900 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-zinc-400 font-medium mb-1">Subheadline / Core Value Proposition</label>
                    <textarea
                      rows={3}
                      value={storeData.subheadline}
                      onChange={(e) => setStoreData({ ...storeData, subheadline: e.target.value })}
                      className="w-full bg-zinc-900 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 font-medium mb-1">Primary Brand Accent Color</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={storeData.primaryColor}
                        onChange={(e) => setStoreData({ ...storeData, primaryColor: e.target.value })}
                        className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                      />
                      <input
                        type="text"
                        value={storeData.primaryColor}
                        onChange={(e) => setStoreData({ ...storeData, primaryColor: e.target.value })}
                        className="w-32 bg-zinc-900 border border-white/10 rounded-lg p-2 font-mono text-white text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {autoEditTab === 'media' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                  <div className="bg-zinc-900/60 p-4 rounded-xl border border-white/10">
                    <label className="block text-zinc-200 font-semibold mb-1">Store Logo Image</label>
                    <p className="text-[11px] text-zinc-500 mb-3">Upload your transparent PNG/SVG logo or paste an image URL.</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload('logoUrl', e.target.files?.[0] || null)}
                      className="block w-full text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-zinc-800 file:text-white hover:file:bg-zinc-700 cursor-pointer mb-2"
                    />
                    <input
                      type="text"
                      placeholder="Or paste image URL (e.g. https://...)"
                      value={storeData.logoUrl || ''}
                      onChange={(e) => setStoreData({ ...storeData, logoUrl: e.target.value })}
                      className="w-full bg-zinc-950 border border-white/10 rounded-lg p-2 text-white font-mono text-[11px]"
                    />
                    {storeData.logoUrl && (
                      <div className="mt-3 p-2 bg-zinc-950 rounded-lg border border-white/5 inline-block">
                        <img src={storeData.logoUrl} alt="Logo preview" className="h-10 object-contain" />
                      </div>
                    )}
                  </div>

                  <div className="bg-zinc-900/60 p-4 rounded-xl border border-white/10">
                    <label className="block text-zinc-200 font-semibold mb-1">Hero Banner Background Image</label>
                    <p className="text-[11px] text-zinc-500 mb-3">Upload a full-width background photo or paste a URL.</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload('heroImageUrl', e.target.files?.[0] || null)}
                      className="block w-full text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-zinc-800 file:text-white hover:file:bg-zinc-700 cursor-pointer mb-2"
                    />
                    <input
                      type="text"
                      placeholder="Or paste image URL (e.g. https://...)"
                      value={storeData.heroImageUrl || ''}
                      onChange={(e) => setStoreData({ ...storeData, heroImageUrl: e.target.value })}
                      className="w-full bg-zinc-950 border border-white/10 rounded-lg p-2 text-white font-mono text-[11px]"
                    />
                    {storeData.heroImageUrl && (
                      <div className="mt-3 p-2 bg-zinc-950 rounded-lg border border-white/5 inline-block">
                        <img src={storeData.heroImageUrl} alt="Hero preview" className="h-16 w-32 object-cover rounded" />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {autoEditTab === 'products' && (
                <div className="space-y-4 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Products, Menu Items, or Key Services:</span>
                    <button
                      onClick={addProduct}
                      className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-semibold flex items-center gap-1"
                    >
                      <span>+ Add Product</span>
                    </button>
                  </div>

                  {storeData.products.map((prod, idx) => (
                    <div key={idx} className="bg-zinc-900/80 p-4 rounded-xl border border-white/10 grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                      <div className="md:col-span-5">
                        <label className="text-[10px] text-zinc-500 block mb-1">Product Title</label>
                        <input
                          type="text"
                          value={prod.name}
                          onChange={(e) => handleProductChange(idx, 'name', e.target.value)}
                          className="w-full bg-zinc-950 border border-white/10 rounded-lg p-2 text-white"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-[10px] text-zinc-500 block mb-1">Price</label>
                        <input
                          type="text"
                          value={prod.price}
                          onChange={(e) => handleProductChange(idx, 'price', e.target.value)}
                          className="w-full bg-zinc-950 border border-white/10 rounded-lg p-2 text-white font-mono"
                        />
                      </div>
                      <div className="md:col-span-4">
                        <label className="text-[10px] text-zinc-500 block mb-1">Description</label>
                        <input
                          type="text"
                          value={prod.description}
                          onChange={(e) => handleProductChange(idx, 'description', e.target.value)}
                          className="w-full bg-zinc-950 border border-white/10 rounded-lg p-2 text-white text-[11px]"
                        />
                      </div>
                      <div className="md:col-span-1 text-right pt-4">
                        <button
                          onClick={() => removeProduct(idx)}
                          className="text-rose-400 hover:text-rose-300 font-bold text-base"
                          title="Remove item"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {autoEditTab === 'contact' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block text-zinc-400 font-medium mb-1">Contact Email</label>
                    <input
                      type="email"
                      value={storeData.contactEmail}
                      onChange={(e) => setStoreData({ ...storeData, contactEmail: e.target.value })}
                      className="w-full bg-zinc-900 border border-white/10 rounded-lg p-2.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 font-medium mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={storeData.contactPhone}
                      onChange={(e) => setStoreData({ ...storeData, contactPhone: e.target.value })}
                      className="w-full bg-zinc-900 border border-white/10 rounded-lg p-2.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 font-medium mb-1">Physical Address / Headquarters</label>
                    <input
                      type="text"
                      value={storeData.physicalAddress}
                      onChange={(e) => setStoreData({ ...storeData, physicalAddress: e.target.value })}
                      className="w-full bg-zinc-900 border border-white/10 rounded-lg p-2.5 text-white"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* SOURCE CODE INSPECTOR (MEMBERSHIP GATED) */}
      {viewMode === 'code' && (
        <div className="bg-zinc-950 min-h-[580px] p-4">
          {!hasAccess ? (
            /* Locked Code Screen for Free / Non-Member Users */
            <div className="h-[500px] flex flex-col items-center justify-center text-center max-w-md mx-auto">
              <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-3xl flex items-center justify-center mb-5 text-amber-400">
                🔒
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Source Code Protected
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mb-6 leading-relaxed">
                Raw source code extraction and clipboard copying are reserved exclusively for active {template.tier.toUpperCase()} members.
              </p>
              <Link
                href="/#pricing"
                className="w-full py-3 px-6 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xl shadow-amber-500/20"
              >
                Upgrade to {template.tier.toUpperCase()} Plan to Unlock
              </Link>
            </div>
          ) : (
            /* Unlocked Source Code Inspector */
            <div className="space-y-3">
              <div className="bg-zinc-900/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 flex-1 max-w-sm">
                  <span className="text-zinc-500">🔍</span>
                  <input
                    type="text"
                    value={codeSearch}
                    onChange={(e) => setCodeSearch(e.target.value)}
                    placeholder="Filter code by tag or class..."
                    className="bg-zinc-950 border border-white/10 rounded-md px-2.5 py-1 text-zinc-200 placeholder-zinc-500 focus:outline-none w-full"
                  />
                  {codeSearch && (
                    <button onClick={() => setCodeSearch('')} className="text-[10px] text-zinc-400">
                      Clear
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400">
                  <span>{codeLines.length} Lines</span>
                  <span>·</span>
                  <span>{(rawCode.length / 1024).toFixed(1)} KB</span>
                </div>

                <button
                  onClick={handleCopyCode}
                  className="px-3 py-1 text-xs font-semibold rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all flex items-center gap-1.5"
                >
                  <span>{copiedCode ? '✓' : '📋'}</span>
                  <span>{copiedCode ? 'Copied Code!' : 'Copy Entire HTML'}</span>
                </button>
              </div>

              {/* Code Gutter & Viewer */}
              <div className="bg-zinc-950 max-h-[500px] overflow-auto font-mono text-xs p-4 rounded-xl border border-white/10">
                {codeLoading ? (
                  <div className="py-24 text-center text-zinc-500">Loading codebase…</div>
                ) : (
                  <div className="table w-full">
                    {filteredLines.map(({ line, idx, match }) => (
                      <div
                        key={idx}
                        className={`table-row leading-5 hover:bg-white/[0.04] ${match ? 'bg-indigo-500/15' : ''}`}
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
            </div>
          )}
        </div>
      )}

      {showQRModal && (
        <MobileQRCodeModal
          isOpen={showQRModal}
          onClose={() => setShowQRModal(false)}
          templateName={template.name}
          templateId={template.id}
        />
      )}

      {showCssTokensModal && (
        <CssTokensModal
          template={template}
          isOpen={showCssTokensModal}
          onClose={() => setShowCssTokensModal(false)}
        />
      )}
    </div>
  );
}

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
