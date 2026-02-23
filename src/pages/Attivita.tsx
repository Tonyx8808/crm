'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useEffect } from 'react'
import { useAttivitaStore } from '../stores/attivitaStore'

const neu = {
  outset:     `5px 5px 14px var(--neu-dark), -3px -3px 9px var(--neu-light)`,
  outsetHover:`7px 7px 18px var(--neu-dark), -4px -4px 11px var(--neu-light)`,
  insetSm:    `inset 2px 2px 5px var(--neu-dark), inset -1px -1px 3px var(--neu-light)`,
  inset:      `inset 3px 3px 8px var(--neu-dark), inset -2px -2px 5px var(--neu-light)`,
  panel:      `8px 8px 20px var(--neu-dark), -5px -5px 14px var(--neu-light), inset 0 1px 0 rgba(255,255,255,0.2)`,
}

const priorityConfig = {
  alta:  { label: 'Alta',  color: '#ef4444', bg: 'rgba(239,68,68,0.10)',  border: 'rgba(239,68,68,0.22)'  },
  media: { label: 'Media', color: '#f59e0b', bg: 'rgba(245,158,11,0.10)', border: 'rgba(245,158,11,0.22)' },
  bassa: { label: 'Bassa', color: '#10b981', bg: 'rgba(16,185,129,0.10)', border: 'rgba(16,185,129,0.22)' },
} as const

export function Attivita() {
  const { t } = useLanguage()
  const { attivita, loading, fetchAttivita } = useAttivitaStore()

  useEffect(() => { fetchAttivita() }, [])

  return (
    <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>

      <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '0.18em', color: 'var(--text)', marginBottom: 8 }}>
        {t('nav.attivita')}
      </h1>

      {/* Pannello principale glass */}
      <div style={{
        background: 'rgba(255,255,255,0.07)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 28,
        backdropFilter: 'blur(24px) saturate(1.5)',
        WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
        boxShadow: neu.panel,
        padding: '28px 24px',
      }}>

        {loading && (
          <p style={{ color: 'var(--text-muted)', fontSize: 12, letterSpacing: '0.18em', fontWeight: 600 }}>
            CARICAMENTO ATTIVITÀ…
          </p>
        )}

        {!loading && attivita.length === 0 && (
          <p style={{ color: 'var(--text-muted)', fontSize: 12, letterSpacing: '0.12em' }}>
            Nessuna attività disponibile.
          </p>
        )}

        {!loading && attivita.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {attivita.map(a => {
              const prio = priorityConfig[a.priority as keyof typeof priorityConfig] ?? priorityConfig.bassa

              return (
                <div
                  key={a.id}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.09)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    borderRadius: 20,
                    padding: '18px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: 16,
                    boxShadow: neu.outset,
                    transition: 'box-shadow 0.2s, background 0.2s',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.boxShadow = neu.outsetHover
                    el.style.background = 'rgba(255,255,255,0.09)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.boxShadow = neu.outset
                    el.style.background = 'rgba(255,255,255,0.05)'
                  }}
                >
                  {/* ── Info sinistra ── */}
                  <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>

                    {/* Icona cerchio glass */}
                    <div style={{
                      width: 42, height: 42,
                      borderRadius: '50%',
                      flexShrink: 0,
                      background: 'rgba(255,255,255,0.08)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.14)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: neu.outset,
                      color: 'var(--accent)',
                      fontSize: 18,
                    }}>
                      {a.completed ? '✓' : '○'}
                    </div>

                    <div>
                      <h3 style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text)', marginBottom: 4 }}>
                        {a.title}
                      </h3>
                      <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>
                        {a.description}
                      </p>

                      {/* Meta pill glass */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {[
                          { icon: '👤', val: a.cliente },
                          { icon: '📅', val: `${a.date} — ${a.time}` },
                          { icon: '🔖', val: a.assignee },
                        ].map(({ icon, val }) => (
                          <span
                            key={val}
                            style={{
                              display: 'flex', alignItems: 'center', gap: 5,
                              padding: '4px 12px',
                              borderRadius: 999,
                              background: 'rgba(255,255,255,0.06)',
                              border: '1px solid rgba(255,255,255,0.10)',
                              backdropFilter: 'blur(8px)',
                              WebkitBackdropFilter: 'blur(8px)',
                              fontSize: 11,
                              fontWeight: 600,
                              letterSpacing: '0.08em',
                              color: 'var(--text-muted)',
                              boxShadow: neu.insetSm,
                            }}
                          >
                            <span>{icon}</span> {val}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ── Badge destra ── */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flexShrink: 0 }}>

                    {/* Priorità — glass tintato */}
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: 999,
                      fontSize: 10, fontWeight: 700, letterSpacing: '0.14em',
                      background: prio.bg,
                      border: `1px solid ${prio.border}`,
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      color: prio.color,
                    }}>
                      {prio.label.toUpperCase()}
                    </span>

                    {/* Stato */}
                    <span style={{
                      padding: '4px 14px',
                      borderRadius: 999,
                      fontSize: 10, fontWeight: 700, letterSpacing: '0.14em',
                      background: a.completed ? 'rgba(99,102,241,0.10)' : 'rgba(255,255,255,0.05)',
                      border: a.completed ? '1px solid rgba(99,102,241,0.22)' : '1px solid rgba(255,255,255,0.09)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      color: a.completed ? 'var(--accent)' : 'var(--text-muted)',
                      boxShadow: a.completed ? neu.inset : neu.outset,
                    }}>
                      {a.completed ? 'COMPLETATA' : 'DA FARE'}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}