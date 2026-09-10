'use client'

import { useEffect, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'
import {
  InstagramIcon,
  LinkedInIcon,
  FacebookIcon,
} from '@/components/icons/SocialIcons'
import { useLenis } from '@/components/LenisProvider'
import { socialLinks, whatsappUrl, WHATSAPP_DISPLAY } from '@/lib/contact'

/**
 * `section` links point at anchors on the home page; `route` links are real
 * pages. Anchor links have to be prefixed with "/" when the visitor is on
 * another route, otherwise they resolve against that route and go nowhere.
 */
const navLinks = [
  { id: 'home', label: 'Home', type: 'section' },
  { id: 'gallery', label: 'Work', type: 'section' },
  { id: 'process', label: 'Process', type: 'section' },
  { id: 'press', label: 'Studio', type: 'section' },
  { id: 'contact', label: 'Contact', type: 'section' },
  { id: '/gallery', label: 'Recent', type: 'route' },
] as const

const socialIcons = [
  { href: socialLinks.instagram, label: 'Instagram', Icon: InstagramIcon },
  { href: socialLinks.linkedin, label: 'LinkedIn', Icon: LinkedInIcon },
  { href: socialLinks.facebook, label: 'Facebook', Icon: FacebookIcon },
]

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isCondensed, setIsCondensed] = useState(false)
  const lenis = useLenis()
  const pathname = usePathname()
  const onHome = pathname === '/'

  /** Anchors need a leading "/" when we are not already on the home page. */
  const hrefFor = (link: (typeof navLinks)[number]) =>
    link.type === 'route' ? link.id : onHome ? `#${link.id}` : `/#${link.id}`

  const isActive = (link: (typeof navLinks)[number]) =>
    link.type === 'route'
      ? pathname === link.id
      : onHome && activeSection === link.id

  const { scrollY } = useScroll()

  // Driving the backdrop from a motion value keeps the header off React's
  // render path — the old version toggled a class at scrollY > 20, which
  // flickered every time momentum scrolling oscillated across the threshold.
  const backdropOpacity = useTransform(scrollY, [0, 120], [0, 1])
  const scrimOpacity = useTransform(scrollY, [0, 120], [1, 0])

  // Hysteresis: condense at 120px, expand again only below 60px, so the
  // logo size never strobes while hovering around a single breakpoint.
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsCondensed((prev) => (prev ? latest > 60 : latest > 120))
  })

  // Track which section is on screen to light up the matching nav item.
  // Only the home page has these sections, so skip the work entirely elsewhere.
  useEffect(() => {
    if (!onHome) return

    const sections = navLinks
      .filter((link) => link.type === 'section')
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [onHome])

  // Close the menu when navigating to another route.
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Momentum scrolling has to be paused explicitly — overflow:hidden alone
  // does not stop Lenis from scrolling the page behind the menu.
  useEffect(() => {
    if (!isMobileMenuOpen) return

    lenis?.stop()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMobileMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      lenis?.start()
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isMobileMenuOpen, lenis])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50" role="banner">
        {/* Blur layer is always mounted and only fades, so the compositor
            never has to build/tear down a backdrop-filter mid-scroll. */}
        <motion.div
          className="absolute inset-0 bg-obsidian/85 backdrop-blur-xl border-b border-line/60"
          style={{ opacity: backdropOpacity }}
          aria-hidden="true"
        />
        {/* Over the hero the header is transparent, so a soft scrim keeps the
            nav legible against whatever photography sits behind it. */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-obsidian/80 via-obsidian/30 to-transparent"
          style={{ opacity: scrimOpacity }}
          aria-hidden="true"
        />

        <nav
          className="section-container relative flex items-center justify-between gap-8 h-16 lg:h-20"
          aria-label="Main navigation"
        >
          <Link
            href={onHome ? '#home' : '/'}
            className="group flex flex-col justify-center rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-obsidian"
            aria-label="Shikha Kalsi Arts — home"
          >
            <span
              className={`font-display font-medium tracking-tight text-ivory leading-none transition-[font-size,opacity] duration-300 ${
                isCondensed ? 'text-lg lg:text-xl' : 'text-xl lg:text-2xl'
              }`}
            >
              Shikha Kalsi Arts
            </span>
            <span
              className={`hidden sm:block overflow-hidden text-[0.6rem] uppercase tracking-[0.35em] text-gold/70 transition-all duration-300 ${
                isCondensed ? 'max-h-0 opacity-0' : 'max-h-4 opacity-100 mt-1.5'
              }`}
            >
              Sculpture Studio
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link)
              return (
                <Link
                  key={link.id}
                  href={hrefFor(link)}
                  aria-current={active ? 'true' : undefined}
                  className={`relative px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                    active ? 'text-gold' : 'text-ivory/70 hover:text-ivory'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-gold/10 border border-gold/25"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 pl-4 pr-5 py-2.5 rounded-full bg-gold text-obsidian text-sm font-semibold transition-colors duration-200 hover:bg-gold-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
            >
              <WhatsAppIcon className="w-4 h-4" />
              Enquire
            </a>

            <button
              className="md:hidden inline-flex items-center justify-center w-11 h-11 -mr-2 rounded-full text-ivory transition-colors hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[60] md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 bg-obsidian/70 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 h-full w-full max-w-sm bg-charcoal border-l border-line flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
            >
              <div className="flex items-center justify-between h-16 px-6 border-b border-line/60">
                <span className="text-[0.65rem] uppercase tracking-[0.35em] text-gold/80">
                  Menu
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center w-11 h-11 -mr-2 rounded-full text-ivory/70 transition-colors hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" aria-hidden="true" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-6 py-8" aria-label="Mobile navigation">
                <ul className="space-y-1" role="list">
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.id}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 * index + 0.1, duration: 0.3 }}
                    >
                      <Link
                        href={hrefFor(link)}
                        onClick={() => setIsMobileMenuOpen(false)}
                        aria-current={isActive(link) ? 'true' : undefined}
                        className={`flex items-baseline gap-4 py-4 border-b border-line/40 font-display text-2xl transition-colors ${
                          isActive(link)
                            ? 'text-gold'
                            : 'text-ivory hover:text-gold'
                        }`}
                      >
                        <span className="text-[0.6rem] font-sans tracking-[0.3em] text-ivory/60">
                          0{index + 1}
                        </span>
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="px-6 pb-8 pt-6 border-t border-line/60 space-y-5">
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-full bg-gold text-obsidian font-semibold transition-colors hover:bg-gold-soft"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  Enquire on WhatsApp
                </a>
                <p className="text-center text-xs text-ivory/60">{WHATSAPP_DISPLAY}</p>

                <div className="flex items-center justify-center gap-3">
                  {socialIcons.map(({ href, label, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-line text-ivory/70 transition-colors hover:text-gold hover:border-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
