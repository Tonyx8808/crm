import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { useAuthStore } from '@/stores/authStore'
import { AppLayout } from '@/components/layout/AppLayout'
import { LoginPage } from '@/pages/LoginPage'
import { Dashboard } from '@/pages/Dashboard'
import { Clienti } from '@/pages/Clienti'
import { Aziende } from '@/pages/Aziende'
import { Contatti } from '@/pages/Contatti'
import { Attivita } from '@/pages/Attivita'
import { Opportunita } from '@/pages/Opportunita'
import { Impostazioni } from '@/pages/Impostazioni'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore()
  return user ? <>{children}</> : <Navigate to="/login" />
}

function AppContent() {
  const { checkAuth, user } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (user === undefined) return <div>Caricamento...</div>

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clienti" element={<Clienti />} />
          <Route path="/aziende" element={<Aziende />} />
          <Route path="/contatti" element={<Contatti />} />
          <Route path="/attivita" element={<Attivita />} />
          <Route path="/opportunita" element={<Opportunita />} />
          <Route path="/impostazioni" element={<Impostazioni />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  )
}
