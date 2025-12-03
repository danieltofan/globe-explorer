<script setup>
import { ref, computed, watch, onUnmounted } from 'vue'
import { viewModes, storyFacts } from '@/shared/data/regions'

const currentMode = ref('region')
const hoveredGroup = ref(null)
const isTransitioning = ref(false)
const transitionPhase = ref('idle') // 'idle' | 'out' | 'shuffle' | 'in'

// Storytelling mode
const isStorytelling = ref(false)
const currentFactIndex = ref(0)
let storyInterval = null

const currentFact = computed(() => storyFacts[currentFactIndex.value])

function startStorytelling() {
  isStorytelling.value = true
  showCurrentFact()
  storyInterval = setInterval(() => {
    currentFactIndex.value = (currentFactIndex.value + 1) % storyFacts.length
    showCurrentFact()
  }, 5000) // 5 seconds per fact
}

function stopStorytelling() {
  isStorytelling.value = false
  if (storyInterval) {
    clearInterval(storyInterval)
    storyInterval = null
  }
  hoveredGroup.value = null
}

function toggleStorytelling() {
  if (isStorytelling.value) {
    stopStorytelling()
  } else {
    startStorytelling()
  }
}

function showCurrentFact() {
  const fact = storyFacts[currentFactIndex.value]
  // Switch to the right mode if needed
  if (currentMode.value !== fact.mode && !isTransitioning.value) {
    setMode(fact.mode)
    // Wait for transition to complete before highlighting
    setTimeout(() => {
      hoveredGroup.value = fact.highlight
    }, 600)
  } else {
    hoveredGroup.value = fact.highlight
  }
}

onUnmounted(() => {
  if (storyInterval) clearInterval(storyInterval)
})

const currentView = computed(() => {
  return viewModes.find(m => m.id === currentMode.value)
})

// Generate 100 dots with their assignments based on current mode
const dots = computed(() => {
  const data = currentView.value.data
  const result = []
  let dotIndex = 0

  for (const group of data) {
    for (let i = 0; i < group.people; i++) {
      result.push({
        id: dotIndex++,
        group: group.id,
        groupName: group.name,
        color: group.color
      })
    }
  }

  return result
})

// Calculate staggered delay for each dot (wave pattern from top-left to bottom-right)
function getDotDelay(index) {
  const row = Math.floor(index / 10)
  const col = index % 10
  // Diagonal wave: delay based on row + col
  const diagonalIndex = row + col
  // Max diagonal is 18 (row 9 + col 9), spread over ~200ms for snappier feel
  return diagonalIndex * 11
}

// Track previous mode for transition
const previousMode = ref('region')

function setMode(modeId) {
  if (modeId === currentMode.value || isTransitioning.value) return

  previousMode.value = currentMode.value
  isTransitioning.value = true
  transitionPhase.value = 'out'

  // Phase 1: Dots shrink/fade out (~200ms spread + 300ms animation)
  setTimeout(() => {
    transitionPhase.value = 'shuffle'
    currentMode.value = modeId

    // Phase 2: Brief pause, then dots grow back in
    setTimeout(() => {
      transitionPhase.value = 'in'

      // Phase 3: Animation complete (~200ms spread + 300ms animation + buffer)
      setTimeout(() => {
        transitionPhase.value = 'idle'
        isTransitioning.value = false
      }, 550)
    }, 30)
  }, 550) // Wait for slowest dot to shrink (200ms delay + 300ms duration + buffer)
}

// Keyboard handlers for dots and legend
function handleDotKeydown(event, group) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    hoveredGroup.value = hoveredGroup.value === group ? null : group
  }
}

function handleLegendKeydown(event, groupId) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    hoveredGroup.value = hoveredGroup.value === groupId ? null : groupId
  }
}
</script>

