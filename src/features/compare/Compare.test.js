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
})
