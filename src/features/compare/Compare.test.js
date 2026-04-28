import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Compare from './Compare.vue'

describe('Compare', () => {
  it('renders title', () => {
    const wrapper = mount(Compare)
    expect(wrapper.text()).toContain('Compare Countries')
  })

  it('has two country selectors', () => {
    const wrapper = mount(Compare)
    const selects = wrapper.findAll('select')
    expect(selects.length).toBe(2)
  })

  it('defaults to US and China', () => {
    const wrapper = mount(Compare)
    expect(wrapper.text()).toContain('United States')
    expect(wrapper.text()).toContain('China')
  })

  it('shows comparison metrics', () => {
    const wrapper = mount(Compare)
    expect(wrapper.text()).toContain('Population')
    expect(wrapper.text()).toContain('Land Area')
    expect(wrapper.text()).toContain('GDP per Capita')
    expect(wrapper.text()).toContain('Life Expectancy')
    expect(wrapper.text()).toContain('Internet Access')
  })

  it('has swap button', () => {
    const wrapper = mount(Compare)
    const swapBtn = wrapper.find('button')
    expect(swapBtn.exists()).toBe(true)
  })

  it('shows quick facts section', () => {
    const wrapper = mount(Compare)
    expect(wrapper.text()).toContain('Quick Facts')
  })

  // ─── Search filters the country dropdowns ────────────────────────────────

  describe('search', () => {
    it('renders a search input above each country selector', () => {
      const wrapper = mount(Compare)
      const searches = wrapper.findAll('input[type="search"]')
      expect(searches.length).toBe(2)
    })

    it('search inputs default to empty', () => {
      const wrapper = mount(Compare)
      const searches = wrapper.findAll('input[type="search"]')
      expect(searches[0].element.value).toBe('')
      expect(searches[1].element.value).toBe('')
    })

    it('typing in a search input filters that select to matching countries', async () => {
      const wrapper = mount(Compare)
      const search1 = wrapper.findAll('input[type="search"]')[0]
      await search1.setValue('germ')

      const select1 = wrapper.find('#country1-select')
      const optionTexts = select1.findAll('option').map(o => o.text())
      // Germany should match
      expect(optionTexts.some(t => t === 'Germany')).toBe(true)
      // Most other countries should NOT be in the filtered list
      expect(optionTexts.length).toBeLessThan(20)
    })

    it('typeahead auto-selects the first match when current selection no longer matches', async () => {
      const wrapper = mount(Compare)
      // Default selection is US. Type "germ" — US doesn't match, Germany does.
      const search1 = wrapper.findAll('input[type="search"]')[0]
      await search1.setValue('germ')

      const select1 = wrapper.find('#country1-select')
      // The select's value should now be Germany's code
      expect(select1.element.value).toBe('DE')
      // And the page should reflect it
      expect(wrapper.text()).toContain('Germany')
    })

    it('typeahead keeps the current selection when it still matches the query', async () => {
      const wrapper = mount(Compare)
      // US is selected by default. Type "uni" — "United States" still matches.
      const search1 = wrapper.findAll('input[type="search"]')[0]
      await search1.setValue('uni')

      const select1 = wrapper.find('#country1-select')
      // Should still be US, not jumped to UAE/UK
      expect(select1.element.value).toBe('US')
    })

    it('search text persists during typeahead so the user can keep refining', async () => {
      const wrapper = mount(Compare)
      const search1 = wrapper.findAll('input[type="search"]')[0]
      await search1.setValue('germ')

      // Even though typeahead changed country1Code to 'DE', the search field
      // should still show "germ" so the user can continue typing.
      expect(search1.element.value).toBe('germ')
    })

    it('search filters by country code as well as name', async () => {
      const wrapper = mount(Compare)
      const search1 = wrapper.findAll('input[type="search"]')[0]
      await search1.setValue('JP')

      const select1 = wrapper.find('#country1-select')
      const optionTexts = select1.findAll('option').map(o => o.text())
      expect(optionTexts.some(t => t === 'Japan')).toBe(true)
    })

    it('search input clears after a manual dropdown selection', async () => {
      const wrapper = mount(Compare)
      const search1 = wrapper.findAll('input[type="search"]')[0]
      await search1.setValue('germ')
      expect(search1.element.value).toBe('germ')

      const select1 = wrapper.find('#country1-select')
      await select1.setValue('DE')
      // The select's @change handler clears searchQuery1. Note: only
      // user-driven select changes fire @change; JS-driven typeahead
      // assignments to country1Code do NOT (which is by design — typeahead
      // keeps the search text intact so the user can keep refining).
      expect(search1.element.value).toBe('')
    })

    it('search inputs are independent per side', async () => {
      const wrapper = mount(Compare)
      const [search1, search2] = wrapper.findAll('input[type="search"]')
      await search1.setValue('france')
      await search2.setValue('brazil')

      const select1 = wrapper.find('#country1-select')
      const select2 = wrapper.find('#country2-select')

      expect(select1.findAll('option').map(o => o.text()).some(t => t === 'France')).toBe(true)
      expect(select2.findAll('option').map(o => o.text()).some(t => t === 'Brazil')).toBe(true)
    })

    it('swap button clears both search queries', async () => {
      const wrapper = mount(Compare)
      const [search1, search2] = wrapper.findAll('input[type="search"]')
      await search1.setValue('germ')
      await search2.setValue('braz')

      // Find the swap button by aria-label (more robust than positional)
      const swapBtn = wrapper.find('button[aria-label="Swap countries"]')
      await swapBtn.trigger('click')

      // After swap, both search fields should be empty (otherwise the
      // dropdown labels and the search text would disagree)
      expect(search1.element.value).toBe('')
      expect(search2.element.value).toBe('')
    })
  })
})
