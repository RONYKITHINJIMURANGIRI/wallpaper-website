// Lightweight fetch helper used as a simple "query client".
export async function fetcher(url, opts){
  const res = await fetch(url, opts)
  if(!res.ok) throw new Error(res.statusText)
  return res.json()
}

const cache = new Map()
export async function useQuery(key, fn){
  if(cache.has(key)) return cache.get(key)
  const data = await fn()
  cache.set(key, data)
  return data
}

export function clearCache(){ cache.clear() }
