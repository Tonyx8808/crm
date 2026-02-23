import React from 'react'

const neu = {
  outset: `5px 5px 14px var(--neu-dark), -3px -3px 9px var(--neu-light)`,
  panel:  `8px 8px 20px var(--neu-dark), -5px -5px 14px var(--neu-light), inset 0 1px 0 rgba(255,255,255,0.2)`,
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  glass?: boolean
}

export function Card({ glass = true, children, style, ...props }: CardProps) {
  const glassStyle: React.CSSProperties = glass ? {
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.13)',
    backdropFilter: 'blur(28px) saturate(1.6)',
    WebkitBackdropFilter: 'blur(28px) saturate(1.6)',
    boxShadow: neu.panel,
  } : {
    background: 'var(--bg)',
    boxShadow: neu.outset,
  }

  return (
    <div
      style={{
        borderRadius: 24,
        padding: '22px 20px',
        transition: 'box-shadow 0.2s',
        ...glassStyle,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}