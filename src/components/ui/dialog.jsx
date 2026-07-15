import React from 'react'

export default function Dialog({open, onClose, children}){
  if(!open) return null
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow">{children}<button onClick={onClose}>Close</button></div>
    </div>
  )
}