<template>
  <div class="container mx-auto px-4 py-8 max-w-4xl">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold mb-2 header-gradient">The World as 100 People</h1>
      <p class="text-lg text-base-content/80">{{ currentView.description }}</p>
    </div>

    <!-- Storytelling Fact Card -->
    <div v-if="isStorytelling" class="mb-8" aria-live="polite" aria-atomic="true">
      <div class="story-card text-center px-6 py-8 rounded-3xl max-w-lg mx-auto">
        <p class="text-base-content/80 text-sm mb-2 uppercase tracking-wide">If the world were 100 people...</p>
        <p class="text-5xl font-black mb-2 number-highlight">{{ currentFact.number }}</p>
        <p class="text-xl font-medium mb-3">{{ currentFact.text }}</p>
        <p class="text-base-content/80 text-sm">{{ currentFact.subtext }}</p>
        <div class="flex justify-center gap-1 mt-6" role="tablist" aria-label="Story progress">
          <span
            v-for="(fact, i) in storyFacts"
            :key="i"
            role="tab"
            :aria-selected="i === currentFactIndex"
            :aria-label="`Fact ${i + 1} of ${storyFacts.length}`"
            class="w-2 h-2 rounded-full transition-all duration-300"
            :class="i === currentFactIndex ? 'bg-primary w-6' : 'bg-base-content/20'"
          />
        </div>
      </div>
    </div>

    <!-- Mode Selector -->
    <div class="flex flex-wrap justify-center items-center gap-2 mb-8" role="group" aria-label="View mode selection">
      <button
        v-for="mode in viewModes"
        :key="mode.id"
        @click="setMode(mode.id); stopStorytelling()"
        class="btn btn-sm mode-btn"
        :class="currentMode === mode.id ? 'btn-primary shadow-lg' : 'btn-ghost'"
        :disabled="isTransitioning"
        :aria-pressed="currentMode === mode.id"
        :aria-label="`View by ${mode.name}`"
      >
        {{ mode.name }}
      </button>
      <div class="divider divider-horizontal mx-1" aria-hidden="true"></div>
      <button
        @click="toggleStorytelling"
        class="btn btn-sm gap-2"
        :class="isStorytelling ? 'btn-secondary' : 'btn-outline btn-secondary'"
        :aria-pressed="isStorytelling"
        :aria-label="isStorytelling ? 'Stop auto-play storytelling' : 'Start auto-play storytelling'"
      >
        <span aria-hidden="true">{{ isStorytelling ? '⏸' : '▶' }}</span>
        {{ isStorytelling ? 'Stop' : 'Auto-play' }}
      </button>
    </div>

    <!-- 100 People Grid -->
    <div class="glass-card rounded-3xl p-8 mb-8">
      <div
        class="grid grid-cols-10 gap-2 max-w-md mx-auto"
        role="img"
        aria-label="100 people visualization grid showing world population distribution"
      >
        <button
          v-for="(dot, index) in dots"
          :key="dot.id"
          type="button"
          class="aspect-square rounded-full cursor-pointer dot-animate focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          :style="{
            backgroundColor: dot.color,
            transitionDelay: `${getDotDelay(index)}ms`,
            '--dot-color': dot.color
          }"
          :class="{
            'opacity-30': hoveredGroup && hoveredGroup !== dot.group,
            'dot-highlighted': hoveredGroup === dot.group,
            'dot-out': transitionPhase === 'out',
            'dot-in': transitionPhase === 'in' || transitionPhase === 'shuffle',
            'dot-idle': transitionPhase === 'idle'
          }"
          :aria-label="`Person ${index + 1}: ${dot.groupName}`"
          :aria-pressed="hoveredGroup === dot.group"
          @mouseenter="hoveredGroup = dot.group"
          @mouseleave="hoveredGroup = null"
          @focus="hoveredGroup = dot.group"
          @blur="hoveredGroup = null"
          @keydown="handleDotKeydown($event, dot.group)"
        />
      </div>
    </div>

    <!-- Legend -->
    <div class="flex flex-wrap justify-center gap-3" role="group" aria-label="Legend - click to highlight groups">
      <button
        v-for="group in currentView.data"
        :key="group.id"
        type="button"
        class="legend-pill flex items-center gap-2 cursor-pointer px-4 py-2 rounded-full transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        :class="{ 'legend-pill-active': hoveredGroup === group.id }"
        :style="{ '--legend-color': group.color }"
        :aria-pressed="hoveredGroup === group.id"
        :aria-label="`${group.name}, ${group.people} people. Click to highlight.`"
        @mouseenter="hoveredGroup = group.id"
        @mouseleave="hoveredGroup = null"
        @focus="hoveredGroup = group.id"
        @blur="hoveredGroup = null"
        @click="hoveredGroup = hoveredGroup === group.id ? null : group.id"
        @keydown="handleLegendKeydown($event, group.id)"
      >
        <div
          class="w-3 h-3 rounded-full shadow-sm"
          :style="{ backgroundColor: group.color }"
          aria-hidden="true"
        />
        <span class="font-medium text-sm">{{ group.name }}</span>
        <span class="badge badge-sm badge-ghost">{{ group.people }}</span>
      </button>
    </div>

    <!-- Info Card -->
    <div v-if="hoveredGroup" class="mt-8 text-center" aria-live="polite">
      <div class="info-card inline-block px-6 py-4 rounded-2xl max-w-md mx-auto">
        <span class="text-lg">
          <strong class="text-2xl">{{ currentView.data.find(g => g.id === hoveredGroup)?.people }}</strong>
          out of 100 people
          <template v-if="currentMode === 'region'">live in</template>
          <template v-else-if="currentMode === 'income'">are in</template>
          <template v-else-if="currentMode === 'internet'">{{ hoveredGroup === 'connected' ? 'have' : 'don\'t have' }}</template>
          <template v-else-if="currentMode === 'urban'">live in</template>
          <template v-else>are</template>
          <strong> {{ currentView.data.find(g => g.id === hoveredGroup)?.name }}</strong>
          <template v-if="currentView.data.find(g => g.id === hoveredGroup)?.description">
            <br><span class="text-sm text-base-content/80">{{ currentView.data.find(g => g.id === hoveredGroup)?.description }}</span>
          </template>
        </span>
      </div>
    </div>

    <!-- Explanation -->
    <div class="mt-12 text-center">
      <p class="text-sm text-base-content/90">Each dot represents approximately 80 million real people.</p>
      <p class="text-xs mt-1 text-base-content/80">Hover over dots or legend items to explore, or use keyboard to navigate.</p>
    </div>
  </div>
