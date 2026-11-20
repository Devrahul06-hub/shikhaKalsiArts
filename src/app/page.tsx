import { Hero } from '@/components/Hero'
import { Gallery } from '@/components/Gallery'
import { ProcessTimeline } from '@/components/ProcessTimeline'
import { InternationalClients } from '@/components/InternationalClients'
import { PressMarquee } from '@/components/PressMarquee'
import { WhatsAppFab } from '@/components/WhatsAppFab'

export default function Page() {
  return (
    <>
      <Hero />
      <Gallery />
      <ProcessTimeline />
      <InternationalClients />
      <PressMarquee />
      <WhatsAppFab />
    </>
  )
}
