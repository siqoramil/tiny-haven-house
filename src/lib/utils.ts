import { clsx, type ClassValue } from 'clsx'

// Utility function to merge class names
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

// Format price to currency
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

// Format size with unit
export function formatSize(size: number): string {
  return `${size.toLocaleString()} sq ft`
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

// Generate page metadata
export function generateMetadata(title: string, description: string) {
  return {
    title: `${title} | TinyHaven`,
    description,
    openGraph: {
      title: `${title} | TinyHaven`,
      description,
      type: 'website',
    },
  }
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate phone format (optional, accepts various formats)
export function isValidPhone(phone: string): boolean {
  if (!phone) return true // Phone is optional
  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/
  return phoneRegex.test(phone)
}

// Debounce function for search inputs
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Scroll to element smoothly
export function scrollToElement(elementId: string): void {
  const element = document.getElementById(elementId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
