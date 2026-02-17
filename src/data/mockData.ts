// =========================
// INTERFACCE
// =========================

export interface Cliente {
  id: string
  name: string
  email: string
  phone: string
  company: string
  status: 'Attivo' | 'Inattivo'
  createdAt: string
  lastContact: string
  revenue?: number
  notes?: string
}

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
}

export interface Contatto {
  id: string
  name: string
  email: string
  phone: string
  position: string
  company: string
  createdAt: string
}

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
}

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
}

// =========================
// CLIENTI
// =========================

export const MOCK_CLIENTI: Cliente[] = [
  {
    id: '1',
    name: 'Mario Rossi',
    email: 'mario.rossi@techitalia.it',
    phone: '+39 340 123 4567',
    company: 'Tech Italia S.p.A',
    status: 'Attivo',
    createdAt: '2024-01-15',
    lastContact: '2026-02-17',
    revenue: 45000,
    notes: 'Cliente VIP - Contratto annuale'
  },
  {
    id: '2',
    name: 'Laura Bianchi',
    email: 'laura.bianchi@startup-mi.it',
    phone: '+39 340 234 5678',
    company: 'Startup Milano',
    status: 'Attivo',
    createdAt: '2024-02-01',
    lastContact: '2026-02-16',
    revenue: 28000,
    notes: 'Progetto innovativo'
  },
  {
    id: '3',
    name: 'Giuseppe Verdi',
    email: 'g.verdi@enterprise-roma.it',
    phone: '+39 340 345 6789',
    company: 'Enterprise Roma',
    status: 'Inattivo',
    createdAt: '2023-12-20',
    lastContact: '2026-01-10',
    revenue: 12000,
    notes: 'In pausa'
  }
]

// =========================
// AZIENDE
// =========================

export const MOCK_AZIENDE: Azienda[] = [
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
    country: 'Italia'
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
    country: 'Italia'
  }
]

// =========================
// CONTATTI
// =========================

export const MOCK_CONTATTI: Contatto[] = [
  {
    id: '1',
    name: 'Mario Rossi',
    email: 'mario.rossi@techitalia.it',
    phone: '+39 340 123 4567',
    position: 'CEO',
    company: 'Tech Italia S.p.A',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Laura Bianchi',
    email: 'laura.bianchi@startup-mi.it',
    phone: '+39 340 234 5678',
    position: 'Founder',
    company: 'Startup Milano',
    createdAt: '2024-02-01'
  }
]

// =========================
// ATTIVITÀ (SETTIMANA + IMMINENTI + TIMELINE)
// =========================
//
// Oggi: 17 febbraio 2026
// Settimana corrente: 16–22 febbraio 2026
//

export const MOCK_ATTIVITA: Attivita[] = [
  // --- SETTIMANA CORRENTE ---
  {
    id: '1',
    title: 'Follow-up email',
    type: 'email',
    description: 'Verifica stato proposta',
    cliente: 'Digital Agency',
    date: '2026-02-16',
    time: '11:00',
    completed: false,
    assignee: 'Alessia Romano'
  },
  {
    id: '2',
    title: 'Chiamata con Mario Rossi',
    type: 'call',
    description: 'Aggiornamento contratto annuale',
    cliente: 'Tech Italia S.p.A',
    date: '2026-02-17',
    time: '10:00',
    completed: false,
    assignee: 'Mario Rossi'
  },
  {
    id: '3',
    title: 'Invio proposta commerciale',
    type: 'email',
    description: 'Proposta per nuovo progetto',
    cliente: 'Startup Milano',
    date: '2026-02-17',
    time: '14:30',
    completed: false,
    assignee: 'Laura Bianchi'
  },
  {
    id: '4',
    title: 'Meeting strategico',
    type: 'meeting',
    description: 'Discussione partnership',
    cliente: 'Finance Plus',
    date: '2026-02-19',
    time: '15:00',
    completed: false,
    assignee: 'Marco Ferrari'
  },
  {
    id: '5',
    title: 'Task: Preparare budget',
    type: 'task',
    description: 'Creare preventivo dettagliato',
    cliente: 'Logistica Nord',
    date: '2026-02-19',
    time: '09:00',
    completed: false,
    assignee: 'Andrea Conti'
  },

  // --- IMMINENTI (entro 7 giorni) ---
  {
    id: '6',
    title: 'Presentazione proposta a Bianchi',
    type: 'meeting',
    description: 'Presentazione dettagliata del progetto',
    cliente: 'Startup Milano',
    date: '2026-02-21',
    time: '16:00',
    completed: false,
    assignee: 'Laura Bianchi'
  },
  {
    id: '7',
    title: 'Richiamare fornitore',
    type: 'call',
    description: 'Aggiornamento stato consegne',
    cliente: 'Logistica Nord',
    date: '2026-02-22',
    time: '12:00',
    completed: false,
    assignee: 'Andrea Conti'
  },

  // --- TIMELINE (passate) ---
  {
    id: '8',
    title: 'Onboarding nuovo cliente',
    type: 'task',
    description: 'Setup iniziale piattaforma',
    cliente: 'Tech Italia S.p.A',
    date: '2026-02-10',
    time: '09:00',
    completed: true,
    assignee: 'Mario Rossi'
  },
  {
    id: '9',
    title: 'Revisione contratto',
    type: 'task',
    description: 'Aggiornamento clausole',
    cliente: 'Finance Plus',
    date: '2026-02-12',
    time: '10:00',
    completed: true,
    assignee: 'Marco Ferrari'
  }
]

// =========================
// OPPORTUNITÀ
// =========================

export const MOCK_OPPORTUNITA: Opportunita[] = [
  {
    id: '1',
    title: 'Progetto Innovazione Digitale',
    cliente: 'Tech Italia S.p.A',
    value: 125000,
    stage: 'proposal',
    probability: 75,
    closeDate: '2026-03-31',
    owner: 'Mario Rossi',
    notes: 'Trasformazione digitale completa'
  },
  {
    id: '2',
    title: 'Platform di E-commerce',
    cliente: 'Startup Milano',
    value: 85000,
    stage: 'qualified',
    probability: 60,
    closeDate: '2026-04-15',
    owner: 'Laura Bianchi',
    notes: 'MVP entro marzo'
  },
  {
    id: '3',
    title: 'Soluzione Fintech',
    cliente: 'Finance Plus',
    value: 250000,
    stage: 'negotiation',
    probability: 85,
    closeDate: '2026-02-28',
    owner: 'Marco Ferrari',
    notes: 'High-value contract'
  }
]
