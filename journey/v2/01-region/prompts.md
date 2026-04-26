# 01 Region — Prompts

Captured in order, verbatim, as sent. Do not reconstruct.

## Spike 1 — Region (East Asia) — 2026-04-24T23-30-42Z

**Prompt** (verbatim):

```
A character portrait of a person from East Asia, illustrated in a friendly cartoon avatar style, transparent or simple background, square composition, suitable for display at 64x64 px.
```

**Author's note:** Written deliberately naive — the kind of prompt a beginner would write on their first attempt. The lesson lives in the audit + iteration that follows, not in this prompt being good. Capture-before-curate rule applies — these outputs stay regardless of quality.

**Outputs:**

- `flux-2-pro` — 9.2s, 1041KB → [`variants-raw/region-spike1-flux-2-pro-2026-04-24T23-30-42Z.png`](variants-raw/region-spike1-flux-2-pro-2026-04-24T23-30-42Z.png)
- `flux-schnell` — 2.4s, 525KB → [`variants-raw/region-spike1-flux-schnell-2026-04-24T23-30-42Z.png`](variants-raw/region-spike1-flux-schnell-2026-04-24T23-30-42Z.png)
- `recraft-v3` — 6.6s, 1266KB → [`variants-raw/region-spike1-recraft-v3-2026-04-24T23-30-42Z.png`](variants-raw/region-spike1-recraft-v3-2026-04-24T23-30-42Z.png)
- `gpt-image-1` — 14.9s, 1509KB → [`variants-raw/region-spike1-gpt-image-1-2026-04-24T23-30-42Z.png`](variants-raw/region-spike1-gpt-image-1-2026-04-24T23-30-42Z.png)

**Next step:** visual review pass; per-tool verdict in `../tooling/tool-comparison.md`; diversity audit in `./diversity-audit.md`.

## Spike 2 — Region (East Asia) — 2026-04-25T00-02-21Z

**Prompt** (verbatim):

```
A character portrait of a contemporary East Asian person wearing modern everyday clothing (NOT traditional dress). Flat vector illustration style, thick black outline, simple solid colors, transparent background, square composition, friendly neutral expression, suitable for use as a small avatar icon at 64x64 px display. Style: minimal, clean, app-icon-like.
```

**Author's note:** Written deliberately naive — the kind of prompt a beginner would write on their first attempt. The lesson lives in the audit + iteration that follows, not in this prompt being good. Capture-before-curate rule applies — these outputs stay regardless of quality.

**Outputs:**

- `flux-2-pro` — 9.1s, 891KB → [`variants-raw/region-spike2-flux-2-pro-2026-04-25T00-02-21Z.png`](variants-raw/region-spike2-flux-2-pro-2026-04-25T00-02-21Z.png)
- `flux-schnell` — 2.3s, 415KB → [`variants-raw/region-spike2-flux-schnell-2026-04-25T00-02-21Z.png`](variants-raw/region-spike2-flux-schnell-2026-04-25T00-02-21Z.png)
- `recraft-v3` — 6.6s, 550KB → [`variants-raw/region-spike2-recraft-v3-2026-04-25T00-02-21Z.png`](variants-raw/region-spike2-recraft-v3-2026-04-25T00-02-21Z.png)
- `gpt-image-1` — 22.4s, 1316KB → [`variants-raw/region-spike2-gpt-image-1-2026-04-25T00-02-21Z.png`](variants-raw/region-spike2-gpt-image-1-2026-04-25T00-02-21Z.png)

**Next step:** visual review pass; per-tool verdict in `../tooling/tool-comparison.md`; diversity audit in `./diversity-audit.md`.

## Spike 3 — Region (East Asia) — recraft-v3 — 2026-04-26T00-10-19Z

**Approach:** locked style template (matching Spike 2 success), 8 variants varying gender / age / hair / skin tone / attire. Goal: confirm set coherence + within-region diversity at scale before templating across other 4 region categories.

**Template:**

```
A character portrait of a contemporary East Asian {demo} with {hair}, {skin} skin tone, wearing {attire}. Flat vector illustration style, thick black outline, simple solid colors, transparent background, square composition, friendly neutral expression, suitable for use as a small avatar icon at 64x64 px display. Style: minimal, clean, app-icon-like.
```

**Variants:**

