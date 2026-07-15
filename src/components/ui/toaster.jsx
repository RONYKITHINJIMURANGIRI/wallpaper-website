import React from 'react'

export default function Toaster({toasts=[]}){
  return <div className="ui-toaster">{toasts.map((t,i)=> <div key={i}>{t.message}</div>)}</div>
}
