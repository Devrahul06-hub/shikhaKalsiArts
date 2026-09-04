export interface Collection {
  id: string
  slug: string
  title: string
  description?: string
  coverImage?: string
}

export const collections: Collection[] = [
  {
    id: 'sculptures',
    slug: 'sculptures',
    title: 'Sculptures',
    description: 'Site and gallery sculptures for public and private commissions.',
    coverImage: '/assets/sculpture-1-main.jpg',
  },
  {
    id: 'installations',
    slug: 'installations',
    title: 'Installations',
    description: 'Large-scale installations and architectural collaborations.',
    coverImage: '/assets/installation-1-main.jpg',
  },
]
