import React, { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'

const neu = {
  outset:     `5px 5px 14px var(--neu-dark), -3px -3px 9px var(--neu-light)`,
  outsetHover:`7px 7px 18px var(--neu-dark), -4px -4px 11px var(--neu-light)`,
  insetSm:    `inset 2px 2px 5px var(--neu-dark), inset -1px -1px 3px var(--neu-light)`,
  panel:      `8px 8px 20px var(--neu-dark), -5px -5px 14px var(--neu-light), inset 0 1px 0 rgba(255,255,255,0.2)`,
}

interface TableProps {
  columns: Array<{ key: string; label: string }>
  data: any[]
  onEdit?: (item: any) => void
  onDelete?: (item: any) => void
}

function ActionBtn({ onClick, danger, children }: { onClick: () => void; danger?: boolean; children: React.ReactNode }) {
  const [pressed, setPressed] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        width: 30, height: 30,
        background: 'var(--bg)',
        border: 'none', borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer',
        color: pressed ? (danger ? '#ef4444' : 'var(--accent)') : 'var(--text-muted)',
        boxShadow: pressed ? neu.insetSm : neu.outset,
        transition: 'box-shadow 0.15s, color 0.15s',
      }}
    >
      {children}
    </button>
  )
}

export function Table({ columns, data, onEdit, onDelete }: TableProps) {
  return (
    <div style={{
      background: 'var(--glass-bg)',
      border: '1px solid var(--glass-border)',
      borderRadius: 24,
      backdropFilter: 'blur(24px) saturate(1.5)',
      WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
      boxShadow: neu.panel,
      overflow: 'hidden',
    }}>

      {/* Header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns.length}, 1fr) auto`,
        gap: 12,
        padding: '12px 20px',
        borderBottom: '1px solid var(--glass-border)',
      }}>
        {columns.map(col => (
          <span key={col.key} style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.22em', color: 'var(--text-muted)' }}>
            {col.label.toUpperCase()}
          </span>
        ))}
        <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.22em', color: 'var(--text-muted)' }}>AZIONI</span>
      </div>

      {/* Rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '12px 12px' }}>
        {data.map((row, idx) => (
          <div
            key={idx}
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${columns.length}, 1fr) auto`,
              gap: 12,
              alignItems: 'center',
              background: 'var(--bg)',
              borderRadius: 14,
              padding: '11px 14px',
              boxShadow: neu.outset,
              transition: 'box-shadow 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = neu.outsetHover}
            onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = neu.outset}
          >
            {columns.map(col => (
              <div key={col.key} style={{ fontSize: 12, fontWeight: 500, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {row[col.key]}
              </div>
            ))}

            <div style={{ display: 'flex', gap: 6 }}>
              {onEdit && (
                <ActionBtn onClick={() => onEdit(row)}>
                  <Pencil size={12} />
                </ActionBtn>
              )}
              {onDelete && (
                <ActionBtn onClick={() => onDelete(row)} danger>
                  <Trash2 size={12} />
                </ActionBtn>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}