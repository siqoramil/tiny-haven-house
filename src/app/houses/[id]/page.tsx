import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Calendar,
  Check,
  Share2,
  Heart,
  ChevronLeft,
  Phone,
  Mail,
} from 'lucide-react'
import ImageGallery from '@/components/ImageGallery'
import ContactForm from '@/components/ContactForm'
import HouseCard from '@/components/HouseCard'
import { getHouseById, getRelatedHouses, houses } from '@/data/houses'
import { formatPrice, formatSize } from '@/lib/utils'

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

  const propertyTypeLabels = {
    cabin: 'Cabin',
    container: 'Container Home',
    modular: 'Modular Home',
    traditional: 'Traditional',
    'a-frame': 'A-Frame',
  }

  const statusLabels = {
    available: 'Available',
    pending: 'Sale Pending',
    sold: 'Sold',
  }

  const statusColors = {
    available: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400',
    pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400',
    sold: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400',
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 pt-20">
      {/* Breadcrumb */}
      <div className="bg-neutral-50 dark:bg-neutral-800 border-b border-neutral-100 dark:border-neutral-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors">
              Home
            </Link>
            <span className="text-neutral-300 dark:text-neutral-600">/</span>
            <Link href="/houses" className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors">
              Houses
            </Link>
            <span className="text-neutral-300 dark:text-neutral-600">/</span>
            <span className="text-neutral-900 dark:text-white font-medium">{house.title}</span>
          </nav>
        </div>
      </div>

      {/* Back Button - Mobile */}
      <div className="lg:hidden bg-white dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-700">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <Link
            href="/houses"
            className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to listings
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[house.status]}`}>
                {statusLabels[house.status]}
              </span>
              <span className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full text-sm font-medium">
                {propertyTypeLabels[house.propertyType]}
              </span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 dark:text-white mb-2">
              {house.title}
            </h1>
            <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
              <MapPin className="w-5 h-5 text-neutral-400" />
              <span className="text-lg">
                {house.location.city}, {house.location.state}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-3">
            <div className="text-3xl lg:text-4xl font-bold text-primary-600 dark:text-primary-400">
              {formatPrice(house.price)}
            </div>
            <div className="flex items-center gap-2">
              <button className="p-3 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-xl transition-colors">
                <Heart className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
              </button>
              <button className="p-3 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-xl transition-colors">
                <Share2 className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-12">
          <ImageGallery images={house.images} alt={house.title} />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-12">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-4 text-center">
                <Bed className="w-6 h-6 text-primary-600 dark:text-primary-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-neutral-900 dark:text-white">{house.bedrooms}</div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400">Bedrooms</div>
              </div>
              <div className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-4 text-center">
                <Bath className="w-6 h-6 text-primary-600 dark:text-primary-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-neutral-900 dark:text-white">{house.bathrooms}</div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400">Bathrooms</div>
              </div>
              <div className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-4 text-center">
                <Square className="w-6 h-6 text-primary-600 dark:text-primary-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-neutral-900 dark:text-white">{house.size}</div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400">Sq Ft</div>
              </div>
              <div className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-4 text-center">
                <Calendar className="w-6 h-6 text-primary-600 dark:text-primary-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-neutral-900 dark:text-white">{house.yearBuilt}</div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400">Year Built</div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-display font-bold text-neutral-900 dark:text-white mb-4">
                About This Home
              </h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                {house.description.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-2xl font-display font-bold text-neutral-900 dark:text-white mb-4">
                Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {house.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary-100 dark:bg-primary-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                    </div>
                    <span className="text-neutral-700 dark:text-neutral-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-2xl font-display font-bold text-neutral-900 dark:text-white mb-4">
                Amenities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {house.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                    </div>
                    <span className="text-neutral-700 dark:text-neutral-300">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Map Placeholder */}
            <div>
              <h2 className="text-2xl font-display font-bold text-neutral-900 dark:text-white mb-4">
                Location
              </h2>
              <div className="bg-neutral-100 dark:bg-neutral-800 rounded-2xl aspect-[16/9] flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
                  <p className="text-neutral-600 dark:text-neutral-300 font-medium">
                    {house.location.city}, {house.location.state}
                  </p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                    Map integration available upon request
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
                  Interested in this home?
                </h3>
                <ContactForm houseId={house.id} houseTitle={house.title} />
              </div>

              {/* Quick Contact */}
              <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                  Quick Contact
                </h3>
                <div className="space-y-4">
                  <a
                    href="tel:+18001234567"
                    className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    <span>1-800-123-4567</span>
                  </a>
                  <a
                    href="mailto:hello@tinyhaven.com"
                    className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span>hello@tinyhaven.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Houses */}
      {relatedHouses.length > 0 && (
        <section className="bg-neutral-50 dark:bg-neutral-800 py-16 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-display font-bold text-neutral-900 dark:text-white mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedHouses.map((relatedHouse) => (
                <HouseCard key={relatedHouse.id} house={relatedHouse} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
