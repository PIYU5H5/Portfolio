import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  ExternalLink,
  ArrowUpRight,
} from 'lucide-react'
import { GithubIcon } from '../ui/SocialIcons.jsx'
import { PROJECTS } from '../../data/projects.js'
import { useAppStore } from '../../store/useAppStore.js'
import { Badge } from '../ui/Badge.jsx'

export const ProjectsFile = () => {
  const { selectProjectDetail } = useAppStore()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = ['All', 'Full-Stack', 'AI', 'Automation', 'Visualizers', 'Hackathon']

  const filtered = PROJECTS.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory
    const q = searchQuery.toLowerCase().trim()
    const matchesSearch =
      !q ||
      project.title.toLowerCase().includes(q) ||
      project.oneLiner.toLowerCase().includes(q) ||
      project.techStack.some((t) => t.toLowerCase().includes(q))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-8 font-sans">
      <div className="space-y-1">
        <div className="font-mono text-xs text-syntax-comment">
          // Production applications, autonomous pipelines & machine learning engines
        </div>
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-text-muted">
          <span className="text-syntax-keyword">const </span>
          <span className="text-syntax-fn">featuredProjects </span>
          <span>= [</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-main pt-1">
          Engineering <span className="text-accent">Projects</span>
        </h1>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                selectedCategory === cat
                  ? 'bg-accent text-white border-accent shadow-sm font-semibold'
                  : 'bg-bg-elevated/70 border-border text-text-muted hover:text-text-main hover:border-accent/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-64 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg-elevated border border-border focus-within:border-accent transition-colors">
          <Search size={14} className="text-text-muted shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by tech..."
            className="w-full bg-transparent border-none outline-none font-mono text-xs text-text-main placeholder:text-text-muted/60"
          />
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <AnimatePresence>
          {filtered.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={() => selectProjectDetail(project.id)}
              className="group relative flex flex-col justify-between p-5 rounded-xl border border-border bg-bg-elevated/50 hover:bg-bg-elevated hover:border-accent/50 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-1"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="accent" size="sm">{project.category}</Badge>
                    {project.statusChip && <Badge variant="success" size="sm">{project.statusChip}</Badge>}
                    {project.isWip && <Badge variant="warning" size="sm">WIP</Badge>}
                  </div>
                  <span className="text-[11px] font-mono text-text-muted">{project.period}</span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-text-main group-hover:text-accent transition-colors flex items-center justify-between">
                    <span>{project.title}</span>
                    <ArrowUpRight size={16} className="text-text-muted group-hover:text-accent transition-colors" />
                  </h3>
                  <p className="text-xs text-text-muted font-mono mt-1.5 leading-relaxed line-clamp-2">
                    {project.oneLiner}
                  </p>
                </div>

                <p className="text-xs text-text-main/80 leading-relaxed line-clamp-3">
                  {project.solution}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-border/60 flex items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-bg border border-border text-text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 text-text-muted">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1 rounded text-text-muted hover:text-text-main transition-colors"
                      title="GitHub Repository"
                    >
                      <GithubIcon size={15} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1 rounded text-text-muted hover:text-accent transition-colors"
                      title="Live Demo"
                    >
                      <ExternalLink size={15} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="font-mono text-xs text-text-muted pt-4">
        <span>]</span>
        <span className="text-syntax-comment"> // Total projects listed: {filtered.length}</span>
      </div>
    </div>
  )
}

