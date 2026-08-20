import Link from 'next/link'
import Image from 'next/image'
import { getProductsByCategory, categories } from '@/lib/products'

interface Props {
  params: { category: string }
}

export default function CategoryPage({ params }: Props) {
  const cat = decodeURIComponent(params.category)
  if (!categories.includes(cat as any)) {
    return (
      <div className="section-container py-20">
        <h1 className="font-display text-3xl">Category not found</h1>
      </div>
    )
  }

  const products = getProductsByCategory(cat)

  return (
    <section className="section-container py-20">
      <header className="mb-8">
        <h1 className="font-display text-4xl">{cat}</h1>
        <p className="text-clay/60 mt-2">Explore our curated selection of {cat.toLowerCase()}.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <article key={p.id} className="rounded-2xl overflow-hidden bg-cream shadow">
            <Link href={`/shop/${p.slug}`}>
              <div className="relative aspect-[3/4] w-full">
                <Image src={p.images[0]} alt={p.seoAlt} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-clay">{p.name}</h3>
                <p className="text-clay/60 text-sm">${p.price.toLocaleString()} {p.currency}</p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
