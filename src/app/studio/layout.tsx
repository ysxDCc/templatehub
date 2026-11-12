import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Auto-Edit Studio — Customise a Website Template in Your Browser',
  description:
    'Pick any template, type in your business name, products and contact details, upload your photos, and download a ready-to-host website as a ZIP. No coding needed.',
  alternates: { canonical: '/studio' },
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
