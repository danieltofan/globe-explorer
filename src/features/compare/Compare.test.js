import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Compare from './Compare.vue'

describe('Compare', () => {
  it('renders title', () => {
    const wrapper = mount(Compare)
    expect(wrapper.text()).toContain('Compare Countries')
  })

  it('shows coming soon message', () => {
    const wrapper = mount(Compare)
    expect(wrapper.text()).toContain('coming soon')
  })

  it('has info alert', () => {
    const wrapper = mount(Compare)
    expect(wrapper.find('.alert-info').exists()).toBe(true)
  })
})
