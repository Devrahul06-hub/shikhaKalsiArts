/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // No remotePatterns on purpose: every image on the site is local, under
    // /public/assets. The previous `hostname: '**'` allowed any HTTPS host,
    // which makes /_next/image an open proxy — anyone could pass an arbitrary
    // ?url= and have the server fetch and re-encode it at our expense.
    // Add specific hostnames here if remote images are ever introduced.
    formats: ['image/avif', 'image/webp'],
  },
  poweredByHeader: false,
}

module.exports = nextConfig
