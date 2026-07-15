import React from 'react'

export default function WallpaperCard({wp}){
  return (
    <div className="border rounded p-2">
      <img src={wp.url} alt={wp.title} className="w-full h-40 object-cover rounded" />
      <h3 className="mt-2 font-semibold">{wp.title}</h3>
    </div>
  )
}
