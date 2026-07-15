import { useRef, useState, useEffect } from 'react'

export default function usePullToRefresh(onRefresh, { threshold = 60 } = {}) {
  const startY = useRef(0)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    function onTouchStart(e) {
      if (window.scrollY !== 0) return
      startY.current = e.touches?.[0]?.clientY || 0
    }
    function onTouchMove(e) {
      const y = e.touches?.[0]?.clientY || 0
      const diff = y - startY.current
      if (diff > threshold && !refreshing) {
        setRefreshing(true)
        Promise.resolve(onRefresh && onRefresh()).finally(() => setRefreshing(false))
      }
    }
    window.addEventListener('touchstart', onTouchStart)
    window.addEventListener('touchmove', onTouchMove)
    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [onRefresh, threshold, refreshing])

  return { refreshing }
}
