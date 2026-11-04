import { useRef, Suspense, lazy } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileQuestion, ArrowRight, Loader2 } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore.js'
import { useThemeStore } from '../../store/useThemeStore.js'
import { useTerminalStore } from '../../store/useTerminalStore.js'
import { Minimap } from './Minimap.jsx'
import { KeyCap } from '../ui/KeyCap.jsx'

const HomeFile = lazy(() => import('../pages/HomeFile.jsx').then((m) => ({ default: m.HomeFile })))
const AboutFile = lazy(() => import('../pages/AboutFile.jsx').then((m) => ({ default: m.AboutFile })))
const ProjectsFile = lazy(() => import('../pages/ProjectsFile.jsx').then((m) => ({ default: m.ProjectsFile })))
const SkillsFile = lazy(() => import('../pages/SkillsFile.jsx').then((m) => ({ default: m.SkillsFile })))
const ExperienceFile = lazy(() => import('../pages/ExperienceFile.jsx').then((m) => ({ default: m.ExperienceFile })))
const AchievementsFile = lazy(() => import('../pages/AchievementsFile.jsx').then((m) => ({ default: m.AchievementsFile })))
const ContactFile = lazy(() => import('../pages/ContactFile.jsx').then((m) => ({ default: m.ContactFile })))
const ReadmeFile = lazy(() => import('../pages/ReadmeFile.jsx').then((m) => ({ default: m.ReadmeFile })))
const SecretsFile = lazy(() => import('../pages/SecretsFile.jsx').then((m) => ({ default: m.SecretsFile })))
const DevLogFile = lazy(() => import('../pages/DevLogFile.jsx').then((m) => ({ default: m.DevLogFile })))

const FileLoadingFallback = () => (
  <div className="w-full h-64 flex flex-col items-center justify-center gap-3 font-mono text-xs text-text-muted select-none">
    <Loader2 size={18} className="text-accent animate-spin" />
    <span>Loading editor buffer...</span>
  </div>
)

export const EditorArea = () => {
  const { activeTab, openFile, toggleCommandPalette } = useAppStore()
  const { toggleTerminal } = useTerminalStore()
  const { reduceMotion, fontSize } = useThemeStore()
  const scrollContainerRef = useRef(null)

  const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0
  const modKey = isMac ? '⌘' : 'Ctrl'

  const fontSizeClass =
    fontSize === 'sm' ? 'text-xs' : fontSize === 'lg' ? 'text-base' : 'text-sm'

  const renderFileContent = () => {
    switch (activeTab) {
      case 'Home.jsx':
        return <HomeFile />
      case 'About.jsx':
        return <AboutFile />
      case 'Projects.js':
        return <ProjectsFile />
      case 'Skills.json':
        return <SkillsFile />
      case 'Experience.json':
        return <ExperienceFile />
      case 'Achievements.md':
        return <AchievementsFile />
      case 'Contact.jsx':
        return <ContactFile />
      case 'README.md':
        return <ReadmeFile />
      case 'secrets.txt':
        return <SecretsFile />
      case 'dev-log.md':
        return <DevLogFile />
      default:
        return (
          <div className="w-full max-w-lg mx-auto py-20 px-4 text-center font-mono space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-danger/20 border border-danger/40 flex items-center justify-center text-danger">
              <FileQuestion size={24} />
            </div>
            <h2 className="text-xl font-bold text-text-main">
              Error: File not found (ENOENT)
            </h2>
            <p className="text-xs text-text-muted leading-relaxed">
              The requested file could not be resolved in the workspace directory.
              Did you mean <button onClick={() => openFile('Projects.js')} className="text-accent underline font-semibold">Projects.js</button>?
            </p>
            <div className="pt-2">
              <button
                onClick={() => openFile('Home.jsx')}
                className="px-4 py-2 rounded-lg bg-accent text-white font-medium text-xs hover:bg-accent/90 transition-colors"
              >
                Return to Home.jsx
              </button>
            </div>
          </div>
        )
    }
  }

  if (!activeTab) {
    return (
      <div className="flex-1 h-full bg-bg flex flex-col items-center justify-center p-6 select-none font-mono text-xs">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-bg-elevated border border-border flex items-center justify-center text-3xl font-extrabold text-accent/50 shadow-inner">
            PJ
          </div>

          <div className="space-y-1">
            <h2 className="text-lg font-bold text-text-main">No Open Tabs</h2>
            <p className="text-xs text-text-muted">
              Choose a file from the explorer or use a shortcut below:
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-bg-elevated/40 space-y-2.5 text-left text-xs">
            <div
              onClick={() => toggleCommandPalette(true)}
              className="flex items-center justify-between p-1.5 rounded hover:bg-bg cursor-pointer text-text-muted hover:text-text-main transition-colors"
            >
              <span>Show All Commands</span>
              <div className="flex items-center gap-1">
                <KeyCap>{modKey}</KeyCap>
                <KeyCap>P</KeyCap>
              </div>
            </div>
            <div
              onClick={() => openFile('Projects.js')}
              className="flex items-center justify-between p-1.5 rounded hover:bg-bg cursor-pointer text-text-muted hover:text-text-main transition-colors"
            >
              <span>Open Projects File</span>
              <div className="flex items-center gap-1">
                <KeyCap>Projects.js</KeyCap>
              </div>
            </div>
            <div
              onClick={() => toggleTerminal(true)}
              className="flex items-center justify-between p-1.5 rounded hover:bg-bg cursor-pointer text-text-muted hover:text-text-main transition-colors"
            >
              <span>Open Integrated Terminal</span>
              <div className="flex items-center gap-1">
                <KeyCap>{modKey}</KeyCap>
                <KeyCap>`</KeyCap>
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={() => openFile('Home.jsx')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-white font-medium hover:bg-accent/90 transition-colors shadow-sm"
            >
              <span>Open Home.jsx</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex-1 h-full flex overflow-hidden bg-bg relative ${fontSizeClass}`}>
      <div
        ref={scrollContainerRef}
        className="flex-1 h-full overflow-y-auto overflow-x-hidden scroll-smooth"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="min-h-full"
          >
            <Suspense fallback={<FileLoadingFallback />}>
              {renderFileContent()}
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </div>

      <Minimap scrollContainerRef={scrollContainerRef} />
    </div>
  )
}
