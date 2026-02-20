'use client'

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts'
import { useCRMStore } from '@/stores/crmStore'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { Users, TrendingUp, DollarSign, Target, Clock, CalendarDays } from 'lucide-react'
import { useState } from 'react'

type CalendarValue = Date | [Date, Date] | null

const neu = {
  outset:  `5px 5px 14px var(--neu-dark), -3px -3px 9px var(--neu-light)`,
  inset:   `inset 3px 3px 8px var(--neu-dark), inset -2px -2px 5px var(--neu-light)`,
  insetSm: `inset 2px 2px 5px var(--neu-dark), inset -1px -1px 3px var(--neu-light)`,
  panel:   `8px 8px 20px var(--neu-dark), -5px -5px 14px var(--neu-light), inset 0 1px 0 rgba(255,255,255,0.2)`,
}

const glass: React.CSSProperties = {
  background: 'var(--glass-bg)',
  border: '1px solid var(--glass-border)',
  backdropFilter: 'blur(24px) saturate(1.5)',
  WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
}

function NeuPanel({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ ...glass, borderRadius: 24, padding: '28px 26px', boxShadow: neu.panel, ...style }}>
      {children}
    </div>
  )
}

function PanelTitle({ icon: Icon, children }: { icon?: any; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 26 }}>
      {Icon && (
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--bg)', boxShadow: neu.outset, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', flexShrink: 0 }}>
          <Icon size={15} />
        </div>
      )}
      <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.18em', color: 'var(--text)' }}>
        {children}
      </span>
    </div>
  )
}

