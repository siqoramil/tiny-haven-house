export type Dictionary = Record<string, unknown>

export type Translate = (key: string) => string

/**
 * Resolves dot-separated keys ('home.hero.badge') against a nested dictionary.
 * Falls back to the key itself when a translation is missing, so a gap shows
 * up as a visible key rather than an empty element.
 */
export function createTranslator(dictionary: Dictionary): Translate {
  return (key) => {
    const value = key
      .split('.')
      .reduce<unknown>(
        (node, part) =>
          node && typeof node === 'object' ? (node as Dictionary)[part] : undefined,
        dictionary,
      )
    return typeof value === 'string' ? value : key
  }
}
