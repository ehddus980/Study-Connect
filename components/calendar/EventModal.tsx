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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="w-full max-w-md rounded-lg bg-white p-5 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">{isNew ? '일정 추가' : '일정 수정'}</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm mb-1">제목</label>
            <input className="w-full border rounded-md px-3 py-2" value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm mb-1">시작</label>
              <input type="datetime-local" className="w-full border rounded-md px-3 py-2" value={start} onChange={e => setStart(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm mb-1">종료</label>
              <input type="datetime-local" className="w-full border rounded-md px-3 py-2" value={end} onChange={e => setEnd(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-5">
          {!isNew && (
            <button className="px-3 py-2 rounded-md border text-red-600" onClick={() => { onDelete(initial.id); onClose() }}>삭제</button>
          )}
          <button className="px-3 py-2 rounded-md border" onClick={onClose}>취소</button>
          <button
            className="px-3 py-2 rounded-md bg-blue-600 text-white"
            onClick={() => {
              if (!title.trim()) return
              const toDate = (s: string) => new Date(s)
              const item = { id: initial.id || '', title: title.trim(), start: toDate(start), end: toDate(end) }
              onSave(item)
            }}
          >저장</button>
        </div>
      </div>
    </div>
  )
}

