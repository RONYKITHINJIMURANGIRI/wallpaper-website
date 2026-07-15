import React from 'react'

export default function Menubar({items=[]}){
  return <nav className="ui-menubar">{items.map((it,i)=> <button key={i}>{it}</button>)}</nav>
}
