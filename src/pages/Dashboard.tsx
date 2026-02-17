'use client'

import { Card } from '@/components/ui'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts'
import { useCRMStore } from '@/stores/crmStore'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { Users, TrendingUp, DollarSign, Target, Clock, CalendarDays } from 'lucide-react'
import { useState } from 'react'

// Tipo corretto per React-Calendar
type CalendarValue = Date | [Date, Date] | null

export function Dashboard() {
  const {
    clienti,
    opportunita,
    attivita,
    getTotalRevenue,
    getTotalPipeline,
    getClientiByStatus
  } = useCRMStore()

  const activeClients = getClientiByStatus('Attivo').length
  const totalRevenue = getTotalRevenue()
  const totalPipeline = getTotalPipeline()
  const opportunitiesCount = opportunita.length

  const [date, setDate] = useState<CalendarValue>(new Date())

  // --- EVENTI CALENDARIO ---
  const eventsByDate: Record<string, Array<{ type: string; title: string }>> = {}

  attivita.forEach(a => {
    const key = a.date
    if (!eventsByDate[key]) eventsByDate[key] = []
    eventsByDate[key].push({ type: a.type, title: a.title })
  })

  opportunita.forEach(o => {
    const key = o.closeDate
    if (!eventsByDate[key]) eventsByDate[key] = []
    eventsByDate[key].push({ type: 'opportunità', title: o.title })
  })

  const tileClassName = ({ date }: { date: Date }) => {
    const key = date.toISOString().split('T')[0]
    if (eventsByDate[key]) {
      return 'relative after:content-[""] after:w-2 after:h-2 after:bg-blue-600 after:rounded-full after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2'
    }
    return ''
  }

  const selectedDateKey =
    date instanceof Date ? date.toISOString().split('T')[0] : null

  const eventsForSelectedDay =
    selectedDateKey && eventsByDate[selectedDateKey]
      ? eventsByDate[selectedDateKey]
      : []

  // --- AGENDA SETTIMANALE ---
  const getWeekEvents = () => {
    const today = new Date()
    const start = new Date(today)
    start.setDate(today.getDate() - today.getDay() + 1) // lunedì

    const end = new Date(start)
    end.setDate(start.getDate() + 6)

    const weekEvents: Array<{ date: string; title: string; type: string }> = []

    Object.keys(eventsByDate).forEach(key => {
      const d = new Date(key)
      if (d >= start && d <= end) {
        eventsByDate[key].forEach(ev => {
          weekEvents.push({ date: key, title: ev.title, type: ev.type })
        })
      }
    })

    return weekEvents.sort((a, b) => a.date.localeCompare(b.date))
  }

  const weeklyEvents = getWeekEvents()

  // --- TIMELINE ---
  const timeline = attivita
    .map(a => ({ date: a.date, title: a.title, type: a.type }))
    .sort((a, b) => a.date.localeCompare(b.date))

  // --- ATTIVITÀ IMMINENTI ---
  const upcoming = attivita.filter(a => {
    const today = new Date()
    const d = new Date(a.date)
    const diff = (d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    return diff >= 0 && diff <= 7
  })

  // --- GRAFICI ---
  const chartData = [
    { month: 'Gen', value: 12000 },
    { month: 'Feb', value: 18000 },
    { month: 'Mar', value: 15000 },
    { month: 'Apr', value: 22000 },
    { month: 'May', value: 25000 },
    { month: 'Jun', value: 28000 }
  ]

  const stageData = opportunita.reduce((acc, opp) => {
    const existing = acc.find(item => item.name === opp.stage)
    if (existing) existing.value += opp.value
    else acc.push({ name: opp.stage, value: opp.value })
    return acc
  }, [] as Array<{ name: string; value: number }>)

  const colors = ['#0066FF', '#7C3AED', '#10B981', '#F59E0B', '#EF4444', '#06B6D4']

  return (
    <div className="p-8 space-y-8">

      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Dashboard</h1>

      {/* KPI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card><p>Clienti Attivi: {activeClients}</p></Card>
        <Card><p>Opportunità: {opportunitiesCount}</p></Card>
        <Card><p>Ricavi Totali: €{totalRevenue.toLocaleString()}</p></Card>
        <Card><p>Pipeline: €{totalPipeline.toLocaleString()}</p></Card>
      </div>

      {/* GRAFICI */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2>Trend Revenue</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#0066FF" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h2>Pipeline Opportunità</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={stageData} dataKey="value" nameKey="name" outerRadius={120}>
                {stageData.map((_, i) => (
                  <Cell key={i} fill={colors[i % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* CALENDARIO + AGENDA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* CALENDARIO */}
        <Card>
          <h2>Calendario</h2>
          <Calendar
            onChange={(value) => setDate(value as CalendarValue)}
            value={date}
            tileClassName={tileClassName}
          />

          {eventsForSelectedDay.length > 0 && (
            <div className="mt-4 space-y-2">
              <h3>Eventi del giorno</h3>
              {eventsForSelectedDay.map((ev, i) => (
                <div key={i} className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <p>{ev.title}</p>
                  <p className="text-xs text-gray-500">{ev.type}</p>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* AGENDA SETTIMANALE */}
        <Card>
          <h2 className="flex items-center gap-2"><CalendarDays /> Agenda settimanale</h2>
          {weeklyEvents.length === 0 && <p>Nessun evento questa settimana</p>}
          <div className="space-y-3">
            {weeklyEvents.map((ev, i) => (
              <div key={i} className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
                <p className="font-medium">{ev.title}</p>
                <p className="text-xs text-gray-500">{ev.date} — {ev.type}</p>
              </div>
            ))}
          </div>
        </Card>

      </div>

      {/* TIMELINE + UPCOMING */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* TIMELINE */}
        <Card>
          <h2 className="flex items-center gap-2"><Clock /> Timeline attività</h2>
          <div className="border-l border-gray-300 dark:border-gray-700 ml-3 mt-4 space-y-4">
            {timeline.map((ev, i) => (
              <div key={i} className="ml-4">
                <div className="w-3 h-3 bg-blue-600 rounded-full -ml-[22px] mb-1"></div>
                <p className="font-medium">{ev.title}</p>
                <p className="text-xs text-gray-500">{ev.date} — {ev.type}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* ATTIVITÀ IMMINENTI */}
        <Card>
          <h2>Attività imminenti (7 giorni)</h2>
          {upcoming.length === 0 && <p>Nessuna attività imminente</p>}
          <div className="space-y-3 mt-4">
            {upcoming.map((ev, i) => (
              <div key={i} className="p-3 rounded-lg bg-yellow-100 dark:bg-yellow-900/20">
                <p className="font-medium">{ev.title}</p>
                <p className="text-xs text-gray-600">{ev.date} — {ev.type}</p>
              </div>
            ))}
          </div>
        </Card>

      </div>
    </div>
  )
}
