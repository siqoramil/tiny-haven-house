'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Bed, Bath, Square, Heart, ShoppingCart } from 'lucide-react'
import { House } from '@/types'
import { formatPrice, formatSize, cn } from '@/lib/utils'
import { useFavorites } from '@/contexts/FavoritesContext'
import { useCart } from '@/contexts/CartContext'
import { useLanguage } from '@/contexts/LanguageContext'

interface HouseCardProps {
  house: House
  featured?: boolean
}

export default function HouseCard({ house, featured = false }: HouseCardProps) {
  const { toggleFavorite, isFavorite } = useFavorites()
  const { addToCart, isInCart } = useCart()
  const { t } = useLanguage()

  const statusColors = {
    available: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400',
    pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400',
    sold: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400',
  }

  const statusKeys: Record<string, string> = {
    available: 'houses.available',
    pending: 'houses.pending',
    sold: 'houses.sold',
  }

  const propertyTypeKeys: Record<string, string> = {
    cabin: 'houses.types.cabin',
    container: 'houses.types.container',
    modular: 'houses.types.modular',
    traditional: 'houses.types.traditional',
    'a-frame': 'houses.types.aFrame',
  }

  const liked = isFavorite(house.id)
  const inCart = isInCart(house.id)

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite({
      id: house.id,
      name: house.title,
      price: house.price,
      image: house.images[0],
      location: `${house.location.city}, ${house.location.state}`,
    })
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!inCart) {
      addToCart({
        id: house.id,
        name: house.title,
        price: house.price,
        image: house.images[0],
        location: `${house.location.city}, ${house.location.state}`,
      })
    }
  }

  return (
    <Link
      href={`/houses/${house.id}`}
      className={cn(
        'group block bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300',
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
            {t(statusKeys[house.status])}
          </span>
          {house.isFeatured && (
            <span className="px-3 py-1 bg-primary-600 text-white rounded-full text-xs font-medium">
              {t('houses.featured')}
            </span>
          )}
        </div>

        {/* Property Type */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-full text-xs font-medium text-neutral-700 dark:text-neutral-200">
            {t(propertyTypeKeys[house.propertyType])}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleAddToCart}
            className={cn(
              'p-2 backdrop-blur-sm rounded-full transition-colors',
              inCart
                ? 'bg-primary-500 text-white'
                : 'bg-white/90 dark:bg-neutral-800/90 hover:bg-white dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 hover:text-primary-500'
            )}
            aria-label={t('houses.addToCart')}
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
          <button
            onClick={handleToggleFavorite}
            className={cn(
              'p-2 backdrop-blur-sm rounded-full transition-colors',
              liked
                ? 'bg-red-500 text-white'
                : 'bg-white/90 dark:bg-neutral-800/90 hover:bg-white dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 hover:text-red-500'
            )}
            aria-label={t('header.favorites')}
          >
            <Heart className="w-5 h-5" fill={liked ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Price */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold text-neutral-900 dark:text-white">
            {formatPrice(house.price)}
          </span>
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            {formatSize(house.size)}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {house.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400 mb-4">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">
            {house.location.city}, {house.location.state}
          </span>
        </div>

        {/* Features Grid */}
        <div className="flex items-center gap-4 pt-4 border-t border-neutral-100 dark:border-neutral-700">
          <div className="flex items-center gap-1.5">
            <Bed className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
            <span className="text-sm text-neutral-600 dark:text-neutral-300">
              {house.bedrooms} {t('houseDetail.bedrooms')}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
            <span className="text-sm text-neutral-600 dark:text-neutral-300">
              {house.bathrooms} {t('houseDetail.bathrooms')}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Square className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
            <span className="text-sm text-neutral-600 dark:text-neutral-300">
              {house.size} {t('houseDetail.sqft')}
            </span>
          </div>
        </div>

        {/* Description Preview */}
        <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2">
          {house.shortDescription}
        </p>
      </div>
    </Link>
  )
}
