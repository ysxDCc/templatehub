import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ClerkProvider } from '@clerk/nextjs';
import { FavoritesProvider } from '@/context/FavoritesContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TemplateHub — Sovereign Website Template Engine & Registry',
  description: 'The premier subscription marketplace for high-performance, zero-dependency website templates. Standalone HTML5 codebases with in-browser Store Auto-Edit.',
  icons: {
    icon: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark scroll-smooth">
        <body className={`${inter.className} bg-[#070314] text-purple-100 min-h-screen antialiased flex flex-col selection:bg-purple-600 selection:text-white`}>
          <FavoritesProvider>
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </FavoritesProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
