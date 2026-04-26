#!/usr/bin/env node
// GE v2 image-generation spike runner.
// Same prompt across N tools; saves raw outputs and appends to logs.
//
// Reads creds from C:\Code\Nuxt\omnitrain-adcraft\.env.prod (no dotenv dep).
// Usage: node generate-spike.mjs

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
const OPENAI_KEY = process.env.OPENAI_API_KEY
if (!REPLICATE_TOKEN || !OPENAI_KEY) {
  console.error(`Missing creds. Got REPLICATE=${!!REPLICATE_TOKEN} OPENAI=${!!OPENAI_KEY}`)
  process.exit(1)
}

// SPIKE 2 — iterated prompt addressing Spike 1 failure modes:
// (1) "contemporary" + explicit NO traditional dress → kills the kimono trap
// (2) locked style words (flat vector, thick outline, transparent bg) → forces
//     visual consistency across variants for sprite-sheet use
// (3) "friendly neutral expression" → standardizes affect across the set
const PROMPT = "A character portrait of a contemporary East Asian person wearing modern everyday clothing (NOT traditional dress). Flat vector illustration style, thick black outline, simple solid colors, transparent background, square composition, friendly neutral expression, suitable for use as a small avatar icon at 64x64 px display. Style: minimal, clean, app-icon-like."

const TS = new Date().toISOString().replace(/[:.]/g, '-').replace(/-\d{3}Z$/, 'Z')

