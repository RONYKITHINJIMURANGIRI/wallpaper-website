import wallpaper from '../../base44/entities/Wallpaper.jsonc'

export function getAllWallpapers(){
  return Array.isArray(wallpaper) ? wallpaper : [wallpaper]
}

export function findWallpaperById(id){
  return getAllWallpapers().find(w=> w.id === id)
}
