import React from 'react'
import { motion } from 'framer-motion'
import { GitBranch, Check, X, GitCommit } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { useToastStore } from '../ui/Toast'

export const GitBranchesModal: React.FC = () => {
  const { isGitBranchesOpen, toggleGitBranches } = useAppStore()
  const { showToast } = useToastStore()

  if (!isGitBranchesOpen) return null

  const branches = [
    { name: 'main', isCurrent: true, commits: '38 commits ahead', updated: 'Just now' },
    { name: 'feature/internship-2026', isCurrent: false, commits: 'Indux Tech features', updated: '2 days ago' },
    { name: 'feature/autonomous-agents', isCurrent: false, commits: 'n8n & OpenAI pipelines', updated: '1 week ago' },
    { name: 'feature/sppu-unidb-lab', isCurrent: false, commits: 'DBMS practical simulator', updated: '2 weeks ago' },
    { name: 'dev', isCurrent: false, commits: 'Local staging branch', updated: '3 hours ago' },
  ]

  const handleSelect = (name: string) => {
    toggleGitBranches(false)
    showToast({
      type: 'info',
      title: `Switched to branch: ${name}`,
      description: 'Clean working tree. All systems ready for deployment.',
    })
  }

  return (
    <div
      onClick={() => toggleGitBranches(false)}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-start justify-start p-3 sm:pt-14 sm:pl-16 select-none"
    >
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm bg-bg-elevated border border-border rounded-lg shadow-2xl overflow-hidden font-mono text-xs"
      >
        <div className="h-8 px-3 border-b border-border bg-bg/50 flex items-center justify-between text-text-muted">
          <div className="flex items-center gap-1.5 font-semibold text-text-main text-[11px]">
            <GitBranch size={13} className="text-accent" />
            <span>Select Git Branch</span>
          </div>
          <button
            onClick={() => toggleGitBranches(false)}
            className="hover:text-text-main transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        <div className="p-1 space-y-0.5 max-h-60 overflow-y-auto">
          {branches.map((b) => (
            <button
              key={b.name}
              onClick={() => handleSelect(b.name)}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-left transition-colors ${
                b.isCurrent
                  ? 'bg-accent/15 text-accent font-semibold border border-accent/30'
                  : 'hover:bg-bg text-text-main'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <GitCommit size={13} className={b.isCurrent ? 'text-accent' : 'text-text-muted'} />
                <span className="truncate">{b.name}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-text-muted shrink-0">
                <span>{b.updated}</span>
                {b.isCurrent && <Check size={13} className="text-accent" />}
              </div>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
