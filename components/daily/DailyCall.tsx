'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import DailyIframe, { DailyCall as DailyCallType } from '@daily-co/daily-js'

type Props = { roomUrl: string }

export default function DailyCall({ roomUrl }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const dailyRef = useRef<DailyCallType | null>(null)
  const [joined, setJoined] = useState(false)
  const [sharing, setSharing] = useState(false)

  const join = useCallback(async () => {
    if (!roomUrl || !containerRef.current) return
    if (dailyRef.current) return
    const frame = DailyIframe.createFrame(containerRef.current, {
      showLeaveButton: true,
      iframeStyle: {
        width: '100%',
        height: '100%',
        border: '0',
        borderRadius: '8px',
      },
    })
    dailyRef.current = frame
    frame.on('joined-meeting', () => setJoined(true))
    frame.on('left-meeting', () => { setJoined(false); setSharing(false); frame.destroy(); dailyRef.current = null })
    await frame.join({ url: roomUrl })
  }, [roomUrl])

  const leave = useCallback(async () => {
    if (!dailyRef.current) return
    await dailyRef.current.leave()
  }, [])

  const toggleScreenShare = useCallback(async () => {
    if (!dailyRef.current) return
    const enabled = await dailyRef.current.startScreenShare()
    if (!enabled) {
      await dailyRef.current.stopScreenShare()
      setSharing(false)
    } else {
      setSharing(true)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (dailyRef.current) {
        dailyRef.current.destroy()
        dailyRef.current = null
      }
    }
  }, [])

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <button className="px-3 py-2 rounded-md bg-blue-600 text-white disabled:opacity-50" disabled={!roomUrl || joined} onClick={join}>참여</button>
        <button className="px-3 py-2 rounded-md border disabled:opacity-50" disabled={!joined} onClick={leave}>나가기</button>
        <button className="px-3 py-2 rounded-md border disabled:opacity-50" disabled={!joined} onClick={toggleScreenShare}>{sharing ? '공유 중지' : '화면공유'}</button>
      </div>
      <div className="h-[70vh] border rounded-md overflow-hidden" ref={containerRef} />
    </div>
  )
}

