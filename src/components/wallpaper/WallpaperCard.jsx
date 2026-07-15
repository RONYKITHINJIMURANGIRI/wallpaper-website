import React from 'react'
import ResolutionBadge from './ResolutionBadge'

export default function WallpaperCard({wp}){
  return (
    <div className="border rounded overflow-hidden bg-white">
      <img src={wp.url} alt={wp.title} className="w-full h-48 object-cover" />
      <div className="p-2 flex items-center justify-between">
        <div>
          <div className="font-semibold">{wp.title}</div>
          <div className="text-xs text-gray-500">By {wp.authorId}</div>
        </div>
        <ResolutionBadge width={wp.width} height={wp.height} />
      </div>
    </div>
  )
}
