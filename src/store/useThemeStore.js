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
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return true
    }
  } catch {
    // ignore
  }
  return false
}

const initialTheme = getInitialTheme()
if (typeof document !== 'undefined') {
  document.documentElement.setAttribute('data-theme', initialTheme)
}

export const useThemeStore = create((set) => ({
  currentTheme: initialTheme,
  fontSize: (typeof localStorage !== 'undefined' ? localStorage.getItem('pj_font_size') : null) || 'base',
  reduceMotion: getInitialMotion(),
  showMinimap: typeof localStorage !== 'undefined' ? localStorage.getItem('pj_show_minimap') !== 'false' : true,

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

  toggleMinimap: () => {
    set((state) => {
      const next = !state.showMinimap
      try {
        localStorage.setItem('pj_show_minimap', JSON.stringify(next))
      } catch {
        // ignore
      }
      return { showMinimap: next }
    })
  },
}))
