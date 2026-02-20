import React from 'react'
import { CheckCircle, AlertCircle, Info, XCircle, X } from 'lucide-react'

const neu = {
  outset: `5px 5px 14px var(--neu-dark), -3px -3px 9px var(--neu-light)`,
  insetSm:`inset 2px 2px 5px var(--neu-dark), inset -1px -1px 3px var(--neu-light)`,
}

const typeConfig = {
  success: { icon: CheckCircle, color: '#10b981' },
  error:   { icon: XCircle,     color: '#ef4444' },
  info:    { icon: Info,        color: 'var(--accent)' },
  warning: { icon: AlertCircle, color: '#f59e0b' },
}

interface ToastProps {
  type: 'success' | 'error' | 'info' | 'warning'
  message: string
  onClose: () => void
}

export function Toast({ type, message, onClose }: ToastProps) {
  const [pressed, setPressed] = React.useState(false)
  const { icon: Icon, color } = typeConfig[type]

  React.useEffect(() => {
    const t = setTimeout(onClose, 3000)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '12px 16px',
      borderRadius: 16,
      background: 'var(--bg)',
      boxShadow: neu.outset,
      minWidth: 280,
      maxWidth: 400,
      animation: 'toastIn 0.25s cubic-bezier(.4,0,.2,1)',
    }}>
      <style>{`@keyframes toastIn { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }`}</style>

      {/* icon circle */}
      <div style={{
        width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
        background: 'var(--bg)',
        boxShadow: neu.insetSm,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color,
      }}>
        <Icon size={16} />
      </div>

      <span style={{ flex: 1, fontSize: 13, fontWeight: 600, letterSpacing: '0.04em', color: 'var(--text)' }}>
        {message}
      </span>

      <button
        onClick={onClose}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onMouseLeave={() => setPressed(false)}
        style={{
          width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
          background: 'var(--bg)', border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          color: 'var(--text-muted)',
          boxShadow: pressed ? neu.insetSm : neu.outset,
          transition: 'box-shadow 0.15s',
        }}
      >
        <X size={12} />
      </button>
    </div>
  )
}