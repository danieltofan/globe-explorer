<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { languages, languageFamilies, getNearestNeighbors } from './languages'

// State
const containerRef = ref(null)
const selectedLanguage = ref(null)
const hoveredLanguage = ref(null)
const selectedFamily = ref(null)
const showLabels = ref(true)
const showConnections = ref(false)

// Three.js objects
let scene, camera, renderer, controls
let points = []
let labels = []
let connections = []
let raycaster, mouse
let animationId

// Colors
const familyColors = {}
Object.entries(languageFamilies).forEach(([name, data]) => {
  familyColors[name] = new THREE.Color(data.color)
})

// Initialize Three.js scene
function initScene() {
  const container = containerRef.value
  const width = container.clientWidth
  const height = container.clientHeight

  // Scene
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x0a0a0f)

  // Camera
  camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
  camera.position.set(80, 50, 80)

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  container.appendChild(renderer.domElement)

  // Controls
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.minDistance = 30
  controls.maxDistance = 200
  controls.autoRotate = true
  controls.autoRotateSpeed = 0.3

  // Raycaster for interaction
  raycaster = new THREE.Raycaster()
  raycaster.params.Points.threshold = 2
  mouse = new THREE.Vector2()

  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
  scene.add(ambientLight)

  // Add point light
  const pointLight = new THREE.PointLight(0xffffff, 1)
  pointLight.position.set(50, 50, 50)
  scene.add(pointLight)

  // Create language points
  createLanguagePoints()

  // Create connecting lines (initially hidden)
  createConnections()

  // Add grid helper for reference
  const gridHelper = new THREE.GridHelper(100, 20, 0x222233, 0x111122)
  gridHelper.position.y = -35
  scene.add(gridHelper)

  // Event listeners
  container.addEventListener('mousemove', onMouseMove)
  container.addEventListener('click', onClick)
  window.addEventListener('resize', onResize)
}

// Create spheres for each language
function createLanguagePoints() {
  languages.forEach(lang => {
    // Sphere geometry - size based on speakers (log scale)
    const size = Math.max(0.8, Math.log10(lang.speakers + 1) * 0.8)
    const geometry = new THREE.SphereGeometry(size, 16, 16)

    const color = familyColors[lang.family] || new THREE.Color(0x888888)
    const material = new THREE.MeshPhongMaterial({
      color: color,
      emissive: color,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.9
    })

    const sphere = new THREE.Mesh(geometry, material)
    sphere.position.set(lang.x, lang.y, lang.z)
    sphere.userData = { language: lang }

    scene.add(sphere)
    points.push(sphere)

    // Create label sprite
    const label = createLabel(lang.name, lang.code)
    label.position.set(lang.x, lang.y + size + 1.5, lang.z)
    label.userData = { language: lang }
    scene.add(label)
    labels.push(label)
  })
}

// Create text label sprite
function createLabel(name, code) {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  canvas.width = 256
  canvas.height = 64

  context.fillStyle = 'rgba(0, 0, 0, 0)'
  context.fillRect(0, 0, canvas.width, canvas.height)

  context.font = 'bold 24px Arial'
  context.fillStyle = '#ffffff'
  context.textAlign = 'center'
  context.fillText(code.toUpperCase(), canvas.width / 2, 30)

  context.font = '16px Arial'
  context.fillStyle = '#aaaaaa'
  context.fillText(name, canvas.width / 2, 52)

  const texture = new THREE.CanvasTexture(canvas)
  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthTest: false
  })

  const sprite = new THREE.Sprite(material)
  sprite.scale.set(12, 3, 1)

  return sprite
}

// Create connection lines between related languages
function createConnections() {
  const material = new THREE.LineBasicMaterial({
    color: 0x334455,
    transparent: true,
    opacity: 0.3
  })

  languages.forEach(lang => {
    const neighbors = getNearestNeighbors(lang.code, 2)
    neighbors.forEach(neighbor => {
      // Only create line if same family or very close
      if (neighbor.family === lang.family || neighbor.distance < 15) {
        const geometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(lang.x, lang.y, lang.z),
          new THREE.Vector3(neighbor.x, neighbor.y, neighbor.z)
        ])
        const line = new THREE.Line(geometry, material)
        line.visible = false
        scene.add(line)
        connections.push(line)
      }
    })
  })
}

