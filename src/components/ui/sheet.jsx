import React from 'react'

export default function Sheet({children, open}){
  return open ? <div className="ui-sheet">{children}</div> : null
}
