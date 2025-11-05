'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

declare global {
  interface Window {
    JitsiMeetExternalAPI?: any
  }
}

type Props = {
  roomName: string
  domain?: string // default: meet.jit.si
}

export default function JitsiCall({ roomName, domain = 'meet.jit.si' }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const apiRef = useRef<any>(null)
  const [joined, setJoined] = useState(false)

  const loadScript = useCallback(async () => {
    if (window.JitsiMeetExternalAPI) return
    await new Promise<void>((resolve, reject) => {
      const s = document.createElement('script')
      s.src = 'https://meet.jit.si/external_api.js'
      s.async = true
      s.onload = () => resolve()
      s.onerror = () => reject(new Error('Failed to load Jitsi external_api.js'))
      document.body.appendChild(s)
    })
  }, [])

  const start = useCallback(async () => {
    if (!roomName || !containerRef.current) return
    await loadScript()
    if (!window.JitsiMeetExternalAPI) return
    const options = {
      roomName,
      parentNode: containerRef.current,
      width: '100%',
      height: '100%',
      interfaceConfigOverwrite: {},
      configOverwrite: {},
    }
    apiRef.current = new window.JitsiMeetExternalAPI!(domain, options)
    apiRef.current.addEventListener('videoConferenceJoined', () => setJoined(true))
    apiRef.current.addEventListener('readyToClose', () => { setJoined(false); stop() })
  }, [roomName, domain, loadScript])

  const stop = useCallback(() => {
    if (apiRef.current) {
      apiRef.current.dispose()
      apiRef.current = null
    }
  }, [])

  useEffect(() => {
    return () => {
      if (apiRef.current) {
        apiRef.current.dispose()
        apiRef.current = null
      }
    }
  }, [])

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <button className="px-3 py-2 rounded-md bg-blue-600 text-white disabled:opacity-50" disabled={!roomName || joined} onClick={start}>시작</button>
        <button className="px-3 py-2 rounded-md border disabled:opacity-50" disabled={!joined} onClick={stop}>종료</button>
      </div>
      <div className="h-[70vh] border rounded-md overflow-hidden" ref={containerRef} />
    </div>
  )
}

