import React from 'react'

export default function PullToRefreshIndicator({refreshing=false}){
  return (
    <div className="text-center p-2">
      {refreshing ? 'Refreshing...' : 'Pull down to refresh'}
    </div>
  )
}
