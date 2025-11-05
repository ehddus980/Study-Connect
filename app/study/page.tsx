'use client'

import { useState } from 'react'
import JitsiCall from '@/components/jitsi/JitsiCall'
import DailyCall from '@/components/daily/DailyCall'
import LocalCvPreview from '@/components/analysis/LocalCvPreview'

type Provider = 'jitsi' | 'daily'

export default function StudyRoomPage() {
  const [provider, setProvider] = useState<Provider>('jitsi')
  const [roomName, setRoomName] = useState('study-connect-demo')
  const [roomUrl, setRoomUrl] = useState('')

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">스터디룸</h1>

      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="radio"
            name="provider"
            checked={provider === 'jitsi'}
            onChange={() => setProvider('jitsi')}
          />
          Jitsi
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="radio"
            name="provider"
            checked={provider === 'daily'}
            onChange={() => setProvider('daily')}
          />
          Daily
        </label>
      </div>

      {provider === 'jitsi' ? (
        <>
          <p className="text-sm text-gray-600">Jitsi 방 이름을 입력하고 시작하세요. 예: <code>my-team-room</code></p>
          <div className="flex gap-2">
            <input
              value={roomName}
              onChange={e => setRoomName(e.target.value)}
              placeholder="Jitsi 방 이름"
              className="flex-1 border rounded-md px-3 py-2"
            />
          </div>
          <JitsiCall roomName={roomName} />
        </>
      ) : (
        <>
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
        </>
      )}

      <div className="mt-8 space-y-2">
        <h2 className="text-xl font-semibold">로컬 영상 분석(OpenCV.js)</h2>
        <p className="text-sm text-gray-600">브라우저에서 OpenCV.js로 별도 카메라 스트림을 받아 엣지 검출을 수행합니다.</p>
        <LocalCvPreview />
      </div>
    </div>
  )
}

