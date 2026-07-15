import React, {useEffect, useRef} from 'react'

export default function InfiniteScrollSentinel({onVisible}){
  const ref = useRef()
  useEffect(()=>{
    if(!ref.current) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e=>{ if(e.isIntersecting) onVisible && onVisible() })
    })
    obs.observe(ref.current)
    return ()=> obs.disconnect()
  },[onVisible])
  return <div ref={ref} className="h-2" />
}
