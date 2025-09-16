import { createContext, useCallback, useEffect, useRef, type ReactNode } from 'react'
import toast from 'react-hot-toast'

interface InitialState {
  message: string
}

interface ResponseSuccessI {
  type: string
  message: string
  data: any
  timestamps: Date | string
}

const ElectronSuccessAndErrorContext = createContext<InitialState>({
  message: ''
})

export const ElectronSuccessAndErrorContextProvider = ({ children }: { children: ReactNode }) => {
  const electronAPI = useRef(window.api || null)

  const handleSuccess = useCallback((resData: ResponseSuccessI) => {
    if (resData.message.length > 0) {
      toast.success(resData.message)
    }
  }, [])
  const handleError = useCallback((errorData: ResponseSuccessI) => {
    toast.error(errorData.message)
  }, [])

  useEffect(() => {
    if (!electronAPI.current) {
      return
    }

    electronAPI.current.onSuccessCreate(handleSuccess)
    electronAPI.current.onError(handleError)

    return () => {
      if (electronAPI.current && electronAPI.current.removeErrorListener) {
        electronAPI.current.removeErrorListener()
      }
    }
  }, [handleError, handleSuccess])

  return (
    <ElectronSuccessAndErrorContext.Provider value={{ message: 'LMF3z' }}>
      {children}
    </ElectronSuccessAndErrorContext.Provider>
  )
}
