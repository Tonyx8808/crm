import { useEffect, useState } from 'react'
import { useAziendaStore } from '@/stores/aziendaStore'
import { Card, Button, Input, Modal } from '@/components/ui'
import { Building2, Plus, Search, MapPin, Users, Globe, Mail, Phone } from 'lucide-react'

export function Aziende() {
  const { aziende, loading, fetchAziende, addAzienda } = useAziendaStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [selectedAzienda, setSelectedAzienda] = useState<any>(null)
  const [formData, setFormData] = useState({ name: '', industry: '', employees: '', website: '', email: '', phone: '' })

  useEffect(() => {
    fetchAziende()
  }, [fetchAziende])

  const filtered = aziende.filter(a =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.city.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddAzienda = () => {
    if (formData.name && formData.industry && formData.employees) {
      addAzienda({
        id: Date.now().toString(),
        ...formData,
        employees: parseInt(formData.employees),
        address: 'Via da definire',
        city: 'Milano',
        country: 'Italia'
      })
      setFormData({ name: '', industry: '', employees: '', website: '', email: '', phone: '' })
      setShowModal(false)
    }
  }

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin inline-flex items-center justify-center w-12 h-12 border-4 border-gray-200 dark:border-gray-700 border-t-primary rounded-full mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Caricamento aziende...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Aziende</h1>
          <p className="text-gray-600 dark:text-gray-400">Gestisci le aziende e i loro dettagli</p>
        </div>
        <Button onClick={() => setShowModal(true)}>
          <Plus className="w-5 h-5 mr-2" />
          Nuova Azienda
        </Button>
      </div>

      <Card className="flex items-center gap-2">
        <Search className="w-5 h-5 text-gray-400" />
        <Input placeholder="Cerca aziende..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border-0" />
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((azienda) => (
          <Card key={azienda.id} className="cursor-pointer hover:shadow-lg transition-all" onClick={() => setSelectedAzienda(azienda)}>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center text-white">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{azienda.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{azienda.industry}</p>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Users className="w-4 h-4" />
                {azienda.employees} dipendenti
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4" />
                {azienda.city}, {azienda.country}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
