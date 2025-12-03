import { describe, it, expect } from 'vitest'
import { regions, incomeGroups, internetAccess, urbanRural, ageGroups, viewModes } from './regions'

describe('regions data', () => {
  it('has 6 regions', () => {
    expect(regions).toHaveLength(6)
  })

  it('regions sum to 100 people', () => {
    const total = regions.reduce((sum, r) => sum + r.people, 0)
    expect(total).toBe(100)
  })

  it('each region has required fields', () => {
    regions.forEach(region => {
      expect(region).toHaveProperty('id')
      expect(region).toHaveProperty('name')
      expect(region).toHaveProperty('population')
      expect(region).toHaveProperty('color')
      expect(region).toHaveProperty('people')
    })
  })

  it('includes all continents', () => {
    const names = regions.map(r => r.name)
    expect(names).toContain('Asia')
    expect(names).toContain('Africa')
    expect(names).toContain('Europe')
    expect(names).toContain('North America')
    expect(names).toContain('Latin America')
    expect(names).toContain('Oceania')
  })
})

describe('incomeGroups data', () => {
  it('has 4 income groups', () => {
    expect(incomeGroups).toHaveLength(4)
  })

  it('income groups sum to 100 people', () => {
    const total = incomeGroups.reduce((sum, g) => sum + g.people, 0)
    expect(total).toBe(100)
  })

  it('each group has description', () => {
    incomeGroups.forEach(group => {
      expect(group.description).toBeDefined()
      expect(group.description.length).toBeGreaterThan(0)
    })
  })
})

describe('internetAccess data', () => {
  it('has 2 categories', () => {
    expect(internetAccess).toHaveLength(2)
  })

  it('sums to 100 people', () => {
    const total = internetAccess.reduce((sum, g) => sum + g.people, 0)
    expect(total).toBe(100)
  })

  it('has connected and offline', () => {
    const ids = internetAccess.map(i => i.id)
    expect(ids).toContain('connected')
    expect(ids).toContain('offline')
  })
})

describe('urbanRural data', () => {
  it('has 2 categories', () => {
    expect(urbanRural).toHaveLength(2)
  })

  it('sums to 100 people', () => {
    const total = urbanRural.reduce((sum, g) => sum + g.people, 0)
    expect(total).toBe(100)
  })
})

describe('ageGroups data', () => {
  it('has 3 age groups', () => {
    expect(ageGroups).toHaveLength(3)
  })

  it('sums to 100 people', () => {
    const total = ageGroups.reduce((sum, g) => sum + g.people, 0)
    expect(total).toBe(100)
  })

  it('covers all life stages', () => {
    const names = ageGroups.map(a => a.name)
    expect(names).toContain('0-14 years')
    expect(names).toContain('15-64 years')
    expect(names).toContain('65+ years')
  })
})

describe('viewModes', () => {
  it('has 5 view modes', () => {
    expect(viewModes).toHaveLength(5)
  })

  it('each mode has required fields', () => {
    viewModes.forEach(mode => {
      expect(mode).toHaveProperty('id')
      expect(mode).toHaveProperty('name')
      expect(mode).toHaveProperty('data')
      expect(mode).toHaveProperty('description')
      expect(Array.isArray(mode.data)).toBe(true)
    })
  })

  it('all modes have data that sums to 100', () => {
    viewModes.forEach(mode => {
      const total = mode.data.reduce((sum, g) => sum + g.people, 0)
      expect(total).toBe(100)
    })
  })

  it('includes all expected modes', () => {
    const ids = viewModes.map(m => m.id)
    expect(ids).toContain('region')
    expect(ids).toContain('income')
    expect(ids).toContain('internet')
    expect(ids).toContain('urban')
    expect(ids).toContain('age')
  })
})
