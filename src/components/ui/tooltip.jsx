import React from 'react'

export default function Tooltip({children, label}){
  return <span className="ui-tooltip" title={label}>{children}</span>
}
