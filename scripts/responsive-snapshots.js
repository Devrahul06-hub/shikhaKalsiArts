const fs = require('fs')
const path = require('path')
const { chromium, webkit, firefox } = require('playwright')

const devices = [
  { name: 'mobile-375', width: 375, height: 812 },
  { name: 'mobile-360', width: 360, height: 760 },
  { name: 'tablet', width: 820, height: 1180 },
  { name: 'desktop', width: 1280, height: 800 },
]

const browsers = [
  { name: 'chromium', launcher: chromium },
  { name: 'webkit', launcher: webkit },
  { name: 'firefox', launcher: firefox },
]

const pages = ['/', '/shop', '/gallery', '/process']
const base = process.env.BASE_URL || 'http://localhost:3000'

async function run() {
  const outDir = path.join(__dirname, '..', 'reports', 'screenshots')
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

  for (const b of browsers) {
    const browser = await b.launcher.launch()
    const context = await browser.newContext()
    for (const d of devices) {
      for (const p of pages) {
        const page = await context.newPage()
        await page.setViewportSize({ width: d.width, height: d.height })
        const url = `${base}${p}`
        console.log(`[${b.name}/${d.name}] Capturing ${url}`)
        try {
          await page.goto(url, { waitUntil: 'networkidle' })
          await page.waitForSelector('#main-content, h1', { timeout: 3000 }).catch(() => {})
          const name = `${b.name}-${d.name}-${p === '/' ? 'home' : p.replace(/\//g, '')}.png`
          const out = path.join(outDir, name)
          await page.screenshot({ path: out, fullPage: true })
        } catch (err) {
          console.warn('Failed capturing', url, err.message)
        } finally {
          await page.close()
        }
      }
    }
    await browser.close()
  }
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
