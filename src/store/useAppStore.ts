import { create } from 'zustand'
import type { FileId } from '../data/files'
import { FILES, INITIAL_TABS, DEFAULT_ACTIVE_TAB } from '../data/files'

interface AppState {
  openTabs: FileId[]
  activeTab: FileId | null
  isSidebarOpen: boolean
  sidebarWidth: number
  activeActivityView: 'explorer' | 'terminal' | 'copilot' | 'settings'
  isCopilotOpen: boolean
  isCommandPaletteOpen: boolean
  isSettingsOpen: boolean
  isGitBranchesOpen: boolean
  selectedProjectDetailId: string | null
  tabsOpenedHistory: Set<FileId>
  isSecretsUnlocked: boolean
  logoClickCount: number
  isDevLogUnlocked: boolean
  hasWarningTriggered: boolean

  // Actions
  openFile: (fileId: FileId) => void
  closeTab: (fileId: FileId) => void
  closeOtherTabs: (fileId: FileId) => void
  closeAllTabs: () => void
  reorderTabs: (newTabs: FileId[]) => void
  setActiveTab: (fileId: FileId | null) => void
  toggleSidebar: () => void
  setSidebarWidth: (width: number) => void
  setActiveActivityView: (view: 'explorer' | 'terminal' | 'copilot' | 'settings') => void
  toggleCopilot: (open?: boolean) => void
  toggleCommandPalette: (open?: boolean) => void
  toggleSettings: (open?: boolean) => void
  toggleGitBranches: (open?: boolean) => void
  selectProjectDetail: (projectId: string | null) => void
  incrementLogoClicks: () => void
  triggerWarning: () => void
}

// Read initial tabs from localStorage if available
const loadSavedTabs = (): { tabs: FileId[]; active: FileId | null } => {
  try {
    const saved = localStorage.getItem('pj_open_tabs')
    const savedActive = localStorage.getItem('pj_active_tab') as FileId | null
    if (saved) {
      const parsed = JSON.parse(saved) as FileId[]
      const valid = parsed.filter((id) => id in FILES)
      if (valid.length > 0) {
        return {
          tabs: valid,
          active: savedActive && savedActive in FILES ? savedActive : valid[0],
        }
      }
    }
  } catch {
    // ignore
  }
  return { tabs: INITIAL_TABS, active: DEFAULT_ACTIVE_TAB }
}

const initial = loadSavedTabs()

