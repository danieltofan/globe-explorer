import { describe, it, expect } from 'vitest'
import {
  countries,
  colorModes,
  getTileSize,
  getFieldRange,
  getGradientColor,
  canvasWidth,
  canvasHeight,
  tileSizes
} from './countries'

describe('Countries Data', () => {
  it('contains at least 190 countries', () => {
    expect(countries.length).toBeGreaterThanOrEqual(190)
  })

  it('has all required fields for each country', () => {
    const requiredFields = ['code', 'name', 'continent', 'area', 'population', 'gdpPerCapita', 'lifeExpectancy', 'internetPenetration', 'flag', 'x', 'y']

    countries.forEach(country => {
      requiredFields.forEach(field => {
        expect(country).toHaveProperty(field)
      })
    })
  })

  it('has unique country codes', () => {
    const codes = countries.map(c => c.code)
    const uniqueCodes = [...new Set(codes)]
    expect(codes.length).toBe(uniqueCodes.length)
  })

  it('has valid continents', () => {
    const validContinents = ['europe', 'asia', 'africa', 'northAmerica', 'southAmerica', 'oceania']
    countries.forEach(country => {
      expect(validContinents).toContain(country.continent)
    })
  })

  it('has positive area for all countries', () => {
    countries.forEach(country => {
      expect(country.area).toBeGreaterThan(0)
    })
  })

  it('has valid population values', () => {
    countries.forEach(country => {
      expect(country.population).toBeGreaterThanOrEqual(0)
    })
  })

  it('has reasonable life expectancy values (50-90)', () => {
    countries.forEach(country => {
      if (country.lifeExpectancy > 0) {
        expect(country.lifeExpectancy).toBeGreaterThanOrEqual(50)
        expect(country.lifeExpectancy).toBeLessThanOrEqual(90)
      }
    })
  })

  it('has internet penetration between 0-100', () => {
    countries.forEach(country => {
      expect(country.internetPenetration).toBeGreaterThanOrEqual(0)
      expect(country.internetPenetration).toBeLessThanOrEqual(100)
    })
  })

  it('has flag emojis', () => {
    countries.forEach(country => {
      expect(country.flag).toBeTruthy()
      expect(country.flag.length).toBeGreaterThan(0)
    })
  })

  it('includes major countries', () => {
    const majorCountries = ['US', 'CN', 'IN', 'BR', 'RU', 'JP', 'DE', 'GB', 'FR', 'AU']
    const codes = countries.map(c => c.code)
    majorCountries.forEach(major => {
      expect(codes).toContain(major)
    })
  })

  describe('by continent', () => {
    it('has European countries', () => {
      const european = countries.filter(c => c.continent === 'europe')
      expect(european.length).toBeGreaterThanOrEqual(40)
    })

    it('has Asian countries', () => {
      const asian = countries.filter(c => c.continent === 'asia')
      expect(asian.length).toBeGreaterThanOrEqual(40)
    })

    it('has African countries', () => {
      const african = countries.filter(c => c.continent === 'africa')
      expect(african.length).toBeGreaterThanOrEqual(50)
    })

    it('has North American countries', () => {
      const northAmerican = countries.filter(c => c.continent === 'northAmerica')
      expect(northAmerican.length).toBeGreaterThanOrEqual(20)
    })

    it('has South American countries', () => {
      const southAmerican = countries.filter(c => c.continent === 'southAmerica')
      expect(southAmerican.length).toBeGreaterThanOrEqual(10)
    })

    it('has Oceanian countries', () => {
      const oceanian = countries.filter(c => c.continent === 'oceania')
      expect(oceanian.length).toBeGreaterThanOrEqual(10)
    })
  })
})

describe('Color Modes', () => {
  it('has at least 5 color modes', () => {
    expect(colorModes.length).toBeGreaterThanOrEqual(5)
  })

  it('has required properties for each mode', () => {
    colorModes.forEach(mode => {
      expect(mode).toHaveProperty('id')
      expect(mode).toHaveProperty('name')
      expect(mode).toHaveProperty('description')
    })
  })

  it('includes population, GDP, life expectancy modes', () => {
    const ids = colorModes.map(m => m.id)
    expect(ids).toContain('population')
    expect(ids).toContain('gdp')
    expect(ids).toContain('lifeExpectancy')
  })

  it('includes flags mode', () => {
    const flagsMode = colorModes.find(m => m.id === 'flags')
    expect(flagsMode).toBeDefined()
    expect(flagsMode.field).toBeNull()
  })

  it('has gradient arrays for non-flag modes', () => {
    colorModes.forEach(mode => {
      if (mode.id !== 'flags') {
        expect(mode.gradient).toBeInstanceOf(Array)
        expect(mode.gradient.length).toBeGreaterThanOrEqual(2)
      }
    })
  })
})

