import { create } from 'zustand'

export interface Opportunita {
  id: string
  title: string
  cliente: string
  value: number
  stage: 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost'
  probability: number
  closeDate: string
  owner: string
  notes?: string
  lastUpdated?: string
}

interface OpportunitaStore {
  opportunita: Opportunita[]
  loading: boolean
  error: string | null
  fetchOpportunita: () => Promise<void>
  addOpportunita: (opp: Opportunita) => void
  updateOpportunita: (id: string, opp: Partial<Opportunita>) => void
  deleteOpportunita: (id: string) => void
  getOpportunitaByStage: (stage: string) => Opportunita[]
  getTotalPipeline: () => number
}

const MOCK_OPPORTUNITA: Opportunita[] = [
  {
    id: '1',
    title: 'Progetto Innovazione Digitale',
    cliente: 'Tech Italia S.p.A',
    value: 125000,
    stage: 'proposal',
    probability: 75,
    closeDate: '2024-03-31',
    owner: 'Mario Rossi',
    notes: 'Trasformazione digitale completa',
    lastUpdated: '2024-02-17'
  },
  {
    id: '2',
    title: 'Platform di E-commerce',
    cliente: 'Startup Milano',
    value: 85000,
    stage: 'qualified',
    probability: 60,
    closeDate: '2024-04-15',
    owner: 'Laura Bianchi',
    notes: 'MVP entro marzo',
    lastUpdated: '2024-02-15'
  },
  {
    id: '3',
    title: 'Soluzione Fintech',
    cliente: 'Finance Plus',
    value: 250000,
    stage: 'negotiation',
    probability: 85,
    closeDate: '2024-02-28',
    owner: 'Marco Ferrari',
    notes: 'High-value contract',
    lastUpdated: '2024-02-16'
  },
  {
    id: '4',
    title: 'Campagne Social Media Annuali',
    cliente: 'Digital Agency',
    value: 45000,
    stage: 'won',
    probability: 100,
    closeDate: '2024-02-10',
    owner: 'Alessia Romano',
    notes: 'Contratto firmato',
    lastUpdated: '2024-02-10'
  },
  {
    id: '5',
    title: 'Sistema di Tracking Logistica',
    cliente: 'Logistica Nord',
    value: 180000,
    stage: 'lead',
    probability: 40,
    closeDate: '2024-05-30',
    owner: 'Andrea Conti',
    notes: 'In fase di valutazione',
    lastUpdated: '2024-02-12'
  },
  {
    id: '6',
    title: 'Soluzioni CRM Personalizzate',
    cliente: 'Retail Solutions',
    value: 95000,
    stage: 'proposal',
    probability: 70,
    closeDate: '2024-03-15',
    owner: 'Mario Rossi',
    notes: 'Customizzazione complessa',
    lastUpdated: '2024-02-14'
  },
  {
    id: '7',
    title: 'Integrazione API Enterprise',
    cliente: 'Tech Italia S.p.A',
    value: 160000,
    stage: 'negotiation',
    probability: 80,
    closeDate: '2024-03-20',
    owner: 'Marco Ferrari',
    notes: 'Implementazione complessa',
    lastUpdated: '2024-02-13'
  },
  {
    id: '8',
    title: 'Suite Software Cloud',
    cliente: 'Finance Plus',
    value: 320000,
    stage: 'qualified',
    probability: 65,
    closeDate: '2024-04-30',
    owner: 'Laura Bianchi',
    notes: 'Valutazione in corso',
    lastUpdated: '2024-02-17'
  }
]

export const useOpportunitaStore = create<OpportunitaStore>((set, get) => ({
  opportunita: [],
  loading: false,
  error: null,

  fetchOpportunita: async () => {
    set({ loading: true, error: null })
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      set({ opportunita: MOCK_OPPORTUNITA, loading: false })
    } catch (error) {
      set({ error: 'Errore nel caricamento opportunità', loading: false })
    }
  },

  addOpportunita: (opp: Opportunita) => {
    set(state => ({ opportunita: [opp, ...state.opportunita] }))
  },

  updateOpportunita: (id: string, updated: Partial<Opportunita>) => {
    set(state => ({
      opportunita: state.opportunita.map(o => o.id === id ? { ...o, ...updated, lastUpdated: new Date().toISOString().split('T')[0] } : o)
    }))
  },

  deleteOpportunita: (id: string) => {
    set(state => ({
      opportunita: state.opportunita.filter(o => o.id !== id)
    }))
  },

  getOpportunitaByStage: (stage: string) => {
    return get().opportunita.filter(o => o.stage === stage)
  },

  getTotalPipeline: () => {
    return get().opportunita.reduce((sum, o) => sum + o.value, 0)
  }
}))
