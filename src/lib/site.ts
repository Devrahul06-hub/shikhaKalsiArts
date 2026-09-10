/**
 * Canonical public URL for the site.
 *
 * Set NEXT_PUBLIC_SITE_URL in the hosting provider's environment variables to
 * the real domain (no trailing slash), e.g. https://example.com. Everything
 * that needs an absolute URL — metadataBase, Open Graph, robots.txt,
 * sitemap.xml, JSON-LD — reads from here, so the domain is configured in one
 * place rather than hardcoded in six files.
 *
 * On Vercel, NEXT_PUBLIC_VERCEL_URL is populated automatically, so preview and
 * production deployments emit correct absolute URLs before a custom domain is
 * attached.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (explicit) return explicit.replace(/\/+$/, '')

  const vercel = process.env.NEXT_PUBLIC_VERCEL_URL?.trim()
  if (vercel) return `https://${vercel.replace(/\/+$/, '')}`

  // Local development fallback.
  return 'http://localhost:3000'
}

export const siteUrl = resolveSiteUrl()

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path = '/'): string {
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`
}
