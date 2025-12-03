import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: { template: '<div>Home</div>' } },
    { path: '/countries', name: 'countries', component: { template: '<div>Countries</div>' } },
    { path: '/compare', name: 'compare', component: { template: '<div>Compare</div>' } }
  ]
})

describe('App', () => {
  it('renders navbar with logo', () => {
    const wrapper = mount(App, {
      global: { plugins: [router] }
    })
    expect(wrapper.text()).toContain('Globe Explorer')
  })

  it('has navigation links', () => {
    const wrapper = mount(App, {
      global: { plugins: [router] }
    })
    expect(wrapper.text()).toContain('100 People')
    expect(wrapper.text()).toContain('Countries')
    expect(wrapper.text()).toContain('Compare')
  })

  it('has theme toggle button', () => {
    const wrapper = mount(App, {
      global: { plugins: [router] }
    })
    const themeToggle = wrapper.find('.theme-controller')
    expect(themeToggle.exists()).toBe(true)
  })

  it('has footer', () => {
    const wrapper = mount(App, {
      global: { plugins: [router] }
    })
    expect(wrapper.find('footer').exists()).toBe(true)
    expect(wrapper.text()).toContain('Vue 3')
    expect(wrapper.text()).toContain('DaisyUI')
  })

  it('has RouterView for content', () => {
    const wrapper = mount(App, {
      global: { plugins: [router] }
    })
    expect(wrapper.find('main').exists()).toBe(true)
  })

  it('navbar is sticky', () => {
    const wrapper = mount(App, {
      global: { plugins: [router] }
    })
    const navbar = wrapper.find('.navbar')
    expect(navbar.classes()).toContain('sticky')
  })
})
