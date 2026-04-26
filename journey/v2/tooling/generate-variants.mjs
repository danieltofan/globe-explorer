#!/usr/bin/env node
// Spike 3 — within-region variant generation on chosen tool (recraft-v3).
// Produces 8 East Asian variants from one locked style template, varying
// gender / age / hair / skin / attire. The set is then audited for coherence
// and within-region diversity.
//
// Reads creds from C:\Code\Nuxt\omnitrain-adcraft\.env.prod (no dotenv dep).
// Usage: node generate-variants.mjs

import { writeFile, appendFile, mkdir, readFile } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const GE_ROOT = resolve(__dirname, '..', '..', '..')
const VARIANTS_RAW = resolve(GE_ROOT, 'journey', 'v2', '01-region', 'variants-raw')
const PROMPTS_LOG = resolve(GE_ROOT, 'journey', 'v2', '01-region', 'prompts.md')
const TOOL_LOG = resolve(GE_ROOT, 'journey', 'v2', 'tooling', 'tool-comparison.md')
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
const REPLICATE_TOKEN = process.env.REPLICATE_API_TOKEN
if (!REPLICATE_TOKEN) {
  console.error('Missing REPLICATE_API_TOKEN')
  process.exit(1)
}

// PRODUCTION PASS (East Asia) — tightened template per Spike 3 audit findings:
// (1) explicit pose lock (front-facing 3/4 view, head-and-shoulders) — fixes
//     the profile/up-looking inconsistency that hurt set coherence
// (2) harder BG language (no border / no card / no rectangle) — fixes the
//     ~25% transparency-failure rate from Spike 3
// (3) explicit small-icon optimization phrasing — pushes models toward strong
//     shapes that survive 24-48px display
// (4) clothing colors stay free per variant — region distinction comes from
//     the colored CSS dot background behind each sprite, not from the sprite
const TEMPLATE = (v) =>
  `A character portrait of a contemporary East Asian ${v.demo} with ${v.hair}, ${v.skin} skin tone, wearing ${v.attire}. Front-facing 3/4 view, head-and-shoulders composition centered in frame. Flat vector illustration style with thick black outline and simple solid colors. Fully transparent background — absolutely no border, no card frame, no surrounding rectangle, no white box, no app icon container — just the figure on full transparency. Square composition. Friendly neutral expression. Designed to read clearly at small icon sizes (24-48px display) with strong shapes and high contrast. Style: minimal, clean, app-icon-like.`

const VARIANTS = [
  { id: 'p01', demo: 'young woman in her 20s',         hair: 'long straight black hair',                  skin: 'light',      attire: 'a blue blouse' },
  { id: 'p02', demo: 'young man in his 20s',           hair: 'short messy black hair',                    skin: 'medium',     attire: 'a teal t-shirt' },
  { id: 'p03', demo: 'woman in her 30s',               hair: 'a short black bob',                         skin: 'medium-tan', attire: 'a red turtleneck' },
  { id: 'p04', demo: 'man in his 30s',                 hair: 'short black hair and glasses',              skin: 'light',      attire: 'a gray sweater' },
  { id: 'p05', demo: 'woman in her 40s',               hair: 'shoulder-length black bob with bangs',      skin: 'light',      attire: 'a mustard cardigan' },
  { id: 'p06', demo: 'man in his 40s',                 hair: 'short black hair',                          skin: 'medium-tan', attire: 'an olive button-up shirt' },
  { id: 'p07', demo: 'teen girl around 15',            hair: 'a long black ponytail',                     skin: 'light',      attire: 'a peach hoodie' },
  { id: 'p08', demo: 'teen boy around 16',             hair: 'short black hair',                          skin: 'medium',     attire: 'a navy t-shirt' },
  { id: 'p09', demo: 'woman in her 50s',               hair: 'medium-length black hair and glasses',      skin: 'light',      attire: 'a white blouse' },
  { id: 'p10', demo: 'man in his 50s',                 hair: 'short black hair partly gray at the sides', skin: 'tan',        attire: 'a dark green polo shirt' },
  { id: 'p11', demo: 'woman in her 70s',               hair: 'gray hair in a low bun',                    skin: 'light',      attire: 'a lavender blouse' },
  { id: 'p12', demo: 'man in his 70s',                 hair: 'short gray hair',                           skin: 'tan',        attire: 'a brown jacket' }
]

const TS = new Date().toISOString().replace(/[:.]/g, '-').replace(/-\d{3}Z$/, 'Z')

