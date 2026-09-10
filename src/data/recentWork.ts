/**
 * Recently added studio photography (uploaded July 2026, published September 2026).
 *
 * These images document three large-scale projects, most of them with the
 * work-in-progress and finished stages both captured — which is why they are
 * grouped by project rather than shown as a flat pile of pictures.
 *
 * As with src/data/works.ts, captions describe only what is visible in the
 * photograph. No invented clients, dimensions, dates, or fees.
 *
 * Deliberately NOT included: `public/assets/Ceiling 2.jpeg`. That file is a
 * screen capture from a video — it still carries another channel's logo, a
 * "SUBSCRIBE NOW" button, and a playback progress bar burned into the frame.
 * Replace it with the studio's own photograph of the ceiling before adding it.
 */

export interface RecentImage {
  src: string
  alt: string
  /** Short caption shown under the image in the lightbox. */
  caption: string
  /** Where this sits in the making of the piece. */
  stage: 'In progress' | 'Finishing' | 'Installed'
}

export interface RecentProject {
  id: string
  title: string
  /** What kind of commission this was. */
  kind: string
  summary: string
  images: RecentImage[]
}

export const recentProjects: RecentProject[] = [
  {
    id: 'temple-elephants',
    title: 'Temple Entrance Elephants',
    kind: 'Architectural · Devotional',
    summary:
      'A pair of standing elephants, each carrying a lotus in its raised trunk, modelled in clay at close to life size and finished to match the carved sandstone portal they flank.',
    images: [
      {
        src: '/assets/WhatsApp Image 2026-07-17 at 1.33.26 PM (1).jpeg',
        alt: 'A craftsman shaping the head and trunk of a large clay elephant in the studio',
        caption: 'The head and trunk worked up in clay over an internal armature.',
        stage: 'In progress',
      },
      {
        src: '/assets/WhatsApp Image 2026-07-17 at 3.12.00 PM.jpeg',
        alt: 'Large elephant sculpture primed in white, standing outdoors beside banana plants',
        caption: 'Cast and primed, with the saddle and bell detailing cut in.',
        stage: 'Finishing',
      },
      {
        src: '/assets/WhatsApp Image 2026-07-16 at 2.12.36 PM (3).jpeg',
        alt: 'Two finished pink-toned elephant sculptures outdoors, with a person standing between them for scale',
        caption: 'Both elephants finished in a sandstone tone — shown here for scale.',
        stage: 'Finishing',
      },
      {
        src: '/assets/Elephant 1.1.jpeg',
        alt: 'Carved temple entrance with columns, an ornate ceiling medallion, chandelier, and the two elephant sculptures flanking carved wooden doors',
        caption:
          'Installed either side of the entrance, under the carved ceiling medallion.',
        stage: 'Installed',
      },
    ],
  },
  {
    id: 'chapter-2-facade',
    title: 'Chapter 2 — Storefront Facade',
    kind: 'Brand collaboration · Architectural',
    summary:
      'A sculpted entrance for a retail store: four furled petal forms meeting over the doorway to make an arch, built as panels and finished in matte black.',
    images: [
      {
        src: '/assets/WhatsApp Image 2026-07-17 at 3.12.01 PM (2).jpeg',
        alt: 'White primed sculpted petal panels laid out on the ground forming an arch shape',
        caption: 'The petal panels shaped and primed, laid out to check the arch.',
        stage: 'In progress',
      },
      {
        src: '/assets/WhatsApp Image 2026-07-17 at 3.12.01 PM (3).jpeg',
        alt: 'The petal archway assembled and finished in matte black, standing in the studio yard',
        caption: 'Assembled and finished in matte black before transport.',
        stage: 'Finishing',
      },
      {
        src: '/assets/WhatsApp Image 2026-07-17 at 1.33.21 PM.jpeg',
        alt: 'Retail storefront at night with an illuminated sign above a large sculpted black petal archway framing the entrance',
        caption: 'In place as the storefront entrance, lit at night.',
        stage: 'Installed',
      },
    ],
  },
  {
    id: 'oversized-tabla',
    title: 'Oversized Tabla',
    kind: 'Sculptural object',
    summary:
      'A tabla built far beyond playing size, with the lacing, straps, and tuning blocks all modelled by hand, then finished in a warm copper tone.',
    images: [
      {
        src: '/assets/WhatsApp Image 2026-07-16 at 2.08.10 PM (1).jpeg',
        alt: 'A very large clay tabla being modelled in the studio, with a studio assistant working behind it',
        caption: 'The body raised in clay — roughly torso height.',
        stage: 'In progress',
      },
      {
        src: '/assets/Tabla 5.1.jpeg',
        alt: 'Large clay tabla on a studio work table surrounded by tools, tins, and plaster moulds',
        caption: 'Lacing, straps, and tuning blocks added on the studio bench.',
        stage: 'In progress',
      },
      {
        src: '/assets/Tabla 5.png',
        alt: 'Finished oversized tabla with a copper finish and brass-toned straps, displayed on a wooden plinth in an interior',
        caption: 'Finished in copper with brass-toned straps, on a plinth.',
        stage: 'Installed',
      },
    ],
  },
]

/** Flat list, in the order they appear on the page — used by the lightbox. */
export const recentImages: RecentImage[] = recentProjects.flatMap((p) => p.images)

export const recentImageCount = recentImages.length
