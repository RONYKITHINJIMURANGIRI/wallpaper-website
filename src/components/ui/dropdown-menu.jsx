import React from 'react'

export default function DropdownMenu({items=[]}){
  return <div className="ui-dropdown">{items.map((it,i)=> <div key={i}>{it}</div>)}</div>
}
