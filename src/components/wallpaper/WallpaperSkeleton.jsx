import React from 'react'

export default function WallpaperSkeleton(){
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 h-48 rounded" />
      <div className="mt-2 h-4 bg-gray-200 rounded w-3/4" />
    </div>
  )
}
