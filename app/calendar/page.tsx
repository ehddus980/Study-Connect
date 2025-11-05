'use client'

import { useEffect, useMemo, useState } from 'react'
import { Calendar as RBCalendar, Views } from 'react-big-calendar'
import { dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { ko } from 'date-fns/locale'
import dynamic from 'next/dynamic'

type EventItem = {
  id: string
  title: string
  start: Date
  end: Date
}

const locales = { ko }
const localizer = dateFnsLocalizer({
  format: (date, f) => format(date, f, { locale: ko }),
  parse: (value, f) => parse(value, f, new Date(), { locale: ko }),
  startOfWeek: () => startOfWeek(new Date(), { locale: ko }),
  getDay,
  locales: locales as any,
})

const EventModal = dynamic(() => import('@/components/calendar/EventModal'), { ssr: false })

export default function CalendarPage() {
  const [events, setEvents] = useState<EventItem[]>([])
  const [selected, setSelected] = useState<EventItem | null>(null)
  const [initialRange, setInitialRange] = useState<{ start: Date; end: Date } | null>(null)

  useEffect(() => {
    const raw = typeof window !== 'undefined' ? window.localStorage.getItem('sc.events') : null
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as Omit<EventItem, 'start' | 'end'> & { start: string; end: string }[]
        setEvents(parsed.map(e => ({ ...e, start: new Date(e.start), end: new Date(e.end) })))
      } catch {}
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const serializable = events.map(e => ({ ...e, start: e.start.toISOString(), end: e.end.toISOString() }))
    window.localStorage.setItem('sc.events', JSON.stringify(serializable))
  }, [events])

  const defaultDate = useMemo(() => new Date(), [])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">캘린더</h1>
        <button
          className="px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => {
            const now = new Date()
            const inHour = new Date(now.getTime() + 60 * 60 * 1000)
            setInitialRange({ start: now, end: inHour })
            setSelected({ id: '', title: '', start: now, end: inHour })
          }}
        >
          일정 추가
        </button>
      </div>

      <div className="h-[70vh] border rounded-md p-2">
        <RBCalendar
          localizer={localizer}
          events={events}
          defaultView={Views.WEEK}
          views={[Views.MONTH, Views.WEEK, Views.DAY]}
          step={30}
          timeslots={2}
          defaultDate={defaultDate}
          selectable
          popup
          messages={{
            next: '다음',
            previous: '이전',
            today: '오늘',
            month: '월',
            week: '주',
            day: '일',
            agenda: '의제',
            showMore: total => `+${total} 더보기`,
          }}
          onSelectEvent={(e) => setSelected(e as EventItem)}
          onSelectSlot={(slot) => {
            const start = slot.start as Date
            const end = slot.end as Date
            setInitialRange({ start, end })
            setSelected({ id: '', title: '', start, end })
          }}
        />
      </div>

      {selected && (
        <EventModal
          initial={selected}
          onClose={() => { setSelected(null); setInitialRange(null) }}
          onDelete={(id) => setEvents(prev => prev.filter(e => e.id !== id))}
          onSave={(item) => {
            setEvents(prev => {
              const exists = prev.some(e => e.id === item.id)
              return exists ? prev.map(e => e.id === item.id ? item : e) : [...prev, { ...item, id: crypto.randomUUID() }]
            })
            setSelected(null)
            setInitialRange(null)
          }}
        />
      )}
    </div>
  )
}

