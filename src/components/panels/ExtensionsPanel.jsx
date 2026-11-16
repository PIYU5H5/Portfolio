import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Headphones,
  GitBranch,
  Code,
  CheckCircle2,
  Star,
  Download,
  Play,
  Pause,
  Volume2,
  ExternalLink,
  Sparkles,
  Sliders,
  ChevronDown,
  ChevronRight,
  FileCode2,
} from 'lucide-react'
import { EXTENSIONS_CATALOG, useExtensionStore } from '../../store/useExtensionStore.js'
import { useAppStore } from '../../store/useAppStore.js'
import { useToastStore } from '../ui/Toast.jsx'

const ICON_MAP = {
  Headphones,
  GitBranch,
  Code,
}

export const ExtensionsPanel = () => {
  const {
    installed,
    toggleExtension,
    isLofiPlaying,
    toggleLofiPlayback,
    lofiVolume,
    setLofiVolume,
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
  } = useExtensionStore()

  const { openFile } = useAppStore()
  const { showToast } = useToastStore()
  const [expandedId, setExpandedId] = useState('leetcode-tracker')

  const installedList = EXTENSIONS_CATALOG.filter((ext) => !!installed[ext.id])
  const recommendedList = EXTENSIONS_CATALOG.filter((ext) => !installed[ext.id])

  const displayedList = (activeTab === 'installed' ? installedList : recommendedList).filter(
    (ext) =>
      ext.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ext.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ext.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleToggle = (ext) => {
    const isCurrentlyInstalled = !!installed[ext.id]
    toggleExtension(ext.id)

    showToast({
      type: isCurrentlyInstalled ? 'info' : 'success',
      title: isCurrentlyInstalled ? `${ext.name} Uninstalled` : `${ext.name} Enabled! 🚀`,
      description: isCurrentlyInstalled
        ? `Extension features disabled.`
        : `Extension is now active in your workspace.`,
    })
  }

  return (
    <div className="h-full flex flex-col font-sans select-none bg-bg-sidebar">
      {/* ================= HEADER BAR ================= */}
      <div className="h-9 px-3 border-b border-border flex items-center justify-between shrink-0 bg-bg-sidebar">
        <span className="font-mono text-[11px] font-bold tracking-wider text-text-main uppercase">
          EXTENSIONS
        </span>
        <span className="text-[10px] font-mono text-accent bg-accent/15 px-1.5 py-0.2 rounded border border-accent/30">
          MARKETPLACE
        </span>
      </div>

      {/* ================= SEARCH INPUT ================= */}
      <div className="p-2 border-b border-border">
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-bg border border-border focus-within:border-accent transition-colors">
          <Search size={13} className="text-text-muted shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Extensions in Marketplace..."
            className="w-full bg-transparent border-none outline-none font-mono text-[11px] text-text-main placeholder:text-text-muted/60"
          />
        </div>
      </div>

      {/* ================= FILTER TABS ================= */}
      <div className="flex items-center px-2 py-1.5 border-b border-border text-xs font-mono gap-1 bg-bg/40">
        <button
          onClick={() => setActiveTab('installed')}
          className={`flex-1 py-1 px-2 rounded text-[11px] font-medium transition-colors text-center ${
            activeTab === 'installed'
              ? 'bg-accent text-white font-semibold'
              : 'text-text-muted hover:text-text-main hover:bg-bg'
          }`}
        >
          Installed ({installedList.length})
        </button>
        <button
          onClick={() => setActiveTab('recommended')}
          className={`flex-1 py-1 px-2 rounded text-[11px] font-medium transition-colors text-center ${
            activeTab === 'recommended'
              ? 'bg-accent text-white font-semibold'
              : 'text-text-muted hover:text-text-main hover:bg-bg'
          }`}
        >
          Recommended ({recommendedList.length})
        </button>
      </div>

      {/* ================= EXTENSIONS LIST ================= */}
      <div className="flex-1 overflow-y-auto divide-y divide-border/60">
        {displayedList.length === 0 ? (
          <div className="p-6 text-center text-text-muted font-mono text-xs space-y-3">
            {activeTab === 'installed' && !searchQuery ? (
              <>
                <p className="text-text-main font-semibold">No extensions installed.</p>
                <p className="text-[11px] text-text-muted leading-relaxed">
                  Browse recommended extensions to install Lofi Focus Mode, GitLens Mini, or LeetCode HUD.
                </p>
                <button
                  onClick={() => setActiveTab('recommended')}
                  className="px-3 py-1.5 rounded-lg bg-accent text-white font-mono text-[11px] font-semibold hover:bg-accent/90 transition-colors shadow-xs"
                >
                  Browse Recommended ({recommendedList.length})
                </button>
              </>
            ) : (
              <>
                <p>No extensions match your filter.</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-accent underline text-[11px]"
                >
                  Clear search
                </button>
              </>
            )}
          </div>
        ) : (
          displayedList.map((ext) => {
            const Icon = ICON_MAP[ext.icon] || Sparkles
            const isInstalled = !!installed[ext.id]
            const isExpanded = expandedId === ext.id

            return (
              <div key={ext.id} className="p-3 hover:bg-bg/40 transition-colors space-y-2.5">
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-bg border border-border flex items-center justify-center text-accent shrink-0 shadow-xs">
                    <Icon size={16} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <div className="flex items-center gap-1 overflow-hidden">
                        <span className="font-bold text-xs text-text-main truncate">{ext.name}</span>
                        <CheckCircle2 size={11} className="text-accent shrink-0" title="Verified Publisher" />
                      </div>
                      <span className="font-mono text-[10px] text-text-muted shrink-0">{ext.version}</span>
                    </div>

                    <p className="font-mono text-[10px] text-text-muted truncate pt-0.5">
                      {ext.publisher}
                    </p>

                    <p className="text-[11px] text-text-muted leading-snug line-clamp-2 pt-1">
                      {ext.tagline}
                    </p>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2 font-mono text-[10px] text-text-muted">
                        <span className="flex items-center gap-0.5">
                          <Download size={10} />
                          {ext.installs}
                        </span>
                        <span className="flex items-center gap-0.5 text-amber-400">
                          <Star size={10} className="fill-current" />
                          {ext.rating}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : ext.id)}
                          className="p-1 rounded text-text-muted hover:text-text-main hover:bg-bg transition-colors"
                          title={isExpanded ? 'Collapse widget' : 'Expand widget details'}
                        >
                          {isExpanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                        </button>

                        <button
                          onClick={() => handleToggle(ext)}
                          className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-medium transition-all shadow-xs ${
                            isInstalled
                              ? 'bg-bg border border-border text-text-muted hover:text-danger hover:border-danger/40'
                              : 'bg-accent text-white hover:bg-accent/90'
                          }`}
                        >
                          {isInstalled ? 'Disable' : 'Install'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ================= EXPANDED SPECIAL FEATURE WIDGET ================= */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden pt-1"
                    >
                      {/* 1. LeetCode Solved HUD */}
                      {ext.id === 'leetcode-tracker' && (
                        <div className="p-3 rounded-lg bg-bg border border-border/80 space-y-2.5 font-mono text-xs">
                          <div className="flex items-center justify-between pb-1 border-b border-border/50 text-[11px]">
                            <span className="text-text-muted font-bold">ALGORITHMIC MASTERY</span>
                            <span className="text-accent font-bold">200+ Solved</span>
                          </div>

                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between text-[10px]">
                              <span className="text-emerald-500 font-semibold">Easy: 80</span>
                              <span className="text-amber-400 font-semibold">Medium: 105</span>
                              <span className="text-rose-400 font-semibold">Hard: 15+</span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-bg-elevated overflow-hidden flex">
                              <div style={{ width: '40%' }} className="h-full bg-emerald-500" />
                              <div style={{ width: '52%' }} className="h-full bg-amber-400" />
                              <div style={{ width: '8%' }} className="h-full bg-rose-400" />
                            </div>
                          </div>

                          <div className="pt-1">
                            <span className="text-[10px] text-text-muted block pb-1">Top Patterns:</span>
                            <div className="flex flex-wrap gap-1">
                              {['Dynamic Prog', 'Trees & Graphs', 'Two Pointers', 'Binary Search'].map((pat) => (
                                <span
                                  key={pat}
                                  className="text-[9px] px-1.5 py-0.5 rounded bg-bg-elevated border border-border text-text-muted"
                                >
                                  {pat}
                                </span>
                              ))}
                            </div>
                          </div>

                          <a
                            href="https://leetcode.com/u/Piyush_op/"
                            target="_blank"
                            rel="noreferrer"
                            className="w-full flex items-center justify-center gap-1.5 py-1 rounded bg-bg-elevated border border-border hover:border-amber-400/50 hover:text-amber-400 text-text-main transition-colors text-[10px]"
                          >
                            <span>Open LeetCode Profile</span>
                            <ExternalLink size={10} />
                          </a>
                        </div>
                      )}

                      {/* 2. Lofi Ambient Synthesizer Player */}
                      {ext.id === 'lofi-mode' && (
                        <div className="p-3 rounded-lg bg-bg border border-border/80 space-y-2.5 font-mono text-xs">
                          <div className="flex items-center justify-between pb-1 border-b border-border/50 text-[11px]">
                            <span className="text-text-muted font-bold">AMBIENT SYNTHESIZER</span>
                            <span className="text-accent text-[10px]">Web Audio API</span>
                          </div>

                          <div className="flex items-center justify-between gap-2">
                            <button
                              onClick={toggleLofiPlayback}
                              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-colors shadow-xs ${
                                isLofiPlaying
                                  ? 'bg-warning text-black hover:bg-warning/90'
                                  : 'bg-accent text-white hover:bg-accent/90'
                              }`}
                            >
                              {isLofiPlaying ? <Pause size={12} /> : <Play size={12} className="fill-current" />}
                              <span>{isLofiPlaying ? 'Pause Ambient' : 'Play Lofi Audio'}</span>
                            </button>
                          </div>

                          {/* Sound wave visualizer pulse */}
                          {isLofiPlaying && (
                            <div className="flex items-center justify-center gap-1 py-1">
                              {[0.4, 0.8, 0.3, 0.9, 0.6, 0.2, 0.7, 0.5].map((h, i) => (
                                <motion.span
                                  key={i}
                                  animate={{ scaleY: [1, h * 2.5, 1] }}
                                  transition={{
                                    duration: 0.6 + i * 0.1,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                  }}
                                  className="w-1 h-3 bg-accent rounded-full origin-bottom"
                                />
                              ))}
                            </div>
                          )}

                          {/* Volume Slider */}
                          <div className="space-y-1 pt-1">
                            <div className="flex items-center justify-between text-[10px] text-text-muted">
                              <span className="flex items-center gap-1">
                                <Volume2 size={11} />
                                <span>Volume</span>
                              </span>
                              <span>{Math.round(lofiVolume * 100)}%</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="1"
                              step="0.05"
                              value={lofiVolume}
                              onChange={(e) => setLofiVolume(parseFloat(e.target.value))}
                              className="w-full accent-accent h-1 bg-bg-elevated rounded cursor-pointer"
                            />
                          </div>
                        </div>
                      )}

                      {/* 3. GitLens Mini Info */}
                      {ext.id === 'gitlens-mini' && (
                        <div className="p-3 rounded-lg bg-bg border border-border/80 space-y-2.5 font-mono text-xs">
                          <div className="flex items-center justify-between pb-1 border-b border-border/50 text-[11px]">
                            <span className="text-text-muted font-bold">INLINE BLAME ACTIVE</span>
                            <span className="text-emerald-500 font-bold">git blame</span>
                          </div>

                          <p className="text-[11px] text-text-muted leading-relaxed font-sans">
                            Just like in VS Code, GitLens is an <strong>editor overlay feature</strong> that attaches live commit history and author annotations directly to code lines:
                          </p>

                          {/* Live interactive sample */}
                          <div className="p-2 rounded bg-bg-elevated/70 border border-border/60 text-[10px] space-y-1">
                            <div className="text-syntax-comment">// Sample code line with GitLens:</div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-syntax-keyword">const</span>
                              <span className="text-syntax-fn">engineer</span>
                              <span className="text-text-muted">=</span>
                              <span className="text-syntax-string">"Piyush"</span>
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded bg-accent/10 border border-accent/20 text-accent font-mono text-[9px]">
                                <GitBranch size={9} />
                                <span>b3c87f • 2 days ago</span>
                              </span>
                            </div>
                          </div>

                          <div className="space-y-1.5 pt-1">
                            <span className="text-[10px] text-text-muted block">Files with active blame annotations:</span>
                            <div className="grid grid-cols-1 gap-1.5">
                              <button
                                onClick={() => openFile('Home.jsx')}
                                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded bg-bg-elevated border border-border hover:border-accent text-text-main text-[11px] transition-colors group"
                              >
                                <span className="flex items-center gap-1.5">
                                  <FileCode2 size={12} className="text-accent" />
                                  <span>Home.jsx (developer.config.js)</span>
                                </span>
                                <span className="text-text-muted text-[10px] group-hover:text-accent">Open →</span>
                              </button>
                              <button
                                onClick={() => openFile('Skills.json')}
                                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded bg-bg-elevated border border-border hover:border-accent text-text-main text-[11px] transition-colors group"
                              >
                                <span className="flex items-center gap-1.5">
                                  <FileCode2 size={12} className="text-accent" />
                                  <span>Skills.json (JSON Code view)</span>
                                </span>
                                <span className="text-text-muted text-[10px] group-hover:text-accent">Open →</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
