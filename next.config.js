/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // No remotePatterns on purpose: every image on the site is local, under
    // /public/assets. The previous `hostname: '**'` allowed any HTTPS host,
    // which makes /_next/image an open proxy — anyone could pass an arbitrary
    // ?url= and have the server fetch and re-encode it at our expense.
    // Add specific hostnames here if remote images are ever introduced.
    formats: ['image/avif', 'image/webp'],

    // Trimmed from the defaults (8 device + 8 image sizes). The catalogue page
    // renders 130+ images, and every breakpoint multiplies the srcset entries
    // in the HTML. Nothing on this site displays wider than the 1920 bucket.
    deviceSizes: [640, 828, 1080, 1920],
    imageSizes: [256, 384],
  },
  poweredByHeader: false,
}

module.exports = nextConfig
