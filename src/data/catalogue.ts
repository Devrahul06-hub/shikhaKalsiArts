/**
 * The studio catalogue.
 *
 * Captions describe only what is visible in each photograph — no invented
 * dimensions, dates, fees, or client names beyond branding that appears in the
 * image itself.
 *
 * `stage: 'Visualisation'` marks a render or styled mockup rather than a
 * photograph of a delivered piece. These are shown so clients can see the
 * colourways a made-to-order piece is offered in, but they are labelled in the
 * UI so nothing reads as a finished-and-delivered photograph when it isn't.
 */

export type Stage =
  | 'In progress'
  | 'Finishing'
  | 'Finished'
  | 'Installed'
  | 'Visualisation'

export type CategoryId =
  | 'architectural'
  | 'brand'
  | 'monumental'
  | 'animals'
  | 'interiors'
  | 'events'

export interface CatalogueImage {
  src: string
  alt: string
  caption: string
  stage: Stage
}

export interface Collection {
  id: string
  title: string
  category: CategoryId
  /** One-line descriptor shown above the title. */
  kind: string
  summary: string
  images: CatalogueImage[]
}

export const categories: { id: CategoryId; label: string; blurb: string }[] = [
  {
    id: 'architectural',
    label: 'Architectural & Devotional',
    blurb: 'Entrances, ceilings, columns, and temple commissions.',
  },
  {
    id: 'brand',
    label: 'Brand & Retail',
    blurb: 'Facades, mascots, and product forms built at display scale.',
  },
  {
    id: 'monumental',
    label: 'Monumental Objects',
    blurb: 'Everyday objects rebuilt many times their size.',
  },
  {
    id: 'animals',
    label: 'Animals & Figures',
    blurb: 'Naturalistic and stylised creatures, and the human figure.',
  },
  {
    id: 'interiors',
    label: 'Interiors & Objects',
    blurb: 'Planters, wall reliefs, and pieces made for a room.',
  },
  {
    id: 'events',
    label: 'Events & Scenography',
    blurb: 'Sets, props, and installations built for a date in the calendar.',
  },
]

const ASSET = '/assets/catalogue'

