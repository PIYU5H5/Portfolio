import { motion } from 'framer-motion'
import {
  GraduationCap,
  Briefcase,
  Trophy,
  BookOpen,
  Coffee,
  Calendar,
  Activity,
  Gamepad2,
  Sparkles,
  Heart,
} from 'lucide-react'
import { PROFILE } from '../../data/profile.js'
import { EXPERIENCES } from '../../data/experience.js'
import { Badge } from '../ui/Badge.jsx'

export const AboutFile = () => {
  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-10 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3"
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-main">
          About & <span className="text-accent">Background</span>
        </h1>
        <p className="text-sm sm:text-base text-text-muted leading-relaxed max-w-3xl">
          {PROFILE.professionalSummary}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="p-5 sm:p-6 rounded-xl border border-border bg-bg-elevated/60 backdrop-blur-sm space-y-4 shadow-sm"
      >
        <div className="flex items-center gap-2.5 text-accent font-mono font-semibold text-sm">
          <GraduationCap size={18} />
          <span>FORMAL EDUCATION & ACADEMIC RECORD</span>
        </div>

        <div className="space-y-1">
          <h3 className="text-lg font-bold text-text-main">{PROFILE.education.college}</h3>
          <p className="text-sm text-text-muted font-mono">{PROFILE.education.university}</p>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Badge variant="accent">{PROFILE.education.degree}</Badge>
            <Badge variant="muted">{PROFILE.education.period}</Badge>
            <Badge variant="success">Expected Grad: {PROFILE.education.expectedGraduation}</Badge>
          </div>
        </div>

        <div className="pt-2 border-t border-border/80">
          <h4 className="text-xs font-mono font-bold text-text-muted uppercase tracking-wider mb-3">
            Academic Performance (Semester Grades)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PROFILE.education.semesters.map((s) => {
              const percent = (s.sgpa / 10) * 100
              return (
                <div key={s.sem} className="p-3 rounded-lg bg-bg border border-border space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-text-muted">{s.sem}</span>
                    <span className="font-bold text-accent">{s.sgpa.toFixed(2)} / 10.00</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-bg-elevated overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percent}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full bg-accent rounded-full"
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-2.5 text-accent font-mono font-semibold text-sm">
          <Briefcase size={18} />
          <span>PROFESSIONAL WORK EXPERIENCE</span>
        </div>

        <div className="space-y-4">
          {EXPERIENCES.map((exp) => (
            <div
              key={exp.id}
              className={`p-5 rounded-xl border bg-bg-elevated/40 space-y-3 transition-colors ${
                exp.isCurrent
                  ? 'border-l-4 border-l-accent border-border shadow-md'
                  : 'border-l-4 border-l-border border-border'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-text-main flex items-center gap-2">
                    <span>{exp.role}</span>
                    {exp.isCurrent && <Badge variant="success" size="sm">Present</Badge>}
                  </h3>
                  <div className="text-xs text-text-muted font-mono flex items-center gap-2 mt-0.5">
                    <span className="font-medium text-text-main">{exp.company}</span>
                    <span>·</span>
                    <span>{exp.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-text-muted">
                  <Calendar size={13} />
                  <span>{exp.period}</span>
                </div>
              </div>

              <ul className="space-y-1.5 text-xs sm:text-sm text-text-muted leading-relaxed">
                {exp.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-accent mt-1 shrink-0">▹</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {exp.techStack.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-bg border border-border text-text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="p-5 sm:p-6 rounded-xl border border-border bg-bg-elevated/60 backdrop-blur-sm space-y-3"
      >
        <div className="flex items-center gap-2.5 text-accent font-mono font-semibold text-sm">
          <Trophy size={18} />
          <span>LEADERSHIP & CAMPUS IMPACT</span>
        </div>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-base font-bold text-text-main">{PROFILE.leadership.role}</h3>
            <span className="text-xs font-mono text-text-muted">{PROFILE.leadership.period}</span>
          </div>
          <div className="text-xs text-text-muted font-mono mt-0.5">{PROFILE.leadership.organization}</div>
        </div>

        <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
          {PROFILE.leadership.description}
        </p>

        <div className="flex items-center gap-2 pt-1">
          <span className="text-xs font-mono text-text-muted">Flagship Initiative:</span>
          <a
            href="https://elvion26.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-mono font-semibold text-accent hover:underline"
          >
            {PROFILE.leadership.event} (elvion26.vercel.app)
          </a>
        </div>
      </motion.div>

      {/* Continuous Learning */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-5 sm:p-6 rounded-xl border border-border bg-bg-elevated/40 space-y-2.5"
      >
        <div className="flex items-center gap-2 text-accent font-mono font-semibold text-xs">
          <BookOpen size={16} />
          <span>CONTINUOUS LEARNING & COHORTS</span>
        </div>
        <h4 className="font-bold text-text-main text-sm">{PROFILE.continuousLearning.institute}</h4>
        <p className="text-xs text-text-muted font-mono">{PROFILE.continuousLearning.program}</p>
        <div className="text-[11px] font-mono text-text-muted">
          Target Completion: {PROFILE.continuousLearning.expectedCompletion}
        </div>
      </motion.div>

      {/* Beyond the Code & Personal Interests */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="p-5 sm:p-6 rounded-xl border border-border bg-bg-elevated/60 backdrop-blur-sm space-y-5 shadow-sm"
      >
        <div className="flex items-center gap-2 text-rose-400 font-mono font-semibold text-sm">
          <Heart size={17} />
          <span>BEYOND THE CODE & DISCIPLINE</span>
        </div>

        <div className="space-y-2 text-xs sm:text-sm text-text-muted leading-relaxed">
          {PROFILE.beyondCode.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2.5">
              <span className="text-accent mt-0.5 shrink-0">▸</span>
              <span className="text-text-main/90">{item}</span>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-border/80 space-y-3">
          <h4 className="text-xs font-mono font-bold text-text-muted uppercase tracking-wider">
            Personal Interests & Activities
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PROFILE.interests.map((group) => (
              <div
                key={group.category}
                className="p-3.5 rounded-lg bg-bg border border-border hover:border-accent/40 transition-colors space-y-2"
              >
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-accent">
                  {group.category === 'Sports' && <Trophy size={13} />}
                  {group.category === 'Fitness' && <Activity size={13} />}
                  {group.category === 'Gaming' && <Gamepad2 size={13} />}
                  {group.category === 'Narrative' && <Sparkles size={13} />}
                  <span>{group.category.toUpperCase()}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-bg-elevated text-text-main border border-border/60"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-text-muted leading-tight pt-1">
                  {group.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

