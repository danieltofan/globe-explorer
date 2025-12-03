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
      <h1 class="text-4xl font-bold mb-2">The World as 100 People</h1>
      <p class="text-lg text-base-content/70">{{ currentView.description }}</p>
    </div>

    <!-- Mode Selector -->
    <div class="flex flex-wrap justify-center gap-2 mb-8">
      <button
        v-for="mode in viewModes"
        :key="mode.id"
        @click="setMode(mode.id)"
        class="btn btn-sm"
        :class="currentMode === mode.id ? 'btn-primary' : 'btn-ghost'"
      >
        {{ mode.name }}
      </button>
    </div>

    <!-- 100 People Grid -->
    <div class="bg-base-200 rounded-2xl p-6 mb-8">
      <div class="grid grid-cols-10 gap-2 max-w-md mx-auto">
        <div
          v-for="(dot, index) in dots"
          :key="dot.id"
          class="aspect-square rounded-full cursor-pointer dot-animate"
          :style="{
            backgroundColor: dot.color,
            transitionDelay: `${getDotDelay(index)}ms`
          }"
          :class="{
            'opacity-30': hoveredGroup && hoveredGroup !== dot.group,
            'ring-2 ring-white ring-offset-2 ring-offset-base-200': hoveredGroup === dot.group,
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
    <div class="flex flex-wrap justify-center gap-4">
      <div
        v-for="group in currentView.data"
        :key="group.id"
        class="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg transition-colors"
        :class="{ 'bg-base-200': hoveredGroup === group.id }"
        @mouseenter="hoveredGroup = group.id"
        @mouseleave="hoveredGroup = null"
      >
        <div
          class="w-4 h-4 rounded-full"
          :style="{ backgroundColor: group.color }"
        />
        <span class="font-medium">{{ group.name }}</span>
        <span class="badge badge-sm">{{ group.people }}</span>
      </div>
    </div>

    <!-- Info Card -->
    <div v-if="hoveredGroup" class="mt-8 text-center">
      <div class="alert max-w-md mx-auto">
        <span class="text-lg">
          <strong>{{ currentView.data.find(g => g.id === hoveredGroup)?.people }}</strong>
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
    <div class="mt-12 text-center text-base-content/60">
      <p>Each dot represents approximately 80 million real people.</p>
      <p class="text-sm mt-1">Hover over dots or legend items to explore.</p>
    </div>
  </div>
</template>

<style scoped>
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
  transform: scale(1.25);
  z-index: 10;
}

.dot-out {
  transform: scale(0.3);
  opacity: 0.4;
}

.dot-in {
  transform: scale(1);
  opacity: 1;
}
</style>
