import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, Building2, Contact, Activity, TrendingUp, Settings, LogOut, X } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { useLanguage } from '@/contexts/LanguageContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const menuItems = [
  { label: 'nav.dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'nav.clienti', icon: Users, path: '/clienti' },
  { label: 'nav.aziende', icon: Building2, path: '/aziende' },
  { label: 'nav.contatti', icon: Contact, path: '/contatti' },
  { label: 'nav.attivita', icon: Activity, path: '/attivita' },
  { label: 'nav.opportunita', icon: TrendingUp, path: '/opportunita' },
  { label: 'nav.impostazioni', icon: Settings, path: '/impostazioni' },
]

interface SidebarProps {
  open?: boolean
  onClose?: () => void
}

export function Sidebar({ open = true, onClose }: SidebarProps) {
  const location = useLocation()
  const { t } = useLanguage()
  const { logout } = useAuthStore()
  const navigate = useNavigate()
  const [isCollapsed] = useState(false)

  const isActive = (path: string) => location.pathname === path

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <>
      {open && (
        <aside className={`fixed lg:relative left-0 top-0 h-screen z-50 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto transition-all ${isCollapsed ? 'lg:w-20' : 'lg:w-64'} w-64`}>
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center text-white font-bold">CRM</div>
              {!isCollapsed && <span className="hidden lg:block font-bold text-gray-900 dark:text-white">CRM Pro</span>}
            </Link>
            <button onClick={onClose} className="lg:hidden text-gray-500">
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="p-4 space-y-2">
            {menuItems.map(item => {
              const Icon = item.icon
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => onClose?.()}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive(item.path)
                      ? 'bg-primary text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && <span className="hidden lg:block text-sm font-medium">{t(item.label)}</span>}
                </Link>
              )
            })}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
            <button onClick={() => { handleLogout(); onClose?.() }} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="hidden lg:block text-sm font-medium">Esci</span>}
            </button>
          </div>
        </aside>
      )}
      {open && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}
    </>
  )
}
