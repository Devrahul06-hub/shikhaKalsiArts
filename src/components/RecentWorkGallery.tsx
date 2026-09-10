'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { Reveal, RevealItem } from '@/components/motion/Reveal'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'
import { whatsappUrl } from '@/lib/contact'
import { stagger, transitions } from '@/lib/motion'
import { recentImages, recentProjects } from '@/data/recentWork'

const stageTone: Record<string, string> = {
  'In progress': 'bg-bronze/15 text-bronze border-bronze/30',
  Finishing: 'bg-stone/15 text-stone border-stone/30',
  Installed: 'bg-gold/15 text-gold border-gold/30',
}

export function RecentWorkGallery() {
  // Index into the flat `recentImages` list so arrow keys walk the whole page.
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const lastFocused = useRef<HTMLElement | null>(null)

  const active = openIndex !== null ? recentImages[openIndex] : null

  const close = useCallback(() => setOpenIndex(null), [])

  const step = useCallback((direction: number) => {
    setOpenIndex((current) => {
      if (current === null) return current
      const next = current + direction
      if (next < 0 || next >= recentImages.length) return current
      return next
    })
  }, [])

  useEffect(() => {
    if (openIndex === null) return

    lastFocused.current = document.activeElement as HTMLElement
    closeButtonRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowLeft') step(-1)
      if (event.key === 'ArrowRight') step(1)
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      lastFocused.current?.focus()
    }
  }, [openIndex, close, step])

  // Running offset so each thumbnail knows its position in the flat list.
  let flatIndex = -1

  return (
    <>
      <div className="space-y-20 lg:space-y-28">
        {recentProjects.map((project) => (
          <section key={project.id} aria-labelledby={`${project.id}-heading`}>
            <Reveal className="max-w-2xl">
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-gold mb-4">
                {project.kind}
              </p>
              <h2
                id={`${project.id}-heading`}
                className="font-display text-3xl lg:text-4xl font-medium text-ivory text-balance"
              >
                {project.title}
              </h2>
              <p className="mt-4 text-ivory/65 leading-relaxed">{project.summary}</p>
            </Reveal>

            {/* Column count follows the image count so a project never ends on
                a half-empty row: 3 images sit in a row of three, 4 in two pairs. */}
            <Reveal
              stagger={stagger.tight}
              delay={0.05}
              className={`mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5 ${
                project.images.length % 3 === 0 ? 'lg:grid-cols-3' : ''
              }`}
            >
              {project.images.map((image) => {
                flatIndex += 1
                const index = flatIndex
                return (
                  <RevealItem key={image.src} className="group">
                    <button
                      onClick={() => setOpenIndex(index)}
                      className="w-full text-left rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-obsidian"
                      aria-label={`View larger: ${image.caption}`}
                    >
                      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line/40 bg-charcoal">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover transition-transform duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                          // Covers both grid layouts: ~45vw for the 2-column
                          // projects, which over-serves the 3-column ones slightly.
                          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 45vw"
                        />
                        <div
                          className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-obsidian via-obsidian/70 to-transparent"
                          aria-hidden="true"
                        />

                        <span
                          className="absolute top-4 right-4 inline-flex items-center justify-center w-9 h-9 rounded-full bg-obsidian/70 border border-line text-ivory opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                          aria-hidden="true"
                        >
                          <Plus className="w-4 h-4" />
                        </span>

                        <div className="absolute inset-x-0 bottom-0 p-5">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-full border text-[0.6rem] uppercase tracking-[0.18em] ${
                              stageTone[image.stage] ?? stageTone.Installed
                            }`}
                          >
                            {image.stage}
                          </span>
                          <p className="mt-2.5 text-sm text-ivory/85 leading-snug">
                            {image.caption}
                          </p>
                        </div>
                      </div>
                    </button>
                  </RevealItem>
                )
              })}
            </Reveal>
          </section>
        ))}
      </div>

      <Reveal className="mt-20 flex flex-col sm:flex-row items-center gap-5 rounded-2xl border border-line/50 bg-charcoal/40 px-7 py-6">
        <p className="flex-1 text-ivory/70 text-center sm:text-left">
          Working on something at this scale — an entrance, a facade, a piece for a
          courtyard? Send the space and the idea across.
        </p>
        <a
          href={whatsappUrl(
            "Hello Shikha Kalsi Arts, I saw your recent work and I'd like to discuss a large-scale commission."
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex shrink-0 items-center justify-center gap-2.5"
        >
          <WhatsAppIcon className="w-5 h-5" />
          Discuss a commission
        </a>
      </Reveal>

      <AnimatePresence>
        {active && openIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transitions.micro}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={active.caption}
          >
            <div
              className="absolute inset-0 bg-obsidian/92 backdrop-blur-sm"
              onClick={close}
              aria-hidden="true"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ type: 'spring', damping: 26, stiffness: 300 }}
              className="relative w-full max-w-5xl"
            >
              <button
                ref={closeButtonRef}
                onClick={close}
                aria-label="Close"
                className="absolute -top-2 right-0 sm:-top-4 sm:-right-2 z-10 inline-flex items-center justify-center w-11 h-11 rounded-full bg-charcoal border border-line text-ivory transition-colors hover:text-gold hover:border-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>

              {/* Height-driven rather than a fixed aspect ratio: these photos
                  are a mix of portrait and landscape, and object-contain inside
                  a 4:3 box letterboxed most of them. */}
              <div className="relative w-full h-[58vh] sm:h-[66vh] rounded-2xl overflow-hidden border border-line bg-charcoal">
                <Image
                  src={active.src}
                  alt={active.alt}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              </div>

              <div className="mt-4 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <span
                    className={`inline-block px-2.5 py-1 rounded-full border text-[0.6rem] uppercase tracking-[0.18em] ${
                      stageTone[active.stage] ?? stageTone.Installed
                    }`}
                  >
                    {active.stage}
                  </span>
                  <p className="mt-2 text-sm text-ivory/80">{active.caption}</p>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <button
                    onClick={() => step(-1)}
                    disabled={openIndex === 0}
                    className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-line text-ivory/70 transition-colors hover:text-gold hover:border-gold disabled:opacity-30 disabled:hover:text-ivory/70 disabled:hover:border-line focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                  </button>
                  <span className="text-xs tracking-[0.2em] text-ivory/60 tabular-nums">
                    {openIndex + 1} / {recentImages.length}
                  </span>
                  <button
                    onClick={() => step(1)}
                    disabled={openIndex === recentImages.length - 1}
                    className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-line text-ivory/70 transition-colors hover:text-gold hover:border-gold disabled:opacity-30 disabled:hover:text-ivory/70 disabled:hover:border-line focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
