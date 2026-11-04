import { useEffect } from 'react'
import { useAppStore } from '../store/useAppStore'
import { useTerminalStore } from '../store/useTerminalStore'

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
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
      const isModifier = isMac ? e.metaKey : e.ctrlKey

      // Escape closes open overlays
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

      // 1. Ctrl/Cmd + P -> Quick Open File
      if (isModifier && e.key.toLowerCase() === 'p' && !e.shiftKey) {
        e.preventDefault()
        toggleCommandPalette(true)
        return
      }

      // 2. Ctrl/Cmd + Shift + P or Ctrl/Cmd + K -> Command Palette
      if ((isModifier && e.shiftKey && e.key.toLowerCase() === 'p') || (isModifier && e.key.toLowerCase() === 'k')) {
        e.preventDefault()
        toggleCommandPalette(true)
        return
      }

      // 3. Ctrl/Cmd + ` -> Toggle Terminal
      if (isModifier && (e.key === '`' || e.key === '~')) {
        e.preventDefault()
        toggleTerminal()
        return
      }

      // 4. Ctrl/Cmd + B -> Toggle Sidebar
      if (isModifier && e.key.toLowerCase() === 'b') {
        e.preventDefault()
        toggleSidebar()
        return
      }

      // 5. Ctrl/Cmd + W -> Close Active Tab
      if (isModifier && e.key.toLowerCase() === 'w') {
        e.preventDefault()
        if (activeTab) {
          closeTab(activeTab)
        }
        return
      }

      // 6. Ctrl/Cmd + , -> Settings
      if (isModifier && e.key === ',') {
        e.preventDefault()
        toggleSettings()
        return
      }

      // 7. Alt + 1..8 -> Jump to open tab
      if (e.altKey && !isNaN(Number(e.key))) {
        const num = Number(e.key)
        if (num >= 1 && num <= openTabs.length) {
          e.preventDefault()
          useAppStore.getState().setActiveTab(openTabs[num - 1])
        }
      }

      // 8. Ctrl + Tab -> Cycle Next Tab
      if (e.ctrlKey && e.key === 'Tab') {
        e.preventDefault()
        if (openTabs.length > 1) {
          const currentIndex = activeTab ? openTabs.indexOf(activeTab) : -1
          if (e.shiftKey) {
            // Previous tab
            const prevIndex = (currentIndex - 1 + openTabs.length) % openTabs.length
            useAppStore.getState().setActiveTab(openTabs[prevIndex])
          } else {
            // Next tab
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
