# Deploying

The repo is deploy-ready. Nothing is currently hosted — as of this writing
`shikhakalsiarts.com` does not resolve, and no host is connected to the repo.

- **Repo:** `Devrahul06-hub/shikhaKalsiArts`, branch `main`
- **Framework:** Next.js 14 (App Router)
- **Build:** `npm run build` · **Start:** `npm start` · **Node:** 18.17+ (20 LTS recommended)
- **Output:** all routes prerender as static; no database, no API routes, no secrets

## 1. Set the domain

One environment variable controls every absolute URL on the site
(`metadataBase`, Open Graph tags, `robots.txt`, `sitemap.xml`, and JSON-LD):

```
NEXT_PUBLIC_SITE_URL=https://your-domain.com     # no trailing slash
```

**This is read at build time**, because `robots.txt` and `sitemap.xml` are
prerendered during `next build`. Changing it later requires a redeploy, not
just a restart.

If it is unset, the site falls back to `NEXT_PUBLIC_VERCEL_URL` (populated
automatically on Vercel, so preview deploys are correct), and then to
`http://localhost:3000`. Leaving it unset in production means canonical URLs
and social preview cards point at the deployment URL rather than the domain.

See `.env.example`.

## 2. Deploy

### Vercel (recommended for this stack)

Next.js is auto-detected; no `vercel.json` is needed.

1. vercel.com/new → import `Devrahul06-hub/shikhaKalsiArts`
2. Framework preset: **Next.js**. Leave build command, output directory, and
   install command at their defaults.
3. Add `NEXT_PUBLIC_SITE_URL` under Environment Variables (Production scope).
4. Deploy. Pushes to `main` then deploy automatically.
5. Project → Settings → Domains → add the domain, then point DNS as instructed.

### Netlify

Needs the official adapter, or `next/image` and the route handlers will not
work:

```bash
npm install -D @netlify/plugin-nextjs
```

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Anything else (VPS, Docker, Render, Fly)

```bash
npm ci
NEXT_PUBLIC_SITE_URL=https://your-domain.com npm run build
npm start      # serves on $PORT, default 3000
```

Put it behind a reverse proxy terminating TLS. Keep the Node process running
under a supervisor (pm2, systemd).

### What will not work: static export

`next export` / `output: 'export'` breaks two things this site relies on — the
`next/image` optimizer, and the `robots.txt` / `sitemap.xml` route handlers.
Don't use GitHub Pages or a plain static bucket without accounting for both.

## 3. After the first deploy

- [ ] Load `/` and `/gallery` on the real domain
- [ ] Check `/robots.txt` and `/sitemap.xml` show the correct domain
- [ ] Test a WhatsApp CTA on a phone — it should open the app, not the web page
- [ ] Submit the sitemap in Google Search Console
- [ ] Add the verification code to `metadata.verification.google` in
      `src/app/layout.tsx` (the placeholder was removed; the key is currently absent)

## Known gaps to settle before or shortly after launch

These are content decisions, not blockers. Detail in `docs/ENHANCEMENTS.md`.

1. **`public/assets/Ceiling 2.jpeg` is not published.** It is a screen capture
   from a video and still has another channel's logo, a "SUBSCRIBE NOW" button,
   and a playback progress bar in the frame. Replace it with the studio's own
   photograph before adding it to `src/data/recentWork.ts`.
2. **`public/assets/Tabla 5.png` may be a render, not a photograph** — the
   framed artwork behind it has garbled text. If it is a visualisation, the
   caption should say so. It is also a 1.3 MB PNG of a photo; re-export as JPEG.
3. **35 duplicate images** in `public/assets` (`vase-1-main.jpg`,
   `process-*.jpg`, `testimonial-*.jpg`, …) are byte-identical copies of other
   files under invented names. Nothing references them; safe to delete.
4. **Two photographs show identifiable people** (a craftsman, and a person
   standing with the elephants). Confirm both are happy to appear publicly.
5. **`src/data/collections.ts` and `src/data/projects.ts` are unused stubs.**
   The gallery reads `works.ts` and `recentWork.ts`. Delete or populate them.
6. **The Facebook link is a video share URL**
   (`facebook.com/share/v/14quA2z4ucn/`), not a page URL. A
   `facebook.com/<pagename>` link is more stable. Set in `src/lib/contact.ts`.

## Verified before handoff

Production build, Lighthouse under mobile emulation with 4× CPU throttling:

| Route | Performance | Accessibility | Best Practices | SEO |
| --- | --- | --- | --- | --- |
| `/` | 100 | 100 | 96 | — |
| `/gallery` | 97 | 100 | 96 | 100 |

CLS 0 and Total Blocking Time 0 ms on both. axe-core reports no WCAG 2.1 AA
violations. No horizontal overflow at 390 px or 1440 px. `tsc --noEmit` clean.
