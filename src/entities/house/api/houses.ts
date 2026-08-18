import type { House, HouseSummary } from '../model/types'

// Mock catalogue. Swap this module for a real data source without touching
// any consumer: everything imports through the entity's public API (index.ts).
export const houses: House[] = [
  {
    id: '1',
    title: 'Mountain View Cabin',
    slug: 'mountain-view-cabin',
    description: `Experience the perfect blend of rustic charm and modern comfort in this stunning mountain cabin. Nestled among towering pines with breathtaking mountain views, this tiny house offers an escape from the everyday hustle.

The interior features high-quality finishes including reclaimed wood accents, a chef's kitchen with premium appliances, and large windows that flood the space with natural light. The loft bedroom provides a cozy retreat with views of the stars through the skylight.

Outside, enjoy the wraparound deck perfect for morning coffee or evening stargazing. The property includes 2 acres of private land with hiking trails leading to a pristine mountain stream.`,
    shortDescription: 'Rustic mountain cabin with panoramic views and modern amenities nestled in the Colorado Rockies.',
    price: 189000,
    size: 450,
    bedrooms: 1,
    bathrooms: 1,
    location: {
      city: 'Aspen',
      state: 'Colorado',
      country: 'USA',
      coordinates: {
        lat: 39.1911,
        lng: -106.8175,
      },
    },
    images: [
      'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1200',
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200',
    ],
    features: [
      'Panoramic mountain views',
      'Wood-burning fireplace',
      'Loft bedroom with skylight',
      'Solar power system',
      'Rainwater collection',
    ],
    amenities: [
      'Full kitchen',
      'High-speed WiFi',
      'Heating system',
      'Washer/Dryer combo',
      'Outdoor shower',
    ],
    status: 'available',
    yearBuilt: 2023,
    propertyType: 'cabin',
    isFeatured: true,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'Coastal Retreat Container Home',
    slug: 'coastal-retreat-container',
    description: `This innovative container home redefines sustainable coastal living. Built from two repurposed shipping containers, this eco-friendly dwelling offers stunning ocean views and a minimal environmental footprint.

The open-concept living area seamlessly connects to a spacious deck, perfect for watching sunsets over the Pacific. Floor-to-ceiling windows and a modern interior design create an airy, light-filled atmosphere.

Features include a state-of-the-art kitchen, spa-like bathroom, and a rooftop terrace. The home is completely off-grid with solar panels, battery storage, and a greywater recycling system.`,
    shortDescription: 'Eco-friendly container home with stunning ocean views and complete off-grid capabilities.',
    price: 145000,
    size: 520,
    bedrooms: 2,
    bathrooms: 1,
    location: {
      city: 'Big Sur',
      state: 'California',
      country: 'USA',
      coordinates: {
        lat: 36.2704,
        lng: -121.8081,
      },
    },
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200',
    ],
    features: [
      'Ocean views',
      'Rooftop terrace',
      'Solar power system',
      'Greywater recycling',
      'Floor-to-ceiling windows',
    ],
    amenities: [
      'Modern kitchen',
      'Outdoor deck',
      'Built-in storage',
      'USB charging ports',
      'Smart home system',
    ],
    status: 'available',
    yearBuilt: 2024,
    propertyType: 'container',
    isFeatured: true,
    createdAt: '2024-02-20',
  },
  {
    id: '3',
    title: 'Forest A-Frame Hideaway',
    slug: 'forest-a-frame-hideaway',
    description: `Step into this enchanting A-frame nestled deep in the Pacific Northwest forest. The dramatic architecture and floor-to-ceiling windows create a space where nature becomes your interior design.

The main floor features an open living and dining area with a wood stove as the centerpiece. The kitchen includes modern appliances and ample counter space. Upstairs, the cozy loft bedroom offers treetop views and the soothing sounds of the forest.

A wraparound deck extends your living space outdoors, complete with a hot tub for relaxing under the stars. The property is surrounded by old-growth forest with direct trail access.`,
    shortDescription: 'Iconic A-frame design surrounded by old-growth forest with modern comforts and a private hot tub.',
    price: 225000,
    size: 600,
    bedrooms: 1,
    bathrooms: 1,
    location: {
      city: 'Portland',
      state: 'Oregon',
      country: 'USA',
      coordinates: {
        lat: 45.5152,
        lng: -122.6784,
      },
    },
    images: [
      'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1200',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200',
    ],
    features: [
      'Iconic A-frame design',
      'Floor-to-ceiling windows',
      'Wood stove',
      'Private hot tub',
      'Old-growth forest setting',
    ],
    amenities: [
      'Full kitchen',
      'WiFi',
      'Heating',
      'Outdoor fire pit',
      'BBQ grill',
    ],
    status: 'available',
    yearBuilt: 2022,
    propertyType: 'a-frame',
    isFeatured: true,
    createdAt: '2024-01-10',
  },
  {
    id: '4',
    title: 'Desert Oasis Modular Home',
    slug: 'desert-oasis-modular',
    description: `Discover minimalist luxury in this stunning desert modular home. Designed to harmonize with the surrounding landscape, this home offers a serene retreat with unobstructed views of the desert sky.

The interior features clean lines, natural materials, and thoughtful design that maximizes every square foot. Large sliding glass doors blur the line between indoor and outdoor living, opening onto a private courtyard with a plunge pool.

Built for off-grid living, the home includes a complete solar array, battery storage, and water harvesting systems. Experience true tranquility while maintaining modern comforts.`,
    shortDescription: 'Minimalist modular home with desert views, private plunge pool, and complete off-grid systems.',
    price: 198000,
    size: 480,
    bedrooms: 2,
    bathrooms: 1,
    location: {
      city: 'Joshua Tree',
      state: 'California',
      country: 'USA',
      coordinates: {
        lat: 34.1347,
        lng: -116.3131,
      },
    },
    images: [
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200',
    ],
    features: [
      'Desert views',
      'Private plunge pool',
      'Courtyard',
      'Solar power',
      'Water harvesting',
    ],
    amenities: [
      'Chef kitchen',
      'AC/Heating',
      'Smart home',
      'Fire pit',
      'Stargazing deck',
    ],
    status: 'available',
    yearBuilt: 2024,
    propertyType: 'modular',
    isFeatured: false,
    createdAt: '2024-03-05',
  },
  {
    id: '5',
    title: 'Lakefront Traditional Tiny',
    slug: 'lakefront-traditional-tiny',
    description: `Wake up to stunning lake views in this charming traditional tiny home. Situated on a quiet lakefront lot, this home offers the perfect blend of classic design and tiny living efficiency.

The craftsman-style exterior gives way to a thoughtfully designed interior featuring custom cabinetry, a functional kitchen, and a cozy living area with large windows overlooking the water. The sleeping loft includes built-in storage and lake views.

Outside, a private dock provides direct lake access for swimming, fishing, or kayaking. The screened porch offers bug-free enjoyment of summer evenings by the water.`,
    shortDescription: 'Craftsman-style tiny home on a private lakefront lot with dock access and screened porch.',
    price: 175000,
    size: 380,
    bedrooms: 1,
    bathrooms: 1,
    location: {
      city: 'Lake Tahoe',
      state: 'California',
      country: 'USA',
      coordinates: {
        lat: 39.0968,
        lng: -120.0324,
      },
    },
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200',
    ],
    features: [
      'Lakefront location',
      'Private dock',
      'Screened porch',
      'Custom cabinetry',
      'Craftsman design',
    ],
    amenities: [
      'Full kitchen',
      'Heating',
      'Kayak storage',
      'Fire pit',
      'Outdoor dining',
    ],
    status: 'pending',
    yearBuilt: 2021,
    propertyType: 'traditional',
    isFeatured: false,
    createdAt: '2024-02-01',
  },
  {
    id: '6',
    title: 'Urban Micro Loft',
    slug: 'urban-micro-loft',
    description: `Live large in this sleek urban micro loft located in the heart of downtown Austin. This modern tiny home proves that small living doesn't mean sacrificing style or convenience.

The industrial-chic design features exposed brick, polished concrete floors, and floor-to-ceiling windows with city views. A Murphy bed system transforms the living area, while the kitchen includes high-end appliances and a breakfast bar.

Located in a vibrant neighborhood, you're steps away from restaurants, galleries, and entertainment. The building includes secure parking and a rooftop community garden.`,
    shortDescription: 'Industrial-chic micro loft in downtown Austin with city views and walkable neighborhood.',
    price: 165000,
    size: 350,
    bedrooms: 1,
    bathrooms: 1,
    location: {
      city: 'Austin',
      state: 'Texas',
      country: 'USA',
      coordinates: {
        lat: 30.2672,
        lng: -97.7431,
      },
    },
    images: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200',
      'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=1200',
      'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=1200',
    ],
    features: [
      'City views',
      'Exposed brick',
      'Murphy bed',
      'Rooftop access',
      'Walkable location',
    ],
    amenities: [
      'Modern kitchen',
      'AC/Heating',
      'In-unit laundry',
      'Secure parking',
      'High-speed internet',
    ],
    status: 'available',
    yearBuilt: 2023,
    propertyType: 'modular',
    isFeatured: false,
    createdAt: '2024-01-25',
  },
  {
    id: '7',
    title: 'Scandinavian Woodland Cabin',
    slug: 'scandinavian-woodland-cabin',
    description: `Embrace hygge in this Scandinavian-inspired woodland cabin. The minimalist design emphasizes natural materials, abundant light, and a connection to the surrounding forest.

The bright interior features white-washed wood walls, large windows, and carefully curated furnishings. The efficient layout includes a compact kitchen, dining nook, living area, and a sleeping loft accessible by a beautiful wooden ladder.

Set on 5 acres of private woodland, the property includes walking trails, a meditation garden, and a wood-fired sauna. Experience the art of simple, intentional living.`,
    shortDescription: 'Minimalist Scandinavian cabin on 5 acres of private woodland with sauna and meditation garden.',
    price: 210000,
    size: 420,
    bedrooms: 1,
    bathrooms: 1,
    location: {
      city: 'Burlington',
      state: 'Vermont',
      country: 'USA',
      coordinates: {
        lat: 44.4759,
        lng: -73.2121,
      },
    },
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200',
      'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1200',
    ],
    features: [
      'Scandinavian design',
      'Wood-fired sauna',
      '5 acres woodland',
      'Meditation garden',
      'Walking trails',
    ],
    amenities: [
      'Full kitchen',
      'Radiant heating',
      'Composting toilet',
      'Outdoor shower',
      'Fire pit',
    ],
    status: 'available',
    yearBuilt: 2022,
    propertyType: 'cabin',
    isFeatured: true,
    createdAt: '2024-02-15',
  },
  {
    id: '8',
    title: 'Beachfront Container Villa',
    slug: 'beachfront-container-villa',
    description: `Live the beach life in this stunning two-container villa just steps from the sand. This innovative home combines sustainable construction with luxury coastal living.

The split-level design includes a main living area with open kitchen and living room, plus a separate bedroom container connected by a covered deck. Floor-to-ceiling glass doors on both levels provide unobstructed ocean views.

Features include a rooftop deck perfect for sunset viewing, outdoor shower, and direct beach access. The fully off-grid systems mean sustainable living without sacrificing comfort.`,
    shortDescription: 'Two-container villa with direct beach access, rooftop deck, and panoramic ocean views.',
    price: 275000,
    size: 640,
    bedrooms: 2,
    bathrooms: 2,
    location: {
      city: 'Malibu',
      state: 'California',
      country: 'USA',
      coordinates: {
        lat: 34.0259,
        lng: -118.7798,
      },
    },
    images: [
      'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=1200',
      'https://images.unsplash.com/photo-1600566753104-685f4f24cb4d?w=1200',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67f87?w=1200',
    ],
    features: [
      'Beach access',
      'Rooftop deck',
      'Ocean views',
      'Split-level design',
      'Off-grid systems',
    ],
    amenities: [
      'Gourmet kitchen',
      'Outdoor shower',
      'AC/Heating',
      'Surf storage',
      'BBQ area',
    ],
    status: 'sold',
    yearBuilt: 2024,
    propertyType: 'container',
    isFeatured: false,
    createdAt: '2024-03-01',
  },
]

// Lookup a single house by its route id
export function getHouseById(id: string): House | undefined {
  return houses.find((house) => house.id === id)
}

// Strip the fields only a detail page needs
export function toHouseSummary(house: House): HouseSummary {
  const { description: _description, amenities: _amenities, ...summary } = house
  return summary
}

export function getHouseSummaries(): HouseSummary[] {
  return houses.map(toHouseSummary)
}

// Lookup by the URL-facing slug (the canonical route key)
export function getHouseBySlug(slug: string): House | undefined {
  return houses.find((house) => house.slug === slug)
}

// Featured houses for the homepage carousel
export function getFeaturedHouses(): House[] {
  return houses.filter((house) => house.isFeatured)
}

// Sibling listings shown on a detail page
export function getRelatedHouses(currentId: string, limit: number = 3): House[] {
  return houses
    .filter((house) => house.id !== currentId && house.status === 'available')
    .slice(0, limit)
}

// Distinct "City, State" values powering the location filter
export function getUniqueLocations(): string[] {
  const locations = houses.map((house) => `${house.location.city}, ${house.location.state}`)
  return [...new Set(locations)]
}

