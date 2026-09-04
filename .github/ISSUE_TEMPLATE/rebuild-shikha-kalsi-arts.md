name: Website rebuild — Shikha Kalsi Arts
about: Tasks to execute the Next.js rebuild aligning site with sculpture & architectural studio positioning
title: 'Rebuild: Shikha Kalsi Arts — studio site (mockup v2)'
labels: enhancement, rebuild, design
assignees: ''

---

## Summary
Rebuild the existing Next.js site to represent Shikha Kalsi as an architectural sculpture studio. Follow the provided mockups (homepage v2 and process page) and the design system (black/gold). Do not carry forward ceramics/shop product pages or fabricated testimonials.

## Acceptance Criteria
- Homepage matches mockup v2 structure and copy
- `/process` matches `process-craftsmanship-page.html`
- No ceramics content, prices, or fake testimonials remain
- Nav links: Home, Collections, Projects, Process, Commissions, Studio
- Responsive down to mobile per breakpoint rules
- Photo placeholders use the `ph` pattern and are clearly labeled
- SEO metadata updated for sculpture-studio positioning

## Tasks (subtasks)
- [ ] T1 — Port design system to Tailwind / globals.css (3h)
- [ ] T2 — Implement Homepage (mockup v2) components and layout (10h)
- [ ] T3 — Implement Process & Craftsmanship page (4h)
- [ ] T4 — Implement Collections & Collections/[slug] pages and data model (8h)
- [ ] T5 — Implement Projects/[slug] page and data model (6h)
- [ ] T6 — Implement Commission enquiry form + secure API route (6h)
- [ ] T7 — Remove/repurpose ceramics product data and UI elements (3h)
- [ ] T8 — Accessibility fixes from reports (6h)
- [ ] T9 — Image optimization and responsive delivery (4h)
- [ ] T10 — SEO & JSON-LD for project pages (5h)

## Notes / Questions for Shikha (leave as TODOs)
1. Provide real counts for stats strip (years active, pieces completed, countries served).\n2. Any client testimonials or permission to publish client names/logos?\n3. Confirm whether collections need individual piece pages or lightbox-only galleries.\n4. Commission form: inline modal or dedicated page?\n5. Keep or remove Shipping/Care pages for large sculpture logistics?

## Links
- Mockups (attached in repo root): `shikha-kalsi-arts-homepage-mockup__1_.html`, `process-craftsmanship-page.html`
- Current live: https://shikha-kalsi-arts.vercel.app
- A11y reports: `reports/`

---

Please assign and progress tasks in priority order (P0 first). Add follow-up PRs referencing this issue when ready.
