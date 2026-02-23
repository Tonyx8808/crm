'use client'

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@/contexts/ThemeContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { useAuthStore } from '@/stores/authStore'
import { Moon, Globe, Lock, Bell, Shield, LogOut, Save, Eye, EyeOff, Check, AlertCircle } from 'lucide-react'

const neu = {
  outset:  `5px 5px 14px var(--neu-dark), -3px -3px 9px var(--neu-light)`,
  inset:   `inset 3px 3px 8px var(--neu-dark), inset -2px -2px 5px var(--neu-light)`,
  insetSm: `inset 2px 2px 5px var(--neu-dark), inset -1px -1px 3px var(--neu-light)`,
  panel:   `8px 8px 20px var(--neu-dark), -5px -5px 14px var(--neu-light), inset 0 1px 0 rgba(255,255,255,0.2)`,
}

function Section({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.07)',
      border: '1px solid rgba(255,255,255,0.12)',
      backdropFilter: 'blur(24px) saturate(1.5)',
      WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
      borderRadius: 24, padding: '28px 26px',
      boxShadow: neu.panel,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22, paddingBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.10)' }}>
        <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.14)', boxShadow: neu.outset, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', flexShrink: 0 }}>
          <Icon size={15} />
        </div>
        <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.18em', color: 'var(--text)' }}>{title}</span>
      </div>
      {children}
    </div>
  )
}

function InfoRow({ label, value, badge }: { label: string; value?: string; badge?: { text: string; color: string } }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', borderRadius: 14, padding: '14px 18px', boxShadow: neu.insetSm, marginBottom: 10 }}>
      <div>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', color: 'var(--text-muted)', marginBottom: 3 }}>{label.toUpperCase()}</p>
        {value && <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{value}</p>}
      </div>
      {badge && (
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', padding: '4px 12px', borderRadius: 999, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', boxShadow: neu.outset, color: badge.color }}>
          {badge.text.toUpperCase()}
        </span>
      )}
    </div>
  )
}

function NeuBtn({ onClick, children, danger }: { onClick?: () => void; children: React.ReactNode; danger?: boolean }) {
  const [pressed, setPressed] = useState(false)
  return (
    <button onClick={onClick} onMouseDown={() => setPressed(true)} onMouseUp={() => setPressed(false)} onMouseLeave={() => setPressed(false)}
      style={{
        background: danger ? 'rgba(239,68,68,0.08)' : 'rgba(255,255,255,0.07)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        border: danger ? '1px solid rgba(239,68,68,0.20)' : '1px solid rgba(255,255,255,0.12)',
        borderRadius: 999, padding: '10px 22px',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
        fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', cursor: 'pointer',
        color: danger ? '#ef4444' : pressed ? 'var(--accent)' : 'var(--text)',
        boxShadow: pressed ? neu.inset : neu.outset,
        transition: 'box-shadow 0.15s, color 0.15s',
        width: '100%',
      }}>
      {children}
    </button>
  )
}

function GlassInput({ type = 'text', value, onChange, placeholder, label, rightIcon }: {
  type?: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string; label?: string; rightIcon?: React.ReactNode
}) {
  return (
    <div style={{ marginBottom: 4 }}>
      {label && <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', color: 'var(--text-muted)', marginBottom: 8 }}>{label.toUpperCase()}</p>}
      <div style={{ position: 'relative' }}>
        <input
          type={type} value={value} onChange={onChange} placeholder={placeholder}
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 14,
            padding: rightIcon ? '11px 44px 11px 18px' : '11px 18px',
            fontSize: 13, fontWeight: 500, letterSpacing: '0.06em',
            color: 'var(--text)', outline: 'none',
            boxShadow: neu.inset,
          }}
        />
        {rightIcon && (
          <div style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex' }}>
            {rightIcon}
          </div>
        )}
      </div>
    </div>
  )
}

function GlassSwitch({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <div onClick={onChange} style={{
      position: 'relative', width: 54, height: 28, borderRadius: 14,
      background: checked ? 'rgba(99,102,241,0.12)' : 'rgba(255,255,255,0.06)',
      border: checked ? '1px solid rgba(99,102,241,0.25)' : '1px solid rgba(255,255,255,0.12)',
      backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
      cursor: 'pointer', flexShrink: 0,
      boxShadow: checked ? neu.inset : neu.outset,
      transition: 'box-shadow 0.25s, background 0.25s, border-color 0.25s',
    }}>
      <div style={{ position: 'absolute', top: 4, left: checked ? 30 : 4, width: 20, height: 20, borderRadius: '50%', background: checked ? 'var(--accent)' : 'rgba(255,255,255,0.35)', backdropFilter: 'blur(6px)', transition: 'left 0.25s, background 0.25s', boxShadow: '1px 1px 4px rgba(0,0,0,0.25)' }} />
    </div>
  )
}

