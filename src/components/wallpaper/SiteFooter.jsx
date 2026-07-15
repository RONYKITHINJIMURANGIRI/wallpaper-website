import React from 'react'

export default function SiteFooter(){
  return (
    <footer className="p-6 text-center text-sm text-gray-600">
      © {new Date().getFullYear()} My Wallpapers
    </footer>
  )
}
