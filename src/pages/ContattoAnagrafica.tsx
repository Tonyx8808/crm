'use client'

import { useState } from 'react'
import { ArrowLeft, Mail, Phone, Building2, Briefcase, Edit2, Save, X } from 'lucide-react'
import type { Contatto as ContattoStore } from '../stores/contattiStore'

// Estende il tipo dello store con i campi opzionali usati nell'anagrafica
type ContattoForm = ContattoStore & {
  email?: string
  notes?: string
}

const neu = {
  outset:  `5px 5px 14px var(--neu-dark), -3px -3px 9px var(--neu-light)`,
  inset:   `inset 3px 3px 8px var(--neu-dark), inset -2px -2px 5px var(--neu-light)`,
  insetSm: `inset 2px 2px 5px var(--neu-dark), inset -1px -1px 3px var(--neu-light)`,
  panel:   `8px 8px 20px var(--neu-dark), -5px -5px 14px var(--neu-light), inset 0 1px 0 rgba(255,255,255,0.2)`,
}

const statusConfig: Record<string, { color: string; bg: string; border: string; dot: string }> = {
  online:  { color: '#10b981', bg: 'rgba(16,185,129,0.10)',  border: 'rgba(16,185,129,0.22)',  dot: '#10b981' },
  away:    { color: '#f59e0b', bg: 'rgba(245,158,11,0.10)',  border: 'rgba(245,158,11,0.22)',  dot: '#f59e0b' },
  offline: { color: '#94a3b8', bg: 'rgba(148,163,184,0.08)', border: 'rgba(148,163,184,0.18)', dot: '#94a3b8' },
}

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