function GlassCheck({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <div onClick={onChange} style={{
      width: 22, height: 22, borderRadius: 7,
      background: checked ? 'rgba(99,102,241,0.12)' : 'rgba(255,255,255,0.06)',
      border: checked ? '1px solid rgba(99,102,241,0.25)' : '1px solid rgba(255,255,255,0.12)',
      backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
      cursor: 'pointer', flexShrink: 0,
      boxShadow: checked ? neu.inset : neu.outset,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      transition: 'box-shadow 0.2s, background 0.2s',
      color: checked ? 'var(--accent)' : 'transparent',
    }}>
      {checked && <Check size={13} />}
    </div>
  )
}

export function Impostazioni() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const { language, setLanguage } = useLanguage()
  const { logout, user } = useAuthStore()

  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword,     setNewPassword]     = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew,     setShowNew]     = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [pwMsg, setPwMsg] = useState('')
  const [pwErr, setPwErr] = useState('')

  const [notifications, setNotifications] = useState({ email: true, sms: false, push: true, newsletter: true })
  const [privacy,       setPrivacy]       = useState({ profileVisible: true, activityVisible: false, emailPublic: false })
  const [sessions] = useState([
    { id: '1', device: 'Windows PC',   browser: 'Chrome',  location: 'Milano, IT', lastActive: '2 min fa',   current: true  },
    { id: '2', device: 'iPhone 12',    browser: 'Safari',  location: 'Roma, IT',   lastActive: '2 ore fa',   current: false },
    { id: '3', device: 'MacBook Pro',  browser: 'Firefox', location: 'Torino, IT', lastActive: '1 giorno fa',current: false },
  ])

  const handleChangePassword = () => {
    setPwErr(''); setPwMsg('')
    if (!currentPassword || !newPassword || !confirmPassword) return setPwErr('Riempi tutti i campi')
    if (newPassword !== confirmPassword) return setPwErr('Le password non corrispondono')
    if (newPassword.length < 8) return setPwErr('Minimo 8 caratteri')
    setPwMsg('Password cambiata con successo!')
    setCurrentPassword(''); setNewPassword(''); setConfirmPassword('')
    setTimeout(() => { setShowPasswordForm(false); setPwMsg('') }, 2000)
  }

  const handleLogout = () => { logout(); navigate('/login') }

  return (
    <div style={{ padding: '40px 36px', display: 'flex', flexDirection: 'column', gap: 24 }}>

      <div style={{ marginBottom: 8 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '0.18em', color: 'var(--text)', marginBottom: 6 }}>IMPOSTAZIONI</h1>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', letterSpacing: '0.08em' }}>Gestisci il tuo account e le preferenze</p>
      </div>

      {/* Account */}
      <Section icon={Shield} title="INFORMAZIONI ACCOUNT">
        <InfoRow label="Nome Utente" value={user?.name}  badge={{ text: 'Verificato', color: '#10b981' }} />
        <InfoRow label="Email"       value={user?.email} badge={{ text: 'Confermata', color: '#10b981' }} />
        <InfoRow label="Ruolo"       value={user?.id === '1' ? 'Amministratore' : 'Utente'} badge={{ text: 'Admin', color: 'var(--accent)' }} />
      </Section>

      {/* Password */}
      <Section icon={Lock} title="SICUREZZA & PASSWORD">
        {!showPasswordForm ? (
          <NeuBtn onClick={() => setShowPasswordForm(true)}><Lock size={13} /> CAMBIA PASSWORD</NeuBtn>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <GlassInput type={showCurrent ? 'text' : 'password'} value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} placeholder="Password attuale" label="Password attuale"
              rightIcon={<span onClick={() => setShowCurrent(!showCurrent)}>{showCurrent ? <EyeOff size={15} /> : <Eye size={15} />}</span>} />
            <GlassInput type={showNew ? 'text' : 'password'} value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Nuova password" label="Nuova password"
              rightIcon={<span onClick={() => setShowNew(!showNew)}>{showNew ? <EyeOff size={15} /> : <Eye size={15} />}</span>} />
            <GlassInput type={showConfirm ? 'text' : 'password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Conferma password" label="Conferma password"
              rightIcon={<span onClick={() => setShowConfirm(!showConfirm)}>{showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}</span>} />

            {pwErr && <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 12, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.18)', color: '#ef4444', fontSize: 12 }}><AlertCircle size={13} />{pwErr}</div>}
            {pwMsg && <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 12, background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.18)', color: '#10b981', fontSize: 12 }}><Check size={13} />{pwMsg}</div>}

            <div style={{ display: 'flex', gap: 10 }}>
              <NeuBtn onClick={handleChangePassword}><Save size={13} /> SALVA</NeuBtn>
              <NeuBtn onClick={() => setShowPasswordForm(false)}>ANNULLA</NeuBtn>
            </div>
          </div>
        )}
      </Section>

      {/* Tema & Lingua */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <Section icon={Moon} title="TEMA">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{theme === 'dark' ? '🌙 Scura' : '☀️ Chiara'}</span>
            <GlassSwitch checked={theme === 'dark'} onChange={toggleTheme} />
          </div>
        </Section>
        <Section icon={Globe} title="LINGUA">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{language === 'it' ? '🇮🇹 Italiano' : '🇬🇧 English'}</span>
            <div style={{ display: 'flex', borderRadius: 999, overflow: 'hidden', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', boxShadow: neu.inset }}>
              {(['it', 'en'] as const).map(l => (
                <button key={l} onClick={() => setLanguage(l)}
                  style={{ width: 32, height: 26, border: 'none', borderRadius: 999, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', cursor: 'pointer', background: language === l ? 'rgba(255,255,255,0.14)' : 'transparent', color: language === l ? 'var(--accent)' : 'var(--text-muted)', boxShadow: language === l ? neu.outset : 'none', transition: 'box-shadow 0.2s, color 0.2s, background 0.2s' }}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </Section>
      </div>

      {/* Notifiche */}
      <Section icon={Bell} title="PREFERENZE NOTIFICHE">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { key: 'email', label: 'Notifiche Email', desc: 'Ricevi aggiornamenti via email' },
            { key: 'sms',   label: 'Notifiche SMS',   desc: 'Ricevi avvisi importanti via SMS' },
            { key: 'push',  label: 'Notifiche Push',  desc: 'Avvisi in tempo reale sul browser' },
            { key: 'newsletter', label: 'Newsletter', desc: 'Newsletter settimanale' },
          ].map(n => (
            <div key={n.key} onClick={() => setNotifications(s => ({ ...s, [n.key]: !s[n.key as keyof typeof s] }))}
              style={{ display: 'flex', alignItems: 'center', gap: 14, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', borderRadius: 14, padding: '14px 18px', cursor: 'pointer', boxShadow: neu.insetSm }}>
              <GlassCheck checked={notifications[n.key as keyof typeof notifications]} onChange={() => {}} />
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{n.label}</p>
                <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{n.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Privacy */}
      <Section icon={Shield} title="PRIVACY & VISIBILITÀ">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { key: 'profileVisible',  label: 'Profilo Pubblico',   desc: 'Il tuo profilo è visibile agli altri' },
            { key: 'activityVisible', label: 'Attività Visibile',  desc: 'Mostra la tua attività recente' },
            { key: 'emailPublic',     label: 'Email Pubblica',     desc: 'Condividi la tua email con altri' },
          ].map(p => (
            <div key={p.key} onClick={() => setPrivacy(s => ({ ...s, [p.key]: !s[p.key as keyof typeof s] }))}
              style={{ display: 'flex', alignItems: 'center', gap: 14, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', borderRadius: 14, padding: '14px 18px', cursor: 'pointer', boxShadow: neu.insetSm }}>
              <GlassCheck checked={privacy[p.key as keyof typeof privacy]} onChange={() => {}} />
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{p.label}</p>
                <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Sessioni */}
      <Section icon={Shield} title="SESSIONI ATTIVE">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 18 }}>
          {sessions.map(s => (
            <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', borderRadius: 14, padding: '14px 18px', boxShadow: neu.insetSm }}>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{s.device}</p>
                <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.browser} · {s.location}</p>
                <p style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>Ultimo accesso: {s.lastActive}</p>
              </div>
              {s.current && (
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', padding: '4px 12px', borderRadius: 999, background: 'rgba(16,185,129,0.10)', border: '1px solid rgba(16,185,129,0.22)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', color: '#10b981' }}>ATTIVA</span>
              )}
            </div>
          ))}
        </div>
        <NeuBtn onClick={handleLogout} danger><LogOut size={13} /> ESCI DA TUTTI I DISPOSITIVI</NeuBtn>
      </Section>

      {/* Logout */}
      <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.20)', backdropFilter: 'blur(24px) saturate(1.5)', WebkitBackdropFilter: 'blur(24px) saturate(1.5)', borderRadius: 24, padding: 26, boxShadow: neu.panel }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(239,68,68,0.10)', border: '1px solid rgba(239,68,68,0.20)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', boxShadow: neu.outset, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
            <LogOut size={15} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.18em', color: '#ef4444' }}>LOGOUT</span>
        </div>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 14 }}>Esci dal tuo account corrente.</p>
        <NeuBtn onClick={handleLogout} danger><LogOut size={13} /> ESCI ORA</NeuBtn>
      </div>

    </div>
  )
}