import { useEffect, useState, Suspense, lazy } from 'react'
import { TitleBar } from './TitleBar.jsx'
import { ActivityBar } from './ActivityBar.jsx'
import { Sidebar } from './Sidebar.jsx'
import { TabBar } from './TabBar.jsx'
import { EditorArea } from './EditorArea.jsx'
import { StatusBar } from './StatusBar.jsx'
import { TerminalBootScreen } from './TerminalBootScreen.jsx'
import { ToastContainer } from '../ui/Toast.jsx'

import { useAppStore } from '../../store/useAppStore.js'
import { useHotkeys } from '../../hooks/useHotkeys.js'
import { useKonamiCode } from '../../hooks/useKonamiCode.js'
import { useAnimatedFavicon } from '../../hooks/useAnimatedFavicon.js'
import { FILES } from '../../data/files.js'

const Terminal = lazy(() => import('../panels/Terminal.jsx').then((m) => ({ default: m.Terminal })))
const CommandPalette = lazy(() => import('../panels/CommandPalette.jsx').then((m) => ({ default: m.CommandPalette })))
const SettingsModal = lazy(() => import('../panels/SettingsModal.jsx').then((m) => ({ default: m.SettingsModal })))
const GitBranchesModal = lazy(() => import('../panels/GitBranchesModal.jsx').then((m) => ({ default: m.GitBranchesModal })))
const ProjectDetailModal = lazy(() => import('../panels/ProjectDetailModal.jsx').then((m) => ({ default: m.ProjectDetailModal })))

export const AppLayout = () => {
  const { isSidebarOpen, openFile } = useAppStore()
  useHotkeys()
  useKonamiCode()
  useAnimatedFavicon()

  const [isBooting, setIsBooting] = useState(() => {
    try {
      return !sessionStorage.getItem('pj_has_booted')
    } catch {
      return false
    }
  })

  const handleBootComplete = () => {
    setIsBooting(false)
    try {
      sessionStorage.setItem('pj_has_booted', 'true')
    } catch {
      // ignore
    }
  }

  useEffect(() => {
    const hash = window.location.hash.replace('#/', '').toLowerCase()
    if (hash) {
      const match = Object.keys(FILES).find(
        (f) => f.replace(/\.[^/.]+$/, '').toLowerCase() === hash
      )
      if (match) {
        openFile(match)
      }
    }
  }, [openFile])

  if (isBooting) {
    return <TerminalBootScreen onComplete={handleBootComplete} />
  }

  return (
    <div className="h-[100dvh] w-screen overflow-hidden flex flex-col bg-bg text-text-main">
      <TitleBar />

      <div className="flex-1 flex overflow-hidden relative">
        <ActivityBar />

        {isSidebarOpen && <Sidebar />}

        <div className="flex-1 flex flex-col overflow-hidden relative">
          <TabBar />
          <EditorArea />
          <Suspense fallback={null}>
            <Terminal />
          </Suspense>
        </div>
      </div>

      <StatusBar />

      <Suspense fallback={null}>
        <CommandPalette />
        <SettingsModal />
        <GitBranchesModal />
        <ProjectDetailModal />
      </Suspense>

      <ToastContainer />
    </div>
  )
}

