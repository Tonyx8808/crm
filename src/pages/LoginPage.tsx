'use client'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { Eye, EyeOff, LogIn } from 'lucide-react'

const neu = {
  outset:  `6px 6px 16px var(--neu-dark), -4px -4px 10px var(--neu-light)`,
  inset:   `inset 3px 3px 8px var(--neu-dark), inset -2px -2px 5px var(--neu-light)`,
  panel:   `10px 10px 26px var(--neu-dark), -6px -6px 18px var(--neu-light), inset 0 1px 0 rgba(255,255,255,0.2)`,
}

export function LoginPage() {
  const navigate  = useNavigate()
  const { login, isLoading } = useAuthStore()
  const [username, setUsername] = useState('user')
  const [password, setPassword] = useState('user')
  const [showPw,   setShowPw]   = useState(false)
  const [error,    setError]    = useState('')
  const [btnPressed, setBtnPressed] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const success = await login(username, password)
    if (success) navigate('/dashboard')
    else setError('Username o password non corretti')
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24,
    }}>
      {/* Card glass */}
      <div style={{
        width: '100%', maxWidth: 400,
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.15)',
        backdropFilter: 'blur(32px) saturate(1.7)',
        WebkitBackdropFilter: 'blur(32px) saturate(1.7)',
        borderRadius: 32,
        padding: '44px 36px',
        boxShadow: neu.panel,
      }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 20,
            background: 'rgba(99,102,241,0.12)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(99,102,241,0.25)',
            boxShadow: neu.outset,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 18px',
            fontSize: 18, fontWeight: 800, letterSpacing: '0.08em',
            color: 'var(--accent)',
          }}>
            CRM
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '0.2em', color: 'var(--text)', marginBottom: 8 }}>CRM PRO</h1>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', letterSpacing: '0.12em' }}>Accedi al tuo account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Username */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', color: 'var(--text-muted)', marginBottom: 8 }}>USERNAME</p>
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="user"
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 14, padding: '13px 18px',
                fontSize: 13, fontWeight: 500, letterSpacing: '0.06em',
                color: 'var(--text)', outline: 'none',
                boxShadow: neu.inset,
              }}
            />
          </div>

          {/* Password */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', color: 'var(--text-muted)', marginBottom: 8 }}>PASSWORD</p>
            <div style={{ position: 'relative' }}>
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="user"
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 14, padding: '13px 48px 13px 18px',
                  fontSize: 13, fontWeight: 500, letterSpacing: '0.06em',
                  color: 'var(--text)', outline: 'none',
                  boxShadow: neu.inset,
                }}
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}
              >
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p style={{ fontSize: 12, color: '#ef4444', letterSpacing: '0.06em', padding: '8px 14px', borderRadius: 10, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.18)' }}>
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            onMouseDown={() => setBtnPressed(true)}
            onMouseUp={() => setBtnPressed(false)}
            onMouseLeave={() => setBtnPressed(false)}
            style={{
              marginTop: 8,
              background: btnPressed ? 'rgba(99,102,241,0.18)' : 'rgba(99,102,241,0.10)',
              backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(99,102,241,0.25)',
              borderRadius: 999,
              padding: '13px 22px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              fontSize: 12, fontWeight: 700, letterSpacing: '0.16em',
              color: btnPressed ? 'var(--accent)' : 'var(--text)',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              boxShadow: btnPressed ? neu.inset : neu.outset,
              transition: 'box-shadow 0.15s, color 0.15s, background 0.15s',
              opacity: isLoading ? 0.7 : 1,
            }}
          >
            <LogIn size={15} />
            {isLoading ? 'ACCESSO…' : 'ACCEDI'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.14em', marginTop: 24 }}>
          DEMO · user / user
        </p>
      </div>
    </div>
  )
}