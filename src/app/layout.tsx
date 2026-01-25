import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'
import { CartProvider } from '@/contexts/CartContext'
import { FavoritesProvider } from '@/contexts/FavoritesContext'
import { LanguageProvider } from '@/contexts/LanguageContext'
import './globals.css'

// Font configuration
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

// Default metadata for SEO
export const metadata: Metadata = {
  title: {
    default: 'TinyHaven | Find Your Perfect Tiny House',
    template: '%s | TinyHaven',
  },
  description:
    'Discover beautiful, sustainable tiny houses for sale. From mountain cabins to coastal retreats, find your perfect small home with TinyHaven.',
  keywords: [
    'tiny house',
    'tiny home',
    'small house',
    'cabin',
    'container home',
    'sustainable living',
    'minimalist home',
    'off-grid home',
  ],
  authors: [{ name: 'TinyHaven' }],
  creator: 'TinyHaven',
  publisher: 'TinyHaven',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://tinyhaven.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tinyhaven.com',
    siteName: 'TinyHaven',
    title: 'TinyHaven | Find Your Perfect Tiny House',
    description:
      'Discover beautiful, sustainable tiny houses for sale. From mountain cabins to coastal retreats, find your perfect small home.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TinyHaven - Beautiful Tiny Houses',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TinyHaven | Find Your Perfect Tiny House',
    description:
      'Discover beautiful, sustainable tiny houses for sale. Find your perfect small home.',
    images: ['/og-image.jpg'],
    creator: '@tinyhaven',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

// Script to prevent flash of wrong theme
const themeScript = `
  (function() {
    const theme = localStorage.getItem('theme') || 'system';
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const resolved = theme === 'system' ? systemTheme : theme;
    document.documentElement.classList.add(resolved);
  })();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition-colors">
        <ThemeProvider>
          <LanguageProvider>
            <CartProvider>
              <FavoritesProvider>
                {/* Skip to content link for accessibility */}
                <a
                  href="#main-content"
                  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg"
                >
                  Skip to main content
                </a>

                <Header />

                <main id="main-content" className="min-h-screen">
                  {children}
                </main>

                <Footer />
              </FavoritesProvider>
            </CartProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
