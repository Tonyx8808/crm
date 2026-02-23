'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useEffect, useState, useRef } from 'react'
import { useContattiStore } from '../stores/contattiStore'
import type { Contatto } from '../stores/contattiStore'
import { Phone, MessageSquare, Send, X, Mic, MicOff, PhoneOff } from 'lucide-react'
import { ContattoAnagrafica } from './ContattoAnagrafica'

const neu = {
  outset:     `5px 5px 14px var(--neu-dark), -3px -3px 9px var(--neu-light)`,
  outsetHover:`7px 7px 18px var(--neu-dark), -4px -4px 11px var(--neu-light)`,
  inset:      `inset 3px 3px 8px var(--neu-dark), inset -2px -2px 5px var(--neu-light)`,
  insetSm:    `inset 2px 2px 5px var(--neu-dark), inset -1px -1px 3px var(--neu-light)`,
  panel:      `8px 8px 20px var(--neu-dark), -5px -5px 14px var(--neu-light), inset 0 1px 0 rgba(255,255,255,0.2)`,
}

const statusConfig: Record<string, { color: string; dot: string; bg: string; border: string }> = {
  online:  { color: '#10b981', dot: '#10b981', bg: 'rgba(16,185,129,0.10)',  border: 'rgba(16,185,129,0.22)'  },
  away:    { color: '#f59e0b', dot: '#f59e0b', bg: 'rgba(245,158,11,0.10)',  border: 'rgba(245,158,11,0.22)'  },
  offline: { color: '#94a3b8', dot: '#94a3b8', bg: 'rgba(148,163,184,0.08)', border: 'rgba(148,163,184,0.18)' },
}

interface Message {
  id: string
  text: string
  fromMe: boolean
  time: string
}

/* ─────────────────────────────────────────────
   BOTTONE AZIONE RAPIDA
───────────────────────────────────────────── */
function QuickActionBtn({ onClick, children, accent, danger }: {
  onClick?: () => void
  children: React.ReactNode
  accent?: boolean
  danger?: boolean
}) {
  const [pressed, setPressed] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        flex: 1,
        background: danger ? 'rgba(239,68,68,0.12)' : 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
        border: danger ? '1px solid rgba(239,68,68,0.25)' : '1px solid rgba(255,255,255,0.14)',
        borderRadius: 999, padding: '10px 18px',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
        fontSize: 11, fontWeight: 700, letterSpacing: '0.14em',
        color: danger ? '#ef4444' : pressed ? 'var(--accent)' : accent ? 'var(--accent)' : 'var(--text)',
        cursor: 'pointer', boxShadow: pressed ? neu.inset : neu.outset,
        transition: 'box-shadow 0.15s, color 0.15s',
      }}>
      {children}
    </button>
  )
}

/* ─────────────────────────────────────────────
   CALL PANEL
───────────────────────────────────────────── */
type CallPhase = 'calling' | 'active' | 'ended'

