'use client'

import { Globe, Ship, Wrench, CheckCircle2, MessagesSquare } from 'lucide-react'
import { Reveal, RevealItem } from '@/components/motion/Reveal'
import { stagger } from '@/lib/motion'

/**
 * Copy supplied by the studio.
 *
 * Her draft gave timelines as "[X–Y] weeks to make, plus [2–6] weeks sea
 * freight" — placeholders she had not filled in. Rather than publish brackets
 * or invent figures, the Timelines point says how the number is arrived at.
 * Swap in the real ranges here once they are confirmed.
 */
const points = [
  {
    icon: Ship,
    title: 'Shipping',
    body: 'Pieces are packed in custom export crates and shipped by sea or air. We can quote ex-works or delivered to your port, with freight arranged through our logistics partner.',
  },
  {
    icon: Wrench,
    title: 'Installation',
    body: 'Every piece comes with an installation guide and fixing details. We support your local team over video, and our team can travel for on-site installation on larger projects — travel quoted separately.',
  },
  {
    icon: CheckCircle2,
    title: 'Approvals',
    body: 'You approve the work at each stage through progress photos and video calls, so nothing is a surprise when it arrives.',
  },
  {
    icon: Globe,
    title: 'Timelines',
    body: 'Make time depends on the size and finish of the piece, and sea freight adds further weeks depending on destination. Both are confirmed in writing with your quotation.',
  },
  {
    icon: MessagesSquare,
    title: 'Communication',
    body: 'Email, video calls and WhatsApp, with replies within one working day.',
  },
]

export function InternationalClients() {
  return (
    <section
      id="international"
      className="relative py-24 lg:py-28 bg-obsidian border-t border-line/30"
      aria-labelledby="international-heading"
    >
      <div className="section-container">
        <Reveal className="max-w-2xl">
          <p className="text-[0.65rem] uppercase tracking-[0.35em] text-gold mb-5">
            Export &amp; overseas commissions
          </p>
          <h2
            id="international-heading"
            className="font-display text-3xl lg:text-4xl font-medium text-ivory text-balance"
          >
            Working with
            <span className="text-gold"> international clients</span>
          </h2>
          <p className="mt-5 text-ivory/65 leading-relaxed">
            We are a Mumbai-based studio now taking on commissions outside India.
            Every piece is made to order in our workshop and crated for sea or air
            freight.
          </p>
        </Reveal>

        <Reveal
          stagger={stagger.tight}
          delay={0.05}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {points.map(({ icon: Icon, title, body }) => (
            <RevealItem
              key={title}
              className="rounded-2xl border border-line/40 bg-charcoal/40 p-7 transition-[border-color,transform] duration-[180ms] ease-[cubic-bezier(0.65,0,0.35,1)] hover:border-gold/40 hover:-translate-y-1"
            >
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-gold/10 border border-gold/25 text-gold">
                <Icon className="w-5 h-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-xl text-ivory">{title}</h3>
              <p className="mt-3 text-sm text-ivory/65 leading-relaxed">{body}</p>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

export default InternationalClients
