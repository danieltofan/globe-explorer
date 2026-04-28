#!/usr/bin/env node
// Generate 6 continent silhouette icons via OpenAI gpt-image-1.
// Each silhouette: solid black filled shape on white background, 1024x1024.
// Output: journey/v2/01-region/continents/<id>.png
//
// Reads creds from C:\Code\Nuxt\omnitrain-adcraft\.env.prod (no dotenv dep).
// Usage: node generate-continents.mjs

import { writeFile, mkdir, readFile } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const GE_ROOT = resolve(__dirname, '..', '..', '..')
const OUT_DIR = resolve(GE_ROOT, 'journey', 'v2', '01-region', 'continents')
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

const STYLE = 'rendered as a solid black filled silhouette on a pure white background. Clean geographic outline, simplified for use as a small icon. No labels, no text, no decorations, no outline strokes, no shading, no compass rose, no surrounding water, no border. Just the filled silhouette in solid black on white. Square composition, silhouette centered, occupies most of the frame.'

const CONTINENTS = [
  { id: 'asia',     desc: 'the continent of Asia (the largest continent, including mainland Asia, the Indian subcontinent, the Korean peninsula, the Japanese islands, and the Indonesian archipelago)' },
  { id: 'africa',   desc: 'the continent of Africa (a recognizable shape with the Mediterranean coast at the top, the Horn of Africa on the east, and the southern tip)' },
  { id: 'europe',   desc: 'the continent of Europe (excluding Russia east of the Urals; including the British Isles, Scandinavia, the Iberian peninsula, Italy, Greece, and the Balkans)' },
  { id: 'latin',    desc: 'Latin America (Mexico, Central America, the Caribbean, and all of South America together as one combined silhouette)' },
  { id: 'namerica', desc: 'North America (the United States, Canada, and Greenland as one combined silhouette — without Mexico or Central America)' },
  { id: 'oceania',  desc: 'Oceania (Australia as the main shape, with New Zealand and the Pacific island nations shown as smaller surrounding shapes)' }
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
  if (!b64) throw new Error('no b64_json in response')
  return { buffer: Buffer.from(b64, 'base64'), latencyMs: Date.now() - t0 }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })
  console.log(`=== Generating ${CONTINENTS.length} continent silhouettes via gpt-image-1 ===\n`)

  for (const c of CONTINENTS) {
    const prompt = `A simplified silhouette of ${c.desc}, ${STYLE}`
    process.stdout.write(`[${c.id.padEnd(10)}] ... `)
    try {
      const r = await gen(prompt)
      const filepath = resolve(OUT_DIR, `${c.id}.png`)
      await writeFile(filepath, r.buffer)
      console.log(`ok ${(r.latencyMs / 1000).toFixed(1)}s ${(r.buffer.length / 1024).toFixed(0)}KB`)
    } catch (err) {
      console.log(`FAILED: ${err.message}`)
    }
  }
  console.log(`\nOutputs: ${OUT_DIR}`)
}

main().catch(err => { console.error('Fatal:', err.message); process.exit(1) })
