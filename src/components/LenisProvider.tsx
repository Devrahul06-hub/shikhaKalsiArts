'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'
import Lenis from '@studio-freight/lenis'

const LenisContext = createContext<Lenis | null>(null)

/** Lets components pause momentum scrolling (e.g. while a menu is open). */
export function useLenis() {
  return useContext(LenisContext)
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    // Users who ask for less motion get native scrolling, not eased momentum.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const instance = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    })

    lenisRef.current = instance
    setLenis(instance)

    let frame = requestAnimationFrame(function raf(time: number) {
      instance.raf(time)
      frame = requestAnimationFrame(raf)
    })

    // Lenis owns scrolling, so in-page anchors must be routed through it —
    // otherwise the browser jump and the momentum animation fight each other.
    const handleAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement)?.closest?.('a[href^="#"]')
      if (!anchor) return

      const hash = anchor.getAttribute('href')
      if (!hash || hash === '#') return

      const target = document.querySelector(hash)
      if (!target) return

      event.preventDefault()
      instance.scrollTo(target as HTMLElement, { offset: 0 })
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      document.removeEventListener('click', handleAnchorClick)
      cancelAnimationFrame(frame)
      instance.destroy()
      lenisRef.current = null
      setLenis(null)
    }
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
