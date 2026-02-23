'use client'

import { useState } from 'react'
import { ArrowLeft, Mail, Phone, Building2, Calendar, Clock, Edit2, Save, X, User } from 'lucide-react'

const neu = {
  outset:  `5px 5px 14px var(--neu-dark), -3px -3px 9px var(--neu-light)`,
  inset:   `inset 3px 3px 8px var(--neu-dark), inset -2px -2px 5px var(--neu-light)`,
  insetSm: `inset 2px 2px 5px var(--neu-dark), inset -1px -1px 3px var(--neu-light)`,
  panel:   `8px 8px 20px var(--neu-dark), -5px -5px 14px var(--neu-light), inset 0 1px 0 rgba(255,255,255,0.2)`,
}

const statusColor: Record<string, string> = { Attivo: '#10b981', Inattivo: '#ef4444' }
const statusBg:    Record<string, string> = { Attivo: 'rgba(16,185,129,0.10)', Inattivo: 'rgba(239,68,68,0.10)' }
const statusBd:    Record<string, string> = { Attivo: 'rgba(16,185,129,0.22)', Inattivo: 'rgba(239,68,68,0.22)' }

function GlassPanel({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.07)',
      border: '1px solid rgba(255,255,255,0.12)',
      backdropFilter: 'blur(24px) saturate(1.5)',
      WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
      borderRadius: 24, padding: '26px 24px',
      boxShadow: neu.panel,
      ...style,
    }}>
      {children}
    </div>
  )
}

