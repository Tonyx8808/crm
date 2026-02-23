import React, { useState } from 'react'

const neu = {
  outset: `5px 5px 14px var(--neu-dark), -3px -3px 9px var(--neu-light)`,
  inset:  `inset 3px 3px 8px var(--neu-dark), inset -2px -2px 5px var(--neu-light)`,
}

const variantColor: Record<string, string> = {
  primary:   'var(--accent)',
  secondary: '#8b5cf6',
  danger:    '#ef4444',
  outline:   'var(--text)',
}

const sizeStyle: Record<string, React.CSSProperties> = {
  sm: { padding: '7px 16px',  fontSize: 11 },
  md: { padding: '10px 22px', fontSize: 12 },
  lg: { padding: '13px 28px', fontSize: 13 },
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  style,
  ...props
}: ButtonProps) {
  const [pressed, setPressed] = useState(false)
  const color = variantColor[variant] ?? 'var(--text)'

  return (
    <button
      disabled={loading || props.disabled}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 7,
        /* glass */
        background: pressed
          ? `color-mix(in srgb, ${color} 18%, transparent)`
          : `color-mix(in srgb, ${color} 10%, transparent)`,
        border: `1px solid color-mix(in srgb, ${color} 30%, transparent)`,
        backdropFilter: 'blur(18px) saturate(1.5)',
        WebkitBackdropFilter: 'blur(18px) saturate(1.5)',
        borderRadius: 999,
        fontFamily: 'inherit',
        fontWeight: 700,
        letterSpacing: '0.14em',
        cursor: loading || props.disabled ? 'not-allowed' : 'pointer',
        color,
        opacity: loading || props.disabled ? 0.55 : 1,
        boxShadow: pressed ? neu.inset : neu.outset,
        transition: 'box-shadow 0.15s, background 0.15s, opacity 0.2s',
        ...sizeStyle[size],
        ...style,
      }}
      {...props}
    >
      {loading ? '⏳ ' : ''}{children}
    </button>
  )
}