async function runReplicate(model, input) {
  const t0 = Date.now()
  const createRes = await fetch(`https://api.replicate.com/v1/models/${model}/predictions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${REPLICATE_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ input })
  })
  if (!createRes.ok) {
    throw new Error(`replicate create ${createRes.status}: ${(await createRes.text()).slice(0, 300)}`)
  }
  let prediction = await createRes.json()
  while (!['succeeded', 'failed', 'canceled'].includes(prediction.status)) {
    await new Promise(r => setTimeout(r, 2000))
    const pollRes = await fetch(prediction.urls.get, {
      headers: { Authorization: `Bearer ${REPLICATE_TOKEN}` }
    })
    prediction = await pollRes.json()
  }
  if (prediction.status !== 'succeeded') {
    throw new Error(`replicate ${prediction.status}: ${prediction.error || 'unknown'}`)
  }
  const outputUrl = Array.isArray(prediction.output) ? prediction.output[0] : prediction.output
  const dlRes = await fetch(outputUrl)
  const buffer = Buffer.from(await dlRes.arrayBuffer())
  return { buffer, latencyMs: Date.now() - t0, outputUrl }
}

async function runOpenAI(model, prompt) {
  const t0 = Date.now()
  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENAI_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ model, prompt, n: 1, size: '1024x1024', quality: 'medium' })
  })
  if (!res.ok) {
    throw new Error(`openai ${res.status}: ${(await res.text()).slice(0, 300)}`)
  }
  const data = await res.json()
  const b64 = data.data?.[0]?.b64_json
  if (!b64) throw new Error(`openai no b64 in response`)
  const buffer = Buffer.from(b64, 'base64')
  return { buffer, latencyMs: Date.now() - t0, outputUrl: null }
}

const ATTEMPTS = [
  {
    label: 'flux-2-pro',
    ext: 'png',
    runner: () => runReplicate('black-forest-labs/flux-2-pro', {
      prompt: PROMPT,
      safety_tolerance: 3,
      output_format: 'png',
      resolution: '1 MP',
      aspect_ratio: '1:1'
    })
  },
  {
    label: 'flux-schnell',
    ext: 'png',
    runner: () => runReplicate('black-forest-labs/flux-schnell', {
      prompt: PROMPT,
      aspect_ratio: '1:1',
      num_outputs: 1,
      output_format: 'png'
    })
  },
  {
    label: 'recraft-v3',
    ext: 'png',
    runner: () => runReplicate('recraft-ai/recraft-v3', {
      prompt: PROMPT,
      style: 'digital_illustration',
      size: '1024x1024'
    })
  },
  {
    label: 'gpt-image-1',
    ext: 'png',
    runner: () => runOpenAI('gpt-image-1', PROMPT)
  }
]

async function main() {
  await mkdir(VARIANTS_RAW, { recursive: true })
  console.log(`=== GE v2 Spike 2 — Region (East Asia) — ${TS} ===`)
  console.log(`Prompt: ${PROMPT}\n`)

  const results = []
  for (const attempt of ATTEMPTS) {
    const { label, runner, ext } = attempt
    process.stdout.write(`[${label}] ... `)
    try {
      const result = await runner()
      const filename = `region-spike2-${label}-${TS}.${ext}`
      const filepath = resolve(VARIANTS_RAW, filename)
      await writeFile(filepath, result.buffer)
      const sizeKb = (result.buffer.length / 1024).toFixed(0)
      console.log(`ok ${(result.latencyMs / 1000).toFixed(1)}s ${sizeKb}KB → ${filename}`)
      results.push({ label, status: 'ok', filename, sizeKb, latencyMs: result.latencyMs, error: null })
    } catch (err) {
      console.log(`FAILED — ${err.message}`)
      results.push({ label, status: 'failed', filename: null, sizeKb: null, latencyMs: null, error: err.message })
    }
  }

  // Append to prompts.md
  const ok = results.filter(r => r.status === 'ok')
  const fail = results.filter(r => r.status === 'failed')

  let promptsBlock = `\n## Spike 2 — Region (East Asia) — ${TS}\n\n`
  promptsBlock += `**Prompt** (verbatim):\n\n\`\`\`\n${PROMPT}\n\`\`\`\n\n`
  promptsBlock += `**Author's note:** Written deliberately naive — the kind of prompt a beginner would write on their first attempt. The lesson lives in the audit + iteration that follows, not in this prompt being good. Capture-before-curate rule applies — these outputs stay regardless of quality.\n\n`
  promptsBlock += `**Outputs:**\n\n`
  for (const r of results) {
    if (r.status === 'ok') {
      promptsBlock += `- \`${r.label}\` — ${(r.latencyMs / 1000).toFixed(1)}s, ${r.sizeKb}KB → [\`variants-raw/${r.filename}\`](variants-raw/${r.filename})\n`
    } else {
      promptsBlock += `- \`${r.label}\` — **FAILED:** ${r.error}\n`
    }
  }
  promptsBlock += `\n**Next step:** visual review pass; per-tool verdict in \`../tooling/tool-comparison.md\`; diversity audit in \`./diversity-audit.md\`.\n`
  await appendFile(PROMPTS_LOG, promptsBlock)

  let toolBlock = `\n## Spike 2 — Region (East Asia) — ${TS}\n\n`
  toolBlock += `Same prompt, ${ATTEMPTS.length} tools. Visual verdicts pending eyeball pass.\n\n`
  toolBlock += `| Tool | Status | Latency | Size | Verdict (TBD after review) |\n|---|---|---|---|---|\n`
  for (const r of results) {
    if (r.status === 'ok') {
      toolBlock += `| \`${r.label}\` | ok | ${(r.latencyMs / 1000).toFixed(1)}s | ${r.sizeKb}KB | TBD |\n`
    } else {
      toolBlock += `| \`${r.label}\` | failed | — | — | error: ${r.error.slice(0, 80)} |\n`
    }
  }
  await appendFile(TOOL_LOG, toolBlock)

  console.log(`\nSummary: ${ok.length}/${results.length} succeeded`)
  if (fail.length) console.log(`Failures: ${fail.map(f => f.label).join(', ')}`)
  console.log(`Outputs: ${VARIANTS_RAW}`)
}

main().catch(err => {
  console.error('Fatal:', err.message)
  process.exit(1)
})
