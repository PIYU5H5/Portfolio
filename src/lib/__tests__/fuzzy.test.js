import { describe, it, expect } from 'vitest'
import { fuzzyMatch, fuzzyFilter } from '../fuzzy.js'

describe('Fuzzy Search Matching', () => {
  it('matches exact strings', () => {
    const res = fuzzyMatch('project', 'Projects.js')
    expect(res.isMatch).toBe(true)
    expect(res.score).toBeGreaterThan(0)
  })

  it('matches acronyms or substrings in sequence', () => {
    const res = fuzzyMatch('pj', 'Projects.js')
    expect(res.isMatch).toBe(true)
  })

  it('rejects out of order character patterns', () => {
    const res = fuzzyMatch('zp', 'Projects.js')
    expect(res.isMatch).toBe(false)
  })

  it('filters and ranks items with higher scores first', () => {
    const files = ['Home.jsx', 'Projects.js', 'About.jsx', 'Contact.jsx']
    const results = fuzzyFilter(files, 'pro', (f) => f)
    expect(results.length).toBeGreaterThan(0)
    expect(results[0].item).toBe('Projects.js')
  })
})
