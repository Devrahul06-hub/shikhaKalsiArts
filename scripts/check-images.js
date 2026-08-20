const fs = require('fs')
const path = require('path')

const dir = path.join(__dirname, '..', 'public', 'assets')

function formatKB(bytes) {
  return (bytes / 1024).toFixed(1) + ' KB'
}

function walk(dirPath) {
  const files = fs.readdirSync(dirPath)
  const results = []

  files.forEach((file) => {
    const full = path.join(dirPath, file)
    const stat = fs.statSync(full)
    if (stat.isDirectory()) {
      results.push(...walk(full))
    } else {
      results.push({ path: full, size: stat.size })
    }
  })
  return results
}

if (!fs.existsSync(dir)) {
  console.error('No assets directory found at', dir)
  process.exit(1)
}

const files = walk(dir)

console.log('Found', files.length, 'asset files in public/assets')

const threshold = 200 * 1024 // 200 KB
const large = files.filter((f) => f.size > threshold).sort((a, b) => b.size - a.size)

if (large.length === 0) {
  console.log('No files exceed', formatKB(threshold))
  process.exit(0)
}

console.log('\nFiles larger than', formatKB(threshold), ':')
large.forEach((f) => {
  console.log('-', path.relative(process.cwd(), f.path), '-', formatKB(f.size))
})

console.log('\nSuggestions:')
console.log('- Replace very large JPG/PNG with optimized WebP/AVIF');
console.log('- Generate multiple widths and use responsive `sizes`/`srcSet` with `next/image`');
console.log('- Consider compressing images > 1MB or lazy-loading non-critical images');