export const useAppStore = create<AppState>((set, get) => ({
  openTabs: initial.tabs,
  activeTab: initial.active,
  isSidebarOpen: true,
  sidebarWidth: 260,
  activeActivityView: 'explorer',
  isCopilotOpen: false,
  isCommandPaletteOpen: false,
  isSettingsOpen: false,
  isGitBranchesOpen: false,
  selectedProjectDetailId: null,
  tabsOpenedHistory: new Set<FileId>(initial.tabs),
  isSecretsUnlocked: false,
  logoClickCount: 0,
  isDevLogUnlocked: false,
  hasWarningTriggered: false,

  openFile: (fileId: FileId) => {
    const { openTabs, tabsOpenedHistory } = get()
    const newTabs = openTabs.includes(fileId) ? openTabs : [...openTabs, fileId]
    const updatedHistory = new Set(tabsOpenedHistory).add(fileId)

    // Check if user has explored 5 tabs -> unlocks secrets.txt
    const isSecretsUnlocked = updatedHistory.size >= 5

    // Sync URL hash
    window.location.hash = `#/${fileId.replace(/\.[^/.]+$/, '').toLowerCase()}`

    try {
      localStorage.setItem('pj_open_tabs', JSON.stringify(newTabs))
      localStorage.setItem('pj_active_tab', fileId)
    } catch {
      // ignore
    }

    set({
      openTabs: newTabs,
      activeTab: fileId,
      tabsOpenedHistory: updatedHistory,
      isSecretsUnlocked,
    })
  },

  closeTab: (fileId: FileId) => {
    const { openTabs, activeTab } = get()
    const index = openTabs.indexOf(fileId)
    if (index === -1) return

    const newTabs = openTabs.filter((id) => id !== fileId)
    let newActive = activeTab

    if (activeTab === fileId) {
      if (newTabs.length === 0) {
        newActive = null
        window.location.hash = '#/'
      } else if (index < newTabs.length) {
        newActive = newTabs[index]
        window.location.hash = `#/${newActive.replace(/\.[^/.]+$/, '').toLowerCase()}`
      } else {
        newActive = newTabs[newTabs.length - 1]
        window.location.hash = `#/${newActive.replace(/\.[^/.]+$/, '').toLowerCase()}`
      }
    }

    try {
      localStorage.setItem('pj_open_tabs', JSON.stringify(newTabs))
      if (newActive) localStorage.setItem('pj_active_tab', newActive)
      else localStorage.removeItem('pj_active_tab')
    } catch {
      // ignore
    }

    set({ openTabs: newTabs, activeTab: newActive })
  },

  closeOtherTabs: (fileId: FileId) => {
    try {
      localStorage.setItem('pj_open_tabs', JSON.stringify([fileId]))
      localStorage.setItem('pj_active_tab', fileId)
    } catch {
      // ignore
    }
    set({
      openTabs: [fileId],
      activeTab: fileId,
    })
    window.location.hash = `#/${fileId.replace(/\.[^/.]+$/, '').toLowerCase()}`
  },

  closeAllTabs: () => {
    try {
      localStorage.setItem('pj_open_tabs', JSON.stringify([]))
      localStorage.removeItem('pj_active_tab')
    } catch {
      // ignore
    }
    set({
      openTabs: [],
      activeTab: null,
    })
    window.location.hash = '#/'
  },

  reorderTabs: (newTabs: FileId[]) => {
    try {
      localStorage.setItem('pj_open_tabs', JSON.stringify(newTabs))
    } catch {
      // ignore
    }
    set({ openTabs: newTabs })
  },

  setActiveTab: (fileId: FileId | null) => {
    if (fileId) {
      window.location.hash = `#/${fileId.replace(/\.[^/.]+$/, '').toLowerCase()}`
      try {
        localStorage.setItem('pj_active_tab', fileId)
      } catch {
        // ignore
      }
    }
    set({ activeTab: fileId })
  },

  toggleSidebar: () => {
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen }))
  },

  setSidebarWidth: (width: number) => {
    const clamped = Math.max(180, Math.min(460, width))
    set({ sidebarWidth: clamped })
  },

  setActiveActivityView: (view) => {
    set((state) => {
      // If clicking already active view, toggle sidebar
      if (state.activeActivityView === view && state.isSidebarOpen) {
        return { isSidebarOpen: false }
      }
      return { activeActivityView: view, isSidebarOpen: true }
    })
  },

  toggleCopilot: (open?: boolean) => {
    set((state) => ({
      isCopilotOpen: open !== undefined ? open : !state.isCopilotOpen,
    }))
  },

  toggleCommandPalette: (open?: boolean) => {
    set((state) => ({
      isCommandPaletteOpen: open !== undefined ? open : !state.isCommandPaletteOpen,
    }))
  },

  toggleSettings: (open?: boolean) => {
    set((state) => ({
      isSettingsOpen: open !== undefined ? open : !state.isSettingsOpen,
    }))
  },

  toggleGitBranches: (open?: boolean) => {
    set((state) => ({
      isGitBranchesOpen: open !== undefined ? open : !state.isGitBranchesOpen,
    }))
  },

  selectProjectDetail: (projectId: string | null) => {
    set({ selectedProjectDetailId: projectId })
  },

  incrementLogoClicks: () => {
    const { logoClickCount, openTabs } = get()
    const nextCount = logoClickCount + 1
    if (nextCount >= 5) {
      // Unlock dev-log.md
      const newTabs: FileId[] = openTabs.includes('dev-log.md') ? openTabs : [...openTabs, 'dev-log.md']
      set({
        logoClickCount: 0,
        isDevLogUnlocked: true,
        openTabs: newTabs,
        activeTab: 'dev-log.md',
      })
    } else {
      set({ logoClickCount: nextCount })
    }
  },

  triggerWarning: () => {
    set({ hasWarningTriggered: true })
  },
}))
