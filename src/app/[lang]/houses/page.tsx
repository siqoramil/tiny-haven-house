import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getHouseSummaries, getUniqueLocations } from '@/entities/house'
import { createTranslator, isLanguage } from '@/shared/i18n'
import { getDictionary } from '@/shared/i18n/server'
import { HousesPage } from '@/views/houses'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!isLanguage(lang)) return {}
  const t = createTranslator(await getDictionary(lang))
  const title = t('houses.title')
  const description = t('houses.subtitle')

  return {
    title,
    description,
    openGraph: {
      title: `${title} | TinyHaven`,
      description,
      images: [],
    },
    twitter: {
      title: `${title} | TinyHaven`,
      description,
      images: [],
    },
  }
}

export default async function HousesRoute({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLanguage(lang)) notFound()

  // The listing UI is interactive, so it stays a client component — but the
  // catalogue itself is read here and handed over as trimmed summaries.
  return <HousesPage houses={getHouseSummaries()} locations={getUniqueLocations()} />
}
