import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  Code2,
  BarChart3,
  AppWindow,
  ChevronDown,
  ChevronRight,
  RotateCcw,
  LayoutGrid,
  Layers,
  Plus,
  Sparkles,
} from 'lucide-react'
import { SKILLS_DATA, SKILL_CATEGORIES_METADATA } from '../../data/skills.js'
import { SkillWindow } from './SkillWindow.jsx'

const FILENAME_MAP = {
  core_stack: 'core-stack.json',
  languages: 'languages.json',
  frontend: 'frontend.tsx',
  backend_and_databases: 'backend.sql',
  ai_and_automation: 'ai-pipelines.py',
  tools_and_cloud: 'devops.yaml',
  problem_solving: 'algorithms.cpp',
}

const ESTIMATED_HEIGHTS = {
  core_stack: 330,
  languages: 330,
  frontend: 400,
  backend_and_databases: 400,
  ai_and_automation: 400,
  tools_and_cloud: 430,
  problem_solving: 220,
}

export const SkillsFile = () => {
  const [viewMode, setViewMode] = useState('chart')
  const [collapsedGroups, setCollapsedGroups] = useState({})
  const [activeWindowId, setActiveWindowId] = useState('core_stack')
  const zIndexCounter = useRef(20)
  const containerRef = useRef(null)

  const computeTiledLayout = useCallback((containerWidth = 1050) => {
    const isLarge = containerWidth >= 1050
    const isMedium = containerWidth >= 680 && containerWidth < 1050

    const colCount = isLarge ? 3 : isMedium ? 2 : 1
    const gap = 16
    const margin = 12
    const colWidth = Math.max(280, Math.floor((containerWidth - margin * 2 - (colCount - 1) * gap) / colCount))

    const colAssignment3 = [
      ['core_stack', 'frontend', 'problem_solving'],
      ['backend_and_databases', 'ai_and_automation'],
      ['languages', 'tools_and_cloud'],
    ]

    const colAssignment2 = [
      ['core_stack', 'frontend', 'ai_and_automation'],
      ['backend_and_databases', 'languages', 'tools_and_cloud', 'problem_solving'],
    ]

    const colAssignment = isLarge
      ? colAssignment3
      : isMedium
      ? colAssignment2
      : [SKILL_CATEGORIES_METADATA.map((c) => c.key)]

    const windowsMap = {}
    colAssignment.forEach((colKeys, colIdx) => {
      let currentY = margin
      const currentX = margin + colIdx * (colWidth + gap)

      colKeys.forEach((key) => {
        const cat = SKILL_CATEGORIES_METADATA.find((c) => c.key === key)
        if (!cat) return

        const wHeight = ESTIMATED_HEIGHTS[key] || 330
        windowsMap[key] = {
          id: key,
          categoryKey: key,
          title: cat.name,
          filename: FILENAME_MAP[key] || `${key}.json`,
          x: currentX,
          y: currentY,
          width: colWidth,
          height: wHeight,
          isMinimized: false,
          isMaximized: false,
          isClosed: false,
          zIndex: 10,
          skills: cat.skills,
        }

        currentY += wHeight + gap
      })
    })

    return Object.values(windowsMap)
  }, [])

  const [windows, setWindows] = useState(() => computeTiledLayout(1050))

  // Re-adjust window positions on container resize
  useEffect(() => {
    if (!containerRef.current) return

    const handleResize = () => {
      if (!containerRef.current) return
      const currentW = containerRef.current.clientWidth
      if (currentW > 0) {
        setWindows((prev) =>
          prev.map((win) => {
            const maxX = Math.max(0, currentW - win.width)
            return {
              ...win,
              x: Math.min(win.x, maxX),
            }
          })
        )
      }
    }

    const observer = new ResizeObserver(handleResize)
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  // Window interactions
  const handleFocusWindow = (id) => {
    zIndexCounter.current += 1
    setActiveWindowId(id)
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: zIndexCounter.current } : w))
    )
  }

  const handleUpdateWindow = (id, updates) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, ...updates } : w))
    )
  }

  const handleCloseWindow = (id) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isClosed: true } : w))
    )
  }

  const handleRestoreWindow = (id) => {
    zIndexCounter.current += 1
    setActiveWindowId(id)
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id
          ? { ...w, isClosed: false, isMinimized: false, zIndex: zIndexCounter.current }
          : w
      )
    )
  }

  const handleToggleMinimize = (id) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, isMinimized: !w.isMinimized, isMaximized: false } : w
      )
    )
  }

  const handleToggleMaximize = (id) => {
    setWindows((prev) =>
      prev.map((w) => {
        if (w.id !== id) return w
        return {
          ...w,
          isMaximized: !w.isMaximized,
          isMinimized: false,
          zIndex: !w.isMaximized ? 999 : w.zIndex,
        }
      })
    )
  }

  const handleTileWindows = () => {
    const containerW = containerRef.current ? containerRef.current.clientWidth : 1050
    const tiled = computeTiledLayout(containerW)
    setWindows(tiled)
  }

  const handleCascadeWindows = () => {
    setWindows((prev) => {
      const activeWindows = prev.filter((w) => !w.isClosed)
      let idx = 0
      return prev.map((w) => {
        if (w.isClosed) return w
        const newX = 24 + idx * 36
        const newY = 24 + idx * 36
        idx++
        return {
          ...w,
          x: newX,
          y: newY,
          width: 380,
          height: ESTIMATED_HEIGHTS[w.categoryKey] || 340,
          isMinimized: false,
          isMaximized: false,
          zIndex: 10 + idx,
        }
      })
    })
  }

  const handleResetLayout = () => {
    const containerW = containerRef.current ? containerRef.current.clientWidth : 1050
    const fresh = computeTiledLayout(containerW)
    setWindows(fresh)
  }

  const toggleGroup = (key) => {
    setCollapsedGroups((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const jsonKeys = Object.keys(SKILLS_DATA)
  const closedWindows = windows.filter((w) => w.isClosed)

  // Calculate dynamic canvas height based on furthest window position
  const maxCanvasY = Math.max(
    ...windows
      .filter((w) => !w.isClosed)
      .map((w) => (w.y || 0) + (w.isMinimized ? 44 : (w.height || 330))),
    900
  )

  return (
    <div className="w-full max-w-7xl mx-auto py-6 px-3 sm:px-6 space-y-6 font-mono text-xs">
      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b border-border select-none">
        <div>
          <div className="text-syntax-comment flex items-center gap-1.5 text-xs">
            <Sparkles size={13} className="text-accent" />
            <span>
              {viewMode === 'chart'
                ? '// Technical proficiencies, strengths & frameworks'
                : viewMode === 'windows'
                ? '// Interactive desktop windows workspace • Drag to move, corner to resize'
                : '// Raw JSON data tree with collapsible groups'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-sans text-text-main pt-0.5">
            Skills & <span className="text-accent">Technologies</span>
          </h1>
        </div>

        {/* View Mode Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-bg-elevated border border-border self-start lg:self-auto shadow-sm">
          <button
            onClick={() => setViewMode('chart')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors ${
              viewMode === 'chart'
                ? 'bg-accent text-white font-semibold shadow-xs'
                : 'text-text-muted hover:text-text-main hover:bg-bg/60'
            }`}
          >
            <BarChart3 size={13} />
            <span>Proficiency View</span>
          </button>
          <button
            onClick={() => setViewMode('windows')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors ${
              viewMode === 'windows'
                ? 'bg-accent text-white font-semibold shadow-xs'
                : 'text-text-muted hover:text-text-main hover:bg-bg/60'
            }`}
          >
            <AppWindow size={13} />
            <span>Interactive Windows</span>
          </button>
          <button
            onClick={() => setViewMode('code')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors ${
              viewMode === 'code'
                ? 'bg-accent text-white font-semibold shadow-xs'
                : 'text-text-muted hover:text-text-main hover:bg-bg/60'
            }`}
          >
            <Code2 size={13} />
            <span>JSON Code</span>
          </button>
        </div>
      </div>

      {/* ================= VIEW: INTERACTIVE WINDOWS ================= */}
      {viewMode === 'windows' && (
        <div className="space-y-3">
          {/* Controls & Quick Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={handleTileWindows}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-elevated border border-border hover:border-accent/40 text-text-main transition-colors shadow-xs"
                title="Arrange windows into neat multi-column grid"
              >
                <LayoutGrid size={13} className="text-accent" />
                <span>Tile Grid</span>
              </button>
              <button
                onClick={handleCascadeWindows}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-elevated border border-border hover:border-accent/40 text-text-main transition-colors shadow-xs"
                title="Cascade windows diagonally"
              >
                <Layers size={13} className="text-accent" />
                <span>Cascade</span>
              </button>
              <button
                onClick={handleResetLayout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-elevated border border-border hover:border-accent/40 text-text-main transition-colors shadow-xs"
                title="Reset all positions, sizes, and states"
              >
                <RotateCcw size={13} className="text-accent" />
                <span>Reset Layout</span>
              </button>
            </div>

            {/* Instruction badge */}
            <div className="text-[11px] text-text-muted bg-bg-elevated/50 px-3 py-1.5 rounded-lg border border-border/70 hidden sm:flex items-center gap-1.5">
              <span>💡 Drag header to move • Drag bottom-right corner ↘ to resize • Yellow dot to minimize</span>
            </div>
          </div>

          {/* Closed Windows Restoration Dock */}
          {closedWindows.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 p-2.5 rounded-xl bg-bg-elevated border border-border/80 text-xs">
              <span className="text-text-muted text-[11px] font-semibold mr-1">
                Closed Windows:
              </span>
              {closedWindows.map((win) => (
                <button
                  key={win.id}
                  onClick={() => handleRestoreWindow(win.id)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-bg border border-border hover:border-accent text-text-main hover:text-accent transition-colors text-[11px]"
                  title={`Restore ${win.title} window`}
                >
                  <Plus size={11} className="text-accent" />
                  <span>{win.title}</span>
                </button>
              ))}
            </div>
          )}

          {/* Canvas Workspace Area */}
          <div
            ref={containerRef}
            style={{ minHeight: `${maxCanvasY + 60}px` }}
            className="w-full relative rounded-2xl border border-border/80 bg-bg/40 backdrop-blur-sm p-4 overflow-hidden select-none bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px] transition-[min-height] duration-200"
          >
            {windows.map((win) => {
              if (win.isClosed) return null
              return (
                <SkillWindow
                  key={win.id}
                  windowData={win}
                  isActive={activeWindowId === win.id}
                  containerRef={containerRef}
                  onFocus={handleFocusWindow}
                  onUpdate={handleUpdateWindow}
                  onClose={handleCloseWindow}
                  onToggleMinimize={handleToggleMinimize}
                  onToggleMaximize={handleToggleMaximize}
                />
              )
            })}
          </div>
        </div>
      )}

      {/* ================= VIEW: RAW JSON CODE ================= */}
      {viewMode === 'code' && (
        <div className="rounded-xl border border-border bg-bg-elevated/40 backdrop-blur-sm p-4 sm:p-6 overflow-x-auto shadow-sm">
          <div className="text-syntax-comment mb-2">// Skills.json</div>
          <div className="text-text-muted">{'{'}</div>

          <div className="pl-4 sm:pl-6 space-y-3">
            {jsonKeys.map((groupKey, idx) => {
              const isCollapsed = !!collapsedGroups[groupKey]
              const items = SKILLS_DATA[groupKey]
              const isLast = idx === jsonKeys.length - 1

              return (
                <div key={groupKey} className="space-y-1">
                  <div
                    onClick={() => toggleGroup(groupKey)}
                    className="flex items-center gap-1 text-text-main hover:bg-bg-elevated/80 px-1 py-0.5 rounded cursor-pointer select-none transition-colors w-fit"
                  >
                    <span className="text-text-muted">
                      {isCollapsed ? <ChevronRight size={13} /> : <ChevronDown size={13} />}
                    </span>
                    <span className="text-syntax-type font-semibold">"{groupKey}"</span>
                    <span className="text-text-muted">: [</span>
                    {isCollapsed && (
                      <span className="text-text-muted/60 text-[11px] ml-1">
                        ... {items.length} items ]{isLast ? '' : ','}
                      </span>
                    )}
                  </div>

                  {!isCollapsed && (
                    <div className="pl-6 space-y-0.5">
                      {items.map((item, itemIdx) => {
                        const isItemLast = itemIdx === items.length - 1
                        return (
                          <div key={item} className="flex items-center gap-2 group py-0.5">
                            <span className="text-syntax-string">"{item}"</span>
                            <span className="text-text-muted">{isItemLast ? '' : ','}</span>
                          </div>
                        )
                      })}
                      <div className="text-text-muted">]{isLast ? '' : ','}</div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="text-text-muted">{'}'}</div>
        </div>
      )}

      {/* ================= VIEW: PROFICIENCY BARS ================= */}
      {viewMode === 'chart' && (
        <div className="space-y-6">
          {SKILL_CATEGORIES_METADATA.map((cat) => (
            <div
              key={cat.key}
              className="p-5 rounded-xl border border-border bg-bg-elevated/40 space-y-4 shadow-sm"
            >
              <div className="flex items-center justify-between pb-2 border-b border-border/60">
                <h3 className="font-sans font-bold text-base text-text-main flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <span>{cat.name}</span>
                </h3>
                <span className="text-[11px] text-text-muted uppercase tracking-wider">
                  {cat.skills.length} skills listed
                </span>
              </div>

              <div className="space-y-3">
                {cat.skills.map((skill) => (
                  <div key={skill.name} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-text-main">{skill.name}</span>
                      <span className="text-text-muted">{skill.level}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-bg overflow-hidden border border-border/50">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="h-full bg-accent rounded-full"
                      />
                    </div>
                    <div className="text-[11px] text-text-muted leading-relaxed font-sans pt-0.5">
                      {skill.context}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
