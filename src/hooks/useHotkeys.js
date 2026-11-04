import { useEffect } from 'react'
import { useAppStore } from '../store/useAppStore.js'
import { useTerminalStore } from '../store/useTerminalStore.js'

export function useHotkeys() {
  const {
    openTabs,
    activeTab,
    openFile,
    closeTab,
    toggleSidebar,
    toggleCommandPalette,
    toggleSettings,
    isCommandPaletteOpen,
    isSettingsOpen,
    isGitBranchesOpen,
    selectedProjectDetailId,
    selectProjectDetail,
  } = useAppStore()

  const { toggleTerminal } = useTerminalStore()

  useEffect(() => {
    const handleKeyDown = (e) => {
      const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0
      const isModifier = isMac ? e.metaKey : e.ctrlKey

      if (e.key === 'Escape') {
        if (selectedProjectDetailId) {
          selectProjectDetail(null)
          return
        }
        if (isCommandPaletteOpen) {
          toggleCommandPalette(false)
          return
        }
        if (isSettingsOpen) {
          toggleSettings(false)
          return
        }
        if (isGitBranchesOpen) {
          useAppStore.getState().toggleGitBranches(false)
          return
        }
      }

      if (isModifier && e.key.toLowerCase() === 'p' && !e.shiftKey) {
        e.preventDefault()
        toggleCommandPalette(true)
        return
      }

      if ((isModifier && e.shiftKey && e.key.toLowerCase() === 'p') || (isModifier && e.key.toLowerCase() === 'k')) {
        e.preventDefault()
        toggleCommandPalette(true)
        return
      }

      if (isModifier && (e.key === '`' || e.key === '~')) {
        e.preventDefault()
        toggleTerminal()
        return
      }

      if (isModifier && e.key.toLowerCase() === 'b') {
        e.preventDefault()
        toggleSidebar()
        return
      }

      if (isModifier && e.key.toLowerCase() === 'w') {
        e.preventDefault()
        if (activeTab) {
          closeTab(activeTab)
        }
        return
      }

      if (isModifier && e.key === ',') {
        e.preventDefault()
        toggleSettings()
        return
      }

      if (e.altKey && !isNaN(Number(e.key))) {
        const num = Number(e.key)
        if (num >= 1 && num <= openTabs.length) {
          e.preventDefault()
          useAppStore.getState().setActiveTab(openTabs[num - 1])
        }
      }

      if (e.ctrlKey && e.key === 'Tab') {
        e.preventDefault()
        if (openTabs.length > 1) {
          const currentIndex = activeTab ? openTabs.indexOf(activeTab) : -1
          if (e.shiftKey) {
            const prevIndex = (currentIndex - 1 + openTabs.length) % openTabs.length
            useAppStore.getState().setActiveTab(openTabs[prevIndex])
          } else {
            const nextIndex = (currentIndex + 1) % openTabs.length
            useAppStore.getState().setActiveTab(openTabs[nextIndex])
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [
    openTabs,
    activeTab,
    isCommandPaletteOpen,
    isSettingsOpen,
    isGitBranchesOpen,
    selectedProjectDetailId,
    openFile,
    closeTab,
    toggleSidebar,
    toggleCommandPalette,
    toggleSettings,
    toggleTerminal,
    selectProjectDetail,
  ])
}
