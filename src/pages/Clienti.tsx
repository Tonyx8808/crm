'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui'
import { useLanguage } from '@/contexts/LanguageContext'
import { MOCK_CLIENTI, Cliente } from '@/data/mockClienti'
import { Plus, Search, Trash2 } from 'lucide-react'
import { ClienteAnagrafica } from './ClienteAnagrafica'

const neu = {
  outset:     `5px 5px 14px var(--neu-dark), -3px -3px 9px var(--neu-light)`,
  outsetHover:`7px 7px 18px var(--neu-dark), -4px -4px 11px var(--neu-light)`,
  inset:      `inset 3px 3px 8px var(--neu-dark), inset -2px -2px 5px var(--neu-light)`,
  insetSm:    `inset 2px 2px 5px var(--neu-dark), inset -1px -1px 3px var(--neu-light)`,
  panel:      `8px 8px 20px var(--neu-dark), -5px -5px 14px var(--neu-light), inset 0 1px 0 rgba(255,255,255,0.2)`,
}

const statusColor: Record<string, string> = { Attivo: '#10b981', Inattivo: '#ef4444' }
const statusBg:    Record<string, string> = { Attivo: 'rgba(16,185,129,0.10)', Inattivo: 'rgba(239,68,68,0.10)' }
const statusBd:    Record<string, string> = { Attivo: 'rgba(16,185,129,0.22)', Inattivo: 'rgba(239,68,68,0.22)' }

function NeuBtn({ onClick, children, danger }: { onClick?: () => void; children: React.ReactNode; danger?: boolean }) {
  const [pressed, setPressed] = useState(false)
  return (
    <button onClick={onClick} onMouseDown={() => setPressed(true)} onMouseUp={() => setPressed(false)} onMouseLeave={() => setPressed(false)}
      style={{
        background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.14)',
        borderRadius: 999, padding: '10px 22px',
        display: 'flex', alignItems: 'center', gap: 7,
        fontSize: 11, fontWeight: 700, letterSpacing: '0.14em',
        color: danger ? '#ef4444' : pressed ? 'var(--accent)' : 'var(--text)',
        cursor: 'pointer', boxShadow: pressed ? neu.inset : neu.outset,
        transition: 'box-shadow 0.15s, color 0.15s',
      }}>
      {children}
    </button>
  )
}

