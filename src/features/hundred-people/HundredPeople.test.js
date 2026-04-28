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
    const dots = wrapper.findAll('.grid > button')
    expect(dots.length).toBe(100)
  })

  it('renders all 5 view mode buttons plus auto-play', () => {
    const wrapper = mount(HundredPeople)
    const modeButtons = wrapper.findAll('.mode-btn')
    expect(modeButtons.length).toBe(5) // 5 mode buttons
    expect(wrapper.text()).toContain('By Region')
    expect(wrapper.text()).toContain('By Income')
    expect(wrapper.text()).toContain('Internet Access')
    expect(wrapper.text()).toContain('Urban vs Rural')
    expect(wrapper.text()).toContain('By Age')
    expect(wrapper.text()).toContain('Auto-play')
  })

  it('starts with region mode active', () => {
    const wrapper = mount(HundredPeople)
    // Scope to the mode-selector group so we don't match the Display toggle's
    // active button (Dots vs Icons), which also uses btn-primary.
    const modeGroup = wrapper.find('[aria-label="View mode selection"]')
    const activeButton = modeGroup.find('.btn-primary')
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
    const legendItem = wrapper.findAll('.legend-pill').find(el => el.text().includes('Asia'))
    await legendItem.trigger('mouseenter')

    // Check that hoveredGroup state is set (dots should have highlight class)
    const dots = wrapper.findAll('.grid > button')
    const highlightedDots = dots.filter(d => d.classes().includes('dot-highlighted'))
    expect(highlightedDots.length).toBeGreaterThan(0)
  })

  it('shows info card on hover', async () => {
    const wrapper = mount(HundredPeople)
    const legendItem = wrapper.findAll('.legend-pill').find(el => el.text().includes('Asia'))
    await legendItem.trigger('mouseenter')

    expect(wrapper.text()).toContain('out of 100 people')
  })

  it('clears highlight on mouse leave', async () => {
    const wrapper = mount(HundredPeople)
    const legendItem = wrapper.findAll('.legend-pill').find(el => el.text().includes('Asia'))

    await legendItem.trigger('mouseenter')
    await legendItem.trigger('mouseleave')

    // Info card should be hidden
    const alert = wrapper.find('.alert')
    expect(alert.exists()).toBe(false)
  })

  it('dots have correct colors', () => {
    const wrapper = mount(HundredPeople)
    const dots = wrapper.findAll('.grid > button')

    // Check that dots have background colors set
    dots.forEach(dot => {
      const style = dot.attributes('style')
      expect(style).toContain('background-color')
    })
  })

  it('dots are interactive', () => {
    const wrapper = mount(HundredPeople)
    const dots = wrapper.findAll('.grid > button')

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

  // ─── v2 Display toggle (Dots vs Icons) ──────────────────────────────────

  describe('Display toggle (v2)', () => {
    it('renders both "Dots" and "Icons" toggle buttons', () => {
      const wrapper = mount(HundredPeople)
      const toggleGroup = wrapper.find('[aria-label="Display style"]')
      expect(toggleGroup.exists()).toBe(true)
      const buttons = toggleGroup.findAll('button')
      expect(buttons.length).toBe(2)
      expect(buttons[0].text()).toBe('Dots')
      expect(buttons[1].text()).toBe('Icons')
    })

    it('defaults to Dots (useIcons === false)', () => {
      const wrapper = mount(HundredPeople)
      const toggleGroup = wrapper.find('[aria-label="Display style"]')
      const dotsBtn = toggleGroup.findAll('button')[0]
      const iconsBtn = toggleGroup.findAll('button')[1]
      expect(dotsBtn.attributes('aria-pressed')).toBe('true')
      expect(iconsBtn.attributes('aria-pressed')).toBe('false')
      expect(dotsBtn.classes()).toContain('btn-primary')
      expect(iconsBtn.classes()).toContain('btn-ghost')
    })

    it('renders no icon overlays in default Dots mode', () => {
      const wrapper = mount(HundredPeople)
      const dots = wrapper.findAll('.grid > button')
      const dotsWithIcon = dots.filter(d => d.find('img').exists())
      expect(dotsWithIcon.length).toBe(0)
    })

    it('renders an icon overlay on every dot after switching to Icons', async () => {
      const wrapper = mount(HundredPeople)
      const iconsBtn = wrapper.find('[aria-label="Display style"]').findAll('button')[1]
      await iconsBtn.trigger('click')

      const dots = wrapper.findAll('.grid > button')
      expect(dots.length).toBe(100)
      const dotsWithIcon = dots.filter(d => d.find('img').exists())
      expect(dotsWithIcon.length).toBe(100)
    })

    it('icons in dots have non-empty src and aria-hidden', async () => {
      const wrapper = mount(HundredPeople)
      const iconsBtn = wrapper.find('[aria-label="Display style"]').findAll('button')[1]
      await iconsBtn.trigger('click')

      const firstImg = wrapper.find('.grid > button img')
      expect(firstImg.exists()).toBe(true)
      expect(firstImg.attributes('src')).toBeTruthy()
      expect(firstImg.attributes('aria-hidden')).toBe('true')
      expect(firstImg.attributes('alt')).toBe('')
    })

    it('first 59 dots use the Asia icon in default region mode (with Icons on)', async () => {
      const wrapper = mount(HundredPeople)
      const iconsBtn = wrapper.find('[aria-label="Display style"]').findAll('button')[1]
      await iconsBtn.trigger('click')

      const dots = wrapper.findAll('.grid > button')
      // First 59 are Asia per regions.js; their icon src should all match.
      const firstAsiaImg = dots[0].find('img').attributes('src')
      const lastAsiaImg = dots[58].find('img').attributes('src')
      expect(firstAsiaImg).toBe(lastAsiaImg)
      // Dot 59 is the first African dot, different category, different icon
      const firstAfricaImg = dots[59].find('img').attributes('src')
      expect(firstAfricaImg).not.toBe(firstAsiaImg)
    })

    it('toggling back to Dots removes all icon overlays', async () => {
      const wrapper = mount(HundredPeople)
      const buttons = wrapper.find('[aria-label="Display style"]').findAll('button')
      const dotsBtn = buttons[0]
      const iconsBtn = buttons[1]

      await iconsBtn.trigger('click')
      expect(wrapper.findAll('.grid > button img').length).toBe(100)

      await dotsBtn.trigger('click')
      expect(wrapper.findAll('.grid > button img').length).toBe(0)
    })

    it('legend swatches show icons when Icons mode is active', async () => {
      const wrapper = mount(HundredPeople)
      // Default: legend swatches have no icon
      const swatchesDots = wrapper.findAll('.legend-swatch')
      expect(swatchesDots.length).toBeGreaterThan(0)
      expect(swatchesDots.filter(s => s.find('img').exists()).length).toBe(0)

      const iconsBtn = wrapper.find('[aria-label="Display style"]').findAll('button')[1]
      await iconsBtn.trigger('click')

      const swatchesIcons = wrapper.findAll('.legend-swatch')
      expect(swatchesIcons.filter(s => s.find('img').exists()).length).toBe(swatchesIcons.length)
    })

    it('Icons mode persists across mode switches', async () => {
      const wrapper = mount(HundredPeople)
      const iconsBtn = wrapper.find('[aria-label="Display style"]').findAll('button')[1]
      await iconsBtn.trigger('click')

      // Now switch the view mode (Region -> Income)
      const incomeBtn = wrapper.findAll('button').find(b => b.text() === 'By Income')
      await incomeBtn.trigger('click')
      await waitForAnimation()

      // Icons should still be on after the mode change
      const iconsBtnAfter = wrapper.find('[aria-label="Display style"]').findAll('button')[1]
      expect(iconsBtnAfter.attributes('aria-pressed')).toBe('true')
      expect(wrapper.findAll('.grid > button img').length).toBe(100)
    })
  })
})
