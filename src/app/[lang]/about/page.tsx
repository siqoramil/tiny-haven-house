import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createTranslator, isLanguage } from '@/shared/i18n'
import { getDictionary } from '@/shared/i18n/server'
import { AboutPage } from '@/views/about'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!isLanguage(lang)) return {}

  const t = createTranslator(await getDictionary(lang))
  const title = t('about.title')
  const description = t('about.subtitle')

  return {
    title,
    description,
    openGraph: { title: `${title} | TinyHaven`, description, images: [] },
    twitter: { title: `${title} | TinyHaven`, description, images: [] },
  }
}

export default async function AboutRoute({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLanguage(lang)) notFound()

  return <AboutPage lang={lang} />
}
