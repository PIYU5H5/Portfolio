import { useState, useEffect } from 'react'
import {
  GitBranch,
  XCircle,
  AlertTriangle,
  Bot,
  CheckCheck,
  Palette,
  Clock,
} from 'lucide-react'
import { useAppStore } from '../../store/useAppStore.js'
import { useThemeStore } from '../../store/useThemeStore.js'
import { useToastStore } from '../ui/Toast.jsx'
import { FILES } from '../../data/files.js'
import { THEMES } from '../../themes/themes.js'

export const StatusBar = () => {
  const {
    activeTab,
    toggleCopilot,
    toggleGitBranches,
    hasWarningTriggered,
    triggerWarning,
  } = useAppStore()

  const { currentTheme, setTheme } = useThemeStore()
  const { showToast } = useToastStore()

  const [currentTime, setCurrentTime] = useState('')
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      )
    }
    updateTime()
    const timer = setInterval(updateTime, 30000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const easterEggTimer = setTimeout(() => {
      triggerWarning()
      showToast({
        type: 'warning',
        title: '⚠️ 1 Pending IDE Diagnostic',
        description: "You've been exploring for 60s without contacting Piyush yet! Check out Contact.jsx.",
      })
    }, 60000)
    return () => clearTimeout(easterEggTimer)
  }, [triggerWarning, showToast])

  const handleProblemsClick = () => {
    if (hasWarningTriggered) {
      showToast({
        type: 'warning',
        title: 'Diagnostic Warning: Action Required',
        description: 'You haven\'t contacted Piyush yet. Head to Contact.jsx to fix this warning!',
      })
    } else {
      showToast({
        type: 'success',
        title: 'Workspace Diagnostics Clean',
        description: '0 errors, 0 warnings. No problems. Hire this engineer!',
      })
    }
  }

  const currentFile = activeTab ? FILES[activeTab] : null
  const languageMode = currentFile ? currentFile.language : 'Plain Text'
  const activeThemeObj = THEMES.find((t) => t.id === currentTheme)

  return (
    <footer className="h-6 w-full bg-bg-statusbar text-white flex items-center justify-between px-2 text-[11px] font-mono select-none z-30 shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={() => toggleGitBranches()}
          className="flex items-center gap-1.5 px-1.5 py-0.5 rounded hover:bg-black/20 transition-colors"
          title="Git Branch: main* (Click to view branches)"
        >
          <GitBranch size={12} />
          <span>main*</span>
        </button>

        <button
          onClick={handleProblemsClick}
          className="flex items-center gap-2 px-1.5 py-0.5 rounded hover:bg-black/20 transition-colors"
          title="Click to inspect workspace diagnostics"
        >
          <div className="flex items-center gap-1">
            <XCircle size={11} className="text-white/80" />
            <span>0</span>
          </div>
          <div className="flex items-center gap-1">
            <AlertTriangle
              size={11}
              className={hasWarningTriggered ? 'text-amber-200 animate-bounce' : 'text-white/80'}
            />
            <span className={hasWarningTriggered ? 'font-bold text-amber-200' : ''}>
              {hasWarningTriggered ? '1' : '0'}
            </span>
          </div>
        </button>
      </div>

      <div className="flex items-center gap-2.5">
        <button
          onClick={() => toggleCopilot()}
          className="flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-black/20 transition-colors"
          title="Click to toggle Piyush's AI Co-Pilot"
        >
          <Bot size={12} />
          <span className="hidden sm:inline">Copilot</span>
        </button>

        <span className="hidden md:inline px-1 text-white/90">{languageMode}</span>
        <span className="hidden lg:inline text-white/80">UTF-8</span>

        <div className="hidden sm:flex items-center gap-1 text-white/90">
          <CheckCheck size={12} />
          <span>Prettier</span>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
            className="flex items-center gap-1.5 px-1.5 py-0.5 rounded hover:bg-black/20 transition-colors"
            title="Click to switch theme"
          >
            <Palette size={12} />
            <span className="hidden sm:inline">{activeThemeObj?.name.split(' ')[0] || 'Theme'}</span>
          </button>

          {isThemeMenuOpen && (
            <div className="absolute bottom-7 right-0 min-w-[200px] bg-bg-elevated border border-border rounded-md shadow-2xl py-1 text-xs text-text-main z-50">
              <div className="px-3 py-1 font-bold text-[10px] text-text-muted uppercase border-b border-border">
                Select Theme
              </div>
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id)
                    setIsThemeMenuOpen(false)
                  }}
                  className={`w-full text-left px-3 py-1.5 flex items-center justify-between text-xs transition-colors ${
                    currentTheme === t.id
                      ? 'bg-accent text-white font-medium'
                      : 'hover:bg-bg hover:text-text-main'
                  }`}
                >
                  <span>{t.name}</span>
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-border"
                    style={{ backgroundColor: t.previewColor }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 text-white/90 pl-1 border-l border-white/20">
          <Clock size={11} />
          <span>{currentTime}</span>
        </div>
      </div>
    </footer>
  )
}

