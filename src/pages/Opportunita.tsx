'use client'

import { Card } from '@/components/ui'
import { useLanguage } from '@/contexts/LanguageContext'
import { useEffect } from 'react'
import { useOpportunitaStore } from '../stores/opportunitaStore'

export function Opportunita() {
  const { t } = useLanguage()
  const { opportunita, loading, fetchOpportunita } = useOpportunitaStore()

  useEffect(() => {
    fetchOpportunita()
  }, [])

  const stageColors: Record<string, string> = {
    lead: 'bg-gray-200 text-gray-700',
    qualified: 'bg-blue-100 text-blue-700',
    proposal: 'bg-yellow-100 text-yellow-700',
    negotiation: 'bg-purple-100 text-purple-700',
    won: 'bg-green-200 text-green-800',
    lost: 'bg-red-200 text-red-800'
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
        {t('nav.opportunita')}
      </h1>

      <Card className="p-6">
        {loading && (
          <p className="text-gray-500">Caricamento opportunità...</p>
        )}

        {!loading && opportunita.length === 0 && (
          <p className="text-gray-500">Nessuna opportunità disponibile.</p>
        )}

        {!loading && opportunita.length > 0 && (
          <div className="space-y-4">
            {opportunita.map(o => (
              <div
                key={o.id}
                className="p-4 border rounded-lg dark:border-gray-700 flex justify-between items-start"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {o.title}
                  </h3>

                  <p className="text-sm text-gray-500">{o.notes}</p>

                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <p><strong>Cliente:</strong> {o.cliente}</p>
                    <p><strong>Valore:</strong> € {o.value.toLocaleString()}</p>
                    <p><strong>Probabilità:</strong> {o.probability}%</p>
                    <p><strong>Chiusura prevista:</strong> {o.closeDate}</p>
                    <p><strong>Owner:</strong> {o.owner}</p>
                    <p><strong>Aggiornato il:</strong> {o.lastUpdated}</p>
                  </div>
                </div>

                <span
                  className={
                    'px-3 py-1 text-xs rounded-full font-medium ' +
                    stageColors[o.stage]
                  }
                >
                  {o.stage}
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
