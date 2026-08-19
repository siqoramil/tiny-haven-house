'use client'

import Image from 'next/image'
import { Bath, Bed, Heart, MapPin, Square } from 'lucide-react'
import type { HouseSummary } from '@/entities/house'
import { cn, formatPrice } from '@/shared/lib'
import { useFavorites } from '@/features/favorites'
import { LocaleLink as Link, useLanguage } from '@/shared/i18n'

interface HouseCardProps {
  house: HouseSummary
  /** Wide card for the lead slot of a feature grid. */
  featured?: boolean
  /** Horizontal layout used by the listings page in list mode. */
  layout?: 'grid' | 'list'
  priority?: boolean
}

const statusChip: Record<HouseSummary['status'], string> = {
  available: 'chip-available',
  pending: 'chip-pending',
  sold: 'chip-sold',
}

const statusKey: Record<HouseSummary['status'], string> = {
  available: 'houses.available',
  pending: 'houses.pending',
  sold: 'houses.sold',
}

const propertyTypeKey: Record<HouseSummary['propertyType'], string> = {
  cabin: 'houses.types.cabin',
  container: 'houses.types.container',
  modular: 'houses.types.modular',
  traditional: 'houses.types.traditional',
  'a-frame': 'houses.types.aFrame',
}

export default function HouseCard({
  house,
  featured = false,
  layout = 'grid',
  priority = false,
}: HouseCardProps) {
  const { toggleFavorite, isFavorite } = useFavorites()
  const { t } = useLanguage()

  const liked = isFavorite(house.id)
  const isList = layout === 'list'

  const handleToggleFavorite = () => {
    toggleFavorite({
      id: house.id,
      name: house.title,
      price: house.price,
      image: house.images[0],
      location: `${house.location.city}, ${house.location.state}`,
    })
  }

  const specs = [
    { icon: Bed, value: house.bedrooms, label: t('houseDetail.bedrooms') },
    { icon: Bath, value: house.bathrooms, label: t('houseDetail.bathrooms') },
    { icon: Square, value: house.size.toLocaleString(), label: t('houseDetail.sqft') },
  ]

  return (
    <article
      className={cn(
        'card-interactive group relative flex overflow-hidden',
        isList ? 'flex-col sm:flex-row' : 'flex-col',
        // A sold home stays browsable but visibly steps back from the grid.
        house.status === 'sold' && 'opacity-80 hover:opacity-100',
      )}
    >
      <div
        className={cn(
          'img-frame shrink-0',
          isList ? 'aspect-[16/10] sm:aspect-auto sm:w-72 lg:w-80' : 'aspect-[4/3]',
        )}
      >
        <Image
          src={house.images[0]}
          alt={house.title}
          fill
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          sizes={
            isList
              ? '(max-width: 640px) 100vw, 320px'
              : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
          }
        />

        {/* Bottom scrim keeps the hover affordance readable on pale photos. */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/45 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            <span className={statusChip[house.status]}>{t(statusKey[house.status])}</span>
            {featured && house.isFeatured && (
              <span className="chip-clay">{t('houses.featured')}</span>
            )}
          </div>
          <span className="chip-glass">{t(propertyTypeKey[house.propertyType])}</span>
        </div>

        <button
          type="button"
          onClick={handleToggleFavorite}
          aria-pressed={liked}
          aria-label={t(liked ? 'houseDetail.removeFromFavorites' : 'houseDetail.addToFavorites')}
          className={cn(
            'absolute bottom-3 right-3 z-10 grid h-10 w-10 place-items-center rounded-full backdrop-blur-md transition-all duration-200',
            // Always visible once liked — otherwise the state is invisible on touch.
            liked
              ? 'bg-clay-500 text-white'
              : 'bg-white/85 text-stone-600 opacity-0 hover:bg-white hover:text-clay-500 focus-visible:opacity-100 group-hover:opacity-100',
          )}
        >
          <Heart className="h-[18px] w-[18px]" fill={liked ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className={cn('flex flex-1 flex-col p-5', isList && 'sm:p-6')}>
        <span className="mb-2 block font-display text-2xl font-semibold tracking-tight text-ink">
          {formatPrice(house.price)}
        </span>

        <Link
          href={`/houses/${house.slug}`}
          className="after:absolute after:inset-0 after:content-['']"
        >
          <h3 className="text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-primary-700 dark:group-hover:text-primary-300">
            {house.title}
          </h3>
        </Link>

        <div className="mt-1.5 flex items-center gap-1.5 text-sm text-subtle">
          <MapPin className="h-4 w-4 shrink-0" />
          <span className="truncate">
            {house.location.city}, {house.location.state}
          </span>
        </div>

        <p className={cn('mt-3 text-sm leading-relaxed text-muted', isList ? 'line-clamp-3' : 'line-clamp-2')}>
          {house.shortDescription}
        </p>

        {/* `mt-auto` pins the spec rail to the bottom so cards with unequal
            description lengths still line their rails up across a row. */}
        <div className="mt-auto pt-5">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4">
            {specs.map((spec) => (
              <div key={spec.label} className="flex items-center gap-1.5 text-sm">
                <spec.icon className="h-4 w-4 text-subtle" />
                <span className="font-medium text-ink">{spec.value}</span>
                <span className="text-subtle">{spec.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}
