import React, { useEffect, useState, Suspense, lazy } from 'react'
import { TitleBar } from './TitleBar'
import { ActivityBar } from './ActivityBar'
import { Sidebar } from './Sidebar'
import { TabBar } from './TabBar'
import { EditorArea } from './EditorArea'
import { StatusBar } from './StatusBar'
import { ToastContainer } from '../ui/Toast'

import { useAppStore } from '../../store/useAppStore'
import { useHotkeys } from '../../hooks/useHotkeys'
import { useKonamiCode } from '../../hooks/useKonamiCode'
import type { FileId } from '../../data/files'
import { FILES } from '../../data/files'

// Lazy loaded panels
const Terminal = lazy(() => import('../panels/Terminal').then((m) => ({ default: m.Terminal })))
const CommandPalette = lazy(() => import('../panels/CommandPalette').then((m) => ({ default: m.CommandPalette })))
const SettingsModal = lazy(() => import('../panels/SettingsModal').then((m) => ({ default: m.SettingsModal })))
const GitBranchesModal = lazy(() => import('../panels/GitBranchesModal').then((m) => ({ default: m.GitBranchesModal })))
const ProjectDetailModal = lazy(() => import('../panels/ProjectDetailModal').then((m) => ({ default: m.ProjectDetailModal })))

export const AppLayout: React.FC = () => {
  const { isSidebarOpen, openFile } = useAppStore()
  useHotkeys()
  useKonamiCode()

  // Fake VS Code Boot splash screen (skippable, ~1.2s on first load)
  const [isBooting, setIsBooting] = useState(() => {
    try {
      return !sessionStorage.getItem('pj_has_booted')
    } catch {
      return false
    }
  })

  useEffect(() => {
    if (isBooting) {
      const timer = setTimeout(() => {
        setIsBooting(false)
        try {
          sessionStorage.setItem('pj_has_booted', 'true')
        } catch {
          // ignore
        }
      }, 1200)
      return () => clearTimeout(timer)
    }
  }, [isBooting])

  // Sync initial URL hash to active file tab
  useEffect(() => {
    const hash = window.location.hash.replace('#/', '').toLowerCase()
    if (hash) {
      const match = (Object.keys(FILES) as FileId[]).find(
        (f) => f.replace(/\.[^/.]+$/, '').toLowerCase() === hash
      )
      if (match) {
        openFile(match)
      }
    }
  }, [openFile])

  if (isBooting) {
    return (
      <div className="h-screen w-screen bg-[#070a0e] flex flex-col items-center justify-center space-y-4 font-mono text-xs select-none">
        <div className="w-16 h-16 rounded-2xl bg-[#0f141c] border border-[#21262d] flex items-center justify-center text-2xl font-bold text-[#2f81f7] shadow-2xl animate-pulse">
          PJ
        </div>
        <div className="text-slate-400">Loading Piyush Jadhav's Workspace...</div>
        <div className="w-48 h-1.5 rounded-full bg-[#131920] overflow-hidden">
          <div className="h-full bg-[#2f81f7] w-full animate-shimmer bg-[linear-gradient(90deg,transparent,#2f81f7,transparent)] bg-[length:200%_100%]" />
        </div>
      </div>
    )
  }

  return (
    <div className="h-[100dvh] w-screen overflow-hidden flex flex-col bg-bg text-text-main">
      {/* 1. Title bar */}
      <TitleBar />

      {/* 2. Middle Body: Activity Bar + Sidebar + Main Editor Column */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Activity Bar (far-left) */}
        <ActivityBar />

        {/* Sidebar (Explorer / Co-Pilot) */}
        {isSidebarOpen && <Sidebar />}

        {/* Main Editor & Terminal Area */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          <TabBar />
          <EditorArea />
          <Suspense fallback={null}>
            <Terminal />
          </Suspense>
        </div>
      </div>

      {/* 3. Status bar (bottom) */}
      <StatusBar />

      {/* Global Modals & Overlays (Code-split) */}
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
