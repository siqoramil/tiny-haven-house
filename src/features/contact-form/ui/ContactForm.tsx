'use client'

import { useState } from 'react'
import { Send, Check, AlertCircle, Loader2 } from 'lucide-react'
import { isValidEmail, isValidPhone, cn } from '@/shared/lib'
import { useLanguage } from '@/shared/i18n'

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  subject?: string
  message?: string
}

interface ContactFormProps {
  houseId?: string
  houseTitle?: string
}

export default function ContactForm({ houseId, houseTitle }: ContactFormProps) {
  const { t } = useLanguage()

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: houseTitle ? `${t('form.inquiryAbout')}: ${houseTitle}` : '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = t('form.nameRequired')
    }

    if (!formData.email.trim()) {
      newErrors.email = t('form.emailRequired')
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = t('form.emailInvalid')
    }

    if (formData.phone && !isValidPhone(formData.phone)) {
      newErrors.phone = t('form.phoneInvalid')
    }

    if (!formData.subject.trim()) {
      newErrors.subject = t('form.subjectRequired')
    }

    if (!formData.message.trim()) {
      newErrors.message = t('form.messageRequired')
    } else if (formData.message.length < 10) {
      newErrors.message = t('form.messageMinLength')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In a real app, you would send the data to your API here
    console.log('Form submitted:', { ...formData, houseId })

    setIsSubmitting(false)
    setIsSuccess(true)

    // Reset form after success
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      })
      setIsSuccess(false)
    }, 3000)
  }

  const subjects = [
    { value: 'General Inquiry', label: t('form.generalInquiry') },
    { value: 'Schedule a Viewing', label: t('form.scheduleViewing') },
    { value: 'Pricing Question', label: t('form.pricingQuestion') },
    { value: 'Financing Options', label: t('form.financingOptions') },
    { value: 'Custom Build Request', label: t('form.customBuild') },
    { value: 'Other', label: t('form.other') },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Success Message */}
      {isSuccess && (
        <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-xl">
          <Check className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm font-medium">
            {t('form.successMessage')}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            {t('form.fullName')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t('form.placeholder.name')}
            className={cn(
              'w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-900 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-neutral-900 dark:text-white placeholder-neutral-500',
              errors.name ? 'border-red-300 dark:border-red-500' : 'border-neutral-200 dark:border-neutral-700'
            )}
          />
          {errors.name && (
            <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            {t('form.emailAddress')} <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t('form.placeholder.email')}
            className={cn(
              'w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-900 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-neutral-900 dark:text-white placeholder-neutral-500',
              errors.email ? 'border-red-300 dark:border-red-500' : 'border-neutral-200 dark:border-neutral-700'
            )}
          />
          {errors.email && (
            <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            {t('form.phoneNumber')} <span className="text-neutral-400">({t('form.optional')})</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder={t('form.placeholder.phone')}
            className={cn(
              'w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-900 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-neutral-900 dark:text-white placeholder-neutral-500',
              errors.phone ? 'border-red-300 dark:border-red-500' : 'border-neutral-200 dark:border-neutral-700'
            )}
          />
          {errors.phone && (
            <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.phone}
            </p>
          )}
        </div>

        {/* Subject Field */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            {t('form.subject')} <span className="text-red-500">*</span>
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={cn(
              'w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-900 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all appearance-none cursor-pointer text-neutral-900 dark:text-white',
              errors.subject ? 'border-red-300 dark:border-red-500' : 'border-neutral-200 dark:border-neutral-700'
            )}
          >
            <option value="">{t('form.selectSubject')}</option>
            {houseTitle && (
              <option value={`${t('form.inquiryAbout')}: ${houseTitle}`}>
                {t('form.inquiryAbout')}: {houseTitle}
              </option>
            )}
            {subjects.map((subject) => (
              <option key={subject.value} value={subject.value}>
                {subject.label}
              </option>
            ))}
          </select>
          {errors.subject && (
            <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.subject}
            </p>
          )}
        </div>
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          {t('form.message')} <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          placeholder={t('form.placeholder.message')}
          className={cn(
            'w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-900 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all resize-none text-neutral-900 dark:text-white placeholder-neutral-500',
            errors.message ? 'border-red-300 dark:border-red-500' : 'border-neutral-200 dark:border-neutral-700'
          )}
        />
        {errors.message && (
          <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          'w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all',
          isSubmitting
            ? 'bg-neutral-300 cursor-not-allowed'
            : 'bg-primary-600 text-white hover:bg-primary-700 active:scale-[0.98]'
        )}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            {t('form.sending')}
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            {t('form.send')}
          </>
        )}
      </button>

      <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center">
        {t('form.responseNote')}
      </p>
    </form>
  )
}
