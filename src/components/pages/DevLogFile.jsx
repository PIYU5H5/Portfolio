import { Cpu, CheckCircle2 } from 'lucide-react'

export const DevLogFile = () => {
  return (
    <div className="w-full max-w-3xl mx-auto py-8 px-4 sm:px-6 space-y-6 font-mono text-xs">
      <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-wider">
        <Cpu size={16} />
        <span>DEVELOPER LOG // HIDDEN FILE UNLOCKED</span>
      </div>

      <div className="p-6 rounded-xl border border-emerald-500/40 bg-emerald-500/5 space-y-4">
        <h1 className="text-xl sm:text-2xl font-bold text-text-main font-sans">
          Engineering Log: <span className="text-emerald-400">dev-log.md</span>
        </h1>

        <div className="p-4 rounded-lg bg-bg border border-border space-y-3 text-text-muted leading-relaxed">
          <div className="flex items-center gap-2 text-text-main font-bold">
            <CheckCircle2 size={16} className="text-emerald-400" />
            <span>Why build a VS Code environment?</span>
          </div>
          <p>
            Standard portfolios often feel like static brochures. As a software engineer who lives in code editors,
            I wanted a portfolio that reflects the actual day-to-day workflow: opening files, inspecting JSON trees,
            typing terminal commands, toggling themes, and collaborating with AI tools.
          </p>
          <div className="text-text-main font-bold pt-1">Key design decisions:</div>
          <p>• Zero heavy bloated component libraries — everything is custom-crafted with Tailwind CSS and Framer Motion.</p>
          <p>• CSS variables on <code className="text-emerald-400">:root[data-theme]</code> so theme switches take 0ms re-render time.</p>
          <p>• Clean, modern JavaScript and JSX for effortless readability and fast iteration.</p>
        </div>
      </div>
    </div>
  )
}

