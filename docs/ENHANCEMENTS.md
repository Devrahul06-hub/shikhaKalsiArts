# Shikha Kalsi Arts — Enhancement Log & Open Questions

Last updated: 2026-09-04.

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

## Open question — positioning vs. portfolio

The site copy describes a studio doing **"large-scale fiber composite sculptures and
architectural installations for public spaces and brand collaborations"**, and the hero
credentials still read "Large-scale commissions" / "Public art & installations".

The 7 actual photographs show something different: **studio-scale devotional and figurative
work** — a chrome Ganesha, a terracotta meditation bust, a lotus Buddha, a seated Buddha, a
terracotta deity relief, a hand-painted pet portrait, and a gold-leaf eagle.

I rewrote the Gallery, Studio, and Process sections to match what the photos actually show, but
**left the hero headline, hero credentials, and `layout.tsx` SEO metadata as-is** — whether the
studio genuinely takes large-scale architectural work is a business fact I can't verify.

**Decide one of:**
- The studio does do large-scale/public work → supply photos of it, and revert the Gallery
  and Process copy toward that positioning.
- The studio's focus is devotional/figurative/portrait commissions → update the hero headline,
  hero credential list, and the `description`/`keywords` in `src/app/layout.tsx`, which still
  say "architectural installations" and "public art".

## Other remaining items

- Supply real photography. Seven images (several of which look like renders/stock styling) is
  thin for a portfolio, and the same Buddha photo currently appears in the hero, the gallery,
  and process stage 04.
- Delete the 35 duplicate image files in `public/assets` once nothing references them.
- `src/data/collections.ts` and `src/data/projects.ts` are unused stubs — either populate them
  or delete them (`src/data/works.ts` is what the Gallery reads).
- Confirm the Facebook URL: `facebook.com/share/v/14quA2z4ucn/` is a **video share link**, not
  a page URL. A `facebook.com/<pagename>` link would be more stable.
- Consider `next/image` `placeholder="blur"` on gallery images for a smoother load.
