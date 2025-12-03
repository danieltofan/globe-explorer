<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { countries, colorModes, getTileSize, getFieldRange, getGradientColor, getTileDimensions, canvasWidth, canvasHeight } from './countries'

const currentColorMode = ref('population')
const hoveredCountry = ref(null)
const selectedCountry = ref(null)
const searchQuery = ref('')
const modalRef = ref(null)

// Responsive scaling - fit to container on large screens, allow scroll on small
const containerRef = ref(null)
const scale = ref(1)
const breakpoint = 1200

function updateScale() {
  const viewportWidth = window.innerWidth
  if (viewportWidth >= breakpoint && containerRef.value) {
    // Large screens: fit canvas to full container width
    scale.value = containerRef.value.clientWidth / canvasWidth
  } else {
    // Small screens: use natural scale, allow horizontal scroll
    scale.value = 1
  }
}

onMounted(() => {
  updateScale()
  window.addEventListener('resize', updateScale)
  window.addEventListener('keydown', handleGlobalKeydown)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScale)
  window.removeEventListener('keydown', handleGlobalKeydown)
})

// Handle Escape key to close modal
function handleGlobalKeydown(e) {
  if (e.key === 'Escape' && selectedCountry.value) {
    closeDetail()
  }
}

const currentMode = computed(() => colorModes.find(m => m.id === currentColorMode.value))

// Calculate color ranges for current mode
const colorRange = computed(() => {
  const field = currentMode.value.field
  if (!field) return null
  return getFieldRange(field)
})

// Get background color for a country
function getCountryColor(country) {
  const mode = currentMode.value
  if (mode.id === 'flags') {
    return 'transparent'
  }

  if (!mode.field || !colorRange.value) return '#e5e7eb'

  const value = country[mode.field]
  return getGradientColor(value, colorRange.value.min, colorRange.value.max, mode.gradient)
}

// Calculate relative luminance from hex color (WCAG formula)
function getLuminance(hex) {
  const rgb = hex.replace('#', '').match(/.{2}/g).map(x => {
    const c = parseInt(x, 16) / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]
}

// Calculate contrast ratio between two colors
function getContrastRatio(lum1, lum2) {
  const lighter = Math.max(lum1, lum2)
  const darker = Math.min(lum1, lum2)
  return (lighter + 0.05) / (darker + 0.05)
}

// Get optimal text color for contrast (targets 4.5:1 WCAG AA)
function getTextColor(bgHex) {
  if (!bgHex || bgHex === 'transparent' || bgHex === '#e5e7eb') {
    return null // Use default CSS color
  }

  const bgLum = getLuminance(bgHex)
  const whiteLum = 1
  const blackLum = 0

  const whiteContrast = getContrastRatio(whiteLum, bgLum)
  const blackContrast = getContrastRatio(blackLum, bgLum)

  // Return color with better contrast, prefer white if close
  return whiteContrast >= blackContrast ? '#ffffff' : '#000000'
}

// Get formatted value for display
function getFormattedValue(country) {
  const mode = currentMode.value
  if (!mode.field) return ''
  return mode.format(country[mode.field])
}

// Check if country matches search
function isSearchMatch(country) {
  if (!searchQuery.value.trim()) return true
  const query = searchQuery.value.toLowerCase()
  return country.name.toLowerCase().includes(query) || country.code.toLowerCase().includes(query)
}

// Continent display names
const continentNames = {
  europe: 'Europe',
  asia: 'Asia',
  africa: 'Africa',
  northAmerica: 'North America',
  southAmerica: 'South America',
  oceania: 'Oceania'
}

// Get tile size class
function getTileSizeClass(area) {
  return `tile-${getTileSize(area)}`
}

// Base offset to center the map
const xOffset = -3.5

// Continent offsets to add ocean gaps
const continentOffsets = {
  northAmerica: { x: -3, y: 0 },
  southAmerica: { x: -2, y: 2 },
  europe: { x: 0, y: -2 },
  africa: { x: 0, y: 2 },
  asia: { x: 3, y: 0 },
  oceania: { x: 2.5, y: 2 }
}

// Get tile position and dimensions (scaled)
function getTileStyle(country) {
  const dims = getTileDimensions(country.area)
  const bgColor = getCountryColor(country)
  const textColor = getTextColor(bgColor)
  const cOffset = continentOffsets[country.continent] || { x: 0, y: 0 }

  const style = {
    left: `${country.x + xOffset + cOffset.x}%`,
    top: `${country.y + cOffset.y}%`,
    width: `${Math.round(dims.width * scale.value)}px`,
    height: `${Math.round(dims.height * scale.value)}px`,
    backgroundColor: bgColor,
    transform: 'translate(-50%, -50%)'
  }

  if (textColor) {
    style.color = textColor
    // Adaptive text shadow for contrast - opposite of text color
    const shadowColor = textColor === '#ffffff'
      ? 'rgba(0,0,0,0.8)'
      : 'rgba(255,255,255,0.9)'
    style.textShadow = `0 1px 2px ${shadowColor}, 0 0 4px ${shadowColor}`
  }

  return style
}

// Close detail card
function closeDetail() {
  selectedCountry.value = null
}

// Open detail card and focus it
async function openDetail(country) {
  selectedCountry.value = country
  await nextTick()
  modalRef.value?.focus()
}

// Click outside to close
function handleBackdropClick(e) {
  if (e.target.classList.contains('detail-backdrop')) {
    closeDetail()
  }
}

// Keyboard handler for tiles
function handleTileKeydown(event, country) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    openDetail(country)
  }
}
</script>

