import { create } from 'zustand'

export interface Azienda {
  id: string
  name: string
  industry: string
  employees: number
  website: string
  email: string
  phone: string
  address: string
  city: string
  country: string
  revenue?: number
  foundedYear?: number
  description?: string
}

interface AziendaStore {
  aziende: Azienda[]
  loading: boolean
  error: string | null
  fetchAziende: () => Promise<void>
  addAzienda: (azienda: Azienda) => void
  updateAzienda: (id: string, azienda: Partial<Azienda>) => void
  deleteAzienda: (id: string) => void
}

const MOCK_AZIENDE: Azienda[] = [
  {
    id: '1',
    name: 'Tech Italia S.p.A',
    industry: 'Software & IT',
    employees: 150,
    website: 'www.techitalia.it',
    email: 'info@techitalia.it',
    phone: '+39 02 1234 5678',
    address: 'Via Roma 123',
    city: 'Milano',
    country: 'Italia',
    revenue: 2500000,
    foundedYear: 2010,
    description: 'Azienda leader nel software enterprise'
  },
  {
    id: '2',
    name: 'Startup Milano',
    industry: 'Tech Startup',
    employees: 25,
    website: 'www.startupmi.it',
    email: 'contact@startupmi.it',
    phone: '+39 02 9876 5432',
    address: 'Via Garibaldi 456',
    city: 'Milano',
    country: 'Italia',
    revenue: 450000,
    foundedYear: 2020,
    description: 'Innovazione nel settore fintech'
  },
  {
    id: '3',
    name: 'Finance Plus',
    industry: 'Finanza',
    employees: 200,
    website: 'www.financeplus.it',
    email: 'info@financeplus.it',
    phone: '+39 06 5555 1234',
    address: 'Via Cavour 789',
    city: 'Roma',
    country: 'Italia',
    revenue: 5000000,
    foundedYear: 2008,
    description: 'Servizi finanziari completi'
  },
  {
    id: '4',
    name: 'Digital Agency',
    industry: 'Marketing & Advertising',
    employees: 75,
    website: 'www.digitalagency.it',
    email: 'hello@digitalagency.it',
    phone: '+39 11 4444 8888',
    address: 'Corso Vittorio 234',
    city: 'Torino',
    country: 'Italia',
    revenue: 1200000,
    foundedYear: 2015,
    description: 'Agenzia creativa digitale'
  },
  {
    id: '5',
    name: 'Logistica Nord',
    industry: 'Trasporti & Logistica',
    employees: 300,
    website: 'www.logisticanord.it',
    email: 'info@logisticanord.it',
    phone: '+39 041 3333 2222',
    address: 'Via Industria 111',
    city: 'Venezia',
    country: 'Italia',
    revenue: 8000000,
    foundedYear: 2005,
    description: 'Leader nella logistica del nord Italia'
  }
]

export const useAziendaStore = create<AziendaStore>((set) => ({
  aziende: [],
  loading: false,
  error: null,

  fetchAziende: async () => {
    set({ loading: true, error: null })
    try {
      // Simula API call con delay
      await new Promise(resolve => setTimeout(resolve, 800))
      set({ aziende: MOCK_AZIENDE, loading: false })
    } catch (error) {
      set({ error: 'Errore nel caricamento aziende', loading: false })
    }
  },

  addAzienda: (azienda: Azienda) => {
    set(state => ({ aziende: [azienda, ...state.aziende] }))
  },

  updateAzienda: (id: string, updated: Partial<Azienda>) => {
    set(state => ({
      aziende: state.aziende.map(a => a.id === id ? { ...a, ...updated } : a)
    }))
  },

  deleteAzienda: (id: string) => {
    set(state => ({
      aziende: state.aziende.filter(a => a.id !== id)
    }))
  }
}))
