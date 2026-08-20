export function GET(request: Request) {
  const body = `User-agent: *
Allow: /
Sitemap: https://shikhakalsiarts.com/sitemap.xml
Host: https://shikhakalsiarts.com

# Disallow indexing of staging or private paths
Disallow: /private
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}
