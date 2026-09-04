'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'
import { whatsappUrl } from '@/lib/contact'

/**
 * Persistent WhatsApp entry point. All studio enquiries go through WhatsApp,
 * so this stays reachable on every scroll position once past the hero.
 */
export function WhatsAppFab() {
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [200, 400], [0, 1])
  const pointerEvents = useTransform(scrollY, (value) =>
    value > 300 ? 'auto' : 'none'
  )

  return (
    <motion.a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      style={{ opacity, pointerEvents }}
      className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-3 pl-4 pr-5 py-3.5 rounded-full bg-[#25D366] text-[#07301c] font-semibold shadow-[0_12px_32px_-8px_rgba(0,0,0,0.7)] transition-transform duration-200 hover:scale-[1.04] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
      aria-label="Enquire on WhatsApp"
    >
      <WhatsAppIcon className="w-6 h-6" />
      <span className="hidden sm:inline text-sm">Enquire</span>
    </motion.a>
  )
}