export function Dashboard() {
  const { clienti, opportunita, attivita, getTotalRevenue, getTotalPipeline, getClientiByStatus } = useCRMStore()

  const activeClients    = getClientiByStatus('Attivo').length
  const totalRevenue     = getTotalRevenue()
  const totalPipeline    = getTotalPipeline()
  const opportunitiesCount = opportunita.length

  const [date, setDate] = useState<CalendarValue>(new Date())

  const eventsByDate: Record<string, Array<{ type: string; title: string }>> = {}
  attivita.forEach(a => {
    if (!eventsByDate[a.date]) eventsByDate[a.date] = []
    eventsByDate[a.date].push({ type: a.type, title: a.title })
  })
  opportunita.forEach(o => {
    if (!eventsByDate[o.closeDate]) eventsByDate[o.closeDate] = []
    eventsByDate[o.closeDate].push({ type: 'opportunità', title: o.title })
  })

  const tileClassName = ({ date: d }: { date: Date }) => {
    const key = d.toISOString().split('T')[0]
    return eventsByDate[key] ? 'has-event' : ''
  }

  const selectedDateKey = date instanceof Date ? date.toISOString().split('T')[0] : null
  const eventsForSelectedDay = selectedDateKey && eventsByDate[selectedDateKey] ? eventsByDate[selectedDateKey] : []

  const getWeekEvents = () => {
    const today = new Date()
    const start = new Date(today)
    start.setDate(today.getDate() - today.getDay() + 1)
    const end = new Date(start); end.setDate(start.getDate() + 6)
    const weekEvents: Array<{ date: string; title: string; type: string }> = []
    Object.keys(eventsByDate).forEach(key => {
      const d = new Date(key)
      if (d >= start && d <= end)
        eventsByDate[key].forEach(ev => weekEvents.push({ date: key, title: ev.title, type: ev.type }))
    })
    return weekEvents.sort((a, b) => a.date.localeCompare(b.date))
  }

  const weeklyEvents = getWeekEvents()
  const timeline = attivita.map(a => ({ date: a.date, title: a.title, type: a.type })).sort((a, b) => a.date.localeCompare(b.date))
  const upcoming = attivita.filter(a => {
    const diff = (new Date(a.date).getTime() - Date.now()) / 86400000
    return diff >= 0 && diff <= 7
  })

  const chartData = [
    { month: 'Gen', value: 12000 }, { month: 'Feb', value: 18000 },
    { month: 'Mar', value: 15000 }, { month: 'Apr', value: 22000 },
    { month: 'Mag', value: 25000 }, { month: 'Giu', value: 28000 },
  ]

  const stageData = opportunita.reduce((acc, opp) => {
    const ex = acc.find(i => i.name === opp.stage)
    if (ex) ex.value += opp.value
    else acc.push({ name: opp.stage, value: opp.value })
    return acc
  }, [] as Array<{ name: string; value: number }>)

  const colors = ['#6366f1', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4']

  const kpis = [
    { icon: Users,       label: 'CLIENTI ATTIVI',  value: activeClients },
    { icon: Target,      label: 'OPPORTUNITÀ',     value: opportunitiesCount },
    { icon: DollarSign,  label: 'RICAVI TOTALI',   value: `€${totalRevenue.toLocaleString()}` },
    { icon: TrendingUp,  label: 'PIPELINE',        value: `€${totalPipeline.toLocaleString()}` },
  ]

  return (
    <div style={{ padding: '40px 36px', display: 'flex', flexDirection: 'column', gap: 32 }}>

      <style>{`
        .react-calendar { background: transparent !important; border: none !important; width: 100% !important; font-family: inherit !important; }
        .react-calendar__tile { background: var(--bg) !important; border-radius: 10px !important; color: var(--text) !important; box-shadow: ${neu.outset}; margin: 2px !important; font-size: 11px !important; font-weight: 600 !important; }
        .react-calendar__tile--active { box-shadow: ${neu.inset} !important; color: var(--accent) !important; }
        .react-calendar__tile.has-event::after { content: ''; display: block; width: 5px; height: 5px; background: var(--accent); border-radius: 50%; margin: 2px auto 0; }
        .react-calendar__navigation button { background: var(--bg) !important; border-radius: 10px !important; color: var(--text) !important; box-shadow: ${neu.outset}; font-weight: 700 !important; font-size: 12px !important; }
        .react-calendar__month-view__weekdays__weekday { color: var(--text-muted) !important; font-size: 10px !important; font-weight: 700 !important; letter-spacing: 0.1em !important; }
        .react-calendar__month-view__weekdays__weekday abbr { text-decoration: none !important; }
      `}</style>

      <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '0.18em', color: 'var(--text)', marginBottom: 8 }}>DASHBOARD</h1>

      {/* KPI */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
        {kpis.map(({ icon: Icon, label, value }) => (
          <div key={label} style={{ background: 'var(--bg)', borderRadius: 22, padding: '26px 22px', boxShadow: neu.outset, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--bg)', boxShadow: neu.inset, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
              <Icon size={17} />
            </div>
            <div>
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', color: 'var(--text-muted)', marginBottom: 4 }}>{label}</p>
              <p style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', letterSpacing: '0.04em' }}>{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Grafici */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <NeuPanel>
          <PanelTitle icon={TrendingUp}>TREND REVENUE</PanelTitle>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" />
              <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'var(--bg)', border: '1px solid var(--glass-border)', borderRadius: 12, color: 'var(--text)', fontSize: 12 }} />
              <Line type="monotone" dataKey="value" stroke="var(--accent)" strokeWidth={3} dot={{ fill: 'var(--accent)', r: 4, strokeWidth: 0 }} />
            </LineChart>
          </ResponsiveContainer>
        </NeuPanel>

        <NeuPanel>
          <PanelTitle icon={Target}>PIPELINE OPPORTUNITÀ</PanelTitle>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={stageData} dataKey="value" nameKey="name" outerRadius={90} innerRadius={40}>
                {stageData.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: 'var(--bg)', border: '1px solid var(--glass-border)', borderRadius: 12, color: 'var(--text)', fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </NeuPanel>
      </div>

      {/* Calendario + Agenda */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <NeuPanel>
          <PanelTitle icon={CalendarDays}>CALENDARIO</PanelTitle>
          <Calendar onChange={v => setDate(v as CalendarValue)} value={date} tileClassName={tileClassName} />
          {eventsForSelectedDay.length > 0 && (
            <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', color: 'var(--text-muted)', marginBottom: 4 }}>EVENTI DEL GIORNO</p>
              {eventsForSelectedDay.map((ev, i) => (
                <div key={i} style={{ background: 'var(--bg)', borderRadius: 12, padding: '14px 18px', boxShadow: neu.insetSm }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{ev.title}</p>
                  <p style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.1em', marginTop: 2 }}>{ev.type.toUpperCase()}</p>
                </div>
              ))}
            </div>
          )}
        </NeuPanel>

        <NeuPanel>
          <PanelTitle icon={CalendarDays}>AGENDA SETTIMANALE</PanelTitle>
          {weeklyEvents.length === 0
            ? <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Nessun evento questa settimana</p>
            : <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {weeklyEvents.map((ev, i) => (
                  <div key={i} style={{ background: 'var(--bg)', borderRadius: 12, padding: '14px 18px', boxShadow: neu.insetSm }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{ev.title}</p>
                    <p style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 7 }}>{ev.date} · {ev.type}</p>
                  </div>
                ))}
              </div>
          }
        </NeuPanel>
      </div>

      {/* Timeline + Imminenti */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <NeuPanel>
          <PanelTitle icon={Clock}>TIMELINE ATTIVITÀ</PanelTitle>
          <div style={{ borderLeft: '2px solid var(--glass-border)', marginLeft: 10, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 22 }}>
            {timeline.map((ev, i) => (
              <div key={i} style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: -25, top: 4, width: 12, height: 12, borderRadius: '50%', background: 'var(--bg)', boxShadow: neu.outset, border: '2px solid var(--accent)' }} />
                <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{ev.title}</p>
                <p style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 7 }}>{ev.date} · {ev.type}</p>
              </div>
            ))}
          </div>
        </NeuPanel>

        <NeuPanel>
          <PanelTitle>ATTIVITÀ IMMINENTI (7 GIORNI)</PanelTitle>
          {upcoming.length === 0
            ? <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Nessuna attività imminente</p>
            : <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {upcoming.map((ev, i) => (
                  <div key={i} style={{ background: 'var(--bg)', borderRadius: 12, padding: '14px 18px', boxShadow: neu.insetSm, borderLeft: '3px solid var(--accent)' }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{ev.title}</p>
                    <p style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 7 }}>{ev.date} · {ev.type}</p>
                  </div>
                ))}
              </div>
          }
        </NeuPanel>
      </div>
    </div>
  )
}