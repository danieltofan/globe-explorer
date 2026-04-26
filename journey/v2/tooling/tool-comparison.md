# Tool Comparison

Tried tools, what each is good at, what each fails at, $ per output, time per iteration. **Pick by trying, not by hearsay.**

Candidates: Flux 2 / DALL-E 3 / Imagen / Midjourney / Stable Diffusion / Gemini Image / Recraft / Ideogram.

Per tool, capture:
- Setup friction
- Best output achieved
- Worst output (yes, save it)
- Style consistency across multiple variants
- Diversity output without explicit prompting (the unprompted default IS the bias)
- Cost per image
- Iteration time
- Verdict + why

## Spike 1 — Region (East Asia) — 2026-04-24T23-30-42Z

Same prompt, 4 tools. Visual verdicts pending eyeball pass.

| Tool | Status | Latency | Size | Verdict (TBD after review) |
|---|---|---|---|---|
| `flux-2-pro` | ok | 9.2s | 1041KB | Generic cartoon, app-icon framing; safest default; weak geographic anchoring |
| `flux-schnell` | ok | 2.4s | 525KB | Fast + cheap (~$0.003); leans into "Asian businesswoman" trope on naive prompt |
| `recraft-v3` | ok | 6.6s | 1266KB | Best sprite-suited style; **kimono stereotype on naive prompt** — needs hard locking |
| `gpt-image-1` | ok | 14.9s | 1509KB | Cleanest icon grammar; effectively ignored geographic anchor — Western-cartoon default |

**Spike 1 conclusion:** the naive prompt collapses each tool to its default association — three different failure modes (stereotype, narrow class, erasure). The tool isn't the variable to optimize first; the prompt + style-lock + diversity scaffolding is. Spike 2 should iterate the prompt against the same set of tools, not change tools.

**Cost so far:** ~$0.10 estimated (flux-2-pro $0.04 + recraft-v3 $0.04 + gpt-image-1 medium ~$0.04 + flux-schnell ~$0.003).

## Spike 2 — Region (East Asia) — 2026-04-25T00-02-21Z

Same prompt, 4 tools. Visual verdicts pending eyeball pass.

| Tool | Status | Latency | Size | Verdict (TBD after review) |
|---|---|---|---|---|
| `flux-2-pro` | ok | 9.1s | 891KB | TBD |
| `flux-schnell` | ok | 2.3s | 415KB | TBD |
| `recraft-v3` | ok | 6.6s | 550KB | TBD |
| `gpt-image-1` | ok | 22.4s | 1316KB | TBD |

## Spike 3 — Region (East Asia) — recraft-v3 — 2026-04-26T00-10-19Z

Single tool, 8 variants from locked template. Set-coherence verdict TBD.

Latency: avg 6.7s, total 53.2s
Cost: ~$0.32 estimated

## Production — Region (East Asia) — recraft-v3 — 2026-04-26T16-59-32Z

Single tool, 12 variants from locked template. Set-coherence verdict TBD.

Latency: avg 7.0s, total 83.7s
Cost: ~$0.48 estimated
