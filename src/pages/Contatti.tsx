'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useEffect, useState } from 'react'
import { useContattiStore } from '../stores/contattiStore'
import type { Contatto } from '../stores/contattiStore'
import { Phone, MessageSquare, X } from 'lucide-react'

const neu = {
  outset:     `5px 5px 14px var(--neu-dark), -3px -3px 9px var(--neu-light)`,
  outsetHover:`7px 7px 18px var(--neu-dark), -4px -4px 11px var(--neu-light)`,
  inset:      `inset 3px 3px 8px var(--neu-dark), inset -2px -2px 5px var(--neu-light)`,
  insetSm:    `inset 2px 2px 5px var(--neu-dark), inset -1px -1px 3px var(--neu-light)`,
  panel:      `8px 8px 20px var(--neu-dark), -5px -5px 14px var(--neu-light), inset 0 1px 0 rgba(255,255,255,0.2)`,
}

const statusConfig: Record<string, { color: string; dot: string }> = {
  online: { color: '#10b981', dot: '#10b981' },
  away:   { color: '#f59e0b', dot: '#f59e0b' },
  offline:{ color: 'var(--text-muted)', dot: '#94a3b8' },
}

function NeuButton({ onClick, children, accent }: { onClick?: () => void; children: React.ReactNode; accent?: boolean }) {
  const [pressed, setPressed] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        flex: 1,
        background: 'var(--bg)',
        border: 'none',
        borderRadius: 999,
        padding: '10px 18px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 7,
        fontSize: 11, fontWeight: 700, letterSpacing: '0.14em',
        color: pressed ? 'var(--accent)' : accent ? 'var(--accent)' : 'var(--text)',
        cursor: 'pointer',
        boxShadow: pressed ? neu.inset : neu.outset,
        transition: 'box-shadow 0.15s, color 0.15s',
      }}
    >
      {children}
    </button>
  )
}

export function Contatti() {
  const { t } = useLanguage()
  const { contatti, loading, fetchContatti } = useContattiStore()
  const [selected, setSelected] = useState<Contatto | null>(null)

  useEffect(() => { fetchContatti() }, [])

  return (
    <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>

      <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '0.18em', color: 'var(--text)' }}>
        {t('nav.contatti')}
      </h1>

      {/* Pannello lista */}
      <div style={{
        background: 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
        borderRadius: 28,
        backdropFilter: 'blur(24px) saturate(1.5)',
        WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
        boxShadow: neu.panel,
        padding: '24px 20px',
        display: 'flex', flexDirection: 'column', gap: 10,
      }}>

        {loading && (
          <p style={{ color: 'var(--text-muted)', fontSize: 12, letterSpacing: '0.18em', fontWeight: 600 }}>
            CARICAMENTO…
          </p>
        )}

        {!loading && contatti.length === 0 && (
          <p style={{ color: 'var(--text-muted)', fontSize: 12, letterSpacing: '0.12em' }}>
            Nessun contatto disponibile.
          </p>
        )}

        {!loading && contatti.map(c => {
          const st = statusConfig[c.status] ?? statusConfig.offline
          return (
            <div
              key={c.id}
              onClick={() => setSelected(c)}
              style={{
                background: 'var(--bg)',
                borderRadius: 18,
                padding: '14px 18px',
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between',
                gap: 14,
                cursor: 'pointer',
                boxShadow: neu.outset,
                transition: 'box-shadow 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = neu.outsetHover}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = neu.outset}
            >
              {/* Avatar + info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                {/* avatar neumorfico */}
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div style={{
                    width: 46, height: 46, borderRadius: '50%',
                    boxShadow: neu.outset,
                    overflow: 'hidden',
                  }}>
                    <img src={c.avatar} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  {/* dot status */}
                  <span style={{
                    position: 'absolute', bottom: 1, right: 1,
                    width: 11, height: 11, borderRadius: '50%',
                    background: st.dot,
                    border: '2px solid var(--bg)',
                  }} />
                </div>

                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text)', marginBottom: 2 }}>
                    {c.name}
                  </p>
                  <p style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
                    {c.position} · {c.company}
                  </p>
                </div>
              </div>

              {/* status pill inset */}
              <span style={{
                background: 'var(--bg)',
                borderRadius: 999,
                padding: '4px 12px',
                fontSize: 10, fontWeight: 700, letterSpacing: '0.14em',
                color: st.color,
                boxShadow: neu.insetSm,
                textTransform: 'uppercase',
                flexShrink: 0,
              }}>
                {c.status}
              </span>
            </div>
          )
        })}
      </div>

      {/* Modal contatto */}
      {selected && (
        <div style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.45)',
          backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 50,
        }}
          onClick={() => setSelected(null)}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'var(--bg)',
              borderRadius: 28,
              padding: '28px 24px',
              width: 320,
              boxShadow: neu.panel,
              display: 'flex', flexDirection: 'column', gap: 16,
            }}
          >
            {/* header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 50, height: 50, borderRadius: '50%', boxShadow: neu.outset, overflow: 'hidden', flexShrink: 0 }}>
                  <img src={selected.avatar} alt={selected.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', letterSpacing: '0.08em' }}>{selected.name}</p>
                  <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{selected.position}</p>
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                style={{ background: 'var(--bg)', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', boxShadow: neu.outset }}
              >
                <X size={14} />
              </button>
            </div>

            {/* info */}
            {[
              { label: 'AZIENDA', val: selected.company },
              { label: 'TELEFONO', val: selected.phone },
            ].map(({ label, val }) => val && (
              <div key={label} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '9px 14px', borderRadius: 12,
                background: 'var(--bg)', boxShadow: neu.insetSm,
              }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', color: 'var(--text-muted)' }}>{label}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{val}</span>
              </div>
            ))}

            {/* azioni */}
            <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
              <NeuButton accent onClick={() => { console.log('Chiama:', selected.phone); setSelected(null) }}>
                <Phone size={13} /> CHIAMA
              </NeuButton>
              <NeuButton onClick={() => { console.log('Messaggio a:', selected.id); setSelected(null) }}>
                <MessageSquare size={13} /> MESSAGGIO
              </NeuButton>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}