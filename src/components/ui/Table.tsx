import React from 'react'

interface TableProps {
  columns: Array<{ key: string; label: string }>
  data: any[]
  onEdit?: (item: any) => void
  onDelete?: (item: any) => void
}

export function Table({ columns, data, onEdit, onDelete }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
          <tr>
            {columns.map(col => (
              <th key={col.key} className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                {col.label}
              </th>
            ))}
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Azioni</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
              {columns.map(col => (
                <td key={col.key} className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  {row[col.key]}
                </td>
              ))}
              <td className="px-6 py-4 text-sm flex gap-2">
                {onEdit && (
                  <button onClick={() => onEdit(row)} className="text-primary hover:underline">Modifica</button>
                )}
                {onDelete && (
                  <button onClick={() => onDelete(row)} className="text-danger hover:underline">Elimina</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
