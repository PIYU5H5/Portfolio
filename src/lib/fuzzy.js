export function fuzzyMatch(pattern, text) {
  const p = (pattern || '').trim().toLowerCase()
  const t = (text || '').toLowerCase()

  if (!p) {
    return { isMatch: true, score: 0, matchedIndices: [] }
  }

  let pIdx = 0
  let tIdx = 0
  let score = 0
  const matchedIndices = []
  let consecutiveBonus = 0

  while (pIdx < p.length && tIdx < t.length) {
    if (p[pIdx] === t[tIdx]) {
      matchedIndices.push(tIdx)

      if (tIdx === 0 || text[tIdx - 1] === ' ' || text[tIdx - 1] === '.' || text[tIdx - 1] === '-' || text[tIdx - 1] === '/') {
        score += 10
      }

      score += 5 + consecutiveBonus * 3
      consecutiveBonus++

      if (pattern[pIdx] === text[tIdx]) {
        score += 2
      }

      pIdx++
    } else {
      consecutiveBonus = 0
    }
    tIdx++
  }

  const isMatch = pIdx === p.length
  return { isMatch, score: isMatch ? score : -1, matchedIndices }
}

export function fuzzyFilter(items, query, getString) {
  if (!query || !query.trim()) {
    return items.map((item) => ({ item, score: 0, indices: [] }))
  }

  const results = []

  for (const item of items) {
    const text = getString(item)
    const match = fuzzyMatch(query, text)
    if (match.isMatch) {
      results.push({ item, score: match.score, indices: match.matchedIndices })
    }
  }

  return results.sort((a, b) => b.score - a.score)
}

