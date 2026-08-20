import { ClayProduct } from '@/lib/products'

interface JsonLdProps {
  type: 'ArtGallery' | 'LocalBusiness' | 'Product'
  data?: ClayProduct | ClayProduct[]
}

export function JsonLd({ type, data }: JsonLdProps) {
  const baseUrl = 'https://shikhakalsiarts.com'

  const schemas = {
    ArtGallery: {
      '@context': 'https://schema.org',
      '@type': 'ArtGallery',
      name: 'Shikha Kalsi Arts',
      description: 'Exclusive handmade clay studio creating sculptural ceramics, functional tableware, and limited edition art pieces. Each piece is handcrafted by artist Shikha Kalsi using traditional pottery techniques.',
      url: baseUrl,
      logo: `${baseUrl}/assets/WhatsApp Image 2026-08-14 at 20.54.51.jpeg`,
      image: `${baseUrl}/assets/WhatsApp Image 2026-08-14 at 20.54.51.jpeg`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Studio 12, Artisan Quarter',
        addressLocality: 'Mumbai',
        addressRegion: 'Maharashtra',
        postalCode: '400001',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '19.0760',
        longitude: '72.8777',
      },
      telephone: '+91-22-XXXX-XXXX',
      email: 'hello@shikhakalsiarts.com',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '10:00',
          closes: '18:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Saturday',
          opens: '11:00',
          closes: '16:00',
        },
      ],
      priceRange: '$$$',
      currenciesAccepted: 'USD INR',
      paymentAccepted: 'Cash, Credit Card, Bank Transfer',
      sameAs: [
        'https://instagram.com/shikhakalsiarts',
        'https://facebook.com/shikhakalsiarts',
        'https://pinterest.com/shikhakalsiarts',
      ],
    },
    LocalBusiness: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Shikha Kalsi Arts',
      description: 'Luxury handmade clay studio specializing in sculptural ceramics, artisanal tableware, and limited edition collectible pieces.',
      url: baseUrl,
      logo: `${baseUrl}/assets/WhatsApp Image 2026-08-14 at 20.54.51.jpeg`,
      image: `${baseUrl}/assets/WhatsApp Image 2026-08-14 at 20.54.52.jpeg`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Studio 12, Artisan Quarter',
        addressLocality: 'Mumbai',
        addressRegion: 'Maharashtra',
        postalCode: '400001',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '19.0760',
        longitude: '72.8777',
      },
      telephone: '+91-22-XXXX-XXXX',
      email: 'hello@shikhakalsiarts.com',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '10:00',
          closes: '18:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Saturday',
          opens: '11:00',
          closes: '16:00',
        },
      ],
      priceRange: '$$$',
      currenciesAccepted: 'USD INR',
      paymentAccepted: 'Cash, Credit Card, Bank Transfer',
      areaServed: 'Worldwide',
      sameAs: [
        'https://instagram.com/shikhakalsiarts',
        'https://facebook.com/shikhakalsiarts',
        'https://pinterest.com/shikhakalsiarts',
      ],
    },
    Product: (product: ClayProduct) => ({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.seoDescription,
      sku: product.id,
      brand: {
        '@type': 'Brand',
        name: 'Shikha Kalsi Arts',
      },
      image: product.images.map(img => `${baseUrl}${img}`),
      offers: {
        '@type': 'Offer',
        url: `${baseUrl}/shop/${product.slug}`,
        priceCurrency: product.currency,
        price: product.price,
        availability: product.isLimitedEdition 
          ? 'https://schema.org/LimitedAvailability' 
          : 'https://schema.org/InStock',
        seller: {
          '@type': 'Organization',
          name: 'Shikha Kalsi Arts',
        },
        ...(product.isLimitedEdition && product.totalEdition && {
          eligibleQuantity: {
            '@type': 'QuantitativeValue',
            value: product.totalEdition,
          },
        }),
      },
      material: product.clayType,
      color: product.finish,
      weight: {
        '@type': 'QuantitativeValue',
        value: parseFloat(product.weight),
        unitCode: 'KGM',
      },
      dimensions: {
        '@type': 'QuantitativeValue',
        height: product.dimensions.height,
        width: product.dimensions.width,
        depth: product.dimensions.depth,
      },
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: 'Firing Temperature',
          value: product.firingTemperature,
        },
        {
          '@type': 'PropertyValue',
          name: 'Category',
          value: product.category,
        },
        {
          '@type': 'PropertyValue',
          name: 'Finish',
          value: product.finish,
        },
        ...(product.isLimitedEdition && product.totalEdition ? [{
          '@type': 'PropertyValue',
          name: 'Edition',
          value: `${product.editionNumber} of ${product.totalEdition}`,
        }] : []),
      ],
      isVariantOf: product.isLimitedEdition ? undefined : {
        '@type': 'ProductModel',
        name: `${product.category} Collection`,
      },
    }),
  }

  let jsonLd: object

  switch (type) {
    case 'ArtGallery':
      jsonLd = schemas.ArtGallery
      break
    case 'LocalBusiness':
      jsonLd = schemas.LocalBusiness
      break
    case 'Product':
      if (Array.isArray(data)) {
        jsonLd = {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: data.map((product, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: schemas.Product(product),
          })),
        }
      } else if (data) {
        jsonLd = schemas.Product(data)
      } else {
        return null
      }
      break
    default:
      return null
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}