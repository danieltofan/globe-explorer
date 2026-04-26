# 01 Region — Diversity Audit

Findings + remediation decisions. Surface stereotypes early; commit to genuine within-region diversity, not "one face per region × N copies."

---

## Spike 1 — East Asia, naive prompt — 2026-04-24

**Prompt under audit:** see `prompts.md` Spike 1.

**Findings (all four tools, same prompt):**

| Tool | What it produced | Audit flag |
|---|---|---|
| flux-2-pro | Boy, modern cartoon, app-icon style | Generic-friendly; no overt stereotype, but also not visibly anchored to "East Asia" beyond skin/hair tones |
| flux-schnell | Woman in business blazer, semi-realistic | Anchors on "Asian businesswoman" trope — narrow class signifier |
| recraft-v3 | Woman in **kimono-style traditional dress** | **Stereotype trap fired.** Textbook orientalism: traditional dress as default representation of "person from East Asia." This is the failure mode the audit exists to catch. |
| gpt-image-1 | Boy laughing, classic vector cartoon | Effectively ignored "East Asia" stylistically — output looks like a Western-cartoon child. Different failure: erasure rather than stereotype. |

**Diagnosis:** the prompt is the problem, not the tools. "A person from East Asia" with no other specification lets each model fall back to its default association. Three of four defaults are pedagogically unacceptable.

**Remediation rules going forward:**

1. **Prompts must specify modern, contemporary contexts** — "wearing modern everyday clothing (not traditional dress)" or similar. Negative-prompt the stereotype explicitly.
2. **Style must be locked.** Specify "flat vector style, thick outline, transparent background" so all 15–20 region variants share visual language. Without lock, every output is its own art piece.
3. **Within-region diversity must be enforced.** A single "person from East Asia" prompt collapses to one default; we need to vary gender, age, hair, attire, expression across variants explicitly.
4. **Reference-image conditioning** (where supported — recraft-v3 supports it; gpt-image-1 supports input images) may be the only reliable way to lock style across many variants. To investigate Spike 3+.

**The income-mode lesson preview:** if "person from East Asia" produces a kimono by default, "person with high income" will produce a suit, and "person with low income" will produce worn clothing. This is exactly why Income mode requires its own design phase BEFORE prompting (see `../05-income/redesign.md`). Spike 1 has now demonstrated that risk concretely.
