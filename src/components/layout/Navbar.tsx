import { Bell, Search, Moon, Sun } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { useState } from 'react'

const neu = {
  outset: `4px 4px 10px var(--neu-dark), -2px -2px 7px var(--neu-light)`,
  inset:  `inset 3px 3px 7px var(--neu-dark), inset -2px -2px 4px var(--neu-light)`,
  panel:  `6px 6px 16px var(--neu-dark), -4px -4px 10px var(--neu-light)`,
}

const glass: React.CSSProperties = {
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderTop: 'none',
  borderLeft: 'none',
  borderRight: 'none',
  borderBottom: '1px solid rgba(255,255,255,0.10)',
  backdropFilter: 'blur(24px) saturate(1.6)',
  WebkitBackdropFilter: 'blur(24px) saturate(1.6)',
}

function IconBtn({ onClick, children, title }: { onClick?: () => void; children: React.ReactNode; title?: string }) {
  const [pressed, setPressed] = useState(false)
  return (
    <button
      onClick={onClick}
      title={title}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        width: 38, height: 38,
        background: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.14)',
        borderRadius: 12,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer',
        color: pressed ? 'var(--accent)' : 'var(--text-muted)',
        boxShadow: pressed ? neu.inset : neu.outset,
        transition: 'box-shadow 0.15s, color 0.15s',
        flexShrink: 0,
      }}
    >
      {children}
    </button>
  )
}

interface NavbarProps {
  onMenuClick?: () => void
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const { theme, toggleTheme } = useTheme()
  const { language, setLanguage } = useLanguage()

  return (
    <nav style={{
      ...glass,
      position: 'sticky',
      top: 0,
      zIndex: 40,
      padding: '12px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      boxShadow: neu.panel,
    }}>

      {/* Left: search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          flex: 1,
          maxWidth: 380,
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 999,
          padding: '8px 16px',
          boxShadow: neu.inset,
        }}>
          <Search size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Cerca…"
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: '0.06em',
              color: 'var(--text)',
            }}
          />
        </div>
      </div>

      {/* Right: actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>

        <IconBtn title="Notifiche">
          <Bell size={17} />
        </IconBtn>

        <IconBtn onClick={toggleTheme} title="Cambia tema">
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </IconBtn>

        {/* Lingua pill */}
        <div style={{
          display: 'flex',
          borderRadius: 999,
          overflow: 'hidden',
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: neu.inset,
        }}>
          {(['it', 'en'] as const).map(l => (
            <button
              key={l}
              onClick={() => setLanguage(l)}
              style={{
                width: 32, height: 32,
                border: 'none',
                borderRadius: 999,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.1em',
                cursor: 'pointer',
                background: language === l
                  ? 'rgba(255,255,255,0.14)'
                  : 'transparent',
                color: language === l ? 'var(--accent)' : 'var(--text-muted)',
                boxShadow: language === l ? neu.outset : 'none',
                transition: 'box-shadow 0.2s, color 0.2s, background 0.2s',
              }}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}