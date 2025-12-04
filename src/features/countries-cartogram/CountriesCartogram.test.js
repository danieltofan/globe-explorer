import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CountriesCartogram from './CountriesCartogram.vue'

describe('CountriesCartogram', () => {
  it('renders the title', () => {
    const wrapper = mount(CountriesCartogram)
    expect(wrapper.text()).toContain('World Cartogram')
  })

  it('renders all color mode buttons', () => {
    const wrapper = mount(CountriesCartogram)
    expect(wrapper.text()).toContain('Population')
    expect(wrapper.text()).toContain('GDP per Capita')
    expect(wrapper.text()).toContain('Life Expectancy')
    expect(wrapper.text()).toContain('Internet Access')
    expect(wrapper.text()).toContain('Flags')
  })

  it('starts with population mode active', () => {
    const wrapper = mount(CountriesCartogram)
    const activeButton = wrapper.find('.btn-primary')
    expect(activeButton.text()).toBe('Population')
  })

  it('renders continent sections', () => {
    const wrapper = mount(CountriesCartogram)
    expect(wrapper.text()).toContain('Europe')
    expect(wrapper.text()).toContain('Asia')
    expect(wrapper.text()).toContain('Africa')
    expect(wrapper.text()).toContain('North America')
    expect(wrapper.text()).toContain('South America')
    expect(wrapper.text()).toContain('Oceania')
  })

  it('renders country tiles', () => {
    const wrapper = mount(CountriesCartogram)
    const tiles = wrapper.findAll('.country-tile')
    expect(tiles.length).toBeGreaterThan(190)
  })

  it('tiles have country codes', () => {
    const wrapper = mount(CountriesCartogram)
    // Check for some major country codes
    expect(wrapper.text()).toContain('US')
    expect(wrapper.text()).toContain('CN')
    expect(wrapper.text()).toContain('RU')
    expect(wrapper.text()).toContain('DE')
    expect(wrapper.text()).toContain('JP')
  })

  it('tiles have size classes based on area', () => {
    const wrapper = mount(CountriesCartogram)
    const tiles = wrapper.findAll('.country-tile')

    const hasXxl = tiles.some(t => t.classes().includes('tile-xxl'))
    const hasXl = tiles.some(t => t.classes().includes('tile-xl'))
    const hasL = tiles.some(t => t.classes().includes('tile-l'))
    const hasM = tiles.some(t => t.classes().includes('tile-m'))
    const hasS = tiles.some(t => t.classes().includes('tile-s'))
    const hasXs = tiles.some(t => t.classes().includes('tile-xs'))

    expect(hasXxl).toBe(true) // Russia
    expect(hasXl).toBe(true)  // USA, China, etc.
    expect(hasL).toBe(true)
    expect(hasM).toBe(true)
    expect(hasS).toBe(true)
    expect(hasXs).toBe(true)
  })

  it('tiles have background colors', () => {
    const wrapper = mount(CountriesCartogram)
    const tiles = wrapper.findAll('.country-tile')

    // At least some tiles should have background color set
    const tilesWithBg = tiles.filter(t => t.attributes('style')?.includes('background-color'))
    expect(tilesWithBg.length).toBeGreaterThan(0)
  })

  it('switches color mode on button click', async () => {
    const wrapper = mount(CountriesCartogram)
    const gdpButton = wrapper.findAll('button').find(b => b.text() === 'GDP per Capita')

    await gdpButton.trigger('click')

    expect(wrapper.text()).toContain('Higher income = greener')
  })

  it('shows search input', () => {
    const wrapper = mount(CountriesCartogram)
    const searchInput = wrapper.find('input[type="text"]')
    expect(searchInput.exists()).toBe(true)
    expect(searchInput.attributes('placeholder')).toContain('Search')
  })

  it('filters tiles on search', async () => {
    const wrapper = mount(CountriesCartogram)
    const searchInput = wrapper.find('input[type="text"]')

    await searchInput.setValue('Japan')

    const dimmedTiles = wrapper.findAll('.tile-dimmed')
    expect(dimmedTiles.length).toBeGreaterThan(180) // Most tiles should be dimmed
  })

  it('shows tooltip on hover', async () => {
    const wrapper = mount(CountriesCartogram)
    const tile = wrapper.find('.country-tile')

    await tile.trigger('mouseenter')

    // Tooltip should contain population and GDP info
    expect(wrapper.text()).toContain('Population:')
    expect(wrapper.text()).toContain('GDP/capita:')
  })

  it('opens detail modal on click', async () => {
    const wrapper = mount(CountriesCartogram, {
      global: {
        stubs: {
          teleport: true
        }
      }
    })
    const tile = wrapper.find('.country-tile')

    await tile.trigger('click')

    // Detail card should appear with stat cards
    const detailCard = wrapper.find('.detail-card')
    expect(detailCard.exists()).toBe(true)
  })

  it('closes detail modal on backdrop click', async () => {
    const wrapper = mount(CountriesCartogram, {
      global: {
        stubs: {
          teleport: true
        }
      }
    })

    // Open modal
    const tile = wrapper.find('.country-tile')
    await tile.trigger('click')

    // Click backdrop
    const backdrop = wrapper.find('.detail-backdrop')
    await backdrop.trigger('click')

    // Modal should close
    const detailCard = wrapper.find('.detail-card')
    expect(detailCard.exists()).toBe(false)
  })

  it('shows gradient legend for non-flag modes', () => {
    const wrapper = mount(CountriesCartogram)
    const legend = wrapper.find('.gradient-legend')
    expect(legend.exists()).toBe(true)
    expect(wrapper.text()).toContain('Low')
    expect(wrapper.text()).toContain('High')
  })

  it('hides gradient legend in flags mode', async () => {
    const wrapper = mount(CountriesCartogram)
    const flagsButton = wrapper.findAll('button').find(b => b.text() === 'Flags')

    await flagsButton.trigger('click')

    const legend = wrapper.find('.gradient-legend')
    expect(legend.exists()).toBe(false)
  })

  it('shows flag emojis in flags mode', async () => {
    const wrapper = mount(CountriesCartogram)
    const flagsButton = wrapper.findAll('button').find(b => b.text() === 'Flags')

    await flagsButton.trigger('click')

    const flagModeClass = wrapper.findAll('.tile-flag-mode')
    expect(flagModeClass.length).toBeGreaterThan(0)
  })

  it('shows country count in footer', () => {
    const wrapper = mount(CountriesCartogram)
    expect(wrapper.text()).toContain('countries')
    expect(wrapper.text()).toContain('Tile size')
  })
})
