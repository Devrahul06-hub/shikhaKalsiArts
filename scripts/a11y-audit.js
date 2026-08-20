const fs = require('fs')
const path = require('path')
const { chromium } = require('playwright')

async function run() {
  const base = process.env.BASE_URL || 'http://localhost:3000'
  const pages = ['/', '/shop', '/gallery', '/process']
  const browser = await chromium.launch()
  const ctx = await browser.newContext()
  const results = []

  for (const p of pages) {
    const url = `${base}${p}`
    const page = await ctx.newPage()
    console.log('Auditing', url)
    await page.goto(url, { waitUntil: 'networkidle' })
    // wait for main or h1 to ensure client-rendered content hydrates
    try {
      await page.waitForSelector('#main-content, h1', { timeout: 5000 })
    } catch (e) {
      // continue even if not found
    }
    // inject axe
    const axePath = require.resolve('axe-core/axe.min.js')
    await page.addScriptTag({ path: axePath })

    const res = await page.evaluate(async () => {
      return await axe.run(document, {
        runOnly: {
          type: 'tag',
          values: ['wcag2aa', 'best-practice']
        }
      })
    })

    results.push({ url, violations: res.violations })
    console.log(`Found ${res.violations.length} violations on ${p}`)
    await page.close()
  }

  await browser.close()

  const outDir = path.join(__dirname, '..', 'reports')
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir)
  const outFile = path.join(outDir, `a11y-report-${Date.now()}.json`)
  fs.writeFileSync(outFile, JSON.stringify(results, null, 2))
  console.log('Report written to', outFile)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
