const siteUrl = 'https://shikhakalsiarts.com'

/**
 * The site is a single page with in-page anchors, so only "/" is a real,
 * indexable route. Anchor fragments are not separate URLs and must not be
 * listed here — an earlier version advertised /gallery, /process, /press and a
 * /shop/[slug] page per product, none of which resolve.
 */
export function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
    },
  })
}
