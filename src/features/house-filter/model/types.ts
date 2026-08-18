// Raw filter state: every field is a string because it is bound directly to
// form controls. Parsing to numbers happens where the filter is applied.
export interface HouseFiltersState {
  search: string
  priceMin: string
  priceMax: string
  sizeMin: string
  sizeMax: string
  bedrooms: string
  propertyType: string
  location: string
}

export const emptyHouseFilters: HouseFiltersState = {
  search: '',
  priceMin: '',
  priceMax: '',
  sizeMin: '',
  sizeMax: '',
  bedrooms: '',
  propertyType: '',
  location: '',
}
