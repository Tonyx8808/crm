import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Users, Building2, Contact,
  Activity, TrendingUp, Settings, LogOut, ChevronLeft, ChevronRight,
} from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { useLanguage } from '@/contexts/LanguageContext'
import { useState } from 'react'

const menuItems = [
  { label: 'nav.dashboard',    icon: LayoutDashboard, path: '/dashboard' },
  { label: 'nav.clienti',      icon: Users,           path: '/clienti' },
  { label: 'nav.aziende',      icon: Building2,       path: '/aziende' },
  { label: 'nav.contatti',     icon: Contact,         path: '/contatti' },
  { label: 'nav.attivita',     icon: Activity,        path: '/attivita' },
  { label: 'nav.opportunita',  icon: TrendingUp,      path: '/opportunita' },
  { label: 'nav.impostazioni', icon: Settings,        path: '/impostazioni' },
]

const neu = {
  outset:     `5px 5px 14px var(--neu-dark), -3px -3px 9px var(--neu-light)`,
  outsetHover:`7px 7px 18px var(--neu-dark), -4px -4px 11px var(--neu-light)`,
  inset:      `inset 4px 4px 10px var(--neu-dark), inset -2px -2px 6px var(--neu-light)`,
  insetSm:    `inset 2px 2px 5px var(--neu-dark), inset -1px -1px 3px var(--neu-light)`,
  panel:      `8px 8px 20px var(--neu-dark), -5px -5px 14px var(--neu-light), inset 0 1px 0 rgba(255,255,255,0.2)`,
}

const glass: React.CSSProperties = {
  background: 'var(--glass-bg)',
  border: '1px solid var(--glass-border)',
  backdropFilter: 'blur(24px) saturate(1.5)',
  WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
}

interface SidebarProps {
  open?: boolean
  onClose?: () => void
}

export function Sidebar({ open = true, onClose }: SidebarProps) {
  const location  = useLocation()
  const navigate  = useNavigate()
  const { t }     = useLanguage()
  const { logout } = useAuthStore()
  const [collapsed, setCollapsed] = useState(false)

  const isActive = (path: string) => location.pathname === path

  const handleLogout = () => {
    logout()
    navigate('/login')
    onClose?.()
  }

  if (!open) return null

  const W = collapsed ? 78 : 240

  return (
    <>
      {/* Backdrop mobile */}
      <div
        onClick={onClose}
        style={{
          display: 'none', // visibile solo su mobile via media query — gestito sotto
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.45)',
          backdropFilter: 'blur(4px)',
          zIndex: 40,
        }}
        className="lg-hidden-backdrop"
      />

      <aside style={{
        ...glass,
        position: 'relative',
        width: W,
        minWidth: W,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 16px',
        gap: 4,
        boxShadow: neu.panel,
        transition: 'width 0.3s cubic-bezier(.4,0,.2,1), min-width 0.3s cubic-bezier(.4,0,.2,1)',
        overflow: 'hidden',
        zIndex: 50,
        flexShrink: 0,
      }}>

        {/* ── Header: logo + toggle ── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          gap: 12,
          paddingBottom: 20,
          marginBottom: 12,
          borderBottom: '1px solid var(--glass-border)',
        }}>
          {!collapsed && (
            <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
              {/* Logo neumorfico */}
              <div style={{
                width: 38, height: 38, borderRadius: 13,
                background: 'var(--bg)',
                boxShadow: neu.outset,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 800, letterSpacing: '0.04em',
                color: 'var(--accent)',
                flexShrink: 0,
              }}>
                CRM
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.16em', color: 'var(--text)', whiteSpace: 'nowrap' }}>
                CRM PRO
              </span>
            </Link>
          )}

          {/* Toggle collapse */}
          <button
            onClick={() => setCollapsed(c => !c)}
            style={{
              width: 32, height: 32, borderRadius: 10,
              background: 'var(--bg)', border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              boxShadow: neu.outset,
              flexShrink: 0,
              transition: 'box-shadow 0.15s',
            }}
            onMouseDown={e => (e.currentTarget.style.boxShadow = neu.inset)}
            onMouseUp={e => (e.currentTarget.style.boxShadow = neu.outset)}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = neu.outset)}
          >
            {collapsed
              ? <ChevronRight size={14} />
              : <ChevronLeft size={14} />
            }
          </button>
        </div>

        {/* ── Nav items ── */}
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 8, paddingBottom: 8 }}>
          {menuItems.map(item => {
            const Icon    = item.icon
            const active  = isActive(item.path)
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => onClose?.()}
                style={{ textDecoration: 'none' }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  gap: 14,
                  height: 48,
                  borderRadius: 999,
                  padding: collapsed ? 0 : '0 16px',
                  background: 'var(--bg)',
                  boxShadow: active ? neu.inset : neu.outset,
                  cursor: 'pointer',
                  transition: 'box-shadow 0.2s',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
                  onMouseEnter={e => { if (!active) (e.currentTarget as HTMLDivElement).style.boxShadow = neu.outsetHover }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = active ? neu.inset : neu.outset }}
                >
                  {/* Icon circle */}
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    flexShrink: 0,
                    background: 'var(--bg)',
                    boxShadow: active ? neu.outset : neu.insetSm,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: active ? 'var(--accent)' : 'var(--text-muted)',
                    transition: 'box-shadow 0.2s, color 0.2s',
                  }}>
                    <Icon size={13} />
                  </div>

                  {!collapsed && (
                    <span style={{
                      fontSize: 12, fontWeight: 700,
                      letterSpacing: '0.14em',
                      color: active ? 'var(--accent)' : 'var(--text)',
                      transition: 'color 0.2s',
                    }}>
                      {t(item.label).toUpperCase()}
                    </span>
                  )}
                </div>
              </Link>
            )
          })}
        </nav>

        {/* ── Logout ── */}
        <div style={{ paddingTop: 20, borderTop: '1px solid var(--glass-border)' }}>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: collapsed ? 'center' : 'flex-start',
              gap: 14,
              height: 48,
              borderRadius: 999,
              padding: collapsed ? 0 : '0 16px',
              background: 'var(--bg)',
              border: 'none',
              boxShadow: neu.outset,
              cursor: 'pointer',
              transition: 'box-shadow 0.2s',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
            onMouseDown={e => (e.currentTarget.style.boxShadow = neu.inset)}
            onMouseUp={e => (e.currentTarget.style.boxShadow = neu.outset)}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = neu.outset)}
          >
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              flexShrink: 0,
              background: 'var(--bg)',
              boxShadow: neu.insetSm,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#ef4444',
            }}>
              <LogOut size={13} />
            </div>
            {!collapsed && (
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', color: '#ef4444' }}>
                ESCI
              </span>
            )}
          </button>
        </div>

      </aside>
    </>
  )
}