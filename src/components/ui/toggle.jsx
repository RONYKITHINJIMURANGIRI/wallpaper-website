import React from 'react'

export default function Toggle({on, onChange}){
  return <button onClick={() => onChange(!on)} className={`px-2 py-1 ${on? 'bg-green-500':'bg-gray-300'}`}>{on? 'On':'Off'}</button>
}
