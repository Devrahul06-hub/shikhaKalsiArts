import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getProductBySlug } from '@/lib/products'
import { JsonLd } from '@/components/JsonLd'
import Link from 'next/link'

interface Props {
  params: { slug: string }
}

export default function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug)
  if (!product) return notFound()

  return (
    <article className="section-container py-20">
      <JsonLd type="Product" data={product} />

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <div className="rounded-3xl overflow-hidden shadow-2xl bg-cream">
            <Image
              src={product.images[0]}
              alt={product.seoAlt}
              width={1200}
              height={900}
              className="object-cover w-full h-auto"
              priority
            />
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4">
            {product.images.map((src, i) => (
              <div key={i} className="rounded-xl overflow-hidden bg-clay/5">
                <Image src={src} alt={`${product.name} view ${i + 1}`} width={400} height={300} className="object-cover w-full h-full" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h1 className="font-display text-4xl font-medium text-clay mb-4">{product.name}</h1>
          <p className="text-clay/70 mb-6">{product.shortDescription}</p>

          <div className="mb-6">
            <span className="text-3xl font-semibold text-clay">${product.price.toLocaleString()}</span>
            <span className="text-clay/50 ml-3">{product.currency}</span>
          </div>

          <dl className="grid grid-cols-2 gap-3 mb-6 text-sm text-clay/60">
            <div>
              <dt>Clay Type</dt>
              <dd className="text-clay font-medium">{product.clayType}</dd>
            </div>
            <div>
              <dt>Finish</dt>
              <dd className="text-clay font-medium">{product.finish}</dd>
            </div>
            <div>
              <dt>Dimensions</dt>
              <dd className="text-clay font-medium">{product.dimensions.height} × {product.dimensions.width} × {product.dimensions.depth}</dd>
            </div>
            <div>
              <dt>Weight</dt>
              <dd className="text-clay font-medium">{product.weight}</dd>
            </div>
          </dl>

          <p className="text-clay/70 leading-relaxed mb-6">{product.description}</p>

          <div className="flex gap-4">
            <a href="#contact" className="btn-primary">Inquire</a>
            <button className="btn-secondary">Add to Wishlist</button>
          </div>

          <div className="mt-8 text-sm text-clay/50">
            <Link href="/shop" className="underline">Back to shop</Link>
          </div>
        </div>
      </div>
    </article>
  )
}
