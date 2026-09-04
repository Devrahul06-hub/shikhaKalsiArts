import { socialLinks, WHATSAPP_DISPLAY } from '@/lib/contact'

/**
 * Structured data for the studio.
 *
 * Deliberately no schema.org Product/Offer: the studio works to commission and
 * does not publish fixed prices, and the previous Product markup emitted
 * `price: 0` with an empty currency for every piece.
 */
interface JsonLdProps {
  type: 'ArtGallery' | 'LocalBusiness'
}

const baseUrl = 'https://shikhakalsiarts.com'
const telephone = `+${WHATSAPP_DISPLAY.replace(/[^\d]/g, '')}`

const sharedDetails = {
  name: 'Shikha Kalsi Arts',
  url: baseUrl,
  image: `${baseUrl}/assets/WhatsApp Image 2026-08-14 at 20.54.52.jpeg`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Mumbai',
    addressRegion: 'Maharashtra',
    addressCountry: 'IN',
  },
  telephone,
  sameAs: [socialLinks.instagram, socialLinks.linkedin, socialLinks.facebook],
}

export function JsonLd({ type }: JsonLdProps) {
  const schemas = {
    ArtGallery: {
      '@context': 'https://schema.org',
      '@type': 'ArtGallery',
      description:
        'Studio producing hand-finished devotional and figurative sculpture, along with commissioned portrait pieces.',
      ...sharedDetails,
    },
    LocalBusiness: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      description:
        'Sculpture studio in Mumbai taking commissions for devotional, figurative, and portrait work.',
      areaServed: 'Worldwide',
      ...sharedDetails,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas[type]) }}
    />
  )
}
