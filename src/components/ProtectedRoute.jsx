import React from 'react'

// Lightweight ProtectedRoute fallback.
// If you're using react-router, replace with <Navigate to="/login" /> when unauthenticated.
export default function ProtectedRoute({isAuthenticated, children, fallback=null}){
  if(isAuthenticated) return <>{children}</>
  return fallback || <div className="p-4 bg-yellow-100 text-yellow-800">Access denied. Please sign in.</div>
}
