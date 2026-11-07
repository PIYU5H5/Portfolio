import {
  Keyboard,
  Terminal,
  Bot,
  Layers,
} from 'lucide-react'
import { KeyCap } from '../ui/KeyCap.jsx'

export const ReadmeFile = () => {
  const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0
  const modKey = isMac ? '⌘' : 'Ctrl'

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-8 font-sans">
      <div className="space-y-3 pb-4 border-b border-border">
        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
          <span className="inline-flex items-center rounded overflow-hidden border border-border">
            <span className="bg-bg-elevated px-2 py-0.5 text-text-muted">build</span>
            <span className="bg-emerald-600 px-2 py-0.5 text-white font-semibold">passing</span>
          </span>
          <span className="inline-flex items-center rounded overflow-hidden border border-border">
            <span className="bg-bg-elevated px-2 py-0.5 text-text-muted">coverage</span>
            <span className="bg-sky-600 px-2 py-0.5 text-white font-semibold">100% verified</span>
          </span>
          <span className="inline-flex items-center rounded overflow-hidden border border-border">
            <span className="bg-bg-elevated px-2 py-0.5 text-text-muted">engine</span>
            <span className="bg-purple-600 px-2 py-0.5 text-white font-semibold">React 19 + Vite</span>
          </span>
          <span className="inline-flex items-center rounded overflow-hidden border border-border">
            <span className="bg-bg-elevated px-2 py-0.5 text-text-muted">license</span>
            <span className="bg-amber-600 px-2 py-0.5 text-white font-semibold">MIT</span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-main pt-1">
          VS Code Developer Portfolio <span className="text-accent">README</span>
        </h1>
        <p className="text-sm text-text-muted font-mono leading-relaxed">
          Welcome to the environment from <strong>Piyush Jadhav</strong>.
          Engineered from scratch to mirror the complete experience of Visual Studio Code.
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="text-base font-bold text-text-main flex items-center gap-2 font-mono">
          <Keyboard size={16} className="text-accent" />
          <span>Global Keyboard Shortcuts</span>
        </h3>

        <div className="rounded-xl border border-border overflow-hidden bg-bg-elevated/40 font-mono text-xs">
          <table className="w-full text-left">
            <thead className="bg-bg/60 border-b border-border text-text-muted">
              <tr>
                <th className="py-2.5 px-4 font-semibold">Key Combination</th>
                <th className="py-2.5 px-4 font-semibold">Action Triggered</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-text-main">
              <tr className="hover:bg-bg/40 transition-colors">
                <td className="py-2.5 px-4">
                  <KeyCap>{modKey}</KeyCap> + <KeyCap>P</KeyCap>
                </td>
                <td className="py-2.5 px-4 text-text-muted">Quick open file picker</td>
              </tr>
              <tr className="hover:bg-bg/40 transition-colors">
                <td className="py-2.5 px-4">
                  <KeyCap>{modKey}</KeyCap> + <KeyCap>K</KeyCap> / <KeyCap>Shift</KeyCap> + <KeyCap>P</KeyCap>
                </td>
                <td className="py-2.5 px-4 text-text-muted">Command palette &amp; theme switcher</td>
              </tr>
              <tr className="hover:bg-bg/40 transition-colors">
                <td className="py-2.5 px-4">
                  <KeyCap>{modKey}</KeyCap> + <KeyCap>`</KeyCap>
                </td>
                <td className="py-2.5 px-4 text-text-muted">Toggle interactive terminal shell</td>
              </tr>
              <tr className="hover:bg-bg/40 transition-colors">
                <td className="py-2.5 px-4">
                  <KeyCap>{modKey}</KeyCap> + <KeyCap>B</KeyCap>
                </td>
                <td className="py-2.5 px-4 text-text-muted">Toggle primary file explorer sidebar</td>
              </tr>
              <tr className="hover:bg-bg/40 transition-colors">
                <td className="py-2.5 px-4">
                  <KeyCap>{modKey}</KeyCap> + <KeyCap>W</KeyCap>
                </td>
                <td className="py-2.5 px-4 text-text-muted">Close focused editor tab</td>
              </tr>
              <tr className="hover:bg-bg/40 transition-colors">
                <td className="py-2.5 px-4">
                  <KeyCap>Ctrl</KeyCap> + <KeyCap>Tab</KeyCap>
                </td>
                <td className="py-2.5 px-4 text-text-muted">Cycle next active tab</td>
              </tr>
              <tr className="hover:bg-bg/40 transition-colors">
                <td className="py-2.5 px-4">
                  <KeyCap>Alt</KeyCap> + <KeyCap>1..8</KeyCap>
                </td>
                <td className="py-2.5 px-4 text-text-muted">Direct jump to open tab index</td>
              </tr>
              <tr className="hover:bg-bg/40 transition-colors">
                <td className="py-2.5 px-4">
                  <KeyCap>{modKey}</KeyCap> + <KeyCap>,</KeyCap>
                </td>
                <td className="py-2.5 px-4 text-text-muted">Open settings &amp; preferences modal</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-base font-bold text-text-main flex items-center gap-2 font-mono">
          <Layers size={16} className="text-accent" />
          <span>Architecture &amp; Tech Stack</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
          <div className="p-4 rounded-xl border border-border bg-bg-elevated/40 space-y-1">
            <span className="font-bold text-text-main">Framework &amp; Core</span>
            <p className="text-text-muted">React 19 + JSX + Vite</p>
          </div>
          <div className="p-4 rounded-xl border border-border bg-bg-elevated/40 space-y-1">
            <span className="font-bold text-text-main">Styling &amp; Tokens</span>
            <p className="text-text-muted">Tailwind CSS + 7 custom dynamic CSS variable themes</p>
          </div>
          <div className="p-4 rounded-xl border border-border bg-bg-elevated/40 space-y-1">
            <span className="font-bold text-text-main">Physics &amp; Animation</span>
            <p className="text-text-muted">Framer Motion spring physics &amp; layout transitions</p>
          </div>
          <div className="p-4 rounded-xl border border-border bg-bg-elevated/40 space-y-1">
            <span className="font-bold text-text-main">State &amp; Storage</span>
            <p className="text-text-muted">Zustand stores with localStorage persistence</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-xl border border-border bg-bg-elevated/50 space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-accent">
            <Terminal size={15} />
            <span>Interactive Terminal</span>
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            Toggle via <KeyCap>{modKey}</KeyCap> + <KeyCap>`</KeyCap> or the bottom panel.
            Supports commands like <code className="text-accent">help</code>,{' '}
            <code className="text-accent">projects</code>,{' '}
            <code className="text-accent">neofetch</code>,{' '}
            <code className="text-accent">theme matrix</code>, and{' '}
            <code className="text-accent">sudo hire piyush</code>.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-border bg-bg-elevated/50 space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-purple-400">
            <Bot size={15} />
            <span>Piyush's Co-Pilot</span>
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            An embedded AI assistant grounded strictly in Piyush's portfolio data.
            Ask about projects, hackathons, or engineering philosophy.
          </p>
        </div>
      </div>
    </div>
  )
}

