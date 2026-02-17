export interface Cliente {
  id: string
  name: string
  email: string
  phone: string
  company: string
  status: 'Attivo' | 'Inattivo'
  createdAt: string
  lastContact: string
  notes?: string
}

export const MOCK_CLIENTI: Cliente[] = [
  { id: '1', name: 'Mario Rossi', email: 'mario@email.it', phone: '+39 340 123 4567', company: 'Tech Italia', status: 'Attivo', createdAt: '2024-01-15', lastContact: '2024-02-17' },
  { id: '2', name: 'Laura Bianchi', email: 'laura@email.it', phone: '+39 340 234 5678', company: 'Startup Milano', status: 'Attivo', createdAt: '2024-02-01', lastContact: '2024-02-16' },
  { id: '3', name: 'Giuseppe Verdi', email: 'giuseppe@email.it', phone: '+39 340 345 6789', company: 'Enterprise Roma', status: 'Inattivo', createdAt: '2023-12-20', lastContact: '2024-01-10' },
  { id: '4', name: 'Sofia Marchi', email: 'sofia@email.it', phone: '+39 340 456 7890', company: 'Growth Co', status: 'Attivo', createdAt: '2024-01-25', lastContact: '2024-02-15' },
  { id: '5', name: 'Marco Ferrari', email: 'marco.f@email.it', phone: '+39 340 567 8901', company: 'Digital Agency', status: 'Attivo', createdAt: '2024-02-05', lastContact: '2024-02-14' },
  { id: '6', name: 'Alessia Romano', email: 'alessia@email.it', phone: '+39 340 678 9012', company: 'Finance Plus', status: 'Attivo', createdAt: '2024-02-10', lastContact: '2024-02-13' },
]
