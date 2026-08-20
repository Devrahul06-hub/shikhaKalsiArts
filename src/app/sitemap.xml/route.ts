import { products } from '@/lib/products'

const siteUrl = 'https://shikhakalsiarts.com'

export function GET() {
  const pages = ['/', '/gallery', '/process', '/press']

  const urls = [
    ...pages.map((p) => ({ loc: `${siteUrl}${p}`, priority: 0.8 })),
    ...products.map((product) => ({ loc: `${siteUrl}/shop/${product.slug}`, priority: 0.9 })),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
      .map(
        (u) => `
      <url>
        <loc>${u.loc}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>${u.priority}</priority>
      </url>`
      )
      .join('')}
  </urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
    },
  })
}
