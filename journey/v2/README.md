# Globe Explorer v2 — Build Journey

This directory is the raw provenance of the v2 visualization upgrade.

**Final direction (2026-04-27):** colored region/mode discs with a white **silhouette icon** layered on top — continent shapes for Region mode, abstract icons for Income / Internet / Urban-Rural / Age. Six static continent assets + 13 mode icons; no per-cell uniqueness. The colored disc preserves the v1 visual language.

## Direction history (so future readers don't relitigate)

Two earlier directions were tried and abandoned before landing on silhouettes. Both are preserved in commit history; raw outputs from the first were intentionally kept (`01-region/variants-raw/`); intermediate face-grid outputs from the second were dropped to keep the repo light.

1. **Per-region human face sprites** (Spike 1–3, ~$0.52). Generated diverse human portraits per region. **Failed because:** at icon scale, ethnicity isn't readable (the colored ring does all the regional work), and at hover/zoom scale the implied "this is one of the 60 East Asians" semantic mismatch is loud — a light-skinned face in an "Africa" cell is a problem the visualization has no answer for.
2. **One-shot 100-figure portrait grid** via gpt-image-2 + slicer (~$0.17 + slicing). Cleaner style consistency than per-sprite generation. **Failed for the same semantic-mismatch reason** — generic globally-mixed faces meant Africa's 18 cells didn't look African, etc. The 144-cell sliced output was deleted from the repo as definitively unused; the slicer logic is gone too. Ask if needed.
3. **Continent silhouettes + mode icons** (current — ~$0.76, 19 single-purpose static assets). **Works because:** a continent shape has no ethnicity to misrepresent. Income / age / etc. icons are abstract symbols, no human-coded baggage. The colored ring continues to do the categorical work; the icon is identity, not classification.

---

## Capture Protocol

Apply this checklist to every v2 work session:

1. **Before opening the AI tool** — write the session goal as one line in the new `SESSION_LOG.md` entry.
2. **Every prompt** — copy verbatim into the appropriate `prompts.md` *as you send it*. Reconstructed prompts lie.
3. **Every output** — save the raw asset to the matching `variants-raw/` immediately. Don't pre-curate.
4. **Every decision** — when you keep / refine / reject, write WHY in `decisions.md` while the reasoning is fresh. Memory-from-yesterday produces fiction.
5. **Failures stay.** Do not delete failed prompts or bad outputs. They're the lesson.
6. **Costs + tools** — log per session: which tool, time spent, $ spent. Students need real numbers to budget their own attempts.
7. **Screenshots of friction** — when an AI tool refuses, hits a safety filter, or misinterprets, capture the UI screenshot. Showing the friction is honest; hiding it produces "of course it worked" fiction.

---

## Directory Layout

```
journey/v2/
├── README.md                          (this file)
├── 01-region/                         5 region categories — lowest risk
│   ├── prompts.md                     prompts in order, with output references
│   ├── variants-raw/                  every output, untouched
│   ├── variants-final/                accepted variants only
│   ├── diversity-audit.md             findings + decisions
│   └── decisions.md                   why kept what, why rejected what
├── 02-age/                            infant → elderly progression
├── 03-urban-rural/                    building density, NOT class signifiers
├── 04-internet/                       device tiers; abacus is banned
├── 05-income/                         HIGHEST risk; abstract symbols, not attire
│   └── redesign.md                    the headline "what AI got wrong" story
└── tooling/
    ├── tool-comparison.md             Flux / DALL-E / Imagen / Midjourney eval
    ├── sprite-pipeline.md             how sheets are packed
    └── sprite-build.mjs               the actual build script (added when we have one)
```

---

## Risk Levels per Mode (locked 2026-04-24)

| Mode | Risk | Approach |
|---|---|---|
| 01 Region | Low | 15–20 variants per region; genuine within-region diversity, not stereotyping |
| 02 Age | Low | Infant → child → adult → elderly progression |
| 03 Urban/Rural | Medium | Building density (skyscraper / apartment / single home / single home with land); avoid "huts" caricature |
| 04 Internet | Medium | Real device tiers (smartphone / basic phone / no device); abacus icon banned (orientalism trap) |
| 05 Income | **Highest** | Attire-as-class is globally unreliable. Abstract symbols only — coin counts, dwelling size, bar height. The income-mode redesign is the central "AI gave me what I asked for; what I asked for was wrong" lesson moment. |

---

## Course Cross-Reference

This directory feeds Neurons Lab Framework Battle Module 5 Path A. See:

- [`C:\Code\CodeCrank\strategy\neurons-course\BUILD_PLAN.md`](../../../../CodeCrank/strategy/neurons-course/BUILD_PLAN.md) — Phase 8.6 + Appendix A-10
- [`../../SESSION_LOG.md`](../../SESSION_LOG.md) — chronological build log

When the course is being authored, lessons will quote this directory directly. Do not rewrite or sanitize after the fact.

---

## Build Sequence (high-level — detail emerges as we build)

1. Tag `v1.0-dots` — done at scaffolding time, before any v2 work. Marks the canonical pre-v2 state.
2. Tooling spike — pick the AI image-gen tool. Document trade-offs in `tooling/tool-comparison.md`. Don't pick by hearsay; try 2–3 and write up what happened.
3. Region mode first — lowest risk, validates the whole pipeline (prompt → output → audit → sprite-sheet pack → integrate → render).
4. Repeat for Age, Urban/Rural, Internet — in risk order.
5. **Income mode requires its own design phase before any prompts go out.** Don't ask AI to render "rich/middle/poor people." Design the abstract symbol approach first; THEN prompt for it.
6. Pack sprites; integrate with `HundredPeople.vue` using stable per-dot person identity.
7. Tests (visual regression + manual diversity-distribution checklist).
8. Update README to reflect v2 reality.
9. Deploy. Live demo flips to v2.
10. Hand off to Lab Module 5 Path A authoring.

---

**Status (2026-04-24):** scaffolding only. No prompts yet. No variants yet. `v1.0-dots` tag created. Next: tooling spike.
