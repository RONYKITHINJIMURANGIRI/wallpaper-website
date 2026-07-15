import React from 'react'

export default function RadioGroup({options=[], value, onChange}){
  return (
    <div>
      {options.map(o=> (
        <label key={o.value}><input type="radio" checked={value===o.value} onChange={()=>onChange(o.value)}/> {o.label}</label>
      ))}
    </div>
  )
}
