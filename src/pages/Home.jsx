import React from 'react'
import WallpaperCard from '../components/WallpaperCard'
import wallpapers from '../../base44/entities/Wallpaper.jsonc'

export default function Home(){
  const items = Array.isArray(wallpapers) ? wallpapers : [wallpapers]
  return (
    <main className="p-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(wp=> <WallpaperCard key={wp.id} wp={wp} />)}
    </main>
  )
}
