import { siteUrl } from '@/lib/site'

export function GET() {
  const body = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
