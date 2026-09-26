/**
 * Pre-generates responsive WebP variants for every image the site references.
 *
 * Why this exists: the catalogue is 130+ static photographs. Left to Next's
 * default image optimizer, each width of each image is transformed on demand at
 * request time — measured at ~300ms per cold transform, and ~94 of them fire
 * while scrolling /gallery. The first visitor after every deploy pays all of
 * it, and on Vercel it also burns image-optimization quota.
 *
 * The photographs never change per request, so there is nothing to gain from
 * doing that work at runtime. This script emits the variants at build time;
 * src/lib/imageLoader.ts points next/image at them, and the optimizer is
 * bypassed entirely (see `images.loader` in next.config.js).
 *
 * Run: npm run optimize:images   (wired into `npm run build`)
 * Safe to re-run — it skips variants that are already newer than their source.
 */
import sharp from 'sharp'
import { readdir, stat, mkdir, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const PUBLIC = path.join(ROOT, 'public')
const ASSETS = path.join(PUBLIC, 'assets')
const OUT_ROOT = path.join(PUBLIC, 'optimized')
const SRC_DIR = path.join(ROOT, 'src')

/** Must stay in sync with `deviceSizes` in next.config.js. */
export const WIDTHS = [640, 828, 1080, 1280, 1920]
const QUALITY = 68

async function walk(dir, filter) {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await walk(full, filter)))
    else if (filter(full)) out.push(full)
  }
  return out
}

/**
 * Only build variants for images the site actually references — public/assets
 * still holds a pile of legacy duplicates that nothing imports.
 */
async function referencedAssets() {
  const sources = await walk(SRC_DIR, (f) => /\.(ts|tsx)$/.test(f))
  const referenced = new Set()

  for (const file of sources) {
    const text = await readFile(file, 'utf8')
    // Matches "/assets/…​.jpg" and the `${ASSET}/name.jpg` template form.
    for (const m of text.matchAll(/['"`]\/assets\/([^'"`]+?\.(?:jpe?g|png))['"`]/gi)) {
      referenced.add(decodeURIComponent(m[1]))
    }
    for (const m of text.matchAll(/\$\{ASSET\}\/([A-Za-z0-9._-]+\.(?:jpe?g|png))/gi)) {
      referenced.add('catalogue/' + m[1])
    }
  }
  return [...referenced]
}

async function main() {
  const rel = await referencedAssets()
  console.log(`optimize-images: ${rel.length} referenced source images`)

  let made = 0
  let skipped = 0
  let missing = 0
  let bytesIn = 0
  let bytesOut = 0

  for (const r of rel) {
    const src = path.join(ASSETS, r)
    if (!existsSync(src)) {
      console.warn(`  MISSING SOURCE: assets/${r}`)
      missing++
      continue
    }

    const srcStat = await stat(src)
    const outDir = path.join(OUT_ROOT, path.dirname(r))
    await mkdir(outDir, { recursive: true })
    const base = path.basename(r).replace(/\.[^.]+$/, '')

    // Every width must exist for every image. The loader picks a variant from
    // the requested width alone — it has no way to know which files were
    // written — and next/image puts all of them in the srcset. Skipping the
    // ones larger than the source produced 404s on any display with
    // device-pixel-ratio > 1: sources are capped at 1600px, so no -1920 variant
    // was ever generated and 83/133 images broke at DPR 2, all 133 at DPR 3.
    //
    // `withoutEnlargement` means a smaller source is not upscaled — it is just
    // written at its native size under the larger name, so the URL resolves and
    // the bytes are honest.
    for (const w of WIDTHS) {
      const outFile = path.join(outDir, `${base}-${w}.webp`)
      if (existsSync(outFile)) {
        const outStat = await stat(outFile)
        if (outStat.mtimeMs >= srcStat.mtimeMs) {
          bytesOut += outStat.size
          skipped++
          continue
        }
      }

      const info = await sharp(src)
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 5 })
        .toFile(outFile)

      bytesOut += info.size
      made++
    }
    bytesIn += srcStat.size
  }

  const mb = (n) => (n / 1048576).toFixed(1)
  console.log(
    `optimize-images: ${made} written, ${skipped} up to date` +
      (missing ? `, ${missing} missing` : '')
  )
  console.log(
    `optimize-images: sources ${mb(bytesIn)} MB -> variants ${mb(bytesOut)} MB`
  )

  // Fail the build rather than ship 404s. The loader can emit any width in
  // WIDTHS for any referenced image, so every one of those files must exist.
  // This previously slipped through because a DPR-1 browser only ever requests
  // the smallest variant — the gaps were invisible until a Retina screen asked
  // for a larger one.
  const gaps = []
  for (const r of rel) {
    if (!existsSync(path.join(ASSETS, r))) continue
    const dir = path.join(OUT_ROOT, path.dirname(r))
    const base = path.basename(r).replace(/\.[^.]+$/, '')
    for (const w of WIDTHS) {
      if (!existsSync(path.join(dir, `${base}-${w}.webp`))) {
        gaps.push(`${path.dirname(r)}/${base}-${w}.webp`)
      }
    }
  }

  if (gaps.length) {
    console.error(
      `\noptimize-images: ${gaps.length} variant(s) missing — these would 404:`
    )
    gaps.slice(0, 10).forEach((g) => console.error(`  ${g}`))
    if (gaps.length > 10) console.error(`  …and ${gaps.length - 10} more`)
    process.exit(1)
  }

  console.log(
    `optimize-images: verified ${rel.length - missing} images x ${WIDTHS.length} widths, no gaps`
  )
}

main().catch((err) => {
  console.error('optimize-images failed:', err)
  process.exit(1)
})
