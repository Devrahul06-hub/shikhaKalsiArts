# Shikha Kalsi Arts — Enhancement Log & Open Questions

Last updated: 2026-09-26.

## Contact model

All enquiries go to **WhatsApp** — there is no enquiry form and no form API on the site.
Single source of truth: `src/lib/contact.ts` (number, social URLs, `whatsappUrl()` builder).
Change the number or social links there and every CTA updates.

- WhatsApp: `+91 81043 90986` → `wa.me/918104390986`, with a pre-filled message per CTA.
- Instagram / LinkedIn / Facebook links live in the same file.

---

## Done

### Header / scroll (the "glitchy" problem)
Root causes found and fixed:
1. **Two smooth-scroll engines fighting.** `globals.css` had `html { scroll-behavior: smooth }`
   while Lenis was also driving scroll. Removed the CSS rule; Lenis now owns scrolling and
   routes in-page anchor clicks itself (`LenisProvider`).
2. **Binary class flip at `scrollY > 20`.** The header toggled a `glassmorphism` class, so
   momentum scrolling oscillating across that threshold made it strobe. Replaced with a
   motion-value-driven backdrop that fades over 0→120px and never re-renders React, plus
   hysteresis (condense at 120px, expand below 60px) on the logo.
3. **Height jump.** `py-6` → `py-4` on scroll changed header height. Now a constant
   `h-16 lg:h-20`.
4. **`transition-all duration-500` on a `backdrop-blur` element.** Animating backdrop-filter
   is expensive; the blur layer is now always mounted and only its opacity animates.
5. **112px empty band above the hero.** `main#main-content` had
   `padding-top: calc(96px + 1rem)`, so the transparent header sat over dead space instead of
   the hero image. Removed; the hero runs full-bleed under the header and anchored sections use
   `scroll-margin-top` instead.
6. Added a sliding gold active-section indicator (IntersectionObserver + `layoutId`), and the
   mobile menu now pauses Lenis (`lenis.stop()`) — `overflow: hidden` alone does not stop it.

### Typography
`font-display` was used on every heading in 12 components but was **never a valid class** —
`tailwind.config.ts` defined `serif`/`ui`, not `display`, so it generated no CSS. Separately,
`globals.css` redeclared `--font-display`/`--font-body` as a malformed `'Georgia, Times New Roman'`
(quoted as one font name) which overrode the real `next/font` variables. The site had been
rendering in the browser's default serif since it was built. Fixed both; Playfair Display +
Plus Jakarta Sans now actually render.

### Content honesty
- **Only 7 distinct images exist** in `public/assets`. The other 35 files (`vase-1-main.jpg`,
  `sculpture-2-detail-1.jpg`, `process-*.jpg`, `testimonial-*.jpg`, `hero-piece.jpg`) are
  byte-identical duplicates of those 7 under invented product names. Safe to delete.
- The Gallery was showing those 7 photos labelled as ceramics products ("Heritage Vessel",
  "Moon Jar — Limited Edition", "Ritual Bowl Collection"). Replaced with `src/data/works.ts`,
  which describes only what is visible in each photograph — no invented dimensions, editions,
  prices, or clients.
- Removed the "Trusted By: Public Art / Government Commissions / Interior Design Firms"
  badge row — those were unverified credentials.
- Removed placeholder `google-site-verification-code` and the fake `+91-22-XXXX-XXXX` phone
  from structured data (now uses the real WhatsApp number).

### Dead code removed (backed up, and recoverable via git)
- `src/lib/products.ts` — the fabricated 8-item ceramics catalog.
- `src/app/shop/[slug]/` and `src/app/shop/category/[category]/` — publicly routable ceramics
  product pages emitting `schema.org/Product` with `price: 0` and an empty currency.
- `src/components/InquiryModal.tsx` — unreachable (nothing set `open` to true).
- `src/app/api/{commission,inquiry,newsletter}/` — no form calls them any more.
- The Navbar's inline enquiry form, which called `preventDefault()` and closed the drawer
  without ever sending the data anywhere.

### Fixes
- `sitemap.xml` no longer advertises `/gallery`, `/process`, `/press` (anchors, not routes) or
  a `/shop/[slug]` per fake product at priority 0.9. Only `/` is listed.
- Footer's broken `#gallery?vases`-style links removed (everything after `#` is one fragment id,
  so they scrolled nowhere).
