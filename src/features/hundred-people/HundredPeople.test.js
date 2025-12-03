import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import HundredPeople from './HundredPeople.vue'

// Helper to wait for animation to complete
const waitForAnimation = async () => {
  // Animation takes ~950ms total (450ms out + 50ms shuffle + 450ms in)
  vi.advanceTimersByTime(1000)
  await Promise.resolve() // Allow Vue to process
}

describe('HundredPeople', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the title', () => {
    const wrapper = mount(HundredPeople)
    expect(wrapper.text()).toContain('The World as 100 People')
  })

  it('renders exactly 100 dots', () => {
    const wrapper = mount(HundredPeople)
    const dots = wrapper.findAll('.grid > div')
    expect(dots.length).toBe(100)
  })

  it('renders all 5 view mode buttons plus auto-play', () => {
    const wrapper = mount(HundredPeople)
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBe(6) // 5 modes + 1 auto-play
    expect(wrapper.text()).toContain('By Region')
    expect(wrapper.text()).toContain('By Income')
    expect(wrapper.text()).toContain('Internet Access')
    expect(wrapper.text()).toContain('Urban vs Rural')
    expect(wrapper.text()).toContain('By Age')
    expect(wrapper.text()).toContain('Auto-play')
  })

  it('starts with region mode active', () => {
    const wrapper = mount(HundredPeople)
    const activeButton = wrapper.find('.btn-primary')
    expect(activeButton.text()).toBe('By Region')
  })

  it('shows region description by default', () => {
    const wrapper = mount(HundredPeople)
    expect(wrapper.text()).toContain('Where do people live?')
  })

  it('switches mode when button clicked', async () => {
    const wrapper = mount(HundredPeople)
    const incomeButton = wrapper.findAll('button').find(b => b.text() === 'By Income')
    await incomeButton.trigger('click')
    await waitForAnimation()
    expect(wrapper.text()).toContain('How much do people earn?')
  })

  it('renders legend items', () => {
    const wrapper = mount(HundredPeople)
    expect(wrapper.text()).toContain('Asia')
    expect(wrapper.text()).toContain('Africa')
    expect(wrapper.text()).toContain('Europe')
  })

  it('shows explanation text', () => {
    const wrapper = mount(HundredPeople)
    expect(wrapper.text()).toContain('Each dot represents approximately 80 million real people')
  })

  it('highlights dots on legend hover', async () => {
    const wrapper = mount(HundredPeople)
    const legendItem = wrapper.findAll('.cursor-pointer').find(el => el.text().includes('Asia'))
    await legendItem.trigger('mouseenter')

    // Check that hoveredGroup state is set (dots should have highlight class)
    const dots = wrapper.findAll('.grid > div')
    const highlightedDots = dots.filter(d => d.classes().includes('dot-highlighted'))
    expect(highlightedDots.length).toBeGreaterThan(0)
  })

  it('shows info card on hover', async () => {
    const wrapper = mount(HundredPeople)
    const legendItem = wrapper.findAll('.cursor-pointer').find(el => el.text().includes('Asia'))
    await legendItem.trigger('mouseenter')

    expect(wrapper.text()).toContain('out of 100 people')
  })

  it('clears highlight on mouse leave', async () => {
    const wrapper = mount(HundredPeople)
    const legendItem = wrapper.findAll('.cursor-pointer').find(el => el.text().includes('Asia'))

    await legendItem.trigger('mouseenter')
    await legendItem.trigger('mouseleave')

    // Info card should be hidden
    const alert = wrapper.find('.alert')
    expect(alert.exists()).toBe(false)
  })

  it('dots have correct colors', () => {
    const wrapper = mount(HundredPeople)
    const dots = wrapper.findAll('.grid > div')

    // Check that dots have background colors set
    dots.forEach(dot => {
      const style = dot.attributes('style')
      expect(style).toContain('background-color')
    })
  })

  it('dots are interactive', () => {
    const wrapper = mount(HundredPeople)
    const dots = wrapper.findAll('.grid > div')

    dots.forEach(dot => {
      expect(dot.classes()).toContain('cursor-pointer')
      expect(dot.classes()).toContain('dot-animate')
    })
  })

  it('displays badges with people count in legend', () => {
    const wrapper = mount(HundredPeople)
    const badges = wrapper.findAll('.badge')
    expect(badges.length).toBeGreaterThan(0)

    // Asia should show 59
    const asiaBadge = badges.find(b => b.text() === '59')
    expect(asiaBadge).toBeDefined()
  })
})
