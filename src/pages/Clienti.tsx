import { useState } from 'react'
import { Card, Button, Input, Badge, Table, Modal } from '@/components/ui'
import { useLanguage } from '@/contexts/LanguageContext'
import { MOCK_CLIENTI, Cliente } from '@/data/mockClienti'
import { Plus, Search } from 'lucide-react'

export function Clienti() {
  const { t } = useLanguage()
  const [clienti, setClienti] = useState(MOCK_CLIENTI)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', status: 'Attivo' as const })

  const filtered = clienti.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAdd = () => {
    if (formData.name && formData.email) {
      const newCliente: Cliente = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString().split('T')[0],
        lastContact: new Date().toISOString().split('T')[0],
      }
      setClienti([newCliente, ...clienti])
      setFormData({ name: '', email: '', phone: '', company: '', status: 'Attivo' })
      setShowModal(false)
    }
  }

  const handleDelete = (id: string) => {
    setClienti(clienti.filter(c => c.id !== id))
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{t('nav.clienti')}</h1>
          <p className="text-gray-600 dark:text-gray-400">Gestisci i tuoi clienti</p>
        </div>
        <Button onClick={() => setShowModal(true)}>
          <Plus className="w-5 h-5 mr-2" />
          {t('btn.nuovo')}
        </Button>
      </div>

      <Card className="flex items-center gap-2">
        <Search className="w-5 h-5 text-gray-400" />
        <Input
          placeholder={t('btn.cerca')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-0"
        />
      </Card>

      <Card>
        <Table
          columns={[
            { key: 'name', label: 'Nome' },
            { key: 'email', label: 'Email' },
            { key: 'company', label: 'Azienda' },
            { key: 'status', label: 'Stato' },
          ]}
          data={filtered.map(c => ({
            ...c,
            status: <Badge variant={c.status === 'Attivo' ? 'success' : 'danger'}>{c.status}</Badge>,
          }))}
          onDelete={(item) => handleDelete(item.id)}
        />
      </Card>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Nuovo Cliente"
      >
        <div className="space-y-4">
          <Input
            label="Nome"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <Input
            label="Telefono"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <Input
            label="Azienda"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />
          <div className="flex gap-2">
            <Button onClick={handleAdd} className="flex-1">Salva</Button>
            <Button onClick={() => setShowModal(false)} variant="outline" className="flex-1">Annulla</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
