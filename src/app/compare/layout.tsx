import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compare Website Templates Side by Side',
  description: 'Compare TemplateHub templates by features, tier, rating and tags to find the right one for your project.',
  alternates: { canonical: '/compare' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