function CallPanel({ contatto, onClose }: { contatto: Contatto; onClose: () => void }) {
  const [phase, setPhase]     = useState<CallPhase>('calling')
  const [seconds, setSeconds] = useState(0)
  const [muted, setMuted]     = useState(false)
  const [speaker, setSpeaker] = useState(true)
  const timerRef              = useRef<ReturnType<typeof setInterval> | null>(null)
  const st = statusConfig[contatto.status] ?? statusConfig.offline

  // Il contatto "risponde" dopo 3s
  useEffect(() => {
    const t = setTimeout(() => setPhase('active'), 3000)
    return () => clearTimeout(t)
  }, [])

  // Avvia il timer quando la chiamata è attiva
  useEffect(() => {
    if (phase === 'active') {
      timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000)
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [phase])

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0')
    const r = (s % 60).toString().padStart(2, '0')
    return `${m}:${r}`
  }

  const hangUp = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    setPhase('ended')
    setTimeout(onClose, 1800)
  }

  const ringColor = phase === 'active' ? 'rgba(16,185,129,0.55)'
                  : phase === 'ended'  ? 'rgba(239,68,68,0.55)'
                  : 'rgba(99,102,241,0.55)'

  const borderColor = phase === 'active' ? 'rgba(16,185,129,0.75)'
                    : phase === 'ended'  ? 'rgba(239,68,68,0.75)'
                    : 'rgba(99,102,241,0.55)'

  const statusLabel = phase === 'calling' ? 'Chiamata in corso…'
                    : phase === 'active'  ? formatTime(seconds)
                    : 'Chiamata terminata'

  const statusColor = phase === 'active' ? '#10b981'
                    : phase === 'ended'  ? '#ef4444'
                    : 'var(--accent)'

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.6)',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 60,
    }}>
      <style>{`
        @keyframes callFadeIn {
          from { opacity: 0; transform: scale(0.92) translateY(16px) }
          to   { opacity: 1; transform: scale(1)    translateY(0)     }
        }
        @keyframes ringWave {
          0%   { box-shadow: 0 0 0 0   ${ringColor}, ${neu.panel} }
          50%  { box-shadow: 0 0 0 20px rgba(0,0,0,0), ${neu.panel} }
          100% { box-shadow: 0 0 0 0   ${ringColor}, ${neu.panel} }
        }
        @keyframes callPulse {
          0%,100% { transform: scale(1);    opacity: 1   }
          50%     { transform: scale(1.06); opacity: 0.8 }
        }
        @keyframes waveBar {
          0%,100% { height: 6px  }
          50%     { height: 22px }
        }
        @keyframes endedShrink {
          from { transform: scale(1) }
          to   { transform: scale(0.9); opacity: 0 }
        }
      `}</style>

      <div style={{
        width: 320,
        background: 'rgba(18,18,28,0.75)',
        border: '1px solid rgba(255,255,255,0.12)',
        backdropFilter: 'blur(40px) saturate(1.8)',
        WebkitBackdropFilter: 'blur(40px) saturate(1.8)',
        borderRadius: 40,
        padding: '44px 28px 36px',
        boxShadow: neu.panel,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24,
        animation: 'callFadeIn 0.28s cubic-bezier(.4,0,.2,1)',
        textAlign: 'center',
      }}>

        {/* ── Avatar con ring animato ── */}
        <div style={{
          width: 100, height: 100, borderRadius: '50%',
          border: `3px solid ${borderColor}`,
          boxShadow: neu.panel,
          overflow: 'hidden',
          animation: phase === 'calling' ? 'ringWave 1.6s ease-in-out infinite'
                   : phase === 'active'  ? 'ringWave 2.4s ease-in-out infinite'
                   : 'none',
          transition: 'border-color 0.5s',
          flexShrink: 0,
        }}>
          <img src={contatto.avatar} alt={contatto.name}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              animation: phase === 'calling' ? 'callPulse 1.6s ease-in-out infinite' : 'none',
            }}
          />
        </div>

        {/* ── Nome + stato ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
          <p style={{ fontSize: 22, fontWeight: 700, letterSpacing: '0.06em', color: 'var(--text)' }}>
            {contatto.name}
          </p>

          {/* Ondine audio quando attivo */}
          {phase === 'active' ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, height: 24 }}>
              {[0, 0.15, 0.3, 0.15, 0].map((delay, i) => (
                <div key={i} style={{
                  width: 4, borderRadius: 2,
                  background: '#10b981',
                  animation: `waveBar 0.9s ease-in-out infinite`,
                  animationDelay: `${delay}s`,
                  height: 6,
                }} />
              ))}
              <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.12em', color: '#10b981', marginLeft: 8 }}>
                {formatTime(seconds)}
              </span>
            </div>
          ) : (
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.14em', color: statusColor }}>
              {statusLabel.toUpperCase()}
            </p>
          )}
        </div>

        {/* ── Controlli (solo in chiamata attiva) ── */}
        {phase === 'active' && (
          <div style={{ display: 'flex', gap: 16 }}>
            {/* Microfono */}
            <button onClick={() => setMuted(m => !m)} style={{
              width: 52, height: 52, borderRadius: '50%',
              background: muted ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.07)',
              border: muted ? '1px solid rgba(239,68,68,0.35)' : '1px solid rgba(255,255,255,0.12)',
              backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              color: muted ? '#ef4444' : 'var(--text-muted)',
              boxShadow: muted ? neu.insetSm : neu.outset,
              transition: 'all 0.2s', flexShrink: 0,
            }}>
              {muted ? <MicOff size={20} /> : <Mic size={20} />}
            </button>

            {/* Speaker */}
            <button onClick={() => setSpeaker(s => !s)} style={{
              width: 52, height: 52, borderRadius: '50%',
              background: !speaker ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.07)',
              border: !speaker ? '1px solid rgba(239,68,68,0.35)' : '1px solid rgba(255,255,255,0.12)',
              backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              color: !speaker ? '#ef4444' : 'var(--text-muted)',
              boxShadow: !speaker ? neu.insetSm : neu.outset,
              transition: 'all 0.2s', flexShrink: 0,
              fontSize: 18,
            }}>
              {speaker ? '🔊' : '🔇'}
            </button>
          </div>
        )}

        {/* ── Pulsante riattacca / ended ── */}
        {phase !== 'ended' ? (
          <button onClick={hangUp}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            style={{
              width: 70, height: 70, borderRadius: '50%',
              background: 'rgba(239,68,68,0.20)',
              border: '1px solid rgba(239,68,68,0.40)',
              backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#ef4444',
              boxShadow: `0 0 28px rgba(239,68,68,0.30), ${neu.outset}`,
              transition: 'transform 0.18s',
              flexShrink: 0,
            }}>
            <PhoneOff size={26} />
          </button>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, animation: 'endedShrink 1.6s ease forwards' }}>
            <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
              <PhoneOff size={24} />
            </div>
            <p style={{ fontSize: 10, letterSpacing: '0.16em', color: 'var(--text-muted)', fontWeight: 600 }}>CHIAMATA TERMINATA</p>
          </div>
        )}

        {/* Badge microfono muto */}
        {muted && phase === 'active' && (
          <div style={{ padding: '6px 16px', borderRadius: 999, background: 'rgba(239,68,68,0.10)', border: '1px solid rgba(239,68,68,0.22)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', color: '#ef4444' }}>MICROFONO DISATTIVATO</p>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   CHAT PANEL
───────────────────────────────────────────── */
function ChatPanel({ contatto, onClose }: { contatto: Contatto; onClose: () => void }) {
  function nowTime() {
    return new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })
  }

  const [messages, setMessages] = useState<Message[]>([
    { id: '0', text: 'Ciao! Come posso aiutarti?', fromMe: false, time: nowTime() },
  ])
  const [input, setInput]   = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef           = useRef<HTMLDivElement>(null)
  const st = statusConfig[contatto.status] ?? statusConfig.offline

  function send() {
    const text = input.trim()
    if (!text) return
    setMessages(prev => [...prev, { id: Date.now().toString(), text, fromMe: true, time: nowTime() }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: 'Grazie per il messaggio! Ti risponderò al più presto.',
        fromMe: false,
        time: nowTime(),
      }])
    }, 1400)
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.35)',
      backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end',
      zIndex: 50, padding: 24,
    }} onClick={onClose}>
      <style>{`
        @keyframes chatIn { from{opacity:0;transform:translateY(24px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes dot { 0%,80%,100%{transform:scale(0.6);opacity:0.4} 40%{transform:scale(1);opacity:1} }
        .td1{animation:dot 1.2s ease infinite 0s}
        .td2{animation:dot 1.2s ease infinite 0.2s}
        .td3{animation:dot 1.2s ease infinite 0.4s}
        .msg-scroll::-webkit-scrollbar{width:4px}
        .msg-scroll::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.12);border-radius:4px}
      `}</style>

      <div onClick={e => e.stopPropagation()} style={{
        width: 360, height: 520,
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.15)',
        backdropFilter: 'blur(32px) saturate(1.7)', WebkitBackdropFilter: 'blur(32px) saturate(1.7)',
        borderRadius: 28, boxShadow: neu.panel,
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        animation: 'chatIn 0.22s cubic-bezier(.4,0,.2,1)',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px', borderBottom: '1px solid rgba(255,255,255,0.10)', background: 'rgba(255,255,255,0.04)', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.14)', boxShadow: neu.outset }}>
                <img src={contatto.avatar} alt={contatto.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <span style={{ position: 'absolute', bottom: 1, right: 1, width: 10, height: 10, borderRadius: '50%', background: st.dot, border: '2px solid var(--bg)' }} />
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', letterSpacing: '0.08em' }}>{contatto.name}</p>
              <p style={{ fontSize: 10, color: st.color, fontWeight: 600, letterSpacing: '0.1em' }}>{contatto.status.toUpperCase()}</p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '50%', width: 30, height: 30, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', boxShadow: neu.outset, flexShrink: 0 }}>
            <X size={13} />
          </button>
        </div>

        {/* Messaggi */}
        <div className="msg-scroll" style={{ flex: 1, overflowY: 'auto', padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {messages.map(m => (
            <div key={m.id} style={{ display: 'flex', flexDirection: m.fromMe ? 'row-reverse' : 'row', alignItems: 'flex-end', gap: 8 }}>
              {!m.fromMe && (
                <div style={{ width: 28, height: 28, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '1px solid rgba(255,255,255,0.10)' }}>
                  <img src={contatto.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
              <div style={{ maxWidth: '72%' }}>
                <div style={{
                  padding: '9px 14px',
                  borderRadius: m.fromMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  background: m.fromMe ? 'rgba(99,102,241,0.22)' : 'rgba(255,255,255,0.08)',
                  border: m.fromMe ? '1px solid rgba(99,102,241,0.30)' : '1px solid rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
                  fontSize: 13, fontWeight: 500, color: 'var(--text)',
                  letterSpacing: '0.02em', lineHeight: 1.5,
                }}>
                  {m.text}
                </div>
                <p style={{ fontSize: 9, color: 'var(--text-muted)', marginTop: 4, textAlign: m.fromMe ? 'right' : 'left', letterSpacing: '0.08em' }}>
                  {m.time}
                </p>
              </div>
            </div>
          ))}

          {typing && (
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '1px solid rgba(255,255,255,0.10)' }}>
                <img src={contatto.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '10px 16px', borderRadius: '18px 18px 18px 4px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', gap: 5, alignItems: 'center' }}>
                {['td1','td2','td3'].map(c => (
                  <div key={c} className={c} style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--text-muted)' }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{ padding: '12px 14px', borderTop: '1px solid rgba(255,255,255,0.10)', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
            placeholder="Scrivi un messaggio…"
            style={{ flex: 1, background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 999, padding: '10px 16px', fontSize: 13, fontWeight: 500, letterSpacing: '0.03em', color: 'var(--text)', outline: 'none', boxShadow: neu.inset }}
          />
          <button onClick={send} disabled={!input.trim()} style={{
            width: 38, height: 38, flexShrink: 0, borderRadius: '50%',
            background: input.trim() ? 'rgba(99,102,241,0.20)' : 'rgba(255,255,255,0.05)',
            border: input.trim() ? '1px solid rgba(99,102,241,0.30)' : '1px solid rgba(255,255,255,0.09)',
            backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: input.trim() ? 'pointer' : 'default',
            color: input.trim() ? 'var(--accent)' : 'var(--text-muted)',
            boxShadow: input.trim() ? neu.outset : 'none',
            transition: 'all 0.2s',
          }}>
            <Send size={15} style={{ transform: 'translateX(1px)' }} />
          </button>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   COMPONENTE PRINCIPALE
═══════════════════════════════════════════════════════ */
export function Contatti() {
  const { t } = useLanguage()
  const { contatti, loading, fetchContatti } = useContattiStore()
  const [contattiState, setContattiState]           = useState<Contatto[]>([])
  const [selectedAnagrafica, setSelectedAnagrafica] = useState<Contatto | null>(null)
  const [quickView, setQuickView]                   = useState<Contatto | null>(null)
  const [chatContatto, setChatContatto]             = useState<Contatto | null>(null)
  const [callContatto, setCallContatto]             = useState<Contatto | null>(null)

  useEffect(() => { fetchContatti() }, [])
  useEffect(() => { if (contatti.length) setContattiState(contatti) }, [contatti])

  const handleSaveContatto = (updated: Contatto) => {
    setContattiState(prev => prev.map(c => c.id === updated.id ? updated : c))
    setSelectedAnagrafica(updated)
  }

  if (selectedAnagrafica) {
    return (
      <ContattoAnagrafica
        contatto={selectedAnagrafica}
        onBack={() => setSelectedAnagrafica(null)}
        onSave={handleSaveContatto}
      />
    )
  }

  return (
    <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>

      <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '0.18em', color: 'var(--text)' }}>
        {t('nav.contatti')}
      </h1>

      {/* Lista contatti */}
      <div style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 28, backdropFilter: 'blur(24px) saturate(1.5)', WebkitBackdropFilter: 'blur(24px) saturate(1.5)', boxShadow: neu.panel, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>

        {loading && <p style={{ color: 'var(--text-muted)', fontSize: 12, letterSpacing: '0.18em', fontWeight: 600 }}>CARICAMENTO…</p>}
        {!loading && contattiState.length === 0 && <p style={{ color: 'var(--text-muted)', fontSize: 12 }}>Nessun contatto disponibile.</p>}

        {!loading && contattiState.map(c => {
          const st = statusConfig[c.status] ?? statusConfig.offline
          return (
            <div key={c.id}
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', borderRadius: 18, padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, boxShadow: neu.outset, transition: 'box-shadow 0.2s, background 0.2s' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = neu.outsetHover; el.style.background = 'rgba(255,255,255,0.09)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = neu.outset; el.style.background = 'rgba(255,255,255,0.05)' }}
            >
              {/* Nome cliccabile → anagrafica */}
              <button onClick={() => setSelectedAnagrafica(c)}
                style={{ display: 'flex', alignItems: 'center', gap: 14, background: 'none', border: 'none', cursor: 'pointer', flex: 1, textAlign: 'left' }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div style={{ width: 46, height: 46, borderRadius: '50%', boxShadow: neu.outset, border: '1px solid rgba(255,255,255,0.12)', overflow: 'hidden' }}>
                    <img src={c.avatar} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <span style={{ position: 'absolute', bottom: 1, right: 1, width: 11, height: 11, borderRadius: '50%', background: st.dot, border: '2px solid var(--bg)' }} />
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--accent)', marginBottom: 2, textDecoration: 'underline', textUnderlineOffset: 3, textDecorationColor: 'rgba(99,102,241,0.4)' }}>
                    {c.name}
                  </p>
                  <p style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
                    {c.position} · {c.company}
                  </p>
                </div>
              </button>

              {/* Status + azioni */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                <span style={{ borderRadius: 999, padding: '4px 12px', fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', background: st.bg, border: `1px solid ${st.border}`, backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', color: st.color, textTransform: 'uppercase' as const }}>
                  {c.status}
                </span>
                <div style={{ display: 'flex', gap: 6 }}>
                  {/* Chiama → CallPanel */}
                  <QuickActionBtn accent onClick={() => setCallContatto(c)}>
                    <Phone size={13} />
                  </QuickActionBtn>
                  {/* Messaggio → ChatPanel */}
                  <QuickActionBtn onClick={() => setChatContatto(c)}>
                    <MessageSquare size={13} />
                  </QuickActionBtn>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick view telefono */}
      {quickView && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}
          onClick={() => setQuickView(null)}>
          <div onClick={e => e.stopPropagation()}
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(32px) saturate(1.7)', WebkitBackdropFilter: 'blur(32px) saturate(1.7)', borderRadius: 28, padding: '28px 24px', width: 320, boxShadow: neu.panel, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 50, height: 50, borderRadius: '50%', boxShadow: neu.outset, border: '1px solid rgba(255,255,255,0.14)', overflow: 'hidden', flexShrink: 0 }}>
                  <img src={quickView.avatar} alt={quickView.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', letterSpacing: '0.08em' }}>{quickView.name}</p>
                  <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{quickView.position}</p>
                </div>
              </div>
              <button onClick={() => setQuickView(null)} style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', boxShadow: neu.outset }}>
                <X size={13} />
              </button>
            </div>
            {[{ label: 'AZIENDA', val: quickView.company }, { label: 'TELEFONO', val: quickView.phone }].map(({ label, val }) => val && (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', boxShadow: neu.insetSm }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', color: 'var(--text-muted)' }}>{label}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{val}</span>
              </div>
            ))}
            <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
              <QuickActionBtn accent onClick={() => { setCallContatto(quickView); setQuickView(null) }}>
                <Phone size={13} /> CHIAMA
              </QuickActionBtn>
              <QuickActionBtn onClick={() => { setSelectedAnagrafica(quickView); setQuickView(null) }}>
                ANAGRAFICA
              </QuickActionBtn>
            </div>
          </div>
        </div>
      )}

      {/* Chat */}
      {chatContatto && <ChatPanel contatto={chatContatto} onClose={() => setChatContatto(null)} />}

      {/* Chiamata */}
      {callContatto && <CallPanel contatto={callContatto} onClose={() => setCallContatto(null)} />}

    </div>
  )
}