</template>

<style scoped>
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
    0 2px 4px -2px oklch(var(--bc) / 0.1),
    inset 0 1px 0 oklch(var(--b3) / 0.5);
}

/* Mode buttons */
.mode-btn {
  transition: all 0.2s ease;
}

.mode-btn:hover {
  transform: translateY(-1px);
}

/* Dot animations */
.dot-animate {
  transition-property: transform, opacity, background-color, box-shadow;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
}

.dot-idle {
  transform: scale(1);
  opacity: 1;
}

.dot-idle:hover,
.dot-idle:focus {
  transform: scale(1.3);
  z-index: 10;
  box-shadow: 0 0 20px var(--dot-color), 0 0 40px var(--dot-color);
}

.dot-highlighted {
  box-shadow: 0 0 12px var(--dot-color), 0 0 24px var(--dot-color);
  transform: scale(1.1);
}

.dot-out {
  transform: scale(0.3);
  opacity: 0.4;
}

.dot-in {
  transform: scale(1);
  opacity: 1;
}

/* Legend pills */
.legend-pill {
  background: oklch(var(--b2) / 0.5);
  border: 1px solid oklch(var(--bc) / 0.08);
}

.legend-pill:hover,
.legend-pill:focus {
  background: oklch(var(--b2) / 0.8);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px oklch(var(--bc) / 0.15);
}

.legend-pill-active {
  background: oklch(var(--b2) / 0.9);
  box-shadow:
    0 0 0 2px var(--legend-color),
    0 4px 12px oklch(var(--bc) / 0.2);
  transform: translateY(-2px);
}

/* Info card */
.info-card {
  background: oklch(var(--b2) / 0.8);
  backdrop-filter: blur(8px);
  border: 1px solid oklch(var(--bc) / 0.1);
  box-shadow: 0 8px 32px oklch(var(--bc) / 0.15);
}

/* Storytelling card */
.story-card {
  background: linear-gradient(135deg, oklch(var(--p) / 0.1) 0%, oklch(var(--s) / 0.1) 100%);
  border: 1px solid oklch(var(--p) / 0.2);
  box-shadow: 0 8px 32px oklch(var(--p) / 0.15);
}

.number-highlight {
  background: linear-gradient(135deg, oklch(var(--p)) 0%, oklch(var(--s)) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 40px oklch(var(--p) / 0.5);
}
</style>
