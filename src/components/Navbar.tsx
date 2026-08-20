'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Mail, Instagram, Facebook } from 'lucide-react'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#process', label: 'Process' },
  { href: '#press', label: 'Press' },
  { href: '#contact', label: 'Contact' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'glassmorphism py-4' : 'py-6 bg-transparent'
        }`}
        role="banner"
      >
        <nav className="section-container flex items-center justify-between" aria-label="Main navigation">
          <Link
            href="#home"
            className="font-display text-2xl font-medium text-clay tracking-tight hover:opacity-80 transition-opacity"
            aria-label="Shikha Kalsi Arts - Home"
          >
            Shikha Kalsi Arts
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-clay/80 font-medium text-sm tracking-wide hover:text-terracotta transition-colors after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-terracotta after:transition-all hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => setIsContactOpen(true)}
              className="btn-primary text-sm px-6 py-2.5"
            >
              Inquire
            </button>
          </div>

          <button
            className="md:hidden p-2 text-clay hover:text-terracotta transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={isMobileMenuOpen}
          >
            <Menu className="w-6 h-6" aria-hidden="true" />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile menu"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-sm bg-cream/98 backdrop-blur-md border-l border-clay/10 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-clay/10">
                <span className="font-display text-xl font-medium text-clay">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-clay/60 hover:text-terracotta transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" aria-hidden="true" />
                </button>
              </div>

              <nav className="flex-1 py-6 px-6 overflow-y-auto" aria-label="Mobile navigation">
                <ul className="space-y-4" role="list">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-clay font-medium text-lg hover:text-terracotta transition-colors pb-4 border-b border-clay/10"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 pt-6 border-t border-clay/10 space-y-4">
                  <button
                    onClick={() => { setIsMobileMenuOpen(false); setIsContactOpen(true); }}
                    className="btn-primary w-full text-center"
                  >
                    Commission a Piece
                  </button>
                  <div className="flex items-center justify-center gap-6 text-clay/60">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-terracotta transition-colors">
                      <Instagram className="w-6 h-6" aria-hidden="true" />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-terracotta transition-colors">
                      <Facebook className="w-6 h-6" aria-hidden="true" />
                    </a>
                    <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest" className="hover:text-terracotta transition-colors">
                      <span className="w-6 h-6 inline-block bg-cream/10 rounded" aria-hidden="true" />
                    </a>
                    <a href="mailto:hello@shikhakalsiarts.com" aria-label="Email" className="hover:text-terracotta transition-colors">
                      <Mail className="w-6 h-6" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </nav>
            </motion.div>
            <div
              className="absolute inset-0 bg-clay/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isContactOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
            role="dialog"
            aria-modal="true"
            aria-label="Contact inquiry"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-cream/98 backdrop-blur-md border-l border-clay/10 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-clay/10">
                <span className="font-display text-xl font-medium text-clay">Inquire</span>
                <button
                  onClick={() => setIsContactOpen(false)}
                  className="p-2 text-clay/60 hover:text-terracotta transition-colors"
                  aria-label="Close inquiry"
                >
                  <X className="w-6 h-6" aria-hidden="true" />
                </button>
              </div>

              <div className="flex-1 p-6 overflow-y-auto">
                <p className="text-clay/70 mb-6 text-sm leading-relaxed">
                  Interested in a custom commission or have questions about a piece? 
                  Share your vision and we'll respond within 24 hours.
                </p>

                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsContactOpen(false); }}>
                  <div>
                    <label htmlFor="inquiry-name" className="block text-sm font-medium text-clay mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="inquiry-name"
                      className="input-field"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="inquiry-email" className="block text-sm font-medium text-clay mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="inquiry-email"
                      className="input-field"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="inquiry-type" className="block text-sm font-medium text-clay mb-2">
                      Inquiry Type
                    </label>
                    <select id="inquiry-type" className="input-field appearance-none bg-cream" required>
                      <option value="">Select inquiry type</option>
                      <option value="custom">Custom Commission</option>
                      <option value="existing">Existing Piece Inquiry</option>
                      <option value="collaboration">Gallery Collaboration</option>
                      <option value="press">Press & Media</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="inquiry-message" className="block text-sm font-medium text-clay mb-2">
                      Message
                    </label>
                    <textarea
                      id="inquiry-message"
                      rows={4}
                      className="input-field rounded-2xl resize-none"
                      placeholder="Describe your vision, timeline, and any specific requirements..."
                      required
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full mt-2">
                    Send Inquiry
                  </button>
                </form>
              </div>
            </motion.div>
            <div
              className="absolute inset-0 bg-clay/50 backdrop-blur-sm"
              onClick={() => setIsContactOpen(false)}
              aria-hidden="true"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}