import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@/contexts/ThemeContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { useAuthStore } from '@/stores/authStore'
import { Card, Button } from '@/components/ui'
import { Moon, Sun, Globe, Lock, Bell, Shield, LogOut, Save, Eye, EyeOff, Check, AlertCircle } from 'lucide-react'
import { Switch } from '@/components/ui/switch'

export function Impostazioni() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const { language, setLanguage } = useLanguage()
  const { logout, user } = useAuthStore()
  
  // Stato per cambio password
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordMessage, setPasswordMessage] = useState('')
  const [passwordError, setPasswordError] = useState('')

  // Stato per notifiche
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    newsletter: true,
  })

  // Stato per privacy
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    activityVisible: false,
    emailPublic: false,
  })

  // Stato per sessioni attive
  const [sessions] = useState([
    { id: '1', device: 'Windows PC', browser: 'Chrome', location: 'Milano, IT', lastActive: '2 min fa', current: true },
    { id: '2', device: 'iPhone 12', browser: 'Safari', location: 'Roma, IT', lastActive: '2 ore fa', current: false },
    { id: '3', device: 'MacBook Pro', browser: 'Firefox', location: 'Torino, IT', lastActive: '1 giorno fa', current: false },
  ])

  // Funzione cambio password
  const handleChangePassword = () => {
    setPasswordError('')
    setPasswordMessage('')

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('Riempi tutti i campi')
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('Le password non corrispondono')
      return
    }

    if (newPassword.length < 8) {
      setPasswordError('La password deve avere almeno 8 caratteri')
      return
    }

    // Simula cambio password
    setPasswordMessage('✅ Password cambiata con successo!')
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setTimeout(() => {
      setShowPasswordForm(false)
      setPasswordMessage('')
    }, 2000)
  }

  // Funzione logout
  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  // Funzione logout da tutti i dispositivi
  const handleLogoutAll = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Impostazioni</h1>
        <p className="text-gray-600 dark:text-gray-400">Gestisci il tuo account e le preferenze</p>
      </div>

      {/* Account Info */}
      <Card className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Informazioni Account
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Nome Utente</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{user?.name}</p>
            </div>
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">Verificato</div>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{user?.email}</p>
            </div>
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">Confermata</div>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Ruolo</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{user?.id === '1' ? 'Amministratore' : 'Utente'}</p>
            </div>
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">Admin</div>
          </div>
        </div>
      </Card>

      {/* Cambio Password */}
      <Card className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Lock className="w-5 h-5" />
          Sicurezza & Password
        </h2>
        
        {!showPasswordForm ? (
          <Button onClick={() => setShowPasswordForm(true)} variant="outline" className="w-full">
            <Lock className="w-4 h-4 mr-2" />
            Cambia Password
          </Button>
        ) : (
          <div className="space-y-4">
            {/* Password Attuale */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password Attuale</label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Inserisci password attuale"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
                >
                  {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Nuova Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nuova Password</label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Inserisci nuova password"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Minimo 8 caratteri</p>
            </div>

            {/* Conferma Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Conferma Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Conferma nuova password"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Messaggi */}
            {passwordError && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {passwordError}
              </div>
            )}
            {passwordMessage && (
              <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm flex items-center gap-2">
                <Check className="w-4 h-4" />
                {passwordMessage}
              </div>
            )}

            {/* Pulsanti */}
            <div className="flex gap-2">
              <Button onClick={handleChangePassword} className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                Salva Nuova Password
              </Button>
              <Button onClick={() => setShowPasswordForm(false)} variant="outline" className="flex-1">
                Annulla
              </Button>
            </div>
          </div>
        )}
      </Card>

    {/* Tema & Lingua */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
  {/* TEMA */}
  <Card>
    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
      <Moon className="w-5 h-5" />
      Tema
    </h2>

    <div className="flex items-center justify-between">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Modalità corrente:
        <span className="font-semibold text-gray-900 dark:text-white ml-1">
          {theme === 'dark' ? 'Scura 🌙' : 'Chiara ☀️'}
        </span>
      </p>

      <Switch
        checked={theme === 'dark'}
        onCheckedChange={toggleTheme}
      />
    </div>
  </Card>

  {/* LINGUA */}
  <Card>
    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
      <Globe className="w-5 h-5" />
      Lingua
    </h2>

    <div className="flex items-center justify-between">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Lingua corrente:
        <span className="font-semibold text-gray-900 dark:text-white ml-1">
          {language === 'it' ? 'Italiano 🇮🇹' : 'English 🇬🇧'}
        </span>
      </p>

      <Switch
        checked={language === 'it'}
        onCheckedChange={() => setLanguage(language === 'it' ? 'en' : 'it')}
      />
    </div>
  </Card>
</div>


      {/* Notifiche */}
      <Card className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Preferenze Notifiche
        </h2>
        <div className="space-y-4">
          {[
            { key: 'email', label: 'Notifiche Email', description: 'Ricevi aggiornamenti via email' },
            { key: 'sms', label: 'Notifiche SMS', description: 'Ricevi avvisi importanti via SMS' },
            { key: 'push', label: 'Notifiche Push', description: 'Avvisi in tempo reale sul browser' },
            { key: 'newsletter', label: 'Newsletter', description: 'Newsletter settimanale con notizie' },
          ].map((notif) => (
            <label key={notif.key} className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <input
                type="checkbox"
                checked={notifications[notif.key as keyof typeof notifications]}
                onChange={(e) => setNotifications({ ...notifications, [notif.key]: e.target.checked })}
                className="w-5 h-5 text-primary rounded cursor-pointer"
              />
              <div className="ml-3 flex-1">
                <p className="font-medium text-gray-900 dark:text-white">{notif.label}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{notif.description}</p>
              </div>
            </label>
          ))}
        </div>
      </Card>

      {/* Privacy */}
      <Card className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Privacy & Visibilità
        </h2>
        <div className="space-y-4">
          {[
            { key: 'profileVisible', label: 'Profilo Pubblico', description: 'Il tuo profilo è visibile agli altri utenti' },
            { key: 'activityVisible', label: 'Attività Visibile', description: 'Mostra la tua attività recente' },
            { key: 'emailPublic', label: 'Email Pubblica', description: 'Condividi la tua email con altri' },
          ].map((priv) => (
            <label key={priv.key} className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <input
                type="checkbox"
                checked={privacy[priv.key as keyof typeof privacy]}
                onChange={(e) => setPrivacy({ ...privacy, [priv.key]: e.target.checked })}
                className="w-5 h-5 text-primary rounded cursor-pointer"
              />
              <div className="ml-3 flex-1">
                <p className="font-medium text-gray-900 dark:text-white">{priv.label}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{priv.description}</p>
              </div>
            </label>
          ))}
        </div>
      </Card>

      {/* Sessioni Attive */}
      <Card className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Sessioni Attive</h2>
        <div className="space-y-3">
          {sessions.map((session) => (
            <div key={session.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{session.device}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{session.browser} • {session.location}</p>
                  <p className="text-xs text-gray-500 mt-1">Ultimo accesso: {session.lastActive}</p>
                </div>
                <div className="text-right">
                  {session.current && <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">Sessione Attuale</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button onClick={handleLogoutAll} variant="danger" className="w-full mt-4">
          <LogOut className="w-4 h-4 mr-2" />
          Esci da Tutti i Dispositivi
        </Button>
      </Card>

      {/* Logout */}
      <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
        <h2 className="text-lg font-semibold text-red-900 dark:text-red-200 mb-4 flex items-center gap-2">
          <LogOut className="w-5 h-5" />
          Logout
        </h2>
        <p className="text-sm text-red-800 dark:text-red-300 mb-4">Esci dal tuo account corrente.</p>
        <Button onClick={handleLogout} variant="danger" className="w-full">
          <LogOut className="w-4 h-4 mr-2" />
          Esci Ora
        </Button>
      </Card>
    </div>
  )
}
