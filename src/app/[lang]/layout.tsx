import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Inter, Playfair_Display } from 'next/font/google'
import { Header } from '@/widgets/header'
import { Footer } from '@/widgets/footer'
import {
  createTranslator,
  defaultLanguage,
  isLanguage,
  languageCodes,
  type Language,
} from '@/shared/i18n'
import { getDictionary } from '@/shared/i18n/server'
import { AppProviders } from '../providers'
import '../styles/globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tinyhaven.com'

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

// Prerender one tree per language
export function generateStaticParams() {
  return languageCodes.map((lang) => ({ lang }))
}

// Per-language metadata, including hreflang alternates
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const language: Language = isLanguage(lang) ? lang : defaultLanguage
  const t = createTranslator(await getDictionary(language))
  const title = t('meta.title')
  const description = t('meta.description')

  return {
    title: {
      default: title,
      template: '%s | TinyHaven',
    },
    description,
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
    // Set NEXT_PUBLIC_SITE_URL per environment so preview deploys resolve
    // their own absolute URLs instead of pointing every card at production.
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `/${language}`,
      languages: Object.fromEntries(
        languageCodes.map((code) => [code, `/${code}`]),
      ),
    },
    openGraph: {
      type: 'website',
      locale: language,
      url: `${siteUrl}/${language}`,
      siteName: 'TinyHaven',
      title,
      description,
      // Image comes from [lang]/opengraph-image.tsx
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
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
    // `verification` intentionally omitted: an unset block is correct, a
    // placeholder token is a broken tag. Add it back with the real value
    // from Search Console when the domain is claimed.
  }
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

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLanguage(lang)) notFound()

  const language: Language = lang
  const dictionary = await getDictionary(language)
  const t = createTranslator(dictionary)

  return (
    <html lang={language} className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition-colors">
        <AppProviders language={language} dictionary={dictionary}>
          {/* Skip to content link for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg"
          >
            {t('common.skipToContent')}
          </a>

          <Header />

          <main id="main-content" className="min-h-screen">
            {children}
          </main>

          <Footer />
        </AppProviders>
      </body>
    </html>
  )
}
