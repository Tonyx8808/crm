"use client"

import React from 'react'

const neu = {
  outset: `4px 4px 10px var(--neu-dark), -2px -2px 7px var(--neu-light)`,
  inset:  `inset 3px 3px 7px var(--neu-dark), inset -2px -2px 4px var(--neu-light)`,
}

interface SwitchProps {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
}

export const Switch = React.forwardRef<HTMLDivElement, SwitchProps>(
  ({ checked = false, onCheckedChange, disabled = false }, ref) => {
    return (
      <div
        ref={ref}
        role="switch"
        aria-checked={checked}
        onClick={() => !disabled && onCheckedChange?.(!checked)}
        style={{
          position: 'relative',
          width: 54, height: 28,
          borderRadius: 14,
          /* glass */
          background: checked
            ? 'rgba(var(--accent-rgb, 99,102,241), 0.12)'
            : 'rgba(255,255,255,0.06)',
          border: checked
            ? '1px solid rgba(var(--accent-rgb, 99,102,241), 0.30)'
            : '1px solid rgba(255,255,255,0.12)',
          backdropFilter: 'blur(12px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(12px) saturate(1.4)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1,
          flexShrink: 0,
          boxShadow: checked ? neu.inset : neu.outset,
          transition: 'box-shadow 0.25s, background 0.25s, border-color 0.25s',
        }}
      >
        <div style={{
          position: 'absolute',
          top: 4,
          left: checked ? 30 : 4,
          width: 20, height: 20,
          borderRadius: '50%',
          background: checked ? 'var(--accent)' : 'rgba(255,255,255,0.35)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          boxShadow: '1px 1px 4px rgba(0,0,0,0.25)',
          transition: 'left 0.25s cubic-bezier(.4,0,.2,1), background 0.25s',
        }} />
      </div>
    )
  }
)
Switch.displayName = 'Switch'