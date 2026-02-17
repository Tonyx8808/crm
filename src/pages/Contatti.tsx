'use client'

import { Card } from '@/components/ui'
import { useLanguage } from '@/contexts/LanguageContext'
import { useEffect, useState } from 'react'
import { useContattiStore } from '../stores/contattiStore'
import type { Contatto } from '../stores/contattiStore'

export function Contatti() {
  const { t } = useLanguage()
  const { contatti, loading, fetchContatti } = useContattiStore()

  // FIX: tipizzazione corretta
  const [selected, setSelected] = useState<Contatto | null>(null)

  useEffect(() => {
    fetchContatti()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
        {t('nav.contatti')}
      </h1>

      <Card className="p-6">
        {loading && (
          <p className="text-gray-500">Caricamento contatti...</p>
        )}

        {!loading && contatti.length === 0 && (
          <p className="text-gray-500">Nessun contatto disponibile.</p>
        )}

        {!loading && contatti.length > 0 && (
          <div className="space-y-4">
            {contatti.map(c => (
              <div
                key={c.id}
                onClick={() => setSelected(c)} // FIX: ora accetta Contatto
                className="flex items-center justify-between p-4 border rounded-lg dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={c.avatar}
                    alt={c.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {c.name}
                    </p>
                    <p className="text-sm text-gray-500">{c.position}</p>
                    <p className="text-sm text-gray-500">{c.company}</p>
                  </div>
                </div>

                <span
                  className={
                    'text-sm px-3 py-1 rounded-full ' +
                    (c.status === 'online'
                      ? 'bg-green-100 text-green-700'
                      : c.status === 'away'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-gray-200 text-gray-600')
                  }
                >
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* MODAL FIXATA */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl w-80">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {selected.name}
            </h2>

            <div className="space-y-3">
              <button
                onClick={() => {
                  console.log("Chiama:", selected.phone)
                  setSelected(null)
                }}
                className="w-full py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
              >
                Chiama
              </button>

              <button
                onClick={() => {
                  console.log("Invia messaggio a:", selected.id)
                  setSelected(null)
                }}
                className="w-full py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
              >
                Invia Messaggio
              </button>

              <button
                onClick={() => setSelected(null)}
                className="w-full py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                Chiudi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
