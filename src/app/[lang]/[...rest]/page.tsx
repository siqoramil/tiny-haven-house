import { notFound } from 'next/navigation'

/**
 * Catch-all inside the language segment. Without it, an unmatched path such as
 * /uz/typo falls through to the framework's bare 404 instead of the localised
 * not-found page, because the boundary that owns it sits above [lang].
 */
export default function NotFoundCatchAll(): never {
  notFound()
}
