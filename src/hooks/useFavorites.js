import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'favorites'

export default function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites)) } catch {}
  }, [favorites])

  const add = useCallback(id => setFavorites(prev => (prev.includes(id) ? prev : [...prev, id])), [])
  const remove = useCallback(id => setFavorites(prev => prev.filter(x => x !== id)), [])
  const toggle = useCallback(id => setFavorites(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])), [])
  const has = useCallback(id => favorites.includes(id), [favorites])

  return { favorites, add, remove, toggle, has }
}
