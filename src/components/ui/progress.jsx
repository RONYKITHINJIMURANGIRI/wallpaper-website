import React from 'react'

export default function Progress({value=0}){
  return <progress value={value} max={100} />
}
