import React from 'react'

export default function ResolutionBadge({width, height}){
  return <span className="px-2 py-0.5 text-xs bg-gray-200 rounded">{width}×{height}</span>
}
