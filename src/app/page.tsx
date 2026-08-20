import { Hero } from '@/components/Hero'
import { Gallery } from '@/components/Gallery'
import { ProcessTimeline } from '@/components/ProcessTimeline'
import { PressMarquee } from '@/components/PressMarquee'
import InquiryModal from '@/components/InquiryModal'
import { JsonLd } from '@/components/JsonLd'
import { products } from '@/lib/products'

export default function Page() {
  return (
    <>
      <Hero />
      <Gallery />
      <ProcessTimeline />
      <PressMarquee />
      <InquiryModal />
      <JsonLd type="Product" data={products} />
    </>
  )
}
