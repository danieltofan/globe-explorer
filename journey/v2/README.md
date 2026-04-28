# Globe Explorer v2 — Build Journey

This directory is the provenance of the v2 visualization upgrade. The production assets live in [`../../src/assets/categories/`](../../src/assets/categories/). This directory keeps the **source-resolution originals**, the **regeneration tooling**, and the **lessons learned** so the v2 design history can be reconstructed if needed (and so the Neurons Lab Framework Battle course has reference material when it's authored).

**Final direction (2026-04-27):** colored region/mode discs with a white **silhouette icon** layered on top — continent shapes for Region mode, abstract icons for Income / Internet / Urban-Rural / Age. Six static continent assets + 13 mode icons; no per-cell uniqueness. The colored disc preserves v1's visual language at icon scale.

---

## Direction history (so future readers don't relitigate)

Two earlier directions were tried and abandoned before landing on silhouettes. Both are preserved in commit history; the artifacts have been removed from the working tree.

1. **Per-region human face sprites** (Spike 1–3, ~$0.52). Generated diverse human portraits per region. **Failed because:** at icon scale, ethnicity isn't readable (the colored ring does all the regional work), and at hover/zoom scale the implied "this is one of the 60 East Asians" semantic mismatch is loud — a light-skinned face in an "Africa" cell is a problem the visualization has no answer for.
2. **One-shot 100-figure portrait grid** via gpt-image-2 + slicer (~$0.17 + slicing). Cleaner style consistency than per-sprite generation. **Failed for the same semantic-mismatch reason** — generic globally-mixed faces meant Africa's 18 cells didn't look African, etc.
3. **Continent silhouettes + mode icons** (current — ~$0.76, 19 single-purpose static assets). **Works because:** a continent shape has no ethnicity to misrepresent. Income / age / etc. icons are abstract symbols, no human-coded baggage. The colored ring continues to do the categorical work; the icon is identity, not classification.

Total v2 exploration cost: ~$1.45 across all directions.

---

## Directory Layout

```
journey/v2/
├── README.md                          (this file)
├── 01-region/
│   ├── continents/                    6 continent silhouettes at 1024x1024 — sources
│   │   ├── <id>.png                   raw black-on-white from gpt-image-1
│   │   └── <id>-white.png             post-processed white-on-transparent
│   ├── icons/                         13 mode icon silhouettes at 1024x1024 — sources
│   │   ├── <id>.png                   raw
│   │   └── <id>-white.png             post-processed
│   ├── prompts.md                     verbatim prompts from Spikes 1/2/3
│   ├── decisions.md                   per-spike decisions
│   └── diversity-audit.md             stereotype-trap findings from Spike 1
├── preview/
│   └── grid.html                      standalone design comparator (v1 vs v2, all 5 modes)
└── tooling/
    ├── generate-continents.mjs        gpt-image-1 → 6 continent silhouettes
    ├── generate-mode-icons.mjs        gpt-image-1 → 13 mode icons
    ├── process-continents.mjs         sharp → black-on-white to white-on-transparent
    └── tool-comparison.md             per-tool verdicts from the early spikes
```

---

## Reproducing the Production Icons

If you ever need to regenerate at different dimensions or change the style:

```bash
# 1. Regenerate the 1024x1024 sources (~$0.76 total, 5 minutes)
node journey/v2/tooling/generate-continents.mjs
node journey/v2/tooling/generate-mode-icons.mjs

# 2. Post-process to white-on-transparent
node journey/v2/tooling/process-continents.mjs

# 3. Resize for production use (one-liner with sharp; current target is 256x256)
# See the perf(v2) commit message for the exact sharp pipeline.
```

The production deliverables are the 256x256 PNGs in [`src/assets/categories/`](../../src/assets/categories/). Those are bundled by Vite and referenced by `src/shared/data/regions.js`.

---

## Course Cross-Reference

The lessons learned in this directory feed Neurons Lab Framework Battle Module 2 (the 100 People rebuild). When that lesson is authored, it can quote `prompts.md` and `diversity-audit.md` directly — they're real material from the actual build, not reconstruction.

See [`C:\Code\CodeCrank\strategy\neurons-course\BUILD_PLAN.md`](../../../../CodeCrank/strategy/neurons-course/BUILD_PLAN.md) Phase 8.3 for module sequencing.

---

**Status:** v2 shipped as opt-in toggle (default still v1 dots). 19 production icons in `src/assets/categories/`. 162/162 tests green.
