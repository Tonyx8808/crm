import React from 'react'
import { CheckCircle, AlertCircle, Info, XCircle } from 'lucide-react'

interface ToastProps {
  type: 'success' | 'error' | 'info' | 'warning'
  message: string
  onClose: () => void
}

export function Toast({ type, message, onClose }: ToastProps) {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
    warning: <AlertCircle className="w-5 h-5" />,
  }

  const colors = {
    success: 'bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700',
    error: 'bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 border-red-200 dark:border-red-700',
    info: 'bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-700',
    warning: 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 border-yellow-200 dark:border-yellow-700',
  }

  return (
    <div className={`flex items-center gap-3 p-4 rounded-lg border ${colors[type]} animate-slide-up`}>
      {icons[type]}
      <span className="flex-1 text-sm font-medium">{message}</span>
      <button onClick={onClose} className="text-lg">×</button>
    </div>
  )
}
