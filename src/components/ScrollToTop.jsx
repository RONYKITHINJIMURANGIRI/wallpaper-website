import { useEffect } from 'react'

// Call <ScrollToTop onPathChange={location} /> where `location` changes (e.g., from react-router)
export default function ScrollToTop({onPathChange}){
  useEffect(()=>{
    window.scrollTo(0,0)
  },[onPathChange])
  return null
}
