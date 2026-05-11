// Render the Labflow brand SVG to every favicon / app-icon size we need,
// and bundle a multi-resolution favicon.ico. Run with: node scripts/build-favicons.mjs

import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import pngToIco from 'png-to-ico'

const root = path.resolve(new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'))
const SVG_PATH = path.join(root, 'public', 'images', 'logo_svg_black.svg')
const ICONS_DIR = path.join(root, 'public', 'icons')

// background = transparent. Sizes we ship.
const PNG_SIZES = [16, 32, 48, 64, 96, 128, 180, 192, 256, 384, 512]
const ICO_SIZES = [16, 32, 48]

await fs.mkdir(ICONS_DIR, { recursive: true })
const svg = await fs.readFile(SVG_PATH)

console.log(`Rendering ${PNG_SIZES.length} PNG sizes from ${path.relative(root, SVG_PATH)}…`)
const renderedPngs = {}
for (const size of PNG_SIZES) {
  const buf = await sharp(svg, { density: 384 })
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toBuffer()
  const out = path.join(ICONS_DIR, `labflow-${size}.png`)
  await fs.writeFile(out, buf)
  renderedPngs[size] = buf
  console.log(`  ${path.relative(root, out)}  ${buf.length} bytes`)
}

// Apple touch icon — solid-background variant looks cleaner on iOS.
const appleTouch = await sharp(svg, { density: 512 })
  .resize(180, 180, { fit: 'contain', background: { r: 236, g: 236, b: 234, alpha: 1 } })
  .flatten({ background: { r: 236, g: 236, b: 234 } })
  .png({ compressionLevel: 9 })
  .toBuffer()
await fs.writeFile(path.join(ICONS_DIR, 'apple-touch-icon.png'), appleTouch)
console.log(`  ${path.relative(root, path.join(ICONS_DIR, 'apple-touch-icon.png'))}  ${appleTouch.length} bytes`)

// Compose a multi-resolution favicon.ico from 16/32/48.
console.log('Building favicon.ico from sizes', ICO_SIZES.join(', '))
const ico = await pngToIco(ICO_SIZES.map((s) => renderedPngs[s]))

// Next.js auto-routes /favicon.ico from app/favicon.ico — keep this as the canonical one.
await fs.writeFile(path.join(root, 'app', 'favicon.ico'), ico)
// Also drop a copy under /public so direct hits to /favicon.ico still work pre-build.
await fs.writeFile(path.join(root, 'public', 'favicon.ico'), ico)
// And replace the legacy path that some pages may still reference.
await fs.writeFile(path.join(root, 'public', 'images', 'favicon.ico'), ico)
console.log(`  app/favicon.ico, public/favicon.ico, public/images/favicon.ico  ${ico.length} bytes each`)

console.log('Done.')
