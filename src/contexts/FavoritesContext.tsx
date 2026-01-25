'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'

export interface FavoriteItem {
  id: string
  name: string
  price: number
  image: string
  location: string
}

interface FavoritesContextType {
  items: FavoriteItem[]
  addToFavorites: (item: FavoriteItem) => void
  removeFromFavorites: (id: string) => void
  toggleFavorite: (item: FavoriteItem) => void
  clearFavorites: () => void
  isFavorite: (id: string) => boolean
  totalItems: number
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<FavoriteItem[]>([])
  const [mounted, setMounted] = useState(false)

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('favorites')
    if (saved) {
      try {
        setItems(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to parse favorites from localStorage')
      }
    }
    setMounted(true)
  }, [])

  // Save to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('favorites', JSON.stringify(items))
    }
  }, [items, mounted])

  const addToFavorites = useCallback((item: FavoriteItem) => {
    setItems(prev => {
      if (prev.some(i => i.id === item.id)) return prev
      return [...prev, item]
    })
  }, [])

  const removeFromFavorites = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }, [])

  const toggleFavorite = useCallback((item: FavoriteItem) => {
    setItems(prev => {
      if (prev.some(i => i.id === item.id)) {
        return prev.filter(i => i.id !== item.id)
      }
      return [...prev, item]
    })
  }, [])

  const clearFavorites = useCallback(() => {
    setItems([])
  }, [])

  const isFavorite = useCallback((id: string) => {
    return items.some(item => item.id === id)
  }, [items])

  const totalItems = items.length

  return (
    <FavoritesContext.Provider value={{
      items,
      addToFavorites,
      removeFromFavorites,
      toggleFavorite,
      clearFavorites,
      isFavorite,
      totalItems
    }}>
      {children}
    </FavoritesContext.Provider>
  )
}
