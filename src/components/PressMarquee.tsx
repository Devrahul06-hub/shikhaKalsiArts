'use client'

import { motion } from 'framer-motion'
import { Star, Quote, Instagram, MapPin, Award } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    quote: "Shikha's work transcends mere pottery — each piece is a meditation made tangible. The Heritage Vase we acquired has become the soul of our living space.",
    author: 'Priya Sharma',
    role: 'Art Collector, Delhi',
    location: 'New Delhi, India',
    avatar: '/assets/WhatsApp Image 2026-08-14 at 20.54.51.jpeg',
  },
  {
    id: 2,
    quote: "The Moon Jar from the limited edition series is breathtaking. The subtle asymmetry and milky glaze capture the exact serenity of Korean Joseon ceramics.",
    author: 'Michael Chen',
    role: 'Gallery Director',
    location: 'Hong Kong',
    avatar: '/assets/WhatsApp Image 2026-08-14 at 20.54.52.jpeg',
  },
  {
    id: 3,
    quote: "Commissioning a custom tea set was a collaborative journey. Shikha listened deeply and created pieces that elevate our daily tea ceremony into ritual.",
    author: 'Aisha Patel',
    role: 'Ceramic Enthusiast',
    location: 'Mumbai, India',
    avatar: '/assets/WhatsApp Image 2026-08-14 at 20.54.52 (1).jpeg',
  },
  {
    id: 4,
    quote: "The Guardian Sculpture commands presence. The saggar-fired surface tells a story of fire and chance — truly a one-of-a-kind masterpiece.",
    author: 'Dr. Robert Kim',
    role: 'Museum Curator',
    location: 'London, UK',
    avatar: '/assets/WhatsApp Image 2026-08-14 at 20.54.52 (2).jpeg',
  },
  {
    id: 5,
    quote: "Featured in our 'Contemporary Clay' exhibition — Shikha's Organic Form Vases demonstrate exceptional technical mastery paired with poetic sensibility.",
    author: 'Gallery Modern',
    role: 'Contemporary Art Gallery',
    location: 'Singapore',
    avatar: '/assets/WhatsApp Image 2026-08-14 at 20.54.51 (1).jpeg',
  },
  {
    id: 6,
    quote: "The Ritual Bowl Collection is perfection in functional art. The nesting forms, the tactile contrast of glazes — used daily in our meditation practice.",
    author: 'Yuki Tanaka',
    role: 'Tea Master',
    location: 'Kyoto, Japan',
    avatar: '/assets/WhatsApp Image 2026-08-14 at 20.54.53.jpeg',
  },
]

export function PressMarquee() {
  const duplicated = [...testimonials, ...testimonials]
  const duration = duplicated.length * 4

  return (
    <section
      id="press"
      className="relative py-16 lg:py-20 bg-cream overflow-hidden"
      aria-labelledby="press-heading"
    >
      <div className="absolute inset-0 opacity-3" aria-hidden="true" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
      }} />

      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-terracotta/10 border border-terracotta/20 text-terracotta text-sm font-medium mb-4">
            Press & Collectors
          </span>
          <h2 id="press-heading" className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-clay tracking-tight">
            Voices of <span className="text-terracotta">Appreciation</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-between pointer-events-none px-8">
            <div className="w-32 h-full bg-gradient-to-r from-cream to-transparent" aria-hidden="true" />
            <div className="w-32 h-full bg-gradient-to-l from-cream to-transparent" aria-hidden="true" />
          </div>

          <div className="overflow-hidden" aria-live="polite" aria-label="Testimonials">
            <motion.div
              animate={{ x: [-duplicated.length * 420, 0] }}
              transition={{ duration, repeat: Infinity, ease: 'linear' }}
              className="flex gap-8 flex-nowrap will-change-transform"
              style={{ width: `${duplicated.length * 420}px` }}
            >
              {duplicated.map((testimonial) => (
                <TestimonialCard key={`${testimonial.id}-${testimonial.id > 6 ? 'b' : 'a'}`} testimonial={testimonial} />
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-clay/50"
        >
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-terracotta" aria-hidden="true" />
            <span>Featured in Architectural Digest India</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-ochre" aria-hidden="true" />
            <span>Elle Decor 'Best Artisan Ceramics'</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-sage" aria-hidden="true" />
            <span>Wallpaper* Design Awards Nominee</span>
          </div>
          <div className="flex items-center gap-2">
            <Instagram className="w-4 h-4" aria-hidden="true" />
            <span>@shikhakalsiarts</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

interface TestimonialCardProps {
  testimonial: typeof testimonials[0]
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <motion.div
      className="flex-shrink-0 w-[400px] lg:w-[420px]"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <article className="glassmorphism p-8 rounded-3xl h-full flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <Quote className="w-5 h-5 text-terracotta/60" aria-hidden="true" />
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-4 h-4 fill-terracotta/30 text-terracotta/30" aria-hidden="true" />
            ))}
          </div>
        </div>

        <blockquote className="flex-1 text-clay/80 leading-relaxed text-base lg:text-lg mb-6 italic">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>

        <div className="flex items-start gap-4 pt-4 border-t border-clay/10">
          <div className="w-12 h-12 rounded-full bg-clay/10 flex-shrink-0 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-terracotta/30 to-ochre/30" aria-hidden="true" />
          </div>
          <div>
            <p className="font-medium text-clay">{testimonial.author}</p>
            <p className="text-clay/60 text-sm">{testimonial.role}</p>
            <div className="flex items-center gap-1 mt-1 text-clay/40 text-xs">
              <MapPin className="w-3 h-3" aria-hidden="true" />
              <span>{testimonial.location}</span>
            </div>
          </div>
        </div>
      </article>
    </motion.div>
  )
}