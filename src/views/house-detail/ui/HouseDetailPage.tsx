'use client'

import {
  Bath,
  Bed,
  Calendar,
  Check,
  ChevronRight,
  Heart,
  Mail,
  MapPin,
  Phone,
  Square,
} from 'lucide-react'
import { GoogleMap, ImageGallery } from '@/shared/ui'
import { ContactForm } from '@/features/contact-form'
import { HouseCard } from '@/widgets/house-card'
import { cn, formatPrice } from '@/shared/lib'
import { LocaleLink as Link, useLanguage } from '@/shared/i18n'
import { useFavorites } from '@/features/favorites'
import type { House, HouseSummary } from '@/entities/house'

interface HouseDetailPageProps {
  house: House
  relatedHouses: HouseSummary[]
}

const statusChip: Record<House['status'], string> = {
  available: 'chip-available',
  pending: 'chip-pending',
  sold: 'chip-sold',
}

const statusKey: Record<House['status'], string> = {
  available: 'houses.available',
  pending: 'houses.pending',
  sold: 'houses.sold',
}

const propertyTypeKey: Record<House['propertyType'], string> = {
  cabin: 'houses.types.cabin',
  container: 'houses.types.container',
  modular: 'houses.types.modular',
  traditional: 'houses.types.traditional',
  'a-frame': 'houses.types.aFrame',
}

export default function HouseDetailPage({ house, relatedHouses }: HouseDetailPageProps) {
  const { t } = useLanguage()
  const { toggleFavorite, isFavorite } = useFavorites()

  const favorite = isFavorite(house.id)

  const handleToggleFavorite = () =>
    toggleFavorite({
      id: house.id,
      name: house.title,
      price: house.price,
      image: house.images[0],
      location: `${house.location.city}, ${house.location.state}`,
    })

  const stats = [
    { icon: Bed, value: house.bedrooms, label: t('houseDetail.bedrooms') },
    { icon: Bath, value: house.bathrooms, label: t('houseDetail.bathrooms') },
    { icon: Square, value: house.size.toLocaleString(), label: t('houseDetail.sqft') },
    { icon: Calendar, value: house.yearBuilt, label: t('houseDetail.yearBuilt') },
  ]

  return (
    <div className="pt-16 lg:pt-20">
      {/* Breadcrumb */}
      <div className="border-b border-line bg-sunken">
        <div className="shell py-3.5">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5 text-sm text-subtle">
              <li>
                <Link href="/" className="transition-colors hover:text-ink">
                  {t('nav.home')}
                </Link>
              </li>
              <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
              <li>
                <Link href="/houses" className="transition-colors hover:text-ink">
                  {t('nav.houses')}
                </Link>
              </li>
              <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
              <li aria-current="page" className="truncate font-medium text-ink">
                {house.title}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="shell py-8 lg:py-12">
        {/* Title block */}
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className={statusChip[house.status]}>{t(statusKey[house.status])}</span>
              <span className="chip-neutral">{t(propertyTypeKey[house.propertyType])}</span>
              {house.isFeatured && <span className="chip-clay">{t('houses.featured')}</span>}
            </div>

            <h1 className="font-display text-display-md font-semibold">{house.title}</h1>

            <p className="mt-2.5 flex items-center gap-2 text-muted">
              <MapPin className="h-[18px] w-[18px] shrink-0 text-subtle" />
              {house.location.city}, {house.location.state}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-4 lg:flex-col lg:items-end">
            <span className="font-display text-4xl font-semibold tracking-tight text-primary-700 dark:text-primary-300">
              {formatPrice(house.price)}
            </span>

            <button
              type="button"
              onClick={handleToggleFavorite}
              aria-pressed={favorite}
              className={cn(
                'btn btn-sm shrink-0',
                favorite
                  ? 'bg-clay-500 text-white hover:bg-clay-600'
                  : 'btn-secondary',
              )}
            >
              <Heart className="h-4 w-4" fill={favorite ? 'currentColor' : 'none'} />
              {t(favorite ? 'houseDetail.removeFromFavorites' : 'houseDetail.addToFavorites')}
            </button>
          </div>
        </div>

        <ImageGallery images={house.images} alt={house.title} />

        {/* Body */}
        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-10 xl:gap-16">
          <div className="min-w-0 space-y-12">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-line bg-sunken p-4 text-center">
                  <stat.icon
                    className="mx-auto mb-2 h-5 w-5 text-primary-600 dark:text-primary-300"
                    aria-hidden
                  />
                  <div className="font-display text-2xl font-semibold text-ink">{stat.value}</div>
                  <div className="mt-0.5 text-xs text-subtle">{stat.label}</div>
                </div>
              ))}
            </div>

            <section>
              <h2 className="mb-4 font-display text-display-sm font-semibold">
                {t('houseDetail.aboutHome')}
              </h2>
              <div className="copy">
                {house.description.split('\n\n').map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </section>

            <ChecklistSection
              title={t('houseDetail.features')}
              items={house.features}
              tone="brand"
            />
            <ChecklistSection
              title={t('houseDetail.amenities')}
              items={house.amenities}
              tone="neutral"
            />

            <section>
              <h2 className="mb-2 font-display text-display-sm font-semibold">
                {t('houseDetail.location')}
              </h2>
              <p className="mb-5 flex items-center gap-2 text-muted">
                <MapPin className="h-[18px] w-[18px] shrink-0 text-subtle" />
                {house.location.city}, {house.location.state}
              </p>
              <GoogleMap
                lat={house.location.coordinates.lat}
                lng={house.location.coordinates.lng}
                title={`${house.title} — ${house.location.city}, ${house.location.state}`}
              />
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="card p-6">
              <h2 className="mb-1 text-lg font-semibold">{t('houseDetail.interested')}</h2>
              <p className="mb-6 text-sm text-subtle">{t('houseDetail.quickContact')}</p>
              <ContactForm houseId={house.id} houseTitle={house.title} compact />
            </div>

            <div className="mt-5 rounded-3xl border border-line bg-sunken p-6">
              <div className="space-y-1">
                <a
                  href="tel:+18001234567"
                  className="flex items-center gap-3 rounded-xl px-2 py-2.5 text-sm text-muted transition-colors hover:bg-surface hover:text-ink"
                >
                  <Phone className="h-[18px] w-[18px] shrink-0 text-primary-600 dark:text-primary-300" />
                  1-800-123-4567
                </a>
                <a
                  href="mailto:hello@tinyhaven.com"
                  className="flex items-center gap-3 rounded-xl px-2 py-2.5 text-sm text-muted transition-colors hover:bg-surface hover:text-ink"
                >
                  <Mail className="h-[18px] w-[18px] shrink-0 text-primary-600 dark:text-primary-300" />
                  hello@tinyhaven.com
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {relatedHouses.length > 0 && (
        <section className="section-tight border-t border-line bg-sunken">
          <div className="shell">
            <h2 className="mb-8 font-display text-display-sm font-semibold">
              {t('houseDetail.relatedHomes')}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {relatedHouses.map((related) => (
                <HouseCard key={related.id} house={related} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

function ChecklistSection({
  title,
  items,
  tone,
}: {
  title: string
  items: string[]
  tone: 'brand' | 'neutral'
}) {
  if (items.length === 0) return null

  return (
    <section>
      <h2 className="mb-5 font-display text-display-sm font-semibold">{title}</h2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span
              className={cn(
                'mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full',
                tone === 'brand'
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/60 dark:text-primary-300'
                  : 'bg-sunken text-subtle',
              )}
            >
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
            <span className="text-sm leading-relaxed text-muted">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
