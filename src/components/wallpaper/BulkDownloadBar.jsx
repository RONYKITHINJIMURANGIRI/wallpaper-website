import React from 'react'

export default function BulkDownloadBar({selectedCount=0, onDownload}){
  return (
    <div className="fixed bottom-12 left-0 right-0 bg-gray-100 p-2 flex justify-between items-center">
      <div>{selectedCount} selected</div>
      <button onClick={onDownload} className="px-3 py-1 bg-blue-600 text-white rounded">Download</button>
    </div>
  )
}