| ID | Demo | Hair | Skin | Attire | Status |
|---|---|---|---|---|---|
| v01 | young woman in her 20s | long straight black hair | light | a blue blouse | [`region-spike3-v01-2026-04-26T00-10-19Z.png`](variants-raw/region-spike3-v01-2026-04-26T00-10-19Z.png) |
| v02 | middle-aged man in his 40s | short black hair | medium | a gray button-up shirt | [`region-spike3-v02-2026-04-26T00-10-19Z.png`](variants-raw/region-spike3-v02-2026-04-26T00-10-19Z.png) |
| v03 | elderly woman in her 70s | gray hair in a bun | light | a pink cardigan | [`region-spike3-v03-2026-04-26T00-10-19Z.png`](variants-raw/region-spike3-v03-2026-04-26T00-10-19Z.png) |
| v04 | young man in his 20s | messy short black hair | medium | a green t-shirt | [`region-spike3-v04-2026-04-26T00-10-19Z.png`](variants-raw/region-spike3-v04-2026-04-26T00-10-19Z.png) |
| v05 | teen girl around 15 | a black ponytail | light | a yellow sweatshirt | [`region-spike3-v05-2026-04-26T00-10-19Z.png`](variants-raw/region-spike3-v05-2026-04-26T00-10-19Z.png) |
| v06 | older man in his 60s | short gray hair | tan | a brown jacket | [`region-spike3-v06-2026-04-26T00-10-19Z.png`](variants-raw/region-spike3-v06-2026-04-26T00-10-19Z.png) |
| v07 | young woman in her 30s | a short black bob | medium-tan | a red sweater | [`region-spike3-v07-2026-04-26T00-10-19Z.png`](variants-raw/region-spike3-v07-2026-04-26T00-10-19Z.png) |
| v08 | middle-aged woman in her 40s | shoulder-length black hair and glasses | light | a white blouse | [`region-spike3-v08-2026-04-26T00-10-19Z.png`](variants-raw/region-spike3-v08-2026-04-26T00-10-19Z.png) |

**Next step:** visual review of the SET (not individual variants) for coherence + diversity; verdict in `./diversity-audit.md` and `../tooling/tool-comparison.md`.

## Production — Region (East Asia) — recraft-v3 — 2026-04-26T16-59-32Z

**Approach:** production pass for East Asia region. Tightened template per Spike 3 audit findings — pose lock (front-facing 3/4 view), harder BG language, sprite-scale optimization. Clothing colors stay free per variant; region distinction is provided by the colored CSS dot background behind each sprite, not by the sprite itself.

**Template:**

```
A character portrait of a contemporary East Asian {demo} with {hair}, {skin} skin tone, wearing {attire}. Front-facing 3/4 view, head-and-shoulders composition centered in frame. Flat vector illustration style with thick black outline and simple solid colors. Fully transparent background — absolutely no border, no card frame, no surrounding rectangle, no white box, no app icon container — just the figure on full transparency. Square composition. Friendly neutral expression. Designed to read clearly at small icon sizes (24-48px display) with strong shapes and high contrast. Style: minimal, clean, app-icon-like.
```

**Variants:**

| ID | Demo | Hair | Skin | Attire | Status |
|---|---|---|---|---|---|
| p01 | young woman in her 20s | long straight black hair | light | a blue blouse | [`region-asia-p01-2026-04-26T16-59-32Z.png`](variants-raw/region-asia-p01-2026-04-26T16-59-32Z.png) |
| p02 | young man in his 20s | short messy black hair | medium | a teal t-shirt | [`region-asia-p02-2026-04-26T16-59-32Z.png`](variants-raw/region-asia-p02-2026-04-26T16-59-32Z.png) |
| p03 | woman in her 30s | a short black bob | medium-tan | a red turtleneck | [`region-asia-p03-2026-04-26T16-59-32Z.png`](variants-raw/region-asia-p03-2026-04-26T16-59-32Z.png) |
| p04 | man in his 30s | short black hair and glasses | light | a gray sweater | [`region-asia-p04-2026-04-26T16-59-32Z.png`](variants-raw/region-asia-p04-2026-04-26T16-59-32Z.png) |
| p05 | woman in her 40s | shoulder-length black bob with bangs | light | a mustard cardigan | [`region-asia-p05-2026-04-26T16-59-32Z.png`](variants-raw/region-asia-p05-2026-04-26T16-59-32Z.png) |
| p06 | man in his 40s | short black hair | medium-tan | an olive button-up shirt | [`region-asia-p06-2026-04-26T16-59-32Z.png`](variants-raw/region-asia-p06-2026-04-26T16-59-32Z.png) |
| p07 | teen girl around 15 | a long black ponytail | light | a peach hoodie | [`region-asia-p07-2026-04-26T16-59-32Z.png`](variants-raw/region-asia-p07-2026-04-26T16-59-32Z.png) |
| p08 | teen boy around 16 | short black hair | medium | a navy t-shirt | [`region-asia-p08-2026-04-26T16-59-32Z.png`](variants-raw/region-asia-p08-2026-04-26T16-59-32Z.png) |
| p09 | woman in her 50s | medium-length black hair and glasses | light | a white blouse | [`region-asia-p09-2026-04-26T16-59-32Z.png`](variants-raw/region-asia-p09-2026-04-26T16-59-32Z.png) |
| p10 | man in his 50s | short black hair partly gray at the sides | tan | a dark green polo shirt | [`region-asia-p10-2026-04-26T16-59-32Z.png`](variants-raw/region-asia-p10-2026-04-26T16-59-32Z.png) |
| p11 | woman in her 70s | gray hair in a low bun | light | a lavender blouse | [`region-asia-p11-2026-04-26T16-59-32Z.png`](variants-raw/region-asia-p11-2026-04-26T16-59-32Z.png) |
| p12 | man in his 70s | short gray hair | tan | a brown jacket | [`region-asia-p12-2026-04-26T16-59-32Z.png`](variants-raw/region-asia-p12-2026-04-26T16-59-32Z.png) |

**Next step:** visual review of the SET (not individual variants) for coherence + diversity; verdict in `./diversity-audit.md` and `../tooling/tool-comparison.md`.
