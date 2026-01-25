import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Heart, Users, Award, Leaf } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about TinyHaven - our mission to connect people with beautiful, sustainable tiny homes and our commitment to quality and customer satisfaction.',
}

const values = [
  {
    icon: Heart,
    title: 'Passion for Quality',
    description:
      'We believe everyone deserves a beautiful home. Every tiny house we feature meets our rigorous standards for craftsmanship and livability.',
  },
  {
    icon: Leaf,
    title: 'Sustainability First',
    description:
      'Environmental responsibility is at our core. We prioritize eco-friendly homes with sustainable features and minimal environmental impact.',
  },
  {
    icon: Users,
    title: 'Customer Focused',
    description:
      'Your journey matters to us. Our team provides personalized guidance from your first inquiry to move-in day and beyond.',
  },
  {
    icon: Award,
    title: 'Trusted Excellence',
    description:
      'With over a decade of experience, we have helped hundreds of families find their perfect tiny home with integrity and care.',
  },
]

const team = [
  {
    name: 'Sarah Johnson',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    bio: 'Former architect with a vision for accessible, sustainable housing.',
  },
  {
    name: 'Michael Chen',
    role: 'Head of Sales',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    bio: 'Passionate about connecting people with their dream homes.',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Design Consultant',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    bio: 'Interior designer specializing in small space optimization.',
  },
  {
    name: 'David Park',
    role: 'Customer Success',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    bio: 'Dedicated to making every customer experience exceptional.',
  },
]

const milestones = [
  { year: '2014', event: 'TinyHaven founded in Portland, Oregon' },
  { year: '2016', event: 'Expanded to 10 states across the US' },
  { year: '2018', event: 'Reached 100 homes sold milestone' },
  { year: '2020', event: 'Launched sustainable housing initiative' },
  { year: '2022', event: 'National expansion to 25+ locations' },
  { year: '2024', event: 'Celebrating 10 years and 500+ happy homeowners' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pb-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50 to-white dark:from-neutral-800 dark:to-neutral-900" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary-600 dark:text-primary-400 font-medium mb-4 block">About TinyHaven</span>
              <h1 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 dark:text-white mb-6">
                We Believe in the Power of
                <span className="text-primary-600 dark:text-primary-400"> Small Living</span>
              </h1>
              <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed mb-8">
                Founded in 2014, TinyHaven has grown from a small team of dreamers into the
                nation&apos;s leading marketplace for tiny homes. We connect people with beautiful,
                sustainable small homes that prove bigger isn&apos;t always better.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/houses"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all"
                >
                  Explore Homes
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 rounded-xl font-semibold hover:border-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all"
                >
                  Get in Touch
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"
                  alt="Beautiful tiny home"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">500+</div>
                    <div className="text-sm text-neutral-500 dark:text-neutral-400">Homes Sold</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">10+</div>
                    <div className="text-sm text-neutral-500 dark:text-neutral-400">Years</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 lg:py-32 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-primary-400 font-medium mb-4 block">Our Mission</span>
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">
              Making Tiny Living Accessible to Everyone
            </h2>
            <p className="text-xl text-neutral-300 leading-relaxed">
              We envision a world where sustainable, affordable housing is available to all.
              Our mission is to democratize tiny living by connecting dreamers with the perfect
              small home that fits their lifestyle, budget, and values.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 lg:py-32 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary-600 dark:text-primary-400 font-medium mb-4 block">Our Values</span>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 dark:text-white mb-4">
              What Drives Us Every Day
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300">
              Our core values guide everything we do, from selecting homes to serving our customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/50 rounded-xl flex items-center justify-center mb-6">
                  <value.icon className="w-7 h-7 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">{value.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 lg:py-32 bg-neutral-50 dark:bg-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary-600 dark:text-primary-400 font-medium mb-4 block">Our Journey</span>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 dark:text-white mb-4">
              A Decade of Growth
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300">
              From a small startup to the nation&apos;s leading tiny home marketplace.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-200 dark:bg-primary-800" />

              {/* Milestones */}
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative flex items-start gap-6 pl-20">
                    {/* Dot */}
                    <div className="absolute left-6 w-4 h-4 bg-primary-600 rounded-full ring-4 ring-white dark:ring-neutral-800" />

                    {/* Content */}
                    <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-sm flex-1">
                      <div className="text-primary-600 dark:text-primary-400 font-bold mb-1">{milestone.year}</div>
                      <div className="text-neutral-700 dark:text-neutral-300">{milestone.event}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 lg:py-32 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary-600 dark:text-primary-400 font-medium mb-4 block">Our Team</span>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 dark:text-white mb-4">
              Meet the People Behind TinyHaven
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300">
              A passionate team dedicated to helping you find your perfect tiny home.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-2xl overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="192px"
                  />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-1">{member.name}</h3>
                <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">{member.role}</p>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-6">
            Ready to Find Your Tiny Dream Home?
          </h2>
          <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
            Join thousands of happy homeowners who found their perfect small space through TinyHaven.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/houses"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold hover:bg-neutral-100 transition-all"
            >
              Browse Homes
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-700 text-white rounded-xl font-semibold hover:bg-primary-800 transition-all border border-primary-500"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
