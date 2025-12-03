import { describe, it, expect } from 'vitest'
import router from './index'

describe('Router', () => {
  it('has home route at root', () => {
    const routes = router.getRoutes()
    const home = routes.find(r => r.path === '/')
    expect(home).toBeDefined()
    expect(home.name).toBe('home')
  })

  it('has countries list route', () => {
    const routes = router.getRoutes()
    const countries = routes.find(r => r.path === '/countries')
    expect(countries).toBeDefined()
    expect(countries.name).toBe('countries')
  })

  it('has country detail route with param', () => {
    const routes = router.getRoutes()
    const detail = routes.find(r => r.path === '/countries/:code')
    expect(detail).toBeDefined()
    expect(detail.name).toBe('country-detail')
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