- Duplicate `<h1>` removed — the hero now supplies the page's only one.
- Hero had two mousemove handlers firing the same state; parallax now uses motion values and
  no longer re-renders on pointer move.
- `ProcessTimeline` ref-callback TypeScript error fixed (pre-existing).
- All low-opacity small text raised from `text-ivory/40` to `/60`: **axe-core now reports zero
  WCAG 2.1 AA violations** (previously failing contrast at 3.38:1).
- `prefers-reduced-motion` respected globally, and Lenis is skipped entirely for those users.

---

## Motion system

One library: **Framer Motion** for JS-driven animation, **Lenis** for scroll. No GSAP, no
`tailwindcss-animate` — mixing them would mean two competing animation runtimes.

Tokens live in `src/lib/motion.ts` and are mirrored as CSS custom properties in `globals.css`
(`--ease-expo-out`, `--ease-snappy`, `--motion-micro`). Change timing there, not per component.

- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out) for reveals, `cubic-bezier(0.65, 0, 0.35, 1)`
  for micro-interactions.
- Durations: 180ms micro-interactions, 600ms section reveals, 700ms hero entrance.
- Stagger: 45–80ms between siblings.
- Only `transform` and `opacity` are animated anywhere. `will-change` is applied to exactly two
  elements (the hero parallax wrapper and the scroll progress bar) — the only two that animate
  continuously.

### Why the hero entrance is CSS, not Framer Motion

The `<h1>` is this page's LCP element. Animating it from `opacity: 0` in JS meant it stayed
invisible until React hydrated, which measured as **2.26s of LCP "render delay"** under
Lighthouse's throttled CPU. Moving the hero entrance to a CSS keyframe (`.hero-enter` with a
per-element `--enter-delay`) means it starts on the first paint instead. **LCP 2.7s → 1.7s,
Performance 96 → 100.**

The rule that follows from this: anything above the fold animates in CSS; anything
scroll-triggered (which by definition happens after hydration) uses Framer Motion.

### Not implemented, and why

- **Route/page transitions** — this is a single page. Only `/` exists, so there is nothing to
  transition between. If routes are added later, a `template.tsx` cross-fade is the hook.
- **Number/stat counters** — there are no stats on the site. Adding "500+ pieces delivered"
  style figures would mean inventing credentials, which is the same problem that was cleaned up
  elsewhere on this site. Supply real figures and this becomes a ~20-line component.

### Verified

Production build, Lighthouse (mobile emulation, 4× CPU throttle):
Performance **100**, Accessibility **100**, Best Practices 96.
CLS **0**, Total Blocking Time **0ms**, "Avoid non-composited animations" reports nothing.
axe-core: **0 WCAG 2.1 AA violations**. No horizontal overflow at 390px or 1440px.
Under `prefers-reduced-motion`, all animated content resolves to `opacity: 1` — nothing is
left stuck invisible, which is the usual failure mode of `whileInView` reveals.

---

## Positioning vs. portfolio — resolved

This was an open question through several earlier passes: the site claimed
"large-scale fiber composite sculptures and architectural installations for
public spaces and brand collaborations", while the only photographs available
showed studio-scale devotional pieces.

The September 2026 catalogue import settles it. The claim is accurate and then
some — temple entrances and carved ceilings, a storefront facade, a fleet of
branded transit fittings, life-size animals, a walk-in shark, event scenography.
The hero copy and `layout.tsx` metadata no longer overstate anything.

## Other remaining items

- The homepage still draws on the original seven studio photographs via
  `src/data/works.ts`, so the same Buddha image appears in the hero, the homepage
  gallery, and process stage 04. Worth re-cutting the homepage from the catalogue
  now that 133 images are available.
- Delete the 35 duplicate image files in `public/assets` once nothing references them.
- `src/data/collections.ts` and `src/data/projects.ts` are unused stubs — either populate them
  or delete them (`src/data/works.ts` is what the Gallery reads).
- Confirm the Facebook URL: `facebook.com/share/v/14quA2z4ucn/` is a **video share link**, not
  a page URL. A `facebook.com/<pagename>` link would be more stable.
- Consider `next/image` `placeholder="blur"` on gallery images for a smoother load.


---

## Catalogue import (September 2026)

