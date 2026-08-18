import { NextResponse, type NextRequest } from 'next/server'
// Imported from the module rather than the slice barrel on purpose: the edge
// runtime must not pull in the barrel's React components.
import {
  defaultLanguage,
  isLanguage,
  languageCookie,
  type Language,
} from '@/shared/i18n/config'

/** Cookie first (an explicit choice), then the browser's Accept-Language. */
function resolveLanguage(request: NextRequest): Language {
  const fromCookie = request.cookies.get(languageCookie)?.value
  if (isLanguage(fromCookie)) return fromCookie

  const header = request.headers.get('accept-language')
  if (header) {
    for (const part of header.split(',')) {
      const tag = part.split(';')[0].trim().toLowerCase().split('-')[0]
      if (isLanguage(tag)) return tag
    }
  }

  return defaultLanguage
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Already language-prefixed — nothing to do.
  if (isLanguage(pathname.split('/')[1])) {
    return NextResponse.next()
  }

  const language = resolveLanguage(request)
  const url = request.nextUrl.clone()
  url.pathname = pathname === '/' ? `/${language}` : `/${language}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  // Skip Next internals, metadata routes and anything with a file extension.
  matcher: ['/((?!_next|api|.*\\.).*)'],
}
