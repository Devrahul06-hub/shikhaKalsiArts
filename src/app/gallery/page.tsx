import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { RecentWorkGallery } from '@/components/RecentWorkGallery'
import { WhatsAppFab } from '@/components/WhatsAppFab'
import { recentImageCount, recentProjects } from '@/data/recentWork'

export const metadata: Metadata = {
  title: 'Recent Work',
  description:
    'Recent large-scale commissions from the Shikha Kalsi Arts studio: temple entrance elephants, a sculpted storefront facade, and an oversized tabla — shown from clay through to installation.',
  alternates: { canonical: '/gallery' },
  openGraph: {
    title: 'Recent Work | Shikha Kalsi Arts',
    description:
      'Temple entrance elephants, a sculpted storefront facade, and an oversized tabla — from clay through to installation.',
    url: '/gallery',
    images: [
      {
        url: '/assets/Elephant 1.1.jpeg',
        width: 1200,
        height: 630,
        alt: 'Carved temple entrance with elephant sculptures by Shikha Kalsi Arts',
      },
    ],
  },
}

export default function GalleryPage() {
  return (
    <>
      <div className="section-container pt-28 pb-20 lg:pt-36 lg:pb-28">
        <header className="max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-ivory/60 transition-colors hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to studio
          </Link>

          <p className="mt-10 text-[0.65rem] uppercase tracking-[0.35em] text-gold">
            Recently added · {recentImageCount} photographs
          </p>
          <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.08] text-ivory tracking-tight text-balance">
            Latest from
            <span className="text-gold"> the studio</span>
          </h1>
          <p className="mt-6 text-lg text-ivory/65 leading-relaxed">
            Three recent large-scale commissions, photographed from clay through to
            installation. Most of what leaves the studio is one of a kind, so these
            are shown as projects rather than a catalogue.
          </p>

          <ul
            className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ivory/60"
            role="list"
          >
            {recentProjects.map((project) => (
              <li key={project.id} className="flex items-center gap-2.5">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-gold"
                  aria-hidden="true"
                />
                {project.title}
              </li>
            ))}
          </ul>
        </header>

        <div className="mt-20 lg:mt-24">
          <RecentWorkGallery />
        </div>
      </div>

      <WhatsAppFab />
    </>
  )
}
