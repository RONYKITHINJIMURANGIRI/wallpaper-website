import React from 'react'

export default function ShareButtons({url, title}){
  return (
    <div className="flex gap-2">
      <button onClick={()=>navigator.clipboard?.writeText(url)}>Copy link</button>
      <button onClick={()=>window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`)}>Tweet</button>
    </div>
  )
}
