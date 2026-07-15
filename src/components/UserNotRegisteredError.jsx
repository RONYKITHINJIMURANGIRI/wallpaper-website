import React from 'react'

export default function UserNotRegisteredError({message}){
  return (
    <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded">
      <strong>User not registered</strong>
      <p className="mt-1 text-sm">{message || 'This account is not registered. Please sign up.'}</p>
    </div>
  )
}
