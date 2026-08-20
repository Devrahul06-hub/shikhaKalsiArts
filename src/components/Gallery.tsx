'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Search, X, Maximize2, Minimize2, Heart, Share2, ChevronLeft, ChevronRight } from 'lucide-react'
import { products, categories, ClayProduct, getProductsByCategory } from '@/lib/products'

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Vases' | 'Sculptures' | 'Tableware' | 'Limited Editions'>('All')
  const [selectedProduct, setSelectedProduct] = useState<ClayProduct | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const galleryRef = useRef<HTMLDivElement>(null)

  const filteredProducts = getProductsByCategory(activeCategory)
  const currentProduct = selectedProduct

  const handleImageChange = (direction: number) => {
    if (!currentProduct) return
    setLightboxIndex((prev) => (prev + direction + currentProduct.images.length) % currentProduct.images.length)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!currentProduct) return
    if (e.key === 'Escape') setSelectedProduct(null)
    if (e.key === 'ArrowLeft') handleImageChange(-1)
    if (e.key === 'ArrowRight') handleImageChange(1)
  }

  useEffect(() => {
    if (currentProduct) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [currentProduct])

  const productVariants = {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.95 },
  }

  return (
    <section
      id="gallery"
      className="relative py-24 lg:py-32 bg-cream"
      aria-labelledby="gallery-heading"
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-terracotta/10 border border-terracotta/20 text-terracotta text-sm font-medium mb-4">
            Clay Art Showcase
          </span>
          <h2 id="gallery-heading" className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-clay tracking-tight">
            Curated <span className="text-terracotta">Collection</span>
          </h2>
          <p className="mt-4 text-lg text-clay/60 max-w-2xl mx-auto">
            Each piece tells a story of earth, fire, and the artisan's touch. 
            Filter by category to explore our sculptural ceramics, functional tableware, and limited editions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
          role="tablist"
          aria-label="Product categories"
        >
          {categories.map((category) => (
            <button
              key={category}
              role="tab"
              aria-selected={activeCategory === category}
              aria-controls={`panel-${category.toLowerCase().replace(' ', '-')}`}
              id={`tab-${category.toLowerCase().replace(' ', '-')}`}
              onClick={() => setActiveCategory(category as typeof activeCategory)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-clay text-cream shadow-lg'
                  : 'bg-cream text-clay/70 border border-clay/10 hover:border-terracotta/50 hover:text-terracotta'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <div
          id="gallery-grid"
          role="tabpanel"
          aria-label={`${activeCategory} collection`}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.article
                key={product.id}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={productVariants}
                custom={index}
                className="group relative"
              >
                <ProductCard
                  product={product}
                  index={index}
                  hoveredIndex={hoveredIndex}
                  setHoveredIndex={setHoveredIndex}
                  onQuickView={() => setSelectedProduct(product)}
                />
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 text-clay/50">
            <p>No pieces found in this category.</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-title"
            onClick={() => setSelectedProduct(null)}
          >
            <div className="absolute inset-0 bg-clay/90 backdrop-blur-md" aria-hidden="true" />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl max-h-[90vh] bg-cream rounded-3xl overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-clay/10">
                <h3 id="lightbox-title" className="font-display text-xl font-medium text-clay">
                  {selectedProduct.name}
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleImageChange(-1)}
                    className="p-2 rounded-full bg-clay/5 text-clay hover:bg-clay/10 transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                  </button>
                  <button
                    onClick={() => handleImageChange(1)}
                    className="p-2 rounded-full bg-clay/5 text-clay hover:bg-clay/10 transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" aria-hidden="true" />
                  </button>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="p-2 rounded-full bg-clay/5 text-clay hover:bg-terracotta/10 hover:text-terracotta transition-colors"
                    aria-label="Close lightbox"
                  >
                    <X className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center p-4 overflow-hidden relative">
                <Image
                  src={selectedProduct.images[lightboxIndex]}
                  alt={selectedProduct.seoAlt}
                  className="max-w-full max-h-[60vh] object-contain"
                  width={1200}
                  height={900}
                  quality={95}
                  priority
                />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {selectedProduct.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setLightboxIndex(i)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === lightboxIndex ? 'bg-clay w-6' : 'bg-clay/30 hover:bg-clay/50'
                      }`}
                      aria-label={`View image ${i + 1}`}
                      aria-current={i === lightboxIndex ? 'true' : 'false'}
                    />
                  ))}
                </div>
              </div>

              <div className="p-6 border-t border-clay/10 bg-cream/50">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-display text-lg font-medium text-clay mb-4">Details</h4>
                    <dl className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-clay/60">Clay Type</dt>
                        <dd className="text-clay font-medium">{selectedProduct.clayType}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-clay/60">Finish</dt>
                        <dd className="text-clay font-medium">{selectedProduct.finish}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-clay/60">Firing</dt>
                        <dd className="text-clay font-medium">{selectedProduct.firingTemperature}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-clay/60">Dimensions</dt>
                        <dd className="text-clay font-medium">
                          {selectedProduct.dimensions.height} × {selectedProduct.dimensions.width} × {selectedProduct.dimensions.depth}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-clay/60">Weight</dt>
                        <dd className="text-clay font-medium">{selectedProduct.weight}</dd>
                      </div>
                      {selectedProduct.isLimitedEdition && selectedProduct.totalEdition && (
                        <div className="flex justify-between border-t border-clay/10 pt-3">
                          <dt className="text-clay/60">Edition</dt>
                          <dd className="text-terracotta font-medium">
                            {selectedProduct.editionNumber} of {selectedProduct.totalEdition}
                          </dd>
                        </div>
                      )}
                    </dl>
                  </div>

                  <div>
                    <h4 className="font-display text-lg font-medium text-clay mb-4">About This Piece</h4>
                    <p className="text-clay/70 text-sm leading-relaxed mb-6">
                      {selectedProduct.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedProduct.tags.slice(0, 6).map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs rounded-full bg-terracotta/10 text-terracotta border border-terracotta/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => { setSelectedProduct(null); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100); }}
                      className="btn-primary w-full"
                    >
                      Inquire About This Piece
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

interface ProductCardProps {
  product: ClayProduct
  index: number
  hoveredIndex: number | null
  setHoveredIndex: (index: number | null) => void
  onQuickView: () => void
}

function ProductCard({ product, index, hoveredIndex, setHoveredIndex, onQuickView }: ProductCardProps) {
  const isHovered = hoveredIndex === index
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setTilt({ x: x * 8, y: y * -8 })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  return (
    <div
      className="group relative"
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { handleMouseLeave(); setHoveredIndex(null); }}
    >
      <div
        className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-clay/5"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.1s ease-out',
        }}
      >
        <Image
          src={product.images[0]}
          alt={product.seoAlt}
          fill
          className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          quality={90}
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-clay/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />

        <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <div className="flex items-center justify-between">
            <span className="glassmorphism px-4 py-2 rounded-full text-sm font-medium text-clay">
              {product.category}
            </span>
            {product.isLimitedEdition && product.totalEdition && (
              <span className="glassmorphism px-4 py-2 rounded-full text-sm font-medium text-terracotta">
                Edition {product.editionNumber}/{product.totalEdition}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={onQuickView}
          className="absolute top-4 right-4 p-2 rounded-full bg-clay/80 text-cream opacity-0 group-hover:opacity-100 transition-opacity hover:bg-terracotta hover:scale-110"
          aria-label={`Quick view ${product.name}`}
        >
          <Maximize2 className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-medium text-clay group-hover:text-terracotta transition-colors">
            {product.name}
          </h3>
          {product.isLimitedEdition && (
            <span className="text-xs text-terracotta font-medium">Limited</span>
          )}
        </div>
        <p className="text-clay/60 text-sm font-medium">
          ${product.price.toLocaleString()} {product.currency}
        </p>
        <p className="text-clay/40 text-sm line-clamp-2">{product.shortDescription}</p>
      </div>
    </div>
  )
}