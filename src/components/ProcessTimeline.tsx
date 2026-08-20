'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Flame, Wind, Droplet, Sparkles, ArrowRight, CheckCircle } from 'lucide-react'

const processStages = [
  {
    id: 'raw-earth',
    number: '01',
    title: 'Raw Earth',
    subtitle: 'Sourcing & Preparation',
    icon: Sparkles,
    color: '#8A9A86',
    bgColor: 'sage',
    description: 'We begin with carefully selected clay bodies — stoneware, porcelain, and terracotta — sourced from mineral-rich deposits. Each clay is tested for plasticity, firing range, and character. The raw material is wedged by hand to remove air bubbles and align particles, a meditative process that connects the maker to the material.',
    details: [
      'Clay selection from certified deposits',
      'Hand-wedging for particle alignment',
      'Moisture content calibration',
      'Aging for improved plasticity',
    ],
    image: '/assets/WhatsApp Image 2026-08-14 at 20.54.51.jpeg',
    alt: 'Raw clay preparation and wedging by Shikha Kalsi',
  },
  {
    id: 'hand-molding',
    number: '02',
    title: 'Hand Molding',
    subtitle: 'Forming & Shaping',
    icon: Droplet,
    color: '#C05A3E',
    bgColor: 'terracotta',
    description: 'Using techniques passed down through generations — throwing on the wheel, coiling, slab building, and pinching — each form emerges through direct contact between hand and clay. No molds, no shortcuts. The maker\'s fingers leave subtle traces, creating surfaces that breathe with human touch. Forms are refined over days, drying slowly to prevent cracking.',
    details: [
      'Wheel throwing for symmetrical forms',
      'Coiling for sculptural pieces',
      'Slab construction for geometric forms',
      'Slow drying over 7-14 days',
    ],
    image: '/assets/WhatsApp Image 2026-08-14 at 20.54.52.jpeg',
    alt: 'Hand molding clay on pottery wheel by Shikha Kalsi',
  },
  {
    id: 'kiln-firing',
    number: '03',
    title: 'Kiln Firing',
    subtitle: 'Transformation by Fire',
    icon: Flame,
    color: '#D49B4B',
    bgColor: 'ochre',
    description: 'The kiln is where clay becomes ceramic. We fire in electric, gas, and traditional wood-fired kilns, each imparting unique character. Bisque firing at 900-1000°C creates porous ceramic ready for glazing. Glaze firing at 1200-1320°C vitrifies the body and melts glazes into glass. Wood firing adds unpredictable flame markings — nature\'s signature on each piece.',
    details: [
      'Bisque firing: 900-1000°C',
      'Glaze firing: 1200-1320°C',
      'Wood firing for natural ash glaze',
      'Reduction & oxidation atmospheres',
    ],
    image: '/assets/WhatsApp Image 2026-08-14 at 20.54.52 (1).jpeg',
    alt: 'Wood-fired kiln loading and firing process',
  },
  {
    id: 'glaze-finishing',
    number: '04',
    title: 'Glaze Finishing',
    subtitle: 'Surface & Soul',
    icon: Wind,
    color: '#2A2421',
    bgColor: 'clay',
    description: 'Glazes are formulated in-house from raw minerals — feldspar, silica, whiting, and metal oxides. Applied by dipping, pouring, brushing, or spraying, each method creates distinct surfaces. Some pieces remain unglazed, celebrating raw clay. Final inspection reveals the alchemy: crystalline formations, glaze pooling, iron speckling. Each piece is signed, documented, and prepared for its new home.',
    details: [
      'In-house glaze formulation',
      'Multiple application techniques',
      'Final quality inspection',
      'Artist signature & documentation',
    ],
    image: '/assets/WhatsApp Image 2026-08-14 at 20.54.53.jpeg',
    alt: 'Glaze application and final finishing touches',
  },
]

