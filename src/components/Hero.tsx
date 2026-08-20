'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowDown, Sparkles } from 'lucide-react'

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
      setMousePosition({ x, y })
    }

    heroRef.current?.addEventListener('mousemove', handleMouseMove)
    return () => heroRef.current?.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const floatVariants = {
    initial: { y: 0, rotateX: 0, rotateY: 0 },
    animate: {
      y: [0, -20, 0],
      rotateX: [0, 2, 0],
      rotateY: [0, -2, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
      onMouseMove={(e) => {
        const rect = heroRef.current?.getBoundingClientRect()
        if (rect) {
          const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
          const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
          setMousePosition({ x, y })
        }
      }}
    >
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div
          className="absolute inset-0 bg-gradient-radial from-cream via-cream/80 to-sage/20"
          style={{
            background: 'radial-gradient(ellipse at center, #F9F6F0 0%, #F9F6F0 40%, #8A9A8615 100%)',
          }}
        />
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }} />
      </div>

      <motion.div
        className="relative z-10 section-container px-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-terracotta/10 border border-terracotta/20 text-terracotta text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>Handcrafted in Mumbai Studio</span>
            </motion.div>

            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium leading-[1.1] text-clay tracking-tight text-balance"
            >
              Sculpted by Hand,{' '}
              <br />
              <span className="text-terracotta">Shaped by Time</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
              className="mt-8 text-lg sm:text-xl text-clay/70 leading-relaxed max-w-xl mx-auto lg:mx-0 text-balance"
            >
              Exclusive handmade clay studio creating sculptural ceramics, 
              artisanal tableware, and limited edition collectible pieces. 
              Each work embodies the wabi-sabi philosophy — finding beauty in imperfection.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
              className="mt-12 flex flex-col sm:flex-row items-center sm:justify-start gap-4"
            >
              <a
                href="#gallery"
                className="btn-primary w-full sm:w-auto"
              >
                Explore Collection
              </a>
              <a
                href="#contact"
                className="btn-secondary w-full sm:w-auto"
              >
                Commission a Piece
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mt-16 flex items-center justify-center sm:justify-start gap-10 text-sm text-clay/50"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-terracotta" aria-hidden="true" />
                <span>Wood-fired Kiln</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-ochre" aria-hidden="true" />
                <span>Traditional Techniques</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sage" aria-hidden="true" />
                <span>Sustainable Materials</span>
              </div>
            </motion.div>
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
              className="relative perspective-1000"
              style={{
                transformStyle: 'preserve-3d',
                transform: `rotateX(${mousePosition.y * -8}deg) rotateY(${mousePosition.x * 8}deg)`,
                transition: 'transform 0.1s ease-out',
              }}
            >
                <div className="relative aspect-[3/4] max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-radial from-terracotta/20 via-transparent to-transparent rounded-3xl blur-3xl animate-pulse" aria-hidden="true" />
                
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl bg-clay/5" style={{
                  boxShadow: `
                    0 50px 100px -20px rgba(42, 36, 33, 0.25),
                    0 30px 60px -10px rgba(42, 36, 33, 0.15),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1)
                  `,
                }}>
                  <Image
                    src="/assets/WhatsApp Image 2026-08-14 at 20.54.52.jpeg"
                    alt="Handcrafted Terracotta Clay Sculpture by Shikha Kalsi Arts - Featured masterpiece"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality={95}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/AB//2Q=="
                  />
                </div>

                <div className="absolute -bottom-6 -left-6 right-6 lg:left-auto lg:right-6 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 lg:w-64">
                  <motion.div
                    animate={floatVariants}
                    className="glassmorphism p-6 rounded-2xl text-center"
                  >
                    <div className="font-display text-3xl font-medium text-clay mb-2">Terracotta</div>
                    <div className="text-clay/60 text-sm mb-4">Heritage Vase</div>
                    <div className="flex items-center justify-center gap-3 text-sm text-clay/50">
                      <span>32cm × 18cm</span>
                      <span className="w-px h-4 bg-clay/20" aria-hidden="true" />
                      <span>2.4 kg</span>
                      <span className="w-px h-4 bg-clay/20" aria-hidden="true" />
                      <span>Wood-fired</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8, ease: 'easeOut' }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-clay/40"
              aria-hidden="true"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-6 h-10 border-2 border-clay/30 rounded-full flex justify-center pt-2"
              >
                <ArrowDown className="w-3 h-3 text-clay/40" />
              </motion.div>
              <span className="text-xs tracking-widest uppercase">Scroll to explore</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}