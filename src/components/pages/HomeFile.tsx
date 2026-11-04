import React from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Download,
  Mail,
  Code,
  Terminal,
  Sparkles,
  Trophy,
  Users,
  Clock,
  Layers,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from '../ui/SocialIcons'
import { PROFILE } from '../../data/profile'
import { useAppStore } from '../../store/useAppStore'
import { useTerminalStore } from '../../store/useTerminalStore'
import { useTypewriter } from '../../hooks/useTypewriter'
import { KeyCap } from '../ui/KeyCap'

export const HomeFile: React.FC = () => {
  const { openFile } = useAppStore()
  const { toggleTerminal } = useTerminalStore()
  const subtitle = useTypewriter(PROFILE.subtitles, 65, 35, 1800)

  const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0
  const modKey = isMac ? '⌘' : 'Ctrl'

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-10 font-sans">
      {/* 1. Code Hero Presentation */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-xl border border-border bg-bg-elevated/70 backdrop-blur-md shadow-xl overflow-hidden"
      >
        <div className="h-8 px-4 border-b border-border bg-bg/50 flex items-center justify-between text-xs font-mono text-text-muted">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-accent/30 border border-accent/60" />
            <span className="text-text-main font-semibold">developer.config.ts</span>
          </div>
          <span className="text-[10px] text-text-muted">TypeScript</span>
        </div>

        <div className="p-5 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">
          <div className="text-syntax-comment">// Meet the engineer behind the keyboard</div>
          <div>
            <span className="text-syntax-keyword">const </span>
            <span className="text-syntax-fn">developer </span>
            <span className="text-text-muted">= </span>
            <span className="text-text-muted">{'{'}</span>
          </div>
          <div className="pl-6 space-y-0.5">
            <div>
              <span className="text-text-main">name</span>
              <span className="text-text-muted">: </span>
              <span className="text-syntax-string">"{PROFILE.name}"</span>
              <span className="text-text-muted">,</span>
            </div>
            <div>
              <span className="text-text-main">role</span>
              <span className="text-text-muted">: </span>
              <span className="text-syntax-string">"{PROFILE.role}"</span>
              <span className="text-text-muted">,</span>
            </div>
            <div>
              <span className="text-text-main">based</span>
              <span className="text-text-muted">: </span>
              <span className="text-syntax-string">"{PROFILE.based}"</span>
              <span className="text-text-muted">,</span>
            </div>
            <div>
              <span className="text-text-main">education</span>
              <span className="text-text-muted">: </span>
              <span className="text-syntax-string">"3rd Year CSE @ RMD Sinhgad, SPPU"</span>
              <span className="text-text-muted">,</span>
            </div>
            <div>
              <span className="text-text-main">status</span>
              <span className="text-text-muted">: </span>
              <span className="text-success font-semibold">"{PROFILE.status}"</span>
              <span className="text-text-muted">,</span>
            </div>
          </div>
          <div>
            <span className="text-text-muted">{'}'}</span>
            <span className="text-text-muted">;</span>
          </div>
        </div>
      </motion.div>

      {/* 2. Headline & Subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05 }}
        className="space-y-3"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent font-mono text-xs">
          <Sparkles size={12} />
          <span>Building high-concurrency systems & scalable web products</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-text-main">
          Hi, I'm <span className="text-accent">{PROFILE.preferredName}</span>.
        </h1>

        <div className="h-8 flex items-center font-mono text-lg sm:text-xl text-text-muted">
          <span>&gt; </span>
          <span className="text-text-main ml-2 font-medium">{subtitle}</span>
          <span className="w-2.5 h-5 ml-1 bg-accent animate-pulse" />
        </div>

        <p className="text-sm sm:text-base text-text-muted max-w-2xl leading-relaxed pt-1">
          {PROFILE.bioSummary}
        </p>
      </motion.div>

      {/* 3. Primary CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-wrap items-center gap-3 pt-1"
      >
        <button
          onClick={() => openFile('Projects.js')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-white font-medium text-xs sm:text-sm hover:bg-accent/90 transition-transform active:scale-95 shadow-md shadow-accent/20"
        >
          <span>View Projects</span>
          <ArrowRight size={15} />
        </button>

        <a
          href="/resume.pdf"
          download="Piyush_Jadhav_Resume.pdf"
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-bg-elevated border border-border text-text-main font-medium text-xs sm:text-sm hover:border-accent/50 transition-colors"
        >
          <Download size={15} className="text-accent" />
          <span>Download Resume</span>
        </a>

        <button
          onClick={() => openFile('Contact.jsx')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-bg-elevated border border-border text-text-main font-medium text-xs sm:text-sm hover:border-accent/50 transition-colors"
        >
          <Mail size={15} className="text-rose-400" />
          <span>Contact Me</span>
        </button>
      </motion.div>

      {/* 4. Social Row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.15 }}
        className="flex items-center gap-4 text-text-muted"
      >
        <span className="text-xs font-mono uppercase tracking-wider text-text-muted/60">Connect:</span>
        <a
          href={PROFILE.socials.github}
          target="_blank"
          rel="noreferrer"
          title="GitHub (@PIYU5H5)"
          className="p-2 rounded-lg bg-bg-elevated border border-border hover:text-accent hover:border-accent/40 transition-colors"
        >
          <GithubIcon size={17} />
        </a>
        <a
          href={PROFILE.socials.linkedin}
          target="_blank"
          rel="noreferrer"
          title="LinkedIn"
          className="p-2 rounded-lg bg-bg-elevated border border-border hover:text-sky-400 hover:border-sky-400/40 transition-colors"
        >
          <LinkedinIcon size={17} />
        </a>
        <a
          href={PROFILE.socials.leetcode}
          target="_blank"
          rel="noreferrer"
          title="LeetCode (@Piyush_op)"
          className="p-2 rounded-lg bg-bg-elevated border border-border hover:text-amber-400 hover:border-amber-400/40 transition-colors"
        >
          <LeetCodeIcon size={17} />
        </a>
        <a
          href={`mailto:${PROFILE.socials.email}`}
          title={`Email: ${PROFILE.socials.email}`}
          className="p-2 rounded-lg bg-bg-elevated border border-border hover:text-rose-400 hover:border-rose-400/40 transition-colors"
        >
          <Mail size={17} />
        </a>
      </motion.div>

      {/* 5. Metrics & Stats Strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2"
      >
        <div className="p-4 rounded-xl border border-border bg-bg-elevated/40 space-y-1">
          <div className="flex items-center gap-2 text-amber-400">
            <Code size={16} />
            <span className="text-xl sm:text-2xl font-bold font-mono text-text-main">
              {PROFILE.stats.leetcodeSolved}
            </span>
          </div>
          <div className="text-[11px] font-mono text-text-muted">LeetCode Solved</div>
        </div>

        <div className="p-4 rounded-xl border border-border bg-bg-elevated/40 space-y-1">
          <div className="flex items-center gap-2 text-accent">
            <Trophy size={16} />
            <span className="text-xl sm:text-2xl font-bold font-mono text-text-main">
              {PROFILE.stats.hackathonFinals}
            </span>
          </div>
          <div className="text-[11px] font-mono text-text-muted">Hackathon Finals</div>
        </div>

        <div className="p-4 rounded-xl border border-border bg-bg-elevated/40 space-y-1">
          <div className="flex items-center gap-2 text-emerald-400">
            <Layers size={16} />
            <span className="text-xl sm:text-2xl font-bold font-mono text-text-main">
              {PROFILE.stats.featuredProjects}
            </span>
          </div>
          <div className="text-[11px] font-mono text-text-muted">Featured Projects</div>
        </div>

        <div className="p-4 rounded-xl border border-border bg-bg-elevated/40 space-y-1">
          <div className="flex items-center gap-2 text-purple-400">
            <Users size={16} />
            <span className="text-xl sm:text-2xl font-bold font-mono text-text-main">
              {PROFILE.stats.participantsHosted}
            </span>
          </div>
          <div className="text-[11px] font-mono text-text-muted">Hackathon Participants</div>
        </div>

        <div className="col-span-2 sm:col-span-1 p-4 rounded-xl border border-border bg-bg-elevated/40 space-y-1">
          <div className="flex items-center gap-2 text-sky-400">
            <Clock size={16} />
            <span className="text-xl sm:text-2xl font-bold font-mono text-text-main">
              {PROFILE.stats.weeklyHoursAutomated}
            </span>
          </div>
          <div className="text-[11px] font-mono text-text-muted">Weekly Work Automated</div>
        </div>
      </motion.div>

      {/* 6. Keyboard & Terminal Hint Card */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="p-3.5 rounded-lg border border-border/80 bg-bg-elevated/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-text-muted"
      >
        <div className="flex items-center gap-2">
          <Terminal size={15} className="text-accent shrink-0" />
          <span>
            Press <KeyCap>{modKey}</KeyCap> <KeyCap>P</KeyCap> to quick-open any file, or click terminal below:
          </span>
        </div>
        <button
          onClick={() => toggleTerminal(true)}
          className="self-start sm:self-auto px-3 py-1 rounded bg-bg border border-border text-text-main hover:border-accent/40 transition-colors"
        >
          Open Fake Shell (Ctrl+`)
        </button>
      </motion.div>
    </div>
  )
}
