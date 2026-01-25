'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Bed, Bath, Square, Heart } from 'lucide-react'
import { House } from '@/types'
import { formatPrice, formatSize, cn } from '@/lib/utils'

interface HouseCardProps {
  house: House
  featured?: boolean
}

export default function HouseCard({ house, featured = false }: HouseCardProps) {
  const statusColors = {
    available: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    sold: 'bg-red-100 text-red-700',
  }

  const propertyTypeLabels = {
    cabin: 'Cabin',
    container: 'Container',
    modular: 'Modular',
    traditional: 'Traditional',
    'a-frame': 'A-Frame',
  }

  return (
    <Link
      href={`/houses/${house.id}`}
      className={cn(
        'group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300',
        featured && 'ring-2 ring-primary-500'
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={house.images[0]}
          alt={house.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Status Badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className={cn(
            'px-3 py-1 rounded-full text-xs font-medium capitalize',
            statusColors[house.status]
          )}>
            {house.status}
          </span>
          {house.isFeatured && (
            <span className="px-3 py-1 bg-primary-600 text-white rounded-full text-xs font-medium">
              Featured
            </span>
          )}
        </div>

        {/* Property Type */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-neutral-700">
            {propertyTypeLabels[house.propertyType]}
          </span>
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault()
            // Handle favorite toggle
          }}
          className="absolute bottom-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
          aria-label="Add to favorites"
        >
          <Heart className="w-5 h-5 text-neutral-600 hover:text-red-500 transition-colors" />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Price */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold text-neutral-900">
            {formatPrice(house.price)}
          </span>
          <span className="text-sm text-neutral-500">
            {formatSize(house.size)}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
          {house.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-neutral-500 mb-4">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">
            {house.location.city}, {house.location.state}
          </span>
        </div>

        {/* Features Grid */}
        <div className="flex items-center gap-4 pt-4 border-t border-neutral-100">
          <div className="flex items-center gap-1.5">
            <Bed className="w-4 h-4 text-neutral-400" />
            <span className="text-sm text-neutral-600">
              {house.bedrooms} {house.bedrooms === 1 ? 'Bed' : 'Beds'}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="w-4 h-4 text-neutral-400" />
            <span className="text-sm text-neutral-600">
              {house.bathrooms} {house.bathrooms === 1 ? 'Bath' : 'Baths'}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Square className="w-4 h-4 text-neutral-400" />
            <span className="text-sm text-neutral-600">
              {house.size} sqft
            </span>
          </div>
        </div>

        {/* Description Preview */}
        <p className="mt-3 text-sm text-neutral-500 line-clamp-2">
          {house.shortDescription}
        </p>
      </div>
    </Link>
  )
}
