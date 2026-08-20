const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')

const pages = ['/', '/shop', '/gallery', '/process']
const base = process.env.BASE_URL || 'http://localhost:3000'

async function run() {
  const results = []
  for (const p of pages) {
    const url = `${base}${p}`
    console.log('Checking', url)
    try {
      const res = await fetch(url)
      const html = await res.text()
      const scriptRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
      const matches = [...html.matchAll(scriptRegex)]
      const jsons = matches.map(m => m[1].trim())
      const parsed = jsons.map((s) => {
        try { return JSON.parse(s) } catch (e) { return { error: 'invalid json', raw: s.slice(0,200) } }
      })
      results.push({ url, scripts: parsed })
      console.log(`Found ${parsed.length} JSON-LD scripts`)
    } catch (err) {
      console.error('Failed', url, err.message)
      results.push({ url, error: err.message })
    }
  }
  const outDir = path.join(__dirname, '..', 'reports')
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir)
  const outFile = path.join(outDir, `structured-data-${Date.now()}.json`)
  fs.writeFileSync(outFile, JSON.stringify(results, null, 2))
  console.log('Wrote', outFile)
}

run().catch(err => { console.error(err); process.exit(1) })
