import React from 'react'

export default function GoogleIcon({className='', size=18}){
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.36 1.23 8.28 2.25l6-6C35.6 3 30.2 1.5 24 1.5 14.8 1.5 6.95 6.9 3.1 14.8l7.1 5.5C12.6 15.2 18.6 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.5 24c0-1.6-.15-3.1-.44-4.6H24v8.75h12.6c-.53 2.9-2.1 5.4-4.5 7.05l7.1 5.5C44.8 36.7 46.5 30.7 46.5 24z"/>
    </svg>
  )
}
