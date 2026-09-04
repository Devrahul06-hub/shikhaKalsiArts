'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import { ArrowDown } from 'lucide-react'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'
import { useMotionEnv } from '@/components/MotionProvider'
import { whatsappUrl } from '@/lib/contact'


const credentials = [
  { label: 'Studio based in Mumbai', tone: 'bg-gold' },
  { label: 'Large-scale commissions', tone: 'bg-bronze' },
  { label: 'Public art & installations', tone: 'bg-stone' },
]

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const { reduced, compact } = useMotionEnv()

  // Cursor parallax is decorative: skipped on touch/small screens and for
  // anyone who has asked for reduced motion.
  const parallaxEnabled = !reduced && !compact

  // Motion values instead of state: the parallax tilt no longer re-renders
  // React on every single mousemove event.
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const rotateY = useSpring(useTransform(pointerX, [-1, 1], [8, -8]), {
    stiffness: 150,
    damping: 20,
  })
  const rotateX = useSpring(useTransform(pointerY, [-1, 1], [-8, 8]), {
    stiffness: 150,
    damping: 20,
  })

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (!parallaxEnabled) return
    const rect = heroRef.current?.getBoundingClientRect()
    if (!rect) return
    pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2)
    pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2)
  }

  const resetPointer = () => {
    pointerX.set(0)
    pointerY.set(0)
  }

  return (
    <section
      ref={heroRef}
      id="home"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-20 lg:pt-32 lg:pb-24"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-obsidian to-obsidian" />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              'radial-gradient(circle at 25% 25%, rgba(201,162,75,0.10) 0%, transparent 45%)',
          }}
        />
      </div>

      <div className="relative z-10 section-container w-full">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-20 items-center">
          {/* Staggered entrance: each line arrives just after the one above it,
              so the eye is led down to the CTA rather than hit all at once.
              Driven by CSS (`.hero-enter` + --enter-delay) rather than Framer
              Motion so the LCP headline paints without waiting on hydration. */}
          <div className="text-center lg:text-left">
            <div
              className="hero-enter inline-flex items-center gap-3 mb-8"
              style={{ '--enter-delay': '60ms', '--enter-from': '16px' } as React.CSSProperties}
            >
              <span className="h-px w-10 bg-gold/60" aria-hidden="true" />
              <span className="text-[0.65rem] uppercase tracking-[0.35em] text-gold">
                Sculpture &amp; Architectural Studio
              </span>
            </div>

            <h1
              id="hero-heading"
              className="hero-enter font-display text-5xl sm:text-6xl lg:text-7xl font-medium leading-[1.05] text-ivory tracking-tight text-balance"
              style={{ '--enter-delay': '120ms', '--enter-from': '28px' } as React.CSSProperties}
            >
              Form given to <em className="text-gold">energy</em>,
              <br />
              built to last generations.
            </h1>

            <p
              className="hero-enter mt-8 text-lg text-ivory/65 leading-relaxed max-w-xl mx-auto lg:mx-0 text-balance"
              style={{ '--enter-delay': '180ms' } as React.CSSProperties}
            >
              Studio producing large-scale fiber composite sculptures and
              architectural installations for commissions, public spaces, and brand
              collaborations.
            </p>

            <div
              className="hero-enter mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-4"
              style={{ '--enter-delay': '240ms', '--enter-from': '20px' } as React.CSSProperties}
            >
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center gap-2.5"
              >
                <WhatsAppIcon className="w-5 h-5" />
                Start a Commission
              </a>
              <a href="#gallery" className="btn-secondary text-center">
                View Work
              </a>
            </div>

            <ul
              className="hero-enter mt-14 flex flex-col sm:flex-row sm:flex-wrap items-center justify-center lg:justify-start gap-x-7 gap-y-2.5 text-sm text-ivory/55"
              style={{ '--enter-delay': '300ms', '--enter-from': '16px' } as React.CSSProperties}
              role="list"
            >
              {credentials.map((item) => (
                <li key={item.label} className="flex items-center gap-2.5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${item.tone}`}
                    aria-hidden="true"
                  />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Also CSS-driven: this image is above the fold and marked priority,
              so it should not wait on hydration to become visible either. */}
          <div
            className="hero-enter relative mx-auto w-full max-w-md lg:max-w-none"
            style={
              {
                perspective: 1000,
                '--enter-delay': '150ms',
                '--enter-from': '32px',
              } as React.CSSProperties
            }
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              // will-change is justified here: this element tracks the cursor
              // continuously while the pointer is over the hero.
              className={`relative ${parallaxEnabled ? 'will-animate' : ''}`}
            >
              <div
                className="absolute -inset-6 bg-gradient-radial from-gold/15 via-transparent to-transparent blur-3xl"
                aria-hidden="true"
              />

              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-line/50 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
                <Image
                  src="/assets/WhatsApp Image 2026-08-14 at 20.54.52.jpeg"
                  alt="Seated Buddha sculpture hand-finished in the Shikha Kalsi Arts studio"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 92vw, 45vw"
                  quality={90}
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-obsidian/90 via-obsidian/40 to-transparent"
                  aria-hidden="true"
                />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-3">
                    <p className="text-[0.6rem] uppercase tracking-[0.3em] text-gold">
                      Featured work
                    </p>
                    <span className="h-px flex-1 bg-gold/25" aria-hidden="true" />
                  </div>
                  <p className="mt-3 font-display text-xl text-ivory leading-snug">
                    Seated Buddha
                  </p>
                  <p className="mt-1.5 text-sm text-ivory/65">
                    Hand-finished ivory stone effect
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.a
          href="#gallery"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="hidden lg:flex mt-16 items-center gap-3 text-[0.65rem] uppercase tracking-[0.3em] text-ivory/60 transition-colors hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm w-fit"
        >
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex"
            aria-hidden="true"
          >
            <ArrowDown className="w-4 h-4" />
          </motion.span>
          Scroll to explore
        </motion.a>
      </div>
    </section>
  )
}
