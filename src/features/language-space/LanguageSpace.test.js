import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import LanguageSpace from './LanguageSpace.vue'

// Mock HTMLCanvasElement.getContext before importing component
const mockContext = {
  fillStyle: '',
  fillRect: vi.fn(),
  font: '',
  textAlign: '',
  fillText: vi.fn()
}

HTMLCanvasElement.prototype.getContext = vi.fn(() => mockContext)

// Mock Three.js - it requires WebGL which isn't available in jsdom
vi.mock('three', () => ({
  Scene: vi.fn(() => ({
    add: vi.fn(),
    background: null
  })),
  PerspectiveCamera: vi.fn(() => ({
    position: { set: vi.fn(), copy: vi.fn(), distanceTo: vi.fn(() => 50) },
    aspect: 1,
    updateProjectionMatrix: vi.fn(),
    quaternion: { copy: vi.fn() }
  })),
  WebGLRenderer: vi.fn(() => ({
    setSize: vi.fn(),
    setPixelRatio: vi.fn(),
    domElement: document.createElement('canvas'),
    render: vi.fn(),
    dispose: vi.fn()
  })),
  Color: vi.fn(() => ({})),
  SphereGeometry: vi.fn(),
  MeshPhongMaterial: vi.fn(() => ({
    emissiveIntensity: 0.3,
    opacity: 0.9
  })),
  Mesh: vi.fn(() => ({
    position: { set: vi.fn() },
    userData: {},
    material: { emissiveIntensity: 0.3, opacity: 0.9 },
    scale: { setScalar: vi.fn() }
  })),
  Sprite: vi.fn(() => ({
    position: { set: vi.fn() },
    scale: { set: vi.fn() },
    userData: {},
    material: { opacity: 1 },
    visible: true,
    quaternion: { copy: vi.fn() }
  })),
  SpriteMaterial: vi.fn(),
  CanvasTexture: vi.fn(),
  LineBasicMaterial: vi.fn(),
  BufferGeometry: vi.fn(() => ({
    setFromPoints: vi.fn(() => ({}))
  })),
  Line: vi.fn(() => ({
    visible: false
  })),
  Vector2: vi.fn(() => ({ x: 0, y: 0 })),
  Vector3: vi.fn((x, y, z) => ({ x, y, z })),
  Raycaster: vi.fn(() => ({
    setFromCamera: vi.fn(),
    intersectObjects: vi.fn(() => []),
    params: { Points: { threshold: 2 } }
  })),
  AmbientLight: vi.fn(),
  PointLight: vi.fn(() => ({
    position: { set: vi.fn() }
  })),
  GridHelper: vi.fn(() => ({
    position: { y: 0 }
  }))
}))

vi.mock('three/examples/jsm/controls/OrbitControls.js', () => ({
  OrbitControls: vi.fn(() => ({
    enableDamping: true,
    dampingFactor: 0.05,
    minDistance: 30,
    maxDistance: 200,
    autoRotate: true,
    autoRotateSpeed: 0.3,
    target: { set: vi.fn() },
    update: vi.fn()
  }))
}))

// Mock requestAnimationFrame
const animationFrameCallbacks = []
global.requestAnimationFrame = vi.fn(cb => {
  const id = animationFrameCallbacks.push(cb)
  return id
})
global.cancelAnimationFrame = vi.fn(id => {
  animationFrameCallbacks[id - 1] = null
})

