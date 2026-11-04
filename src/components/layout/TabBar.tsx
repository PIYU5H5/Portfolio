import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import type { FileId } from '../../data/files'
import { FILES } from '../../data/files'
import { SpecialIcon } from '../ui/FileIcon'

interface ContextMenuState {
  isOpen: boolean
  x: number
  y: number
  fileId: FileId | null
}

export const TabBar: React.FC = () => {
  const {
    openTabs,
    activeTab,
    openFile,
    closeTab,
    closeOtherTabs,
    closeAllTabs,
  } = useAppStore()

  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    isOpen: false,
    x: 0,
    y: 0,
    fileId: null,
  })

  const tabContainerRef = useRef<HTMLDivElement>(null)

  // Close context menu on outside click
  useEffect(() => {
    const handleClose = () => {
      if (contextMenu.isOpen) {
        setContextMenu({ isOpen: false, x: 0, y: 0, fileId: null })
      }
    }
    window.addEventListener('click', handleClose)
    return () => window.removeEventListener('click', handleClose)
  }, [contextMenu.isOpen])

  const handleContextMenu = (e: React.MouseEvent, fileId: FileId) => {
    e.preventDefault()
    setContextMenu({
      isOpen: true,
      x: e.clientX,
      y: e.clientY,
      fileId,
    })
  }

  const handleMiddleClick = (e: React.MouseEvent, fileId: FileId) => {
    if (e.button === 1) {
      e.preventDefault()
      closeTab(fileId)
    }
  }

  const scrollTabs = (offset: number) => {
    if (tabContainerRef.current) {
      tabContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' })
    }
  }

  if (openTabs.length === 0) {
    return null
  }

  return (
    <div className="h-9 w-full bg-bg-activity border-b border-border flex items-center justify-between select-none shrink-0 relative z-10 overflow-hidden">
      {/* Tabs Container */}
      <div
        ref={tabContainerRef}
        className="flex-1 h-full flex items-center overflow-x-auto no-scrollbar scroll-smooth"
      >
        <AnimatePresence initial={false}>
          {openTabs.map((fileId) => {
            const file = FILES[fileId]
            if (!file) return null
            const isActive = activeTab === fileId

            return (
              <motion.div
                key={fileId}
                layout
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                onMouseDown={(e) => handleMiddleClick(e, fileId)}
                onContextMenu={(e) => handleContextMenu(e, fileId)}
                onClick={() => openFile(fileId)}
                className={`group h-full flex items-center gap-2 px-3 border-r border-border text-xs cursor-pointer relative shrink-0 transition-colors ${
                  isActive
                    ? 'bg-bg text-text-main font-medium border-t-2 border-t-accent shadow-sm'
                    : 'bg-bg-elevated/40 text-text-muted hover:text-text-main hover:bg-bg-elevated/70 border-t-2 border-t-transparent'
                }`}
              >
                <SpecialIcon type={file.iconName} size={14} />
                <span className="font-mono text-[11px] tracking-tight">{file.name}</span>

                {/* Close Button: Always visible on active, hover on inactive */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    closeTab(fileId)
                  }}
                  className={`p-0.5 rounded hover:bg-bg-elevated hover:text-danger transition-colors ${
                    isActive ? 'opacity-100 text-text-muted' : 'opacity-0 group-hover:opacity-100 text-text-muted'
                  }`}
                  title="Close (Ctrl+W)"
                >
                  <X size={13} />
                </button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Tab Scroll Arrows if overflow */}
      <div className="flex items-center px-1 text-text-muted bg-bg-activity border-l border-border h-full">
        <button
          onClick={() => scrollTabs(-120)}
          className="p-1 hover:text-text-main transition-colors"
          title="Scroll Left"
        >
          <ChevronLeft size={14} />
        </button>
        <button
          onClick={() => scrollTabs(120)}
          className="p-1 hover:text-text-main transition-colors"
          title="Scroll Right"
        >
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Right Click Context Menu */}
      {contextMenu.isOpen && contextMenu.fileId && (
        <div
          style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
          className="fixed z-50 min-w-[160px] bg-bg-elevated border border-border rounded-md shadow-2xl py-1 text-xs text-text-main backdrop-blur-md"
        >
          <button
            onClick={() => {
              if (contextMenu.fileId) closeTab(contextMenu.fileId)
              setContextMenu({ isOpen: false, x: 0, y: 0, fileId: null })
            }}
            className="w-full text-left px-3 py-1.5 hover:bg-accent hover:text-white transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              if (contextMenu.fileId) closeOtherTabs(contextMenu.fileId)
              setContextMenu({ isOpen: false, x: 0, y: 0, fileId: null })
            }}
            className="w-full text-left px-3 py-1.5 hover:bg-accent hover:text-white transition-colors"
          >
            Close Others
          </button>
          <button
            onClick={() => {
              closeAllTabs()
              setContextMenu({ isOpen: false, x: 0, y: 0, fileId: null })
            }}
            className="w-full text-left px-3 py-1.5 hover:bg-accent hover:text-white transition-colors"
          >
            Close All
          </button>
        </div>
      )}
    </div>
  )
}
