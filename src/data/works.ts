/**
 * The studio's portfolio.
 *
 * Every entry below describes an actual photograph in /public/assets. Titles and
 * descriptions are deliberately limited to what is visible in the image — no
 * invented dimensions, editions, prices, or client names. Add those fields only
 * when the studio supplies real values.
 */

export type WorkCategory =
  | 'Devotional'
  | 'Figurative'
  | 'Commissioned Portraits'

export interface Work {
  id: string
  title: string
  category: WorkCategory
  /** Short line used on the grid card. */
  summary: string
  /** Longer copy shown in the lightbox. */
  description: string
  /** Finish/material as seen in the photograph. */
  finish: string
  image: string
  alt: string
}

export const works: Work[] = [
  {
    id: 'ganesha-chrome',
    title: 'Ganesha, Polished Chrome',
    category: 'Devotional',
    summary: 'Abstracted Ganesha form in a mirror-polished metallic finish.',
    description:
      'A flowing, abstracted interpretation of Ganesha, reduced to gesture and silhouette. The mirror-polished surface picks up the colour of the room around it, so the piece reads differently depending on where it is placed.',
    finish: 'Mirror-polished metallic',
    image: '/assets/WhatsApp Image 2026-08-14 at 20.54.51.jpeg',
    alt: 'Abstract Ganesha sculpture with a mirror-polished chrome finish, displayed in an arched alcove',
  },
  {
    id: 'seated-buddha',
    title: 'Seated Buddha',
    category: 'Devotional',
    summary: 'Serene seated figure with a hand-finished ivory stone surface.',
    description:
      'A seated Buddha in meditation, finished in a soft ivory tone that keeps attention on the fall of the robe and the stillness of the face. Shown here on a fluted plinth.',
    finish: 'Hand-finished ivory stone effect',
    image: '/assets/WhatsApp Image 2026-08-14 at 20.54.52.jpeg',
    alt: 'Seated Buddha sculpture in a pale ivory finish on a fluted column',
  },
  {
    id: 'meditation-bust',
    title: 'Meditation Bust',
    category: 'Figurative',
    summary: 'Figurative head in terracotta with deeply textured sculpted hair.',
    description:
      'A portrait head with eyes closed, contrasting a smooth terracotta face against heavily worked, bark-like hair. The two surface treatments are carried through in a single piece.',
    finish: 'Terracotta with textured relief',
    image: '/assets/WhatsApp Image 2026-08-14 at 20.54.51 (1).jpeg',
    alt: 'Terracotta bust of a face with closed eyes and thickly textured sculpted hair',
  },
  {
    id: 'deity-relief',
    title: 'Devotional Relief Panel',
    category: 'Devotional',
    summary: 'Arched terracotta relief of a seated deity with Ganesha.',
    description:
      'A framed relief panel carved in shallow depth, with an arched crown, patterned border, and attendant figures. Intended for wall mounting or a shrine niche.',
    finish: 'Natural terracotta',
    image: '/assets/WhatsApp Image 2026-08-14 at 20.54.52 (1).jpeg',
    alt: 'Terracotta relief panel showing a seated deity with Ganesha within an arched frame',
  },
  {
    id: 'winged-eagle',
    title: 'Winged Eagle',
    category: 'Figurative',
    summary: 'Eagle head with raised wings in gold leaf and pewter tones.',
    description:
      'An eagle captured mid-lift, with individually worked feathers across the wings. Gold-leaf wings are set against a pewter-toned head and mounted on a rough stone base.',
    finish: 'Gold leaf and pewter, stone base',
    image: '/assets/WhatsApp Image 2026-08-14 at 20.54.53.jpeg',
    alt: 'Sculpture of an eagle head with raised gold-leaf wings on a stone base',
  },
  {
    id: 'lotus-buddha',
    title: 'Lotus Buddha',
    category: 'Devotional',
    summary: 'Infant Buddha seated in a lotus, in rose and gold.',
    description:
      'A small devotional piece: an infant Buddha resting inside an open lotus, finished in matte rose with gilded skin tones. The petals are worked individually.',
    finish: 'Matte rose with gilding',
    image: '/assets/WhatsApp Image 2026-08-14 at 20.54.51 (2).jpeg',
    alt: 'Small sculpture of an infant Buddha in gold seated within a pink lotus flower',
  },
  {
    id: 'pet-portrait',
    title: 'Pet Portrait Commission',
    category: 'Commissioned Portraits',
    summary: 'Hand-painted likeness of a dog, sculpted from photographs.',
    description:
      'A commissioned likeness modelled from photographs of the owner’s dog, with the coat built up in texture and then hand-painted. Commissions of this kind are worked closely with the family.',
    finish: 'Sculpted and hand-painted',
    image: '/assets/WhatsApp Image 2026-08-14 at 20.54.52 (2).jpeg',
    alt: 'Hand-painted sculpture of a small cream and gold dog, flanked by two candles',
  },
]

export const workCategories = [
  'All',
  'Devotional',
  'Figurative',
  'Commissioned Portraits',
] as const

export type WorkFilter = (typeof workCategories)[number]

export function getWorksByCategory(filter: WorkFilter): Work[] {
  if (filter === 'All') return works
  return works.filter((work) => work.category === filter)
}
