'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useEffect } from 'react'
import { useOpportunitaStore } from '../stores/opportunitaStore'

const neu = {
  outset:     `5px 5px 14px var(--neu-dark), -3px -3px 9px var(--neu-light)`,
  outsetHover:`7px 7px 18px var(--neu-dark), -4px -4px 11px var(--neu-light)`,
  insetSm:    `inset 2px 2px 5px var(--neu-dark), inset -1px -1px 3px var(--neu-light)`,
  panel:      `8px 8px 20px var(--neu-dark), -5px -5px 14px var(--neu-light), inset 0 1px 0 rgba(255,255,255,0.2)`,
}

const stageConfig: Record<string, { color: string; bg: string; border: string }> = {
  lead:        { color: '#94a3b8', bg: 'rgba(148,163,184,0.10)', border: 'rgba(148,163,184,0.22)' },
  qualified:   { color: '#6366f1', bg: 'rgba(99,102,241,0.10)',  border: 'rgba(99,102,241,0.22)'  },
  proposal:    { color: '#f59e0b', bg: 'rgba(245,158,11,0.10)',  border: 'rgba(245,158,11,0.22)'  },
  negotiation: { color: '#8b5cf6', bg: 'rgba(139,92,246,0.10)', border: 'rgba(139,92,246,0.22)'  },
  won:         { color: '#10b981', bg: 'rgba(16,185,129,0.10)', border: 'rgba(16,185,129,0.22)'  },
  lost:        { color: '#ef4444', bg: 'rgba(239,68,68,0.10)',  border: 'rgba(239,68,68,0.22)'   },
}

export function Opportunita() {
  const { t } = useLanguage()
  const { opportunita, loading, fetchOpportunita } = useOpportunitaStore()

  useEffect(() => { fetchOpportunita() }, [])

  return (
    <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>

      <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '0.18em', color: 'var(--text)', marginBottom: 8 }}>
        {t('nav.opportunita')}
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
            CARICAMENTO OPPORTUNITÀ…
          </p>
        )}

        {!loading && opportunita.length === 0 && (
          <p style={{ color: 'var(--text-muted)', fontSize: 12, letterSpacing: '0.12em' }}>
            Nessuna opportunità disponibile.
          </p>
        )}

        {!loading && opportunita.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {opportunita.map(o => {
              const stage = stageConfig[o.stage] ?? stageConfig.lead
              return (
                <div
                  key={o.id}
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
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{
                      fontSize: 15, fontWeight: 700,
                      letterSpacing: '0.08em',
                      color: 'var(--text)',
                      marginBottom: 4,
                    }}>
                      {o.title}
                    </h3>

                    {o.notes && (
                      <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>
                        {o.notes}
                      </p>
                    )}

                    {/* Meta pill neumorfiche glass */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {[
                        { icon: '👤', val: o.cliente },
                        { icon: '💶', val: `€ ${o.value.toLocaleString()}` },
                        { icon: '📊', val: `${o.probability}%` },
                        { icon: '📅', val: o.closeDate },
                        { icon: '👔', val: o.owner },
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

                  {/* ── Stage badge destra ── */}
                  <span style={{
                    flexShrink: 0,
                    padding: '5px 14px',
                    borderRadius: 999,
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    background: stage.bg,
                    border: `1px solid ${stage.border}`,
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    color: stage.color,
                    textTransform: 'uppercase' as const,
                  }}>
                    {o.stage}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}