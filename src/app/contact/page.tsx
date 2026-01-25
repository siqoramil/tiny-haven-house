import { Metadata } from 'next'
import { Mail, Phone, MapPin, Clock, MessageCircle, Calendar } from 'lucide-react'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with TinyHaven. Schedule a viewing, ask about financing, or learn more about our tiny houses. We are here to help you find your perfect home.',
}

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    details: ['1-800-123-4567', 'Mon-Fri: 9am-6pm PST'],
    action: { label: 'Call Now', href: 'tel:+18001234567' },
  },
  {
    icon: Mail,
    title: 'Email',
    details: ['hello@tinyhaven.com', 'We reply within 24 hours'],
    action: { label: 'Send Email', href: 'mailto:hello@tinyhaven.com' },
  },
  {
    icon: MapPin,
    title: 'Office',
    details: ['123 Forest Lane', 'Portland, Oregon 97201'],
    action: { label: 'Get Directions', href: 'https://maps.google.com' },
  },
  {
    icon: Clock,
    title: 'Hours',
    details: ['Monday - Friday: 9am - 6pm', 'Saturday: 10am - 4pm'],
    action: null,
  },
]

const quickActions = [
  {
    icon: Calendar,
    title: 'Schedule a Viewing',
    description: 'Book an in-person or virtual tour of any home.',
    cta: 'Book Now',
  },
  {
    icon: MessageCircle,
    title: 'Live Chat',
    description: 'Chat with our team for immediate assistance.',
    cta: 'Start Chat',
  },
]

const faqs = [
  {
    question: 'How do I schedule a viewing?',
    answer:
      'You can schedule a viewing by filling out the contact form, calling us directly, or using the scheduling button on any house listing page.',
  },
  {
    question: 'Do you offer financing options?',
    answer:
      'Yes, we work with several lending partners who specialize in tiny home financing. Contact us to learn about available options.',
  },
  {
    question: 'Can I customize a tiny home?',
    answer:
      'Many of our builders offer customization options. Let us know your preferences and we will connect you with the right builder.',
  },
  {
    question: 'What areas do you serve?',
    answer:
      'We have listings across 25+ states in the US. Our team can help you find homes in your desired location.',
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white dark:from-neutral-800 dark:to-neutral-900 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-primary-600 dark:text-primary-400 font-medium mb-4 block">Get in Touch</span>
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 dark:text-white mb-6">
              We&apos;d Love to Hear From You
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Whether you&apos;re ready to find your dream tiny home or just exploring options,
              our team is here to help. Reach out anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/50 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">{item.title}</h3>
                <div className="space-y-1 mb-4">
                  {item.details.map((detail, i) => (
                    <p key={i} className="text-neutral-600 dark:text-neutral-400 text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
                {item.action && (
                  <a
                    href={item.action.href}
                    className="text-primary-600 dark:text-primary-400 font-medium text-sm hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                  >
                    {item.action.label} →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 lg:py-24 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-display font-bold text-neutral-900 dark:text-white mb-2">
                Send Us a Message
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 mb-8">
                Fill out the form below and we&apos;ll get back to you within 24 hours.
              </p>
              <ContactForm />
            </div>

            {/* Side Content */}
            <div className="space-y-8">
              {/* Quick Actions */}
              <div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-6">Quick Actions</h3>
                <div className="space-y-4">
                  {quickActions.map((action, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
                    >
                      <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <action.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-neutral-900 dark:text-white">{action.title}</h4>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">{action.description}</p>
                      </div>
                      <span className="text-primary-600 dark:text-primary-400 font-medium text-sm">{action.cta} →</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Google Maps */}
              <div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-6">Our Location</h3>
                <div className="rounded-2xl overflow-hidden aspect-[4/3]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2795.2096789456!2d-122.6789!3d45.5152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54950a0027e0b8c5%3A0x6c8e5c0eb0a6c8b5!2sPortland%2C%20OR%2097201!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="TinyHaven Office Location"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-neutral-50 dark:bg-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl lg:text-3xl font-display font-bold text-neutral-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400">
              Quick answers to common questions. Can&apos;t find what you&apos;re looking for?
              Contact us directly.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-sm">
                  <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">{faq.question}</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-display font-bold mb-4">
            Prefer to Talk on the Phone?
          </h2>
          <p className="text-neutral-400 mb-8 max-w-xl mx-auto">
            Our friendly team is available Monday through Saturday to answer your questions
            and help you find your perfect tiny home.
          </p>
          <a
            href="tel:+18001234567"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all"
          >
            <Phone className="w-5 h-5" />
            Call 1-800-123-4567
          </a>
        </div>
      </section>
    </div>
  )
}
