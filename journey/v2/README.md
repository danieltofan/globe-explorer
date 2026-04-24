# Globe Explorer v2 — Build Journey

This directory is the raw provenance of the v2 sprite-faces upgrade. Everything captured here serves a dual purpose:

1. **Honest record** of how v2 actually got built, including every prompt that worked AND every prompt that didn't.
2. **Source material** for Neurons Lab Framework Battle course Module 5 Path A. The course extracts from this directory; the lessons cite real prompts, real failures, real iteration.

**The single hardest rule:** capture *before* curating. The temptation to clean up before saving is what produces tutorial fiction. The first 7 prompts that didn't work are more pedagogically valuable than the 8th that did.

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