function InfoField({ label, value, icon: Icon }: { label: string; value?: string; icon?: any }) {
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

function EditInput({ label, value, onChange, type = 'text', icon: Icon }: { label: string; value: string; onChange: (v: string) => void; type?: string; icon?: any }) {
  return (
    <div>
      <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', color: 'var(--text-muted)', marginBottom: 6 }}>{label.toUpperCase()}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {Icon && (
          <div style={{ width: 30, height: 30, borderRadius: '50%', flexShrink: 0, background: 'rgba(99,102,241,0.10)', border: '1px solid rgba(99,102,241,0.20)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
            <Icon size={13} />
          </div>
        )}
        <input
          type={type} value={value} onChange={e => onChange(e.target.value)}
          style={{ flex: 1, background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '9px 14px', fontSize: 13, fontWeight: 500, color: 'var(--text)', outline: 'none', boxShadow: neu.inset }}
        />
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

interface ContattoAnagraficaProps {
  contatto: ContattoStore
  onBack: () => void
  onSave?: (updated: ContattoStore) => void
}

export function ContattoAnagrafica({ contatto, onBack, onSave }: ContattoAnagraficaProps) {
  const [editing, setEditing] = useState(false)
  const [form, setForm]       = useState<ContattoForm>({ ...contatto })
  const [saved, setSaved]     = useState(false)

  const handleSave = () => {
    onSave?.(form)
    setSaved(true)
    setEditing(false)
    setTimeout(() => setSaved(false), 2000)
  }

  const st = statusConfig[form.status] ?? statusConfig.offline

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
          <ArrowLeft size={14} /> TORNA AI CONTATTI
        </NeuBtn>
        <div style={{ display: 'flex', gap: 10 }}>
          {editing ? (
            <>
              <NeuBtn onClick={handleSave} accent><Save size={13} /> SALVA</NeuBtn>
              <NeuBtn onClick={() => { setForm({ ...contatto }); setEditing(false) }}><X size={13} /> ANNULLA</NeuBtn>
            </>
          ) : (
            <NeuBtn onClick={() => setEditing(true)} accent><Edit2 size={13} /> MODIFICA</NeuBtn>
          )}
        </div>
      </div>

      {/* ── Hero card ── */}
      <GlassPanel>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>

          {/* Avatar — foto o iniziali */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            {form.avatar ? (
              <div style={{ width: 80, height: 80, borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(99,102,241,0.28)', boxShadow: neu.outset }}>
                <img src={form.avatar} alt={form.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ) : (
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(99,102,241,0.14)', border: '2px solid rgba(99,102,241,0.28)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', boxShadow: neu.outset, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, fontWeight: 800, color: 'var(--accent)' }}>
                {initials}
              </div>
            )}
            {/* dot status */}
            <span style={{ position: 'absolute', bottom: 2, right: 2, width: 16, height: 16, borderRadius: '50%', background: st.dot, border: '3px solid var(--bg)', boxShadow: '0 0 6px ' + st.dot + '88' }} />
          </div>

          <div style={{ flex: 1, minWidth: 200 }}>
            {editing ? (
              <input
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                style={{ fontSize: 22, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text)', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', borderRadius: 12, padding: '6px 14px', outline: 'none', width: '100%', boxShadow: neu.inset, marginBottom: 8 }}
              />
            ) : (
              <h1 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text)', marginBottom: 6 }}>
                {form.name}
              </h1>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              {/* Status pill */}
              <span style={{ padding: '4px 14px', borderRadius: 999, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', background: st.bg, border: `1px solid ${st.border}`, backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', color: st.color }}>
                {form.status?.toUpperCase()}
              </span>
              {form.position && (
                <span style={{ fontSize: 13, color: 'var(--text-muted)', letterSpacing: '0.06em' }}>{form.position}</span>
              )}
              {form.company && (
                <span style={{ fontSize: 12, color: 'var(--text-muted)', letterSpacing: '0.06em' }}>@ {form.company}</span>
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
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: 'var(--text-muted)', marginBottom: 16 }}>RECAPITI</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {editing ? (
              <>
                <EditInput label="Telefono" value={form.phone ?? ''} onChange={v => setForm({ ...form, phone: v })} icon={Phone} />
                <EditInput label="Email"    value={form.email ?? ''} onChange={v => setForm({ ...form, email: v })} type="email" icon={Mail} />
              </>
            ) : (
              <>
                <InfoField label="Telefono" value={form.phone} icon={Phone} />
                <InfoField label="Email"    value={form.email} icon={Mail}  />
              </>
            )}
          </div>
        </GlassPanel>

        {/* Lavoro */}
        <GlassPanel>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: 'var(--text-muted)', marginBottom: 16 }}>LAVORO</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {editing ? (
              <>
                <EditInput label="Azienda"   value={form.company  ?? ''} onChange={v => setForm({ ...form, company: v })}  icon={Building2} />
                <EditInput label="Posizione" value={form.position ?? ''} onChange={v => setForm({ ...form, position: v })} icon={Briefcase} />

                {/* Status */}
                <div>
                  <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', color: 'var(--text-muted)', marginBottom: 6 }}>STATO</p>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {(['online', 'away', 'offline'] as const).map(s => {
                      const sc = statusConfig[s]
                      return (
                        <button key={s} onClick={() => setForm({ ...form, status: s })}
                          style={{ flex: 1, padding: '8px', borderRadius: 10, background: form.status === s ? sc.bg : 'rgba(255,255,255,0.04)', border: `1px solid ${form.status === s ? sc.border : 'rgba(255,255,255,0.09)'}`, color: form.status === s ? sc.color : 'var(--text-muted)', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', cursor: 'pointer', boxShadow: form.status === s ? neu.insetSm : neu.outset, transition: 'all 0.2s' }}>
                          {s.toUpperCase()}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </>
            ) : (
              <>
                <InfoField label="Azienda"   value={form.company}  icon={Building2} />
                <InfoField label="Posizione" value={form.position} icon={Briefcase} />
              </>
            )}
          </div>
        </GlassPanel>
      </div>

      {/* ── Note ── */}
      <GlassPanel>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: 'var(--text-muted)', marginBottom: 16 }}>NOTE</p>
        <textarea
          readOnly={!editing}
          value={form.notes ?? ''}
          onChange={e => setForm({ ...form, notes: e.target.value })}
          placeholder={editing ? 'Aggiungi note sul contatto…' : 'Nessuna nota'}
          rows={4}
          style={{
            width: '100%',
            background: editing ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: 14, padding: '14px 18px',
            fontSize: 13, fontWeight: 500, letterSpacing: '0.04em',
            color: 'var(--text)', outline: 'none', resize: 'vertical',
            boxShadow: editing ? neu.inset : neu.insetSm,
            fontFamily: 'inherit',
            transition: 'background 0.2s, box-shadow 0.2s',
          }}
        />
      </GlassPanel>

    </div>
  )
}