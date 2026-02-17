import { create } from 'zustand'
import {
  MOCK_CLIENTI,
  MOCK_AZIENDE,
  MOCK_CONTATTI,
  MOCK_ATTIVITA,
  MOCK_OPPORTUNITA,
  Cliente,
  Azienda,
  Contatto,
  Attivita,
  Opportunita
} from '@/data/mockData'

interface CRMStore {
  // Clienti
  clienti: Cliente[]
  searchClienti: string
  setSearchClienti: (term: string) => void
  addCliente: (cliente: Cliente) => void
  updateCliente: (id: string, cliente: Partial<Cliente>) => void
  deleteCliente: (id: string) => void
  getFilteredClienti: () => Cliente[]
  getClientiByStatus: (status: 'Attivo' | 'Inattivo') => Cliente[]
  getTotalRevenue: () => number
  getAverageRevenue: () => number

  // Aziende
  aziende: Azienda[]
  addAzienda: (azienda: Azienda) => void
  updateAzienda: (id: string, azienda: Partial<Azienda>) => void
  deleteAzienda: (id: string) => void

  // Contatti
  contatti: Contatto[]
  addContatto: (contatto: Contatto) => void
  updateContatto: (id: string, contatto: Partial<Contatto>) => void
  deleteContatto: (id: string) => void
  getContattiByCompany: (company: string) => Contatto[]

  // Attività
  attivita: Attivita[]
  addAttivita: (attivita: Attivita) => void
  updateAttivita: (id: string, attivita: Partial<Attivita>) => void
  deleteAttivita: (id: string) => void
  getAttivitaPending: () => Attivita[]
  getAttivitaCompleted: () => Attivita[]

  // Opportunità
  opportunita: Opportunita[]
  addOpportunita: (opp: Opportunita) => void
  updateOpportunita: (id: string, opp: Partial<Opportunita>) => void
  deleteOpportunita: (id: string) => void
  getOpportunitaByStage: (stage: string) => Opportunita[]
  getTotalPipeline: () => number
  getTotalPipelineByStage: (stage: string) => number
}

export const useCRMStore = create<CRMStore>((set, get) => ({
  // CLIENTI
  clienti: MOCK_CLIENTI,
  searchClienti: '',

  setSearchClienti: (term: string) => set({ searchClienti: term }),

  addCliente: (cliente: Cliente) => {
    set(state => ({ clienti: [cliente, ...state.clienti] }))
  },

  updateCliente: (id: string, updated: Partial<Cliente>) => {
    set(state => ({
      clienti: state.clienti.map(c => c.id === id ? { ...c, ...updated } : c)
    }))
  },

  deleteCliente: (id: string) => {
    set(state => ({
      clienti: state.clienti.filter(c => c.id !== id)
    }))
  },

  getFilteredClienti: () => {
    const { clienti, searchClienti } = get()
    if (!searchClienti) return clienti
    return clienti.filter(c =>
      c.name.toLowerCase().includes(searchClienti.toLowerCase()) ||
      c.email.toLowerCase().includes(searchClienti.toLowerCase()) ||
      c.company.toLowerCase().includes(searchClienti.toLowerCase())
    )
  },

  getClientiByStatus: (status: 'Attivo' | 'Inattivo') => {
    return get().clienti.filter(c => c.status === status)
  },

  getTotalRevenue: () => {
    return get().clienti.reduce((sum, c) => sum + (c.revenue || 0), 0)
  },

  getAverageRevenue: () => {
    const clienti = get().clienti
    const total = clienti.reduce((sum, c) => sum + (c.revenue || 0), 0)
    return clienti.length > 0 ? Math.round(total / clienti.length) : 0
  },

  // AZIENDE
  aziende: MOCK_AZIENDE,

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
  },

  // CONTATTI
  contatti: MOCK_CONTATTI,

  addContatto: (contatto: Contatto) => {
    set(state => ({ contatti: [contatto, ...state.contatti] }))
  },

  updateContatto: (id: string, updated: Partial<Contatto>) => {
    set(state => ({
      contatti: state.contatti.map(c => c.id === id ? { ...c, ...updated } : c)
    }))
  },

  deleteContatto: (id: string) => {
    set(state => ({
      contatti: state.contatti.filter(c => c.id !== id)
    }))
  },

  getContattiByCompany: (company: string) => {
    return get().contatti.filter(c => c.company === company)
  },

  // ATTIVITÀ
  attivita: MOCK_ATTIVITA,

  addAttivita: (attivita: Attivita) => {
    set(state => ({ attivita: [attivita, ...state.attivita] }))
  },

  updateAttivita: (id: string, updated: Partial<Attivita>) => {
    set(state => ({
      attivita: state.attivita.map(a => a.id === id ? { ...a, ...updated } : a)
    }))
  },

  deleteAttivita: (id: string) => {
    set(state => ({
      attivita: state.attivita.filter(a => a.id !== id)
    }))
  },

  getAttivitaPending: () => {
    return get().attivita.filter(a => !a.completed)
  },

  getAttivitaCompleted: () => {
    return get().attivita.filter(a => a.completed)
  },

  // OPPORTUNITÀ
  opportunita: MOCK_OPPORTUNITA,

  addOpportunita: (opp: Opportunita) => {
    set(state => ({ opportunita: [opp, ...state.opportunita] }))
  },

  updateOpportunita: (id: string, updated: Partial<Opportunita>) => {
    set(state => ({
      opportunita: state.opportunita.map(o => o.id === id ? { ...o, ...updated } : o)
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
  },

  getTotalPipelineByStage: (stage: string) => {
    return get().opportunita
      .filter(o => o.stage === stage)
      .reduce((sum, o) => sum + o.value, 0)
  }
}))
