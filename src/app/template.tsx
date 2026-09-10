'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { expoOut } from '@/lib/motion'

/**
 * Cross-fade between routes.
 *
 * Deliberately skipped on the very first load: starting the whole page at
 * opacity 0 would gate the first paint on hydration, which is what pushed LCP
 * to 2.7s before the hero entrance was moved to CSS. Client-side navigations
 * are already past hydration, so those animate freely.
 *
 * Module-scoped rather than state because this template remounts on every
 * navigation — the flag has to outlive the component.
 */
let hasNavigated = false

export default function Template({ children }: { children: React.ReactNode }) {
  const [shouldAnimate] = useState(hasNavigated)

  useEffect(() => {
    hasNavigated = true
  }, [])

  if (!shouldAnimate) return <>{children}</>

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: expoOut }}
    >
      {children}
    </motion.div>
  )
}
