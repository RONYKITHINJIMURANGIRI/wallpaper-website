import React from 'react'

export default function Drawer({open, children}){
  return <aside className={`ui-drawer ${open? 'open':''}`}>{children}</aside>
}
