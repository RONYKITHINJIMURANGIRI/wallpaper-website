import React from 'react'

export default function BottomNav(){
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t p-2 flex justify-around">
      <button>Home</button>
      <button>Search</button>
      <button>Profile</button>
    </nav>
  )
}
