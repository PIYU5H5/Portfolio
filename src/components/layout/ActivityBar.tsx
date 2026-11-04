import React from 'react'
import {
  Files,
  Terminal as TerminalIcon,
  Bot,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
} from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { useTerminalStore } from '../../store/useTerminalStore'

export const ActivityBar: React.FC = () => {
  const {
    activeActivityView,
    setActiveActivityView,
    isSidebarOpen,
    toggleSidebar,
    isCopilotOpen,
    toggleCopilot,
    toggleSettings,
  } = useAppStore()

  const { toggleTerminal, isOpen: isTerminalOpen } = useTerminalStore()

  const topItems = [
    {
      id: 'explorer',
      label: 'Explorer (Ctrl+Shift+E)',
      icon: Files,
      isActive: activeActivityView === 'explorer' && isSidebarOpen && !isCopilotOpen,
      onClick: () => {
        if (isCopilotOpen) toggleCopilot(false)
        setActiveActivityView('explorer')
      },
    },
    {
      id: 'terminal',
      label: 'Terminal (Ctrl+`)',
      icon: TerminalIcon,
      isActive: isTerminalOpen,
      onClick: () => toggleTerminal(),
    },
    {
      id: 'copilot',
      label: "Piyush's Co-Pilot (AI Assistant)",
      icon: Bot,
      isActive: isCopilotOpen,
      badge: 'AI',
      onClick: () => {
        toggleCopilot()
        if (!isSidebarOpen) toggleSidebar()
      },
    },
  ]

  return (
    <aside
      className="w-12 md:w-14 bg-bg-activity border-r border-border flex flex-col justify-between items-center py-2 shrink-0 select-none z-20"
      aria-label="Activity Bar"
    >
      {/* Top Group */}
      <div className="flex flex-col items-center gap-1.5 w-full">
        {topItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={item.onClick}
              title={item.label}
              className={`relative w-full h-11 flex items-center justify-center transition-colors group ${
                item.isActive ? 'text-accent' : 'text-text-muted hover:text-text-main'
              }`}
            >
              {/* Active Indicator Bar on Left */}
              {item.isActive && (
                <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] bg-accent rounded-r" />
              )}
              <div className="relative transition-transform duration-150 group-hover:scale-110">
                <Icon size={21} strokeWidth={item.isActive ? 2.2 : 1.8} />
                {item.badge && (
                  <span className="absolute -top-1 -right-2 px-1 py-0.2 text-[8px] font-mono font-bold bg-accent text-white rounded">
                    {item.badge}
                  </span>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Bottom Group */}
      <div className="flex flex-col items-center gap-1.5 w-full">
        {/* Collapse Sidebar Toggle */}
        <button
          onClick={toggleSidebar}
          title={isSidebarOpen ? 'Collapse Primary Side Bar (Ctrl+B)' : 'Expand Primary Side Bar (Ctrl+B)'}
          className="relative w-full h-11 flex items-center justify-center text-text-muted hover:text-text-main transition-colors group"
        >
          <div className="transition-transform duration-150 group-hover:scale-110">
            {isSidebarOpen ? (
              <PanelLeftClose size={20} strokeWidth={1.8} />
            ) : (
              <PanelLeftOpen size={20} strokeWidth={1.8} />
            )}
          </div>
        </button>

        {/* Settings Popover */}
        <button
          onClick={() => toggleSettings()}
          title="Manage Settings & Themes (Ctrl+,)"
          className="relative w-full h-11 flex items-center justify-center text-text-muted hover:text-text-main transition-colors group"
        >
          <div className="transition-transform duration-150 group-hover:rotate-45 group-hover:scale-110">
            <Settings size={20} strokeWidth={1.8} />
          </div>
        </button>
      </div>
    </aside>
  )
}
