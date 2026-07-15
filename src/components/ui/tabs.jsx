import React from 'react'

export default function Tabs({tabs=[], active=0}){
  return <div className="ui-tabs">{tabs.map((t,i)=> <button key={i} className={i===active? 'font-bold':''}>{t}</button>)}</div>
}
