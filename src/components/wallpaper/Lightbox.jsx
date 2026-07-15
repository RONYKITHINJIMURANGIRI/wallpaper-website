import React, {useEffect} from 'react'

export default function Lightbox({open, onClose, children}){
  useEffect(()=>{
    function onKey(e){ if(e.key==='Escape') onClose && onClose() }
    window.addEventListener('keydown', onKey)
    return ()=> window.removeEventListener('keydown', onKey)
  },[onClose])

  if(!open) return null
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center" onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} className="max-w-3xl">{children}</div>
    </div>
  )
}
