# Globe Explorer - Session Log

**Project:** Globe Explorer - Interactive Data Visualization Portfolio Piece
**Repository:** `C:\Code\Vue\globe-explorer`
**Live URL:** https://globe-explorer.codecrank.ai
**Stack:** Vue 3.5, Vite 7, Tailwind CSS 3, DaisyUI 4, Vue Router 4, Three.js, Vitest
**PageSpeed:** 100/100/100/100 (mobile)
**Tests:** 153 passing, 92% coverage

**Tests:** 172 passing (was 153 before v2 work)
**Live status:** v2 + Compare typeahead shipped 2026-04-28 (see Session 133).
**Active initiative:** Module 1+ authoring for the Neurons Lab Framework Battle course; Compare and HundredPeople will serve as the reference implementations students rebuild with AI assistance. Cross-reference: [`C:\Code\CodeCrank\strategy\neurons-course\BUILD_PLAN.md`](../../CodeCrank/strategy/neurons-course/BUILD_PLAN.md) Phase 8.

---

## Session 133 - April 28, 2026 (v2 Live + Compare Typeahead Shipped)

**Focus:** merge v2 to master and publish; add typeahead search to the Compare view; verify live deploy.

### Shipped to master + live

Two squashed commits landed on `master` and pushed to GitHub Pages:

```
b0579c9 feat(compare): typeahead-enabled country search
bc85bf7 feat(hundred-people): v2 display toggle — colored disc + silhouette icon overlay
```

`v1.0-dots` tag pushed to origin (was lightweight; needed an explicit `git push origin v1.0-dots` after `--follow-tags` skipped it).

### Compare typeahead

Added per-side search inputs above each country selector with true typeahead — typing auto-selects the first match if the currently-selected country no longer matches the query (e.g. type "germ" while US is selected → jumps to Germany; type "uni" while US is selected → stays on US, still matches). Search text persists during typing so the user can keep refining; only a real dropdown pick or the swap button clears the search.

