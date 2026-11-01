import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ClerkProvider } from '@clerk/nextjs';
import { FavoritesProvider } from '@/context/FavoritesContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TemplateHub - Pre-Built Website Templates',
  description: 'Access a growing library of professionally designed, fully responsive website templates. Subscribe and start building.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-slate-950 text-white min-h-screen antialiased flex flex-col`}>
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
