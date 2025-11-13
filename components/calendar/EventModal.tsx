'use client'

import { useEffect, useState } from 'react'

type Props = {
  initial: { id: string; title: string; start: Date; end: Date }
  onClose: () => void
  onSave: (e: { id: string; title: string; start: Date; end: Date }) => void
  onDelete: (id: string) => void
}

export default function EventModal({ initial, onClose, onSave, onDelete }: Props) {
  const [title, setTitle] = useState(initial.title)
  const [start, setStart] = useState<string>('')
  const [end, setEnd] = useState<string>('')

  useEffect(() => {
    const toLocal = (d: Date) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0,16)
    setStart(toLocal(initial.start))
    setEnd(toLocal(initial.end))
  }, [initial])

  const isNew = !initial.id

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="glass-panel w-full max-w-lg space-y-5 bg-white/95 p-8">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-purple-400">
            {isNew ? 'New Schedule' : 'Edit Schedule'}
          </p>
          <h3 className="text-2xl font-bold text-purple-700">
            {isNew ? '일정을 추가해요' : '일정을 수정할까요?'}
          </h3>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-purple-500">제목</label>
            <input
              className="w-full rounded-2xl border border-purple-200 bg-white/90 px-4 py-3 text-sm text-gray-700 shadow-sm outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-200"
              placeholder="예: React 스터디 준비"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-purple-500">시작 시간</label>
              <input
                type="datetime-local"
                className="w-full rounded-2xl border border-purple-200 bg-white/90 px-4 py-3 text-sm text-gray-700 shadow-sm outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-200"
                value={start}
                onChange={e => setStart(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-purple-500">종료 시간</label>
              <input
                type="datetime-local"
                className="w-full rounded-2xl border border-purple-200 bg-white/90 px-4 py-3 text-sm text-gray-700 shadow-sm outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-200"
                value={end}
                onChange={e => setEnd(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-end gap-3">
          {!isNew && (
            <button
              className="rounded-2xl border border-red-200 bg-white/90 px-5 py-3 text-sm font-semibold text-red-500 shadow-sm transition hover:bg-red-50"
              onClick={() => { onDelete(initial.id); onClose() }}
              type="button"
            >
              삭제
            </button>
          )}
          <button
            className="rounded-2xl border border-purple-200 bg-white/90 px-5 py-3 text-sm font-semibold text-purple-500 shadow-sm transition hover:bg-purple-50"
            onClick={onClose}
            type="button"
          >
            취소
          </button>
          <button
            className="gradient-button"
            onClick={() => {
              if (!title.trim() || !start || !end) return
              const toDate = (s: string) => new Date(s)
              const item = { id: initial.id || '', title: title.trim(), start: toDate(start), end: toDate(end) }
              onSave(item)
            }}
            type="button"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  )
}

