import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Calendar,
  Building,
  MapPin,
  CheckCircle2,
} from 'lucide-react'
import { EXPERIENCES } from '../../data/experience.js'
import { Badge } from '../ui/Badge.jsx'

export const ExperienceFile = () => {
  const [viewMode, setViewMode] = useState('cards')

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-8 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-border select-none">
        <div>
          <div className="font-mono text-xs text-syntax-comment">// Professional internships & software engineering roles</div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-text-main">
            Work <span className="text-accent">Experience</span>
          </h1>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-bg-elevated border border-border self-start sm:self-auto font-mono text-xs">
          <button
            onClick={() => setViewMode('cards')}
            className={`px-3 py-1 rounded transition-colors ${
              viewMode === 'cards'
                ? 'bg-accent text-white font-semibold'
                : 'text-text-muted hover:text-text-main'
            }`}
          >
            Timeline Cards
          </button>
          <button
            onClick={() => setViewMode('json')}
            className={`px-3 py-1 rounded transition-colors ${
              viewMode === 'json'
                ? 'bg-accent text-white font-semibold'
                : 'text-text-muted hover:text-text-main'
            }`}
          >
            JSON Raw
          </button>
        </div>
      </div>

      {viewMode === 'cards' ? (
        <div className="space-y-6">
          {EXPERIENCES.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-6 rounded-xl border bg-bg-elevated/50 backdrop-blur-sm space-y-4 shadow-sm ${
                exp.isCurrent
                  ? 'border-l-4 border-l-accent border-border shadow-lg shadow-accent/5'
                  : 'border-l-4 border-l-border border-border'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg font-bold text-text-main flex items-center gap-2">
                    <span>{exp.role}</span>
                    {exp.isCurrent && <Badge variant="success" size="sm">Present</Badge>}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-text-muted font-mono mt-1">
                    <span className="font-semibold text-text-main flex items-center gap-1">
                      <Building size={13} className="text-accent" />
                      {exp.company}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <MapPin size={13} />
                      {exp.location}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-text-muted">
                  <Calendar size={13} />
                  <span>{exp.period}</span>
                </div>
              </div>

              <ul className="space-y-2 text-xs sm:text-sm text-text-muted leading-relaxed">
                {exp.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2.5">
                    <CheckCircle2 size={15} className="text-accent mt-0.5 shrink-0" />
                    <span className="text-text-main/90">{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-border/60">
                <span className="text-[11px] font-mono text-text-muted mr-1">Stack:</span>
                {exp.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-bg border border-border text-text-main"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="p-6 rounded-xl border border-border bg-bg-elevated/40 font-mono text-xs overflow-x-auto">
          <pre className="text-text-main leading-relaxed">
            {JSON.stringify(EXPERIENCES, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}