<template>
  <div class="py-8">
    <!-- Header -->
    <div class="container mx-auto px-4">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold mb-2 header-gradient" style="line-height: 1.3;">World Cartogram</h1>
        <p class="text-lg text-base-content/80">{{ currentMode.description }}</p>
      </div>

      <!-- Controls -->
      <div class="flex flex-wrap justify-center items-center gap-4 mb-8">
        <!-- Color Mode Selector -->
        <div class="flex flex-wrap justify-center gap-2" role="group" aria-label="Color mode selection">
          <button
            v-for="mode in colorModes"
            :key="mode.id"
            @click="currentColorMode = mode.id"
            class="btn btn-sm mode-btn"
            :class="currentColorMode === mode.id ? 'btn-primary shadow-lg' : 'btn-ghost'"
            :aria-pressed="currentColorMode === mode.id"
            :aria-label="`View by ${mode.name}`"
          >
            {{ mode.name }}
          </button>
        </div>

        <!-- Search -->
        <div class="form-control">
          <label for="country-search" class="sr-only">Search countries</label>
          <input
            id="country-search"
            v-model="searchQuery"
            type="text"
            placeholder="Search country..."
            class="input input-bordered input-sm w-40"
            aria-label="Search countries by name or code"
          />
        </div>
      </div>
    </div>

    <!-- World Map Canvas - full width -->
    <div ref="containerRef" class="world-canvas-container">
      <div
        class="world-canvas"
        role="img"
        aria-label="World cartogram showing countries as tiles sized by land area"
        :style="{
          width: `${canvasWidth * scale}px`,
          height: `${canvasHeight * scale}px`
        }"
      >
        <!-- All countries as absolute positioned tiles -->
        <button
          v-for="country in countries"
          :key="country.code"
          type="button"
          class="country-tile"
          :class="[
            getTileSizeClass(country.area),
            {
              'tile-dimmed': searchQuery && !isSearchMatch(country),
              'tile-hovered': hoveredCountry === country.code,
              'tile-flag-mode': currentColorMode === 'flags'
            }
          ]"
          :style="getTileStyle(country)"
          :aria-label="`${country.name}, ${continentNames[country.continent]}. Population: ${(country.population / 1000000).toFixed(1)} million. Click for details.`"
          @mouseenter="hoveredCountry = country.code"
          @mouseleave="hoveredCountry = null"
          @focus="hoveredCountry = country.code"
          @blur="hoveredCountry = null"
          @click="openDetail(country)"
          @keydown="handleTileKeydown($event, country)"
        >
          <template v-if="currentColorMode === 'flags'">
            <img
              :src="`https://flagcdn.com/w80/${country.code.toLowerCase()}.png`"
              :alt="country.name + ' flag'"
              loading="lazy"
              class="tile-flag-img"
            />
          </template>
          <template v-else>
            <span class="tile-code" aria-hidden="true">{{ country.code }}</span>
          </template>
          <span class="tile-name" aria-hidden="true">{{ country.name }}</span>

          <!-- Tooltip (decorative, info repeated in aria-label) -->
          <div class="tile-tooltip" aria-hidden="true">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-2xl">{{ country.flag }}</span>
              <div>
                <div class="font-bold">{{ country.name }}</div>
                <div class="text-xs opacity-70">{{ continentNames[country.continent] }}</div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
              <span class="opacity-70">Population:</span>
              <span class="font-medium">{{ (country.population / 1000000).toFixed(1) }}M</span>
              <span class="opacity-70">Area:</span>
              <span class="font-medium">{{ (country.area / 1000).toFixed(0) }}K km²</span>
              <span class="opacity-70">GDP/capita:</span>
              <span class="font-medium">${{ country.gdpPerCapita.toLocaleString() }}</span>
              <span class="opacity-70">Life expectancy:</span>
              <span class="font-medium">{{ country.lifeExpectancy.toFixed(1) }} years</span>
            </div>
          </div>
        </button>
      </div>
    </div>

    <!-- Color Legend -->
    <div class="container mx-auto px-4">
      <div v-if="currentColorMode !== 'flags'" class="mt-8 flex justify-center">
        <div class="gradient-legend glass-card px-6 py-3 rounded-2xl" role="img" :aria-label="`Color legend for ${currentMode.name}: darker colors indicate lower values, lighter colors indicate higher values`">
          <div class="flex items-center gap-4">
            <span class="text-sm" aria-hidden="true">Low</span>
            <div
              class="gradient-bar"
              :style="{
                background: `linear-gradient(to right, ${currentMode.gradient?.join(', ')})`
              }"
              aria-hidden="true"
            />
            <span class="text-sm" aria-hidden="true">High</span>
          </div>
          <div class="text-center text-xs mt-1" aria-hidden="true">{{ currentMode.name }}</div>
        </div>
      </div>

      <!-- Stats -->
      <div class="mt-8 text-center">
        <p class="text-sm text-base-content/90">{{ countries.length }} countries • Tile size = land area • Click for details</p>
      </div>
    </div>

    <!-- Detail Card Modal -->
    <Teleport to="body">
      <div
        v-if="selectedCountry"
        class="detail-backdrop"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="'modal-title-' + selectedCountry.code"
        @click="handleBackdropClick"
      >
        <div
          ref="modalRef"
          class="detail-card glass-card"
          tabindex="-1"
          @click.stop
        >
          <button
            class="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
            @click="closeDetail"
            aria-label="Close country details"
          >
            <span aria-hidden="true">✕</span>
          </button>

          <div class="flex items-start gap-4 mb-6">
            <span class="text-6xl" aria-hidden="true">{{ selectedCountry.flag }}</span>
            <div>
              <h2 :id="'modal-title-' + selectedCountry.code" class="text-2xl font-bold">{{ selectedCountry.name }}</h2>
              <p class="opacity-70">{{ continentNames[selectedCountry.continent] }}</p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4" role="list" aria-label="Country statistics">
            <div class="stat-card" role="listitem">
              <div class="stat-label">Population</div>
              <div class="stat-value">{{ (selectedCountry.population / 1000000).toFixed(1) }}M</div>
            </div>
            <div class="stat-card" role="listitem">
              <div class="stat-label">Land Area</div>
              <div class="stat-value">{{ (selectedCountry.area / 1000).toFixed(0) }}K km²</div>
            </div>
            <div class="stat-card" role="listitem">
              <div class="stat-label">GDP per Capita</div>
              <div class="stat-value">${{ selectedCountry.gdpPerCapita.toLocaleString() }}</div>
            </div>
            <div class="stat-card" role="listitem">
              <div class="stat-label">Life Expectancy</div>
              <div class="stat-value">{{ selectedCountry.lifeExpectancy.toFixed(1) }} years</div>
            </div>
            <div class="stat-card" role="listitem">
              <div class="stat-label">Internet Access</div>
              <div class="stat-value">{{ selectedCountry.internetPenetration }}%</div>
            </div>
            <div class="stat-card" role="listitem">
              <div class="stat-label">Pop. Density</div>
              <div class="stat-value">{{ (selectedCountry.population / selectedCountry.area).toFixed(1) }}/km²</div>
            </div>
          </div>

          <!-- Comparison bars -->
          <div class="mt-6">
            <h3 class="font-medium mb-3 opacity-70">Compared to World Average</h3>
            <div class="space-y-3" role="list" aria-label="Comparison to world average">
              <div role="listitem">
                <div class="flex justify-between text-sm mb-1">
                  <span>GDP per Capita</span>
                  <span>{{ Math.round((selectedCountry.gdpPerCapita / 12000) * 100) }}%</span>
                </div>
                <div class="progress-bar" role="progressbar" :aria-valuenow="Math.min(100, Math.round((selectedCountry.gdpPerCapita / 12000) * 100))" aria-valuemin="0" aria-valuemax="100" :aria-label="`GDP per capita: ${Math.round((selectedCountry.gdpPerCapita / 12000) * 100)}% of world average`">
                  <div
                    class="progress-fill bg-success"
                    :style="{ width: `${Math.min(100, (selectedCountry.gdpPerCapita / 12000) * 100)}%` }"
                  />
                </div>
              </div>
              <div role="listitem">
                <div class="flex justify-between text-sm mb-1">
                  <span>Life Expectancy</span>
                  <span>{{ Math.round((selectedCountry.lifeExpectancy / 73) * 100) }}%</span>
                </div>
                <div class="progress-bar" role="progressbar" :aria-valuenow="Math.min(100, Math.round((selectedCountry.lifeExpectancy / 73) * 100))" aria-valuemin="0" aria-valuemax="100" :aria-label="`Life expectancy: ${Math.round((selectedCountry.lifeExpectancy / 73) * 100)}% of world average`">
                  <div
                    class="progress-fill bg-info"
                    :style="{ width: `${Math.min(100, (selectedCountry.lifeExpectancy / 73) * 100)}%` }"
                  />
                </div>
              </div>
              <div role="listitem">
                <div class="flex justify-between text-sm mb-1">
                  <span>Internet Access</span>
                  <span>{{ Math.round((selectedCountry.internetPenetration / 63) * 100) }}%</span>
                </div>
                <div class="progress-bar" role="progressbar" :aria-valuenow="Math.min(100, Math.round((selectedCountry.internetPenetration / 63) * 100))" aria-valuemin="0" aria-valuemax="100" :aria-label="`Internet access: ${Math.round((selectedCountry.internetPenetration / 63) * 100)}% of world average`">
                  <div
                    class="progress-fill bg-secondary"
                    :style="{ width: `${Math.min(100, (selectedCountry.internetPenetration / 63) * 100)}%` }"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
