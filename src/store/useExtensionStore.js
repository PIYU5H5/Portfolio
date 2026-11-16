import { create } from 'zustand'
import { lofiAudio } from '../lib/lofiAudio.js'

export const EXTENSIONS_CATALOG = [
  {
    id: 'lofi-mode',
    name: 'Lofi Focus Mode',
    publisher: 'Piyush Jadhav',
    verified: true,
    version: 'v1.4.0',
    installs: '18.4k',
    rating: '5.0',
    icon: 'Headphones',
    tagline: 'Ambient procedural coding pads & rain synthesizer.',
    description:
      'Synthesizes soothing analog lofi chord drones and gentle brown-noise rain directly in the browser via the native Web Audio API. 100% offline, zero network downloads, and includes a live StatusBar audio widget.',
    category: 'Productivity',
  },
  {
    id: 'gitlens-mini',
    name: 'GitLens Mini',
    publisher: 'Piyush Jadhav',
    verified: true,
    version: 'v2.2.0',
    installs: '31.2k',
    rating: '4.9',
    icon: 'GitBranch',
    tagline: 'Inline Git blame annotations and commit history inside code files.',
    description:
      'Injects authentic VS Code-style GitLens blame annotations (author, commit age, and commit messages) into code files like Home.jsx and developer config files, complete with interactive commit tooltips.',
    category: 'Source Control',
  },
  {
    id: 'leetcode-tracker',
    name: 'LeetCode Solved HUD',
    publisher: 'Piyush Jadhav',
    verified: true,
    version: 'v3.0.1',
    installs: '24.1k',
    rating: '5.0',
    icon: 'Code',
    tagline: 'Interactive breakdown of 200+ solved algorithmic problems & topic mastery.',
    description:
      'Visual breakdown of Piyush Jadhav’s algorithmic benchmarks: 200+ solved problems categorized into Easy, Medium, and Hard tiers, alongside topic proficiencies (Trees, Graphs, DP, Arrays, Two Pointers).',
    category: 'Algorithms',
  },
]

const loadInitialInstalled = () => {
  try {
    const saved = localStorage.getItem('pj_installed_exts_v2')
    if (saved) return JSON.parse(saved)
  } catch {}
  return {}
}

export const useExtensionStore = create((set, get) => ({
  installed: loadInitialInstalled(),
  isLofiPlaying: false,
  lofiVolume: 0.4,
  searchQuery: '',
  activeTab: 'recommended', // 'installed' | 'recommended'

  setSearchQuery: (query) => set({ searchQuery: query }),
  setActiveTab: (tab) => set({ activeTab: tab }),

  toggleExtension: (id) => {
    const { installed } = get()
    const isCurrentlyInstalled = !!installed[id]
    const nextInstalled = { ...installed, [id]: !isCurrentlyInstalled }

    try {
      localStorage.setItem('pj_installed_exts_v2', JSON.stringify(nextInstalled))
    } catch {}

    set({ installed: nextInstalled })

    // Audio lifecycle side-effects
    if (id === 'lofi-mode') {
      if (!isCurrentlyInstalled) {
        const ok = lofiAudio.start()
        set({ isLofiPlaying: ok })
      } else {
        lofiAudio.stop()
        set({ isLofiPlaying: false })
      }
    }
  },

  toggleLofiPlayback: () => {
    const { isLofiPlaying } = get()
    if (!isLofiPlaying) {
      const ok = lofiAudio.start()
      set({ isLofiPlaying: ok })
    } else {
      lofiAudio.stop()
      set({ isLofiPlaying: false })
    }
  },

  setLofiVolume: (vol) => {
    lofiAudio.setVolume(vol)
    set({ lofiVolume: vol })
  },
}))
