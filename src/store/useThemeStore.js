import { create } from 'zustand'

const getInitialTheme = () => {
  try {
    const saved = localStorage.getItem('pj_theme')
    if (saved) return saved
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light-modern'
    }
  } catch {
    // ignore
  }
  return 'piyush-dark'
}

const getInitialMotion = () => {
  try {
    const saved = localStorage.getItem('pj_reduce_motion')
    if (saved !== null) return JSON.parse(saved)
  } catch {
    // ignore
  }
  return false
}

const getInitialMatrixUnlocked = () => {
  try {
    return localStorage.getItem('pj_matrix_unlocked') === 'true'
  } catch {
    return false
  }
}

const initialTheme = getInitialTheme()
if (typeof document !== 'undefined') {
  document.documentElement.setAttribute('data-theme', initialTheme)
}

export const useThemeStore = create((set) => ({
  currentTheme: initialTheme,
  fontSize: (typeof localStorage !== 'undefined' ? localStorage.getItem('pj_font_size') : null) || 'base',
  reduceMotion: getInitialMotion(),
  isMatrixUnlocked: getInitialMatrixUnlocked(),

  unlockMatrix: () => {
    try {
      localStorage.setItem('pj_matrix_unlocked', 'true')
    } catch {
      // ignore
    }
    set({ isMatrixUnlocked: true })
  },

  setTheme: (themeId) => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', themeId)
    }
    try {
      localStorage.setItem('pj_theme', themeId)
    } catch {
      // ignore
    }
    set({ currentTheme: themeId })
  },

  setFontSize: (size) => {
    try {
      localStorage.setItem('pj_font_size', size)
    } catch {
      // ignore
    }
    set({ fontSize: size })
  },

  toggleReduceMotion: () => {
    set((state) => {
      const next = !state.reduceMotion
      try {
        localStorage.setItem('pj_reduce_motion', JSON.stringify(next))
      } catch {
        // ignore
      }
      return { reduceMotion: next }
    })
  },
}))
