export interface ClayProduct {
  id: string
  slug: string
  name: string
  category: 'Vases' | 'Sculptures' | 'Tableware' | 'Limited Editions'
  description: string
  shortDescription: string
  images: string[]
  price: number
  currency: string
  dimensions: {
    height: string
    width: string
    depth: string
  }
  weight: string
  clayType: string
  finish: string
  firingTemperature: string
  isLimitedEdition: boolean
  editionNumber?: number
  totalEdition?: number
  tags: string[]
  seoAlt: string
  seoDescription: string
}

export const products: ClayProduct[] = [
  {
    id: '1',
    slug: 'terracotta-heritage-vase',
    name: 'Terracotta Heritage Vase',
    category: 'Vases',
    description: 'A masterpiece of traditional terracotta craftsmanship, this heritage vase embodies the timeless beauty of ancient pottery techniques. Hand-thrown on a traditional wheel and fired in a wood-burning kiln, each piece carries unique flame markings that tell the story of its creation. The rich, warm terracotta hue deepens with age, developing a beautiful patina that only enhances its character.',
    shortDescription: 'Hand-thrown terracotta vase with natural flame markings from wood-firing.',
    images: [
      '/assets/vase-1-main.jpg',
      '/assets/vase-1-detail-1.jpg',
      '/assets/vase-1-detail-2.jpg',
    ],
    price: 485,
    currency: 'USD',
    dimensions: {
      height: '32 cm',
      width: '18 cm',
      depth: '18 cm',
    },
    weight: '2.4 kg',
    clayType: 'Red Terracotta Clay',
    finish: 'Natural unglazed with wood-fire markings',
    firingTemperature: '1150°C (Wood-fired)',
    isLimitedEdition: false,
    tags: ['hand-thrown', 'wood-fired', 'terracotta', 'heritage', 'vase'],
    seoAlt: 'Handcrafted Terracotta Heritage Vase by Shikha Kalsi Arts - Wood-fired with natural flame markings',
    seoDescription: 'Exquisite hand-thrown terracotta vase crafted using traditional wood-firing techniques. Each piece features unique flame markings and develops a beautiful patina over time.',
  },
  {
    id: '2',
    slug: 'sculptural-earth-form',
    name: 'Sculptural Earth Form',
    category: 'Sculptures',
    description: 'An abstract sculptural piece exploring the raw beauty of clay in its most elemental form. Created through a combination of coiling and pinching techniques, this sculpture captures the organic movement of the artist\'s hands. The unglazed surface reveals the natural texture of the clay body, while subtle variations in tone create depth and visual interest from every angle.',
    shortDescription: 'Abstract hand-coiled sculpture celebrating raw clay texture and organic form.',
    images: [
      '/assets/sculpture-1-main.jpg',
      '/assets/sculpture-1-detail-1.jpg',
      '/assets/sculpture-1-detail-2.jpg',
    ],
    price: 1250,
    currency: 'USD',
    dimensions: {
      height: '45 cm',
      width: '28 cm',
      depth: '22 cm',
    },
    weight: '5.8 kg',
    clayType: 'Stoneware Clay with Grog',
    finish: 'Natural unglazed, raw clay surface',
    firingTemperature: '1280°C (Electric kiln)',
    isLimitedEdition: true,
    editionNumber: 1,
    totalEdition: 5,
    tags: ['hand-coiled', 'sculpture', 'stoneware', 'limited-edition', 'abstract'],
    seoAlt: 'Hand-coiled Stoneware Sculpture by Shikha Kalsi Arts - Limited edition abstract earth form',
    seoDescription: 'Limited edition abstract sculpture hand-coiled from stoneware clay. Raw unglazed surface reveals natural clay texture. Edition of 5.',
  },
  {
    id: '3',
    slug: 'artisanal-tea-set',
    name: 'Artisanal Tea Ceremony Set',
    category: 'Tableware',
    description: 'A complete tea ceremony set designed for the mindful ritual of tea drinking. The set includes a teapot, four cups, a cooling bowl, and a tea caddy - each piece thoughtfully proportioned and ergonomically designed. The subtle celadon glaze pools beautifully in the thrown rings, creating unique variations on each piece. Fired to cone 10 for exceptional durability and vitrification.',
    shortDescription: 'Complete 7-piece tea ceremony set with celadon glaze, fired to cone 10.',
    images: [
      '/assets/tea-set-1-main.jpg',
      '/assets/tea-set-1-detail-1.jpg',
      '/assets/tea-set-1-detail-2.jpg',
    ],
    price: 680,
    currency: 'USD',
    dimensions: {
      height: '15 cm (teapot)',
      width: '22 cm (teapot)',
      depth: '16 cm (teapot)',
    },
    weight: '3.2 kg (full set)',
    clayType: 'Porcelain Stoneware',
    finish: 'Celadon glaze with thrown ring details',
    firingTemperature: '1300°C (Reduction)',
    isLimitedEdition: false,
    tags: ['tea-set', 'porcelain', 'celadon', 'functional', 'ceremony'],
    seoAlt: 'Artisanal Porcelain Tea Ceremony Set by Shikha Kalsi Arts - 7-piece celadon glazed set',
    seoDescription: 'Handcrafted 7-piece tea ceremony set including teapot, cups, cooling bowl, and caddy. Celadon glaze with beautiful thrown ring details. Cone 10 fired for durability.',
  },
  {
    id: '4',
    slug: 'moon-jar-limited',
    name: 'Moon Jar - Limited Edition',
    category: 'Limited Editions',
    description: 'Inspired by the iconic Korean Joseon dynasty moon jars, this limited edition piece represents the pinnacle of ceramic artistry. Each jar is formed from two separately thrown hemispheres joined at the equator - a technically demanding process that creates the characteristic subtle asymmetry. The milky white glaze with subtle iron speckling evokes the serene glow of moonlight. Only 8 pieces exist worldwide.',
    shortDescription: 'Traditional Korean-inspired moon jar, two-piece construction, milky white glaze. Edition of 8.',
    images: [
      '/assets/moon-jar-1-main.jpg',
      '/assets/moon-jar-1-detail-1.jpg',
      '/assets/moon-jar-1-detail-2.jpg',
    ],
    price: 3500,
    currency: 'USD',
    dimensions: {
      height: '38 cm',
      width: '36 cm',
      depth: '36 cm',
    },
    weight: '8.5 kg',
    clayType: 'High-fire Porcelain',
    finish: 'Milky white glaze with iron speckling',
    firingTemperature: '1320°C (Reduction)',
    isLimitedEdition: true,
    editionNumber: 1,
    totalEdition: 8,
    tags: ['moon-jar', 'porcelain', 'limited-edition', 'korean-inspired', 'collectible'],
    seoAlt: 'Limited Edition Moon Jar by Shikha Kalsi Arts - Korean Joseon inspired porcelain, edition of 8',
    seoDescription: 'Exquisite limited edition moon jar inspired by Korean Joseon dynasty. Two-piece thrown construction with milky white glaze and iron speckling. Only 8 pieces worldwide.',
  },
  {
    id: '5',
    slug: 'organic-form-vase-series',
    name: 'Organic Form Vase - Series I',
    category: 'Vases',
    description: 'A contemporary interpretation of organic forms found in nature. This vase is hand-built using slab construction, allowing for asymmetrical, flowing shapes that cannot be achieved on the wheel. The surface features a layered application of matte and satin glazes that interact during firing to create a landscape-like surface reminiscent of eroded stone and flowing water.',
    shortDescription: 'Hand-built slab vase with layered matte/satin glazes creating landscape-like surface.',
    images: [
      '/assets/vase-2-main.jpg',
      '/assets/vase-2-detail-1.jpg',
      '/assets/vase-2-detail-2.jpg',
    ],
    price: 520,
    currency: 'USD',
    dimensions: {
      height: '28 cm',
      width: '20 cm',
      depth: '16 cm',
    },
    weight: '2.1 kg',
    clayType: 'White Stoneware',
    finish: 'Layered matte and satin glazes',
    firingTemperature: '1260°C (Oxidation)',
    isLimitedEdition: false,
    tags: ['hand-built', 'slab-construction', 'stoneware', 'organic', 'vase'],
    seoAlt: 'Hand-built Organic Form Vase by Shikha Kalsi Arts - Slab construction with layered glazes',
    seoDescription: 'Contemporary hand-built vase using slab construction for organic asymmetrical forms. Layered matte and satin glazes create landscape-like surface effects.',
  },
  {
    id: '6',
    slug: 'ritual-bowl-collection',
    name: 'Ritual Bowl Collection',
    category: 'Tableware',
    description: 'A set of three nesting bowls designed for daily rituals - from morning meditation to evening reflection. Each bowl is thrown with a slightly different proportion, creating a harmonious family of forms. The interior features a smooth, glossy glaze for easy cleaning, while the exterior retains a tactile, semi-matte finish that grounds the piece in the hand. Perfect for matcha, small servings, or as contemplative objects.',
    shortDescription: 'Set of 3 nesting ritual bowls with glossy interior and tactile matte exterior.',
    images: [
      '/assets/bowl-set-1-main.jpg',
      '/assets/bowl-set-1-detail-1.jpg',
      '/assets/bowl-set-1-detail-2.jpg',
    ],
    price: 340,
    currency: 'USD',
    dimensions: {
      height: '8 cm / 6.5 cm / 5 cm',
      width: '16 cm / 13 cm / 10 cm',
      depth: '16 cm / 13 cm / 10 cm',
    },
    weight: '1.4 kg (set of 3)',
    clayType: 'Buff Stoneware',
    finish: 'Glossy interior / Semi-matte exterior',
    firingTemperature: '1240°C (Oxidation)',
    isLimitedEdition: false,
    tags: ['bowl-set', 'nesting', 'ritual', 'stoneware', 'functional'],
    seoAlt: 'Ritual Bowl Collection by Shikha Kalsi Arts - Set of 3 nesting stoneware bowls',
    seoDescription: 'Set of three nesting ritual bowls hand-thrown from buff stoneware. Glossy interior for easy cleaning, tactile semi-matte exterior. Perfect for matcha or contemplative use.',
  },
  {
    id: '7',
    slug: 'guardian-sculpture',
    name: 'Guardian Figure Sculpture',
    category: 'Sculptures',
    description: 'A powerful figurative sculpture drawing inspiration from ancient guardian figures across cultures. Built using a combination of coiling and modeling techniques, this piece stands as a silent sentinel. The surface treatment combines multiple firing passes - an initial bisque, followed by a saggar firing with organic materials that create unpredictable, one-of-a-kind surface patterns reminiscent of ancient archaeological finds.',
    shortDescription: 'Figurative guardian sculpture with saggar-fired surface patterns. One-of-a-kind.',
    images: [
      '/assets/sculpture-2-main.jpg',
      '/assets/sculpture-2-detail-1.jpg',
      '/assets/sculpture-2-detail-2.jpg',
    ],
    price: 2800,
    currency: 'USD',
    dimensions: {
      height: '52 cm',
      width: '24 cm',
      depth: '20 cm',
    },
    weight: '7.2 kg',
    clayType: 'Red Stoneware with Heavy Grog',
    finish: 'Saggar fired with organic materials',
    firingTemperature: '1100°C (Saggar) + 1200°C (Bisque)',
    isLimitedEdition: true,
    editionNumber: 1,
    totalEdition: 1,
    tags: ['figurative', 'sculpture', 'saggar-fired', 'one-of-a-kind', 'guardian'],
    seoAlt: 'One-of-a-kind Guardian Figure Sculpture by Shikha Kalsi Arts - Saggar fired with organic patterns',
    seoDescription: 'Unique figurative guardian sculpture combining coiling and modeling. Saggar fired with organic materials creating unrepeatable surface patterns. True one-of-a-kind artwork.',
  },
  {
    id: '8',
    slug: 'pouring-vessel-set',
    name: 'Water & Wine Pouring Set',
    category: 'Tableware',
    description: 'An elegant pouring set comprising a water carafe and wine decanter, designed for the refined dining experience. Each piece is thrown with precision to achieve the perfect balance and pour. The elongated necks and carefully calculated spout angles ensure drip-free pouring. A subtle ash glaze highlights the thrown rings, creating a visual rhythm that speaks to the maker\'s touch.',
    shortDescription: 'Carafe and decanter set with ash glaze highlighting thrown rings. Precision pouring.',
    images: [
      '/assets/pouring-set-1-main.jpg',
      '/assets/pouring-set-1-detail-1.jpg',
      '/assets/pouring-set-1-detail-2.jpg',
    ],
    price: 580,
    currency: 'USD',
    dimensions: {
      height: '28 cm (carafe) / 32 cm (decanter)',
      width: '14 cm (carafe) / 18 cm (decanter)',
      depth: '14 cm (carafe) / 18 cm (decanter)',
    },
    weight: '2.6 kg (set)',
    clayType: 'White Stoneware',
    finish: 'Subtle ash glaze on thrown rings',
    firingTemperature: '1280°C (Reduction)',
    isLimitedEdition: false,
    tags: ['carafe', 'decanter', 'pouring-set', 'ash-glaze', 'stoneware'],
    seoAlt: 'Water and Wine Pouring Set by Shikha Kalsi Arts - Stoneware carafe and decanter with ash glaze',
    seoDescription: 'Elegant two-piece pouring set: water carafe and wine decanter. Precision-thrown for perfect balance and drip-free pouring. Ash glaze highlights thrown ring details.',
  },
]

export const categories = ['All', 'Vases', 'Sculptures', 'Tableware', 'Limited Editions'] as const

export function getProductBySlug(slug: string): ClayProduct | undefined {
  return products.find(p => p.slug === slug)
}

export function getProductsByCategory(category: string): ClayProduct[] {
  if (category === 'All') return products
  return products.filter(p => p.category === category)
}

export function getLimitedEditionProducts(): ClayProduct[] {
  return products.filter(p => p.isLimitedEdition)
}

export function getFeaturedProducts(count: number = 4): ClayProduct[] {
  return products.slice(0, count)
}