function GlassInput({ value, onChange, placeholder, label, type = 'text' }: { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder?: string; label?: string; type?: string }) {
  return (
    <div>
      {label && <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', color: 'var(--text-muted)', marginBottom: 7 }}>{label.toUpperCase()}</p>}
      <input type={type} value={value} onChange={onChange} placeholder={placeholder}
        style={{ width: '100%', background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 14, padding: '11px 18px', fontSize: 13, fontWeight: 500, letterSpacing: '0.06em', color: 'var(--text)', outline: 'none', boxShadow: neu.inset }} />
    </div>
  )
}

export function Clienti() {
  const { t } = useLanguage()
  const [clienti, setClienti]           = useState(MOCK_CLIENTI)
  const [searchTerm, setSearchTerm]     = useState('')
  const [showModal, setShowModal]       = useState(false)
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null)
  const [formData, setFormData]         = useState({ name: '', email: '', phone: '', company: '', status: 'Attivo' as const })

  const filtered = clienti.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAdd = () => {
    if (formData.name && formData.email) {
      const newCliente: Cliente = {
        id: Date.now().toString(), ...formData,
        createdAt: new Date().toISOString().split('T')[0],
        lastContact: new Date().toISOString().split('T')[0],
      }
      setClienti([newCliente, ...clienti])
      setFormData({ name: '', email: '', phone: '', company: '', status: 'Attivo' })
      setShowModal(false)
    }
  }

  const handleSaveCliente = (updated: Cliente) => {
    setClienti(clienti.map(c => c.id === updated.id ? updated as Cliente : c))
    setSelectedCliente(updated as Cliente)
  }

  /* ── Vista anagrafica ── */
  if (selectedCliente) {
    return (
      <ClienteAnagrafica
        cliente={selectedCliente}
        onBack={() => setSelectedCliente(null)}
        onSave={handleSaveCliente}
      />
    )
  }

  /* ── Vista lista ── */
  return (
    <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '0.18em', color: 'var(--text)', marginBottom: 6 }}>{t('nav.clienti')}</h1>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', letterSpacing: '0.08em' }}>Gestisci i tuoi clienti</p>
        </div>
        <NeuBtn onClick={() => setShowModal(true)}><Plus size={15} /> {t('btn.nuovo')}</NeuBtn>
      </div>

      {/* Search glass */}
      <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(20px) saturate(1.5)', WebkitBackdropFilter: 'blur(20px) saturate(1.5)', borderRadius: 999, padding: '8px 20px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: neu.panel }}>
        <Search size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
        <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder={t('btn.cerca')}
          style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: 13, fontWeight: 500, letterSpacing: '0.06em', color: 'var(--text)' }} />
      </div>

      {/* Tabella glass */}
      <div style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(24px) saturate(1.5)', WebkitBackdropFilter: 'blur(24px) saturate(1.5)', borderRadius: 24, padding: 20, boxShadow: neu.panel, overflowX: 'auto' }}>

        {/* Header tabella */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 2fr 1fr auto', gap: 12, padding: '8px 16px', marginBottom: 8, background: 'rgba(255,255,255,0.04)', borderRadius: 12 }}>
          {['NOME', 'EMAIL', 'AZIENDA', 'STATO', ''].map(h => (
            <span key={h} style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.22em', color: 'var(--text-muted)' }}>{h}</span>
          ))}
        </div>

        {/* Righe */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtered.map(c => (
            <div key={c.id}
              style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 2fr 1fr auto', gap: 12, alignItems: 'center', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', borderRadius: 14, padding: '12px 16px', boxShadow: neu.outset, transition: 'box-shadow 0.2s, background 0.2s' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = neu.outsetHover; el.style.background = 'rgba(255,255,255,0.09)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = neu.outset; el.style.background = 'rgba(255,255,255,0.05)' }}
            >
              {/* Nome — cliccabile → anagrafica */}
              <button
                onClick={() => setSelectedCliente(c)}
                style={{
                  background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                  fontSize: 13, fontWeight: 700, color: 'var(--accent)',
                  textAlign: 'left', letterSpacing: '0.04em',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  textDecoration: 'underline', textUnderlineOffset: 3,
                  textDecorationColor: 'rgba(99,102,241,0.4)',
                  transition: 'color 0.15s',
                }}
              >
                {c.name}
              </button>

              <span style={{ fontSize: 12, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.email}</span>
              <span style={{ fontSize: 12, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.company}</span>

              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', padding: '4px 10px', borderRadius: 999, background: statusBg[c.status] ?? 'rgba(255,255,255,0.06)', border: `1px solid ${statusBd[c.status] ?? 'rgba(255,255,255,0.10)'}`, backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', color: statusColor[c.status] ?? 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                {c.status.toUpperCase()}
              </span>

              <button onClick={() => setClienti(clienti.filter(x => x.id !== c.id))}
                style={{ background: 'rgba(239,68,68,0.08)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', border: '1px solid rgba(239,68,68,0.18)', borderRadius: '50%', width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#ef4444', boxShadow: neu.outset }}>
                <Trash2 size={13} />
              </button>
            </div>
          ))}

          {filtered.length === 0 && (
            <p style={{ textAlign: 'center', padding: 24, color: 'var(--text-muted)', fontSize: 13, letterSpacing: '0.08em' }}>
              Nessun cliente trovato.
            </p>
          )}
        </div>
      </div>

      {/* Modal aggiungi */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Nuovo Cliente">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: 4 }}>
          <GlassInput label="Nome"     value={formData.name}    onChange={e => setFormData({ ...formData, name: e.target.value })} />
          <GlassInput label="Email"    type="email" value={formData.email}   onChange={e => setFormData({ ...formData, email: e.target.value })} />
          <GlassInput label="Telefono" value={formData.phone}   onChange={e => setFormData({ ...formData, phone: e.target.value })} />
          <GlassInput label="Azienda"  value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} />
          <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
            <NeuBtn onClick={handleAdd}>SALVA</NeuBtn>
            <NeuBtn onClick={() => setShowModal(false)}>ANNULLA</NeuBtn>
          </div>
        </div>
      </Modal>
    </div>
  )
}