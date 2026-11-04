import { motion } from 'framer-motion'
import {
  Trophy,
  Star,
  CheckCircle2,
  Calendar,
} from 'lucide-react'
import { ACHIEVEMENTS } from '../../data/achievements.js'
import { Badge } from '../ui/Badge.jsx'

export const AchievementsFile = () => {
  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-8 font-sans">
      <div className="space-y-2 pb-4 border-b border-border">
        <div className="font-mono text-xs text-text-muted flex items-center gap-2">
          <span>#</span>
          <span>docs/Achievements.md</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-main">
          Honors & <span className="text-accent">Achievements</span>
        </h1>
        <p className="text-sm text-text-muted leading-relaxed font-mono">
          Hackathon podiums, competitive programming milestones, and technical community leadership.
        </p>
      </div>

      <div className="p-4 rounded-xl border-l-4 border-l-accent border-border bg-bg-elevated/40 text-xs sm:text-sm text-text-main/90 leading-relaxed font-mono">
        &gt; "Competed in high-stakes hackathons across national and international stages, advancing to global on-site finals in San Francisco with AMD &amp; lablab.ai, qualifying for Smart India Hackathon 2025, and consistently solving algorithmic challenges on LeetCode."
      </div>

      <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2 sm:before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-border">
        {ACHIEVEMENTS.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.06 }}
            className="relative space-y-2"
          >
            <div
              className={`absolute -left-6 sm:-left-8 top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center bg-bg shadow-sm ${
                item.highlight
                  ? 'border-accent text-accent'
                  : 'border-border text-text-muted'
              }`}
            >
              {item.category === 'Hackathon' ? (
                <Trophy size={11} />
              ) : item.category === 'Certification' ? (
                <CheckCircle2 size={11} />
              ) : (
                <Star size={11} />
              )}
            </div>

            <div className="p-4 sm:p-5 rounded-xl border border-border bg-bg-elevated/50 hover:border-accent/40 transition-colors space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base text-text-main">{item.title}</h3>
                  <Badge variant={item.highlight ? 'accent' : 'muted'} size="sm">
                    {item.badgeText}
                  </Badge>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-text-muted">
                  <Calendar size={12} />
                  <span>{item.date}</span>
                </div>
              </div>

              <div className="text-xs font-mono font-medium text-accent">
                {item.organization}
              </div>

              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

