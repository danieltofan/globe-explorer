import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CountryList from './CountryList.vue'

describe('CountryList', () => {
  it('renders title', () => {
    const wrapper = mount(CountryList)
    expect(wrapper.text()).toContain('Countries')
  })

  it('shows coming soon message', () => {
    const wrapper = mount(CountryList)
    expect(wrapper.text()).toContain('coming soon')
  })

  it('mentions 195 countries', () => {
    const wrapper = mount(CountryList)
    expect(wrapper.text()).toContain('195 countries')
  })

  it('has info alert', () => {
    const wrapper = mount(CountryList)
    expect(wrapper.find('.alert-info').exists()).toBe(true)
  })
})
