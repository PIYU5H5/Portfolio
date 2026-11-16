import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  ExternalLink,
  Calendar,
  AlertCircle,
  Lightbulb,
  Zap,
  Network,
  FileText,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons.jsx'
import { useAppStore } from '../../store/useAppStore.js'
import { PROJECTS } from '../../data/projects.js'
import { Badge } from '../ui/Badge.jsx'
import { ProjectArchitectureDiagram } from './ProjectArchitectureDiagram.jsx'

export const ProjectDetailModal = () => {
  const {
    selectedProjectDetailId,
    selectProjectDetail,
    selectedProjectModalTab,
    setSelectedProjectModalTab,
  } = useAppStore()

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        selectProjectDetail(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectProjectDetail])

  if (!selectedProjectDetailId) return null

  const project = PROJECTS.find((p) => p.id === selectedProjectDetailId)
  if (!project) return null

  const activeTab = selectedProjectModalTab || 'spec'

  return (
    <div
      onClick={() => selectProjectDetail(null)}
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-end select-text"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <motion.div
        initial={{ x: '100%', opacity: 0.5 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0.5 }}
        transition={{ type: 'spring', damping: 26, stiffness: 280 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl lg:max-w-3xl h-full bg-bg-elevated border-l border-border shadow-2xl flex flex-col font-sans overflow-hidden"
      >
        {/* Header Bar */}
        <div className="h-12 px-5 sm:px-6 border-b border-border bg-bg/60 flex items-center justify-between shrink-0 select-none">
          <div className="flex items-center gap-2 overflow-hidden mr-2">
            <span className="font-mono text-xs text-text-muted shrink-0 hidden sm:inline">PROJECT SPEC</span>
            <span className="text-text-muted shrink-0 hidden sm:inline">/</span>
            <span className="font-mono text-xs font-semibold text-accent truncate">{project.title}</span>
          </div>
          <button
            onClick={() => selectProjectDetail(null)}
            className="p-1.5 rounded-lg text-text-muted hover:text-text-main hover:bg-bg transition-colors shrink-0"
            title="Close dialog (Esc)"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex items-center px-4 sm:px-6 border-b border-border bg-bg/40 text-xs font-mono select-none gap-2">
          <button
            onClick={() => setSelectedProjectModalTab('spec')}
            className={`py-2.5 px-3 border-b-2 font-medium flex items-center gap-1.5 transition-colors relative ${
              activeTab === 'spec'
                ? 'text-accent border-accent font-semibold'
                : 'text-text-muted hover:text-text-main border-transparent'
            }`}
          >
            <FileText size={13} />
            <span>Problem & Impact Spec</span>
            {activeTab === 'spec' && (
              <motion.div
                layoutId="modalSubTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
              />
            )}
          </button>

          <button
            onClick={() => setSelectedProjectModalTab('architecture')}
            className={`py-2.5 px-3 border-b-2 font-medium flex items-center gap-1.5 transition-colors relative ${
              activeTab === 'architecture'
                ? 'text-accent border-accent font-semibold'
                : 'text-text-muted hover:text-text-main border-transparent'
            }`}
          >
            <Network size={13} />
            <span>System Architecture</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/30 hidden sm:inline font-bold">
              Interactive
            </span>
            {activeTab === 'architecture' && (
              <motion.div
                layoutId="modalSubTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
              />
            )}
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          <AnimatePresence mode="wait">
            {activeTab === 'spec' ? (
              <motion.div
                key="spec-tab"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Badge variant="accent">{project.category}</Badge>
                    {project.statusChip && <Badge variant="success">{project.statusChip}</Badge>}
                    {project.isWip && <Badge variant="warning">In Development</Badge>}
                    <div className="flex items-center gap-1 text-xs text-text-muted font-mono ml-auto">
                      <Calendar size={13} />
                      <span>{project.period}</span>
                    </div>
                  </div>
                  <h2 id="modal-project-title" className="text-2xl font-bold text-text-main tracking-tight mt-1">
                    {project.title}
                  </h2>
                  <p className="text-sm text-text-muted mt-2 font-mono leading-relaxed">{project.oneLiner}</p>
                </div>

                {/* Action Links */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent text-white font-medium text-xs hover:bg-accent/90 transition-colors shadow-sm"
                    >
                      <span>Live Demo</span>
                      <ExternalLink size={13} />
                    </a>
                  )}
                  {project.linkedInUrl && (
                    <a
                      href={project.linkedInUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0077b5]/15 border border-[#0077b5]/40 text-[#0077b5] dark:text-[#38bdf8] font-medium text-xs hover:bg-[#0077b5]/25 transition-colors shadow-sm"
                    >
                      <LinkedinIcon size={14} />
                      <span>LinkedIn Demo</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-bg border border-border text-text-main font-medium text-xs hover:border-accent/50 transition-colors"
                    >
                      <GithubIcon size={14} />
                      <span>Source Code</span>
                    </a>
                  )}
                  {project.isPrivateRepo && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg border border-border text-text-muted font-mono text-xs">
                      <span>🔒 Private Organization Repo</span>
                    </span>
                  )}
                  {project.sourceNote && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg border border-border text-text-muted font-mono text-xs">
                      <span>📄 {project.sourceNote}</span>
                    </span>
                  )}

                  {/* Quick link to switch to architecture */}
                  <button
                    onClick={() => setSelectedProjectModalTab('architecture')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/30 text-accent font-medium text-xs hover:bg-accent/20 transition-colors"
                  >
                    <Network size={13} />
                    <span>View Architecture Blueprint</span>
                  </button>
                </div>

                {/* Problem, Solution, Impact Cards */}
                <div className="space-y-4 pt-2">
                  <div className="p-4 rounded-xl border border-danger/30 bg-danger/5 space-y-1.5">
                    <div className="flex items-center gap-2 text-danger font-semibold text-xs font-mono">
                      <AlertCircle size={15} />
                      <span>THE BOTTLENECK / PROBLEM STATEMENT</span>
                    </div>
                    <p className="text-xs text-text-main leading-relaxed pl-5">{project.problem}</p>
                  </div>

                  <div className="p-4 rounded-xl border border-accent/30 bg-accent/5 space-y-1.5">
                    <div className="flex items-center gap-2 text-accent font-semibold text-xs font-mono">
                      <Lightbulb size={15} />
                      <span>ENGINEERING SOLUTION & ARCHITECTURE</span>
                    </div>
                    <p className="text-xs text-text-main leading-relaxed pl-5">{project.solution}</p>
                  </div>

                  <div className="p-4 rounded-xl border border-success/30 bg-success/5 space-y-1.5">
                    <div className="flex items-center gap-2 text-success font-semibold text-xs font-mono">
                      <Zap size={15} />
                      <span>QUANTIFIED BUSINESS & SYSTEM IMPACT</span>
                    </div>
                    <p className="text-xs text-text-main leading-relaxed pl-5">{project.impact}</p>
                  </div>

                  {project.posts && project.posts.length > 0 && (
                    <div className="p-4 rounded-xl border border-sky-500/30 bg-sky-500/5 space-y-3">
                      <div className="flex items-center gap-2 text-sky-400 font-semibold text-xs font-mono">
                        <LinkedinIcon size={15} />
                        <span>PUBLISHED DEMOS & LINKEDIN CASE STUDIES</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {project.posts.map((post, idx) => (
                          <a
                            key={idx}
                            href={post.url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-between p-2.5 rounded-lg bg-bg border border-border hover:border-sky-500/50 hover:bg-bg-elevated transition-colors text-xs text-text-main group"
                          >
                            <span className="font-medium text-text-main group-hover:text-sky-400 transition-colors">
                              {post.title}
                            </span>
                            <ExternalLink size={13} className="text-text-muted group-hover:text-sky-400 shrink-0 ml-2" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Tech Stack List */}
                <div>
                  <h4 className="text-xs font-mono font-bold text-text-muted uppercase tracking-wider mb-2.5">
                    Technologies & Infrastructure
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs font-mono rounded-md bg-bg border border-border text-text-main"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="architecture-tab"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectArchitectureDiagram project={project} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Bar */}
        <div className="h-12 px-5 sm:px-6 border-t border-border bg-bg/50 flex items-center justify-between shrink-0 select-none">
          <span className="text-[11px] font-mono text-text-muted">Press Esc to close</span>
          <button
            onClick={() => selectProjectDetail(null)}
            className="px-3 py-1.5 rounded-md bg-bg border border-border text-xs text-text-muted hover:text-text-main transition-colors font-mono"
          >
            Close Spec
          </button>
        </div>
      </motion.div>
    </div>
  )
}
