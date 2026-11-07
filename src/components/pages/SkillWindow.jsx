import { useState, useRef } from 'react'
import {
  Layers,
  Terminal,
  AppWindow,
  Database,
  Cpu,
  Wrench,
  Brain,
  Minus,
  Maximize2,
  Minimize2,
  X,
  Move,
} from 'lucide-react'

const ICON_MAP = {
  core_stack: Layers,
  languages: Terminal,
  frontend: AppWindow,
  backend_and_databases: Database,
  ai_and_automation: Cpu,
  tools_and_cloud: Wrench,
  problem_solving: Brain,
}

export const SkillWindow = ({
  windowData,
  isActive,
  containerRef,
  onFocus,
  onUpdate,
  onClose,
  onToggleMinimize,
  onToggleMaximize,
}) => {
  const {
    id,
    title,
    filename,
    categoryKey,
    x,
    y,
    width,
    height,
    isMinimized,
    isMaximized,
    zIndex,
    skills,
  } = windowData

  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)

  const dragRef = useRef({ startX: 0, startY: 0, initialX: 0, initialY: 0 })
  const resizeRef = useRef({ startX: 0, startY: 0, initialW: 0, initialH: 0 })

  const IconComponent = ICON_MAP[categoryKey] || Layers

  // ================= DRAG HANDLERS =================
  const handleDragPointerDown = (e) => {
    // Ignore clicks on control buttons
    if (e.target.closest('button')) return
    e.preventDefault()
    e.stopPropagation()

    onFocus(id)

    if (isMaximized) return // Cannot drag maximized window

    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {}

    setIsDragging(true)
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: x,
      initialY: y,
    }
  }

  const handleDragPointerMove = (e) => {
    if (!isDragging) return
    e.preventDefault()

    const dx = e.clientX - dragRef.current.startX
    const dy = e.clientY - dragRef.current.startY

    const containerWidth = containerRef?.current ? containerRef.current.clientWidth : 1200
    const maxX = Math.max(0, containerWidth - width)

    const nextX = Math.max(0, Math.min(maxX, dragRef.current.initialX + dx))
    const nextY = Math.max(0, dragRef.current.initialY + dy)

    onUpdate(id, { x: nextX, y: nextY })
  }

  const handleDragPointerUp = (e) => {
    if (isDragging) {
      setIsDragging(false)
      try {
        e.currentTarget.releasePointerCapture(e.pointerId)
      } catch {}
    }
  }

  // ================= RESIZE HANDLERS =================
  const handleResizePointerDown = (e) => {
    e.preventDefault()
    e.stopPropagation()

    onFocus(id)

    if (isMinimized || isMaximized) return

    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {}

    setIsResizing(true)
    resizeRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialW: width,
      initialH: height,
    }
  }

  const handleResizePointerMove = (e) => {
    if (!isResizing) return
    e.preventDefault()

    const dx = e.clientX - resizeRef.current.startX
    const dy = e.clientY - resizeRef.current.startY

    const containerWidth = containerRef?.current ? containerRef.current.clientWidth : 1200
    const maxAllowedWidth = Math.max(280, containerWidth - x)

    const nextWidth = Math.max(280, Math.min(maxAllowedWidth, resizeRef.current.initialW + dx))
    const nextHeight = Math.max(160, resizeRef.current.initialH + dy)

    onUpdate(id, { width: nextWidth, height: nextHeight })
  }

  const handleResizePointerUp = (e) => {
    if (isResizing) {
      setIsResizing(false)
      try {
        e.currentTarget.releasePointerCapture(e.pointerId)
      } catch {}
    }
  }

  // Positioning & Dimensions
  const effectiveStyle = isMaximized
    ? {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 999,
      }
    : {
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: isMinimized ? 'auto' : `${height}px`,
        zIndex,
      }

  return (
    <div
      style={effectiveStyle}
      onMouseDown={() => onFocus(id)}
      className={`rounded-xl border shadow-2xl flex flex-col transition-shadow select-none ${
        isActive
          ? 'border-accent/80 shadow-black/50 bg-bg-elevated ring-1 ring-accent/30'
          : 'border-border shadow-black/40 bg-bg-elevated hover:border-accent/40'
      }`}
    >
      {/* ================= WINDOW TITLE BAR ================= */}
      <div
        onPointerDown={handleDragPointerDown}
        onPointerMove={handleDragPointerMove}
        onPointerUp={handleDragPointerUp}
        onPointerCancel={handleDragPointerUp}
        onDoubleClick={() => onToggleMaximize(id)}
        className={`h-9 px-3 border-b flex items-center justify-between shrink-0 rounded-t-xl transition-colors ${
          isActive
            ? 'bg-bg-activity border-border/90 cursor-grab active:cursor-grabbing text-text-main'
            : 'bg-bg border-border/60 cursor-grab active:cursor-grabbing text-text-muted hover:text-text-main'
        }`}
        style={{ touchAction: 'none' }}
        title="Double-click to toggle maximize • Drag to move"
      >
        <div className="flex items-center gap-2 overflow-hidden">
          {/* macOS Traffic Lights */}
          <div className="flex items-center gap-1.5 shrink-0 pr-1">
            <button
              onClick={(e) => {
                e.stopPropagation()
                onClose(id)
              }}
              className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#e0443e] flex items-center justify-center transition-transform hover:scale-110 active:scale-95 group/btn"
              title="Close window"
              aria-label="Close"
            >
              <X size={7} className="text-[#4a0002] opacity-0 group-hover/btn:opacity-100 stroke-[3]" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onToggleMinimize(id)
              }}
              className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#dea123] flex items-center justify-center transition-transform hover:scale-110 active:scale-95 group/btn"
              title={isMinimized ? 'Expand window' : 'Minimize to titlebar'}
              aria-label="Minimize"
            >
              <Minus size={7} className="text-[#5b3c00] opacity-0 group-hover/btn:opacity-100 stroke-[3]" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onToggleMaximize(id)
              }}
              className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#1aab2f] flex items-center justify-center transition-transform hover:scale-110 active:scale-95 group/btn"
              title={isMaximized ? 'Restore size' : 'Maximize window'}
              aria-label="Maximize"
            >
              {isMaximized ? (
                <Minimize2 size={6} className="text-[#0e4817] opacity-0 group-hover/btn:opacity-100 stroke-[3]" />
              ) : (
                <Maximize2 size={6} className="text-[#0e4817] opacity-0 group-hover/btn:opacity-100 stroke-[3]" />
              )}
            </button>
          </div>

          <IconComponent size={14} className="text-accent shrink-0" />
          <span className="font-mono text-xs font-bold text-text-main truncate">{title}</span>
          <span className="font-mono text-[10px] text-text-muted/70 hidden sm:inline truncate">
            ({filename})
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 font-mono text-[11px]">
          <span className="px-1.5 py-0.5 rounded bg-bg/80 border border-border/80 text-[10px] text-text-muted">
            {skills.length} skills
          </span>
          <div className="text-text-muted/40 hover:text-accent cursor-grab active:cursor-grabbing p-0.5">
            <Move size={12} />
          </div>
        </div>
      </div>

      {/* ================= WINDOW CONTENT BODY ================= */}
      {!isMinimized && (
        <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3 font-mono text-xs selection:bg-accent selection:text-white bg-bg-elevated rounded-b-xl">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="p-2.5 rounded-lg bg-bg border border-border/70 hover:border-accent/50 transition-all space-y-1.5 shadow-xs"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-text-main flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  {skill.name}
                </span>
                <span className="font-mono text-accent text-[11px] font-semibold">{skill.level}%</span>
              </div>

              {/* Animated Progress Bar */}
              <div className="w-full h-1.5 rounded-full bg-bg-elevated overflow-hidden border border-border/40">
                <div
                  style={{ width: `${skill.level}%` }}
                  className="h-full bg-accent rounded-full transition-all duration-500 ease-out"
                />
              </div>

              {/* Context / Application Details */}
              <p className="text-[11px] font-sans text-text-muted leading-relaxed pt-0.5">
                {skill.context}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ================= RESIZE HANDLE (BOTTOM-RIGHT) ================= */}
      {!isMinimized && !isMaximized && (
        <div
          onPointerDown={handleResizePointerDown}
          onPointerMove={handleResizePointerMove}
          onPointerUp={handleResizePointerUp}
          onPointerCancel={handleResizePointerUp}
          className="absolute bottom-0 right-0 w-5 h-5 cursor-nwse-resize flex items-center justify-center text-text-muted/50 hover:text-accent active:text-accent transition-colors z-20 select-none"
          style={{ touchAction: 'none' }}
          title="Drag to resize window"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" className="stroke-current fill-none">
            <line x1="8" y1="2" x2="2" y2="8" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="8" y1="5.5" x2="5.5" y2="8" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      )}
    </div>
  )
}