async function runRecraft(prompt) {
  const t0 = Date.now()
  const createRes = await fetch('https://api.replicate.com/v1/models/recraft-ai/recraft-v3/predictions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${REPLICATE_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      input: { prompt, style: 'digital_illustration', size: '1024x1024' }
    })
  })
  if (!createRes.ok) throw new Error(`replicate create ${createRes.status}: ${(await createRes.text()).slice(0, 300)}`)
  let prediction = await createRes.json()
  while (!['succeeded', 'failed', 'canceled'].includes(prediction.status)) {
    await new Promise(r => setTimeout(r, 2000))
    const pollRes = await fetch(prediction.urls.get, {
      headers: { Authorization: `Bearer ${REPLICATE_TOKEN}` }
    })
    prediction = await pollRes.json()
  }
  if (prediction.status !== 'succeeded') throw new Error(`replicate ${prediction.status}: ${prediction.error}`)
  const outputUrl = Array.isArray(prediction.output) ? prediction.output[0] : prediction.output
  const dlRes = await fetch(outputUrl)
  return { buffer: Buffer.from(await dlRes.arrayBuffer()), latencyMs: Date.now() - t0 }
}

async function main() {
  await mkdir(VARIANTS_RAW, { recursive: true })
  console.log(`=== GE v2 Production — Region (East Asia) — recraft-v3 — ${VARIANTS.length} variants ===\n`)

  const results = []
  for (const v of VARIANTS) {
    const prompt = TEMPLATE(v)
    process.stdout.write(`[${v.id}] ${v.demo.padEnd(35)} ... `)
    try {
      const r = await runRecraft(prompt)
      const filename = `region-asia-${v.id}-${TS}.png`
      await writeFile(resolve(VARIANTS_RAW, filename), r.buffer)
      const sizeKb = (r.buffer.length / 1024).toFixed(0)
      console.log(`ok ${(r.latencyMs / 1000).toFixed(1)}s ${sizeKb}KB`)
      results.push({ ...v, status: 'ok', filename, sizeKb, latencyMs: r.latencyMs, prompt, error: null })
    } catch (err) {
      console.log(`FAILED — ${err.message}`)
      results.push({ ...v, status: 'failed', filename: null, sizeKb: null, latencyMs: null, prompt, error: err.message })
    }
  }

  // Append to prompts.md
  let block = `\n## Production — Region (East Asia) — recraft-v3 — ${TS}\n\n`
  block += `**Approach:** production pass for East Asia region. Tightened template per Spike 3 audit findings — pose lock (front-facing 3/4 view), harder BG language, sprite-scale optimization. Clothing colors stay free per variant; region distinction is provided by the colored CSS dot background behind each sprite, not by the sprite itself.\n\n`
  block += `**Template:**\n\n\`\`\`\nA character portrait of a contemporary East Asian {demo} with {hair}, {skin} skin tone, wearing {attire}. Front-facing 3/4 view, head-and-shoulders composition centered in frame. Flat vector illustration style with thick black outline and simple solid colors. Fully transparent background — absolutely no border, no card frame, no surrounding rectangle, no white box, no app icon container — just the figure on full transparency. Square composition. Friendly neutral expression. Designed to read clearly at small icon sizes (24-48px display) with strong shapes and high contrast. Style: minimal, clean, app-icon-like.\n\`\`\`\n\n`
  block += `**Variants:**\n\n`
  block += `| ID | Demo | Hair | Skin | Attire | Status |\n|---|---|---|---|---|---|\n`
  for (const r of results) {
    const status = r.status === 'ok' ? `[\`${r.filename}\`](variants-raw/${r.filename})` : `**FAILED:** ${r.error.slice(0, 60)}`
    block += `| ${r.id} | ${r.demo} | ${r.hair} | ${r.skin} | ${r.attire} | ${status} |\n`
  }
  block += `\n**Next step:** visual review of the SET (not individual variants) for coherence + diversity; verdict in \`./diversity-audit.md\` and \`../tooling/tool-comparison.md\`.\n`
  await appendFile(PROMPTS_LOG, block)

  // Append to tool-comparison.md
  const ok = results.filter(r => r.status === 'ok')
  let toolBlock = `\n## Production — Region (East Asia) — recraft-v3 — ${TS}\n\n`
  toolBlock += `Single tool, ${VARIANTS.length} variants from locked template. Set-coherence verdict TBD.\n\n`
  toolBlock += `Latency: avg ${(ok.reduce((s, r) => s + r.latencyMs, 0) / ok.length / 1000).toFixed(1)}s, total ${(ok.reduce((s, r) => s + r.latencyMs, 0) / 1000).toFixed(1)}s\n`
  toolBlock += `Cost: ~$${(ok.length * 0.04).toFixed(2)} estimated\n`
  await appendFile(TOOL_LOG, toolBlock)

  console.log(`\nSummary: ${ok.length}/${results.length} succeeded`)
  console.log(`Outputs: ${VARIANTS_RAW}`)
}

main().catch(err => { console.error('Fatal:', err.message); process.exit(1) })
