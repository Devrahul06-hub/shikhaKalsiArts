/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Images are pre-built to WebP by scripts/optimize-images.mjs and served as
    // plain static files via src/lib/imageLoader.ts, so Next's on-demand
    // optimizer is never invoked.
    //
    // The catalogue is 130+ static photographs. On-demand optimization measured
    // ~300ms per cold transform, with ~94 firing while scrolling /gallery — a
    // cost the first visitor after every deploy paid in full, and one that also
    // consumes Vercel's image-optimization quota. The photographs do not change
    // per request, so that work belongs at build time.
    //
    // No remotePatterns on purpose: every image is local, under /public.
    // A wildcard host would turn the optimizer into an open proxy.
    loader: 'custom',
    loaderFile: './src/lib/imageLoader.ts',

    // Must stay in sync with WIDTHS in scripts/optimize-images.mjs and
    // VARIANT_WIDTHS in src/lib/imageLoader.ts.
    deviceSizes: [640, 828, 1080, 1280, 1920],
    imageSizes: [256, 384],
  },
  poweredByHeader: false,
}

module.exports = nextConfig
