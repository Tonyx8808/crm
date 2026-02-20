import React from 'react'

const neu = {
  outset: `5px 5px 14px var(--neu-dark), -3px -3px 9px var(--neu-light)`,
  insetSm:`inset 2px 2px 5px var(--neu-dark), inset -1px -1px 3px var(--neu-light)`,
}

const variantColor: Record<string, string> = {
  primary:   'var(--accent)',
  success:   '#10b981',
  warning:   '#f59e0b',
  danger:    '#ef4444',
  secondary: '#8b5cf6',
}

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'secondary'
  children: React.ReactNode
  raised?: boolean  // outset (default) o inset
}

export function Badge({ variant = 'primary', raised = false, children, style, ...props }: BadgeProps) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 12px',
        borderRadius: 999,
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: '0.14em',
        background: 'var(--bg)',
        color: variantColor[variant] ?? 'var(--text)',
        boxShadow: raised ? neu.outset : neu.insetSm,
        transition: 'box-shadow 0.2s',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}