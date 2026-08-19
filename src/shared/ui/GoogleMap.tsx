'use client'

interface GoogleMapProps {
  lat: number
  lng: number
  title?: string
}

export default function GoogleMap({ lat, lng, title }: GoogleMapProps) {
  const src = `https://www.google.com/maps?q=${lat},${lng}&z=14&output=embed`

  return (
    // `bg-sunken` keeps the slot from flashing white before the tiles arrive.
    <div className="aspect-[16/9] overflow-hidden rounded-3xl border border-line bg-sunken">
      <iframe
        src={src}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title ?? 'Location map'}
      />
    </div>
  )
}
