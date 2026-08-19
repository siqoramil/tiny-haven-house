import Image from 'next/image'
import { ArrowRight, Home, Leaf, MapPin, Shield } from 'lucide-react'
import { HouseCard } from '@/widgets/house-card'
import { Testimonials } from '@/widgets/testimonials'
import { getFeaturedHouses, getHouseSummaries, toHouseSummary } from '@/entities/house'
import { createTranslator, LocaleLink as Link, type Language } from '@/shared/i18n'
import { getDictionary } from '@/shared/i18n/server'

export default async function HomePage({ lang }: { lang: Language }) {
  const t = createTranslator(await getDictionary(lang))

  const featuredHouses = getFeaturedHouses().map(toHouseSummary).slice(0, 3)
  // "Recently listed" must not simply repeat the featured rail above it — the
  // old version sliced the same sorted list and showed the identical homes.
  const featuredIds = new Set(featuredHouses.map((house) => house.id))
  const recentHouses = getHouseSummaries()
    .filter((house) => !featuredIds.has(house.id))
    .slice(0, 3)

  const stats = [
    { value: '150+', label: t('home.stats.homesSold') },
    { value: '25+', label: t('home.stats.locations') },
    { value: '98%', label: t('home.stats.happyClients') },
    { value: '10+', label: t('home.stats.yearsExperience') },
  ]

  const features = [
    { icon: Home, title: t('home.features.qualityTitle'), description: t('home.features.qualityDesc') },
    { icon: Leaf, title: t('home.features.sustainableTitle'), description: t('home.features.sustainableDesc') },
    { icon: Shield, title: t('home.features.trustedTitle'), description: t('home.features.trustedDesc') },
    { icon: MapPin, title: t('home.features.locationsTitle'), description: t('home.features.locationsDesc') },
  ]

  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden pb-16 pt-32 sm:pb-24">
        <div className="absolute inset-0 overflow-hidden bg-stone-900">
          <Image
            src="https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=2000&q=80"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Two scrims: one grounds the copy, one keeps the header legible. */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/55 to-stone-950/25" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-stone-950/70 to-transparent" />
        </div>

        <div className="shell relative">
          <div className="max-w-3xl">
            <span className="chip border border-white/25 bg-white/10 text-white backdrop-blur-md">
              {t('home.hero.badge')}
            </span>

            <h1 className="mt-6 font-display text-display-xl font-semibold text-white text-shadow-hero">
              {t('home.hero.titleLine1')}{' '}
              <span className="italic text-primary-200">{t('home.hero.titleLine2')}</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl">
              {t('home.hero.description')}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/houses" className="btn btn-lg btn-invert">
                {t('home.hero.browseHomes')}
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/contact" className="btn btn-lg btn-glass">
                {t('home.hero.contactUs')}
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-6 hidden justify-center sm:flex" aria-hidden>
          <span className="flex h-10 w-6 justify-center rounded-full border border-white/40 pt-2">
            <span className="h-2 w-1 animate-scroll-hint rounded-full bg-white" />
          </span>
        </div>
      </section>

      {/* --------------------------------------------------------------- Stats */}
      <section className="border-b border-line bg-surface">
        <div className="shell grid grid-cols-2 gap-y-10 py-12 lg:grid-cols-4 lg:py-14">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-4xl font-semibold tracking-tight text-primary-700 dark:text-primary-300 lg:text-5xl">
                {stat.value}
              </div>
              <div className="mt-1.5 text-sm text-subtle">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------ Featured */}
      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow={t('home.featured.label')}
            title={t('home.featured.title')}
            action={{ href: '/houses', label: t('home.featured.viewAll') }}
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {featuredHouses.map((house, index) => (
              <HouseCard key={house.id} house={house} featured priority={index === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ Features */}
      <section className="section bg-sunken">
        <div className="shell">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="eyebrow">{t('home.features.label')}</span>
            <h2 className="font-display text-display-md font-semibold">{t('home.features.title')}</h2>
            <p className="lede mt-4">{t('home.features.description')}</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="card h-full p-7">
                <span className="icon-tile mb-6 h-12 w-12">
                  <feature.icon className="h-6 w-6" />
                </span>
                <h3 className="mb-2.5 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- Recent */}
      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow={t('home.recent.label')}
            title={t('home.recent.title')}
            action={{ href: '/houses', label: t('home.recent.viewAll') }}
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {recentHouses.map((house) => (
              <HouseCard key={house.id} house={house} />
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* ----------------------------------------------------------------- CTA */}
      <section className="relative overflow-hidden bg-primary-800 py-20 lg:py-28">
        {/* Soft radial wash so a large flat fill doesn't read as a colour block. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              'radial-gradient(60rem 30rem at 15% 0%, rgb(157 198 172 / 0.28), transparent 65%)',
          }}
        />
        <div className="shell relative text-center">
          <h2 className="mx-auto max-w-3xl font-display text-display-md font-semibold text-white">
            {t('home.cta.title')}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-primary-100">{t('home.cta.subtitle')}</p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/houses" className="btn btn-lg btn-invert">
              {t('home.cta.browseAll')}
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href="/contact" className="btn btn-lg btn-glass">
              {t('home.cta.getInTouch')}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

function SectionHeading({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string
  title: string
  action: { href: string; label: string }
}) {
  return (
    <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between lg:mb-12">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="font-display text-display-md font-semibold">{title}</h2>
      </div>
      <Link
        href={action.href}
        className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary-700 transition-colors hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-200"
      >
        {action.label}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  )
}
