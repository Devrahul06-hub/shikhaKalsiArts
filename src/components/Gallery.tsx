'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { X, ChevronLeft, ChevronRight, Plus, ArrowRight } from 'lucide-react'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'
import { Reveal } from '@/components/motion/Reveal'
import { whatsappUrl } from '@/lib/contact'
import { inView, stagger, transitions } from '@/lib/motion'
import {
  getWorksByCategory,
  workCategories,
  type WorkFilter,
} from '@/data/works'

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState<WorkFilter>('All')
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const lastFocused = useRef<HTMLElement | null>(null)

  const visibleWorks = getWorksByCategory(activeCategory)
  const activeWork = openIndex !== null ? visibleWorks[openIndex] : null

  const close = useCallback(() => setOpenIndex(null), [])

  const step = useCallback(
    (direction: number) => {
      setOpenIndex((current) => {
        if (current === null) return current
        const next = current + direction
        if (next < 0 || next >= visibleWorks.length) return current
        return next
      })
    },
    [visibleWorks.length]
  )

  // Keyboard control + focus handling for the lightbox.
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

  return (
    <section
      id="gallery"
      className="relative py-20 lg:py-24 bg-obsidian"
      aria-labelledby="gallery-heading"
    >
      <div className="section-container">
        <Reveal className="max-w-2xl">
          <p className="text-[0.65rem] uppercase tracking-[0.35em] text-gold mb-5">
            Selected work
          </p>
          <h2
            id="gallery-heading"
            className="font-display text-4xl lg:text-5xl font-medium text-ivory text-balance"
          >
            Devotional and figurative
            <span className="text-gold"> sculpture</span>
          </h2>
          <p className="mt-5 text-lg text-ivory/60 leading-relaxed">
            A selection of pieces from the studio — each one modelled, finished, and
            painted by hand. Commissions begin from a conversation, a reference, or a
            space.
          </p>
        </Reveal>

        <Reveal
          className="mt-12 flex flex-wrap gap-2"
          distance={16}
          delay={0.05}
          role="group"
          aria-label="Filter work by category"
        >
          {workCategories.map((category) => {
            const isActive = activeCategory === category
            return (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category)
                  setOpenIndex(null)
                }}
                aria-pressed={isActive}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian ${
                  isActive
                    ? 'bg-gold text-obsidian'
                    : 'bg-charcoal/60 text-ivory/70 border border-line hover:text-ivory hover:border-gold/50'
                }`}
              >
                {category}
              </button>
            )
          })}
        </Reveal>

        <motion.div
          layout
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {visibleWorks.map((work, index) => (
              <motion.article
                key={work.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inView}
                exit={{ opacity: 0, scale: 0.97, transition: transitions.micro }}
                // Cards cascade rather than popping in together. The index is
                // capped so a long grid never has a visibly late last card.
                transition={{
                  ...transitions.reveal,
                  delay: Math.min(index, 5) * stagger.tight,
                }}
                className="group"
              >
                <button
                  onClick={() => setOpenIndex(index)}
                  className="w-full text-left rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-obsidian"
                  aria-label={`View ${work.title}`}
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line/40 bg-charcoal">
                    <Image
                      src={work.image}
                      alt={work.alt}
                      fill
                      className="object-cover transition-transform duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 400px"
                    />
                    {/* Several pieces are photographed on pale backgrounds, so the
                        caption needs a deep scrim to stay readable over them. */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-obsidian via-obsidian/85 to-transparent"
                      aria-hidden="true"
                    />

                    <span
                      className="absolute top-4 right-4 inline-flex items-center justify-center w-9 h-9 rounded-full bg-obsidian/70 border border-line text-ivory opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                      aria-hidden="true"
                    >
                      <Plus className="w-4 h-4" />
                    </span>

                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-[0.6rem] uppercase tracking-[0.28em] text-gold">
                        {work.category}
                      </p>
                      <h3 className="mt-2 font-display text-xl text-ivory leading-snug">
                        {work.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-ivory/75 line-clamp-2">
                        {work.summary}
                      </p>
                    </div>
                  </div>
                </button>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-5 rounded-2xl border border-line/50 bg-charcoal/40 px-7 py-6">
          <p className="text-ivory/70 text-center sm:text-left">
            Recent large-scale commissions — temple elephants, a sculpted storefront,
            an oversized tabla — are shown from clay through to installation.
          </p>
          <Link
            href="/gallery"
            className="btn-secondary inline-flex shrink-0 items-center justify-center gap-2 text-center"
          >
            See recent work
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </Reveal>

        <Reveal className="mt-5 flex flex-col sm:flex-row items-center gap-5 rounded-2xl border border-line/50 bg-charcoal/40 px-7 py-6">
          <p className="text-ivory/70 text-center sm:text-left flex-1">
            Looking for something specific — a deity, a portrait, a piece for a
            particular corner? Send a photo or a reference and Shikha will take it
            from there.
          </p>
          <a
            href={whatsappUrl(
              "Hello Shikha Kalsi Arts, I saw your work and I'd like to discuss a commission."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex shrink-0 items-center justify-center gap-2.5"
          >
            <WhatsAppIcon className="w-5 h-5" />
            Discuss a commission
          </a>
        </Reveal>
      </div>

      <AnimatePresence>
        {activeWork && openIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={activeWork.title}
          >
            <div
              className="absolute inset-0 bg-obsidian/90 backdrop-blur-sm"
              onClick={close}
              aria-hidden="true"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ type: 'spring', damping: 26, stiffness: 300 }}
              className="relative w-full max-w-5xl max-h-full overflow-y-auto rounded-2xl border border-line bg-charcoal shadow-2xl"
            >
              <button
                ref={closeButtonRef}
                onClick={close}
                aria-label="Close"
                className="absolute top-4 right-4 z-10 inline-flex items-center justify-center w-11 h-11 rounded-full bg-obsidian/80 border border-line text-ivory transition-colors hover:text-gold hover:border-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>

              <div className="grid lg:grid-cols-[1.2fr_1fr]">
                <div className="relative bg-obsidian aspect-[4/5] lg:aspect-auto lg:min-h-[32rem]">
                  <Image
                    src={activeWork.image}
                    alt={activeWork.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                </div>

                <div className="p-7 lg:p-9 flex flex-col">
                  <p className="text-[0.6rem] uppercase tracking-[0.3em] text-gold">
                    {activeWork.category}
                  </p>
                  <h3 className="mt-3 font-display text-2xl lg:text-3xl text-ivory leading-tight">
                    {activeWork.title}
                  </h3>
                  <p className="mt-5 text-ivory/70 leading-relaxed">
                    {activeWork.description}
                  </p>

                  <dl className="mt-7 pt-6 border-t border-line/50">
                    <dt className="text-[0.6rem] uppercase tracking-[0.28em] text-ivory/60">
                      Finish
                    </dt>
                    <dd className="mt-2 text-ivory/80 text-sm">
                      {activeWork.finish}
                    </dd>
                  </dl>

                  <a
                    href={whatsappUrl(
                      `Hello Shikha Kalsi Arts, I'm interested in a piece like "${activeWork.title}".`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-gold text-obsidian font-semibold transition-colors hover:bg-gold-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                    Enquire about this piece
                  </a>

                  <div className="mt-auto pt-8 flex items-center justify-between gap-4">
                    <button
                      onClick={() => step(-1)}
                      disabled={openIndex === 0}
                      className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-line text-ivory/70 transition-colors hover:text-gold hover:border-gold disabled:opacity-30 disabled:hover:text-ivory/70 disabled:hover:border-line focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                      aria-label="Previous work"
                    >
                      <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                    </button>
                    <span className="text-xs tracking-[0.2em] text-ivory/60">
                      {openIndex + 1} / {visibleWorks.length}
                    </span>
                    <button
                      onClick={() => step(1)}
                      disabled={openIndex === visibleWorks.length - 1}
                      className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-line text-ivory/70 transition-colors hover:text-gold hover:border-gold disabled:opacity-30 disabled:hover:text-ivory/70 disabled:hover:border-line focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                      aria-label="Next work"
                    >
                      <ChevronRight className="w-5 h-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Gallery
