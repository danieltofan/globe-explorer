<script setup>
import { ref, computed } from 'vue'
import { countries } from '../countries-cartogram/countries'

// State
const country1Code = ref('US')
const country2Code = ref('CN')
const searchQuery = ref('')

// Sorted countries for dropdown
const sortedCountries = computed(() => {
  return [...countries].sort((a, b) => a.name.localeCompare(b.name))
})

// Filtered countries for search
const filteredCountries = computed(() => {
  if (!searchQuery.value) return sortedCountries.value
  const q = searchQuery.value.toLowerCase()
  return sortedCountries.value.filter(c =>
    c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
  )
})

// Selected countries
const country1 = computed(() => countries.find(c => c.code === country1Code.value))
const country2 = computed(() => countries.find(c => c.code === country2Code.value))

// Metrics to compare
const metrics = [
  { key: 'population', label: 'Population', format: v => formatNumber(v), unit: '' },
  { key: 'area', label: 'Land Area', format: v => formatNumber(v), unit: 'km²' },
  { key: 'gdpPerCapita', label: 'GDP per Capita', format: v => '$' + formatNumber(v), unit: '' },
  { key: 'lifeExpectancy', label: 'Life Expectancy', format: v => v.toFixed(1), unit: 'years' },
  { key: 'internetPenetration', label: 'Internet Access', format: v => v + '%', unit: '' }
]

// Format large numbers
function formatNumber(n) {
  if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B'
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M'
  if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K'
  return n.toLocaleString()
}

// Get comparison data for a metric
function getComparison(metric) {
  const v1 = country1.value?.[metric.key] || 0
  const v2 = country2.value?.[metric.key] || 0
  const max = Math.max(v1, v2)
  const pct1 = max > 0 ? (v1 / max) * 100 : 0
  const pct2 = max > 0 ? (v2 / max) * 100 : 0
  const ratio = v2 > 0 ? v1 / v2 : 0

  return {
    value1: v1,
    value2: v2,
    pct1,
    pct2,
    formatted1: metric.format(v1),
    formatted2: metric.format(v2),
    winner: v1 > v2 ? 1 : v2 > v1 ? 2 : 0,
    ratio: ratio > 1 ? ratio.toFixed(1) + 'x' : ratio > 0 ? (1/ratio).toFixed(1) + 'x' : '-'
  }
}

// Swap countries
function swapCountries() {
  const temp = country1Code.value
  country1Code.value = country2Code.value
  country2Code.value = temp
}

// Get flag URL
function getFlagUrl(code) {
  return `https://flagcdn.com/w160/${code.toLowerCase()}.png`
}
</script>

