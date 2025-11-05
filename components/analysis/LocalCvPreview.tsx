'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

declare global {
  interface Window { cv?: any }
}

export default function LocalCvPreview() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const rafRef = useRef<number | null>(null)
  const [ready, setReady] = useState(false)
  const [running, setRunning] = useState(false)

  const loadOpenCv = useCallback(async () => {
    if (window.cv) return
    await new Promise<void>((resolve, reject) => {
      const s = document.createElement('script')
      s.src = 'https://docs.opencv.org/4.x/opencv.js'
      s.async = true
      s.onload = () => {
        // wait for cv.onRuntimeInitialized
        const check = () => {
          if (window.cv && window.cv.Mat) resolve()
          else setTimeout(check, 50)
        }
        check()
      }
      s.onerror = () => reject(new Error('Failed to load opencv.js'))
      document.body.appendChild(s)
    })
  }, [])

  const stop = useCallback(() => {
    setRunning(false)
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = null
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop())
      streamRef.current = null
    }
  }, [])

  const start = useCallback(async () => {
    try {
      await loadOpenCv()
      setReady(true)
      const media = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 }, audio: false })
      streamRef.current = media
      if (!videoRef.current) return
      videoRef.current.srcObject = media
      await videoRef.current.play()
      setRunning(true)

      const cv = window.cv!
      const video = videoRef.current
      const canvas = canvasRef.current!
      const ctx = canvas.getContext('2d')!
      canvas.width = 640
      canvas.height = 480

      const src = new cv.Mat(480, 640, cv.CV_8UC4)
      const gray = new cv.Mat()
      const edges = new cv.Mat()

      const loop = () => {
        if (!running) {
          src.delete(); gray.delete(); edges.delete()
          return
        }
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        src.data.set(imageData.data)
        cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY)
        cv.Canny(gray, edges, 80, 160)
        cv.cvtColor(edges, src, cv.COLOR_GRAY2RGBA)
        const out = new ImageData(new Uint8ClampedArray(src.data), canvas.width, canvas.height)
        ctx.putImageData(out, 0, 0)
        rafRef.current = requestAnimationFrame(loop)
      }
      loop()
    } catch (e) {
      console.error(e)
      stop()
    }
  }, [loadOpenCv, stop, running])

  useEffect(() => {
    return () => stop()
  }, [stop])

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <button className="px-3 py-2 rounded-md bg-blue-600 text-white disabled:opacity-50" onClick={start} disabled={running}>분석 시작</button>
        <button className="px-3 py-2 rounded-md border disabled:opacity-50" onClick={stop} disabled={!running}>중지</button>
        <span className="text-sm text-gray-600">{ready ? 'OpenCV 로드됨' : 'OpenCV 로딩 대기'}</span>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <div className="text-sm mb-1">원본(로컬 카메라)</div>
          <video ref={videoRef} className="w-full border rounded-md" muted playsInline />
        </div>
        <div>
          <div className="text-sm mb-1">분석(엣지 검출)</div>
          <canvas ref={canvasRef} className="w-full border rounded-md" />
        </div>
      </div>
    </div>
  )
}


