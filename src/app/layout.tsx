import type { Metadata, Viewport } from 'next'
import { fontDisplay, fontBody } from './fonts'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { JsonLd } from '@/components/JsonLd'
import { LenisProvider } from '@/components/LenisProvider'
import MotionProvider from '@/components/MotionProvider'

export const metadata: Metadata = {
  title: {
    default: 'Shikha Kalsi Arts | Handcrafted Clay Studio | Sculptural Ceramics & Tableware',
    template: '%s | Shikha Kalsi Arts',
  },
  description: 'Exclusive handmade clay studio creating sculptural ceramics, artisanal tableware, and limited edition collectible pieces. Each work embodies the wabi-sabi philosophy — finding beauty in imperfection. Handcrafted in Mumbai.',
  keywords: [
    'handmade ceramics',
    'sculptural pottery',
    'artisanal tableware',
    'limited edition ceramics',
    'clay art',
    'wood fired pottery',
    'ceramic art collectibles',
    'bespoke ceramic commissions',
    'Shikha Kalsi',
    'Mumbai ceramic studio',
  ],
  authors: [{ name: 'Shikha Kalsi Arts' }],
  creator: 'Shikha Kalsi Arts',
  publisher: 'Shikha Kalsi Arts',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://shikhakalsiarts.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://shikhakalsiarts.com',
    siteName: 'Shikha Kalsi Arts',
    title: 'Shikha Kalsi Arts | Handcrafted Clay Studio',
    description: 'Exclusive handmade clay studio creating sculptural ceramics, artisanal tableware, and limited edition collectible pieces.',
    images: [
      {
        url: '/assets/WhatsApp Image 2026-08-14 at 20.54.51.jpeg',
        width: 1200,
        height: 630,
        alt: 'Shikha Kalsi Arts - Handcrafted Clay Studio Gallery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shikha Kalsi Arts | Handcrafted Clay Studio',
    description: 'Exclusive handmade clay studio creating sculptural ceramics, artisanal tableware, and limited edition collectible pieces.',
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
  verification: {
    google: 'google-site-verification-code',
  },
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
      <body className="bg-cream text-clay antialiased">
        <LenisProvider>
          <MotionProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 btn-primary"
          >
            Skip to main content
          </a>
          
          <Navbar />

          <main id="main-content" role="main" className="min-h-screen">
            <h1 className="sr-only">Shikha Kalsi Arts — Handcrafted Clay Studio</h1>
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