export const collections: Collection[] = [
  // ─── Architectural & Devotional ──────────────────────────────────────────
  {
    id: 'temple-elephants',
    title: 'Temple Entrance Elephants',
    category: 'architectural',
    kind: 'Architectural · Devotional',
    summary:
      'A pair of standing elephants, each raising a lotus in its trunk, modelled close to life size and finished to sit with the carved sandstone portal they flank.',
    images: [
      {
        src: `${ASSET}/temple-elephants-clay-head.jpg`,
        alt: 'Hands smoothing the clay head and trunk of a large elephant sculpture',
        caption: 'Head and trunk worked up in clay over an internal armature.',
        stage: 'In progress',
      },
      {
        src: `${ASSET}/temple-elephants-primed-pair.jpg`,
        alt: 'Two elephant sculptures primed in white, standing outdoors among banana plants',
        caption: 'Both cast and primed, with saddle and bell detail cut in.',
        stage: 'Finishing',
      },
      {
        src: `${ASSET}/temple-elephants-pair-finished.jpg`,
        alt: 'Two finished elephant sculptures in a peach stone tone with a person standing between them',
        caption: 'Finished in a sandstone tone — shown here for scale.',
        stage: 'Finished',
      },
      {
        src: `${ASSET}/temple-elephants-installed.jpg`,
        alt: 'Carved temple entrance with columns, an ornate ceiling medallion and chandelier, with the elephants flanking carved wooden doors',
        caption: 'Installed either side of the entrance, under the carved ceiling.',
        stage: 'Installed',
      },
    ],
  },
  {
    id: 'ceiling-medallion',
    title: 'Carved Ceiling Medallion',
    category: 'architectural',
    kind: 'Architectural · Ornament',
    summary:
      'A deep-relief ceiling rose built in concentric bands of foliate carving, made in sections on the studio floor and lifted into place around a central chandelier drop.',
    images: [
      {
        src: `${ASSET}/ceiling-medallion-smoothing.jpg`,
        alt: 'A plaster ceiling medallion being smoothed flat with a batten',
        caption: 'The centre boss levelled before the outer bands are set out.',
        stage: 'In progress',
      },
      {
        src: `${ASSET}/ceiling-medallion-yard.jpg`,
        alt: 'Large circular plaster ceiling medallion with dense foliate carving, lying in the studio yard',
        caption: 'Foliate bands carved and joined, face up in the yard.',
        stage: 'Finishing',
      },
      {
        src: `${ASSET}/ceiling-medallion-inlay.jpg`,
        alt: 'Ceiling medallion with dark contrasting inlay motifs set into the pale relief',
        caption: 'Contrasting motifs set into the field before finishing.',
        stage: 'Finishing',
      },
      {
        src: `${ASSET}/ceiling-medallion-installed-lit.jpg`,
        alt: 'The finished ceiling medallion installed overhead and lit with coloured light',
        caption: 'Installed overhead and lit from the cove.',
        stage: 'Installed',
      },
    ],
  },
  {
    id: 'ganesha-murti',
    title: 'Ganesha Murti',
    category: 'architectural',
    kind: 'Devotional',
    summary:
      'A seated Ganesha for festival installation, modelled in clay, cast, and hand-painted in white with gold detailing to the crown, jewellery, and hands.',
    images: [
      {
        src: `${ASSET}/ganesha-murti-clay.jpg`,
        alt: 'Seated Ganesha sculpture in grey clay on a plinth in the studio',
        caption: 'The seated form and four arms resolved in clay.',
        stage: 'In progress',
      },
      {
        src: `${ASSET}/ganesha-murti-primed.jpg`,
        alt: 'Ganesha sculpture cast and primed in white, with red eye detailing begun',
        caption: 'Cast and primed, with the first detailing laid in.',
        stage: 'Finishing',
      },
      {
        src: `${ASSET}/ganesha-murti-finished.jpg`,
        alt: 'Finished white Ganesha murti with gold detailing on the crown, jewellery and hands',
        caption: 'Hand-painted in white with gold detailing.',
        stage: 'Finished',
      },
      {
        src: `${ASSET}/ganesha-murti-installed.jpg`,
        alt: 'The Ganesha murti installed for a festival, framed by marigold garlands and drapery',
        caption: 'Installed for the festival, dressed with marigold garlands.',
        stage: 'Installed',
      },
    ],
  },
  {
    id: 'heritage-columns',
    title: 'Heritage Columns',
    category: 'architectural',
    kind: 'Architectural · Restoration',
    summary:
      'Slender carved columns finished in a verdigris blue-green, made to match an existing heritage interior and installed alongside its arches and painted panels.',
    images: [
      {
        src: `${ASSET}/heritage-columns-yard.jpg`,
        alt: 'Two tall carved columns finished in turquoise, standing outdoors',
        caption: 'Cast columns standing in the yard after assembly.',
        stage: 'Finishing',
      },
      {
        src: `${ASSET}/heritage-columns-spraying.jpg`,
        alt: 'A person spray-finishing a tall turquoise column outdoors',
        caption: 'The verdigris finish sprayed and worked back by hand.',
        stage: 'Finishing',
      },
      {
        src: `${ASSET}/heritage-columns-installed.jpg`,
        alt: 'Heritage interior with arches, painted panels and seating, with the turquoise columns installed',
        caption: 'In place in the room they were matched to.',
        stage: 'Installed',
      },
    ],
  },

  // ─── Brand & Retail ──────────────────────────────────────────────────────
  {
    id: 'chapter2-facade',
    title: 'Chapter 2 — Storefront Facade',
    category: 'brand',
    kind: 'Brand collaboration · Architectural',
    summary:
      'A sculpted shopfront entrance: four furled petal forms meeting over the doorway to make an arch, built as foam-cast panels and finished matte black.',
    images: [
      {
        src: `${ASSET}/chapter2-facade-panels.jpg`,
        alt: 'Two people working on large sculpted petal panels in the studio',
        caption: 'Panels shaped and trimmed before priming.',
        stage: 'In progress',
      },
      {
        src: `${ASSET}/chapter2-facade-primed.jpg`,
        alt: 'White primed sculpted petal panels laid out on the ground in an arch formation',
        caption: 'Primed and dry-assembled to check the arch.',
        stage: 'Finishing',
      },
      {
        src: `${ASSET}/chapter2-facade-studio.jpg`,
        alt: 'The petal archway assembled and finished in matte black, standing in the studio yard',
        caption: 'Assembled and finished in matte black before transport.',
        stage: 'Finished',
      },
      {
        src: `${ASSET}/chapter2-facade-installed.jpg`,
        alt: 'Retail storefront at night with an illuminated Chapter 2 sign above the sculpted black petal archway',
        caption: 'In place as the storefront entrance, lit at night.',
        stage: 'Installed',
      },
    ],
  },
  {
    id: 'gillette-handles',
    title: 'Gillette Guard — Bus Handles',
    category: 'brand',
    kind: 'Brand activation · Transit media',
    summary:
      'Bus grab handles remade as oversized razors, so the reach for the handle becomes the product gesture. Cast in quantity, colour-matched to the pack, and fitted across a bus fleet.',
    images: [
      {
        src: `${ASSET}/gillette-handles-raw-cast.jpg`,
        alt: 'A raw unpainted cast of the razor-shaped bus handle resting on a board',
        caption: 'A raw cast, straight out of the mould.',
        stage: 'In progress',
      },
      {
        src: `${ASSET}/gillette-handles-prototype.jpg`,
        alt: 'A yellow prototype handle shown beside an actual razor for comparison',
        caption: 'An early handle checked against the real razor.',
        stage: 'In progress',
      },
      {
        src: `${ASSET}/gillette-handles-painted-detail.jpg`,
        alt: 'Hands holding a finished handle painted in two blues with a ribbed grip',
        caption: 'Finished in two blues, with the grip ribbing picked out.',
        stage: 'Finishing',
      },
      {
        src: `${ASSET}/gillette-handles-workshop-row.jpg`,
        alt: 'A long row of finished blue razor handles hanging from straps in the workshop',
        caption: 'The run hung on its straps, ready to ship.',
        stage: 'Finished',
      },
      {
        src: `${ASSET}/gillette-handles-branded-row.jpg`,
        alt: 'Finished handles with Gillette Guard 3-in-1 branded plates fitted above them',
        caption: 'Branded plates fitted above each handle.',
        stage: 'Finished',
      },
      {
        src: `${ASSET}/gillette-handles-installed-bus.jpg`,
        alt: 'Interior of a city bus with the razor-shaped handles installed along the rail above the windows',
        caption: 'Installed along the rail of a city bus.',
        stage: 'Installed',
      },
    ],
  },
  {
    id: 'brand-mascot',
    title: 'Brand Mascot Figure',
    category: 'brand',
    kind: 'Brand collaboration · Character',
    summary:
      'A standing mascot built from a flat character drawing — the proportions resolved in clay first, then cast and painted in flat brand colour.',
    images: [
      {
        src: `${ASSET}/brand-mascot-clay.jpg`,
        alt: 'Roughed-out clay figure of a standing character in the studio yard',
        caption: 'Stance and proportion blocked out in clay.',
        stage: 'In progress',
      },
      {
        src: `${ASSET}/brand-mascot-primed.jpg`,
        alt: 'The mascot figure cast and primed in white, thumb raised',
        caption: 'Cast and primed, with the raised thumb resolved.',
        stage: 'Finishing',
      },
      {
        src: `${ASSET}/brand-mascot-finished.jpg`,
        alt: 'Finished mascot figure painted in orange, green and black with a quiffed hairstyle',
        caption: 'Painted in flat brand colour.',
        stage: 'Finished',
      },
      {
        src: `${ASSET}/brand-mascot-finished-studio.jpg`,
        alt: 'The finished mascot figure standing against a studio wall',
        caption: 'Finished and crated-ready in the studio.',
        stage: 'Finished',
      },
    ],
  },
  {
    id: 'giant-sneaker',
    title: 'Oversized Sneaker',
    category: 'brand',
    kind: 'Brand collaboration · Retail display',
    summary:
      'A sneaker built at roughly ten times size, with the lacing, stitching, and sole tread all modelled by hand and finished in automotive-grade paint.',
    images: [
      {
        src: `${ASSET}/giant-sneaker-clay.jpg`,
        alt: 'A person working on the large clay form of an oversized sneaker',
        caption: 'The upper built up in clay over a shaped core.',
        stage: 'In progress',
      },
      {
        src: `${ASSET}/giant-sneaker-sole.jpg`,
        alt: 'The sole and tread of the oversized sneaker being modelled in clay',
        caption: 'Sole tread cut in by hand.',
        stage: 'In progress',
      },
      {
        src: `${ASSET}/giant-sneaker-finished.jpg`,
        alt: 'Finished oversized sneaker sculpture in purple and white on a stand outdoors',
        caption: 'Finished in automotive-grade paint.',
        stage: 'Finished',
      },
      {
        src: `${ASSET}/giant-sneaker-scale.jpg`,
        alt: 'Two people standing beside the finished oversized sneaker, which is around waist height',
        caption: 'Shown with the team for scale.',
        stage: 'Finished',
      },
    ],
  },
  {
    id: 'barrel-installation',
    title: 'Drum Stack Installation',
    category: 'brand',
    kind: 'Retail activation',
    summary:
      'A stacked wall of painted drums built as a storefront activation, assembled on site overnight and lit from the front.',
    images: [
      {
        src: `${ASSET}/barrel-install-prep.jpg`,
        alt: 'Rows of paint drums being prepared and finished in the studio yard',
        caption: 'Drums prepared and finished in the yard.',
        stage: 'In progress',
      },
      {
        src: `${ASSET}/barrel-install-night.jpg`,
        alt: 'A team assembling a stack of blue drums on a street at night',
        caption: 'Assembled on site overnight.',
        stage: 'Installed',
      },
      {
        src: `${ASSET}/barrel-install-venue.jpg`,
        alt: 'Stacked blue drum installation in front of a lit venue frontage',
        caption: 'The stack built up against the frontage.',
        stage: 'Installed',
      },
      {
        src: `${ASSET}/barrel-install-mall.jpg`,
        alt: 'The finished drum installation with a surfboard element outside a retail frontage',
        caption: 'Finished installation at the entrance.',
        stage: 'Installed',
      },
    ],
  },

  // ─── Monumental Objects ──────────────────────────────────────────────────
  {
    id: 'oversized-tabla',
    title: 'Oversized Tabla',
    category: 'monumental',
    kind: 'Sculptural object',
    summary:
      'A tabla built far beyond playing size, with the lacing, straps, and tuning blocks modelled by hand and finished in a metallic copper and gold patina.',
    images: [
      {
        src: `${ASSET}/oversized-tabla-modelling.jpg`,
        alt: 'A person modelling the large clay body of an oversized tabla in the studio',
        caption: 'The body raised in clay — roughly torso height.',
        stage: 'In progress',
      },
      {
        src: `${ASSET}/oversized-tabla-body.jpg`,
        alt: 'The clay tabla body with rim rope and tuning blocks being added',
        caption: 'Rim rope and tuning blocks added.',
        stage: 'In progress',
      },
      {
        src: `${ASSET}/oversized-tabla-clay.jpg`,
        alt: 'Large clay tabla on a studio work table surrounded by tools and moulds',
        caption: 'Straps and lacing completed on the bench.',
        stage: 'In progress',
      },
      {
        src: `${ASSET}/oversized-tabla-finished.jpg`,
        alt: 'Finished oversized tabla with a copper patina and pale strapping, displayed in an interior',
        caption: 'Finished in copper with a gold patina.',
        stage: 'Finished',
      },
    ],
  },
  {
    id: 'giant-shark',
    title: 'Giant Shark',
    category: 'monumental',
    kind: 'Public art · Play structure',
    summary:
      'A shark built large enough to walk into, with the open jaw forming a seat and entrance. Foam-cast and finished for weather, then installed in a public park.',
    images: [
      {
        src: `${ASSET}/giant-shark-clay.jpg`,
        alt: 'A person working on the large pale body of a shark sculpture in the studio yard',
        caption: 'The body shaped and faired in the yard.',
        stage: 'In progress',
      },
      {
        src: `${ASSET}/giant-shark-team.jpg`,
        alt: 'Five people seated in and around the open jaw of the shark sculpture',
        caption: 'The jaw finished — the team gives the scale.',
        stage: 'Finished',
      },
      {
        src: `${ASSET}/giant-shark-scale.jpg`,
        alt: 'A person seated inside the open toothed jaw of the finished shark sculpture',
        caption: 'The open jaw doubles as a seat.',
        stage: 'Finished',
      },
      {
        src: `${ASSET}/giant-shark-installed.jpg`,
        alt: 'The finished shark sculpture installed in a public park with play equipment behind',
        caption: 'Installed in the park, finished for weather.',
        stage: 'Installed',
      },
    ],
  },
  {
    id: 'knee-sculpture',
    title: 'Knee Implant Sculpture',
    category: 'monumental',
    kind: 'Specialist commission · Display',
    summary:
      'A knee replacement rendered as a two-foot display piece for a clinic: the femoral component mirror-gilded, the bearing surface in gloss white, on a polished stem and acrylic base.',
    images: [
      {
        src: `${ASSET}/knee-sculpture-clay.jpg`,
        alt: 'A person shaping the grey clay condyles of a knee implant sculpture in the studio',
        caption: 'The condyles shaped in clay over a mould base.',
        stage: 'In progress',
      },
      {
        src: `${ASSET}/knee-sculpture-stem-clay.jpg`,
        alt: 'The tapered clay stem and tray of the knee sculpture on a studio bench',
        caption: 'Tray and tapered stem built separately.',
        stage: 'In progress',
      },
      {
        src: `${ASSET}/knee-sculpture-maquette.jpg`,
        alt: 'A small gold maquette of the knee sculpture on an acrylic base, with a correction mark drawn over it',
        caption: 'A small maquette used to sign off the profile.',
        stage: 'In progress',
      },
      {
        src: `${ASSET}/knee-sculpture-gilding.jpg`,
        alt: 'The femoral component of the knee sculpture during gilding, showing a bright gold surface',
        caption: 'The femoral component during gilding.',
        stage: 'Finishing',
      },
      {
        src: `${ASSET}/knee-sculpture-curing.jpg`,
        alt: 'The gilded knee component curing in a cabinet',
        caption: 'Curing before assembly.',
        stage: 'Finishing',
      },
      {
        src: `${ASSET}/knee-sculpture-gold-detail.jpg`,
        alt: 'Close view of the mirror-gilded femoral component above the white bearing surface',
        caption: 'Mirror gilding over the gloss white bearing.',
        stage: 'Finishing',
      },
      {
        src: `${ASSET}/knee-sculpture-assembled.jpg`,
        alt: 'The assembled knee sculpture held up in the workshop, gold over white on a gold stem',
        caption: 'Assembled in the workshop.',
        stage: 'Finished',
      },
      {
        src: `${ASSET}/knee-sculpture-workshop.jpg`,
        alt: 'The finished knee sculpture seen from the side in the workshop',
        caption: 'The finished piece, side profile.',
        stage: 'Finished',
      },
      {
        src: `${ASSET}/knee-sculpture-render-front.jpg`,
        alt: 'Visualisation of the knee sculpture in a clinic interior, marked two feet tall',
        caption: 'Placement study for the clinic — shown at two feet.',
        stage: 'Visualisation',
      },
      {
        src: `${ASSET}/knee-sculpture-render-side.jpg`,
        alt: 'Side visualisation of the knee sculpture in a clinic interior, marked two feet tall',
        caption: 'The same study from the side.',
        stage: 'Visualisation',
      },
    ],
  },

  // ─── Animals & Figures ───────────────────────────────────────────────────
  {
    id: 'animal-collection',
    title: 'Animal Collection',
    category: 'animals',
    kind: 'Naturalistic sculpture',
    summary:
      'A run of life-size animals — snow leopard, bull, rhino, deer, goat — each modelled from the skeleton out, then finished either naturalistically or in a single patina.',
    images: [
      {
        src: `${ASSET}/snow-leopard-clay.jpg`,
        alt: 'Two people working on the clay body of a big cat sculpture in the studio yard',
        caption: 'The cat built up in clay over a steel armature.',
        stage: 'In progress',
      },
      {
        src: `${ASSET}/animal-fleece-finishing.jpg`,
        alt: 'A person applying a dark coat texture to an animal sculpture outdoors',
        caption: 'Coat texture laid on by hand.',
        stage: 'Finishing',
      },
      {
        src: `${ASSET}/snow-leopard-finished.jpg`,
        alt: 'Finished snow leopard sculpture with painted rosettes and pale blue eyes, outdoors',
        caption: 'Rosettes and eyes painted in.',
        stage: 'Finished',
      },
      {
        src: `${ASSET}/animal-collection-yard.jpg`,
        alt: 'Several finished animal sculptures in the yard: a dark yak, a snow leopard, a golden deer and a black goat',
        caption: 'Part of the run, finished and in the yard.',
        stage: 'Finished',
      },
      {
        src: `${ASSET}/rhino-primed.jpg`,
        alt: 'A life-size rhinoceros sculpture primed in white inside the studio',
        caption: 'The rhino primed and ready for finishing.',
        stage: 'Finishing',
      },
      {
        src: `${ASSET}/bull-primed-scale.jpg`,
        alt: 'A person standing beside a life-size white bull sculpture with long horns',
        caption: 'The bull primed — shown for scale.',
        stage: 'Finishing',
      },
      {
        src: `${ASSET}/bull-bronze-finished.jpg`,
        alt: 'Finished bull sculpture in a bronze patina, standing on blocks in the studio',
        caption: 'Finished in a bronze patina.',
        stage: 'Finished',
      },
    ],
  },
  {
    id: 'ram-pair',
    title: 'Fleeced Rams',
    category: 'animals',
    kind: 'Naturalistic sculpture',
    summary:
      'A pair of rams with heavy curled horns, the fleece built up in worked texture rather than painted on, so it reads at close range.',
    images: [
      {
        src: `${ASSET}/ram-primed-wip.jpg`,
        alt: 'A ram sculpture primed in white, mid-construction in the studio',
        caption: 'Body and legs resolved, primed.',
        stage: 'In progress',
      },
      {
        src: `${ASSET}/ram-primed-finished.jpg`,
        alt: 'A white primed ram sculpture with full curled horns, standing outdoors',
        caption: 'Horns fitted, ready for the fleece.',
        stage: 'Finishing',
      },
      {
        src: `${ASSET}/ram-fleece-finished.jpg`,
        alt: 'Finished ram sculpture with textured mottled fleece and dark curled horns',
        caption: 'Fleece built up in texture and painted back.',
        stage: 'Finished',
      },
      {
        src: `${ASSET}/ram-pair-scale.jpg`,
        alt: 'A person kneeling between two finished fleeced rams outdoors',
        caption: 'The pair finished — shown for scale.',
        stage: 'Finished',
      },
    ],
  },
  {
    id: 'monk-figures',
    title: 'Monk Figures',
    category: 'animals',
    kind: 'Figurative',
    summary:
      'A pair of rounded, stylised monk figures with bowed heads and folded robes, finished in a warm bronze patina.',
    images: [
      {
        src: `${ASSET}/monk-figures-clay.jpg`,
        alt: 'A rounded clay figure of a robed monk standing in the studio yard',
        caption: 'The silhouette resolved in clay.',
        stage: 'In progress',
      },
      {
        src: `${ASSET}/monk-figures-clay-detail.jpg`,
        alt: 'Detail of the clay monk figure showing the folded robe and bowed head',
        caption: 'Robe folds and the bowed head worked in.',
        stage: 'In progress',
      },
      {
        src: `${ASSET}/monk-figures-bronze.jpg`,
        alt: 'Two finished monk figures in a bronze patina with pale faces and hands',
        caption: 'Both finished in a bronze patina.',
        stage: 'Finished',
      },
      {
        src: `${ASSET}/rabbit-figure-finished.jpg`,
        alt: 'A large pale rabbit figure with a patterned tie, seen from behind in the yard',
        caption: 'A companion rabbit figure, hand-painted detail.',
        stage: 'Finished',
      },
    ],
  },
  {
    id: 'ganesha-chrome',
    title: 'Ganesha in Polished Chrome',
    category: 'animals',
    kind: 'Contemporary · Devotional',
    summary:
      'Ganesha reduced to gesture and silhouette — ears, trunk, and crown abstracted into a single flowing form, finished in mirror chrome so it takes the colour of the room.',
    images: [
      {
        src: `${ASSET}/ganesha-chrome-clay.jpg`,
        alt: 'The abstracted Ganesha form modelled in grey clay in the studio',
        caption: 'The abstraction resolved in clay.',
        stage: 'In progress',
      },
      {
        src: `${ASSET}/ganesha-chrome-primed.jpg`,
        alt: 'The abstracted Ganesha form cast and primed in white',
        caption: 'Cast and faired ready for plating.',
        stage: 'Finishing',
      },
      {
        src: `${ASSET}/ganesha-chrome-studio.jpg`,
        alt: 'The Ganesha form finished in mirror chrome, standing in the studio',
        caption: 'Finished in mirror chrome.',
        stage: 'Finished',
      },
      {
        src: `${ASSET}/ganesha-chrome-installed.jpg`,
        alt: 'The chrome Ganesha installed on a dark plinth in a lit corridor between two lamps',
        caption: 'Installed on a plinth in the corridor.',
        stage: 'Installed',
      },
    ],
  },
  {
    id: 'dhyana-figure',
    title: 'Dhyana — Seated Figure',
    category: 'animals',
    kind: 'Figurative · Made to order',
    summary:
      'A seated figure with one arm raised over the head and the other cupped at the waist, modelled from life and offered in a range of finishes. The studio holds the master; each casting is painted to order.',
    images: [
      {
        src: `${ASSET}/dhyana-clay-modelling.jpg`,
        alt: 'A sculptor modelling the raised arm of a life-size seated clay figure',
        caption: 'The raised arm and torso modelled from life.',
        stage: 'In progress',
      },
      {
        src: `${ASSET}/dhyana-studio.jpg`,
        alt: 'The seated figure part-finished in the studio with draped cloth over the legs',
        caption: 'Drapery set with cloth and stiffened in place.',
        stage: 'In progress',
      },
      {
        src: `${ASSET}/dhyana-painting-teal-gold.jpg`,
        alt: 'The seated figure being hand-painted in teal with gold drapery in the studio yard',
        caption: 'A casting hand-painted in teal and gold.',
        stage: 'Finishing',
      },
      {
        src: `${ASSET}/dhyana-studio-collage.jpg`,
        alt: 'Studio photographs of the seated figure alongside the model it was sculpted from',
        caption: 'The piece beside the model it was sculpted from.',
        stage: 'Finished',
      },
      {
        src: `${ASSET}/dhyana-colourway-teal.jpg`,
        alt: 'Visualisation of the seated figure in white with teal drapery, lit from within',
        caption: 'Colourway study — white with teal drapery.',
        stage: 'Visualisation',
      },
      {
        src: `${ASSET}/dhyana-colourway-gold.jpg`,
        alt: 'Visualisation of the seated figure in white with gold drapery, lit from within',
        caption: 'Colourway study — white with gold drapery.',
        stage: 'Visualisation',
      },
      {
        src: `${ASSET}/dhyana-colourway-jade.jpg`,
        alt: 'Visualisation of the seated figure in white with jade-green drapery and gold jewellery',
        caption: 'Colourway study — white with jade drapery.',
        stage: 'Visualisation',
      },
      {
        src: `${ASSET}/dhyana-colourway-green-gold.jpg`,
        alt: 'Visualisation of the seated figure in green stone with gold drapery',
        caption: 'Colourway study — green stone and gold.',
        stage: 'Visualisation',
      },
      {
        src: `${ASSET}/dhyana-colourway-bronze-black.jpg`,
        alt: 'Visualisation of the seated figure in bronze with black drapery',
        caption: 'Colourway study — bronze and black.',
        stage: 'Visualisation',
      },
      {
        src: `${ASSET}/dhyana-colourway-antique-gold.jpg`,
        alt: 'Visualisation of the seated figure entirely in antique gold',
        caption: 'Colourway study — antique gold throughout.',
        stage: 'Visualisation',
      },
      {
        src: `${ASSET}/dhyana-colourway-lapis.jpg`,
        alt: 'Visualisation of the seated figure in lapis blue with turquoise and gold detail',
        caption: 'Colourway study — lapis and turquoise.',
        stage: 'Visualisation',
      },
      {
        src: `${ASSET}/dhyana-colourway-lotus-throne.jpg`,
        alt: 'Visualisation of the seated figure in green on a painted lotus throne base',
        caption: 'Colourway study — on a painted lotus throne.',
        stage: 'Visualisation',
      },
    ],
  },
  {
    id: 'buddha-series',
    title: 'Buddha Series',
    category: 'animals',
    kind: 'Devotional · Made to order',
    summary:
      'A seated Buddha and a meditation bust, both offered across a range of patinas and robe colours, with or without a halo disc.',
    images: [
      {
        src: `${ASSET}/meditation-bust-candlelit.jpg`,
        alt: 'A pale meditation bust with closed eyes and a gold spiral on the forehead, lit by candles and marigolds',
        caption: 'The meditation bust, lit for a shrine setting.',
        stage: 'Finished',
      },
      {
        src: `${ASSET}/buddha-colourway-stone.jpg`,
        alt: 'Visualisation of a seated Buddha in a green stone finish within a lit arched niche',
        caption: 'Colourway study — green stone.',
        stage: 'Visualisation',
      },
      {
        src: `${ASSET}/buddha-colourway-gold-black.jpg`,
        alt: 'Visualisation of a seated Buddha in dark bronze with gold robe and halo disc',
        caption: 'Colourway study — dark bronze with gilded robe.',
        stage: 'Visualisation',
      },
      {
        src: `${ASSET}/buddha-colourway-blue-saffron.jpg`,
        alt: 'Visualisation of a seated Buddha in blue-grey with a saffron robe and terracotta halo',
        caption: 'Colourway study — blue-grey and saffron.',
        stage: 'Visualisation',
      },
      {
        src: `${ASSET}/buddha-colourway-teal.jpg`,
        alt: 'Visualisation of a seated Buddha in a deep teal finish in a lit arched niche',
        caption: 'Colourway study — deep teal.',
        stage: 'Visualisation',
      },
      {
        src: `${ASSET}/buddha-collection-group.jpg`,
        alt: 'Visualisation of several Buddha figures and a bust arranged together in a lit alcove',
        caption: 'The range shown together.',
        stage: 'Visualisation',
      },
    ],
  },

  // ─── Interiors & Objects ─────────────────────────────────────────────────
  {
    id: 'face-planters',
    title: 'Face Planters',
    category: 'interiors',
    kind: 'Interior object · Made to order',
    summary:
      'A head-and-shoulders planter where the crown opens to hold the plant, cast in a cement composite and hand-painted in custom colourways.',
    images: [
      {
        src: `${ASSET}/face-planter-clay.jpg`,
        alt: 'The face planter modelled in clay, showing the open crown and pooled base',
        caption: 'The head and pooled base modelled in clay.',
        stage: 'In progress',
      },
      {
        src: `${ASSET}/face-planter-white.jpg`,
        alt: 'The face planter cast and finished in plain white on a studio bench',
        caption: 'Cast and finished plain white.',
        stage: 'Finished',
      },
      {
        src: `${ASSET}/face-planter-turquoise.jpg`,
        alt: 'The face planter hand-painted in bright turquoise with a pink base',
        caption: 'Hand-painted in a custom turquoise.',
        stage: 'Finished',
      },
      {
        src: `${ASSET}/face-planter-styled.jpg`,
        alt: 'Visualisation of the face planter in teal and yellow, planted and styled on a shelf',
        caption: 'Styling study — teal and yellow, planted.',
        stage: 'Visualisation',
      },
    ],
  },
  {
    id: 'coral-face-planter',
    title: 'Coral Head Planter',
    category: 'interiors',
    kind: 'Interior object · Made to order',
    summary:
      'A larger head planter with the crown broken into coral and shell forms, made to carry a bonsai so the tree reads as the figure’s hair.',
    images: [
      {
        src: `${ASSET}/coral-face-planter-white.jpg`,
        alt: 'Visualisation of the coral head planter in plain white with a bonsai planted in the crown',
        caption: 'Colourway study — plain white with bonsai.',
        stage: 'Visualisation',
      },
      {
        src: `${ASSET}/coral-face-planter-teal.jpg`,
        alt: 'Visualisation of the coral head planter in teal and blue with a bonsai',
        caption: 'Colourway study — teal and blue.',
        stage: 'Visualisation',
      },
      {
        src: `${ASSET}/coral-face-planter-blue.jpg`,
        alt: 'Visualisation of the coral head planter in deep blue with wave patterning',
        caption: 'Colourway study — deep blue with wave patterning.',
        stage: 'Visualisation',
      },
      {
        src: `${ASSET}/coral-face-planter-colour.jpg`,
        alt: 'Visualisation of the coral head planter in turquoise with purple and orange coral detail',
        caption: 'Colourway study — turquoise with coral detail.',
        stage: 'Visualisation',
      },
      {
        src: `${ASSET}/coral-face-planter-hallway.jpg`,
        alt: 'Visualisation of the coral head planter in stone tone on a console in an entrance hall',
        caption: 'Placement study — stone tone on a console.',
        stage: 'Visualisation',
      },
    ],
  },
  {
    id: 'planter-collection',
    title: 'Handprint & Texture Planters',
    category: 'interiors',
    kind: 'Interior · Garden',
    summary:
      'Square and tapered planters finished in panelled, ribbed, and handprint textures — the handprints pressed in by hand so no two boxes match.',
    images: [
      {
        src: `${ASSET}/planter-cube-black.jpg`,
        alt: 'A large square panelled planter finished in black, outdoors',
        caption: 'The panelled box in a plain black finish.',
        stage: 'Finished',
      },
      {
        src: `${ASSET}/planter-handprint.jpg`,
        alt: 'Planters decorated with white and yellow handprints over a dark ground',
        caption: 'Handprints pressed and painted over a dark ground.',
        stage: 'Finished',
      },
      {
        src: `${ASSET}/planter-ribbed.jpg`,
        alt: 'Two tapered planters with a ribbed stacked texture in dark grey',
        caption: 'The tapered planter with a ribbed texture.',
        stage: 'Finished',
      },
      {
        src: `${ASSET}/planter-collection-board.jpg`,
        alt: 'Visualisation board showing four planter finishes planted and styled in a garden',
        caption: 'Range board — the four finishes, planted.',
        stage: 'Visualisation',
      },
    ],
  },
  {
    id: 'face-reliefs',
    title: 'Face Reliefs & Tiles',
    category: 'interiors',
    kind: 'Wall art · Interior',
    summary:
      'Faces carved directly into a fluted plaster wall, and a smaller run of individual face tiles cast for hanging in groups.',
    images: [
      {
        src: `${ASSET}/face-relief-carving.jpg`,
        alt: 'A person carving a face into a fluted plaster wall',
        caption: 'Carved straight into the wet fluted render.',
        stage: 'In progress',
      },
      {
        src: `${ASSET}/face-relief-detail.jpg`,
        alt: 'Two carved faces in a fluted plaster wall, one being refined by hand',
        caption: 'The second face brought up to match.',
        stage: 'In progress',
      },
      {
        src: `${ASSET}/face-relief-wall.jpg`,
        alt: 'A person working across the full width of the plaster relief wall',
        caption: 'The full panel worked across the wall.',
        stage: 'Finishing',
      },
      {
        src: `${ASSET}/face-tiles-making.jpg`,
        alt: 'A person shaping a clay face tile on the studio floor',
        caption: 'Tiles shaped one at a time in clay.',
        stage: 'In progress',
      },
      {
        src: `${ASSET}/face-tile-mould.jpg`,
        alt: 'A single face tile sitting in its casting frame',
        caption: 'A tile in its casting frame.',
        stage: 'In progress',
      },
      {
        src: `${ASSET}/face-tiles-batch.jpg`,
        alt: 'A batch of cast face tiles laid out in rows on the studio floor',
        caption: 'A batch laid out after casting.',
        stage: 'Finished',
      },
      {
        src: `${ASSET}/face-relief-interior.jpg`,
        alt: 'Visualisation of two large face reliefs mounted on a living room wall',
        caption: 'Placement study — the pair on a living room wall.',
        stage: 'Visualisation',
      },
      {
        src: `${ASSET}/face-tiles-interior.jpg`,
        alt: 'Visualisation of face tiles hung as a grid in warm tones on an office wall',
        caption: 'Placement study — tiles hung as a group.',
        stage: 'Visualisation',
      },
    ],
  },

  // ─── Events & Scenography ────────────────────────────────────────────────
  {
    id: 'isro-fleet',
    title: 'Rockets & Astronauts',
    category: 'events',
    kind: 'Event scenography · Photo-op',
    summary:
      'A run of rockets and astronaut figures built as face-in-hole photo pieces for a public space event, cast in quantity and finished in flat colour.',
    images: [
      {
        src: `${ASSET}/isro-astronauts-primed.jpg`,
        alt: 'A row of astronaut figures primed in white, standing outdoors',
        caption: 'The astronaut run cast and primed.',
        stage: 'In progress',
      },
      {
        src: `${ASSET}/isro-rocket-painted.jpg`,
        alt: 'A finished rocket sculpture painted white and red with a face cut-out',
        caption: 'A rocket finished, with the face cut-out.',
        stage: 'Finished',
      },
      {
        src: `${ASSET}/isro-astronaut-painted.jpg`,
        alt: 'A finished astronaut suit sculpture painted white with red trim and a face cut-out',
        caption: 'The astronaut suit finished to match.',
        stage: 'Finished',
      },
      {
        src: `${ASSET}/isro-fleet-team.jpg`,
        alt: 'Two people kneeling in front of a large group of finished rockets and astronaut figures',
        caption: 'The full run before dispatch.',
        stage: 'Finished',
      },
      {
        src: `${ASSET}/isro-installed-event.jpg`,
        alt: 'Rocket and astronaut photo-op pieces installed at a public event with visitors posing',
        caption: 'In use at the event.',
        stage: 'Installed',
      },
    ],
  },
  {
    id: 'sculpted-trees',
    title: 'Sculpted Trees & Rocks',
    category: 'events',
    kind: 'Scenography · Landscape',
    summary:
      'Bare sculpted trees and boulder forms built for interiors and event landscapes, made hollow so they can be carried in and assembled on site.',
    images: [
      {
        src: `${ASSET}/sculpted-trees-making.jpg`,
        alt: 'People building the branch structure of a sculpted tree outdoors',
        caption: 'Branches built out over a steel core.',
        stage: 'In progress',
      },
      {
        src: `${ASSET}/sculpted-trees-studio.jpg`,
        alt: 'Two white sculpted bare trees standing inside the studio',
        caption: 'Finished white, waiting on transport.',
        stage: 'Finished',
      },
      {
        src: `${ASSET}/sculpted-rocks-studio.jpg`,
        alt: 'Large pale boulder forms standing inside the studio',
        caption: 'Boulder forms built alongside the trees.',
        stage: 'Finished',
      },
      {
        src: `${ASSET}/sculpted-trees-rocks-yard.jpg`,
        alt: 'White sculpted trees and grey boulder forms arranged in the studio yard',
        caption: 'Trees and boulders staged together.',
        stage: 'Finished',
      },
      {
        src: `${ASSET}/sculpted-trees-installing.jpg`,
        alt: 'A team raising a tall white sculpted tree into position outdoors',
        caption: 'Raised into position on site.',
        stage: 'Installed',
      },
      {
        src: `${ASSET}/sculpted-tree-deck.jpg`,
        alt: 'A sculpted tree trunk installed through a timber deck',
        caption: 'Set through the deck as a finished feature.',
        stage: 'Installed',
      },
      {
        src: `${ASSET}/sculpted-tree-lawn.jpg`,
        alt: 'A sculpted tree installed on a lawn beside a timber cabin',
        caption: 'Installed on the lawn beside the cabin.',
        stage: 'Installed',
      },
    ],
  },
  {
    id: 'rock-water-feature',
    title: 'Rock & Water Features',
    category: 'events',
    kind: 'Interior landscape',
    summary:
      'Boulder forms built hollow and light enough to sit on a finished floor, plumbed as a water feature and planted around.',
    images: [
      {
        src: `${ASSET}/rock-feature-clay.jpg`,
        alt: 'A large rock form being built up in the studio',
        caption: 'The rock face built up and textured.',
        stage: 'In progress',
      },
      {
        src: `${ASSET}/rock-feature-tall.jpg`,
        alt: 'A tall dark rock form standing in the studio',
        caption: 'The tall form, textured and sealed.',
        stage: 'In progress',
      },
      {
        src: `${ASSET}/rock-feature-scale.jpg`,
        alt: 'A person walking past the rock form, which stands around head height',
        caption: 'Around head height — shown for scale.',
        stage: 'Finishing',
      },
      {
        src: `${ASSET}/rock-feature-installed.jpg`,
        alt: 'The finished rock water feature installed and planted in a lit hospitality interior',
        caption: 'Installed and planted as a water feature.',
        stage: 'Installed',
      },
    ],
  },
  {
    id: 'event-installations',
    title: 'Event Sculpture',
    category: 'events',
    kind: 'Scenography',
    summary:
      'Columns, abstract figures, and textured forms built for event interiors, finished in stone tones and lit from the floor.',
    images: [
      {
        src: `${ASSET}/white-obelisk.jpg`,
        alt: 'A tall white obelisk form standing on a plinth in the studio yard',
        caption: 'An obelisk form ready for finishing.',
        stage: 'In progress',
      },
      {
        src: `${ASSET}/columns-figures-yard.jpg`,
        alt: 'Stone-toned columns and abstract figures arranged in the studio yard',
        caption: 'Columns and figures staged before dispatch.',
        stage: 'Finished',
      },
      {
        src: `${ASSET}/textured-figures-yard.jpg`,
        alt: 'Two tall textured white abstract figures standing outdoors',
        caption: 'Textured standing figures, finished.',
        stage: 'Finished',
      },
      {
        src: `${ASSET}/event-hall-installation.jpg`,
        alt: 'A long event hall lined with large white sculptural pieces and festoon lighting',
        caption: 'Installed down the length of the hall.',
        stage: 'Installed',
      },
    ],
  },
]

export const allImages: CatalogueImage[] = collections.flatMap((c) => c.images)

export const totalImages = allImages.length

export function collectionsByCategory(category: CategoryId | 'all'): Collection[] {
  if (category === 'all') return collections
  return collections.filter((c) => c.category === category)
}
