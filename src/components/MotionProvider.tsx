"use client"

import React, { useEffect, useState } from 'react'
import { MotionConfig } from 'framer-motion'

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    if (mq.addEventListener) mq.addEventListener('change', handler)
    else mq.addListener(handler)
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', handler)
      else mq.removeListener(handler)
    }
  }, [])

  const transition = reduced
    ? { duration: 0 }
    : { duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }

  return <MotionConfig transition={transition}>{children}</MotionConfig>
}

export default MotionProvider
