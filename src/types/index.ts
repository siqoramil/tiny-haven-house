// House-related types
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
  location: {
    city: string
    state: string
    country: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  images: string[]
  features: string[]
  amenities: string[]
  status: 'available' | 'sold' | 'pending'
  yearBuilt: number
  propertyType: 'cabin' | 'container' | 'modular' | 'traditional' | 'a-frame'
  isFeatured: boolean
  createdAt: string
}

// Filter types for the listing page
export interface HouseFilters {
  priceMin?: number
  priceMax?: number
  sizeMin?: number
  sizeMax?: number
  location?: string
  bedrooms?: number
  propertyType?: House['propertyType']
  status?: House['status']
}

// Contact form type
export interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  houseId?: string
}

// Pagination type
export interface PaginationInfo {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
}

// API response types
export interface HouseListResponse {
  houses: House[]
  pagination: PaginationInfo
}

export interface HouseDetailResponse {
  house: House
  relatedHouses: House[]
}

// Navigation types
export interface NavLink {
  label: string
  href: string
}

// Testimonial type
export interface Testimonial {
  id: string
  name: string
  location: string
  quote: string
  image: string
  rating: number
}
