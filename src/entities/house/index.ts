export type {
  House,
  HouseSummary,
  HouseLocation,
  HouseStatus,
  HousePropertyType,
} from './model/types'
export {
  houses,
  toHouseSummary,
  getHouseSummaries,
  getHouseById,
  getHouseBySlug,
  getFeaturedHouses,
  getRelatedHouses,
  getUniqueLocations,
} from './api/houses'
