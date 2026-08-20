'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { Instagram, Facebook, Mail, ArrowUp, Heart } from 'lucide-react'

const socialLinks = [
  { name: 'Instagram', href: 'https://instagram.com/shikhakalsiarts', icon: Instagram, ariaLabel: 'Follow us on Instagram' },
  { name: 'Facebook', href: 'https://facebook.com/shikhakalsiarts', icon: Facebook, ariaLabel: 'Follow us on Facebook' },
  { name: 'Pinterest', href: 'https://pinterest.com/shikhakalsiarts', icon: null, ariaLabel: 'Follow us on Pinterest' },
  { name: 'Email', href: 'mailto:hello@shikhakalsiarts.com', icon: Mail, ariaLabel: 'Email us' },
]

const footerLinks = {
  explore: [
    { label: 'All Collections', href: '#gallery' },
    { label: 'Vases', href: '#gallery?vases' },
    { label: 'Sculptures', href: '#gallery?sculptures' },
    { label: 'Tableware', href: '#gallery?tableware' },
    { label: 'Limited Editions', href: '#gallery?limited' },
  ],
  studio: [
    { label: 'Our Process', href: '#process' },
    { label: 'Commission a Piece', href: '#contact' },
    { label: 'Press & Features', href: '#press' },
    { label: 'Visit Studio', href: '#contact' },
  ],
  support: [
    { label: 'Shipping & Returns', href: '/shipping' },
    { label: 'Care Instructions', href: '/care' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact Us', href: '#contact' },
  ],
}

export function Footer() {
  const { scrollY } = useScroll()
  const showBackToTop = useTransform(scrollY, [0, 500], [0, 1])

  return (
    <footer
      id="contact"
      className="relative bg-clay text-cream pt-20 lg:pt-24 pb-12"
      role="contentinfo"
      aria-labelledby="footer-heading"
    >
      <div className="absolute inset-0 opacity-5" aria-hidden="true" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
      }} />

      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="grid lg:grid-cols-4 gap-12 lg:gap-16 mb-16"
        >
          <div className="lg:col-span-2">
            <Link href="#home" className="font-display text-3xl lg:text-4xl font-medium tracking-tight mb-6 block">
              Shikha Kalsi Arts
            </Link>
            <p className="text-cream/60 leading-relaxed max-w-lg mb-8">
              Exclusive handmade clay studio creating sculptural ceramics, 
              artisanal tableware, and limited edition collectible pieces. 
              Each work embodies the wabi-sabi philosophy — finding beauty in imperfection.
            </p>
            
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="px-3 py-1.5 rounded-full bg-terracotta/20 border border-terracotta/30 text-terracotta text-sm font-medium">
                Handcrafted in Mumbai
              </span>
              <span className="px-3 py-1.5 rounded-full bg-ochre/20 border border-ochre/30 text-ochre text-sm font-medium">
                Wood-fired Kiln
              </span>
              <span className="px-3 py-1.5 rounded-full bg-sage/20 border border-sage/30 text-sage text-sm font-medium">
                Sustainable Materials
              </span>
            </div>

            <div className="flex items-center gap-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.ariaLabel}
                  className="p-3 rounded-full bg-cream/5 border border-cream/10 text-cream/70 hover:bg-terracotta/20 hover:border-terracotta/30 hover:text-terracotta transition-all duration-300"
                >
                  {social.icon ? (
                    <social.icon className="w-5 h-5" aria-hidden="true" />
                  ) : (
                    <span className="w-5 h-5 inline-block bg-cream/10 rounded" aria-hidden="true" />
                  )}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 id="footer-heading" className="font-display text-lg font-medium mb-6">Explore</h3>
            <nav aria-label="Explore links">
              <ul className="space-y-3" role="list">
                {footerLinks.explore.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-cream/70 hover:text-terracotta transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h3 className="font-display text-lg font-medium mb-6">Studio</h3>
            <nav aria-label="Studio links">
              <ul className="space-y-3" role="list">
                {footerLinks.studio.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-cream/70 hover:text-terracotta transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h3 className="font-display text-lg font-medium mb-6">Support</h3>
            <nav aria-label="Support links">
              <ul className="space-y-3" role="list">
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-cream/70 hover:text-terracotta transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="border-t border-cream/10 pt-12"
        >
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div className="text-center lg:text-left">
              <p className="text-cream/50 text-sm">
                Join our collector's circle for early access to limited editions
              </p>
              <form className="mt-4 flex flex-col sm:flex-row gap-3 max-w-xs mx-auto lg:mx-0" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <input
                  type="email"
                  id="newsletter-email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-full bg-cream/5 border border-cream/10 text-cream placeholder:text-cream/40 focus:outline-none focus:border-terracotta/50 focus:ring-2 focus:ring-terracotta/20 transition-all text-sm"
                  required
                />
                <button type="submit" className="btn-primary px-6 py-3 whitespace-nowrap">
                  Subscribe
                </button>
              </form>
            </div>

            <div className="text-center">
              <p className="text-cream/50 text-sm">
                © {new Date().getFullYear()} Shikha Kalsi Arts. All rights reserved.
              </p>
              <p className="text-cream/40 text-xs mt-1">
                Crafted with <Heart className="inline w-3 h-3 text-terracotta" aria-hidden="true" /> in Mumbai
              </p>
            </div>

            <div className="text-center lg:text-right">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cream/5 border border-cream/10 text-cream/70 hover:bg-terracotta/20 hover:border-terracotta/30 hover:text-terracotta transition-all duration-300"
                aria-label="Back to top"
                style={{ opacity: showBackToTop }}
              >
                <ArrowUp className="w-5 h-5" aria-hidden="true" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}