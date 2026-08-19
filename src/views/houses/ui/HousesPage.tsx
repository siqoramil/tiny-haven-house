'use client'

import { useMemo, useState } from 'react'
import { LayoutGrid, Rows3, SearchX } from 'lucide-react'
import { HouseCard } from '@/widgets/house-card'
import {
  HouseFilters,
  emptyHouseFilters,
  type HouseFiltersState,
} from '@/features/house-filter'
import type { HouseSummary } from '@/entities/house'
import { cn } from '@/shared/lib'
import { useLanguage } from '@/shared/i18n'

interface HousesPageProps {
  houses: HouseSummary[]
  locations: string[]
}

type SortKey = 'newest' | 'price-asc' | 'price-desc' | 'size'

export default function HousesPage({ houses, locations }: HousesPageProps) {
  const { t } = useLanguage()
  const [filters, setFilters] = useState<HouseFiltersState>(emptyHouseFilters)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<SortKey>('newest')

  const filteredHouses = useMemo(() => {
    const result = houses.filter((house) => {
      if (filters.search) {
        const needle = filters.search.toLowerCase()
        const matches =
          house.title.toLowerCase().includes(needle) ||
          house.location.city.toLowerCase().includes(needle) ||
          house.location.state.toLowerCase().includes(needle) ||
          house.features.some((feature) => feature.toLowerCase().includes(needle)) ||
          house.propertyType.toLowerCase().includes(needle)
        if (!matches) return false
      }

      if (filters.priceMin && house.price < Number(filters.priceMin)) return false
      if (filters.priceMax && house.price > Number(filters.priceMax)) return false
      if (filters.sizeMin && house.size < Number(filters.sizeMin)) return false
      if (filters.sizeMax && house.size > Number(filters.sizeMax)) return false
      if (filters.bedrooms && house.bedrooms < Number(filters.bedrooms)) return false
      if (filters.propertyType && house.propertyType !== filters.propertyType) return false

      if (filters.location) {
        const fullLocation = `${house.location.city}, ${house.location.state}`
        if (fullLocation !== filters.location) return false
      }

      return true
    })

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'size':
        result.sort((a, b) => b.size - a.size)
        break
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    return result
  }, [houses, filters, sortBy])

  const viewModes = [
    { value: 'grid', icon: LayoutGrid, label: t('houses.view.grid') },
    { value: 'list', icon: Rows3, label: t('houses.view.list') },
  ] as const

  return (
    <div className="pt-16 lg:pt-20">
      <header className="border-b border-line bg-sunken">
        <div className="shell py-12 lg:py-16">
          <h1 className="font-display text-display-lg font-semibold">{t('houses.title')}</h1>
          <p className="lede mt-3 max-w-2xl">{t('houses.subtitle')}</p>
        </div>
      </header>

      <div className="shell py-10 lg:py-12">
        <HouseFilters filters={filters} onFilterChange={setFilters} locations={locations} />

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            <span className="font-semibold text-ink">{filteredHouses.length}</span>{' '}
            {t('houses.found')}
          </p>

          <div className="flex items-center gap-3">
            <label className="sr-only" htmlFor="sort">
              {t('houses.filters.sortBy')}
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              className="field-select w-auto py-2.5 text-sm"
            >
              <option value="newest">{t('houses.filters.newestFirst')}</option>
              <option value="price-asc">{t('houses.filters.priceLowHigh')}</option>
              <option value="price-desc">{t('houses.filters.priceHighLow')}</option>
              <option value="size">{t('houses.largestFirst')}</option>
            </select>

            <div
              role="group"
              aria-label={t('houses.view.label')}
              className="flex items-center gap-1 rounded-xl border border-line bg-sunken p-1"
            >
              {viewModes.map((mode) => (
                <button
                  key={mode.value}
                  type="button"
                  onClick={() => setViewMode(mode.value)}
                  aria-pressed={viewMode === mode.value}
                  aria-label={mode.label}
                  className={cn(
                    'grid h-8 w-8 place-items-center rounded-lg transition-colors',
                    viewMode === mode.value
                      ? 'bg-surface text-primary-700 shadow-card dark:text-primary-300'
                      : 'text-subtle hover:text-ink',
                  )}
                >
                  <mode.icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredHouses.length > 0 ? (
          <div
            className={cn(
              'mt-8 grid gap-6 lg:gap-8',
              viewMode === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1',
            )}
          >
            {filteredHouses.map((house, index) => (
              <HouseCard
                key={house.id}
                house={house}
                layout={viewMode}
                priority={index < 3}
              />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-3xl border border-dashed border-line px-6 py-20 text-center">
            <span className="icon-tile mx-auto mb-6 h-16 w-16 bg-sunken text-subtle dark:bg-sunken">
              <SearchX className="h-7 w-7" />
            </span>
            <h2 className="text-xl font-semibold">{t('houses.noResults')}</h2>
            <p className="mx-auto mt-2 max-w-md text-muted">{t('houses.noResultsDesc')}</p>
            <button
              type="button"
              onClick={() => setFilters(emptyHouseFilters)}
              className="btn btn-primary mt-7"
            >
              {t('houses.filters.clearAll')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
