'use client'

import DailyCall from '@/components/daily/DailyCall'
import { useState } from 'react'

export default function StudyRoomPage() {
  const [roomUrl, setRoomUrl] = useState('')

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">스터디룸</h1>
      <p className="text-sm text-gray-600">Daily 방 URL을 입력해 참여하세요. 예: https://your-domain.daily.co/test-room</p>
      <div className="flex gap-2">
        <input
          value={roomUrl}
          onChange={e => setRoomUrl(e.target.value)}
          placeholder="Daily 방 URL"
          className="flex-1 border rounded-md px-3 py-2"
        />
      </div>
      <DailyCall roomUrl={roomUrl} />
    </div>
  )
}