/* Screen reader only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Header gradient text */
.header-gradient {
  background: linear-gradient(135deg, oklch(var(--p)) 0%, oklch(var(--s)) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Glassmorphism card */
.glass-card {
  background: oklch(var(--b2) / 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid oklch(var(--bc) / 0.1);
  box-shadow:
    0 4px 6px -1px oklch(var(--bc) / 0.1),
    0 2px 4px -2px oklch(var(--bc) / 0.1);
}

/* Mode buttons */
.mode-btn {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.mode-btn:hover {
  transform: translateY(-1px);
}

/* World canvas container */
.world-canvas-container {
  width: 100vw;
  max-width: 100vw;
  margin-left: calc(-50vw + 50%);
  overflow: hidden;
  background: oklch(var(--b2) / 0.3);
}

/* Allow horizontal scroll on small screens */
@media (max-width: 1199px) {
  .world-canvas-container {
    width: 100vw;
    max-width: 100vw;
    overflow-x: auto;
  }
}

.world-canvas {
  position: relative;
}

/* Country tiles - absolutely positioned */
.country-tile {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease, z-index 0s;
  border: 1px solid oklch(var(--bc) / 0.15);
  overflow: hidden;
  z-index: 1;
}

/* Expand touch target to minimum 24x24px for small tiles */
.country-tile::before {
  content: '';
  position: absolute;
  min-width: 24px;
  min-height: 24px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Focus indicator for tiles */
.country-tile:focus-visible {
  outline: 3px solid oklch(var(--p));
  outline-offset: 2px;
  z-index: 101 !important;
}

/* Tile sizes - font scaling with minimum for legibility */
.tile-xxl { font-size: 1rem; }
.tile-xl { font-size: 0.9rem; }
.tile-l { font-size: 0.8rem; }
.tile-m { font-size: 0.7rem; }
.tile-s { font-size: 0.65rem; }
.tile-xs { font-size: 0.6rem; }

/* Tile content */
.tile-code {
  font-weight: 700;
  line-height: 1.2;
}

.tile-name {
  font-size: 0.5em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 95%;
  line-height: 1.2;
}

.tile-flag-img {
  width: 70%;
  height: auto;
  max-height: 60%;
  object-fit: contain;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

/* Flag mode */
.tile-flag-mode {
  background: oklch(var(--b2)) !important;
}

/* Tile states */
.tile-dimmed {
  opacity: 0.15;
}

.tile-hovered,
.country-tile:hover,
.country-tile:focus {
  transform: translate(-50%, -50%) scale(1.3);
  z-index: 100 !important;
  box-shadow: 0 8px 24px oklch(var(--bc) / 0.4);
}

/* Tooltip */
.tile-tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(-8px);
  background: oklch(var(--b1) / 0.95);
  backdrop-filter: blur(12px);
  border: 1px solid oklch(var(--bc) / 0.15);
  border-radius: 12px;
  padding: 12px 16px;
  min-width: 220px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease, visibility 0.2s ease;
  z-index: 1000;
  box-shadow: 0 12px 40px oklch(var(--bc) / 0.25);
  pointer-events: none;
}

.country-tile:hover .tile-tooltip {
  opacity: 1;
  visibility: visible;
}

/* Gradient legend */
.gradient-bar {
  width: 200px;
  height: 12px;
  border-radius: 6px;
}

/* Detail modal */
.detail-backdrop {
  position: fixed;
  inset: 0;
  background: oklch(var(--b1) / 0.8);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.detail-card {
  position: relative;
  max-width: 480px;
  width: 100%;
  padding: 2rem;
  border-radius: 1.5rem;
  max-height: 90vh;
  overflow-y: auto;
}

.detail-card:focus {
  outline: none;
}

.stat-card {
  background: oklch(var(--b1) / 0.5);
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid oklch(var(--bc) / 0.05);
}

.stat-label {
  font-size: 0.75rem;
  opacity: 0.6;
  margin-bottom: 0.25rem;
}

.stat-value {
  font-size: 1.25rem;
  font-weight: 600;
}

/* Progress bars */
.progress-bar {
  height: 8px;
  background: oklch(var(--b1) / 0.5);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s ease;
}

/* Responsive - smaller screens get horizontal scroll */
@media (max-width: 768px) {
  .world-canvas-container {
    padding: 0.5rem;
  }
}
</style>
