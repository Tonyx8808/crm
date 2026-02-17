'use client'

import { Card } from '@/components/ui'
import { useLanguage } from '@/contexts/LanguageContext'
import { useEffect } from 'react'
import { useAttivitaStore } from '../stores/attivitaStore'

export function Attivita() {
  const { t } = useLanguage()
  const { attivita, loading, fetchAttivita } = useAttivitaStore()

  useEffect(() => {
    fetchAttivita()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
        {t('nav.attivita')}
      </h1>

      <Card className="p-6">
        {loading && (
          <p className="text-gray-500">Caricamento attività...</p>
        )}

        {!loading && attivita.length === 0 && (
          <p className="text-gray-500">Nessuna attività disponibile.</p>
        )}

        {!loading && attivita.length > 0 && (
          <div className="space-y-4">
            {attivita.map(a => (
              <div
                key={a.id}
                className="p-4 border rounded-lg dark:border-gray-700 flex justify-between items-start"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {a.title}
                  </h3>

                  <p className="text-sm text-gray-500">{a.description}</p>

                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <p><strong>Cliente:</strong> {a.cliente}</p>
                    <p><strong>Data:</strong> {a.date} — {a.time}</p>
                    <p><strong>Assegnata a:</strong> {a.assignee}</p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  {/* PRIORITÀ */}
                  <span
                    className={
                      'px-3 py-1 text-xs rounded-full font-medium ' +
                      (a.priority === 'alta'
                        ? 'bg-red-100 text-red-700'
                        : a.priority === 'media'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700')
                    }
                  >
                    Priorità: {a.priority}
                  </span>

                  {/* STATO */}
                  <span
                    className={
                      'px-3 py-1 text-xs rounded-full font-medium ' +
                      (a.completed
                        ? 'bg-green-200 text-green-800'
                        : 'bg-gray-200 text-gray-700')
                    }
                  >
                    {a.completed ? 'Completata' : 'Da fare'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
