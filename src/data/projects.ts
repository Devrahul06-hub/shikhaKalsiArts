export interface Project {
  id: string
  slug: string
  title: string
  shortDescription: string
  images: string[]
  material: string
  dimensions?: { height: string; width: string; depth: string }
  year?: number
}

export const projects: Project[] = [
  {
    id: 'guardian-sculpture',
    slug: 'guardian-sculpture',
    title: 'Guardian Sculpture',
    shortDescription: 'Large-scale public sculpture with patinated composite surface.',
    images: ['/assets/sculpture-2-main.jpg'],
    material: 'Mixed media composite',
    dimensions: { height: '520 cm', width: '240 cm', depth: '200 cm' },
    year: 2025,
  },
]
