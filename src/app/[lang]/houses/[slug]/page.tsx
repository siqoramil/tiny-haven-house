import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import {
  getHouseById,
  getHouseBySlug,
  getRelatedHouses,
  toHouseSummary,
  houses,
} from '@/entities/house'
import { isLanguage, languageCodes } from '@/shared/i18n'
import { HouseDetailPage } from '@/views/house-detail'

interface PageProps {
  params: Promise<{ lang: string; slug: string }>
}

// Every listing, in every language
export function generateStaticParams() {
  return languageCodes.flatMap((lang) =>
    houses.map((house) => ({ lang, slug: house.slug })),
  )
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const house = getHouseBySlug(slug)

  if (!house) {
    return { title: 'House Not Found' }
  }

  return {
    title: house.title,
    description: house.shortDescription,
    openGraph: {
      title: `${house.title} | TinyHaven`,
      description: house.shortDescription,
      images: [{ url: house.images[0], width: 1200, height: 630, alt: house.title }],
    },
  }
}

export default async function HouseDetailRoute({ params }: PageProps) {
  const { lang, slug } = await params
  if (!isLanguage(lang)) notFound()

  const house = getHouseBySlug(slug)

  if (!house) {
    // Keep the old /houses/<id> links alive by sending them to the slug URL.
    const byId = getHouseById(slug)
    if (byId) permanentRedirect(`/${lang}/houses/${byId.slug}`)
    notFound()
  }

  return <HouseDetailPage house={house} relatedHouses={getRelatedHouses(house.id, 3).map(toHouseSummary)} />
}
