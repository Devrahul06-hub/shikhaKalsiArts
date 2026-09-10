import type { Metadata, Viewport } from 'next'
import { fontDisplay, fontBody } from './fonts'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { JsonLd } from '@/components/JsonLd'
import { siteUrl } from '@/lib/site'
import { LenisProvider } from '@/components/LenisProvider'
import MotionProvider from '@/components/MotionProvider'
import { ScrollProgress } from '@/components/motion/ScrollProgress'

export const metadata: Metadata = {
  title: {
    default: 'Shikha Kalsi Arts | Sculpture & Architectural Studio',
    template: '%s | Shikha Kalsi Arts',
  },
  description: 'Studio producing large-scale fiber composite sculptures and architectural installations for commissions, public art, and brand mascots.',
  keywords: [
    'sculpture',
    'architectural sculpture',
    'public art',
    'commissioned sculpture',
    'fiber composite sculpture',
    'Shikha Kalsi',
  ],
  authors: [{ name: 'Shikha Kalsi Arts' }],
  creator: 'Shikha Kalsi Arts',
  publisher: 'Shikha Kalsi Arts',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Shikha Kalsi Arts',
    title: 'Shikha Kalsi Arts | Sculpture & Architectural Studio',
    description: 'Studio producing large-scale sculptures and architectural installations for commissions and public art.',
    images: [
      {
        url: '/assets/WhatsApp Image 2026-08-14 at 20.54.51.jpeg',
        width: 1200,
        height: 630,
        alt: 'Shikha Kalsi Arts - Sculpture & Architectural Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shikha Kalsi Arts | Sculpture & Architectural Studio',
    description: 'Studio producing large-scale fiber composite sculptures and architectural installations for commissions, public art, and brand mascots.',
    images: ['/assets/WhatsApp Image 2026-08-14 at 20.54.51.jpeg'],
    creator: '@shikhakalsiarts',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Add `verification: { google: '<real code>' }` once Search Console issues one.
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F9F6F0' },
    { media: '(prefers-color-scheme: dark)', color: '#2A2421' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${fontDisplay.variable} ${fontBody.variable} scroll-smooth`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body className="bg-obsidian text-ivory antialiased">
        <LenisProvider>
          <MotionProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 btn-primary"
          >
            Skip to main content
          </a>
          
          <ScrollProgress />
          <Navbar />

          {/* The hero supplies the page's single <h1>. */}
          <main id="main-content" role="main" className="min-h-screen">
            {children}
          </main>
          
          <Footer />

          <JsonLd type="ArtGallery" />
          <JsonLd type="LocalBusiness" />
          </MotionProvider>
        </LenisProvider>
      </body>
    </html>
  )
}