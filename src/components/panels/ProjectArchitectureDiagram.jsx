import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Globe,
  Server,
  Database,
  ShieldCheck,
  Cpu,
  Workflow,
  Activity,
  Layers,
  Zap,
  Play,
  Pause,
  RotateCcw,
  Network,
  ArrowRight,
  ArrowDown,
  CheckCircle2,
  Code2,
  Terminal as TerminalIcon,
} from 'lucide-react'
import { PROJECT_ARCHITECTURES } from '../../data/projectArchitectures.js'
import { useThemeStore } from '../../store/useThemeStore.js'

const ICON_MAP = {
  Globe,
  Server,
  Database,
  ShieldCheck,
  Cpu,
  Workflow,
  Activity,
  Layers,
  Zap,
}

export const ProjectArchitectureDiagram = ({ project }) => {
  const reduceMotion = useThemeStore((state) => state.reduceMotion)
  const arch = PROJECT_ARCHITECTURES[project.id] || {
    summary: `${project.title} full-stack modular architecture and service components.`,
    metrics: [
      { label: 'Category', value: project.category },
      { label: 'Tech Count', value: `${project.techStack.length} Technologies` },
      { label: 'Status', value: project.statusChip || 'Active' },
    ],
    nodes: [
      {
        id: 'client',
        layer: 'Client Layer',
        title: 'User Interface',
        tech: project.techStack.slice(0, 2).join(', '),
        protocol: 'HTTPS / TLS 1.3',
        icon: 'Globe',
        role: 'Client-facing presentation and interaction tier.',
        specs: ['Responsive viewports', 'State management', 'Component-driven hierarchy'],
      },
      {
        id: 'compute',
        layer: 'Compute & Logic',
        title: 'Application Service',
        tech: project.techStack.slice(2, 4).join(', ') || 'Service Layer',
        protocol: 'REST / JSON API',
        icon: 'Cpu',
        role: 'Business rules, processing pipelines, and data transformation.',
        specs: ['Input validation', 'Asynchronous processing', 'Error boundaries'],
      },
      {
        id: 'data',
        layer: 'Data Tier',
        title: 'Persistence / Storage',
        tech: project.techStack.slice(4).join(', ') || 'Data Store',
        protocol: 'Database Protocol',
        icon: 'Database',
        role: 'State persistence, indexing, and transactional integrity.',
        specs: ['Persistent storage', 'Schema models', 'Query optimization'],
      },
    ],
    connections: [
      { from: 'client', to: 'compute', label: '1. User Request' },
      { from: 'compute', to: 'data', label: '2. Data Transaction' },
    ],
  }

  const [selectedNodeId, setSelectedNodeId] = useState(arch.nodes[0]?.id || null)
  const [isSimulating, setIsSimulating] = useState(false)
  const [simStep, setSimStep] = useState(0)
  const simTimerRef = useRef(null)

  // Simulation loop
  useEffect(() => {
    if (isSimulating) {
      simTimerRef.current = setInterval(() => {
        setSimStep((prev) => {
          const next = (prev + 1) % arch.nodes.length
          setSelectedNodeId(arch.nodes[next]?.id)
          return next
        })
      }, 1800)
    } else {
      if (simTimerRef.current) clearInterval(simTimerRef.current)
    }

    return () => {
      if (simTimerRef.current) clearInterval(simTimerRef.current)
    }
  }, [isSimulating, arch.nodes])

  const toggleSimulation = () => {
    if (isSimulating) {
      setIsSimulating(false)
    } else {
      setIsSimulating(true)
      setSelectedNodeId(arch.nodes[simStep]?.id)
    }
  }

  const resetSimulation = () => {
    setIsSimulating(false)
    setSimStep(0)
    setSelectedNodeId(arch.nodes[0]?.id)
  }

  const selectedNode = arch.nodes.find((n) => n.id === selectedNodeId) || arch.nodes[0]
  const ActiveIcon = ICON_MAP[selectedNode?.icon] || Layers

  return (
    <div className="space-y-6 font-sans">
      {/* ================= ARCHITECTURE SUMMARY & METRICS ================= */}
      <div className="p-4 rounded-xl border border-accent/25 bg-accent/5 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-accent font-mono text-xs font-semibold">
            <Network size={15} />
            <span>SYSTEM ARCHITECTURE & DATA FLOW BLUEPRINT</span>
          </div>
          <span className="font-mono text-[10px] text-text-muted bg-bg/80 px-2 py-0.5 rounded border border-border/60">
            {arch.nodes.length} Component Tiers
          </span>
        </div>
        <p className="text-xs text-text-main leading-relaxed">{arch.summary}</p>

        {/* Metric Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
          {arch.metrics.map((metric, i) => (
            <div
              key={i}
              className="p-2.5 rounded-lg bg-bg border border-border/80 flex flex-col justify-between shadow-xs"
            >
              <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">
                {metric.label}
              </span>
              <span className="text-xs sm:text-sm font-mono font-bold text-accent pt-0.5">
                {metric.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ================= SIMULATION CONTROLS & STATUS ================= */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-bg border border-border/80">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSimulation}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all shadow-xs ${
              isSimulating
                ? 'bg-warning text-black hover:bg-warning/90'
                : 'bg-accent text-white hover:bg-accent/90'
            }`}
            title={isSimulating ? 'Pause active simulation (WCAG 2.2.2)' : 'Simulate live request flow'}
          >
            {isSimulating ? <Pause size={13} /> : <Play size={13} className="fill-current" />}
            <span>{isSimulating ? 'Pause Simulation' : 'Simulate Data Flow'}</span>
          </button>
          <button
            onClick={resetSimulation}
            className="p-1.5 rounded-lg bg-bg-elevated border border-border hover:border-accent/40 text-text-muted hover:text-text-main transition-colors"
            title="Reset simulation step"
          >
            <RotateCcw size={13} />
          </button>
        </div>

        {/* Live Packet Ticker */}
        <div className="flex items-center gap-2 font-mono text-[11px] text-text-muted">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>
            {isSimulating ? (
              <span className="text-emerald-400 font-medium">
                Pulsing Step {simStep + 1}/{arch.nodes.length}:{' '}
                <strong className="text-text-main">{arch.nodes[simStep]?.title}</strong>
              </span>
            ) : (
              <span>Click any node to inspect layer specifications</span>
            )}
          </span>
        </div>
      </div>

      {/* ================= INTERACTIVE NODE CANVAS ================= */}
      <div className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {arch.nodes.map((node, index) => {
            const NodeIcon = ICON_MAP[node.icon] || Layers
            const isSelected = selectedNode?.id === node.id
            const isCurrentSim = isSimulating && simStep === index

            return (
              <motion.div
                key={node.id}
                layout
                whileHover={reduceMotion ? {} : { scale: 1.02 }}
                whileTap={reduceMotion ? {} : { scale: 0.99 }}
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                onClick={() => {
                  setSelectedNodeId(node.id)
                  if (isSimulating) setSimStep(index)
                }}
                className={`p-3.5 rounded-xl border cursor-pointer select-none transition-all flex flex-col justify-between space-y-2 relative overflow-hidden ${
                  isSelected || isCurrentSim
                    ? 'border-accent bg-bg-elevated shadow-lg shadow-accent/10 ring-1 ring-accent/40'
                    : 'border-border bg-bg/60 hover:bg-bg-elevated hover:border-border/90'
                }`}
              >
                {/* Step badge */}
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-bg border border-border text-text-muted">
                    Tier 0{index + 1}
                  </span>
                  <span className="font-mono text-[10px] text-accent/80 font-medium">
                    {node.layer}
                  </span>
                </div>

                <div className="flex items-start gap-2.5 pt-1">
                  <div
                    className={`p-2 rounded-lg shrink-0 transition-colors ${
                      isSelected || isCurrentSim
                        ? 'bg-accent text-white shadow-xs'
                        : 'bg-bg-elevated border border-border/80 text-text-muted'
                    }`}
                  >
                    <NodeIcon size={16} />
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="font-bold text-xs text-text-main truncate">{node.title}</h4>
                    <p className="font-mono text-[10px] text-text-muted truncate pt-0.5">
                      {node.tech}
                    </p>
                  </div>
                </div>

                <p className="text-[11px] text-text-muted leading-relaxed line-clamp-2 pt-1">
                  {node.role}
                </p>

                {/* Protocol Pill */}
                <div className="pt-2 border-t border-border/40 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-text-muted/70">Protocol</span>
                  <span className="text-accent truncate ml-2 font-medium">{node.protocol}</span>
                </div>

                {/* Active Indicator Bar */}
                {(isSelected || isCurrentSim) && (
                  <motion.div
                    layoutId="activeArchitectureIndicator"
                    className="absolute top-0 left-0 right-0 h-0.5 bg-accent"
                  />
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Directed Pipeline Flow Summary */}
        <div className="p-3 rounded-xl bg-bg-elevated/40 border border-border/60 font-mono text-[11px] overflow-x-auto">
          <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <Workflow size={12} className="text-accent" />
            <span>Sequential Data Pipeline Execution</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-text-main">
            {arch.connections.map((conn, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-bg border border-border/80 text-text-main text-[10px]">
                  {conn.label}
                </span>
                {idx < arch.connections.length - 1 && (
                  <ArrowRight size={12} className="text-accent shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= SELECTED NODE DEEP DIVE INSPECTOR ================= */}
      {selectedNode && (
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedNode.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="p-4 sm:p-5 rounded-xl border border-accent/30 bg-bg-elevated space-y-4 shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-border">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-accent/15 border border-accent/30 text-accent">
                  <ActiveIcon size={16} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-accent uppercase font-bold tracking-wider">
                      {selectedNode.layer}
                    </span>
                    <span className="text-text-muted text-[10px] font-mono">•</span>
                    <span className="font-mono text-[10px] text-text-muted">
                      {selectedNode.protocol}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-text-main">
                    {selectedNode.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-1.5 font-mono text-[10px] px-2.5 py-1 rounded bg-bg border border-border text-text-muted">
                <TerminalIcon size={11} className="text-accent" />
                <span>Tech: {selectedNode.tech}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="font-mono text-xs font-semibold text-text-main flex items-center gap-1.5">
                <Code2 size={13} className="text-accent" />
                <span>Architectural Role & System Purpose</span>
              </h5>
              <p className="text-xs text-text-main/90 leading-relaxed font-sans pl-5">
                {selectedNode.role}
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <h5 className="font-mono text-xs font-semibold text-text-main flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-500" />
                <span>Technical Specifications & Engineering Decisions</span>
              </h5>
              <ul className="space-y-1.5 pl-5">
                {selectedNode.specs.map((spec, sIdx) => (
                  <li
                    key={sIdx}
                    className="text-xs text-text-muted flex items-start gap-2 font-sans"
                  >
                    <span className="text-accent mt-0.5">•</span>
                    <span className="leading-relaxed">{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}
