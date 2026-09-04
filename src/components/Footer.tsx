'use client'

import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'
import {
  InstagramIcon,
  LinkedInIcon,
  FacebookIcon,
} from '@/components/icons/SocialIcons'
import { useLenis } from '@/components/LenisProvider'
import { socialLinks, whatsappUrl, WHATSAPP_DISPLAY } from '@/lib/contact'

const socials = [
  { name: 'Instagram', href: socialLinks.instagram, Icon: InstagramIcon },
  { name: 'LinkedIn', href: socialLinks.linkedin, Icon: LinkedInIcon },
  { name: 'Facebook', href: socialLinks.facebook, Icon: FacebookIcon },
]

const exploreLinks = [
  { label: 'Featured Work', href: '#gallery' },
  { label: 'Our Process', href: '#process' },
  { label: 'The Studio', href: '#press' },
]

export function Footer() {
  const lenis = useLenis()

  const scrollToTop = () => {
    if (lenis) lenis.scrollTo(0)
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      id="contact"
      className="relative bg-charcoal text-ivory pt-20 lg:pt-28 pb-12"
      role="contentinfo"
      aria-labelledby="footer-heading"
    >
      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <p className="text-[0.65rem] uppercase tracking-[0.35em] text-gold mb-6">
            Start a conversation
          </p>
          <h2
            id="footer-heading"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight text-balance"
          >
            Have a space, a brief, or an idea?
            <br />
            <span className="text-gold">Let&apos;s talk it through.</span>
          </h2>
          <p className="mt-6 text-ivory/60 leading-relaxed max-w-xl">
            The studio takes on a limited number of commissions each year. Send a
            message on WhatsApp with your site, scale, and timeline — Shikha replies
            personally.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gold text-obsidian font-semibold transition-all duration-300 hover:bg-gold-soft hover:scale-[1.02] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Enquire on WhatsApp
            </a>
            <a
              href={`tel:+${WHATSAPP_DISPLAY.replace(/[^\d]/g, '')}`}
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-line text-ivory/80 font-medium transition-colors hover:border-gold hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              {WHATSAPP_DISPLAY}
            </a>
          </div>
        </motion.div>

        <div className="mt-16 lg:mt-20 grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr] border-t border-line/40 pt-12">
          <div>
            <a
              href="#home"
              className="font-display text-2xl font-medium tracking-tight block mb-4"
            >
              Shikha Kalsi Arts
            </a>
            <p className="text-ivory/55 text-sm leading-relaxed max-w-sm">
              Studio producing large-scale fiber composite sculptures and
              architectural installations for commissions, public art, and brand
              collaborations.
            </p>
            <span className="inline-block mt-5 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/25 text-gold text-xs font-medium">
              Studio based in Mumbai
            </span>
          </div>

          <div>
            <h3 className="text-[0.65rem] uppercase tracking-[0.3em] text-ivory/60 mb-5">
              Explore
            </h3>
            <nav aria-label="Explore links">
              <ul className="space-y-3" role="list">
                {exploreLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-ivory/70 hover:text-gold transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h3 className="text-[0.65rem] uppercase tracking-[0.3em] text-ivory/60 mb-5">
              Follow
            </h3>
            <div className="flex items-center gap-3">
              {socials.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Shikha Kalsi Arts on ${name}`}
                  className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-line text-ivory/70 transition-colors hover:bg-gold/10 hover:border-gold hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-line/40 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-ivory/60 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Shikha Kalsi Arts. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-ivory/50 transition-colors hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm"
          >
            Back to top
            <ArrowUp className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  )
}
