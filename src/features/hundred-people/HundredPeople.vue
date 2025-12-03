<script setup>
import { ref, computed, watch } from 'vue'
import { viewModes } from '@/shared/data/regions'

const currentMode = ref('region')
const hoveredGroup = ref(null)
const isTransitioning = ref(false)
const transitionPhase = ref('idle') // 'idle' | 'out' | 'shuffle' | 'in'

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
</script>

<template>
  <div class="container mx-auto px-4 py-8 max-w-4xl">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold mb-2 header-gradient">The World as 100 People</h1>
      <p class="text-lg text-base-content/70">{{ currentView.description }}</p>
    </div>

    <!-- Mode Selector -->
    <div class="flex flex-wrap justify-center gap-2 mb-8">
      <button
        v-for="mode in viewModes"
        :key="mode.id"
        @click="setMode(mode.id)"
        class="btn btn-sm mode-btn"
        :class="currentMode === mode.id ? 'btn-primary shadow-lg' : 'btn-ghost'"
      >
        {{ mode.name }}
      </button>
    </div>

    <!-- 100 People Grid -->
    <div class="glass-card rounded-3xl p-8 mb-8">
      <div class="grid grid-cols-10 gap-2 max-w-md mx-auto">
        <div
          v-for="(dot, index) in dots"
          :key="dot.id"
          class="aspect-square rounded-full cursor-pointer dot-animate"
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
          @mouseenter="hoveredGroup = dot.group"
          @mouseleave="hoveredGroup = null"
        />
      </div>
    </div>

    <!-- Legend -->
    <div class="flex flex-wrap justify-center gap-3">
      <div
        v-for="group in currentView.data"
        :key="group.id"
        class="legend-pill flex items-center gap-2 cursor-pointer px-4 py-2 rounded-full transition-all duration-200"
        :class="{ 'legend-pill-active': hoveredGroup === group.id }"
        :style="{ '--legend-color': group.color }"
        @mouseenter="hoveredGroup = group.id"
        @mouseleave="hoveredGroup = null"
      >
        <div
          class="w-3 h-3 rounded-full shadow-sm"
          :style="{ backgroundColor: group.color }"
        />
        <span class="font-medium text-sm">{{ group.name }}</span>
        <span class="badge badge-sm badge-ghost">{{ group.people }}</span>
      </div>
    </div>

    <!-- Info Card -->
    <div v-if="hoveredGroup" class="mt-8 text-center">
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
            <br><span class="text-sm opacity-70">{{ currentView.data.find(g => g.id === hoveredGroup)?.description }}</span>
          </template>
        </span>
      </div>
    </div>

    <!-- Explanation -->
    <div class="mt-12 text-center text-base-content/50">
      <p class="text-sm">Each dot represents approximately 80 million real people.</p>
      <p class="text-xs mt-1">Hover over dots or legend items to explore.</p>
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
}

.dot-idle {
  transform: scale(1);
  opacity: 1;
}

.dot-idle:hover {
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

.legend-pill:hover {
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
</style>
