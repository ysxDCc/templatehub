import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Studio — Generate a Website From a Prompt',
  description: 'Describe your business and get a complete, standalone HTML page you can preview, tweak and download.',
  alternates: { canonical: '/ai-generator' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
