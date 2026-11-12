import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Builder — Build a Landing Page in Your Browser',
  description: 'Assemble a landing page from ready-made sections, change colours and fonts, and export clean HTML.',
  alternates: { canonical: '/builder' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
