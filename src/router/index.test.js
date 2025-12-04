import { describe, it, expect } from 'vitest'
import router from './index'

describe('Router', () => {
  it('has home route at root', () => {
    const routes = router.getRoutes()
    const home = routes.find(r => r.path === '/')
    expect(home).toBeDefined()
    expect(home.name).toBe('home')
  })

  it('has cartogram route', () => {
    const routes = router.getRoutes()
    const cartogram = routes.find(r => r.path === '/cartogram')
    expect(cartogram).toBeDefined()
    expect(cartogram.name).toBe('cartogram')
  })

  it('has languages route', () => {
    const routes = router.getRoutes()
    const languages = routes.find(r => r.path === '/languages')
    expect(languages).toBeDefined()
    expect(languages.name).toBe('languages')
  })

  it('has compare route', () => {
    const routes = router.getRoutes()
    const compare = routes.find(r => r.path === '/compare')
    expect(compare).toBeDefined()
    expect(compare.name).toBe('compare')
  })

  it('has exactly 4 routes', () => {
    expect(router.getRoutes().length).toBe(4)
  })
})