function InfoField({ label, value, icon: Icon }: { label: string; value?: string | number; icon?: any }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.09)',
      backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
      borderRadius: 14, padding: '14px 18px',
      boxShadow: neu.insetSm,
    }}>
      {Icon && (
        <div style={{ width: 30, height: 30, borderRadius: '50%', flexShrink: 0, background: 'rgba(99,102,241,0.10)', border: '1px solid rgba(99,102,241,0.20)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
          <Icon size={13} />
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', color: 'var(--text-muted)', marginBottom: 3 }}>{label.toUpperCase()}</p>
        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value ?? '—'}</p>
      </div>
    </div>
  )
}

function NeuBtn({ onClick, children, accent, danger }: { onClick?: () => void; children: React.ReactNode; accent?: boolean; danger?: boolean }) {
  const [pressed, setPressed] = useState(false)
  return (
    <button onClick={onClick} onMouseDown={() => setPressed(true)} onMouseUp={() => setPressed(false)} onMouseLeave={() => setPressed(false)}
      style={{
        background: danger ? 'rgba(239,68,68,0.08)' : accent ? 'rgba(99,102,241,0.10)' : 'rgba(255,255,255,0.07)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        border: danger ? '1px solid rgba(239,68,68,0.20)' : accent ? '1px solid rgba(99,102,241,0.22)' : '1px solid rgba(255,255,255,0.12)',
        borderRadius: 999, padding: '10px 20px',
        display: 'flex', alignItems: 'center', gap: 7,
        fontSize: 11, fontWeight: 700, letterSpacing: '0.14em',
        color: danger ? '#ef4444' : accent ? 'var(--accent)' : pressed ? 'var(--accent)' : 'var(--text)',
        cursor: 'pointer',
        boxShadow: pressed ? neu.inset : neu.outset,
        transition: 'box-shadow 0.15s, color 0.15s',
      }}>
      {children}
    </button>
  )
}

interface Cliente {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  status: string
  createdAt?: string
  lastContact?: string
  [key: string]: any
}

interface ClienteAnagraficaProps {
  cliente: Cliente
  onBack: () => void
  onSave?: (updated: Cliente) => void
}

export function ClienteAnagrafica({ cliente, onBack, onSave }: ClienteAnagraficaProps) {
  const [editing, setEditing]   = useState(false)
  const [form,    setForm]      = useState({ ...cliente })
  const [saved,   setSaved]     = useState(false)

  const handleSave = () => {
    onSave?.(form)
    setSaved(true)
    setEditing(false)
    setTimeout(() => setSaved(false), 2000)
  }

  const initials = form.name
    .split(' ')
    .map((w: string) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 900, margin: '0 auto' }}>

      {/* ── Top bar ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <NeuBtn onClick={onBack}>
          <ArrowLeft size={14} /> TORNA AI CLIENTI
        </NeuBtn>

        <div style={{ display: 'flex', gap: 10 }}>
          {editing ? (
            <>
              <NeuBtn onClick={handleSave} accent><Save size={13} /> SALVA</NeuBtn>
              <NeuBtn onClick={() => { setForm({ ...cliente }); setEditing(false) }}><X size={13} /> ANNULLA</NeuBtn>
            </>
          ) : (
            <NeuBtn onClick={() => setEditing(true)} accent><Edit2 size={13} /> MODIFICA</NeuBtn>
          )}
        </div>
      </div>

      {/* ── Hero card ── */}
      <GlassPanel>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>

          {/* Avatar con iniziali */}
          <div style={{
            width: 80, height: 80, borderRadius: '50%', flexShrink: 0,
            background: 'rgba(99,102,241,0.14)',
            border: '2px solid rgba(99,102,241,0.28)',
            backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
            boxShadow: neu.outset,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26, fontWeight: 800, letterSpacing: '0.04em',
            color: 'var(--accent)',
          }}>
            {initials}
          </div>

          <div style={{ flex: 1, minWidth: 200 }}>
            {editing ? (
              <input
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                style={{
                  fontSize: 22, fontWeight: 700, letterSpacing: '0.1em',
                  color: 'var(--text)', background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.14)',
                  backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
                  borderRadius: 12, padding: '6px 14px',
                  outline: 'none', width: '100%',
                  boxShadow: neu.inset, marginBottom: 8,
                }}
              />
            ) : (
              <h1 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text)', marginBottom: 6 }}>
                {form.name}
              </h1>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <span style={{
                padding: '4px 14px', borderRadius: 999,
                fontSize: 10, fontWeight: 700, letterSpacing: '0.14em',
                background: statusBg[form.status] ?? 'rgba(255,255,255,0.06)',
                border: `1px solid ${statusBd[form.status] ?? 'rgba(255,255,255,0.10)'}`,
                backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                color: statusColor[form.status] ?? 'var(--text-muted)',
              }}>
                {form.status?.toUpperCase()}
              </span>

              {form.company && (
                <span style={{ fontSize: 13, color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
                  @ {form.company}
                </span>
              )}
            </div>
          </div>

          {saved && (
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: '#10b981', padding: '6px 14px', borderRadius: 999, background: 'rgba(16,185,129,0.10)', border: '1px solid rgba(16,185,129,0.22)' }}>
              ✓ SALVATO
            </span>
          )}
        </div>
      </GlassPanel>

      {/* ── Info grid ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

        {/* Contatti */}
        <GlassPanel>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: 'var(--text-muted)', marginBottom: 16 }}>CONTATTI</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {editing ? (
              <>
                {[
                  { key: 'email', label: 'Email', type: 'email', icon: Mail },
                  { key: 'phone', label: 'Telefono', icon: Phone },
                ].map(({ key, label, type, icon: Icon }) => (
                  <div key={key}>
                    <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', color: 'var(--text-muted)', marginBottom: 6 }}>{label.toUpperCase()}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 30, height: 30, borderRadius: '50%', flexShrink: 0, background: 'rgba(99,102,241,0.10)', border: '1px solid rgba(99,102,241,0.20)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                        <Icon size={13} />
                      </div>
                      <input
                        type={type ?? 'text'}
                        value={(form as any)[key] ?? ''}
                        onChange={e => setForm({ ...form, [key]: e.target.value })}
                        style={{ flex: 1, background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '9px 14px', fontSize: 13, fontWeight: 500, color: 'var(--text)', outline: 'none', boxShadow: neu.inset }}
                      />
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                <InfoField label="Email"    value={form.email}   icon={Mail}  />
                <InfoField label="Telefono" value={form.phone}   icon={Phone} />
              </>
            )}
          </div>
        </GlassPanel>

        {/* Azienda */}
        <GlassPanel>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: 'var(--text-muted)', marginBottom: 16 }}>AZIENDA</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {editing ? (
              <>
                {[
                  { key: 'company', label: 'Azienda', icon: Building2 },
                ].map(({ key, label, icon: Icon }) => (
                  <div key={key}>
                    <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', color: 'var(--text-muted)', marginBottom: 6 }}>{label.toUpperCase()}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 30, height: 30, borderRadius: '50%', flexShrink: 0, background: 'rgba(99,102,241,0.10)', border: '1px solid rgba(99,102,241,0.20)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                        <Icon size={13} />
                      </div>
                      <input
                        value={(form as any)[key] ?? ''}
                        onChange={e => setForm({ ...form, [key]: e.target.value })}
                        style={{ flex: 1, background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '9px 14px', fontSize: 13, fontWeight: 500, color: 'var(--text)', outline: 'none', boxShadow: neu.inset }}
                      />
                    </div>
                  </div>
                ))}

                {/* Status select */}
                <div>
                  <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', color: 'var(--text-muted)', marginBottom: 6 }}>STATO</p>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {['Attivo', 'Inattivo'].map(s => (
                      <button key={s} onClick={() => setForm({ ...form, status: s })}
                        style={{
                          flex: 1, padding: '9px', borderRadius: 10,
                          background: form.status === s ? statusBg[s] : 'rgba(255,255,255,0.04)',
                          border: `1px solid ${form.status === s ? statusBd[s] : 'rgba(255,255,255,0.09)'}`,
                          color: form.status === s ? statusColor[s] : 'var(--text-muted)',
                          fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
                          cursor: 'pointer',
                          boxShadow: form.status === s ? neu.insetSm : neu.outset,
                          transition: 'all 0.2s',
                        }}>
                        {s.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <InfoField label="Azienda" value={form.company} icon={Building2} />
                <InfoField label="Stato"   value={form.status}  icon={User} />
              </>
            )}
          </div>
        </GlassPanel>
      </div>

      {/* ── Date ── */}
      <GlassPanel>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: 'var(--text-muted)', marginBottom: 16 }}>STORICO</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <InfoField label="Cliente dal"      value={form.createdAt}    icon={Calendar} />
          <InfoField label="Ultimo contatto"  value={form.lastContact}  icon={Clock}    />
        </div>
      </GlassPanel>

      {/* ── Note (campo libero) ── */}
      <GlassPanel>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: 'var(--text-muted)', marginBottom: 16 }}>NOTE</p>
        <textarea
          readOnly={!editing}
          value={form.notes ?? ''}
          onChange={e => setForm({ ...form, notes: e.target.value })}
          placeholder={editing ? 'Aggiungi note sul cliente…' : 'Nessuna nota'}
          rows={4}
          style={{
            width: '100%',
            background: editing ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: 14, padding: '14px 18px',
            fontSize: 13, fontWeight: 500, letterSpacing: '0.04em',
            color: 'var(--text)', outline: 'none',
            resize: 'vertical',
            boxShadow: editing ? neu.inset : neu.insetSm,
            fontFamily: 'inherit',
            transition: 'background 0.2s, box-shadow 0.2s',
          }}
        />
      </GlassPanel>

    </div>
  )
}