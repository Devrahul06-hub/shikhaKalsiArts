'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { inView, revealUp, staggerChild, staggerParent } from '@/lib/motion'

type RevealProps = {
  children: React.ReactNode
  /** Stagger direct children instead of revealing as one block. */
  stagger?: number
  /** Entrance distance in px. */
  distance?: number
  /** Which axis the element enters along. */
  axis?: 'y' | 'x'
  /** Delay before the group starts, in seconds. */
  delay?: number
} & Omit<HTMLMotionProps<'div'>, 'variants' | 'initial' | 'whileInView'>

/**
 * Section-level scroll reveal. Kept at section granularity on purpose —
 * revealing every individual element makes a page feel busy and costs frames.
 */
export function Reveal({
  children,
  stagger,
  distance = 24,
  axis = 'y',
  delay = 0,
  ...rest
}: RevealProps) {
  if (stagger !== undefined) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={inView}
        variants={staggerParent(stagger, delay)}
        {...rest}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={inView}
      variants={
        distance === 24 && axis === 'y' ? revealUp : staggerChild(distance, axis)
      }
      transition={{ delay }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/** A direct child of a staggered `Reveal`. */
export function RevealItem({
  children,
  distance = 24,
  axis = 'y',
  ...rest
}: {
  children: React.ReactNode
  distance?: number
  axis?: 'y' | 'x'
} & Omit<HTMLMotionProps<'div'>, 'variants'>) {
  return (
    <motion.div variants={staggerChild(distance, axis)} {...rest}>
      {children}
    </motion.div>
  )
}
