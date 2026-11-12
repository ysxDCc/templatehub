import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import TopBar from '@/components/nav/TopBar';
import BottomTabBar from '@/components/nav/BottomTabBar';
import Footer from '@/components/Footer';
import { ClerkProvider } from '@clerk/nextjs';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, SUPPORT_EMAIL, TEMPLATE_COUNT } from '@/lib/site';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#070314',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${TEMPLATE_COUNT} Fast HTML Website Templates You Can Edit in Your Browser`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    'website templates',
    'HTML templates',
    'landing page templates',
    'no-code website',
    'static site templates',
    'small business website',
  ],
  alternates: { canonical: '/' },
  icons: {
    icon: '/logo.svg',
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    url: SITE_URL,
    title: `${SITE_NAME} — Fast website templates you can edit in your browser`,
    description: SITE_DESCRIPTION,
    images: [{ url: '/previews/astral-aerospace.png', width: 1280, height: 800, alt: 'TemplateHub template preview' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Fast website templates you can edit in your browser`,
    description: SITE_DESCRIPTION,
    images: ['/previews/astral-aerospace.png'],
  },
};

const siteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.svg`,
      email: SUPPORT_EMAIL,
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark scroll-smooth">
        <body className={`${inter.className} bg-bg text-ink min-h-screen antialiased flex flex-col pb-[calc(56px+env(safe-area-inset-bottom))] md:pb-0 selection:bg-purple-600 selection:text-white`}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
          />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-purple-600 focus:text-white"
          >
            Skip to content
          </a>
          <FavoritesProvider>
            <TopBar />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
            <BottomTabBar />
          </FavoritesProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
