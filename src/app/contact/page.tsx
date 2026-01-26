import { Metadata } from 'next'
import ContactContent from '@/components/ContactContent'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with TinyHaven. Schedule a viewing, ask about financing, or learn more about our tiny houses. We are here to help you find your perfect home.',
}

export default function ContactPage() {
  return <ContactContent />
}
