import { Bell, Search, Menu, Moon, Sun, Globe } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { useState } from 'react'

interface NavbarProps {
  onMenuClick?: () => void
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const { theme, toggleTheme } = useTheme()
  const { language, setLanguage } = useLanguage()
  const [showNotifications] = useState(false)

  return (
    <nav className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <button onClick={onMenuClick} className="lg:hidden text-gray-500 hover:text-gray-900 dark:hover:text-white">
            <Menu className="w-6 h-6" />
          </button>
          <div className="hidden md:flex flex-1 max-w-md items-center gap-2 bg-gray-100 dark:bg-gray-700 px-4 py-2.5 rounded-lg">
            <Search className="w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Cerca..." className="flex-1 bg-transparent text-sm outline-none" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="relative p-2.5 text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-lg">
            <Bell className="w-5 h-5" />
          </button>

          <button onClick={toggleTheme} className="p-2.5 text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-lg" title="Toggle dark mode">
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <button onClick={() => setLanguage(language === 'it' ? 'en' : 'it')} className="p-2.5 text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-lg flex items-center gap-1" title="Toggle language">
            <Globe className="w-5 h-5" />
            <span className="text-xs font-bold">{language.toUpperCase()}</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