135 images imported from `~/Downloads/SKA_catalogue_images`, converted to JPEG
and capped at 1600px on the long edge with `sips` (the source set was 93 MB,
including a single 9.3 MB PNG; it is now 58 MB). They live in
`public/assets/catalogue/` with descriptive names.

`src/data/catalogue.ts` organises 133 of them into **26 projects across 6
categories**. Two were set aside: the studio logo, moved to
`public/assets/brand-logo.jpg` since it is a brand asset rather than portfolio,
and one redundant primed-animal shot.

`/gallery` now renders the whole catalogue with category filters, replacing the
three hardcoded projects. `src/data/recentWork.ts` and
`RecentWorkGallery.tsx` were superseded and removed.

### Renders are labelled, not hidden

Roughly a quarter of the catalogue is colourway and placement studies rather
than photographs of delivered pieces — the Dhyana and Buddha colourways, the
coral planter set, the planter range board, two clinic placement studies for the
knee sculpture, and the two interior mockups for the face reliefs.

These are genuinely useful for a made-to-order studio, so they are shown, but
carry a `Visualisation` stage badge with a dashed outline that reads differently
from the solid In progress / Finishing / Finished / Installed badges, and the
page header explains the distinction. Nothing reads as a delivered photograph
that isn't one.

### Grid

Column count follows image count so a project never strands one card beside two
empty cells: counts divisible by three go 3-up at `lg`, even counts go 2-up with
a shorter 4:3 crop so the wider cards don't tower.

### Performance

`next.config.js` trims `deviceSizes` to four buckets and `imageSizes` to two.
The defaults (8 and 8) multiplied srcset entries across 130+ images: 1330
entries and 417 KB of HTML, now 798 and 368 KB. Measured against a control
build with the defaults restored, the homepage is unaffected (97 vs 96, within
run-to-run noise) while `/gallery` gained two points.

Production build, Lighthouse (mobile emulation, 4× CPU throttle):

| Route | Performance | Accessibility | Best Practices | SEO |
| --- | --- | --- | --- | --- |
| `/` | 96–97 | 100 | 96 | 100 |
| `/gallery` | 96 | 100 | 96 | 100 |

CLS 0 and TBT 0 ms on both. axe-core reports no WCAG 2.1 AA violations on
`/gallery` with all 133 images rendered, none broken. No horizontal overflow at
390 px or 1440 px.

Note: an earlier entry above records the homepage at Performance 100 / LCP 1.7s.
Re-measuring the same homepage code now gives 96–97 / LCP 2.6s, and a control
build isolates the difference to measurement conditions rather than a code
change. Treat the numbers in this section as current.

### Still worth doing

- **Re-cut the homepage from the catalogue.** It still runs on the original
  seven photographs via `src/data/works.ts`.
- **`public/assets/brand-logo.jpg` is unused.** It is the studio's gold roundel
  logo and would serve well as a favicon and in the nav.
