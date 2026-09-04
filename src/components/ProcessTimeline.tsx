'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { MessagesSquare, PencilRuler, Hammer, Package } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { expoOut, inView, stagger, staggerChild } from '@/lib/motion'

const stages = [
  {
    id: 'brief',
    number: '01',
    title: 'The Brief',
    subtitle: 'Reference, scale, and setting',
    icon: MessagesSquare,
    description:
      'It starts with a conversation — a photograph, a deity, a likeness, or the corner the piece has to live in. Scale, finish, and budget are agreed before any modelling begins.',
    points: ['Reference images and inspiration', 'Scale and placement', 'Finish and budget'],
    image: '/assets/WhatsApp Image 2026-08-14 at 20.54.51 (1).jpeg',
    alt: 'Terracotta bust in progress, showing modelled facial detail',
  },
  {
    id: 'modelling',
    number: '02',
    title: 'Modelling',
    subtitle: 'Form worked by hand',
    icon: PencilRuler,
    description:
      'The form is built up and refined by hand, with proportion and expression resolved at this stage. Progress photographs are shared so changes happen before the surface is sealed.',
    points: ['Form and proportion', 'Expression and detail', 'Progress shared for approval'],
    image: '/assets/WhatsApp Image 2026-08-14 at 20.54.52 (1).jpeg',
    alt: 'Terracotta relief panel of a deity, showing hand-modelled detail',
  },
  {
    id: 'finishing',
    number: '03',
    title: 'Finishing',
    subtitle: 'Surface, colour, and gilding',
    icon: Hammer,
    description:
      'Surface treatment is where each piece takes on its character — terracotta left bare, a stone-effect ivory, mirror-polished metal, or gold leaf applied by hand.',
    points: ['Surface preparation', 'Hand-painting and patination', 'Gilding and polishing'],
    image: '/assets/WhatsApp Image 2026-08-14 at 20.54.53.jpeg',
    alt: 'Eagle sculpture with gold-leaf wings and a pewter-toned head',
  },
  {
    id: 'delivery',
    number: '04',
    title: 'Delivery',
    subtitle: 'Packed, shipped, and placed',
    icon: Package,
    description:
      'Finished work is photographed, crated to suit its fragility, and dispatched. Larger pieces are placed on site so the final position is right before handover.',
    points: ['Final photography', 'Protective crating', 'Placement and handover'],
    image: '/assets/WhatsApp Image 2026-08-14 at 20.54.52.jpeg',
    alt: 'Completed seated Buddha sculpture displayed on a plinth',
  },
]

export function ProcessTimeline() {
  return (
    <section
      id="process"
      className="relative py-20 lg:py-24 bg-obsidian border-t border-line/30"
      aria-labelledby="process-heading"
    >
      <div className="section-container">
        <Reveal className="max-w-2xl">
          <p className="text-[0.65rem] uppercase tracking-[0.35em] text-gold mb-5">
            How a commission works
          </p>
          <h2
            id="process-heading"
            className="font-display text-4xl lg:text-5xl font-medium text-ivory text-balance"
          >
            From first reference
            <span className="text-gold"> to finished piece</span>
          </h2>
          <p className="mt-5 text-lg text-ivory/60 leading-relaxed">
            Four stages, with your approval at each one. Most commissions take four to
            eight weeks depending on size and finish.
          </p>
        </Reveal>

        <ol className="mt-16 space-y-6" role="list">
          {stages.map((stage) => (
            <motion.li
              key={stage.id}
              initial="hidden"
              whileInView="visible"
              viewport={inView}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    ease: expoOut,
                    staggerChildren: stagger.normal,
                    delayChildren: 0.08,
                  },
                },
              }}
              className="group relative overflow-hidden rounded-2xl border border-line/40 bg-charcoal/40 transition-[border-color,transform] duration-[180ms] ease-[cubic-bezier(0.65,0,0.35,1)] hover:border-gold/40 hover:-translate-y-0.5"
            >
              <div className="grid md:grid-cols-[1.35fr_1fr] gap-0">
                {/* Text sits left, image right — each enters from its own side. */}
                <motion.div variants={staggerChild(20, 'x')} className="p-7 lg:p-9">
                  <div className="flex items-center gap-4">
                    <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-gold/10 border border-gold/25 text-gold">
                      <stage.icon className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <div className="flex items-baseline gap-2 text-xs tracking-[0.25em] text-ivory/60">
                      <span className="text-gold">{stage.number}</span>
                      <span>/ 04</span>
                    </div>
                  </div>

                  <h3 className="mt-5 font-display text-2xl text-ivory">
                    {stage.title}
                  </h3>
                  <p className="mt-1 text-sm text-gold/70">{stage.subtitle}</p>

                  <p className="mt-4 text-ivory/65 leading-relaxed">
                    {stage.description}
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-2" role="list">
                    {stage.points.map((point) => (
                      <li
                        key={point}
                        className="px-3 py-1.5 rounded-full border border-line/60 text-xs text-ivory/60"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  variants={staggerChild(-20, 'x')}
                  className="relative min-h-[15rem] md:min-h-full order-first md:order-last"
                >
                  <Image
                    src={stage.image}
                    alt={stage.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/20 to-transparent md:from-charcoal md:via-charcoal/40"
                    aria-hidden="true"
                  />
                </motion.div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default ProcessTimeline
