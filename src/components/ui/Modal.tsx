import React, { useState } from 'react'
import { X } from 'lucide-react'

const neu = {
  outset: `5px 5px 14px var(--neu-dark), -3px -3px 9px var(--neu-light)`,
  inset:  `inset 3px 3px 8px var(--neu-dark), inset -2px -2px 5px var(--neu-light)`,
  panel:  `12px 12px 30px var(--neu-dark), -6px -6px 18px var(--neu-light), inset 0 1px 0 rgba(255,255,255,0.2)`,
}

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const [btnPressed, setBtnPressed] = useState(false)

  if (!isOpen) return null

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {/* backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.45)',
          backdropFilter: 'blur(8px)',
        }}
      />

      {/* pannello */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: 440,
        margin: '0 16px',
        background: 'var(--bg)',
        borderRadius: 28,
        padding: '28px 26px',
        boxShadow: neu.panel,
      }}>
        {/* header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 22, paddingBottom: 16,
          borderBottom: '1px solid var(--glass-border)',
        }}>
          <h2 style={{
            fontSize: 14, fontWeight: 700,
            letterSpacing: '0.2em',
            color: 'var(--text)',
          }}>
            {title.toUpperCase()}
          </h2>

          <button
            onClick={onClose}
            onMouseDown={() => setBtnPressed(true)}
            onMouseUp={() => setBtnPressed(false)}
            onMouseLeave={() => setBtnPressed(false)}
            style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'var(--bg)', border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              boxShadow: btnPressed ? neu.inset : neu.outset,
              transition: 'box-shadow 0.15s',
            }}
          >
            <X size={14} />
          </button>
        </div>

        {children}
      </div>
    </div>
  )
}