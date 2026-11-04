import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FastForward, Terminal as TerminalIcon } from 'lucide-react'

const BOOT_STEPS = [
  {
    type: 'command',
    prompt: '~/workspace',
    command: 'git clone https://github.com/PIYU5H5/portfolio.git',
    delay: 250,
  },
  {
    type: 'output',
    text: "Cloning into 'portfolio'...\nremote: Enumerating objects: 100% (342/342), done.\nremote: Total 342 (delta 184), reused 320 (delta 172)",
    color: 'text-slate-400',
    delay: 350,
  },
  {
    type: 'command',
    prompt: '~/workspace/portfolio',
    command: 'npm install',
    delay: 300,
  },
  {
    type: 'output',
    text: 'added 68 packages, and audited 69 packages in 520ms\n✓ 0 vulnerabilities found',
    color: 'text-emerald-400',
    delay: 400,
  },
  {
    type: 'command',
    prompt: '~/workspace/portfolio',
    command: 'npm run build',
    delay: 300,
  },
  {
    type: 'output',
    text: 'vite v8.3.5 building for production...\n✓ 2521 modules transformed in 380ms',
    color: 'text-emerald-400',
    delay: 350,
  },
  {
    type: 'command',
    prompt: '~/workspace/portfolio',
    command: 'npm run dev',
    delay: 300,
  },
  {
    type: 'output',
    text: '  VITE v8.3.5  ready in 180 ms\n  ➜  Local:   http://localhost:3000/\n  ✨ Launching Piyush Jadhav\'s VS Code Workspace...',
    color: 'text-cyan-400 font-semibold',
    delay: 500,
  },
]

export const TerminalBootScreen = ({ onComplete }) => {
  const [visibleStep, setVisibleStep] = useState(0)
  const [isSkipping, setIsSkipping] = useState(false)

  // Advance through steps
  useEffect(() => {
    if (visibleStep >= BOOT_STEPS.length) {
      const exitTimer = setTimeout(() => {
        onComplete()
      }, 500)
      return () => clearTimeout(exitTimer)
    }

    const currentStep = BOOT_STEPS[visibleStep]
    const timer = setTimeout(() => {
      setVisibleStep((prev) => prev + 1)
    }, currentStep.delay)

    return () => clearTimeout(timer)
  }, [visibleStep, onComplete])

  // Allow Esc key to skip immediately
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleSkip()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleSkip = () => {
    setIsSkipping(true)
    setTimeout(() => {
      onComplete()
    }, 150)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 bg-[#05070a] flex items-center justify-center p-3 sm:p-6 font-mono text-xs select-none"
      >
        <div className="w-full max-w-2xl bg-[#0b0f14] border border-[#21262d] rounded-xl shadow-2xl overflow-hidden flex flex-col">
          {/* Terminal Window Header */}
          <div className="h-10 px-4 bg-[#11161f] border-b border-[#21262d] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-sm" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-sm" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-sm" />
              <span className="ml-2 text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
                <TerminalIcon size={12} className="text-[#2f81f7]" />
                piyush@workspace: ~/portfolio
              </span>
            </div>

            <button
              onClick={handleSkip}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#1c2331] hover:bg-[#252f42] text-slate-300 hover:text-white transition-colors text-[10px] border border-[#2d384e]"
              title="Skip intro animation"
            >
              <span>Skip</span>
              <FastForward size={11} />
              <span className="text-slate-500 text-[9px] hidden sm:inline">[ESC]</span>
            </button>
          </div>

          {/* Terminal Output Area */}
          <div className="p-4 sm:p-5 space-y-3 min-h-[320px] max-h-[70vh] overflow-y-auto text-left leading-relaxed">
            {BOOT_STEPS.slice(0, visibleStep).map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
              >
                {step.type === 'command' ? (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-emerald-400 font-semibold">piyush@dev</span>
                    <span className="text-slate-500">:</span>
                    <span className="text-[#2f81f7]">{step.prompt}</span>
                    <span className="text-slate-300 font-bold">$</span>
                    <span className="text-white font-medium">{step.command}</span>
                  </div>
                ) : (
                  <pre
                    className={`whitespace-pre-wrap font-mono text-[11px] sm:text-xs pl-3 border-l-2 border-slate-700/60 my-1 ${step.color}`}
                  >
                    {step.text}
                  </pre>
                )}
              </motion.div>
            ))}

            {/* Live Typing / Blinking Cursor Line */}
            {visibleStep < BOOT_STEPS.length && (
              <div className="flex items-center gap-1.5 pt-1">
                <span className="text-emerald-400 font-semibold">piyush@dev</span>
                <span className="text-slate-500">:</span>
                <span className="text-[#2f81f7]">
                  {BOOT_STEPS[visibleStep]?.prompt || '~/workspace'}
                </span>
                <span className="text-slate-300 font-bold">$</span>
                <span className="inline-block w-2.5 h-4 bg-[#2f81f7] animate-pulse ml-0.5" />
              </div>
            )}
          </div>

          {/* Terminal Footer Bar */}
          <div className="h-7 px-4 bg-[#0d121a] border-t border-[#1c222c] flex items-center justify-between text-[10px] text-slate-500">
            <span>zsh 5.9 (x86_64-apple-darwin22.0)</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Booting...</span>
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

