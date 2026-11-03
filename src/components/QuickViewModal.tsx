'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Template } from '@/types';
import { cyberSound } from '@/lib/sound';
import MobileQRCodeModal from '@/components/MobileQRCodeModal';
import SinglePurchaseButton from '@/components/SinglePurchaseButton';

interface QuickViewModalProps {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
}

type ViewportMode = 'desktop' | 'tablet' | 'mobile';

export default function QuickViewModal({
  template,
  isOpen,
  onClose,
}: QuickViewModalProps) {
  const [viewport, setViewport] = useState<ViewportMode>('desktop');
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showQR) {
          setShowQR(false);
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, showQR, onClose]);

  if (!isOpen || !template) return null;

  const viewports: Record<ViewportMode, { label: string; icon: string; width: string }> = {
    desktop: { label: 'Desktop', icon: '🖥️', width: '100%' },
    tablet: { label: 'Tablet', icon: '📱', width: '768px' },
    mobile: { label: 'Mobile', icon: '📲', width: '375px' },
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md transition-all animate-in fade-in"
        onClick={onClose}
      >
        <div
          className="w-full max-w-6xl max-h-[92vh] flex flex-col rounded-3xl bg-[#0a041b] border border-purple-500/30 shadow-[0_0_80px_rgba(168,85,247,0.3)] overflow-hidden relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Bar */}
          <div className="bg-[#0e0624] px-4 py-3 border-b border-purple-500/25 flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-white truncate">
                    {template.name}
                  </h3>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-purple-500/15 border border-purple-500/30 text-purple-300 shrink-0">
                    {template.category}
                  </span>
                </div>
                <p className="text-[11px] text-purple-300/60 hidden sm:block truncate">
                  {template.description}
                </p>
              </div>
            </div>

            {/* Viewport & Action Controls */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Viewport switchers */}
              <div className="hidden sm:flex items-center gap-1 bg-[#070314] p-1 rounded-xl border border-purple-500/25">
                {(['desktop', 'tablet', 'mobile'] as ViewportMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => {
                      cyberSound.playClick();
                      setViewport(mode);
                    }}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all flex items-center gap-1 ${
                      viewport === mode
                        ? 'bg-purple-600 text-white shadow-[0_0_10px_rgba(168,85,247,0.5)]'
                        : 'text-purple-300/70 hover:text-white'
                    }`}
                  >
                    <span>{viewports[mode].icon}</span>
                    <span className="hidden md:inline">{viewports[mode].label}</span>
                  </button>
                ))}
              </div>

              {/* QR Code button */}
              <button
                onClick={() => {
                  cyberSound.playClick();
                  setShowQR(true);
                }}
                className="px-2.5 py-1.5 rounded-xl bg-[#070314] hover:bg-[#1a0b3b] border border-purple-500/25 text-purple-200 text-xs font-medium transition-colors flex items-center gap-1.5"
                title="Scan QR Code to preview on phone"
              >
                <span>📱</span>
                <span className="hidden md:inline">Phone QR</span>
              </button>

              {/* Open in new tab */}
              {template.livePreviewUrl !== '#' && (
                <a
                  href={template.livePreviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 rounded-xl bg-[#070314] hover:bg-[#1a0b3b] border border-purple-500/25 text-purple-200 text-xs font-medium transition-colors flex items-center gap-1"
                  title="Open full screen in new tab"
                >
                  <span className="hidden md:inline">Open Live</span>
                  <span>↗</span>
                </a>
              )}

              {/* Close button */}
              <button
                onClick={() => {
                  cyberSound.playClick();
                  onClose();
                }}
                className="w-8 h-8 rounded-full bg-[#070314] border border-purple-500/30 text-purple-300 hover:text-white flex items-center justify-center text-xs transition-colors ml-1"
                aria-label="Close Quick-View"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Iframe Sandbox Area */}
          <div className="flex-1 min-h-[380px] sm:min-h-[500px] bg-[#070314] flex items-center justify-center overflow-auto p-2 sm:p-4">
            <div
              style={{ width: viewports[viewport].width }}
              className="max-w-full h-full min-h-[360px] sm:min-h-[480px] bg-black rounded-2xl overflow-hidden border border-purple-500/20 shadow-2xl transition-all duration-300"
            >
              <iframe
                src={template.livePreviewUrl}
                title={`${template.name} Quick View`}
                className="w-full h-full min-h-[360px] sm:min-h-[480px] border-0"
                loading="eager"
              />
            </div>
          </div>

          {/* Quick-View Action Footer */}
          <div className="bg-[#0e0624] px-4 py-3 border-t border-purple-500/25 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-3 text-xs text-purple-200/80">
              <span className="font-semibold text-amber-400">★ {template.rating.toFixed(1)}</span>
              <span>•</span>
              <span className="font-mono">{template.downloads.toLocaleString()} downloads</span>
              <span>•</span>
              <span className="text-white font-medium capitalize">{template.tier} tier</span>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <div className="flex-1 sm:flex-initial sm:w-60">
                <SinglePurchaseButton
                  templateId={template.id}
                  templateName={template.name}
                  className="py-1.5 text-[11px]"
                />
              </div>

              <Link
                href={`/templates/${template.id}`}
                onClick={() => cyberSound.playClick()}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-bold text-xs rounded-xl transition-all shadow-[0_0_15px_rgba(168,85,247,0.35)] whitespace-nowrap"
              >
                Full Details &amp; Customizer →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {showQR && (
        <MobileQRCodeModal
          isOpen={showQR}
          onClose={() => setShowQR(false)}
          templateName={template.name}
          templateId={template.id}
        />
      )}
    </>
  );
}
