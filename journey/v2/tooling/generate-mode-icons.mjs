#!/usr/bin/env node
// Generate mode icons for the 4 non-region modes:
//   Income (6), Internet (2), Urban/Rural (2), Age (3) = 13 total
//
// Style matches continent silhouettes: solid black on white, simple icon.
// Output: journey/v2/01-region/icons/<id>.png (will be processed to white-on-transparent later)
//
// Usage: node generate-mode-icons.mjs

import { writeFile, mkdir, readFile, access } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const GE_ROOT = resolve(__dirname, '..', '..', '..')
const OUT_DIR = resolve(GE_ROOT, 'journey', 'v2', '01-region', 'icons')
const ENV_PATH = 'C:\\Code\\Nuxt\\omnitrain-adcraft\\.env.prod'

async function loadEnv(path) {
  const content = await readFile(path, 'utf8')
  for (const raw of content.split(/\r?\n/)) {
    const line = raw.trim()
    if (!line || line.startsWith('#')) continue
    const m = line.match(/^([A-Z0-9_]+)\s*=\s*(.*)$/)
    if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
  }
}

await loadEnv(ENV_PATH)
const KEY = process.env.OPENAI_API_KEY
if (!KEY) { console.error('Missing OPENAI_API_KEY'); process.exit(1) }

const STYLE = 'rendered as a solid black filled silhouette on a pure white background. Clean simple shape, simplified for use as a small icon. No labels, no text, no decorations, no outline strokes, no shading, no surrounding border. Just the filled silhouette in solid black on white. Square composition, silhouette centered and occupying most of the frame.'

const ICONS = [
  // Income (6 tiers, ranked from top)
  { id: 'income-wealthy',     desc: 'a royal crown silhouette (crown with three or five prominent points)' },
  { id: 'income-high',        desc: 'a money bag silhouette (cloth sack tied at the top)' },
  { id: 'income-upper-mid',   desc: 'a closed wallet billfold silhouette viewed from the side' },
  { id: 'income-lower-mid',   desc: 'a stack of three round coins silhouette' },
  { id: 'income-low',         desc: 'a single round coin silhouette' },
  { id: 'income-extreme',     desc: 'an empty bowl silhouette (hollow bowl viewed from the side)' },
  // Internet
  { id: 'internet-connected', desc: 'a Wi-Fi signal silhouette (three curved arcs radiating from a dot at the bottom)' },
  { id: 'internet-offline',   desc: 'a Wi-Fi signal silhouette with a thick diagonal slash line cutting across it' },
  // Urban / Rural
  { id: 'urban',              desc: 'a tall skyscraper building silhouette (single tall rectangular tower with a few horizontal divisions for floors)' },
  { id: 'rural',              desc: 'a small cottage house silhouette (single house with a peaked triangular roof, a chimney, and a door)' },
  // Age
  { id: 'age-children',       desc: 'a small standing child silhouette (head, body, arms, legs — visibly small proportions, about half the height of an adult)' },
  { id: 'age-working',        desc: 'a standing adult human silhouette (head, body, arms, legs at adult proportions)' },
  { id: 'age-elderly',        desc: 'a standing elderly person silhouette holding a walking cane in one hand' }
]

async function gen(prompt) {
  const t0 = Date.now()
  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'gpt-image-1', prompt, n: 1, size: '1024x1024', quality: 'medium' })
  })
  if (!res.ok) throw new Error(`openai ${res.status}: ${(await res.text()).slice(0, 300)}`)
  const data = await res.json()
  const b64 = data.data?.[0]?.b64_json
  if (!b64) throw new Error('no b64_json')
  return { buffer: Buffer.from(b64, 'base64'), latencyMs: Date.now() - t0 }
}

async function exists(path) {
  try { await access(path); return true } catch { return false }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })
  console.log(`=== Generating ${ICONS.length} mode icons via gpt-image-1 ===\n`)
  for (const ic of ICONS) {
    const filepath = resolve(OUT_DIR, `${ic.id}.png`)
    if (await exists(filepath)) {
      console.log(`[${ic.id.padEnd(20)}] already exists, skipping`)
      continue
    }
    const prompt = `A simplified icon of ${ic.desc}, ${STYLE}`
    process.stdout.write(`[${ic.id.padEnd(20)}] ... `)
    try {
      const r = await gen(prompt)
      await writeFile(filepath, r.buffer)
      console.log(`ok ${(r.latencyMs / 1000).toFixed(1)}s ${(r.buffer.length / 1024).toFixed(0)}KB`)
    } catch (err) {
      console.log(`FAILED: ${err.message}`)
    }
  }
  console.log(`\nOutputs: ${OUT_DIR}`)
}

main().catch(err => { console.error('Fatal:', err.message); process.exit(1) })
