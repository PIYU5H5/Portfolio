import React, { useState } from 'react'
import { Search, X, Minus, Maximize2 } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { useToastStore } from '../ui/Toast'
import { KeyCap } from '../ui/KeyCap'

export const TitleBar: React.FC = () => {
  const { toggleSidebar, toggleCommandPalette, incrementLogoClicks } = useAppStore()
  const { showToast } = useToastStore()
  const [isTrafficHovered, setIsTrafficHovered] = useState(false)

  const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0
  const modKey = isMac ? '⌘' : 'Ctrl'

  const handleRedClick = () => {
    showToast({
      type: 'info',
      title: 'Nice try! 🚀',
      description: "You can't close this portfolio. Feel free to explore every file and run commands in the terminal!",
    })
  }

  const handleYellowClick = () => {
    toggleSidebar()
  }

  const handleGreenClick = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {})
    } else {
      document.exitFullscreen().catch(() => {})
    }
  }

  return (
    <header className="h-9 w-full bg-bg-titlebar border-b border-border flex items-center justify-between px-3 shrink-0 select-none z-30">
      {/* Left: Traffic lights & Logo */}
      <div className="flex items-center gap-3 w-1/4">
        <div
          className="flex items-center gap-1.5"
          onMouseEnter={() => setIsTrafficHovered(true)}
          onMouseLeave={() => setIsTrafficHovered(false)}
        >
          {/* Red button */}
          <button
            onClick={handleRedClick}
            title="Close window"
            className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#e0443e] flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
            aria-label="Close"
          >
            {isTrafficHovered && <X size={7} className="text-[#4a0002] stroke-[3]" />}
          </button>

          {/* Yellow button */}
          <button
            onClick={handleYellowClick}
            title="Collapse sidebar"
            className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#dea123] flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
            aria-label="Minimize / Collapse"
          >
            {isTrafficHovered && <Minus size={7} className="text-[#5b3c00] stroke-[3]" />}
          </button>

          {/* Green button */}
          <button
            onClick={handleGreenClick}
            title="Toggle fullscreen"
            className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#1aab2f] flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
            aria-label="Fullscreen"
          >
            {isTrafficHovered && <Maximize2 size={6} className="text-[#0e4817] stroke-[3]" />}
          </button>
        </div>

        {/* Brand / Logo (Click 5 times for Easter egg!) */}
        <button
          onClick={incrementLogoClicks}
          title="Click to discover developer secret"
          className="hidden sm:flex items-center gap-1.5 px-1.5 py-0.5 rounded text-xs text-text-muted hover:text-text-main hover:bg-bg-elevated transition-colors"
        >
          <div className="w-4 h-4 rounded bg-accent/20 border border-accent/40 flex items-center justify-center text-[10px] font-mono font-bold text-accent">
            PJ
          </div>
          <span className="font-mono text-[11px] tracking-tight">piyush.workspace</span>
        </button>
      </div>

      {/* Center: Command Palette Pill */}
      <div className="flex-1 max-w-md mx-auto flex justify-center">
        <button
          onClick={() => toggleCommandPalette(true)}
          className="group w-full max-w-sm flex items-center justify-between px-3 py-1 rounded-md bg-bg-elevated/70 hover:bg-bg-elevated border border-border/80 hover:border-accent/40 text-xs text-text-muted hover:text-text-main transition-all shadow-sm"
          title={`Quick Open & Command Palette (${modKey}+P)`}
        >
          <div className="flex items-center gap-2 truncate">
            <Search size={13} className="text-text-muted group-hover:text-accent transition-colors shrink-0" />
            <span className="font-mono text-[11px] truncate">piyush.jadhav : portfolio</span>
          </div>
          <div className="flex items-center gap-1 shrink-0 ml-2">
            <KeyCap>{modKey}</KeyCap>
            <KeyCap>P</KeyCap>
          </div>
        </button>
      </div>

      {/* Right placeholder / quick actions */}
      <div className="w-1/4 flex items-center justify-end gap-2 text-xs text-text-muted">
        <div className="hidden lg:flex items-center gap-1.5 text-[11px] font-mono text-text-muted/80">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span>v3.8.0-prod</span>
        </div>
      </div>
    </header>
  )
}
