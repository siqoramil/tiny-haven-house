'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, SlidersHorizontal, X, ChevronDown, MapPin, Check, Home, DollarSign, Bed, LucideIcon } from 'lucide-react'
import { cn } from '@/shared/lib'
import { useLanguage } from '@/shared/i18n'
import { emptyHouseFilters, type HouseFiltersState } from '../model/types'

interface HouseFiltersProps {
  onFilterChange: (filters: HouseFiltersState) => void
  locations: string[]
}

// These will be translated dynamically in the component
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
  { min: '150000', max: '200000', labelKey: '', label: '$150k - $200k' },
  { min: '200000', max: '250000', labelKey: '', label: '$200k - $250k' },
  { min: '250000', max: '', labelKey: '', label: '$250k+' },
]

// Universal Custom Select Component
interface SelectOption {
  value: string
  label: string
  description?: string
}

interface CustomSelectProps {
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  placeholder: string
  icon: LucideIcon
}

function CustomSelect({ value, onChange, options, placeholder, icon: Icon }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedOption = options.find(opt => opt.value === value)
  const displayValue = selectedOption?.label || placeholder

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 pl-4 pr-3 py-2.5 rounded-xl text-sm transition-all duration-200',
          'border-2 min-w-[140px] justify-between',
          isOpen
            ? 'bg-white border-primary-500 ring-4 ring-primary-100 shadow-lg'
            : value
              ? 'bg-primary-50 border-primary-200'
              : 'bg-neutral-50 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-100'
        )}
      >
        <div className="flex items-center gap-2">
          <Icon className={cn(
            'w-4 h-4 transition-colors',
            value ? 'text-primary-500' : 'text-neutral-400'
          )} />
          <span className={cn(
            'font-medium',
            value ? 'text-primary-700' : 'text-neutral-600'
          )}>
            {displayValue}
          </span>
        </div>
        <ChevronDown className={cn(
          'w-4 h-4 transition-transform duration-200',
          isOpen ? 'rotate-180 text-primary-500' : 'text-neutral-400'
        )} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 min-w-[200px] bg-white rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="py-2">
            {options.map((option) => {
              const isSelected = value === option.value
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value)
                    setIsOpen(false)
                  }}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all',
                    isSelected
                      ? 'bg-primary-50'
                      : 'hover:bg-neutral-50'
                  )}
                >
                  <div className={cn(
                    'w-8 h-8 rounded-lg flex items-center justify-center transition-colors',
                    isSelected ? 'bg-primary-100' : 'bg-neutral-100'
                  )}>
                    <Icon className={cn(
                      'w-4 h-4',
                      isSelected ? 'text-primary-600' : 'text-neutral-500'
                    )} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={cn(
                      'font-medium block',
                      isSelected ? 'text-primary-700' : 'text-neutral-700'
                    )}>
                      {option.label}
                    </span>
                    {option.description && (
                      <span className="text-xs text-neutral-500">{option.description}</span>
                    )}
                  </div>
                  {isSelected && <Check className="w-5 h-5 text-primary-600 flex-shrink-0" />}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

// Custom Location Dropdown Component
interface LocationDropdownProps {
  value: string
  onChange: (value: string) => void
  locations: string[]
  t: (key: string) => string
}

