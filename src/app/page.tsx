import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Home, Leaf, Shield, MapPin, Search, ChevronRight } from 'lucide-react'
import HouseCard from '@/components/HouseCard'
import Testimonials from '@/components/Testimonials'
import { getFeaturedHouses, houses } from '@/data/houses'

// Stats data
const stats = [
  { value: '150+', label: 'Homes Sold' },
  { value: '25+', label: 'Locations' },
  { value: '98%', label: 'Happy Clients' },
  { value: '10+', label: 'Years Experience' },
]

// Features data
const features = [
  {
    icon: Home,
    title: 'Quality Craftsmanship',
    description: 'Every tiny home is built with attention to detail using premium materials that last.',
  },
  {
    icon: Leaf,
    title: 'Sustainable Living',
    description: 'Eco-friendly designs with solar options, rainwater collection, and energy efficiency.',
  },
  {
    icon: Shield,
    title: 'Trusted Process',
    description: 'From selection to move-in, our team guides you through every step with transparency.',
  },
  {
    icon: MapPin,
    title: 'Prime Locations',
    description: 'Curated properties in stunning locations from mountains to beaches to cities.',
  },
]

export default function HomePage() {
  const featuredHouses = getFeaturedHouses()
  const recentHouses = houses.slice(0, 6)

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1920"
            alt="Beautiful tiny house in nature"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-2 bg-primary-500/20 text-primary-300 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              Your Dream Home Awaits
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-6 text-shadow">
              Find Your Perfect
              <br />
              <span className="text-primary-400">Tiny House</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-8 leading-relaxed">
              Discover beautifully crafted tiny homes in stunning locations.
              Embrace minimalist living without compromising on comfort or style.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/houses"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all active:scale-[0.98]"
              >
                Browse Homes
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/30"
              >
                Contact Us
              </Link>
            </div>

            {/* Quick Search */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search by location or type..."
                    className="w-full pl-12 pr-4 py-3 bg-white rounded-xl text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <Link
                  href="/houses"
                  className="px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all flex items-center justify-center gap-2"
                >
                  Search
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/70 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-primary-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-neutral-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Houses Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <span className="text-primary-600 font-medium mb-2 block">Featured Listings</span>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900">
                Handpicked Tiny Homes
              </h2>
            </div>
            <Link
              href="/houses"
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              View All Homes
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Featured Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredHouses.map((house) => (
              <HouseCard key={house.id} house={house} featured />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary-600 font-medium mb-2 block">Why Choose Us</span>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              The TinyHaven Difference
            </h2>
            <p className="text-lg text-neutral-600">
              We&apos;re not just selling homes — we&apos;re helping you discover a lifestyle of
              freedom, sustainability, and intentional living.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Listings Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <span className="text-primary-600 font-medium mb-2 block">Latest Additions</span>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900">
                Recently Listed
              </h2>
            </div>
            <Link
              href="/houses"
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              See All Listings
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Houses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentHouses.map((house) => (
              <HouseCard key={house.id} house={house} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-6">
              Ready to Start Your Tiny Living Journey?
            </h2>
            <p className="text-xl text-primary-100 mb-10">
              Whether you&apos;re looking for a weekend retreat or a full-time home,
              we&apos;re here to help you find the perfect tiny house.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/houses"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold hover:bg-neutral-100 transition-all"
              >
                Browse All Homes
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-700 text-white rounded-xl font-semibold hover:bg-primary-800 transition-all border border-primary-500"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
