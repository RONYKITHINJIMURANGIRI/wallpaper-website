import React, {useRef, useEffect} from 'react'

export default function ParticleCanvas(){
  const canvasRef = useRef()
  useEffect(()=>{
    const c = canvasRef.current
    if(!c) return
    const ctx = c.getContext('2d')
    ctx.fillStyle = '#f3f4f6'
    ctx.fillRect(0,0,c.width,c.height)
  },[])
  return <canvas ref={canvasRef} width={300} height={150} className="w-full" />
}
