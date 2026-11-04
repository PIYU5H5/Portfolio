import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Code2,
  BarChart3,
  ChevronDown,
  ChevronRight,
} from 'lucide-react'
import { SKILLS_DATA, SKILL_CATEGORIES_METADATA } from '../../data/skills'

export const SkillsFile: React.FC = () => {
  const [viewMode, setViewMode] = useState<'code' | 'chart'>('code')
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({})

  const toggleGroup = (key: string) => {
    setCollapsedGroups((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const jsonKeys = Object.keys(SKILLS_DATA) as (keyof typeof SKILLS_DATA)[]

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-6 font-mono text-xs">
      {/* Top Header & View Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-border select-none">
        <div>
          <div className="text-syntax-comment">// Technical competency schema & framework proficiency</div>
          <h1 className="text-xl sm:text-2xl font-bold font-sans text-text-main">
            Skills & <span className="text-accent">Technologies</span>
          </h1>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-bg-elevated border border-border self-start sm:self-auto">
          <button
            onClick={() => setViewMode('code')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs transition-colors ${
              viewMode === 'code'
                ? 'bg-accent text-white font-semibold shadow-xs'
                : 'text-text-muted hover:text-text-main'
            }`}
          >
            <Code2 size={13} />
            <span>JSON Code</span>
          </button>
          <button
            onClick={() => setViewMode('chart')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs transition-colors ${
              viewMode === 'chart'
                ? 'bg-accent text-white font-semibold shadow-xs'
                : 'text-text-muted hover:text-text-main'
            }`}
          >
            <BarChart3 size={13} />
            <span>Proficiency View</span>
          </button>
        </div>
      </div>

      {/* Mode 1: Interactive JSON Code View with Folding & Line Numbers */}
      {viewMode === 'code' ? (
        <div className="rounded-xl border border-border bg-bg-elevated/40 backdrop-blur-sm p-4 sm:p-6 overflow-x-auto shadow-sm">
          <div className="text-syntax-comment mb-2">// Skills.json</div>
          <div className="text-text-muted">{'{'}</div>

          <div className="pl-4 sm:pl-6 space-y-3">
            {jsonKeys.map((groupKey, idx) => {
              const isCollapsed = !!collapsedGroups[groupKey]
              const items = SKILLS_DATA[groupKey]
              const isLast = idx === jsonKeys.length - 1

              return (
                <div key={groupKey} className="space-y-1">
                  <div
                    onClick={() => toggleGroup(groupKey)}
                    className="flex items-center gap-1 text-text-main hover:bg-bg-elevated/80 px-1 py-0.5 rounded cursor-pointer select-none transition-colors w-fit"
                  >
                    <span className="text-text-muted">
                      {isCollapsed ? <ChevronRight size={13} /> : <ChevronDown size={13} />}
                    </span>
                    <span className="text-syntax-type font-semibold">"{groupKey}"</span>
                    <span className="text-text-muted">: [</span>
                    {isCollapsed && (
                      <span className="text-text-muted/60 text-[11px] ml-1">
                        ... {items.length} items ]{isLast ? '' : ','}
                      </span>
                    )}
                  </div>

                  {!isCollapsed && (
                    <div className="pl-6 space-y-0.5">
                      {items.map((item, itemIdx) => {
                        const isItemLast = itemIdx === items.length - 1
                        return (
                          <div key={item} className="flex items-center gap-2 group py-0.5">
                            <span className="text-syntax-string">"{item}"</span>
                            <span className="text-text-muted">{isItemLast ? '' : ','}</span>
                          </div>
                        )
                      })}
                      <div className="text-text-muted">]{isLast ? '' : ','}</div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="text-text-muted">{'}'}</div>
        </div>
      ) : (
        /* Mode 2: Proficiency Chart View */
        <div className="space-y-6">
          {SKILL_CATEGORIES_METADATA.map((cat) => (
            <div
              key={cat.key}
              className="p-5 rounded-xl border border-border bg-bg-elevated/40 space-y-4 shadow-sm"
            >
              <div className="flex items-center justify-between pb-2 border-b border-border/60">
                <h3 className="font-sans font-bold text-base text-text-main flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <span>{cat.name}</span>
                </h3>
                <span className="text-[11px] text-text-muted uppercase tracking-wider">
                  {cat.skills.length} skills listed
                </span>
              </div>

              <div className="space-y-3">
                {cat.skills.map((skill) => (
                  <div key={skill.name} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-text-main">{skill.name}</span>
                      <span className="text-text-muted">{skill.level}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-bg overflow-hidden border border-border/50">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="h-full bg-accent rounded-full"
                      />
                    </div>
                    <div className="text-[11px] text-text-muted leading-relaxed font-sans pt-0.5">
                      {skill.context}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
