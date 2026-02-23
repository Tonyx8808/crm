import React from 'react'

const neu = {
  inset: `inset 3px 3px 8px var(--neu-dark), inset -2px -2px 5px var(--neu-light)`,
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, style, ...props }: InputProps) {
  return (
    <div style={{ width: '100%' }}>
      {label && (
        <label style={{
          display: 'block',
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.18em',
          color: 'var(--text-muted)',
          marginBottom: 8,
        }}>
          {label.toUpperCase()}
        </label>
      )}
      <input
        style={{
          width: '100%',
          /* glass */
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(14px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(14px) saturate(1.4)',
          border: error
            ? '1px solid rgba(239,68,68,0.40)'
            : '1px solid rgba(255,255,255,0.12)',
          borderRadius: 14,
          padding: '11px 18px',
          fontSize: 13,
          fontWeight: 500,
          letterSpacing: '0.06em',
          color: 'var(--text)',
          outline: 'none',
          fontFamily: 'inherit',
          boxShadow: error
            ? `inset 3px 3px 8px rgba(239,68,68,0.18), inset -2px -2px 5px var(--neu-light)`
            : neu.inset,
          transition: 'box-shadow 0.2s, border-color 0.2s',
          ...style,
        }}
        {...props}
      />
      {error && (
        <p style={{ marginTop: 6, fontSize: 11, color: '#ef4444', letterSpacing: '0.06em' }}>
          {error}
        </p>
      )}
    </div>
  )
}