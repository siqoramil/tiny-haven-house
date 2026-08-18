'use client'

import NextLink from 'next/link'
import type { ComponentProps } from 'react'
import { localizeHref } from './config'
import { useLanguage } from './language-context'

type LocaleLinkProps = Omit<ComponentProps<typeof NextLink>, 'href'> & { href: string }

/**
 * Drop-in replacement for next/link that prefixes internal hrefs with the
 * active language, so callers keep writing plain paths like "/houses".
 */
export default function LocaleLink({ href, ...props }: LocaleLinkProps) {
  const { language } = useLanguage()
  return <NextLink href={localizeHref(language, href)} {...props} />
}
