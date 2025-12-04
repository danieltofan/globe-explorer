import { describe, it, expect } from 'vitest'
import {
  languages,
  languageFamilies,
  getLanguage,
  getLanguagesByFamily,
  getFamilies,
  getDistance,
  getNearestNeighbors
} from './languages'

describe('languages data', () => {
  describe('languageFamilies', () => {
    it('has expected number of families', () => {
      const families = Object.keys(languageFamilies)
      expect(families.length).toBe(18)
    })

    it('each family has color and description', () => {
      Object.entries(languageFamilies).forEach(([name, data]) => {
        expect(data.color).toBeDefined()
        expect(data.color).toMatch(/^#[0-9a-f]{6}$/i)
        expect(data.description).toBeDefined()
        expect(typeof data.description).toBe('string')
      })
    })

    it('includes major language families', () => {
      expect(languageFamilies['Romance']).toBeDefined()
      expect(languageFamilies['Germanic']).toBeDefined()
      expect(languageFamilies['Slavic']).toBeDefined()
      expect(languageFamilies['Sino-Tibetan']).toBeDefined()
      expect(languageFamilies['Indo-Iranian']).toBeDefined()
    })
  })

  describe('languages array', () => {
    it('has languages', () => {
      expect(languages.length).toBeGreaterThan(70)
    })

    it('each language has required fields', () => {
      languages.forEach(lang => {
        expect(lang.code).toBeDefined()
        expect(lang.name).toBeDefined()
        expect(lang.family).toBeDefined()
        expect(typeof lang.speakers).toBe('number')
        expect(typeof lang.x).toBe('number')
        expect(typeof lang.y).toBe('number')
        expect(typeof lang.z).toBe('number')
      })
    })

    it('all language families exist in languageFamilies', () => {
      languages.forEach(lang => {
        expect(languageFamilies[lang.family]).toBeDefined()
      })
    })

    it('has unique language codes', () => {
      const codes = languages.map(l => l.code)
      const uniqueCodes = [...new Set(codes)]
      expect(codes.length).toBe(uniqueCodes.length)
    })

    it('includes major world languages', () => {
      const codes = languages.map(l => l.code)
      expect(codes).toContain('en') // English
      expect(codes).toContain('zh') // Mandarin
      expect(codes).toContain('es') // Spanish
      expect(codes).toContain('hi') // Hindi
      expect(codes).toContain('ar') // Arabic
    })

    it('speaker counts are reasonable', () => {
      languages.forEach(lang => {
        expect(lang.speakers).toBeGreaterThan(0)
        expect(lang.speakers).toBeLessThan(2000) // Max ~1.5B in millions
      })
    })
  })
})

describe('getLanguage', () => {
  it('returns language by code', () => {
    const english = getLanguage('en')
    expect(english).toBeDefined()
    expect(english.name).toBe('English')
    expect(english.family).toBe('Germanic')
  })

  it('returns undefined for unknown code', () => {
    expect(getLanguage('xyz')).toBeUndefined()
    expect(getLanguage('')).toBeUndefined()
  })

  it('is case-sensitive', () => {
    expect(getLanguage('EN')).toBeUndefined()
    expect(getLanguage('en')).toBeDefined()
  })
})

describe('getLanguagesByFamily', () => {
  it('returns all Romance languages', () => {
    const romance = getLanguagesByFamily('Romance')
    expect(romance.length).toBeGreaterThan(3)
    romance.forEach(lang => {
      expect(lang.family).toBe('Romance')
    })
  })

  it('returns all Germanic languages', () => {
    const germanic = getLanguagesByFamily('Germanic')
    expect(germanic.length).toBeGreaterThan(5)
    const names = germanic.map(l => l.name)
    expect(names).toContain('English')
    expect(names).toContain('German')
  })

  it('returns empty array for unknown family', () => {
    expect(getLanguagesByFamily('Unknown')).toEqual([])
  })
})

describe('getFamilies', () => {
  it('returns unique family names', () => {
    const families = getFamilies()
    const uniqueFamilies = [...new Set(families)]
    expect(families.length).toBe(uniqueFamilies.length)
  })

  it('includes all major families', () => {
    const families = getFamilies()
    expect(families).toContain('Romance')
    expect(families).toContain('Germanic')
    expect(families).toContain('Slavic')
    expect(families).toContain('Sino-Tibetan')
  })
})

describe('getDistance', () => {
  it('returns 0 for same position', () => {
    const lang = { x: 10, y: 20, z: 30 }
    expect(getDistance(lang, lang)).toBe(0)
  })

  it('calculates correct 3D distance', () => {
    const lang1 = { x: 0, y: 0, z: 0 }
    const lang2 = { x: 3, y: 4, z: 0 }
    expect(getDistance(lang1, lang2)).toBe(5) // 3-4-5 triangle
  })

  it('returns same distance regardless of order', () => {
    const english = getLanguage('en')
    const german = getLanguage('de')
    expect(getDistance(english, german)).toBe(getDistance(german, english))
  })

  it('returns positive distance for different languages', () => {
    const english = getLanguage('en')
    const chinese = getLanguage('zh')
    expect(getDistance(english, chinese)).toBeGreaterThan(0)
  })
})

describe('getNearestNeighbors', () => {
  it('returns n nearest neighbors', () => {
    const neighbors = getNearestNeighbors('en', 5)
    expect(neighbors.length).toBe(5)
  })

  it('excludes the source language', () => {
    const neighbors = getNearestNeighbors('en', 10)
    const codes = neighbors.map(n => n.code)
    expect(codes).not.toContain('en')
  })

  it('returns neighbors sorted by distance', () => {
    const neighbors = getNearestNeighbors('en', 5)
    for (let i = 1; i < neighbors.length; i++) {
      expect(neighbors[i].distance).toBeGreaterThanOrEqual(neighbors[i - 1].distance)
    }
  })

  it('includes distance property', () => {
    const neighbors = getNearestNeighbors('en', 3)
    neighbors.forEach(n => {
      expect(typeof n.distance).toBe('number')
      expect(n.distance).toBeGreaterThan(0)
    })
  })

  it('returns empty array for unknown language', () => {
    expect(getNearestNeighbors('xyz', 5)).toEqual([])
  })

  it('finds Germanic languages near English', () => {
    const neighbors = getNearestNeighbors('en', 3)
    const families = neighbors.map(n => n.family)
    // At least one neighbor should be Germanic (same family)
    expect(families).toContain('Germanic')
  })

  it('default n is 5', () => {
    const neighbors = getNearestNeighbors('es')
    expect(neighbors.length).toBe(5)
  })
})
