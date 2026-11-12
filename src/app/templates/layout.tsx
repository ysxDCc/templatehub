import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Website Templates — Live Previews',
  description: 'Browse every TemplateHub template by industry: SaaS, restaurants, fitness, portfolios, agencies and more. Live previews, plain HTML & CSS, no build step.',
  alternates: { canonical: '/templates' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
