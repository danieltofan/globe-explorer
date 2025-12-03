import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import CountryDetail from './CountryDetail.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/countries/:code', name: 'country-detail', component: CountryDetail }
  ]
})

describe('CountryDetail', () => {
  it('renders title with country code', async () => {
    router.push('/countries/US')
    await router.isReady()

    const wrapper = mount(CountryDetail, {
      global: { plugins: [router] }
    })
    expect(wrapper.text()).toContain('Country:')
    expect(wrapper.text()).toContain('US')
  })

  it('shows coming soon message', async () => {
    router.push('/countries/GB')
    await router.isReady()

    const wrapper = mount(CountryDetail, {
      global: { plugins: [router] }
    })
    expect(wrapper.text()).toContain('coming soon')
  })

  it('has info alert', async () => {
    router.push('/countries/FR')
    await router.isReady()

    const wrapper = mount(CountryDetail, {
      global: { plugins: [router] }
    })
    expect(wrapper.find('.alert-info').exists()).toBe(true)
  })
})