<template>
  <div class="container mx-auto px-4 py-8 max-w-5xl">
    <h1 class="text-3xl font-bold mb-2">Compare Countries</h1>
    <p class="text-base-content/60 mb-8">Select two countries to compare their key statistics side by side</p>

    <!-- Country Selectors -->
    <div class="flex flex-col sm:flex-row gap-4 items-center justify-center mb-8">
      <!-- Country 1 -->
      <div class="flex-1 w-full max-w-xs">
        <select
          v-model="country1Code"
          class="select select-bordered w-full text-lg"
        >
          <option v-for="c in sortedCountries" :key="c.code" :value="c.code">
            {{ c.name }}
          </option>
        </select>
      </div>

      <!-- Swap Button -->
      <button @click="swapCountries" class="btn btn-circle btn-ghost">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      </button>

      <!-- Country 2 -->
      <div class="flex-1 w-full max-w-xs">
        <select
          v-model="country2Code"
          class="select select-bordered w-full text-lg"
        >
          <option v-for="c in sortedCountries" :key="c.code" :value="c.code">
            {{ c.name }}
          </option>
        </select>
      </div>
    </div>

    <!-- Country Headers -->
    <div v-if="country1 && country2" class="grid grid-cols-[1fr_auto_1fr] gap-4 mb-6">
      <div class="text-center">
        <img
          :src="getFlagUrl(country1.code)"
          :alt="country1.name + ' flag'"
          class="w-24 h-16 object-cover mx-auto rounded shadow mb-2"
        />
        <h2 class="text-xl font-bold">{{ country1.name }}</h2>
        <p class="text-sm text-base-content/60">{{ country1.continent }}</p>
      </div>

      <div class="flex items-center justify-center text-2xl font-bold text-base-content/30">
        VS
      </div>

      <div class="text-center">
        <img
          :src="getFlagUrl(country2.code)"
          :alt="country2.name + ' flag'"
          class="w-24 h-16 object-cover mx-auto rounded shadow mb-2"
        />
        <h2 class="text-xl font-bold">{{ country2.name }}</h2>
        <p class="text-sm text-base-content/60">{{ country2.continent }}</p>
      </div>
    </div>

    <!-- Comparison Bars -->
    <div v-if="country1 && country2" class="space-y-6">
      <div
        v-for="metric in metrics"
        :key="metric.key"
        class="card bg-base-200 p-4"
      >
        <div class="text-sm font-medium text-base-content/70 mb-2 text-center">
          {{ metric.label }}
        </div>

        <div class="grid grid-cols-[1fr_auto_1fr] gap-2 items-center">
          <!-- Country 1 Bar -->
          <div class="flex items-center gap-2">
            <div class="flex-1 h-8 bg-base-300 rounded-lg overflow-hidden flex justify-end">
              <div
                class="h-full rounded-lg transition-all duration-500"
                :class="getComparison(metric).winner === 1 ? 'bg-primary' : 'bg-base-content/30'"
                :style="{ width: getComparison(metric).pct1 + '%' }"
              ></div>
            </div>
            <span
              class="font-mono text-sm w-20 text-right"
              :class="getComparison(metric).winner === 1 ? 'font-bold text-primary' : ''"
            >
              {{ getComparison(metric).formatted1 }}
            </span>
          </div>

          <!-- Ratio -->
          <div class="w-16 text-center text-xs text-base-content/50">
            {{ metric.unit }}
          </div>

          <!-- Country 2 Bar -->
          <div class="flex items-center gap-2">
            <span
              class="font-mono text-sm w-20"
              :class="getComparison(metric).winner === 2 ? 'font-bold text-secondary' : ''"
            >
              {{ getComparison(metric).formatted2 }}
            </span>
            <div class="flex-1 h-8 bg-base-300 rounded-lg overflow-hidden">
              <div
                class="h-full rounded-lg transition-all duration-500"
                :class="getComparison(metric).winner === 2 ? 'bg-secondary' : 'bg-base-content/30'"
                :style="{ width: getComparison(metric).pct2 + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Fun Facts -->
    <div v-if="country1 && country2" class="mt-8 card bg-base-200 p-6">
      <h3 class="font-bold mb-4">Quick Facts</h3>
      <ul class="space-y-2 text-sm">
        <li v-if="getComparison(metrics[0]).ratio !== '-'">
          <span class="font-medium">{{ getComparison(metrics[0]).winner === 1 ? country1.name : country2.name }}</span>
          has {{ getComparison(metrics[0]).winner === 1 ? getComparison(metrics[0]).ratio : (country2.population / country1.population).toFixed(1) + 'x' }} more people
        </li>
        <li v-if="getComparison(metrics[1]).ratio !== '-'">
          <span class="font-medium">{{ getComparison(metrics[1]).winner === 1 ? country1.name : country2.name }}</span>
          is {{ getComparison(metrics[1]).winner === 1 ? getComparison(metrics[1]).ratio : (country2.area / country1.area).toFixed(1) + 'x' }} larger in area
        </li>
        <li>
          <span class="font-medium">{{ country1.gdpPerCapita > country2.gdpPerCapita ? country1.name : country2.name }}</span>
          has higher GDP per capita (${{ Math.max(country1.gdpPerCapita, country2.gdpPerCapita).toLocaleString() }} vs ${{ Math.min(country1.gdpPerCapita, country2.gdpPerCapita).toLocaleString() }})
        </li>
        <li>
          Life expectancy difference: <span class="font-medium">{{ Math.abs(country1.lifeExpectancy - country2.lifeExpectancy).toFixed(1) }} years</span>
        </li>
      </ul>
    </div>
  </div>
</template>
