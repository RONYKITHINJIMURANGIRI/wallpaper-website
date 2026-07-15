import React from 'react'
import { findWallpaperById } from '../lib/wallpaperData'

export default function WallpaperDetail({id}){
  const wp = findWallpaperById(id)
  if(!wp) return <div className="p-6">Wallpaper not found</div>
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">{wp.title}</h2>
      <img src={wp.url} alt={wp.title} className="mt-4 max-w-full rounded" />
    </div>
  )
}
