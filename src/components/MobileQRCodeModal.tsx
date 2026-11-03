'use client';

import { useState } from 'react';
import { cyberSound } from '@/lib/sound';

interface MobileQRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  templateName: string;
  templateId: string;
}

export default function MobileQRCodeModal({
  isOpen,
  onClose,
  templateName,
  templateId,
}: MobileQRCodeModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const targetUrl = `https://www.templatehub.website/templates/${templateId}/index.html`;
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
    targetUrl
  )}&color=e879f9&bgcolor=070314&margin=1`;

  const handleCopyLink = () => {
    cyberSound.playSuccess();
    navigator.clipboard.writeText(targetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-3xl bg-[#0d0622] border border-purple-500/35 p-6 shadow-[0_0_60px_rgba(168,85,247,0.35)] relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-20 bg-fuchsia-500/20 blur-[50px] pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => {
            cyberSound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#070314] border border-purple-500/30 text-purple-300 hover:text-white flex items-center justify-center text-xs transition-colors"
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-[11px] font-mono mb-3">
            <span>📱 Real Device Sandbox</span>
          </div>

          <h3 className="text-lg font-bold text-white mb-1">
            Test on Physical Device
          </h3>
          <p className="text-xs text-purple-200/75 mb-5 leading-relaxed">
            Scan with your iPhone or Android camera to launch <span className="text-white font-semibold">{templateName}</span> standalone in Safari / Chrome with 100% native mobile feel.
          </p>

          {/* QR Code Container */}
          <div className="p-3 bg-[#070314] rounded-2xl border border-purple-500/30 w-fit mx-auto shadow-[0_0_30px_rgba(168,85,247,0.25)] mb-5">
            <img
              src={qrImageUrl}
              alt={`Scan QR Code for ${templateName}`}
              className="w-48 h-48 rounded-xl block"
              loading="eager"
            />
          </div>

          {/* Copy Link Alternative */}
          <div className="flex flex-col gap-2">
            <button
              onClick={handleCopyLink}
              className="w-full py-2.5 px-4 bg-[#140838] hover:bg-[#1f0d54] text-purple-200 hover:text-white border border-purple-500/30 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <span>{copied ? '✓ Copied Direct URL' : '🔗 Copy Direct Mobile Link'}</span>
            </button>
            <span className="text-[10px] text-purple-400/60 font-mono">
              Zero login required on scanned device
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
