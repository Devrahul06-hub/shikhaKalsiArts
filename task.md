# Shikha Kalsi Arts - Development Task Tracker

## Project Overview
Building a luxury artisanal e-commerce website for "Shikha Kalsi Arts" - an exclusive handmade clay studio. The site combines Awwwards-level visual experience with top-tier Google SEO optimization.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, Lenis Smooth Scroll, Lucide React

---

## ✅ COMPLETED

### Project Infrastructure
- [x] Next.js 14 App Router project initialized
- [x] TypeScript configuration
- [x] Tailwind CSS with custom design system (colors, fonts, animations)
- [x] PostCSS configuration
- [x] Next.js config with image optimization
- [x] Google Fonts integration (Playfair Display + Plus Jakarta Sans)
- [x] Global CSS with design system utilities
- [x] Dependencies installed (framer-motion, lucide-react, @studio-freight/lenis)

### Core Components Created
- [x] **Navbar.tsx** - Floating glassmorphism nav with mobile drawer, contact drawer, shopping bag
- [x] **Hero.tsx** - Parallax scroll, 3D tilt interaction, staggered entrance animations
- [x] **Gallery.tsx** - Filterable grid, quick-view lightbox modal, 3D hover tilt effects
- [x] **ProcessTimeline.tsx** - 4-stage scroll-driven story with IntersectionObserver
- [x] **JsonLd.tsx** - Schema.org structured data (ArtGallery, LocalBusiness, Product)
- [x] **products.ts** - 8 structured clay products with full metadata

### SEO Infrastructure
- [x] Dynamic metadata structure ready
- [x] JSON-LD structured data components
- [x] Semantic HTML5 structure in components
- [x] Optimized next/image usage with SEO alt tags
- [x] Product data includes seoAlt and seoDescription fields

### Design System
- [x] Color palette: Cream (#F9F6F0), Clay (#2A2421), Terracotta (#C05A3E), Ochre (#D49B4B), Sage (#8A9A86)
- [x] Typography: Playfair Display (headers), Plus Jakarta Sans (body)
- [x] Glassmorphism utility classes
- [x] Button variants (primary, secondary)
- [x] Input field styling
- [x] Marquee animation keyframes

---

## 🔄 IN PROGRESS / NEEDS COMPLETION

### Main App Layout & Pages
- [x] **src/app/layout.tsx** - Root layout with:
  - Google Fonts providers
  - Lenis Smooth Scroll wrapper
  - Global metadata (title, description, OG, Twitter cards)
  - JSON-LD for ArtGallery + LocalBusiness
  - Navbar + Footer providers
- [x] **src/app/page.tsx** - Main page assembling all sections:
  - Hero
  - Gallery
  - ProcessTimeline
  - Press/Testimonials Marquee
  - Footer
- [x] **src/app/sitemap.ts** - Dynamic sitemap generation
- [x] **src/app/robots.ts** - Robots.txt generation

### Missing Components
- [x] **Footer.tsx** - Dark clay footer with:
  - Social links (Instagram, Facebook, Pinterest, Email)
  - Newsletter signup form
  - Copyright notice
  - Back-to-top button
- [x] **PressMarquee.tsx** - Infinite scrolling testimonials/press quotes
- [x] **InquiryModal.tsx** - Bespoke order form with:
  - Floating labels
  - Custom finish selection
  - Confirmation animation
  - Form validation

### Assets & Content
- [x] **Public assets folder** - Create `/public/assets/` with placeholder images:
  - hero-piece.jpg
  - vase-1-main.jpg, vase-1-detail-1.jpg, vase-1-detail-2.jpg
  - sculpture-1-main.jpg, sculpture-1-detail-1.jpg, sculpture-1-detail-2.jpg
  - tea-set-1-main.jpg, tea-set-1-detail-1.jpg, tea-set-1-detail-2.jpg
  - moon-jar-1-main.jpg, moon-jar-1-detail-1.jpg, moon-jar-1-detail-2.jpg
  - vase-2-main.jpg, vase-2-detail-1.jpg, vase-2-detail-2.jpg
  - bowl-set-1-main.jpg, bowl-set-1-detail-1.jpg, bowl-set-1-detail-2.jpg
  - sculpture-2-main.jpg, sculpture-2-detail-1.jpg, sculpture-2-detail-2.jpg
  - pouring-set-1-main.jpg, pouring-set-1-detail-1.jpg, pouring-set-1-detail-2.jpg
  - process-1.jpg, process-2.jpg, process-3.jpg, process-4.jpg
  - logo.png, gallery-hero.jpg, studio.jpg

### Advanced Features
- [x] **Lenis Smooth Scroll** integration in layout
- [x] **Product detail pages** - `/shop/[slug]/page.tsx` with full JSON-LD Product schema
- [x] **Category pages** - Dynamic routing for filtered views
- [x] **Newsletter API route** - `/api/newsletter/route.ts`
- [x] **Inquiry API route** - `/api/inquiry/route.ts`
- [x] **Error boundary** - Global error handling
- [x] **Loading states** - Suspense boundaries

### SEO & Performance
- [x] Complete metadata in layout.tsx (title template, description, OG images)
- [x] Dynamic sitemap.ts with all product URLs
- [x] robots.ts with proper directives
- [ ] Image optimization verification
- [ ] Core Web Vitals optimization
- [ ] Structured data testing

### Polish & QA
- [ ] Mobile responsiveness testing
- [ ] Animation performance optimization
- [ ] Accessibility audit (ARIA labels, focus states, contrast)
- [ ] Cross-browser testing
- [ ] Build verification (`npm run build`)
- [ ] Production deployment prep

---

### 📋 NEXT IMMEDIATE STEPS

1. Verify image optimization & replace placeholders with high-res originals
2. Implement product detail server-side SEO checks and structured data testing
3. Add Newsletter and Inquiry persistence (Mail provider / database)
4. Mobile responsiveness & accessibility audit
5. Run `npm run build` and fix any runtime issues

---

## 📝 NOTES

- All components use `'use client'` directive where needed (Framer Motion, IntersectionObserver, state)
- Product data in `src/lib/products.ts` maps to `/public/assets/` image paths
- Design system follows Wabi-Sabi aesthetic: organic, warm, tactile luxury
- Animations use Framer Motion with `whileInView` for scroll-triggered entrances
- Lenis Smooth Scroll needs to be initialized in a client component wrapper
- JSON-Ld component supports ArtGallery, LocalBusiness, and Product schemas