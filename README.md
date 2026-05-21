# Globe Explorer

An interactive data visualization app that helps you understand our world through intuitive, accessible visualizations. Built with Vue 3 and modern web technologies.

> **v2 shipped as an opt-in toggle (April 2026):** the 100 People view now offers a Display: Dots / Icons switch. v1 colored dots remain the default; v2 layers a white silhouette icon (continent shape for Region mode, abstract icon for Income / Internet / Urban-Rural / Age) on top of the same colored disc. The v1 view is preserved verbatim and tagged `v1.0-dots` for reference. Two earlier directions (per-region face sprites; one-shot 100-figure portrait grid) were tried and abandoned — see [`SESSION_LOG.md`](SESSION_LOG.md) Session 132 and [`journey/v2/README.md`](journey/v2/README.md) for the design history.

## Features

### The World as 100 People

Imagine shrinking Earth's 8 billion people down to just 100. This visualization makes global statistics tangible and memorable.

**5 View Modes:**
- **By Region** — Where do people live? (59 Asia, 18 Africa, 9 Europe...)
- **By Income** — From extreme poverty (<$2/day) to wealthy top 1% (>$150/day)
- **Internet Access** — 63 connected, 37 offline
- **Urban vs Rural** — 57 city dwellers, 43 countryside
- **By Age** — Children, working age, elderly distribution

**Interactive Features:**
- **Display toggle (Dots / Icons)** — switch between v1 colored dots and v2 colored discs with white silhouette icons (continent shape per region; abstract icon per income / internet / urban-rural / age category)
- Hover over dots or legend to highlight groups
- Smooth wave animations on mode transitions
- Auto-play storytelling mode with 10 curated facts
- Keyboard accessible (Enter/Space to select)

### Countries Cartogram

All 195 countries displayed as tiles in a cartogram layout that mimics the world map.

**Key Features:**
- **Tile size = Geographic area** — Russia is huge, Singapore is tiny
- **Tile color = Selected metric** — Population, GDP, Life Expectancy, Internet Access
- **8 color themes** — From vivid rainbow to subtle pastels, colorblind-friendly options
- **Flag mode** — Display actual country flags instead of colors
- **Search** — Find any country instantly
- **Detail modal** — Click for full country statistics

### Language Space

Explore the world's language families in an interactive 2D space visualization.

**Features:**
- 50+ languages plotted by linguistic similarity
- Color-coded by language family (Indo-European, Sino-Tibetan, etc.)
- Click to explore language details and neighbors
- Family filter to focus on specific groups

### Compare Countries

Side-by-side comparison of any two countries across key metrics.

**Metrics:**
- Population
- Land Area
- GDP per Capita
- Life Expectancy
- Internet Penetration

**Features:**
- Visual progress bars showing relative values
- **Typeahead search** — type to filter the country dropdowns; auto-selects the first match (case-insensitive on name or country code)
- Quick facts highlighting key differences
- Swap button to reverse comparison (also clears search state)

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Vue | 3.5 | Reactive UI framework |
| Vite | 7.x | Build tool & dev server |
| Tailwind CSS | 3.4 | Utility-first styling |
| DaisyUI | 4.x | Component library |
| Vue Router | 4.x | Client-side routing |
| Three.js | 0.181 | 3D visualization |
| Vitest | 3.x | Unit testing |

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/danieltofan/globe-explorer.git
cd globe-explorer

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Available Scripts

```bash
npm run dev          # Start dev server with hot reload
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run test         # Run tests in watch mode
npm run test:run     # Run tests once
npm run test:coverage # Run tests with coverage report
```

## Project Structure

```
globe-explorer/
├── src/
│   ├── App.vue                    # Root component with navigation
│   ├── main.js                    # App entry point
│   ├── router/
│   │   └── index.js               # Route definitions
│   ├── features/
│   │   ├── hundred-people/        # "100 People" visualization
│   │   │   └── HundredPeople.vue
│   │   ├── countries-cartogram/   # Cartogram visualization
│   │   │   ├── CountriesCartogram.vue
│   │   │   └── countries.js       # 195 countries data
│   │   ├── language-space/        # Language families viz
│   │   │   ├── LanguageSpace.vue
│   │   │   └── languages.js       # Language data
│   │   └── compare/               # Country comparison
│   │       └── Compare.vue
│   └── shared/
│       └── data/
│           └── regions.js         # Population statistics
├── public/
│   ├── favicon.ico
│   ├── og-image.png               # Social sharing image
│   └── robots.txt
└── tests/                         # Test files colocated with source
```

## Test Coverage

**153 tests across 9 test files**

