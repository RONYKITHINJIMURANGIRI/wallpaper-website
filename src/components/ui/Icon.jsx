import React from 'react'

export default function Icon({name, className=''}){
  // simple placeholder icon set
  const icons = {
    heart: '♥',
    info: 'ℹ',
  }
  return <span className={className}>{icons[name] || '•'}</span>
}
