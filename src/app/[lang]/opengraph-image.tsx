import { ImageResponse } from 'next/og'
import { languageCodes } from '@/shared/i18n'

// Next picks this file up automatically and emits the og:image / twitter:image
// tags for every route that does not define its own. Generated at build time,
// so there is no binary asset to keep in sync with the brand.
export const alt = 'TinyHaven — beautiful, sustainable tiny houses for sale'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Prerender the card for each language instead of rendering it per request
export function generateStaticParams() {
  return languageCodes.map((lang) => ({ lang }))
}

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #14532d 0%, #166534 55%, #22c55e 100%)',
          padding: '72px 80px',
          color: '#f0fdf4',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: '#f0fdf4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
            }}
          >
            🏡
          </div>
          <div style={{ fontSize: 34, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            TinyHaven
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 82, lineHeight: 1.05, maxWidth: 900 }}>
            Find your perfect tiny house
          </div>
          <div style={{ fontSize: 34, color: '#bbf7d0', maxWidth: 820 }}>
            Mountain cabins, coastal retreats and container homes — built small, built well.
          </div>
        </div>

        <div style={{ display: 'flex', gap: 40, fontSize: 26, color: '#86efac' }}>
          <div style={{ display: 'flex' }}>150+ homes sold</div>
          <div style={{ display: 'flex' }}>25+ locations</div>
          <div style={{ display: 'flex' }}>10+ years</div>
        </div>
      </div>
    ),
    size,
  )
}
