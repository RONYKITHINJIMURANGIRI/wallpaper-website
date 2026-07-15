import React from 'react'

export default function Switch({checked, onChange}){
  return <input type="checkbox" role="switch" checked={checked} onChange={e=>onChange(e.target.checked)} />
}
