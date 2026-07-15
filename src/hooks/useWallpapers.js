import { useState, useEffect, useCallback } from 'react'
import wallpaperData from '../../base44/entities/Wallpaper.jsonc'

export default function useWallpapers(){
  const [wallpapers, setWallpapers] = useState([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(() => {
    setLoading(true)
    try{
      const items = Array.isArray(wallpaperData) ? wallpaperData : [wallpaperData]
      setWallpapers(items)
    }catch(err){
      setWallpapers([])
    }finally{
      setLoading(false)
    }
  },[])

  useEffect(()=>{ load() },[load])

  return { wallpapers, loading, reload: load }
}