describe('LanguageSpace', () => {
  let wrapper

  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
    vi.useRealTimers()
    vi.clearAllTimers()
  })

  it('renders the page title', () => {
    wrapper = mount(LanguageSpace)
    expect(wrapper.find('h1').text()).toBe('Language Embedding Space')
  })

  it('renders the subtitle', () => {
    wrapper = mount(LanguageSpace)
    expect(wrapper.text()).toContain('Languages positioned by linguistic similarity')
  })

  it('renders visualization controls', () => {
    wrapper = mount(LanguageSpace)
    expect(wrapper.text()).toContain('Labels')
    expect(wrapper.text()).toContain('Connections')
    expect(wrapper.find('button').text()).toContain('Reset View')
  })

  it('has Labels toggle checkbox', () => {
    wrapper = mount(LanguageSpace)
    const labelsToggle = wrapper.find('input[type="checkbox"]')
    expect(labelsToggle.exists()).toBe(true)
  })

  it('has Labels toggle checked by default', () => {
    wrapper = mount(LanguageSpace)
    const toggles = wrapper.findAll('input[type="checkbox"]')
    // First toggle is Labels
    expect(toggles[0].element.checked).toBe(true)
  })

  it('has Connections toggle unchecked by default', () => {
    wrapper = mount(LanguageSpace)
    const toggles = wrapper.findAll('input[type="checkbox"]')
    // Second toggle is Connections
    expect(toggles[1].element.checked).toBe(false)
  })

  it('renders the canvas container', () => {
    wrapper = mount(LanguageSpace)
    const container = wrapper.find('[role="img"]')
    expect(container.exists()).toBe(true)
  })

  it('has accessible canvas description', () => {
    wrapper = mount(LanguageSpace)
    const container = wrapper.find('[role="img"]')
    expect(container.attributes('aria-label')).toContain('Interactive 3D visualization')
  })

  it('renders sidebar with language families', () => {
    wrapper = mount(LanguageSpace)
    expect(wrapper.text()).toContain('Language Families')
  })

  it('renders legend section', () => {
    wrapper = mount(LanguageSpace)
    expect(wrapper.text()).toContain('How to Read This')
    expect(wrapper.text()).toContain('Position')
    expect(wrapper.text()).toContain('Size')
    expect(wrapper.text()).toContain('Color')
    expect(wrapper.text()).toContain('Distance')
  })

  it('renders all language families in sidebar', () => {
    wrapper = mount(LanguageSpace)
    expect(wrapper.text()).toContain('Romance')
    expect(wrapper.text()).toContain('Germanic')
    expect(wrapper.text()).toContain('Slavic')
    expect(wrapper.text()).toContain('Sino-Tibetan')
  })

  it('family buttons have aria-pressed attribute', () => {
    wrapper = mount(LanguageSpace)
    const familyButtons = wrapper.findAll('[aria-pressed]')
    expect(familyButtons.length).toBeGreaterThan(5)
  })

  it('family buttons are initially not pressed', () => {
    wrapper = mount(LanguageSpace)
    const familyButtons = wrapper.findAll('[aria-pressed]')
    familyButtons.forEach(btn => {
      expect(btn.attributes('aria-pressed')).toBe('false')
    })
  })

  it('clicking a family button toggles aria-pressed', async () => {
    wrapper = mount(LanguageSpace)
    const familyButtons = wrapper.findAll('[aria-pressed]')
    const romanceButton = familyButtons.find(btn => btn.text().includes('Romance'))

    await romanceButton.trigger('click')
    expect(romanceButton.attributes('aria-pressed')).toBe('true')

    await romanceButton.trigger('click')
    expect(romanceButton.attributes('aria-pressed')).toBe('false')
  })

  it('shows language counts next to family names', () => {
    wrapper = mount(LanguageSpace)
    // Romance has 6 languages in the data
    const text = wrapper.text()
    // Should show counts like "Romance ... 6"
    expect(text).toMatch(/Romance.*\d/)
    expect(text).toMatch(/Germanic.*\d/)
  })

  it('does not show selected language info initially', () => {
    wrapper = mount(LanguageSpace)
    // No selected language card should be visible
    const cards = wrapper.findAll('.card')
    const selectedCard = cards.find(c => c.text().includes('Nearest Neighbors'))
    expect(selectedCard).toBeUndefined()
  })

  it('renders screen reader only description', () => {
    wrapper = mount(LanguageSpace)
    const srOnly = wrapper.find('.sr-only')
    expect(srOnly.exists()).toBe(true)
    expect(srOnly.text()).toContain('languages positioned in 3D space')
  })

  it('has proper heading hierarchy', () => {
    wrapper = mount(LanguageSpace)
    const h1 = wrapper.find('h1')
    const h2s = wrapper.findAll('h2')

    expect(h1.exists()).toBe(true)
    expect(h2s.length).toBeGreaterThan(0)
  })

  it('Reset View button has aria-label', () => {
    wrapper = mount(LanguageSpace)
    const resetButton = wrapper.find('button[aria-label*="Reset"]')
    expect(resetButton.exists()).toBe(true)
  })
})
