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
export const WIDTHS = [640, 828, 1080, 1920]
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
    const meta = await sharp(src).metadata()
    const outDir = path.join(OUT_ROOT, path.dirname(r))
    await mkdir(outDir, { recursive: true })
    const base = path.basename(r).replace(/\.[^.]+$/, '')

    for (const w of WIDTHS) {
      // Never upscale: a 1200px original gets no 1920 variant, and the loader
      // falls back to the largest one that exists.
      if (meta.width && w > meta.width && w !== WIDTHS[0]) continue

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
}

main().catch((err) => {
  console.error('optimize-images failed:', err)
  process.exit(1)
})
