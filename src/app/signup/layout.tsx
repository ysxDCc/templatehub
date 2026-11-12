import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create your free account',
  description: 'Sign up free and download a starter website template.',
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
