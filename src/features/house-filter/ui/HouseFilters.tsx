'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Bed,
  Check,
  ChevronDown,
  DollarSign,
  Home,
  MapPin,
  Search,
  SlidersHorizontal,
  X,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/shared/lib'
import { useLanguage } from '@/shared/i18n'
import { emptyHouseFilters, type HouseFiltersState } from '../model/types'

interface HouseFiltersProps {
  /**
   * Controlled: the listings page owns the state. When the panel kept its own
   * copy, resetting from anywhere else (the empty-results "clear" button) left
   * every control still showing the filters it had just dropped.
   */
  filters: HouseFiltersState
  onFilterChange: (filters: HouseFiltersState) => void
  locations: string[]
}

const propertyTypeValues = [
  { value: '', labelKey: 'houses.filters.allTypes' },
  { value: 'cabin', labelKey: 'houses.types.cabin' },
  { value: 'container', labelKey: 'houses.types.container' },
  { value: 'modular', labelKey: 'houses.types.modular' },
  { value: 'traditional', labelKey: 'houses.types.traditional' },
  { value: 'a-frame', labelKey: 'houses.types.aFrame' },
]

const bedroomOptionValues = [
  { value: '', labelKey: 'houses.bedrooms.any' },
  { value: '1', labelKey: 'houses.bedrooms.onePlus' },
  { value: '2', labelKey: 'houses.bedrooms.twoPlus' },
  { value: '3', labelKey: 'houses.bedrooms.threePlus' },
]

const priceRangeValues = [
  { min: '', max: '', labelKey: 'houses.filters.anyPrice', label: '' },
  { min: '0', max: '150000', labelKey: '', label: 'Under $150k' },
  { min: '150000', max: '200000', labelKey: '', label: '$150k – $200k' },
  { min: '200000', max: '250000', labelKey: '', label: '$200k – $250k' },
  { min: '250000', max: '', labelKey: '', label: '$250k+' },
]

/** Dismiss on outside click / Escape — shared by both dropdowns below. */
function useDismissable<T extends HTMLElement>(isOpen: boolean, close: () => void) {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!isOpen) return

    const handlePointerDown = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) close()
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, close])

  return ref
}

const triggerClass = (isOpen: boolean, isActive: boolean) =>
  cn(
    'flex min-w-[9.5rem] items-center justify-between gap-2 rounded-xl border px-3.5 py-2.5 text-sm transition-colors',
    isOpen
      ? 'border-primary-500 bg-surface ring-4 ring-primary-500/15'
      : isActive
        ? 'border-primary-300 bg-primary-50 dark:border-primary-700 dark:bg-primary-900/40'
        : 'border-line bg-sunken hover:border-stone-300 dark:hover:border-stone-600',
  )

interface SelectOption {
  value: string
  label: string
}

