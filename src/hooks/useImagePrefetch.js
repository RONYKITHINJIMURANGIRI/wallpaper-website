import { useEffect } from 'react'

export default function useImagePrefetch(urls = []) {
  useEffect(() => {
    if (!urls || urls.length === 0) return
    const images = urls.map(src => {
      const img = new Image()
      img.src = src
      return img
    })
    return () => images.forEach(i => { i.src = '' })
  }, [urls])
}
