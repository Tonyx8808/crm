'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui'
import { useLanguage } from '@/contexts/LanguageContext'
import { MOCK_CLIENTI, Cliente } from '@/data/mockClienti'
import { Plus, Search, Trash2 } from 'lucide-react'

const neu = {
  outset:     `5px 5px 14px var(--neu-dark), -3px -3px 9px var(--neu-light)`,
  outsetHover:`7px 7px 18px var(--neu-dark), -4px -4px 11px var(--neu-light)`,
  inset:      `inset 3px 3px 8px var(--neu-dark), inset -2px -2px 5px var(--neu-light)`,
  insetSm:    `inset 2px 2px 5px var(--neu-dark), inset -1px -1px 3px var(--neu-light)`,
  panel:      `8px 8px 20px var(--neu-dark), -5px -5px 14px var(--neu-light), inset 0 1px 0 rgba(255,255,255,0.2)`,
}
const glass: React.CSSProperties = {
  background: 'var(--glass-bg)',
  border: '1px solid var(--glass-border)',
  backdropFilter: 'blur(24px) saturate(1.5)',
  WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
}

function NeuBtn({ onClick, children, danger }: { onClick?: () => void; children: React.ReactNode; danger?: boolean }) {
  const [pressed, setPressed] = useState(false)
  return (
    <button onClick={onClick} onMouseDown={() => setPressed(true)} onMouseUp={() => setPressed(false)} onMouseLeave={() => setPressed(false)}
      style={{ background: 'var(--bg)', border: 'none', borderRadius: 999, padding: '10px 22px', display: 'flex', alignItems: 'center', gap: 7, fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: danger ? '#ef4444' : pressed ? 'var(--accent)' : 'var(--text)', cursor: 'pointer', boxShadow: pressed ? neu.inset : neu.outset, transition: 'box-shadow 0.15s, color 0.15s' }}>
      {children}
    </button>
  )
}

function NeuInput({ value, onChange, placeholder, label, type = 'text' }: { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder?: string; label?: string; type?: string }) {
  return (
    <div>
      {label && <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', color: 'var(--text-muted)', marginBottom: 7 }}>{label.toUpperCase()}</p>}
      <input type={type} value={value} onChange={onChange} placeholder={placeholder}
        style={{ width: '100%', background: 'var(--bg)', border: 'none', borderRadius: 14, padding: '11px 18px', fontSize: 13, fontWeight: 500, letterSpacing: '0.06em', color: 'var(--text)', outline: 'none', boxShadow: neu.inset }} />
    </div>
  )
}

const statusColor: Record<string, string> = { Attivo: '#10b981', Inattivo: '#ef4444' }

export function Clienti() {
  const { t } = useLanguage()
  const [clienti, setClienti] = useState(MOCK_CLIENTI)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', status: 'Attivo' as const })

  const filtered = clienti.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAdd = () => {
    if (formData.name && formData.email) {
      const newCliente: Cliente = { id: Date.now().toString(), ...formData, createdAt: new Date().toISOString().split('T')[0], lastContact: new Date().toISOString().split('T')[0] }
      setClienti([newCliente, ...clienti])
      setFormData({ name: '', email: '', phone: '', company: '', status: 'Attivo' })
      setShowModal(false)
    }
  }

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

      {/* Search */}
      <div style={{ ...glass, borderRadius: 999, padding: '8px 20px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: neu.panel }}>
        <Search size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
        <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder={t('btn.cerca')}
          style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: 13, fontWeight: 500, letterSpacing: '0.06em', color: 'var(--text)' }} />
      </div>

      {/* Tabella neumorfica */}
      <div style={{ ...glass, borderRadius: 24, padding: '20px', boxShadow: neu.panel, overflowX: 'auto' }}>

        {/* Header tabella */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 2fr 1fr auto', gap: 12, padding: '8px 16px', marginBottom: 8 }}>
          {['NOME', 'EMAIL', 'AZIENDA', 'STATO', ''].map(h => (
            <span key={h} style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.22em', color: 'var(--text-muted)' }}>{h}</span>
          ))}
        </div>

        {/* Righe */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtered.map(c => (
            <div key={c.id} style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 2fr 1fr auto', gap: 12, alignItems: 'center', background: 'var(--bg)', borderRadius: 14, padding: '12px 16px', boxShadow: neu.outset, transition: 'box-shadow 0.2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = neu.outsetHover}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = neu.outset}
            >
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</span>
              <span style={{ fontSize: 12, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.email}</span>
              <span style={{ fontSize: 12, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.company}</span>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', padding: '4px 10px', borderRadius: 999, background: 'var(--bg)', boxShadow: neu.insetSm, color: statusColor[c.status] ?? 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                {c.status.toUpperCase()}
              </span>
              <button onClick={() => setClienti(clienti.filter(x => x.id !== c.id))}
                style={{ background: 'var(--bg)', border: 'none', borderRadius: '50%', width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#ef4444', boxShadow: neu.outset }}>
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal aggiungi */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Nuovo Cliente">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: 4 }}>
          <NeuInput label="Nome" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
          <NeuInput label="Email" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
          <NeuInput label="Telefono" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
          <NeuInput label="Azienda" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} />
          <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
            <NeuBtn onClick={handleAdd} children={<>SALVA</>} />
            <NeuBtn onClick={() => setShowModal(false)} children={<>ANNULLA</>} />
          </div>
        </div>
      </Modal>
    </div>
  )
}