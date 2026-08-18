export interface HouseLocation {
  city: string
  state: string
  country: string
  coordinates: {
    lat: number
    lng: number
  }
}

export type HouseStatus = 'available' | 'sold' | 'pending'

export type HousePropertyType = 'cabin' | 'container' | 'modular' | 'traditional' | 'a-frame'

export interface House {
  id: string
  title: string
  slug: string
  description: string
  shortDescription: string
  price: number
  size: number // in square feet
  bedrooms: number
  bathrooms: number
  location: HouseLocation
  images: string[]
  features: string[]
  amenities: string[]
  status: HouseStatus
  yearBuilt: number
  propertyType: HousePropertyType
  isFeatured: boolean
  createdAt: string
}

/**
 * What listing cards and filters need. Drops the long prose fields so a server
 * component can hand listings to a client component without shipping the whole
 * catalogue across the boundary.
 */
export type HouseSummary = Omit<House, 'description' | 'amenities'>
