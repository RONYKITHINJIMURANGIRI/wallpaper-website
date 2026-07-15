import React from 'react'

export default function ContextMenu({items=[]}){
  return <ul className="ui-context-menu">{items.map((it,i)=> <li key={i}>{it}</li>)}</ul>
}
