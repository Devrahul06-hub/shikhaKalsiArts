const siteUrl = 'https://shikhakalsiarts.com'

/**
 * Only real, indexable routes belong here. In-page anchors (#gallery, #process,
 * #press) are not separate URLs — an earlier version listed them as pages, plus
 * a /shop/[slug] per product, none of which resolved.
 */
const routes = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  { path: '/gallery', priority: '0.9', changefreq: 'monthly' },
]

export function GET() {
  const lastmod = new Date().toISOString()

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${siteUrl}${route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
    },
  })
}
