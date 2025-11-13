'use client'

import dynamic from 'next/dynamic'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Calendar as RBCalendar, Views } from 'react-big-calendar'
import { dateFnsLocalizer } from 'react-big-calendar'
import { differenceInMinutes, format, getDay, isSameDay, parse, startOfWeek } from 'date-fns'
import { ko } from 'date-fns/locale'

type EventItem = {
  id: string
  title: string
  start: Date
  end: Date
}

const locales = { ko }
const localizer = dateFnsLocalizer({
  format: (date: Date, f: string) => format(date, f as any, { locale: ko }),
  parse: (value: string, f: string) => parse(value, f as any, new Date(), { locale: ko }),
  startOfWeek: () => startOfWeek(new Date(), { locale: ko }),
  getDay: (date: Date) => getDay(date),
  locales: locales as any,
})

const EventModal = dynamic(() => import('@/components/calendar/EventModal'), { ssr: false })

export default function CalendarPage() {
  const [events, setEvents] = useState<EventItem[]>([])
  const [selected, setSelected] = useState<EventItem | null>(null)

  useEffect(() => {
    const raw = typeof window !== 'undefined' ? window.localStorage.getItem('sc.events') : null
    if (!raw) return
    try {
      const parsed = JSON.parse(raw) as (Omit<EventItem, 'start' | 'end'> & { start: string; end: string })[]
      const restored: EventItem[] = parsed.map((event): EventItem => ({
        id: event.id,
        title: event.title,
        start: new Date(event.start),
        end: new Date(event.end),
      }))
      setEvents(restored)
    } catch {
      // ignore corrupted data
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const serializable = events.map((event) => ({
      ...event,
      start: event.start.toISOString(),
      end: event.end.toISOString(),
    }))
    window.localStorage.setItem('sc.events', JSON.stringify(serializable))
  }, [events])

  const defaultDate = useMemo(() => new Date(), [])

  const handleCreateQuickEvent = () => {
    const now = new Date()
    const inHour = new Date(now.getTime() + 60 * 60 * 1000)
    setSelected({ id: '', title: '', start: now, end: inHour })
  }

  const eventStyleGetter = useCallback(() => {
    return {
      style: {
        borderRadius: '1rem',
        border: 'none',
        padding: '0.25rem 0.65rem',
        background: 'linear-gradient(135deg, rgba(124,58,237,0.92), rgba(244,63,94,0.92))',
        color: '#fff',
        boxShadow: '0 10px 25px -15px rgba(124,58,237,0.8)',
      },
    }
  }, [])

  const upcomingEvents = useMemo(() => {
    const sorted = [...events].sort(
      (a, b) => a.start.getTime() - b.start.getTime()
    )
    return sorted
  }, [events])

  const nextEvent = useMemo(() => {
    const now = new Date().getTime()
    return upcomingEvents.find((event) => event.start.getTime() >= now) ?? null
  }, [upcomingEvents])

  const todayEventsCount = useMemo(() => {
    const today = new Date()
    return events.filter((event) => isSameDay(event.start, today)).length
  }, [events])

  const totalFocusMinutes = useMemo(
    () =>
      events.reduce(
        (acc, event) => acc + Math.max(0, differenceInMinutes(event.end, event.start)),
        0
      ),
    [events]
  )

  const focusHours = Math.round((totalFocusMinutes / 60) * 10) / 10
  const upcomingPreview = upcomingEvents.slice(0, 4)

  const formatRange = (event: EventItem) => {
    const dateLabel = format(event.start, 'M월 d일 (EEE)', { locale: ko })
    const timeLabel = `${format(event.start, 'a h:mm', { locale: ko })} - ${format(event.end, 'a h:mm', {
      locale: ko,
    })}`
    return { dateLabel, timeLabel }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50 px-6 py-12 text-gray-800">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="glass-panel flex flex-col gap-4 bg-white/90 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-purple-400">Study Connect</p>
            <h1 className="text-3xl font-bold text-purple-700 md:text-4xl">나의 학습 캘린더</h1>
            <p className="text-sm text-gray-500">
              스터디 일정과 개인 약속을 한눈에 확인하고 손쉽게 관리해 보세요.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleCreateQuickEvent}
              className="gradient-button flex items-center gap-2"
              type="button"
            >
              <span className="text-lg">＋</span>
              일정 추가
            </button>
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.localStorage.removeItem('sc.events')
                }
                setEvents([])
              }}
              className="rounded-2xl border border-purple-200 bg-white/80 px-6 py-3 text-sm font-semibold text-purple-600 shadow-sm transition hover:-translate-y-0.5 hover:bg-purple-50"
              type="button"
            >
              일정 초기화
            </button>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="flex flex-col gap-6">
            <div className="glass-panel flex flex-col gap-5 overflow-hidden bg-gradient-to-br from-purple-600 via-violet-600 to-fuchsia-500 text-white">
              <div className="flex items-center justify-between text-xs uppercase tracking-widest text-purple-100">
                <span>Upcoming focus</span>
                <span className="rounded-full bg-white/20 px-3 py-1">
                  {todayEventsCount > 0 ? `오늘 ${todayEventsCount}개 진행` : '오늘은 여유롭네요'}
                </span>
              </div>
              {nextEvent ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-purple-100/80">다음 일정</p>
                    <h2 className="text-2xl font-semibold">{nextEvent.title || '제목 없는 일정'}</h2>
                  </div>
                  <div className="space-y-1 text-sm text-purple-50">
                    <p>{format(nextEvent.start, 'M월 d일 (EEE)', { locale: ko })}</p>
                    <p>
                      {format(nextEvent.start, 'a h:mm', { locale: ko })} -{' '}
                      {format(nextEvent.end, 'a h:mm', { locale: ko })}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCreateQuickEvent}
                    className="rounded-2xl border border-white/40 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/20"
                  >
                    새 일정 빠르게 추가
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">다가오는 일정이 없어요</h2>
                  <p className="text-sm text-purple-100">
                    우측 상단의 버튼으로 오늘의 집중 시간을 계획해 보세요. 팀원과 공유하면 더 좋아요!
                  </p>
                  <button
                    type="button"
                    onClick={handleCreateQuickEvent}
                    className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-purple-600 shadow-lg transition hover:-translate-y-0.5 hover:bg-purple-50"
                  >
                    첫 일정 추가하기
                  </button>
                </div>
              )}
            </div>

            <div className="glass-panel bg-white/95">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-purple-500">
                학습 포커스 지표
              </h3>
              <div className="mt-5 grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
                {[
                  {
                    label: '전체 일정',
                    value: events.length,
                    detail: '등록된 스터디 & 약속',
                    accent: 'from-purple-500/15 to-purple-500/0',
                  },
                  {
                    label: '오늘',
                    value: todayEventsCount,
                    detail: '오늘 진행 예정 일정',
                    accent: 'from-fuchsia-500/15 to-fuchsia-500/0',
                  },
                  {
                    label: '집중 시간',
                    value: `${focusHours}h`,
                    detail: '예상 누적 학습 시간',
                    accent: 'from-indigo-500/15 to-indigo-500/0',
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`group relative overflow-hidden rounded-2xl border border-purple-100 bg-white/90 px-5 py-4 text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg`}
                  >
                    <div
                      className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 transition group-hover:opacity-100`}
                    />
                    <div className="relative z-10 space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-wide text-purple-500">
                        {item.label}
                      </p>
                      <p className="text-2xl font-bold text-purple-700">{item.value}</p>
                      <p className="text-xs text-gray-500">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel bg-white/95">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-purple-700">다가오는 일정</h3>
                <span className="text-xs font-semibold uppercase tracking-wide text-purple-400">
                  Next {Math.min(upcomingPreview.length, 4)}
                </span>
              </div>
              <div className="mt-6 space-y-4">
                {upcomingPreview.length > 0 ? (
                  upcomingPreview.map((event, index) => {
                    const { dateLabel, timeLabel } = formatRange(event)
                    return (
                      <div
                        key={`${event.id}-${event.start.toISOString()}`}
                        className="group relative flex gap-3 rounded-3xl border border-purple-100 bg-white/90 px-4 py-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                      >
                        <div className="relative flex flex-col items-center">
                          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 text-sm font-semibold text-white shadow-lg">
                            {index + 1}
                          </span>
                          {index < upcomingPreview.length - 1 && (
                            <span className="mt-1 h-full w-px bg-gradient-to-b from-purple-200 to-transparent" />
                          )}
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <p className="text-sm font-semibold text-purple-700">
                              {event.title || '제목 없는 일정'}
                            </p>
                            <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-600">
                              {dateLabel}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">{timeLabel}</p>
                        </div>
                        <div className="absolute inset-y-0 left-[42px] hidden w-px bg-purple-100 group-last-of-type:hidden md:block" />
                      </div>
                    )
                  })
                ) : (
                  <div className="rounded-2xl border border-dashed border-purple-200 bg-white/60 px-4 py-8 text-center text-sm text-gray-500">
                    저장된 일정이 없습니다. 첫 일정을 추가해 학습 계획을 채워보세요.
                  </div>
                )}
              </div>
            </div>
          </aside>

          <div className="glass-panel relative overflow-hidden bg-white/95">
            <div className="pointer-events-none absolute -right-6 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-purple-200/60 via-fuchsia-200/40 to-transparent blur-3xl" />
            <div className="pointer-events-none absolute -left-10 bottom-0 h-72 w-72 rounded-full bg-gradient-to-br from-fuchsia-100/50 via-purple-100/40 to-transparent blur-3xl" />
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-purple-700">주간 캘린더</h2>
                <p className="text-sm text-gray-500">
                  원하는 시간대를 드래그해 새 일정을 추가할 수 있어요.
                </p>
              </div>
              <button
                type="button"
                onClick={handleCreateQuickEvent}
                className="rounded-2xl border border-purple-200 bg-white/80 px-4 py-2 text-xs font-semibold text-purple-600 shadow-sm transition hover:-translate-y-0.5 hover:bg-purple-50"
              >
                오늘 중 한 시간 확보
              </button>
            </div>
            <div className="relative z-10 mt-6 h-[72vh]">
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
                className="calendar-theme"
                messages={{
                  next: '다음',
                  previous: '이전',
                  today: '오늘',
                  month: '월',
                  week: '주',
                  day: '일',
                  agenda: '의제',
                  showMore: (total) => `+${total} 더보기`,
                }}
                onSelectEvent={(event) => setSelected(event as EventItem)}
                onSelectSlot={(slot) => {
                  const start = slot.start as Date
                  const end = slot.end as Date
                  setSelected({ id: '', title: '', start, end })
                }}
                eventPropGetter={eventStyleGetter}
              />
            </div>
          </div>
        </section>
      </div>

      {selected && (
        <EventModal
          initial={selected}
          onClose={() => setSelected(null)}
          onDelete={(id) => setEvents((prev) => prev.filter((event) => event.id !== id))}
          onSave={(item) => {
            setEvents((prev) => {
              const exists = prev.some((event) => event.id === item.id)
              if (exists) {
                return prev.map((event) => (event.id === item.id ? item : event))
              }
              return [...prev, { ...item, id: crypto.randomUUID() }]
            })
            setSelected(null)
          }}
        />
      )}
    </main>
  )
}

