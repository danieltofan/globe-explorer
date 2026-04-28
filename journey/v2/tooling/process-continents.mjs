#!/usr/bin/env node
// Post-process continent silhouettes from black-on-white to white-on-transparent.
// Each pixel's alpha = 255 - lightness, RGB set to white.
// Source: journey/v2/01-region/continents/<id>.png (black silhouette on white)
// Output: journey/v2/01-region/continents/<id>-white.png (white on transparent)

import sharp from 'sharp'
import { readdir } from 'node:fs/promises'
import { resolve, dirname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const GE_ROOT = resolve(__dirname, '..', '..', '..')
const DIRS = [
  resolve(GE_ROOT, 'journey', 'v2', '01-region', 'continents'),
  resolve(GE_ROOT, 'journey', 'v2', '01-region', 'icons')
]

async function process(dir, file) {
  const inPath = resolve(dir, file)
  const outPath = resolve(dir, basename(file, '.png') + '-white.png')

  const { data, info } = await sharp(inPath).removeAlpha().raw().toBuffer({ resolveWithObject: true })
  const out = Buffer.alloc(info.width * info.height * 4)
  for (let i = 0; i < info.width * info.height; i++) {
    const r = data[i * 3], g = data[i * 3 + 1], b = data[i * 3 + 2]
    const lightness = (r + g + b) / 3
    out[i * 4] = 255
    out[i * 4 + 1] = 255
    out[i * 4 + 2] = 255
    out[i * 4 + 3] = Math.round(255 - lightness) // black -> opaque, white -> transparent
  }
  await sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png()
    .toFile(outPath)
  return outPath
}

for (const dir of DIRS) {
  const files = (await readdir(dir)).filter(f => f.endsWith('.png') && !f.endsWith('-white.png'))
  console.log(`Processing ${files.length} silhouettes in ${basename(dir)}...`)
  for (const f of files) {
    const out = await process(dir, f)
    console.log(`  ${f} -> ${basename(out)}`)
  }
}