```
-------------------|---------|----------|---------|---------|
File               | % Stmts | % Branch | % Funcs | % Lines |
-------------------|---------|----------|---------|---------|
All files          |   92.53 |    83.67 |   52.32 |   92.53 |
App.vue            |  100.00 |   100.00 |  100.00 |  100.00 |
Compare.vue        |   94.32 |    69.76 |   72.72 |   94.32 |
CountriesCartogram |   97.36 |    88.15 |   60.60 |   97.36 |
HundredPeople.vue  |   81.78 |    79.31 |   30.00 |   81.78 |
LanguageSpace.vue  |   83.02 |    88.57 |   46.15 |   83.02 |
languages.js       |  100.00 |   100.00 |  100.00 |  100.00 |
countries.js       |  100.00 |    91.30 |   45.45 |  100.00 |
regions.js         |  100.00 |   100.00 |  100.00 |  100.00 |
router/index.js    |  100.00 |   100.00 |     N/A |  100.00 |
-------------------|---------|----------|---------|---------|
```

Run `npm run test:coverage` to generate a detailed report.

## Accessibility

This app follows WCAG 2.1 AA guidelines:

- **Keyboard Navigation** — All interactive elements accessible via Tab, Enter, Space, Escape
- **Screen Reader Support** — ARIA labels, live regions, semantic HTML
- **Color Contrast** — Meets 4.5:1 ratio for text
- **Focus Indicators** — Visible focus states on all interactive elements
- **Reduced Motion** — Respects `prefers-reduced-motion`
- **Touch Targets** — Minimum 24x24px tap areas

## Data Sources

- Population statistics: [UN World Population Prospects](https://population.un.org/wpp/)
- Income distribution: [World Bank](https://data.worldbank.org/) + Credit Suisse Global Wealth Report
- Country data: [REST Countries](https://restcountries.com/)
- Language families: [Ethnologue](https://www.ethnologue.com/)

## Performance

This app achieves **100/100/100/100** on Google PageSpeed Insights (Performance, Accessibility, Best Practices, SEO) on mobile.

Every page includes a **"PageSpeed Me"** link in the footer that opens Google PageSpeed Insights for the current page. This provides radical transparency — you can verify the score anytime with one click.

### The two-step pattern that earned the perf 100

A pure-SPA Vue (or React, Svelte) app typically caps around 96–98 on mobile PageSpeed even with good core web vitals, because nothing renders until JS executes the framework's mount — leaving 5–6 fully-blank filmstrip frames at the start of the load and dragging Speed Index. The fix is two coupled changes:

1. **Static LCP skeleton inside the mount target.** [`index.html`](index.html) places a copy of HundredPeople's header block (same wrapper classes, same `<h1>`) inside `<div id="app">`. Vue's `mount('#app')` replaces innerHTML on mount, so the skeleton is purely an early-paint placeholder; the runtime markup swaps in with no visible flash. `aria-hidden="true"` on the skeleton wrapper prevents screen readers from announcing the h1 twice during the brief pre-mount window.

2. **Inline the main CSS bundle.** [`vite.config.js`](vite.config.js)'s `inlineMainCssPlugin` runs in `transformIndexHtml.post` mode at build time: it locates the `assets/index-<hash>.css` asset, strips the auto-injected `<link rel="stylesheet">`, and injects the CSS content as `<style>` just before `</head>`. No external CSS request on the critical path — the browser can paint the styled skeleton as soon as the HTML byte stream is parsed. Route-specific CSS chunks (e.g. `HundredPeople-<hash>.css`) are NOT inlined — they stay lazily loaded by their route chunks.

**Neither step works alone.** The skeleton without inlined CSS is invisible until the external CSS finishes downloading; the inline CSS without a skeleton leaves `#app` empty until Vue mounts. Together they shift the LCP paint to HTML-parse time, drop Speed Index from ~3.9 s to ~0.9 s, and fill the filmstrip from frame 1.

[`public/_headers`](public/_headers) closes the repeat-visit gap with `Cache-Control: public, max-age=31536000, immutable` on `/assets/*` — Vite content-hashes filenames so the URL changes on every content change; the 1-year `immutable` combo skips revalidation entirely.

Full diagnosis + before/after metrics: [`SESSION_LOG.md`](SESSION_LOG.md) Session 134.

## Browser Support

- Chrome 90+
- Firefox 90+
- Safari 14+
- Edge 90+

## License

MIT License - feel free to use this project for learning, teaching, or building upon.

## Author

**Daniel Tofan** — [danieltofan.ai](https://danieltofan.ai)

---

Built with Vue 3 + Vite + Tailwind CSS
