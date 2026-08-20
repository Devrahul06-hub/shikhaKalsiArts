"use client"

import React, { useEffect, useRef, useState } from 'react'

export default function AnimationProfiler() {
  const rafRef = useRef<number | null>(null)
  const lastRef = useRef<number>(performance.now())
  const framesRef = useRef(0)
  const [fps, setFps] = useState(60)
  const [drops, setDrops] = useState(0)

  useEffect(() => {
    const loop = (t: number) => {
      framesRef.current++
      const delta = t - lastRef.current
      if (delta >= 1000) {
        const f = Math.round((framesRef.current / delta) * 1000)
        setFps(f)
        framesRef.current = 0
        lastRef.current = t
      }
      if (t - (lastRef.current || t) > 50) {
        setDrops((d) => d + 1)
      }
      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div className="fixed right-4 top-4 z-50 text-xs bg-black/60 text-white px-3 py-2 rounded-lg pointer-events-none">
      <div className="font-medium">Animation Profiler</div>
      <div className="flex gap-3 mt-1">
        <div>FPS: <span className="font-semibold">{fps}</span></div>
        <div>Drops: <span className="font-semibold">{drops}</span></div>
      </div>
    </div>
  )
}
