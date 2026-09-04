'use client'

import { Reveal, RevealItem } from '@/components/motion/Reveal'
import { stagger } from '@/lib/motion'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'
import {
  InstagramIcon,
  LinkedInIcon,
  FacebookIcon,
} from '@/components/icons/SocialIcons'
import { socialLinks, whatsappUrl } from '@/lib/contact'

const commissionTypes = [
  {
    title: 'Devotional pieces',
    body: 'Deities, murtis, and shrine work, finished to suit the space they will live in.',
  },
  {
    title: 'Portrait commissions',
    body: 'Likenesses of people and pets, modelled from your photographs and hand-painted.',
  },
  {
    title: 'Bespoke gifting',
    body: 'One-off pieces for weddings, housewarmings, and corporate gifting.',
  },
]

const socials = [
  { name: 'Instagram', href: socialLinks.instagram, Icon: InstagramIcon },
  { name: 'LinkedIn', href: socialLinks.linkedin, Icon: LinkedInIcon },
  { name: 'Facebook', href: socialLinks.facebook, Icon: FacebookIcon },
]

export function PressMarquee() {
  return (
    <section
      id="press"
      className="relative py-24 lg:py-28 bg-obsidian border-t border-line/30"
      aria-labelledby="studio-heading"
    >
      <div className="section-container">
        <Reveal className="max-w-2xl">
          <p className="text-[0.65rem] uppercase tracking-[0.35em] text-gold mb-5">
            The studio
          </p>
          <h2
            id="studio-heading"
            className="font-display text-3xl lg:text-4xl font-medium text-ivory text-balance"
          >
            Every piece is made to order,
            <span className="text-gold"> by hand</span>
          </h2>
          <p className="mt-5 text-ivory/60 leading-relaxed">
            Shikha Kalsi works from her studio in Mumbai, taking on a limited number
            of commissions so each piece gets the time it needs — from the first
            reference image through modelling, finishing, and final painting.
          </p>
        </Reveal>

        <Reveal
          stagger={stagger.loose}
          delay={0.05}
          className="mt-14 grid gap-6 sm:grid-cols-3"
        >
          {commissionTypes.map((item, index) => (
            <RevealItem
              key={item.title}
              className="rounded-2xl border border-line/40 bg-charcoal/40 p-7 transition-[border-color,transform] duration-[180ms] ease-[cubic-bezier(0.65,0,0.35,1)] hover:border-gold/40 hover:-translate-y-1"
            >
              <span className="text-xs font-medium tracking-[0.2em] text-gold/70">
                0{index + 1}
              </span>
              <h3 className="mt-4 font-display text-xl text-ivory">{item.title}</h3>
              <p className="mt-3 text-sm text-ivory/60 leading-relaxed">
                {item.body}
              </p>
            </RevealItem>
          ))}
        </Reveal>

        <Reveal className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border border-line/40 bg-charcoal/30 px-7 py-6">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="text-sm text-ivory/60">Follow the studio</span>
            <div className="flex items-center gap-2.5">
              {socials.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Shikha Kalsi Arts on ${name}`}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-line text-ivory/70 transition-colors hover:text-gold hover:border-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 text-sm font-semibold text-gold transition-colors hover:text-gold-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm"
          >
            <WhatsAppIcon className="w-4 h-4" />
            Message the studio
          </a>
        </Reveal>
      </div>
    </section>
  )
}
