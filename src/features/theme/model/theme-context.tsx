'use client'

import { createContext, useContext, useEffect, useState, useSyncExternalStore } from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: 'light' | 'dark'
  /**
   * False until the stored preference has been read on the client. Consumers
   * that render differently per theme must gate on this, otherwise the server
   * markup (which always assumes `light`) and the first client render disagree.
   */
  mounted: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext)
  // Return default values for SSR when context is not available
  if (!context) {
    return {
      theme: 'system',
      setTheme: () => {},
      resolvedTheme: 'light',
      mounted: false,
    }
  }
  return context
}

interface ThemeProviderProps {
  children: React.ReactNode
}

const colorSchemeQuery = '(prefers-color-scheme: dark)'

function subscribeToSystemTheme(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(colorSchemeQuery)
  mediaQuery.addEventListener('change', onStoreChange)
  return () => mediaQuery.removeEventListener('change', onStoreChange)
}

function getSystemTheme(): 'light' | 'dark' {
  return window.matchMedia(colorSchemeQuery).matches ? 'dark' : 'light'
}

function getServerTheme(): 'light' {
  return 'light'
}

function subscribeToHydration() {
  return () => {}
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'system'

    const savedTheme = localStorage.getItem('theme')
    return savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system'
      ? savedTheme
      : 'system'
  })
  const systemTheme = useSyncExternalStore(
    subscribeToSystemTheme,
    getSystemTheme,
    getServerTheme,
  )
  const mounted = useSyncExternalStore(subscribeToHydration, () => true, () => false)
  const resolvedTheme = theme === 'system' ? systemTheme : theme

  // Update resolved theme and apply to document
  useEffect(() => {
    if (!mounted) return

    // Apply theme to document
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(resolvedTheme)

    // Save to localStorage
    localStorage.setItem('theme', theme)
  }, [theme, resolvedTheme, mounted])

  // Note: the correct theme class is already on <html> before first paint,
  // courtesy of the inline script in the root layout. There is nothing to hide
  // here, so children render immediately instead of behind a blank screen.
  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  )
}
