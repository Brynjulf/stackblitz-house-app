import { useState, useEffect, useCallback } from 'react'

export interface Toast {
  id: string
  title: string
  description?: string
  duration?: number
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback(
    ({ title, description = '', duration = 3000 }: Omit<Toast, 'id'>) => {
      const id = Math.random().toString(36).substr(2, 9)
      setToasts((prevToasts) => [...prevToasts, { id, title, description, duration }])
    },
    []
  )

  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }, [])

  useEffect(() => {
    const timers = toasts.map((toast) => {
      return setTimeout(() => removeToast(toast.id), toast.duration)
    })

    return () => timers.forEach(clearTimeout)
  }, [toasts, removeToast])

  return { addToast, removeToast, toasts }
}