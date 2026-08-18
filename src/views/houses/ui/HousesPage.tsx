'use client'

import { useState, useMemo } from 'react'
import { LayoutGrid, List, SlidersHorizontal } from 'lucide-react'
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

export default function HousesPage({ houses, locations }: HousesPageProps) {
  const { t } = useLanguage()
  const [filters, setFilters] = useState<HouseFiltersState>(emptyHouseFilters)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'size'>('newest')

  // Filter and sort houses
  const filteredHouses = useMemo(() => {
    const result = houses.filter((house) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchesSearch =
          house.title.toLowerCase().includes(searchLower) ||
          house.location.city.toLowerCase().includes(searchLower) ||
          house.location.state.toLowerCase().includes(searchLower) ||
          house.features.some((f) => f.toLowerCase().includes(searchLower)) ||
          house.propertyType.toLowerCase().includes(searchLower)
        if (!matchesSearch) return false
      }

      // Price filters
      if (filters.priceMin && house.price < parseInt(filters.priceMin)) return false
      if (filters.priceMax && house.price > parseInt(filters.priceMax)) return false

      // Size filters
      if (filters.sizeMin && house.size < parseInt(filters.sizeMin)) return false
      if (filters.sizeMax && house.size > parseInt(filters.sizeMax)) return false

      // Bedrooms filter
      if (filters.bedrooms && house.bedrooms < parseInt(filters.bedrooms)) return false

      // Property type filter
      if (filters.propertyType && house.propertyType !== filters.propertyType) return false

      // Location filter
      if (filters.location) {
        const fullLocation = `${house.location.city}, ${house.location.state}`
        if (fullLocation !== filters.location) return false
      }

      return true
    })

    // Sort
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
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    return result
  }, [houses, filters, sortBy])

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 pt-20">
      {/* Page Header */}
      <div className="bg-white dark:bg-neutral-800 border-b border-neutral-100 dark:border-neutral-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 dark:text-white mb-2">
            {t('houses.title')}
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            {t('houses.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-8">
          <HouseFilters onFilterChange={setFilters} locations={locations} />
        </div>

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-neutral-400" />
            <span className="text-neutral-600 dark:text-neutral-400">
              <span className="font-semibold text-neutral-900 dark:text-white">{filteredHouses.length}</span>
              {' '}{t('houses.found')}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-4 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
            >
              <option value="newest">{t('houses.filters.newestFirst')}</option>
              <option value="price-asc">{t('houses.filters.priceLowHigh')}</option>
              <option value="price-desc">{t('houses.filters.priceHighLow')}</option>
              <option value="size">{t('houses.largestFirst')}</option>
            </select>

            {/* View Toggle */}
            <div className="flex items-center bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  'p-2 rounded-md transition-colors',
                  viewMode === 'grid'
                    ? 'bg-primary-50 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400'
                    : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300'
                )}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  'p-2 rounded-md transition-colors',
                  viewMode === 'list'
                    ? 'bg-primary-50 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400'
                    : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300'
                )}
                aria-label="List view"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        {filteredHouses.length > 0 ? (
          <div
            className={cn(
              'grid gap-8',
              viewMode === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1'
            )}
          >
            {filteredHouses.map((house) => (
              <HouseCard key={house.id} house={house} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <SlidersHorizontal className="w-10 h-10 text-neutral-400" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">{t('houses.noResults')}</h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-md mx-auto">
              {t('houses.noResultsDesc')}
            </p>
            <button
              onClick={() => setFilters(emptyHouseFilters)}
              className="px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors"
            >
              {t('houses.filters.clearAll')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
