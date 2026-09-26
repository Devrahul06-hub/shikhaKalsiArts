/**
 * Custom next/image loader.
 *
 * Points every image at the WebP variants that `scripts/optimize-images.mjs`
 * emits at build time, so images are served as plain static files from the CDN
 * and Next's on-demand optimizer is never invoked. next/image still builds a
 * real srcset from these, so responsive selection is unchanged — the work just
 * happens at build time instead of on the first request.
 *
 * Anything outside /assets (or any format without variants) is returned
 * untouched.
 */

/** Must stay in sync with WIDTHS in scripts/optimize-images.mjs. */
const VARIANT_WIDTHS = [640, 828, 1080, 1280, 1920]

export default function imageLoader({
  src,
  width,
}: {
  src: string
  width: number
  quality?: number
}): string {
  if (!src.startsWith('/assets/') || !/\.(jpe?g|png)$/i.test(src)) return src

  // Snap to the smallest generated width that covers the request, so we never
  // ask for a variant that was skipped as an upscale.
  const target =
    VARIANT_WIDTHS.find((w) => w >= width) ??
    VARIANT_WIDTHS[VARIANT_WIDTHS.length - 1]

  const withoutPrefix = src.replace(/^\/assets\//, '')
  const dir = withoutPrefix.includes('/')
    ? withoutPrefix.slice(0, withoutPrefix.lastIndexOf('/') + 1)
    : ''
  const base = withoutPrefix
    .slice(withoutPrefix.lastIndexOf('/') + 1)
    .replace(/\.[^.]+$/, '')

  // Filenames keep their spaces; encode per-segment so they survive as URLs.
  return `/optimized/${dir}${encodeURIComponent(base)}-${target}.webp`
}