function FilterSelect({
  value,
  onChange,
  options,
  icon: Icon,
  label,
}: {
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  icon: LucideIcon
  label: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useDismissable<HTMLDivElement>(isOpen, () => setIsOpen(false))

  const selected = options.find((option) => option.value === value)
  // The first option is the "any" reset; selecting it is not an active filter.
  const isActive = Boolean(value) && value !== options[0]?.value

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={label}
        className={triggerClass(isOpen, isActive)}
      >
        <span className="flex min-w-0 items-center gap-2">
          <Icon className={cn('h-4 w-4 shrink-0', isActive ? 'text-primary-600 dark:text-primary-300' : 'text-subtle')} />
          <span
            className={cn(
              'truncate font-medium',
              isActive ? 'text-primary-800 dark:text-primary-200' : 'text-muted',
            )}
          >
            {selected?.label ?? label}
          </span>
        </span>
        <ChevronDown
          className={cn('h-4 w-4 shrink-0 text-subtle transition-transform duration-200', isOpen && 'rotate-180')}
        />
      </button>

      {isOpen && (
        <div role="listbox" className="panel absolute left-0 top-full z-40 mt-2 min-w-full animate-pop-in overflow-hidden p-1.5">
          {options.map((option) => {
            const active = value === option.value
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className={cn(
                  'flex w-full items-center gap-2.5 whitespace-nowrap rounded-lg px-3 py-2.5 text-left text-sm transition-colors',
                  active
                    ? 'bg-primary-50 font-medium text-primary-800 dark:bg-primary-900/40 dark:text-primary-200'
                    : 'text-muted hover:bg-sunken hover:text-ink',
                )}
              >
                <span className="flex-1">{option.label}</span>
                {active && <Check className="h-4 w-4 shrink-0" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

function LocationDropdown({
  value,
  onChange,
  locations,
  t,
}: {
  value: string
  onChange: (value: string) => void
  locations: string[]
  t: (key: string) => string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const ref = useDismissable<HTMLDivElement>(isOpen, () => {
    setIsOpen(false)
    setQuery('')
  })

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  const filtered = locations.filter((location) =>
    location.toLowerCase().includes(query.toLowerCase()),
  )

  const select = (next: string) => {
    onChange(next)
    setIsOpen(false)
    setQuery('')
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={t('houses.filters.allLocations')}
        className={cn(triggerClass(isOpen, Boolean(value)), 'min-w-[11rem]')}
      >
        <span className="flex min-w-0 items-center gap-2">
          <MapPin className={cn('h-4 w-4 shrink-0', value ? 'text-primary-600 dark:text-primary-300' : 'text-subtle')} />
          <span
            className={cn(
              'truncate font-medium',
              value ? 'text-primary-800 dark:text-primary-200' : 'text-muted',
            )}
          >
            {value || t('houses.filters.allLocations')}
          </span>
        </span>
        <ChevronDown
          className={cn('h-4 w-4 shrink-0 text-subtle transition-transform duration-200', isOpen && 'rotate-180')}
        />
      </button>

      {isOpen && (
        <div role="listbox" className="panel absolute left-0 top-full z-40 mt-2 w-72 animate-pop-in overflow-hidden">
          <div className="border-b border-line p-2.5">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('houses.filters.searchLocation')}
                className="field py-2.5 pl-9 text-sm"
              />
            </div>
          </div>

          <div className="max-h-64 overflow-y-auto overscroll-contain p-1.5">
            <button
              type="button"
              role="option"
              aria-selected={!value}
              onClick={() => select('')}
              className={cn(
                'flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm transition-colors',
                !value
                  ? 'bg-primary-50 font-medium text-primary-800 dark:bg-primary-900/40 dark:text-primary-200'
                  : 'text-muted hover:bg-sunken hover:text-ink',
              )}
            >
              <span className="flex-1">{t('houses.filters.allLocations')}</span>
              {!value && <Check className="h-4 w-4 shrink-0" />}
            </button>

            {filtered.map((location) => {
              const active = value === location
              const [city, state] = location.split(', ')
              return (
                <button
                  key={location}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => select(location)}
                  className={cn(
                    'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left transition-colors',
                    active ? 'bg-primary-50 dark:bg-primary-900/40' : 'hover:bg-sunken',
                  )}
                >
                  <span className="min-w-0 flex-1">
                    <span
                      className={cn(
                        'block truncate text-sm font-medium',
                        active ? 'text-primary-800 dark:text-primary-200' : 'text-ink',
                      )}
                    >
                      {city}
                    </span>
                    {state && <span className="block truncate text-xs text-subtle">{state}</span>}
                  </span>
                  {active && (
                    <Check className="h-4 w-4 shrink-0 text-primary-600 dark:text-primary-300" />
                  )}
                </button>
              )
            })}

            {filtered.length === 0 && (
              <p className="px-3 py-8 text-center text-sm text-subtle">
                {t('houses.filters.noLocations')}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default function HouseFilters({ filters, onFilterChange, locations }: HouseFiltersProps) {
  const { t } = useLanguage()
  const [isExpanded, setIsExpanded] = useState(false)

  const propertyTypes = propertyTypeValues.map((item) => ({
    value: item.value,
    label: t(item.labelKey),
  }))

  const bedroomOptions = bedroomOptionValues.map((item) => ({
    value: item.value,
    label: t(item.labelKey),
  }))

  const priceRanges = priceRangeValues.map((item) => ({
    // Encoded as "min:max" — a plain hyphen collided with the negative-looking
    // empty range "-", which the trigger then read as an active filter.
    value: `${item.min}:${item.max}`,
    label: item.labelKey ? t(item.labelKey) : item.label,
  }))

  const update = onFilterChange

  const handleChange = (key: keyof HouseFiltersState, value: string) =>
    update({ ...filters, [key]: value })

  const clearFilters = () => update(emptyHouseFilters)

  const activeCount = Object.values(filters).filter((value) => value !== '').length

  return (
    <div className="card overflow-visible">
      <div className="border-b border-line p-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-subtle" />
          <input
            type="search"
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            placeholder={t('houses.filters.search')}
            aria-label={t('houses.filters.search')}
            className="field py-3.5 pl-12"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2.5 p-4">
        <FilterSelect
          value={filters.propertyType}
          onChange={(value) => handleChange('propertyType', value)}
          options={propertyTypes}
          icon={Home}
          label={t('houses.filters.allTypes')}
        />

        <FilterSelect
          value={`${filters.priceMin}:${filters.priceMax}`}
          onChange={(value) => {
            const [priceMin, priceMax] = value.split(':')
            update({ ...filters, priceMin, priceMax })
          }}
          options={priceRanges}
          icon={DollarSign}
          label={t('houses.filters.anyPrice')}
        />

        <FilterSelect
          value={filters.bedrooms}
          onChange={(value) => handleChange('bedrooms', value)}
          options={bedroomOptions}
          icon={Bed}
          label={t('houses.filters.bedrooms')}
        />

        <LocationDropdown
          value={filters.location}
          onChange={(value) => handleChange('location', value)}
          locations={locations}
          t={t}
        />

        <button
          type="button"
          onClick={() => setIsExpanded((open) => !open)}
          aria-expanded={isExpanded}
          className={cn(
            'flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-sm font-medium transition-colors',
            isExpanded
              ? 'border-primary-300 bg-primary-50 text-primary-800 dark:border-primary-700 dark:bg-primary-900/40 dark:text-primary-200'
              : 'border-line bg-sunken text-muted hover:border-stone-300 hover:text-ink dark:hover:border-stone-600',
          )}
        >
          <SlidersHorizontal className="h-4 w-4" />
          {t('houses.filters.moreFilters')}
        </button>

        {activeCount > 0 && (
          <button
            type="button"
            onClick={clearFilters}
            className="ml-auto flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-medium text-clay-600 transition-colors hover:bg-clay-50 dark:text-clay-300 dark:hover:bg-clay-900/30"
          >
            <X className="h-4 w-4" />
            {t('houses.filters.clearAll')}
            <span className="grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-clay-500 px-1 text-[11px] font-bold text-white">
              {activeCount}
            </span>
          </button>
        )}
      </div>

      {isExpanded && (
        <div className="grid gap-5 border-t border-line p-4 sm:grid-cols-2">
          <fieldset>
            <legend className="field-label">{t('houses.filters.size')}</legend>
            <div className="flex items-center gap-2">
              <input
                type="number"
                inputMode="numeric"
                min={0}
                value={filters.sizeMin}
                onChange={(e) => handleChange('sizeMin', e.target.value)}
                placeholder={t('houses.filters.min')}
                aria-label={`${t('houses.filters.size')} — ${t('houses.filters.min')}`}
                className="field py-2.5"
              />
              <span className="text-subtle">–</span>
              <input
                type="number"
                inputMode="numeric"
                min={0}
                value={filters.sizeMax}
                onChange={(e) => handleChange('sizeMax', e.target.value)}
                placeholder={t('houses.filters.max')}
                aria-label={`${t('houses.filters.size')} — ${t('houses.filters.max')}`}
                className="field py-2.5"
              />
            </div>
          </fieldset>

          <fieldset>
            <legend className="field-label">{t('houses.filters.customPrice')}</legend>
            <div className="flex items-center gap-2">
              <input
                type="number"
                inputMode="numeric"
                min={0}
                value={filters.priceMin}
                onChange={(e) => handleChange('priceMin', e.target.value)}
                placeholder={t('houses.filters.min')}
                aria-label={`${t('houses.filters.customPrice')} — ${t('houses.filters.min')}`}
                className="field py-2.5"
              />
              <span className="text-subtle">–</span>
              <input
                type="number"
                inputMode="numeric"
                min={0}
                value={filters.priceMax}
                onChange={(e) => handleChange('priceMax', e.target.value)}
                placeholder={t('houses.filters.max')}
                aria-label={`${t('houses.filters.customPrice')} — ${t('houses.filters.max')}`}
                className="field py-2.5"
              />
            </div>
          </fieldset>
        </div>
      )}
    </div>
  )
}