export function ProcessTimeline() {
  const [activeStage, setActiveStage] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const stageRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = processStages.findIndex((_, i) => stageRefs.current[i] === entry.target)
            if (index !== -1) setActiveStage(index)
          }
        })
      },
      { threshold: 0.5, rootMargin: '-20% 0px -20% 0px' }
    )

    stageRefs.current.forEach((ref) => ref && observer.observe(ref))
    return () => stageRefs.current.forEach((ref) => ref && observer.unobserve(ref))
  }, [])

  const scrollToStage = (index: number) => {
    stageRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setActiveStage(index)
  }

  return (
    <section
      id="process"
      className="relative py-24 lg:py-32 bg-clay"
      aria-labelledby="process-heading"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `linear-gradient(rgba(26,20,17,0.45), rgba(26,20,17,0.18)), url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundBlendMode: 'overlay',
          opacity: 0.9,
        }}
      />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-terracotta/20 border border-terracotta/30 text-terracotta text-sm font-medium mb-4">
            The Artisanal Journey
          </span>
          <h2 id="process-heading" className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-cream tracking-tight">
            Four Stages of <span className="text-terracotta">Creation</span>
          </h2>
          <p className="mt-4 text-lg text-cream/60 max-w-2xl mx-auto">
            From raw earth to finished masterpiece — witness the alchemy of clay, fire, and human touch.
            Each stage is a meditation, each piece a testament to patience.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-terracotta/50 via-ochre/30 to-sage/50 -translate-x-1/2" aria-hidden="true" />
          
          <div className="space-y-16 lg:space-y-24">
            {processStages.map((stage, index) => (
              <motion.div
                key={stage.id}
                ref={(el) => { stageRefs.current[index] = el }}
                initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.15 }}
                className={`relative flex flex-col lg:flex-row ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''} gap-8 lg:gap-12 items-center`}
              >
                <div
                  className={`relative flex-shrink-0 w-full lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'}`}
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-clay/30">
                    <Image
                      src={stage.image}
                      alt={stage.alt}
                      fill
                      className="object-cover transition-all duration-700 hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      quality={90}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-clay/60 via-transparent to-transparent" aria-hidden="true" />
                    <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-cream/90 backdrop-blur-sm text-clay text-sm font-medium">
                      <stage.icon className="w-4 h-4" style={{ color: stage.color }} aria-hidden="true" />
                      <span>Stage {stage.number}</span>
                    </div>
                    <div className="absolute bottom-4 right-4 text-cream/80 text-sm font-medium">
                      {stage.subtitle}
                    </div>
                  </div>
                </div>

                <div
                  className={`relative flex-1 lg:w-1/2 p-6 lg:p-8 rounded-3xl glassmorphism ${
                    activeStage === index ? 'ring-2 ring-terracotta/50 shadow-2xl' : ''
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${stage.color}15 0%, transparent 50%)`,
                    borderColor: `${stage.color}40`,
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: `${stage.color}20` }}
                    >
                      <stage.icon className="w-6 h-6" style={{ color: stage.color }} aria-hidden="true" />
                    </div>
                    <div>
                      <span className="text-terracotta font-mono text-lg font-bold">{stage.number}</span>
                      <span className="text-cream/50 ml-2 text-sm">/ 04</span>
                    </div>
                  </div>

                  <h3 className="font-display text-2xl lg:text-3xl font-medium text-cream mb-2">{stage.title}</h3>
                  <p className="text-terracotta/80 font-medium mb-6">{stage.subtitle}</p>

                  <p className="text-cream/70 leading-relaxed mb-6">{stage.description}</p>

                  <ul className="space-y-3 mb-8" role="list">
                    {stage.details.map((detail, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="flex items-start gap-3 text-cream/70"
                      >
                        <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: stage.color }} aria-hidden="true" />
                        <span>{detail}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <button
                    onClick={() => scrollToStage(index)}
                    className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
                    style={{ color: stage.color }}
                    aria-label={`Focus on ${stage.title} stage`}
                  >
                    <span>{activeStage === index ? 'Active Stage' : 'Explore This Stage'}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </button>
                </div>

                <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div
                    className={`w-4 h-4 rounded-full border-4 transition-all duration-500 ${
                      activeStage === index
                        ? 'bg-terracotta border-terracotta scale-125 shadow-lg shadow-terracotta/50'
                        : 'bg-clay border-cream/20 hover:border-terracotta/50'
                    }`}
                    aria-hidden="true"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.8 }}
          className="mt-20 lg:mt-24 text-center"
        >
          <p className="text-cream/50 text-lg mb-4">Every piece carries the energy of its making</p>
          <a href="#gallery" className="btn-primary inline-flex items-center gap-2">
            View Finished Works
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}