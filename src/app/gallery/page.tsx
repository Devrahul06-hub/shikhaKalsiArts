import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { CatalogueGallery } from '@/components/CatalogueGallery'
import { WhatsAppFab } from '@/components/WhatsAppFab'
import { collections, totalImages } from '@/data/catalogue'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'The Shikha Kalsi Arts catalogue: temple entrances, storefront facades, brand activations, life-size animals, oversized objects and interior pieces — shown from clay through to installation.',
  alternates: { canonical: '/gallery' },
  openGraph: {
    title: 'Work | Shikha Kalsi Arts',
    description:
      'Temple entrances, storefront facades, brand activations, life-size animals and oversized objects — from clay through to installation.',
    url: '/gallery',
    images: [
      {
        url: '/assets/catalogue/temple-elephants-installed.jpg',
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
            {collections.length} projects · {totalImages} photographs
          </p>
          <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.08] text-ivory tracking-tight text-balance">
            Everything the studio
            <span className="text-gold"> has made</span>
          </h1>
          <p className="mt-6 text-lg text-ivory/65 leading-relaxed">
            Temple entrances and carved ceilings, storefronts and brand
            activations, life-size animals, everyday objects rebuilt many times
            their size. Almost all of it made once, to a brief — so each project is
            shown from clay through to the day it was installed.
          </p>

          <p className="mt-5 text-sm text-ivory/50 leading-relaxed">
            Pieces offered in more than one finish also show colourway studies.
            Those are marked <span className="text-ivory/70">Visualisation</span> —
            they are renders of available options, not photographs of delivered
            work.
          </p>
        </header>

        <div className="mt-16">
          <CatalogueGallery />
        </div>
      </div>

      <WhatsAppFab />
    </>
  )
}
