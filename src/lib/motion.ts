import type { Transition, Variants } from 'framer-motion'

/**
 * Single source of truth for motion. Every animation on the site pulls its
 * easing and duration from here so timing stays coherent across sections.
 *
 * Only `transform` and `opacity` are ever animated — no width/height/top/left,
 * which would force layout on every frame.
 */

/** Ease-out-expo. Fast departure, long settle. Default for reveals. */
export const expoOut = [0.16, 1, 0.3, 1] as const

/** Snappy ease-in-out. For hover/tap micro-interactions. */
export const snappy = [0.65, 0, 0.35, 1] as const

export const duration = {
  /** Hover, tap, colour change. */
  micro: 0.18,
  /** Small element entrances. */
  short: 0.4,
  /** Section reveals. */
  reveal: 0.6,
  /** Hero / headline entrances. */
  hero: 0.7,
} as const

/** Children offset for lists, grids, and hero content. */
export const stagger = {
  tight: 0.045,
  normal: 0.06,
  loose: 0.08,
} as const

export const transitions = {
  micro: { duration: duration.micro, ease: snappy },
  reveal: { duration: duration.reveal, ease: expoOut },
  hero: { duration: duration.hero, ease: expoOut },
} satisfies Record<string, Transition>

/**
 * Parent/child pair for staggered entrances. Apply `staggerParent` to the
 * container and `staggerChild` to each direct child.
 */
export const staggerParent = (
  childStagger: number = stagger.normal,
  delayChildren: number = 0
): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: childStagger, delayChildren },
  },
})

/**
 * Entrance offset defaults to a small upward slide. Pass `x` instead when an
 * element should enter from the side it visually belongs to.
 */
export const staggerChild = (distance = 24, axis: 'y' | 'x' = 'y'): Variants =>
  axis === 'x'
    ? {
        hidden: { opacity: 0, x: distance },
        visible: { opacity: 1, x: 0, transition: transitions.hero },
      }
    : {
        hidden: { opacity: 0, y: distance },
        visible: { opacity: 1, y: 0, transition: transitions.hero },
      }

/** Standard section reveal: fade plus a short lift. */
export const revealUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: transitions.reveal },
}

/** Shared `whileInView` config so every section triggers at the same point. */
export const inView = {
  once: true,
  margin: '-12% 0px -12% 0px',
} as const
