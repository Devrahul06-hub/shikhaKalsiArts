'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * Thin progress bar for this long single-page site.
 *
 * Uses scaleX rather than width so the browser composites the change instead
 * of laying out the page on every scroll frame.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[55] h-0.5 origin-left will-animate bg-gradient-to-r from-gold via-gold-soft to-bronze"
      aria-hidden="true"
    />
  )
}
