import {useCallback} from 'react'

export default function useToast(){
  const toast = useCallback((message)=>{
    // placeholder: integrate with Toaster
    console.log('toast:', message)
  },[])
  return {toast}
}