// Handle mouse move for hover effects
function onMouseMove(event) {
  const rect = containerRef.value.getBoundingClientRect()
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

  raycaster.setFromCamera(mouse, camera)
  const intersects = raycaster.intersectObjects(points)

  // Reset all points
  points.forEach(p => {
    if (p.userData.language !== selectedLanguage.value) {
      p.material.emissiveIntensity = 0.3
      p.scale.setScalar(1)
    }
  })

  if (intersects.length > 0) {
    const point = intersects[0].object
    hoveredLanguage.value = point.userData.language
    point.material.emissiveIntensity = 0.8
    point.scale.setScalar(1.3)
    containerRef.value.style.cursor = 'pointer'
  } else {
    hoveredLanguage.value = null
    containerRef.value.style.cursor = 'grab'
  }
}

// Handle click to select language
function onClick() {
  if (hoveredLanguage.value) {
    selectedLanguage.value = hoveredLanguage.value
    controls.autoRotate = false
  } else {
    selectedLanguage.value = null
    controls.autoRotate = true
  }
}

// Handle window resize
function onResize() {
  if (!containerRef.value) return
  const width = containerRef.value.clientWidth
  const height = containerRef.value.clientHeight

  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

// Animation loop
function animate() {
  animationId = requestAnimationFrame(animate)
  controls.update()

  // Update label visibility based on distance
  labels.forEach(label => {
    const distance = camera.position.distanceTo(label.position)
    label.visible = showLabels.value && distance < 100

    // Face camera
    label.quaternion.copy(camera.quaternion)
  })

  // Update connections visibility
  connections.forEach(conn => {
    conn.visible = showConnections.value
  })

  // Highlight selected family
  if (selectedFamily.value) {
    points.forEach(p => {
      const isFamily = p.userData.language.family === selectedFamily.value
      p.material.opacity = isFamily ? 1 : 0.2
    })
    labels.forEach(l => {
      const isFamily = l.userData.language.family === selectedFamily.value
      l.material.opacity = isFamily ? 1 : 0.1
    })
  } else {
    points.forEach(p => p.material.opacity = 0.9)
    labels.forEach(l => l.material.opacity = 1)
  }

  renderer.render(scene, camera)
}

// Computed
const nearestNeighbors = computed(() => {
  if (!selectedLanguage.value) return []
  return getNearestNeighbors(selectedLanguage.value.code, 5)
})

const familyList = computed(() => {
  return Object.entries(languageFamilies).map(([name, data]) => ({
    name,
    ...data,
    count: languages.filter(l => l.family === name).length
  })).sort((a, b) => b.count - a.count)
})

// Focus on a specific language
function focusLanguage(lang) {
  selectedLanguage.value = lang
  controls.autoRotate = false

  // Animate camera to look at language
  const targetPos = new THREE.Vector3(lang.x + 30, lang.y + 20, lang.z + 30)
  camera.position.copy(targetPos)
  controls.target.set(lang.x, lang.y, lang.z)
}

// Reset view
function resetView() {
  selectedLanguage.value = null
  selectedFamily.value = null
  controls.autoRotate = true
  camera.position.set(80, 50, 80)
  controls.target.set(0, 0, 0)
}

// Lifecycle
onMounted(() => {
  initScene()
  animate()
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  if (containerRef.value && renderer) {
    containerRef.value.removeChild(renderer.domElement)
  }
  window.removeEventListener('resize', onResize)
  renderer?.dispose()
})
</script>

<template>
  <div class="h-[calc(100vh-8rem)] flex flex-col overflow-hidden">
    <!-- Header -->
    <div class="bg-base-200 px-4 py-3 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">Language Embedding Space</h1>
        <p class="text-sm text-base-content/60">Languages positioned by linguistic similarity - like word embeddings, but for human languages</p>
      </div>
      <div class="flex gap-2">
        <label class="label cursor-pointer gap-2">
          <span class="label-text">Labels</span>
          <input type="checkbox" v-model="showLabels" class="toggle toggle-sm" />
        </label>
        <label class="label cursor-pointer gap-2">
          <span class="label-text">Connections</span>
          <input type="checkbox" v-model="showConnections" class="toggle toggle-sm" />
        </label>
        <button @click="resetView" class="btn btn-sm btn-ghost">Reset View</button>
      </div>
    </div>

    <div class="flex-1 flex overflow-hidden">
      <!-- 3D Canvas -->
      <div ref="containerRef" class="flex-1 relative cursor-grab"></div>

      <!-- Side Panel -->
      <div class="w-80 bg-base-200 p-4 space-y-4 overflow-y-auto">
        <!-- Selected Language Info -->
        <div v-if="selectedLanguage" class="card bg-base-100 shadow">
          <div class="card-body p-4">
            <h3 class="card-title text-lg">{{ selectedLanguage.name }}</h3>
            <div class="badge" :style="{ backgroundColor: languageFamilies[selectedLanguage.family]?.color }">
              {{ selectedLanguage.family }}
            </div>
            <p class="text-sm text-base-content/70">
              {{ selectedLanguage.speakers >= 1 ? selectedLanguage.speakers.toFixed(0) : selectedLanguage.speakers.toFixed(2) }}M speakers
            </p>
            <p v-if="selectedLanguage.subfamily" class="text-xs text-base-content/50">
              Subfamily: {{ selectedLanguage.subfamily }}
            </p>

            <div class="divider text-xs">Nearest Neighbors</div>
            <ul>
              <li
                v-for="neighbor in nearestNeighbors"
                :key="neighbor.code"
                @click="focusLanguage(neighbor)"
                class="flex justify-between items-center text-sm hover:bg-base-200 p-1 rounded cursor-pointer"
              >
                <span>{{ neighbor.name }}</span>
                <span class="text-xs opacity-50">{{ neighbor.distance.toFixed(1) }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Hover Info -->
        <div v-else-if="hoveredLanguage" class="card bg-base-100 shadow">
          <div class="card-body p-4">
            <h3 class="card-title text-lg">{{ hoveredLanguage.name }}</h3>
            <div class="badge" :style="{ backgroundColor: languageFamilies[hoveredLanguage.family]?.color }">
              {{ hoveredLanguage.family }}
            </div>
            <p class="text-sm">Click to select</p>
          </div>
        </div>

        <!-- Family Filter -->
        <div class="card bg-base-100 shadow">
          <div class="card-body p-3">
            <h3 class="card-title text-sm">Language Families</h3>
            <div>
              <button
                v-for="fam in familyList"
                :key="fam.name"
                @click="selectedFamily = selectedFamily === fam.name ? null : fam.name"
                class="w-full text-left py-1 px-2 rounded text-sm flex items-center gap-2 hover:bg-base-200 transition-colors"
                :class="{ 'bg-base-300': selectedFamily === fam.name }"
              >
                <span
                  class="w-3 h-3 rounded-full"
                  :style="{ backgroundColor: fam.color }"
                ></span>
                <span class="flex-1">{{ fam.name }}</span>
                <span class="text-xs opacity-50">{{ fam.count }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Legend -->
        <div class="card bg-base-100 shadow">
          <div class="card-body p-4">
            <h3 class="card-title text-sm">How to Read This</h3>
            <ul class="text-xs space-y-2 text-base-content/70">
              <li><strong>Position:</strong> Similar languages cluster together, like word embeddings in neural networks</li>
              <li><strong>Size:</strong> Larger spheres = more speakers (log scale)</li>
              <li><strong>Color:</strong> Language family</li>
              <li><strong>Distance:</strong> Closer = more linguistically related</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid oklch(var(--bc) / 0.1);
}
</style>
