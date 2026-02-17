import React, { createContext, useContext, useState } from 'react'

type Language = 'it' | 'en'

const translations = {
  'nav.dashboard': { it: 'Dashboard', en: 'Dashboard' },
  'nav.clienti': { it: 'Clienti', en: 'Clients' },
  'nav.aziende': { it: 'Aziende', en: 'Companies' },
  'nav.contatti': { it: 'Contatti', en: 'Contacts' },
  'nav.attivita': { it: 'Attività', en: 'Activities' },
  'nav.opportunita': { it: 'Opportunità', en: 'Opportunities' },
  'nav.impostazioni': { it: 'Impostazioni', en: 'Settings' },
  'btn.nuovo': { it: 'Nuovo', en: 'New' },
  'btn.salva': { it: 'Salva', en: 'Save' },
  'btn.elimina': { it: 'Elimina', en: 'Delete' },
  'btn.modifica': { it: 'Modifica', en: 'Edit' },
  'btn.cerca': { it: 'Cerca', en: 'Search' },
  'btn.esporta': { it: 'Esporta', en: 'Export' },
  'btn.stampa': { it: 'Stampa', en: 'Print' },
} as const

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('language') as Language) || 'it'
  })

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    const trans = translations[key as keyof typeof translations]
    return (trans ? trans[language] : key) as string
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
