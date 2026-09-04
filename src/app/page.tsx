import { Hero } from '@/components/Hero'
import { Gallery } from '@/components/Gallery'
import { ProcessTimeline } from '@/components/ProcessTimeline'
import { PressMarquee } from '@/components/PressMarquee'
import { WhatsAppFab } from '@/components/WhatsAppFab'

export default function Page() {
  return (
    <>
      <Hero />
      <Gallery />
      <ProcessTimeline />
      <PressMarquee />
      <WhatsAppFab />
    </>
  )
}