- **Several source images carry burned-in caption bars** ("Material: … Finish: …
  Made to order") from a print catalogue. They read fine but duplicate the
  captions the page already renders; cleaner crops would look better.
- **`Ceiling 2.jpeg` in `public/assets` is still the watermarked video grab** and
  is still not published. The catalogue has four clean ceiling photographs that
  supersede it, so the old file can be deleted.
- **The original 53 files in `public/assets`** (18 unique, 35 duplicates) are now
  only used by the homepage. Once the homepage is re-cut, that whole set can go.


---

## Image pipeline (September 2026)

The site was slow on first load after deploying. Measured cause: **on-demand
image optimization**, not page weight.

With Next's default optimizer, every width of every image is transformed at
request time. Measured locally with a cold cache, that was **~300ms per
transform** (444× slower than a warm hit), and scrolling `/gallery` fires ~94 of
them. The first visitor after every deploy paid all of it, and on Vercel it also
consumes image-optimization quota.

The photographs never change per request, so the work was moved to build time:

- `scripts/optimize-images.mjs` scans `src/` for referenced `/assets/…` images
  and emits WebP variants at 640/828/1080/1920 into `public/optimized/`.
  It never upscales and skips variants newer than their source.
- `src/lib/imageLoader.ts` is a custom `next/image` loader pointing at those
  files, so `next/image` still builds a real srcset — the work just happens
  ahead of time. `next.config.js` sets `loader: 'custom'`, which bypasses the
  runtime optimizer entirely.
- Wired into `npm run build`, so a deploy regenerates them (~22s for 396
  variants). `public/optimized/` is gitignored rather than adding 30MB to the
  repo.

The three width lists must stay in sync: `WIDTHS` in the script, `VARIANT_WIDTHS`
in the loader, and `deviceSizes` in `next.config.js`.

### Result

| | Before | After |
| --- | --- | --- |
| Image requests on `/gallery` | `/_next/image` transforms | static `.webp` files |
| Cold cost per image | ~300 ms | none (plain static serve) |
| Gallery Speed Index | 1.3 s | 0.9 s |
| Homepage initial view | 0.24 MB | 0.35 MB |
| Gallery initial view | 0.45 MB | 0.51 MB |
| Gallery, fully scrolled | 3.67 MB / 94 imgs | 6.89 MB / 133 imgs |

Lighthouse is unchanged (96 / 100 / 96 / 100 on both routes, CLS 0, TBT 0ms)
because it measures a **warm** server, where the old optimizer was also fast.
The win is specifically on cold requests, which is what a real visitor hits.

### The honest trade

Bytes went slightly **up**. Next's optimizer was serving AVIF via content
negotiation; the pre-built variants are WebP, which is ~40% larger at
equivalent quality. AVIF was rejected because ~5% of visitors (older Safari/iOS)
would get broken images, and serving both needs `<picture>` — a refactor across
six components. Latency mattered more than the bytes here.

If that changes, the upgrade path is a small `<picture>`-based component
emitting AVIF with a WebP fallback; the script already has the source images and
sharp can emit both.

Quality is WebP q68, chosen by comparing q60/68/75/78 against AVIF on three
representative images. Visually clean at card size.

### Also removed

`src/data/collections.ts` and `src/data/projects.ts` — unused stubs flagged in
earlier passes. One referenced `/assets/installation-1-main.jpg`, which does not
exist, and the optimizer surfaced it.

### Not done

- **58MB of master JPEGs in `public/assets` are deployed but never served** —
  only the WebP variants are requested now. They can't simply move out of
  `public/`, because two are referenced directly as Open Graph images
  (`layout.tsx` and `gallery/page.tsx`), and social scrapers want real URLs.
  Worth restructuring if deploy size becomes a problem.
- **Blur placeholders.** Cards use a `bg-charcoal` background so images don't
  pop from white, which covers most of the benefit. `placeholder="blur"` with a
  custom loader needs `blurDataURL` generated into a lookup map.


---

## Broken images on Retina displays (fixed, 2026-09-26)

The image pipeline above shipped with a real bug: most of the gallery was
broken for anyone on a high-DPI screen.

**Cause.** `optimize-images.mjs` skipped any width larger than the source, to
avoid upscaling. Catalogue sources are capped at 1600px, so the 1920 variant
was never generated for anything — but `next/image` still put 1920 in every
srcset and used it as the fallback `src`. The loader derives the filename from
the requested width alone; it has no idea which files exist. So a browser
asking for the largest variant got a 404.

| Device pixel ratio | Broken images on /gallery |
| --- | --- |
| 1 | 0 of 133 |
| 2 (Retina) | **83 of 133** |
| 3 | **133 of 133** |

**Why it got through.** The verification after the pipeline change only ran at
DPR 1, where the browser never requests anything above the 640 variant. The
gaps were invisible at that one setting. Any check of responsive images has to
cover DPR 2 and 3 — that is where the larger srcset entries are exercised.

**Fix.** Generate every width for every image. `withoutEnlargement` still
prevents upscaling, so a 1600px source is written at 1600px under the `-1920`
name; the URL resolves and the bytes are honest. The script now also fails the
build if any expected variant is missing, rather than shipping 404s.

**Also added a 1280 bucket.** The 2-up collections render ~620px cards, which
at DPR 2 need ~1240px — with the old ladder that jumped straight to 1920.
Adding 1280 cut the DPR-2 initial view from 1.29 MB to 1.07 MB.

Three lists must stay in sync: `WIDTHS` (script), `VARIANT_WIDTHS` (loader),
`deviceSizes` (next.config.js). All three are now `[640, 828, 1080, 1280, 1920]`.

Verified after the fix: 0 broken images and 0 404s across DPR 1, 2 and 3 on the
homepage, the gallery, and the lightbox, plus mobile at DPR 3. Lighthouse
unchanged at 96 / 100 / 96 / 100 on both routes, CLS 0, TBT 0ms.
