import { useState } from 'react'
import { Search, X, Minus, Maximize2 } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore.js'
import { useToastStore } from '../ui/Toast.jsx'
import { KeyCap } from '../ui/KeyCap.jsx'

export const TitleBar = () => {
  const { toggleSidebar, toggleCommandPalette, incrementLogoClicks } = useAppStore()
  const { showToast } = useToastStore()
  const [isTrafficHovered, setIsTrafficHovered] = useState(false)
  const [redClickCount, setRedClickCount] = useState(() => {
    if (typeof window !== 'undefined') {
      return parseInt(sessionStorage.getItem('pj_red_clicks') || '0', 10)
    }
    return 0
  })

  const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0
  const modKey = isMac ? '⌘' : 'Ctrl'
  const isRedBlocked = redClickCount >= 3

  const handleRedClick = () => {
    if (isRedBlocked) {
      showToast({
        type: 'warning',
        title: 'Action Blocked 🔒',
        description: 'Told you, it is blocked :) You have to stay and explore!',
      })
      return
    }

    const nextCount = redClickCount + 1
    setRedClickCount(nextCount)
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('pj_red_clicks', String(nextCount))
    }

    if (nextCount === 1) {
      showToast({
        type: 'warning',
        title: "Wait, don't quit! 👀",
        description: "You haven't even checked out the interactive terminal or secret themes yet!",
      })
    } else if (nextCount === 2) {
      showToast({
        type: 'error',
        title: 'Still trying to leave? 🛑',
        description: "Piyush ships high-impact code! Type 'sudo hire piyush' before you try that again.",
      })
    } else if (nextCount >= 3) {
      showToast({
        type: 'success',
        title: 'Fine, I will block it :) 🔒',
        description: "Close button officially disabled. You are now trapped in Piyush's portfolio until you hire him!",
      })
    }
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
      <div className="flex items-center gap-3 w-1/4">
        <div
          className="flex items-center gap-1.5"
          onMouseEnter={() => setIsTrafficHovered(true)}
          onMouseLeave={() => setIsTrafficHovered(false)}
        >
          <button
            onClick={handleRedClick}
            disabled={isRedBlocked}
            title={isRedBlocked ? 'Fine, I will block it :)' : 'Close window'}
            className={`w-3 h-3 rounded-full flex items-center justify-center transition-all ${
              isRedBlocked
                ? 'bg-neutral-600 opacity-40 cursor-not-allowed scale-95'
                : 'bg-[#ff5f56] hover:bg-[#e0443e] cursor-pointer hover:scale-105 active:scale-95'
            }`}
            aria-label={isRedBlocked ? 'Close blocked' : 'Close'}
          >
            {isTrafficHovered && !isRedBlocked && (
              <X size={7} className="text-[#4a0002] stroke-[3]" />
            )}
            {isTrafficHovered && isRedBlocked && (
              <X size={7} className="text-neutral-400 stroke-[2]" />
            )}
          </button>

          <button
            onClick={handleYellowClick}
            title="Collapse sidebar"
            className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#dea123] flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
            aria-label="Minimize / Collapse"
          >
            {isTrafficHovered && <Minus size={7} className="text-[#5b3c00] stroke-[3]" />}
          </button>

          <button
            onClick={handleGreenClick}
            title="Toggle fullscreen"
            className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#1aab2f] flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
            aria-label="Fullscreen"
          >
            {isTrafficHovered && <Maximize2 size={6} className="text-[#0e4817] stroke-[3]" />}
          </button>
        </div>

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

      <div className="w-1/4 flex items-center justify-end gap-2 text-xs text-text-muted">
        <div className="hidden lg:flex items-center gap-1.5 text-[11px] font-mono text-text-muted/80">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span>v3.8.0-prod</span>
        </div>
      </div>
    </header>
  )
}

