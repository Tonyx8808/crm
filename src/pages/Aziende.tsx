'use client'

import { useEffect, useState } from 'react'
import { useAziendaStore } from '@/stores/aziendaStore'
import { Modal } from '@/components/ui'
import { Building2, Plus, Search, MapPin, Users } from 'lucide-react'

const neu = {
  outset:     `5px 5px 14px var(--neu-dark), -3px -3px 9px var(--neu-light)`,
  outsetHover:`7px 7px 18px var(--neu-dark), -4px -4px 11px var(--neu-light)`,
  inset:      `inset 3px 3px 8px var(--neu-dark), inset -2px -2px 5px var(--neu-light)`,
  insetSm:    `inset 2px 2px 5px var(--neu-dark), inset -1px -1px 3px var(--neu-light)`,
  panel:      `8px 8px 20px var(--neu-dark), -5px -5px 14px var(--neu-light), inset 0 1px 0 rgba(255,255,255,0.2)`,
}

function GlassCard({ children, onClick, style }: { children: React.ReactNode; onClick?: () => void; style?: React.CSSProperties }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.12)',
        backdropFilter: 'blur(18px) saturate(1.5)',
        WebkitBackdropFilter: 'blur(18px) saturate(1.5)',
        borderRadius: 22,
        padding: 20,
        cursor: onClick ? 'pointer' : 'default',
        boxShadow: hovered ? neu.outsetHover : neu.outset,
        transition: 'box-shadow 0.22s, background 0.22s',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

function NeuButton({ onClick, children, style }: { onClick?: () => void; children: React.ReactNode; style?: React.CSSProperties }) {
  const [pressed, setPressed] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        background: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.14)',
        borderRadius: 999,
        padding: '10px 22px',
        display: 'flex', alignItems: 'center', gap: 8,
        fontSize: 12, fontWeight: 700, letterSpacing: '0.14em',
        color: pressed ? 'var(--accent)' : 'var(--text)',
        cursor: 'pointer',
        boxShadow: pressed ? neu.inset : neu.outset,
        transition: 'box-shadow 0.15s, color 0.15s, background 0.15s',
        ...style,
      }}
    >
      {children}
    </button>
  )
}

export function Aziende() {
  const { aziende, loading, fetchAziende, addAzienda } = useAziendaStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [selectedAzienda, setSelectedAzienda] = useState<any>(null)
  const [formData, setFormData] = useState({ name: '', industry: '', employees: '', website: '', email: '', phone: '' })

  useEffect(() => { fetchAziende() }, [fetchAziende])

  const filtered = aziende.filter(a =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.city.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAdd = () => {
    if (formData.name && formData.industry && formData.employees) {
      addAzienda({ id: Date.now().toString(), ...formData, employees: parseInt(formData.employees), address: 'Via da definire', city: 'Milano', country: 'Italia' })
      setFormData({ name: '', industry: '', employees: '', website: '', email: '', phone: '' })
      setShowModal(false)
    }
  }

  if (loading) {
    return (
      <div style={{ padding: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 52, height: 52, borderRadius: '50%', margin: '0 auto 16px', boxShadow: neu.outset, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'spin 1s linear infinite' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', boxShadow: neu.inset, background: 'transparent' }} />
          </div>
          <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
          <p style={{ color: 'var(--text-muted)', fontSize: 12, letterSpacing: '0.18em', fontWeight: 600 }}>CARICAMENTO…</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '0.18em', color: 'var(--text)', marginBottom: 6 }}>AZIENDE</h1>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', letterSpacing: '0.08em' }}>Gestisci le aziende e i loro dettagli</p>
        </div>
        <NeuButton onClick={() => setShowModal(true)}>
          <Plus size={15} /> NUOVA AZIENDA
        </NeuButton>
      </div>

      {/* Search bar glass */}
      <div style={{
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.12)',
        backdropFilter: 'blur(20px) saturate(1.5)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.5)',
        borderRadius: 999,
        padding: '8px 20px',
        display: 'flex', alignItems: 'center', gap: 12,
        boxShadow: neu.panel,
      }}>
        <Search size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
        <input
          placeholder="Cerca aziende…"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none', outline: 'none',
            fontSize: 13, fontWeight: 500, letterSpacing: '0.06em',
            color: 'var(--text)',
          }}
        />
      </div>

      {/* Grid aziende */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
        {filtered.map(azienda => (
          <GlassCard key={azienda.id} onClick={() => setSelectedAzienda(azienda)}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
              <div style={{
                width: 46, height: 46, borderRadius: '50%', flexShrink: 0,
                background: 'rgba(255,255,255,0.10)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.16)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: neu.outset, color: 'var(--accent)',
              }}>
                <Building2 size={20} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: 3 }}>
                  {azienda.name}
                </h3>
                <p style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.1em', fontWeight: 600 }}>{azienda.industry}</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { Icon: Users,  val: `${azienda.employees} dipendenti` },
                { Icon: MapPin, val: `${azienda.city}, ${azienda.country}` },
              ].map(({ Icon, val }) => (
                <span key={val} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '6px 14px', borderRadius: 999,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  boxShadow: neu.insetSm,
                  fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--text-muted)',
                }}>
                  <Icon size={13} style={{ color: 'var(--accent)', flexShrink: 0 }} /> {val}
                </span>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Modal dettaglio */}
      {selectedAzienda && (
        <Modal isOpen={!!selectedAzienda} onClose={() => setSelectedAzienda(null)} title={selectedAzienda.name}>
          <div style={{ padding: 8 }}>
            {[
              { label: 'SETTORE',    val: selectedAzienda.industry },
              { label: 'DIPENDENTI', val: selectedAzienda.employees },
              { label: 'CITTÀ',      val: `${selectedAzienda.city}, ${selectedAzienda.country}` },
              { label: 'EMAIL',      val: selectedAzienda.email },
              { label: 'TELEFONO',   val: selectedAzienda.phone },
              { label: 'SITO',       val: selectedAzienda.website },
            ].map(({ label, val }) => val && (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderRadius: 12, marginBottom: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', boxShadow: neu.insetSm }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', color: 'var(--text-muted)' }}>{label}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{val}</span>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {/* Modal aggiungi */}
      {showModal && (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Nuova Azienda">
          <div style={{ padding: 8, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { key: 'name', placeholder: 'Nome azienda *' },
              { key: 'industry', placeholder: 'Settore *' },
              { key: 'employees', placeholder: 'Dipendenti *', type: 'number' },
              { key: 'website', placeholder: 'Sito web' },
              { key: 'email', placeholder: 'Email' },
              { key: 'phone', placeholder: 'Telefono' },
            ].map(({ key, placeholder, type }) => (
              <input
                key={key}
                type={type ?? 'text'}
                placeholder={placeholder}
                value={(formData as any)[key]}
                onChange={e => setFormData(f => ({ ...f, [key]: e.target.value }))}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 14,
                  padding: '11px 18px',
                  fontSize: 13, fontWeight: 500, letterSpacing: '0.06em',
                  color: 'var(--text)', outline: 'none',
                  boxShadow: neu.inset,
                  width: '100%',
                }}
              />
            ))}
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 4 }}>
              <NeuButton onClick={() => setShowModal(false)}>ANNULLA</NeuButton>
              <NeuButton onClick={handleAdd} style={{ color: 'var(--accent)' }}>AGGIUNGI</NeuButton>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}