'use client'

import { useState } from 'react'
import { AlertCircle, Check, Loader2, Send } from 'lucide-react'
import { cn, isValidEmail, isValidPhone } from '@/shared/lib'
import { useLanguage } from '@/shared/i18n'

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

type FormErrors = Partial<Record<keyof FormData, string>>

interface ContactFormProps {
  houseId?: string
  houseTitle?: string
  /**
   * Single-column layout for narrow containers. The two-up grid used `sm:`,
   * which keys off the viewport — inside the detail page's third-width sidebar
   * that produced two columns roughly 100px wide and clipped every control.
   */
  compact?: boolean
}

export default function ContactForm({ houseId, houseTitle, compact = false }: ContactFormProps) {
  const { t } = useLanguage()

  const inquirySubject = houseTitle ? `${t('form.inquiryAbout')}: ${houseTitle}` : ''

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: inquirySubject,
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validateForm = (): boolean => {
    const nextErrors: FormErrors = {}

    if (!formData.name.trim()) nextErrors.name = t('form.nameRequired')

    if (!formData.email.trim()) nextErrors.email = t('form.emailRequired')
    else if (!isValidEmail(formData.email)) nextErrors.email = t('form.emailInvalid')

    if (formData.phone && !isValidPhone(formData.phone)) nextErrors.phone = t('form.phoneInvalid')

    if (!formData.subject.trim()) nextErrors.subject = t('form.subjectRequired')

    if (!formData.message.trim()) nextErrors.message = t('form.messageRequired')
    else if (formData.message.trim().length < 10) nextErrors.message = t('form.messageMinLength')

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    // Placeholder for the real submission endpoint.
    await new Promise((resolve) => setTimeout(resolve, 1200))
    console.log('Form submitted:', { ...formData, houseId })

    setIsSubmitting(false)
    setIsSuccess(true)
    setFormData({ name: '', email: '', phone: '', subject: inquirySubject, message: '' })

    setTimeout(() => setIsSuccess(false), 6000)
  }

  const subjects = [
    { value: 'General Inquiry', label: t('form.generalInquiry') },
    { value: 'Schedule a Viewing', label: t('form.scheduleViewing') },
    { value: 'Pricing Question', label: t('form.pricingQuestion') },
    { value: 'Financing Options', label: t('form.financingOptions') },
    { value: 'Custom Build Request', label: t('form.customBuild') },
    { value: 'Other', label: t('form.other') },
  ]

  const pairClass = cn('grid gap-5', !compact && 'sm:grid-cols-2')

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {isSuccess && (
        <div
          role="status"
          className="flex items-start gap-3 rounded-xl bg-primary-50 p-4 text-primary-900 dark:bg-primary-900/40 dark:text-primary-100"
        >
          <Check className="mt-0.5 h-5 w-5 shrink-0" />
          <p className="text-sm font-medium">{t('form.successMessage')}</p>
        </div>
      )}

      <div className={pairClass}>
        <Field
          id="name"
          label={t('form.fullName')}
          required
          error={errors.name}
          value={formData.name}
          onChange={handleChange}
          placeholder={t('form.placeholder.name')}
          autoComplete="name"
        />
        <Field
          id="email"
          type="email"
          label={t('form.emailAddress')}
          required
          error={errors.email}
          value={formData.email}
          onChange={handleChange}
          placeholder={t('form.placeholder.email')}
          autoComplete="email"
        />
      </div>

      <div className={pairClass}>
        <Field
          id="phone"
          type="tel"
          label={`${t('form.phoneNumber')} (${t('form.optional')})`}
          error={errors.phone}
          value={formData.phone}
          onChange={handleChange}
          placeholder={t('form.placeholder.phone')}
          autoComplete="tel"
        />

        <div>
          <label htmlFor="subject" className="field-label">
            {t('form.subject')} <span className="text-clay-500">*</span>
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            aria-invalid={Boolean(errors.subject)}
            className={cn('field-select', errors.subject && 'field-error')}
          >
            <option value="">{t('form.selectSubject')}</option>
            {inquirySubject && <option value={inquirySubject}>{inquirySubject}</option>}
            {subjects.map((subject) => (
              <option key={subject.value} value={subject.value}>
                {subject.label}
              </option>
            ))}
          </select>
          <FieldError message={errors.subject} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="field-label">
          {t('form.message')} <span className="text-clay-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={compact ? 4 : 6}
          value={formData.message}
          onChange={handleChange}
          placeholder={t('form.placeholder.message')}
          aria-invalid={Boolean(errors.message)}
          className={cn('field resize-none', errors.message && 'field-error')}
        />
        <FieldError message={errors.message} />
      </div>

      <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-lg w-full">
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            {t('form.sending')}
          </>
        ) : (
          <>
            <Send className="h-[18px] w-[18px]" />
            {t('form.send')}
          </>
        )}
      </button>

      <p className="text-center text-xs leading-relaxed text-subtle">{t('form.responseNote')}</p>
    </form>
  )
}

function Field({
  id,
  label,
  error,
  required = false,
  type = 'text',
  ...inputProps
}: {
  id: keyof FormData
  label: string
  error?: string
  required?: boolean
  type?: string
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label} {required && <span className="text-clay-500">*</span>}
      </label>
      <input
        {...inputProps}
        id={id}
        name={id}
        type={type}
        aria-invalid={Boolean(error)}
        className={cn('field', error && 'field-error')}
      />
      <FieldError message={error} />
    </div>
  )
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-clay-600 dark:text-clay-300">
      <AlertCircle className="h-4 w-4 shrink-0" />
      {message}
    </p>
  )
}
