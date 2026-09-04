'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { duration, expoOut } from '@/lib/motion'

type MotionEnv = {
  /** User has asked for reduced motion. */
  reduced: boolean
  /** Viewport is small — decorative motion (parallax) is skipped. */
  compact: boolean
}

const MotionEnvContext = createContext<MotionEnv>({
  reduced: false,
  compact: false,
})

/**
 * Read the current motion environment. Components use this to skip decorative
 * effects rather than re-querying matchMedia themselves.
 */
export function useMotionEnv() {
  return useContext(MotionEnvContext)
}

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [env, setEnv] = useState<MotionEnv>({ reduced: false, compact: false })

  useEffect(() => {
    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const compactQuery = window.matchMedia('(max-width: 768px)')

    const sync = () =>
      setEnv({ reduced: reducedQuery.matches, compact: compactQuery.matches })

    sync()
    reducedQuery.addEventListener('change', sync)
    compactQuery.addEventListener('change', sync)

    return () => {
      reducedQuery.removeEventListener('change', sync)
      compactQuery.removeEventListener('change', sync)
    }
  }, [])

  return (
    <MotionEnvContext.Provider value={env}>
      <MotionConfig
        reducedMotion={env.reduced ? 'always' : 'never'}
        transition={{
          // Mobile gets shorter durations: less time waiting on a device that
          // is usually being scrolled faster.
          duration: env.compact ? duration.reveal * 0.7 : duration.reveal,
          ease: expoOut,
        }}
      >
        {children}
      </MotionConfig>
    </MotionEnvContext.Provider>
  )
}

export default MotionProvider
