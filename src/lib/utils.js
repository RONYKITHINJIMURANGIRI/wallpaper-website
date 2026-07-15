export function formatDate(iso){
  try { return new Date(iso).toLocaleString() } catch { return iso }
}

export function classNames(...args){
  return args.filter(Boolean).join(' ')
}

export async function safeJson(res){
  try { return await res.json() } catch { return null }
}
