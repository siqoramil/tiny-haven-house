import { Metadata } from 'next'
import AboutContent from '@/components/AboutContent'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about TinyHaven - our mission to connect people with beautiful, sustainable tiny homes and our commitment to quality and customer satisfaction.',
}

export default function AboutPage() {
  return <AboutContent />
}
