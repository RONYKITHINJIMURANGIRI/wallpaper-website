import React from 'react'

export default function InputOtp({length=4, value='', onChange}){
  return <input value={value} onChange={onChange} placeholder={'-'.repeat(length)} />
}