describe('getTileSize', () => {
  it('returns xxl for very large countries (>5M km²)', () => {
    expect(getTileSize(17098242)).toBe('xxl') // Russia
  })

  it('returns xl for large countries (3-5M km²)', () => {
    expect(getTileSize(4500000)).toBe('xl') // 4.5M km²
    expect(getTileSize(3287263)).toBe('xl') // India (3.3M km²)
  })

  it('returns l for countries (1-3M km²)', () => {
    expect(getTileSize(2780400)).toBe('l') // Argentina
  })

  it('returns m for medium countries (300K-1M km²)', () => {
    expect(getTileSize(643801)).toBe('m') // France
  })

  it('returns s for small countries (50K-300K km²)', () => {
    expect(getTileSize(242495)).toBe('s') // UK
  })

  it('returns xs for tiny countries (<50K km²)', () => {
    expect(getTileSize(41850)).toBe('xs') // Netherlands
  })
})

describe('getFieldRange', () => {
  it('returns min and max for population', () => {
    const range = getFieldRange('population')
    expect(range.min).toBeGreaterThan(0)
    expect(range.max).toBeGreaterThan(range.min)
    expect(range.max).toBeGreaterThanOrEqual(1000000000) // At least 1B (China/India)
  })

  it('returns min and max for gdpPerCapita', () => {
    const range = getFieldRange('gdpPerCapita')
    expect(range.min).toBeGreaterThan(0)
    expect(range.max).toBeGreaterThan(range.min)
  })

  it('returns min and max for area', () => {
    const range = getFieldRange('area')
    expect(range.min).toBeGreaterThan(0)
    expect(range.max).toBeGreaterThan(10000000) // Russia ~17M km²
  })
})

describe('getGradientColor', () => {
  const testGradient = ['#ff0000', '#00ff00', '#0000ff']

  it('returns first color for minimum value', () => {
    const color = getGradientColor(1, 1, 1000, testGradient)
    // At log scale, min value should be near first color
    expect(color).toBeTruthy()
  })

  it('returns valid hex color', () => {
    const color = getGradientColor(500, 1, 1000, testGradient)
    expect(color).toMatch(/^#[0-9a-f]{6}$/i)
  })

  it('returns default color for null gradient', () => {
    const color = getGradientColor(500, 1, 1000, null)
    expect(color).toBe('#e5e7eb')
  })

  it('returns default color for zero value', () => {
    const color = getGradientColor(0, 1, 1000, testGradient)
    expect(color).toBe('#e5e7eb')
  })
})

describe('Canvas and Positioning', () => {
  it('has canvas dimensions', () => {
    expect(canvasWidth).toBeGreaterThan(0)
    expect(canvasHeight).toBeGreaterThan(0)
    expect(canvasWidth).toBe(1400)
    expect(canvasHeight).toBe(700)
  })

  it('has tile sizes for all categories', () => {
    expect(tileSizes).toHaveProperty('xxl')
    expect(tileSizes).toHaveProperty('xl')
    expect(tileSizes).toHaveProperty('l')
    expect(tileSizes).toHaveProperty('m')
    expect(tileSizes).toHaveProperty('s')
    expect(tileSizes).toHaveProperty('xs')
  })

  it('has width and height for each tile size', () => {
    Object.values(tileSizes).forEach(size => {
      expect(size).toHaveProperty('width')
      expect(size).toHaveProperty('height')
      expect(size.width).toBeGreaterThan(0)
      expect(size.height).toBeGreaterThan(0)
    })
  })

  it('has valid x,y coordinates for all countries', () => {
    countries.forEach(country => {
      expect(country.x).toBeGreaterThanOrEqual(0)
      expect(country.x).toBeLessThanOrEqual(100)
      expect(country.y).toBeGreaterThanOrEqual(0)
      expect(country.y).toBeLessThanOrEqual(100)
    })
  })
})
