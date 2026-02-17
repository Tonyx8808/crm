import { create } from 'zustand'

export interface Message {
  id: string
  contactId: string
  sender: 'user' | 'contact'
  text: string
  timestamp: string
  type: 'text' | 'call'
}

export interface Contatto {
  id: string
  name: string
  email: string
  phone: string
  whatsapp?: string
  position: string
  company: string
  createdAt: string
  avatar?: string
  status: 'online' | 'offline' | 'away'
  lastSeen?: string
}

interface ContattiStore {
  contatti: Contatto[]
  messages: Message[]
  loading: boolean
  error: string | null
  selectedContactId: string | null
  
  fetchContatti: () => Promise<void>
  addContatto: (contatto: Contatto) => void
  updateContatto: (id: string, contatto: Partial<Contatto>) => void
  deleteContatto: (id: string) => void
  
  selectContact: (id: string) => void
  getMessages: (contactId: string) => Message[]
  sendMessage: (contactId: string, text: string) => void
  receiveMessage: (contactId: string, text: string) => void
  startCall: (contactId: string) => void
  getContattiByCompany: (company: string) => Contatto[]
}

const MOCK_CONTATTI: Contatto[] = [
  {
    id: '1',
    name: 'Mario Rossi',
    email: 'mario.rossi@techitalia.it',
    phone: '+39 340 123 4567',
    whatsapp: '+39 340 123 4567',
    position: 'CEO',
    company: 'Tech Italia S.p.A',
    createdAt: '2024-01-15',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MarioRossi',
    status: 'online',
    lastSeen: '2 min fa'
  },
  {
    id: '2',
    name: 'Anna Verdi',
    email: 'anna.verdi@techitalia.it',
    phone: '+39 340 111 2222',
    whatsapp: '+39 340 111 2222',
    position: 'Sales Manager',
    company: 'Tech Italia S.p.A',
    createdAt: '2024-01-15',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AnnaVerdi',
    status: 'online',
    lastSeen: '5 min fa'
  },
  {
    id: '3',
    name: 'Laura Bianchi',
    email: 'laura.bianchi@startup-mi.it',
    phone: '+39 340 234 5678',
    whatsapp: '+39 340 234 5678',
    position: 'Founder',
    company: 'Startup Milano',
    createdAt: '2024-02-01',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LauraBianchi',
    status: 'away',
    lastSeen: '1 ora fa'
  },
  {
    id: '4',
    name: 'Marco Ferrari',
    email: 'marco.ferrari@digitalagency.it',
    phone: '+39 340 567 8901',
    whatsapp: '+39 340 567 8901',
    position: 'Creative Director',
    company: 'Digital Agency',
    createdAt: '2024-02-05',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MarcoFerrari',
    status: 'offline',
    lastSeen: '3 ore fa'
  },
  {
    id: '5',
    name: 'Sofia Marchi',
    email: 'sofia.marchi@growth-co.it',
    phone: '+39 340 456 7890',
    whatsapp: '+39 340 456 7890',
    position: 'Business Development',
    company: 'Growth Co',
    createdAt: '2024-01-25',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SofiaMarchi',
    status: 'online',
    lastSeen: '1 min fa'
  },
  {
    id: '6',
    name: 'Davide Rossi',
    email: 'davide.rossi@financeplus.it',
    phone: '+39 340 789 0123',
    whatsapp: '+39 340 789 0123',
    position: 'CFO',
    company: 'Finance Plus',
    createdAt: '2024-02-10',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DavideRossi',
    status: 'online',
    lastSeen: '10 min fa'
  }
]

const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    contactId: '1',
    sender: 'contact',
    text: 'Ciao! Come stai? Volevo parlare del contratto',
    timestamp: '2024-02-17T10:30:00',
    type: 'text'
  },
  {
    id: '2',
    contactId: '1',
    sender: 'user',
    text: 'Ciao Mario! Tutto bene, stavo aspettando tue notizie 😊',
    timestamp: '2024-02-17T10:31:00',
    type: 'text'
  },
  {
    id: '3',
    contactId: '1',
    sender: 'contact',
    text: 'Perfetto! Possiamo fare una call domani alle 10?',
    timestamp: '2024-02-17T10:32:00',
    type: 'text'
  },
  {
    id: '4',
    contactId: '1',
    sender: 'user',
    text: 'Certo! Mi va bene 👍',
    timestamp: '2024-02-17T10:33:00',
    type: 'text'
  },
  {
    id: '5',
    contactId: '3',
    sender: 'contact',
    text: 'Ciao! Hai visto la proposta che ti ho mandato?',
    timestamp: '2024-02-17T09:15:00',
    type: 'text'
  },
  {
    id: '6',
    contactId: '3',
    sender: 'user',
    text: 'Sì, la sto leggendo. Domande interessanti!',
    timestamp: '2024-02-17T09:16:00',
    type: 'text'
  }
]

export const useContattiStore = create<ContattiStore>((set, get) => ({
  contatti: [],
  messages: [],
  loading: false,
  error: null,
  selectedContactId: null,

  fetchContatti: async () => {
    set({ loading: true, error: null })
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      set({ contatti: MOCK_CONTATTI, messages: MOCK_MESSAGES, loading: false })
    } catch (error) {
      set({ error: 'Errore nel caricamento contatti', loading: false })
    }
  },

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

  selectContact: (id: string) => {
    set({ selectedContactId: id })
  },

  getMessages: (contactId: string) => {
    return get().messages.filter(m => m.contactId === contactId)
  },

  sendMessage: (contactId: string, text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      contactId,
      sender: 'user',
      text,
      timestamp: new Date().toISOString(),
      type: 'text'
    }
    set(state => ({ messages: [...state.messages, newMessage] }))

    // Simula risposta dopo 2 secondi
    setTimeout(() => {
      const replyMessage: Message = {
        id: (Date.now() + 1).toString(),
        contactId,
        sender: 'contact',
        text: 'Grazie per il messaggio! 👍',
        timestamp: new Date().toISOString(),
        type: 'text'
      }
      set(state => ({ messages: [...state.messages, replyMessage] }))
    }, 2000)
  },

  receiveMessage: (contactId: string, text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      contactId,
      sender: 'contact',
      text,
      timestamp: new Date().toISOString(),
      type: 'text'
    }
    set(state => ({ messages: [...state.messages, newMessage] }))
  },

  startCall: (contactId: string) => {
    const contact = get().contatti.find(c => c.id === contactId)
    if (contact) {
      console.log(`📞 Chiamata a ${contact.name} (${contact.phone})`)
      // Qui puoi integrare con Twilio, Vonage, ecc.
    }
  },

  getContattiByCompany: (company: string) => {
    return get().contatti.filter(c => c.company === company)
  }
}))
