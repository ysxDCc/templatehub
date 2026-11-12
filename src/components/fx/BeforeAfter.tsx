'use client';

import { useEffect, useState } from 'react';
import { DEFAULT_STORE_DATA, injectStoreDataIntoHtml, type StoreData } from '@/lib/auto-edit';

const DEMO: StoreData = {
  ...DEFAULT_STORE_DATA,
  storeName: "Leo's Coffee House",
  industry: 'Specialty coffee',
  tagline: 'Fresh roasts, slow mornings',
  subheadline: 'Single-origin coffee roasted every Friday in Bratislava. Come for the espresso, stay for the pastries.',
  primaryColor: '#d97706',
  contactEmail: 'hello@leoscoffee.sk',
  contactPhone: '+421 900 123 456',
  physicalAddress: 'Obchodná 12, Bratislava',
  products: [
    { name: 'House espresso', price: '€2.40', description: 'Chocolate, hazelnut and a long sweet finish.' },
    { name: 'Oat flat white', price: '€3.60', description: 'Our espresso with silky steamed oat milk.' },
    { name: 'Cardamom bun', price: '€3.20', description: 'Baked every morning, best while still warm.' },
  ],
};

/**
 * Drag to compare a template as it ships with the same template after the
 * Auto-Edit Studio has applied a business's details. The "after" side is real
 * Studio output, generated in the browser.
 */
export default function BeforeAfter({ templateId, previewUrl }: { templateId: string; previewUrl: string }) {
  const [after, setAfter] = useState<string | null>(null);
  const [pos, setPos] = useState(50);

  useEffect(() => {
    let alive = true;
    fetch(previewUrl)
      .then((r) => r.text())
      .then((html) => alive && setAfter(injectStoreDataIntoHtml(html, DEMO)))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [previewUrl]);

  const frame = 'absolute inset-0 w-[250%] h-[250%] origin-top-left scale-[0.4] border-0 pointer-events-none';

  return (
    <div>
      <div className="relative aspect-[16/10] rounded-section border border-line overflow-hidden th-skeleton select-none">
        <iframe src={previewUrl} title="" aria-hidden="true" tabIndex={-1} loading="lazy" className={frame} />
        {after && (
          <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
            <iframe srcDoc={after} title="" aria-hidden="true" tabIndex={-1} sandbox="" className={frame} />
          </div>
        )}
        <div className="absolute inset-y-0 w-0.5 bg-white/90 shadow-[0_0_12px_rgba(0,0,0,0.5)]" style={{ left: `${pos}%` }} aria-hidden="true">
          <span className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 w-11 h-11 rounded-full bg-white text-bg flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="m9 18-6-6 6-6M15 6l6 6-6 6" /></svg>
          </span>
        </div>
        <span className="absolute top-3 left-3 px-2 py-1 rounded-md bg-black/60 text-xs font-semibold text-white">Before</span>
        <span className="absolute top-3 right-3 px-2 py-1 rounded-md bg-black/60 text-xs font-semibold text-white">After · Studio</span>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Drag to compare the original template with the Studio version"
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
        />
      </div>
      <p className="mt-3 text-sm text-muted">
        Same template ({templateId.replace(/-/g, ' ')}), before and after adding a business name, colour, menu and contact details in the Studio.
      </p>
    </div>
  );
}
