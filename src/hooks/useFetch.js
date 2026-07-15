import { useState, useEffect } from 'react'

export default function useFetch(fetcher){
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    let mounted = true
    fetcher().then(res=>{ if(mounted){ setData(res); setLoading(false) } })
    return ()=>{ mounted = false }
  },[fetcher])

  return {data, loading}
}
