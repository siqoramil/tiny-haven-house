'use client'

interface GoogleMapProps {
  lat: number
  lng: number
  title?: string
}

export default function GoogleMap({ lat, lng, title }: GoogleMapProps) {
  const src = `https://www.google.com/maps?q=${lat},${lng}&z=14&output=embed`

  return (
    <div className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-700">
      <iframe
        src={src}
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title || 'Location map'}
        className="w-full"
      />
    </div>
  )
}
