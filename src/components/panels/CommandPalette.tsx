import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  Search,
  Palette,
  Terminal,
  Download,
  Mail,
  PanelLeft,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from '../ui/SocialIcons'
import { useAppStore } from '../../store/useAppStore'
import { useThemeStore } from '../../store/useThemeStore'
import { useTerminalStore } from '../../store/useTerminalStore'
import { useToastStore } from '../ui/Toast'
import type { FileId } from '../../data/files'
import { FILES } from '../../data/files'
import { THEMES } from '../../themes/themes'
import { PROFILE } from '../../data/profile'
import { fuzzyFilter } from '../../lib/fuzzy'
import { SpecialIcon } from '../ui/FileIcon'
import { copyToClipboard } from '../../lib/utils'

interface PaletteItem {
  id: string
  title: string
  subtitle?: string
  group: 'Files' | 'Themes' | 'Actions'
  icon: React.ReactNode
  onSelect: () => void
}

export const CommandPalette: React.FC = () => {
  const {
    isCommandPaletteOpen,
    toggleCommandPalette,
    openFile,
    toggleSidebar,
    isSecretsUnlocked,
    isDevLogUnlocked,
  } = useAppStore()

  const { setTheme } = useThemeStore()
  const { toggleTerminal } = useTerminalStore()
  const { showToast } = useToastStore()

  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 40)
    }
  }, [isCommandPaletteOpen])

  // Build items catalog
  const allItems: PaletteItem[] = [
    // Files
    ...Object.entries(FILES)
      .filter(([id, f]) => {
        if (f.isHidden && id === 'secrets.txt' && !isSecretsUnlocked) return false
        if (f.isHidden && id === 'dev-log.md' && !isDevLogUnlocked) return false
        return true
      })
      .map(([id, file]) => ({
        id: `file-${id}`,
        title: file.name,
        subtitle: file.description,
        group: 'Files' as const,
        icon: <SpecialIcon type={file.iconName} size={16} />,
        onSelect: () => {
          openFile(id as FileId)
          toggleCommandPalette(false)
        },
      })),

    // Themes
    ...THEMES.map((t) => ({
      id: `theme-${t.id}`,
      title: `Theme: ${t.name}`,
      subtitle: t.description,
      group: 'Themes' as const,
      icon: <Palette size={16} style={{ color: t.accentColor }} />,
      onSelect: () => {
        setTheme(t.id)
        toggleCommandPalette(false)
        showToast({
          type: 'info',
          title: `Theme changed to ${t.name}`,
        })
      },
    })),

    // Actions
    {
      id: 'action-resume',
      title: 'Action: Download Official Resume (PDF)',
      subtitle: 'Piyush_Jadhav_Resume.pdf',
      group: 'Actions',
      icon: <Download size={16} className="text-emerald-400" />,
      onSelect: () => {
        const link = document.createElement('a')
        link.href = '/resume.pdf'
        link.download = 'Piyush_Jadhav_Resume.pdf'
        document.body.appendChild(link)
        link.click()
        link.remove()
        toggleCommandPalette(false)
      },
    },
    {
      id: 'action-terminal',
      title: 'Action: Toggle Integrated Terminal',
      subtitle: 'Open or collapse fake terminal panel',
      group: 'Actions',
      icon: <Terminal size={16} className="text-accent" />,
      onSelect: () => {
        toggleTerminal()
        toggleCommandPalette(false)
      },
    },
    {
      id: 'action-sidebar',
      title: 'Action: Toggle Primary Side Bar',
      subtitle: 'Show/hide file explorer',
      group: 'Actions',
      icon: <PanelLeft size={16} className="text-purple-400" />,
      onSelect: () => {
        toggleSidebar()
        toggleCommandPalette(false)
      },
    },
    {
      id: 'action-email',
      title: 'Action: Copy Piyush\'s Email Address',
      subtitle: PROFILE.socials.email,
      group: 'Actions',
      icon: <Mail size={16} className="text-rose-400" />,
      onSelect: async () => {
        await copyToClipboard(PROFILE.socials.email)
        toggleCommandPalette(false)
        showToast({
          type: 'success',
          title: 'Email Copied to Clipboard!',
          description: PROFILE.socials.email,
        })
      },
    },
    {
      id: 'action-github',
      title: 'Action: Open GitHub Profile',
      subtitle: PROFILE.socials.github,
      group: 'Actions',
      icon: <GithubIcon size={16} className="text-slate-200" />,
      onSelect: () => {
        window.open(PROFILE.socials.github, '_blank', 'noopener,noreferrer')
        toggleCommandPalette(false)
      },
    },
    {
      id: 'action-linkedin',
      title: 'Action: Open LinkedIn Profile',
      subtitle: PROFILE.socials.linkedin,
      group: 'Actions',
      icon: <LinkedinIcon size={16} className="text-sky-400" />,
      onSelect: () => {
        window.open(PROFILE.socials.linkedin, '_blank', 'noopener,noreferrer')
        toggleCommandPalette(false)
      },
    },
    {
      id: 'action-leetcode',
      title: 'Action: Open LeetCode Profile',
      subtitle: `${PROFILE.socials.leetcode} (200+ solved)`,
      group: 'Actions',
      icon: <LeetCodeIcon size={16} className="text-amber-400" />,
      onSelect: () => {
        window.open(PROFILE.socials.leetcode, '_blank', 'noopener,noreferrer')
        toggleCommandPalette(false)
      },
    },
  ]

  // Filter items using fuzzy search
  const filtered = fuzzyFilter(allItems, query, (item) => `${item.title} ${item.subtitle || ''}`)

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].item.onSelect()
      }
    }
  }

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.children[selectedIndex] as HTMLElement
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [selectedIndex])

  if (!isCommandPaletteOpen) return null

  return (
    <div
      onClick={() => toggleCommandPalette(false)}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4 select-none"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -10 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-bg-elevated border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Search Input Box */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-bg/40">
          <Search size={18} className="text-text-muted" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a file name, theme, or action (e.g. 'project', 'matrix', 'resume')..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-text-main placeholder:text-text-muted/60 font-mono"
            spellCheck="false"
          />
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-text-muted rounded bg-bg border border-border">
            ESC to close
          </kbd>
        </div>

        {/* Results List */}
        <div ref={listRef} className="max-h-[380px] overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-text-muted text-xs font-mono">
              No matching files or commands found.
            </div>
          ) : (
            filtered.map((result, idx) => {
              const item = result.item
              const isSelected = idx === selectedIndex

              return (
                <div
                  key={item.id}
                  onClick={() => item.onSelect()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer text-xs font-mono transition-colors ${
                    isSelected
                      ? 'bg-accent text-white shadow-sm'
                      : 'hover:bg-bg text-text-main'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <span className={isSelected ? 'text-white' : 'text-text-muted'}>
                      {item.icon}
                    </span>
                    <div className="truncate">
                      <div className="font-medium truncate">{item.title}</div>
                      {item.subtitle && (
                        <div
                          className={`text-[11px] truncate ${
                            isSelected ? 'text-white/80' : 'text-text-muted'
                          }`}
                        >
                          {item.subtitle}
                        </div>
                      )}
                    </div>
                  </div>
                  <span
                    className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded ml-2 shrink-0 ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-bg text-text-muted border border-border'
                    }`}
                  >
                    {item.group}
                  </span>
                </div>
              )
            })
          )}
        </div>

        {/* Footer shortcuts info */}
        <div className="px-4 py-2 border-t border-border bg-bg/50 flex items-center justify-between text-[11px] font-mono text-text-muted">
          <span>Navigation: ↑ / ↓ to select · Enter to run</span>
          <span>{filtered.length} matches</span>
        </div>
      </motion.div>
    </div>
  )
}