function LocationDropdown({ value, onChange, locations, t }: LocationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchQuery('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const filteredLocations = locations.filter(location =>
    location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const displayValue = value || t('houses.filters.allLocations')

  return (
    <div ref={dropdownRef} className="relative">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 pl-4 pr-3 py-2.5 rounded-xl text-sm transition-all duration-200',
          'border-2 min-w-[180px] justify-between',
          isOpen
            ? 'bg-white border-primary-500 ring-4 ring-primary-100 shadow-lg'
            : value
              ? 'bg-primary-50 border-primary-200 text-primary-700'
              : 'bg-neutral-50 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-100'
        )}
      >
        <div className="flex items-center gap-2">
          <MapPin className={cn(
            'w-4 h-4 transition-colors',
            value ? 'text-primary-500' : 'text-neutral-400'
          )} />
          <span className={cn(
            'font-medium truncate max-w-[120px]',
            value ? 'text-primary-700' : 'text-neutral-600'
          )}>
            {displayValue}
          </span>
        </div>
        <ChevronDown className={cn(
          'w-4 h-4 transition-transform duration-200',
          isOpen ? 'rotate-180 text-primary-500' : 'text-neutral-400'
        )} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Search Input */}
          <div className="p-3 border-b border-neutral-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                ref={inputRef}
                type="text"
                placeholder={t('header.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Options List */}
          <div className="max-h-64 overflow-y-auto overscroll-contain">
            {/* All Locations Option */}
            <button
              type="button"
              onClick={() => {
                onChange('')
                setIsOpen(false)
                setSearchQuery('')
              }}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 text-left transition-colors',
                !value
                  ? 'bg-primary-50 text-primary-700'
                  : 'hover:bg-neutral-50 text-neutral-700'
              )}
            >
              <div className={cn(
                'w-8 h-8 rounded-lg flex items-center justify-center',
                !value ? 'bg-primary-100' : 'bg-neutral-100'
              )}>
                <MapPin className={cn(
                  'w-4 h-4',
                  !value ? 'text-primary-600' : 'text-neutral-500'
                )} />
              </div>
              <div className="flex-1">
                <span className="font-medium">{t('houses.filters.allLocations')}</span>
              </div>
              {!value && <Check className="w-5 h-5 text-primary-600" />}
            </button>

            {/* Divider */}
            <div className="h-px bg-neutral-100 mx-4" />

            {/* Location Options */}
            {filteredLocations.length > 0 ? (
              filteredLocations.map((location) => {
                const isSelected = value === location
                const [city, state] = location.split(', ')
                return (
                  <button
                    key={location}
                    type="button"
                    onClick={() => {
                      onChange(location)
                      setIsOpen(false)
                      setSearchQuery('')
                    }}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 text-left transition-all',
                      isSelected
                        ? 'bg-primary-50'
                        : 'hover:bg-neutral-50'
                    )}
                  >
                    <div className={cn(
                      'w-8 h-8 rounded-lg flex items-center justify-center transition-colors',
                      isSelected ? 'bg-primary-100' : 'bg-neutral-100 group-hover:bg-neutral-200'
                    )}>
                      <MapPin className={cn(
                        'w-4 h-4',
                        isSelected ? 'text-primary-600' : 'text-neutral-500'
                      )} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={cn(
                        'font-medium block truncate',
                        isSelected ? 'text-primary-700' : 'text-neutral-700'
                      )}>
                        {city}
                      </span>
                      {state && (
                        <span className="text-xs text-neutral-500">{state}</span>
                      )}
                    </div>
                    {isSelected && <Check className="w-5 h-5 text-primary-600 flex-shrink-0" />}
                  </button>
                )
              })
            ) : (
              <div className="px-4 py-8 text-center">
                <MapPin className="w-8 h-8 text-neutral-300 mx-auto mb-2" />
                <p className="text-sm text-neutral-500">{t('common.error')}</p>
              </div>
            )}
          </div>

          {/* Footer */}
          {value && (
            <div className="p-3 border-t border-neutral-100 bg-neutral-50">
              <button
                type="button"
                onClick={() => {
                  onChange('')
                  setIsOpen(false)
                  setSearchQuery('')
                }}
                className="w-full py-2 text-sm text-neutral-600 hover:text-neutral-800 transition-colors"
              >
                {t('houses.filters.clearAll')}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function HouseFilters({ onFilterChange, locations }: HouseFiltersProps) {
  const { t } = useLanguage()
  const [isExpanded, setIsExpanded] = useState(false)
  const [filters, setFilters] = useState<HouseFiltersState>(emptyHouseFilters)

  // Translate options dynamically
  const propertyTypes = propertyTypeValues.map(item => ({
    value: item.value,
    label: t(item.labelKey)
  }))

  const bedroomOptions = bedroomOptionValues.map(item => ({
    value: item.value,
    label: t(item.labelKey)
  }))

  const priceRanges = priceRangeValues.map(item => ({
    min: item.min,
    max: item.max,
    label: item.labelKey ? t(item.labelKey) : item.label || ''
  }))

  const handleChange = (key: keyof HouseFiltersState, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handlePriceRangeChange = (min: string, max: string) => {
    const newFilters = { ...filters, priceMin: min, priceMax: max }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    setFilters(emptyHouseFilters)
    onFilterChange(emptyHouseFilters)
  }

  const hasActiveFilters = Object.values(filters).some((v) => v !== '')

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-700">
      {/* Search Bar */}
      <div className="p-4 border-b border-neutral-100 dark:border-neutral-700">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder={t('houses.filters.search')}
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-neutral-900 dark:text-white placeholder-neutral-500"
          />
        </div>
      </div>

      {/* Quick Filters */}
      <div className="p-4 pb-6 flex flex-wrap items-center gap-3 overflow-visible">
        {/* Property Type */}
        <CustomSelect
          value={filters.propertyType}
          onChange={(value) => handleChange('propertyType', value)}
          options={propertyTypes}
          placeholder={t('houses.filters.allTypes')}
          icon={Home}
        />

        {/* Price Range */}
        <CustomSelect
          value={`${filters.priceMin}-${filters.priceMax}`}
          onChange={(value) => {
            const [min, max] = value.split('-')
            handlePriceRangeChange(min, max)
          }}
          options={priceRanges.map(r => ({ value: `${r.min}-${r.max}`, label: r.label }))}
          placeholder={t('houses.filters.anyPrice')}
          icon={DollarSign}
        />

        {/* Bedrooms */}
        <CustomSelect
          value={filters.bedrooms}
          onChange={(value) => handleChange('bedrooms', value)}
          options={bedroomOptions}
          placeholder={t('houses.filters.bedrooms')}
          icon={Bed}
        />

        {/* Location */}
        <LocationDropdown
          value={filters.location}
          onChange={(value) => handleChange('location', value)}
          locations={locations}
          t={t}
        />

        {/* More Filters Toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            'flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
            isExpanded
              ? 'bg-primary-50 dark:bg-primary-900/50 text-primary-700 dark:text-primary-400'
              : 'bg-neutral-50 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-600'
          )}
        >
          <SlidersHorizontal className="w-4 h-4" />
          {t('houses.filters.moreFilters')}
        </button>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1.5 px-3 py-2.5 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
          >
            <X className="w-4 h-4" />
            {t('houses.filters.clearAll')}
          </button>
        )}
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="p-4 pt-0 border-t border-neutral-100 dark:border-neutral-700 mt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {/* Size Range */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                {t('houses.filters.size')}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.sizeMin}
                  onChange={(e) => handleChange('sizeMin', e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-neutral-900 dark:text-white placeholder-neutral-500"
                />
                <span className="text-neutral-400">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.sizeMax}
                  onChange={(e) => handleChange('sizeMax', e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-neutral-900 dark:text-white placeholder-neutral-500"
                />
              </div>
            </div>

            {/* Custom Price Range */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                {t('houses.filters.customPrice')}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min $"
                  value={filters.priceMin}
                  onChange={(e) => handleChange('priceMin', e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-neutral-900 dark:text-white placeholder-neutral-500"
                />
                <span className="text-neutral-400">-</span>
                <input
                  type="number"
                  placeholder="Max $"
                  value={filters.priceMax}
                  onChange={(e) => handleChange('priceMax', e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-neutral-900 dark:text-white placeholder-neutral-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
