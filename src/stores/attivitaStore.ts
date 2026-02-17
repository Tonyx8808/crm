import { create } from 'zustand'

export interface Attivita {
  id: string
  title: string
  type: 'call' | 'email' | 'meeting' | 'task'
  description: string
  cliente: string
  date: string
  time: string
  completed: boolean
  assignee: string
  priority: 'bassa' | 'media' | 'alta'
}

interface AttivitaStore {
  attivita: Attivita[]
  loading: boolean
  error: string | null
  fetchAttivita: () => Promise<void>
  addAttivita: (attivita: Attivita) => void
  updateAttivita: (id: string, attivita: Partial<Attivita>) => void
  deleteAttivita: (id: string) => void
  completeAttivita: (id: string) => void
  getAttivitaPending: () => Attivita[]
}

const MOCK_ATTIVITA: Attivita[] = [
  {
    id: '1',
    title: 'Chiamata con Mario Rossi',
    type: 'call',
    description: 'Discussione contratto annuale',
    cliente: 'Tech Italia S.p.A',
    date: '2024-02-17',
    time: '10:00',
    completed: true,
    assignee: 'Mario Rossi',
    priority: 'alta'
  },
  {
    id: '2',
    title: 'Invio proposta commerciale',
    type: 'email',
    description: 'Proposta per nuovo progetto',
    cliente: 'Startup Milano',
    date: '2024-02-17',
    time: '14:30',
    completed: true,
    assignee: 'Laura Bianchi',
    priority: 'media'
  },
  {
    id: '3',
    title: 'Meeting strategico',
    type: 'meeting',
    description: 'Partnership discussione',
    cliente: 'Finance Plus',
    date: '2024-02-18',
    time: '15:00',
    completed: false,
    assignee: 'Marco Ferrari',
    priority: 'alta'
  },
  {
    id: '4',
    title: 'Follow-up email',
    type: 'email',
    description: 'Verifica proposte precedenti',
    cliente: 'Digital Agency',
    date: '2024-02-16',
    time: '11:00',
    completed: true,
    assignee: 'Alessia Romano',
    priority: 'bassa'
  },
  {
    id: '5',
    title: 'Task: Preparare budget',
    type: 'task',
    description: 'Creare preventivo dettagliato',
    cliente: 'Logistica Nord',
    date: '2024-02-19',
    time: '09:00',
    completed: false,
    assignee: 'Andrea Conti',
    priority: 'alta'
  },
  {
    id: '6',
    title: 'Riunione con team interno',
    type: 'meeting',
    description: 'Pianificazione Q1 2024',
    cliente: 'Interno',
    date: '2024-02-20',
    time: '13:00',
    completed: false,
    assignee: 'Mario Rossi',
    priority: 'media'
  }
]

export const useAttivitaStore = create<AttivitaStore>((set, get) => ({
  attivita: [],
  loading: false,
  error: null,

  fetchAttivita: async () => {
    set({ loading: true, error: null })
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      set({ attivita: MOCK_ATTIVITA, loading: false })
    } catch (error) {
      set({ error: 'Errore nel caricamento attività', loading: false })
    }
  },

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

  completeAttivita: (id: string) => {
    set(state => ({
      attivita: state.attivita.map(a => a.id === id ? { ...a, completed: true } : a)
    }))
  },

  getAttivitaPending: () => {
    return get().attivita.filter(a => !a.completed)
  }
}))
