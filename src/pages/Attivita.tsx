'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useEffect } from 'react'
import { useAttivitaStore } from '../stores/attivitaStore'

/* ─────────────────────────────────────────────────────────────
   STILE NEUMORFICO + FROST GLASS
   Variabili CSS ereditate dal tema globale (light / dark):
     --bg        sfondo base
     --neu-light luce neumorfica
     --neu-dark  ombra neumorfica
     --glass-bg  superficie glass
     --glass-border bordo glass
     --text / --text-muted
     --accent    (indigo)
   ───────────────────────────────────────────────────────────── */

const priorityConfig = {
  alta:  { label: 'Alta',  cls: 'bg-red-500/10 text-red-400 border border-red-500/20' },
  media: { label: 'Media', cls: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' },
  bassa: { label: 'Bassa', cls: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' },
} as const

export function Attivita() {
  const { t } = useLanguage()
  const { attivita, loading, fetchAttivita } = useAttivitaStore()

  useEffect(() => { fetchAttivita() }, [])

  return (
    <div className="p-8">

      {/* ── Titolo pagina ── */}
      <h1
        className="text-3xl font-bold tracking-widest mb-8"
        style={{ color: 'var(--text)', letterSpacing: '0.18em' }}
      >
        {t('nav.attivita')}
      </h1>

      {/* ── Pannello principale frost-glass neumorfico ── */}
      <div style={{
        background:       'var(--glass-bg)',
        border:           '1px solid var(--glass-border)',
        borderRadius:     28,
        backdropFilter:   'blur(24px) saturate(1.5)',
        WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
        boxShadow: `
          8px 8px 20px var(--neu-dark),
          -5px -5px 14px var(--neu-light),
          inset 0 1px 0 rgba(255,255,255,0.2)
        `,
        padding: '28px 24px',
      }}>

        {/* Loading */}
        {loading && (
          <p className="text-sm tracking-widest" style={{ color: 'var(--text-muted)' }}>
            Caricamento attività…
          </p>
        )}

        {/* Empty state */}
        {!loading && attivita.length === 0 && (
          <p className="text-sm tracking-widest" style={{ color: 'var(--text-muted)' }}>
            Nessuna attività disponibile.
          </p>
        )}

        {/* Lista */}
        {!loading && attivita.length > 0 && (
          <div className="flex flex-col gap-4">
            {attivita.map(a => {
              const prio = priorityConfig[a.priority as keyof typeof priorityConfig]
                        ?? priorityConfig.bassa

              return (
                <div
                  key={a.id}
                  style={{
                    background:   'var(--bg)',
                    borderRadius: 20,
                    padding:      '18px 20px',
                    display:      'flex',
                    justifyContent: 'space-between',
                    alignItems:   'flex-start',
                    gap:          16,
                    /* neumorfico outset = card sollevata */
                    boxShadow: `
                      5px 5px 14px var(--neu-dark),
                      -3px -3px 9px var(--neu-light)
                    `,
                    transition: 'box-shadow 0.2s',
                  }}
                  onMouseEnter={e => {
                    ;(e.currentTarget as HTMLDivElement).style.boxShadow = `
                      7px 7px 18px var(--neu-dark),
                      -4px -4px 11px var(--neu-light)
                    `
                  }}
                  onMouseLeave={e => {
                    ;(e.currentTarget as HTMLDivElement).style.boxShadow = `
                      5px 5px 14px var(--neu-dark),
                      -3px -3px 9px var(--neu-light)
                    `
                  }}
                >
                  {/* ── Info sinistra ── */}
                  <div className="flex gap-4 items-start">

                    {/* Icona cerchio neumorfica */}
                    <div style={{
                      width: 42, height: 42,
                      borderRadius: '50%',
                      flexShrink: 0,
                      background: 'var(--bg)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: `
                        3px 3px 8px var(--neu-dark),
                        -2px -2px 5px var(--neu-light)
                      `,
                      color: 'var(--accent)',
                      fontSize: 18,
                    }}>
                      {a.completed ? '✓' : '○'}
                    </div>

                    <div>
                      <h3
                        className="text-base font-bold tracking-wide mb-1"
                        style={{ color: 'var(--text)' }}
                      >
                        {a.title}
                      </h3>

                      <p className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>
                        {a.description}
                      </p>

                      {/* Meta info — pill neumorfiche inset */}
                      <div className="flex flex-wrap gap-2">
                        {[
                          { icon: '👤', val: a.cliente },
                          { icon: '📅', val: `${a.date} — ${a.time}` },
                          { icon: '🔖', val: a.assignee },
                        ].map(({ icon, val }) => (
                          <span
                            key={val}
                            style={{
                              background: 'var(--bg)',
                              borderRadius: 999,
                              padding: '4px 12px',
                              fontSize: 11,
                              fontWeight: 600,
                              letterSpacing: '0.08em',
                              color: 'var(--text-muted)',
                              /* inset = scavato */
                              boxShadow: `
                                inset 2px 2px 5px var(--neu-dark),
                                inset -1px -1px 3px var(--neu-light)
                              `,
                              display: 'flex', alignItems: 'center', gap: 5,
                            }}
                          >
                            <span>{icon}</span> {val}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ── Badge destra ── */}
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">

                    {/* Priorità */}
                    <span
                      className={`text-xs font-bold tracking-widest px-3 py-1 rounded-full ${prio.cls}`}
                      style={{ fontSize: 10 }}
                    >
                      {prio.label}
                    </span>

                    {/* Stato — pill neumorfica */}
                    <span
                      style={{
                        background: 'var(--bg)',
                        borderRadius: 999,
                        padding: '4px 14px',
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: '0.14em',
                        color: a.completed ? 'var(--accent)' : 'var(--text-muted)',
                        boxShadow: a.completed
                          ? `inset 2px 2px 6px var(--neu-dark), inset -1px -1px 4px var(--neu-light)`
                          : `3px 3px 7px var(--neu-dark), -2px -2px 5px var(--neu-light)`,
                      }}
                    >
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