import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Inter, Fraunces } from 'next/font/google'
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

// Latin-Extended and Cyrillic are both required: the UI ships in en / ru / uz.
const sans = Inter({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  display: 'swap',
  variable: '--font-sans',
})

// Fraunces is the display voice — a warm, slightly quirky serif that suits
// hand-built homes far better than a high-contrast Didone would.
const display = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  axes: ['SOFT', 'WONK', 'opsz'],
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

// Runs before first paint so the correct palette is on <html> already —
// without it every dark-mode visitor gets a white flash. Wrapped in try/catch
// because localStorage throws outright when cookies are blocked.
const themeScript = `
  (function() {
    try {
      var stored = localStorage.getItem('theme') || 'system';
      var system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      document.documentElement.classList.add(stored === 'system' ? system : stored);
    } catch (e) {}
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
    <html
      lang={language}
      className={`${sans.variable} ${display.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased">
        <AppProviders language={language} dictionary={dictionary}>
          {/* Skip to content link for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary-600 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
          >
            {t('common.skipToContent')}
          </a>

          <Header />

          <main id="main-content">{children}</main>

          <Footer />
        </AppProviders>
      </body>
    </html>
  )
}
