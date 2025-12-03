<script setup>
import { ref, computed } from 'vue'
import { viewModes } from '@/shared/data/regions'

const currentMode = ref('region')
const hoveredGroup = ref(null)

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

function setMode(modeId) {
  currentMode.value = modeId
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
          v-for="dot in dots"
          :key="dot.id"
          class="aspect-square rounded-full transition-all duration-300 cursor-pointer hover:scale-125 hover:z-10"
          :style="{ backgroundColor: dot.color }"
          :class="{
            'opacity-30': hoveredGroup && hoveredGroup !== dot.group,
            'ring-2 ring-white ring-offset-2 ring-offset-base-200': hoveredGroup === dot.group
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
