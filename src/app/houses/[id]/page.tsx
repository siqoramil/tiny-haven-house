import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getHouseById, getRelatedHouses, houses } from '@/data/houses'
import HouseDetailContent from '@/components/HouseDetailContent'

interface PageProps {
  params: Promise<{ id: string }>
}

// Generate static params for all houses
export async function generateStaticParams() {
  return houses.map((house) => ({
    id: house.id,
  }))
}

// Generate metadata for each house page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const house = getHouseById(id)

  if (!house) {
    return {
      title: 'House Not Found',
    }
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

export default async function HouseDetailPage({ params }: PageProps) {
  const { id } = await params
  const house = getHouseById(id)

  if (!house) {
    notFound()
  }

  const relatedHouses = getRelatedHouses(house.id, 3)

  return <HouseDetailContent house={house} relatedHouses={relatedHouses} />
}
