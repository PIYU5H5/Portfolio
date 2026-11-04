import { useState, useRef, useEffect } from 'react'
import {
  ChevronDown,
  ChevronRight,
  Folder,
  FolderOpen,
  Sparkles,
  Download,
  Bot,
} from 'lucide-react'
import { useAppStore } from '../../store/useAppStore.js'
import { FILES } from '../../data/files.js'
import { SpecialIcon, FileIcon } from '../ui/FileIcon.jsx'
import { AICopilot } from '../panels/AICopilot.jsx'

export const Sidebar = () => {
  const {
    sidebarWidth,
    setSidebarWidth,
    activeTab,
    openFile,
    isCopilotOpen,
    toggleCopilot,
    isSecretsUnlocked,
    isDevLogUnlocked,
  } = useAppStore()

  const [isSrcOpen, setIsSrcOpen] = useState(true)
  const [isDocsOpen, setIsDocsOpen] = useState(true)
  const [isPublicOpen, setIsPublicOpen] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const sidebarRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return
      const newWidth = e.clientX - 56
      setSidebarWidth(newWidth)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      document.body.style.cursor = 'default'
      document.body.style.userSelect = 'auto'
    }

    if (isDragging) {
      document.body.style.cursor = 'col-resize'
      document.body.style.userSelect = 'none'
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, setSidebarWidth])

  const handleDownloadResume = (e) => {
    e.stopPropagation()
    const link = document.createElement('a')
    link.href = '/resume.pdf'
    link.download = 'Piyush_Jadhav_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  const srcFiles = ['Home.jsx', 'About.jsx', 'Projects.js', 'Skills.json', 'Experience.json', 'Contact.jsx']
  const docFiles = ['Achievements.md', 'README.md']

  if (isDevLogUnlocked) {
    docFiles.push('dev-log.md')
  }

  return (
    <div
      ref={sidebarRef}
      style={{ width: `${sidebarWidth}px` }}
      className="h-full bg-bg-sidebar border-r border-border flex flex-col shrink-0 select-none relative z-10 transition-[width] duration-75"
    >
      {isCopilotOpen ? (
        <AICopilot />
      ) : (
        <>
          <div className="h-9 px-4 border-b border-border flex items-center justify-between shrink-0">
            <span className="font-mono text-[11px] font-bold tracking-wider text-accent uppercase">
              PIYUSH'S PORTFOLIO
            </span>
            <span className="text-[10px] font-mono text-text-muted px-1.5 py-0.5 rounded bg-bg-elevated border border-border">
              WORKSPACE
            </span>
          </div>

          <div className="flex-1 overflow-y-auto py-2 text-xs font-mono">
            <div>
              <button
                onClick={() => setIsSrcOpen(!isSrcOpen)}
                className="w-full flex items-center gap-1.5 px-3 py-1 text-text-muted hover:text-text-main hover:bg-bg-elevated/50 transition-colors"
              >
                {isSrcOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                {isSrcOpen ? <FolderOpen size={14} className="text-amber-400" /> : <Folder size={14} className="text-amber-400" />}
                <span className="font-semibold text-[11px]">src</span>
              </button>

              {isSrcOpen && (
                <div className="pl-4">
                  {srcFiles.map((fileId) => {
                    const file = FILES[fileId]
                    const isActive = activeTab === fileId
                    return (
                      <button
                        key={fileId}
                        onClick={() => openFile(fileId)}
                        className={`w-full flex items-center gap-2 px-3 py-1.5 text-[12px] transition-colors relative group ${
                          isActive
                            ? 'bg-bg-elevated text-text-main font-medium'
                            : 'text-text-muted hover:text-text-main hover:bg-bg-elevated/40'
                        }`}
                      >
                        {isActive && (
                          <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent" />
                        )}
                        <SpecialIcon type={file.iconName} size={15} />
                        <span className="truncate">{file.name}</span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>

            <div className="mt-1">
              <button
                onClick={() => setIsDocsOpen(!isDocsOpen)}
                className="w-full flex items-center gap-1.5 px-3 py-1 text-text-muted hover:text-text-main hover:bg-bg-elevated/50 transition-colors"
              >
                {isDocsOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                {isDocsOpen ? <FolderOpen size={14} className="text-amber-400" /> : <Folder size={14} className="text-amber-400" />}
                <span className="font-semibold text-[11px]">docs</span>
              </button>

              {isDocsOpen && (
                <div className="pl-4">
                  {docFiles.map((fileId) => {
                    const file = FILES[fileId]
                    const isActive = activeTab === fileId
                    return (
                      <button
                        key={fileId}
                        onClick={() => openFile(fileId)}
                        className={`w-full flex items-center gap-2 px-3 py-1.5 text-[12px] transition-colors relative group ${
                          isActive
                            ? 'bg-bg-elevated text-text-main font-medium'
                            : 'text-text-muted hover:text-text-main hover:bg-bg-elevated/40'
                        }`}
                      >
                        {isActive && (
                          <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent" />
                        )}
                        <SpecialIcon type={file.iconName} size={15} />
                        <span className="truncate">{file.name}</span>
                        {fileId === 'dev-log.md' && (
                          <span className="ml-auto text-[9px] px-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded">
                            SECRET
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>

            <div className="mt-1">
              <button
                onClick={() => setIsPublicOpen(!isPublicOpen)}
                className="w-full flex items-center gap-1.5 px-3 py-1 text-text-muted hover:text-text-main hover:bg-bg-elevated/50 transition-colors"
              >
                {isPublicOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                {isPublicOpen ? <FolderOpen size={14} className="text-amber-400" /> : <Folder size={14} className="text-amber-400" />}
                <span className="font-semibold text-[11px]">public</span>
              </button>

              {isPublicOpen && (
                <div className="pl-4">
                  <div
                    onClick={handleDownloadResume}
                    className="w-full flex items-center justify-between px-3 py-1.5 text-[12px] text-text-muted hover:text-text-main hover:bg-bg-elevated/40 cursor-pointer group"
                    title="Click to download Piyush's resume"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FileIcon name="resume.pdf" size={15} />
                      <span className="truncate group-hover:underline">resume.pdf</span>
                    </div>
                    <Download size={13} className="text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              )}
            </div>

            {isSecretsUnlocked && (
              <div className="mt-3 px-3">
                <div className="text-[10px] font-mono uppercase text-pink-400/80 mb-1 flex items-center gap-1">
                  <Sparkles size={11} /> Unlocked Secrets
                </div>
                <button
                  onClick={() => openFile('secrets.txt')}
                  className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-[12px] transition-colors border border-pink-500/30 ${
                    activeTab === 'secrets.txt'
                      ? 'bg-pink-500/20 text-pink-300 font-medium'
                      : 'bg-bg-elevated/60 text-pink-300/80 hover:bg-bg-elevated'
                  }`}
                >
                  <SpecialIcon type="lock" size={14} />
                  <span className="truncate">secrets.txt</span>
                </button>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-border bg-bg-elevated/30">
            <button
              onClick={() => toggleCopilot(true)}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-md bg-accent/10 hover:bg-accent/20 border border-accent/30 text-accent font-medium text-xs transition-colors"
            >
              <Bot size={15} />
              <span>Ask Piyush's Co-Pilot</span>
            </button>
          </div>
        </>
      )}

      <div
        onMouseDown={() => setIsDragging(true)}
        className="absolute top-0 right-0 w-1.5 h-full cursor-col-resize hover:bg-accent/50 active:bg-accent transition-colors z-20"
        title="Drag to resize sidebar"
      />
    </div>
  )
}

