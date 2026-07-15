import React from 'react'

export default function NavigationMenu({items=[]}){
  return <ul className="ui-navigation">{items.map((it,i)=> <li key={i}>{it}</li>)}</ul>
}