Implementation pattern worth noting (will become a Module 1 lesson moment): two-layer computeds per side — `matches` (post-filter only, drives the typeahead auto-select) and `filtered` (matches + always-pinned current, drives the `<select>`'s options so the control retains its label). We watch `matches` (not the raw query) so the typeahead callback always sees the post-filter list synchronously.

Closes a dead-code gap: `searchQuery` and `filteredCountries` were defined in `<script setup>` since the original Compare commit but never referenced by the template. The original author clearly intended a search input that was never built.

Code-review findings addressed before merge: swap button now clears both search queries (avoided stale-text-vs-current-selection confusion); misleading test comment about a non-existent watcher corrected; clarifying comments added about the two-layer pattern and why we watch `matches` not the raw query.

### Tests

172/172 green (was 162; +10 new in `Compare.test.js` covering search rendering, name/code filtering, typeahead auto-select, current-selection preservation, search persistence, swap-clears-both, per-side independence).

### Verification (live)

- `git fetch` → master matches origin at `b0579c9` ✓
- `git ls-remote --tags origin v1.0-dots` → tag on origin ✓
- `curl -sI https://globe-explorer.codecrank.ai` → 200 OK ✓
- Live bundle hash changed post-deploy; `assets/asia-*.png` returns 200 (icon assets shipped) ✓
- Daniel verified the toggle and typeahead work in the live UI

### Future-pass items captured but not done

- Auto-play storytelling rotation: only 10 facts across 5 modes makes repetition visible during long auto-plays. TODO comment in `regions.js`.
- Compare 3+ country comparison: discussed; deferred — adds little new pedagogy beyond what 100 People / Cartogram already teach.
- Country shape silhouettes in Compare headers: discussed; rejected — flags do the recognizability work better than AI-generated silhouettes would, and generation risk doesn't pay off.

### Next up

Module 1 of the Neurons Lab Framework Battle course (Compare rebuild) can begin. Compare.vue is the reference implementation; the typeahead iteration here ("first commit shipped a non-working version, code review caught swap+search bug, second commit fixed it") is one of the "even gold first attempts need iteration" lesson moments the course will teach honestly.

---

## Session 132 - April 27-28, 2026 (v2 Production-Ready: Toggle + Continent/Mode Icons)

**Focus:** v2 lands as an opt-in display toggle on the live HundredPeople component. After two abandoned design directions (per-region face sprites; one-shot 100-figure portrait grid), settled on colored discs with white silhouette icons — continents for Region mode, abstract icons for Income / Internet / Urban-Rural / Age. Production-ready and publishable.

### Direction history (in priority of acceptance)

1. **Per-region face sprites** (Spikes 1-3, ~$0.52). Failed: at icon scale, ethnicity isn't readable; at hover/zoom scale, semantic mismatches (light-skinned face in Africa cell) became loud. The colored ring carried all the regional signaling anyway.
2. **One-shot 100-figure grid via gpt-image-2** (~$0.17). Same semantic-mismatch problem at scale.
3. **Continent silhouettes + abstract mode icons** (current — ~$0.76, 19 static assets via gpt-image-1). Works because shapes/symbols don't carry the human-coded baggage faces did. Color encodes category; shape encodes identity, not classification.

Total v2 exploration cost: ~$1.45 across all three directions.

### Shipped on `feature/v2-sprite-faces` branch

- **19 silhouette icons** (`src/assets/categories/`): 6 continents + 13 mode icons (income×6, internet×2, urban×2, age×3). Generated 1024×1024 → resized to 256×256 for production (217 KB total bundle weight, down from 5.4 MB).
- **Display toggle** (`src/features/hundred-people/HundredPeople.vue`): new `useIcons` ref defaults to `false` (v1 dots stay default until v2 is proven). Toggle row above the mode selector. Each dot conditionally gains a centered 80% silhouette overlay; legend swatches gain matching icons. All existing behavior (mode transitions, hover, keyboard nav, storytelling, ARIA) preserved untouched.
- **Data layer** (`src/shared/data/regions.js`): icon imports + `icon` field on every category in every viewMode. Vite-bundled via static URL imports.
- **Tooling** (`journey/v2/tooling/`): `generate-continents.mjs`, `generate-mode-icons.mjs`, `process-continents.mjs` (sharp pipeline). Reproducible end-to-end.
- **Tests:** 162 passing (was 153 — added 9 new v2-toggle tests in `HundredPeople.test.js` covering default state, click handling, icon rendering, legend overlay, mode-switch persistence).
- **Light strip** of `journey/v2/`: deleted 25 MB of abandoned-direction artifacts (per-region spike outputs, empty per-mode skeletons, face-direction tooling). Kept the 1024×1024 source icons + regeneration scripts + lessons-learned markdown for course material reference.
- **Auto-play storytelling TODO** logged in `regions.js`: only 10 facts across 5 modes means visible repetition during long auto-play; future polish item.

### Build and test status

- `npm test:run` → 162/162 green
- `npm run build` → clean; total icon weight ~217 KB; pre-existing 500KB+ chunk warning is `LanguageSpace.js` (Three.js), not v2-related
- Tag `v1.0-dots` still anchored at the canonical pre-v2 commit (`586cd15`)

### Branch state at session end

10 commits ahead of master, ready to merge. Master untouched per instructions.

```
09cd162 chore(v2): light strip — drop abandoned exploration artifacts (-25MB)
bd1a54d perf(v2): resize icon assets from 1024x1024 to 256x256 (5.4MB → 217KB)
dd3182f test(hundred-people): cover v2 toggle behavior (9 new tests)
5be7bb3 docs(hundred-people): TODO — broaden auto-play storytelling rotation
abe51f1 feat(hundred-people): v2 display toggle — colored disc + silhouette icon overlay
d0de967 feat(v2): standalone preview page — 5 modes, dots-vs-icons compare
b9313cd chore(v2): drop abandoned face-grid exploration; document direction history
7d932c1 feat(v2): generate + process region + mode icon silhouettes (19 categories)
0629ed3 chore(deps): add sharp for v2 image tooling
5e51a2e chore(v2): capture spike outputs + generation scripts
```

### Next up

- Daniel's review + merge strategy (squash vs fast-forward) → master
- Push → GitHub Pages auto-deploys
- Update README banner from "v2 in progress" to "v2 shipped as opt-in toggle"
- Lighthouse spot-check on live to confirm 100/100 still holds
- Course Module 2 authoring can begin using this work as the reference build (Neurons Lab Framework Battle)

---

## Session 131 - April 24, 2026 (v2 Scaffolding + v1.0-dots Tag)

**Focus:** Scaffold the v2 build journal directory structure and lock in the capture protocol that will produce honest course material later. Tag the canonical pre-v2 commit so Lab course Modules 1–4 have an immutable reference point.

### Completed

- **Tag:** `v1.0-dots` created on `586cd15` (the last commit before v2 references existed). This is the canonical pre-v2 state that the Lab Framework Battle course's Modules 1–4 reference. Tags chosen over branches because tags don't rot. (Local only — Daniel pushes when ready.)
- **Scaffolded `journey/v2/`** in the GE repo. Structure:
  - `README.md` — full capture protocol + risk audit + course cross-reference
  - Per-mode subdirectories (`01-region`, `02-age`, `03-urban-rural`, `04-internet`, `05-income`) each with `prompts.md`, `decisions.md`, `variants-raw/`, `variants-final/`. Region also has `diversity-audit.md`. Income also has `redesign.md` (the headline "what AI got wrong" story).
  - `tooling/` with `tool-comparison.md` and `sprite-pipeline.md` skeletons.
- **Capture protocol locked.** The hardest rule: capture *before* curating. Failed prompts and bad outputs are not deleted — they're the lesson. Reconstructed-after-the-fact prompts produce tutorial fiction. See `journey/v2/README.md` for the full 7-step checklist.
- **Risk audit pinned in scaffolding** so each mode's notes file already states its risk level and approach (Income highest — design BEFORE prompting).

### Next concrete step

Tooling spike: try Flux 2 / DALL-E 3 / Imagen / Midjourney on a single Region prompt each, capture outputs to `journey/v2/01-region/variants-raw/`, document trade-offs in `journey/v2/tooling/tool-comparison.md`. **Pick by trying, not by hearsay.**

### Status

- Tag in place. Scaffolding committed.
- No prompts sent yet. No variants generated yet.
- Ready for the tooling spike whenever work resumes.

---

## Session 130 - April 24, 2026 (v2 Initiative Kickoff — Sprite Faces Upgrade)

**Focus:** Lock the strategy for upgrading the 100 People view from colored dots to AI-generated sprite faces, and capture the cross-repo dependency with the Neurons Lab course.

### Strategic decisions

- **Live demo = v2.** When v2 ships, `globe-explorer.codecrank.ai` updates to the sprite-faces version. v2 is the wow moment that sells the Neurons Lab course; live demo must reflect it.
- **Tag v1 before starting v2.** Create `v1.0-dots` git tag on current HEAD before the first v2 commit. The tag is immutable and serves as the permanent reference point for the Neurons Lab course's Modules 1–4 (which teach building the dots version). Tags chosen over branches because branches rot; tags don't.
- **Optional v1 deploy** at `v1.globe-explorer.codecrank.ai` — TBD whether worth the small cost; provides a "what mine should look like at end of Module 4" comparison for course students. Decide later.
- **Journey capture is non-negotiable.** Every prompt, every failed AI output, every design decision must be logged in real time during v2 development. The captured journey IS the Module 5 Path A lesson. Reconstruct-after-the-fact produces sanitized fiction; the real process is what makes the lesson authentic.

### Five sprite modes — design-risk audit

The five 100-People modes are NOT equally safe. Risk levels locked:

| Mode | Risk | Approach |
|---|---|---|
| Region (faces) | Low if executed well | 15–20 variants per region; commit to within-region diversity, not stereotyping |
| Age | Low | Infant → child → adult → elderly progression |
| Urban/Rural | Medium | Use building density (skyscraper / apartment / single home / single home with land); avoid "huts" caricature |
| Internet | Medium | Real device tiers (smartphone / basic phone / no device); drop the abacus icon (orientalism trap) |
| Income | **Highest** | Attire-as-class is globally unreliable. Replace with abstract symbols (coin counts, dwelling size, bar height) so income reads quantitatively. The income-mode redesign is itself the central "AI gave me what I asked for; what I asked for was wrong" lesson moment in Module 5. |

### Technical shape

- **Five sprite sheets**, one per mode. ~15–20 unique variants per sheet at 64×64 render size, packed as WebP at quality ~75. Target total payload <500KB across all five.
- **Stable person identity:** each of the 100 dots gets a persistent `person-001..100` identity. Mode change swaps which sprite layer is shown for that person, not which person is in that grid cell. Same individual, different lens — richer storytelling than the current "shuffle on mode change" pattern.
- **A11y:** per-dot `aria-label` ("Person from Asia, age 35, urban, has internet, middle income"). Faces are decorative; labels are the truth.

### Build sequencing

1. Tag `v1.0-dots` on current main (must precede v2 commit 1).
2. Author sprite generation prompts; iterate on Region mode first (lowest risk, validates the pipeline).
3. Run diversity audit on Region output before adopting; iterate until clean.
4. Repeat per mode in risk order: Age → Urban/Rural → Internet → Income.
5. Income mode requires explicit design phase before generation — DO NOT just prompt for "rich/middle/poor people"; design the abstract symbol approach first.
6. Pack sprites; integrate with HundredPeople.vue using the stable-identity pattern.
7. Tests: visual regression where possible, manual diversity-distribution checklist where not.
8. Update README to flag v2 + reference v1 tag for course material.
9. Deploy. Live demo flips to v2.
10. Hand off journey log to Neurons Lab Module 5 Path A authoring (BUILD_PLAN Phase 8.6).

### Cross-repo references

- BUILD_PLAN Phase 8.6 (Module 5 capstone) is blocked on this v2 work shipping + the journey being captured.
- BUILD_PLAN Appendix A-10 locks this v1/v2 strategy as the canonical decision.
- Modules 1–4 of the Lab course are NOT blocked by this v2 work.

### Status

- **Open.** Strategy locked, no code yet.
- Next concrete step when work resumes: create the `v1.0-dots` tag.

---

## Session 129 - December 4, 2025

**Focus:** Globe Explorer fixes + hash routing for GitHub Pages

- Resolved git conflict on PageSpeed Me link (kept static URL)
- Switched to hash routing (`createWebHashHistory`) to fix GitHub Pages 404 on page reload
- Pushed all Globe Explorer commits

**Commits:**
- `dc619b7` - fix: use hash routing for GitHub Pages compatibility
- `95ee8ea` - Merge branch 'master' of https://github.com/danieltofan/globe-explorer
- `d2a9c1e` - feat: add PageSpeed Me link to footer
- `13b1033` - feat: add PageSpeed Me link to footer

---

## Session 128 - December 4, 2025

**Focus:** Globe Explorer production launch + deployment

- Deployed to production at https://globe-explorer.codecrank.ai
- Achieved 100/100/100/100 PageSpeed on mobile
- GitHub Pages deployment via Actions workflow
- DNS: CNAME in Cloudflare pointing to danieltofan.github.io (DNS only mode)
- SSL: Let's Encrypt certificate provisioned (~2 hours)
- Added comprehensive README with features, setup, and coverage info
- Added JSDoc to exported utility functions
- Added LanguageSpace tests, improved coverage from 64% to 92% (153 tests)
- Globe Explorer moved to "Public GitHub Showcases" in PROJECT_REGISTRY.md

**Commits:**
- `326b2cb` - ci: add GitHub Actions workflow for Pages deployment
- `f6a47bd` - chore: add CNAME for custom domain
- `2242765` - docs: add JSDoc to exported utility functions
- `7a104ec` - test: add LanguageSpace tests, improve coverage to 92%
- `3b7d6b5` - docs: add comprehensive README with features, setup, and coverage

---

## ~128a - December 4, 2025

**Focus:** Countries Cartogram, Language Space, Compare, and navbar polish

These features were built on December 4 between Sessions 127 and 128 but were not logged as a separate numbered session in the master dump.

- Built World Cartogram: 195 countries as tiles mimicking world map, tile size = geographic area, tile color = selected metric (population, GDP, life expectancy, internet access), 8 color themes, flag mode via flagcdn.com, search, detail modal
- Built 3D Language Embedding Space: 50+ languages plotted by linguistic similarity, color-coded by family, interactive click-to-explore, family filter sidebar
- Built Compare Countries page: side-by-side comparison across 5 metrics with visual progress bars and quick facts
- Added navbar animations and logo colors

**Commits:**
- `53dcd00` - style: add navbar animations and logo colors
- `423e9b8` - feat: implement country comparison page
- `35dc1b5` - style(languages): improve sidebar layout and spacing
- `82a74c3` - feat: add 3D Language Embedding Space visualization
- `a50e1a4` - feat(cartogram): use real flag images from flagcdn.com
- `c7af7db` - style(cartogram): improve layout and accessibility
- `3d26090` - feat: add World Cartogram visualization

---

## Session 127 - December 4, 2025

**Focus:** Full WCAG 2.1 accessibility and SEO audit

- Comprehensive accessibility overhaul across all 4 features (10 commits)
- Converted interactive divs to semantic buttons
- Added keyboard handlers (Enter/Space, Escape for modal)
- Added aria-live regions for dynamic content
- Fixed heading hierarchy (h1 > h2 > h3)
- Improved color contrast from /50-/70 to /70-/80, dark theme /90
- Minimum touch targets (24x24px)
- Adaptive text shadows (white/black) for tile contrast
- Hidden illegible text on smallest tiles; tile names hidden on mobile (<768px)
- Minimum 12px font on mobile for small tiles
- Added robots.txt for SEO
- Added favicon.ico and OG image assets
- Added meta tags, skip link, and lazy loading for SEO
- All 106 tests passing after a11y changes (selectors updated)

**Commits:**
- `308af50` - fix(a11y): improve color contrast on LanguageSpace and Compare pages
- `a7d225e` - fix(a11y): set minimum 12px font on mobile for small tiles
- `1fdc46c` - fix(a11y): hide all tile names on mobile (<768px)
- `c3a0919` - fix(a11y): hide illegible text on smallest tiles
- `8e9b8fe` - fix(a11y): adaptive text shadow for tile contrast
- `a138cd5` - fix(a11y): increase contrast to /90 for dark theme compliance
- `f924bb5` - fix(a11y): expand touch targets on small cartogram tiles
- `f26f916` - fix(a11y): improve color contrast for WCAG compliance
- `3a0596d` - fix(a11y): address Lighthouse audit issues
- `593b0d3` - feat(a11y): add comprehensive ARIA labels and keyboard navigation
- `f43796e` - feat: add favicon.ico and OG image assets
- `67a32e9` - feat(seo/a11y): add meta tags, skip link, and lazy loading

---

## Session 125 - December 3, 2025

**Focus:** 100 People visualization complete + Cartogram planned

- Built full "World as 100 People" visualization with all Phase 1 features
- Staggered diagonal wave animation on mode switch (~200ms spread)
- Glassmorphism card, glow effects on hover, gradient header
- Storytelling mode: 10 curated facts, 5s auto-cycle, progress dots
- Income restructured to 6 tiers (Extreme Poverty to Wealthy top 1%), daily amounts
- 54 passing tests, 100% coverage
- Created detailed Countries Cartogram spec (`strategy/globe-explorer/COUNTRIES_CARTOGRAM_SPEC.md`)
- Planned 3-session Cartogram build (data+layout, interactions, polish)

**Commits:**
- `438c289` - feat: add storytelling mode with auto-cycling facts
- `9e5680a` - style: add glassmorphism, glow effects, and visual polish
- `1f860c8` - feat: add staggered wave animation on mode switch

---

## Session 124 - December 3, 2025

**Focus:** Globe Explorer testing infrastructure + initial commit

- Initialized Git repository for Globe Explorer
- Committed initial "World as 100 People" feature
- Added Vitest testing infrastructure with 54 tests at 100% line coverage
- Test files: regions (19), HundredPeople (14), App (6), router (5), CountryList (4), CountryDetail (3), Compare (3)
- Added Globe Explorer to PROJECT_REGISTRY.md "In Progress" pipeline

**Commits:**
- `aa671a9` - test: add Vitest testing infrastructure
- `919eedb` - feat: Globe Explorer - The World as 100 People

---

## Session 123 - December 3, 2025

**Focus:** Globe Explorer scaffolding

- Scaffolded "The World as 100 People" wow portfolio project
- Set up Vue 3.5 + Vite 7 + Tailwind 3 + DaisyUI 4 stack
- Created feature-based project structure (hundred-people, country-detail, compare)
- Established shared data module with population/region data
- Built 10x10 grid of dots with 5 view modes (Region, Income, Internet, Urban/Rural, Age)
- Hover interactions with legend highlighting, dark theme toggle
- Created planning docs: `strategy/globe-explorer/gpt5-ideas.md` (4 concept directions)
- Decided on "100 People" as hero concept with country browser underneath
- Status: scaffolded locally, not yet in Git (no commits this session)
