import { Sparkles, Terminal } from 'lucide-react'
import { useTerminalStore } from '../../store/useTerminalStore.js'

export const SecretsFile = () => {
  const { toggleTerminal } = useTerminalStore()

  return (
    <div className="w-full max-w-3xl mx-auto py-8 px-4 sm:px-6 space-y-6 font-mono text-xs">
      <div className="flex items-center gap-2 text-pink-400 font-bold uppercase tracking-wider">
        <Sparkles size={16} />
        <span>CLASSIFIED // EASTER EGG UNLOCKED</span>
      </div>

      <div className="p-6 rounded-xl border border-pink-500/40 bg-pink-500/5 space-y-4">
        <h1 className="text-xl sm:text-2xl font-bold text-text-main font-sans">
          You found <span className="text-pink-400">secrets.txt</span>!
        </h1>

        <p className="text-text-main/90 leading-relaxed text-sm">
          Congratulations on exploring at least 5 different files in the workspace.
        </p>

        <div className="p-4 rounded-lg bg-bg border border-border space-y-2 text-text-muted leading-relaxed">
          <div className="text-text-main font-bold">Behind-the-scenes trivia:</div>
          <p>• Piyush debugs faster with synthwave &amp; lofi playing at 110% volume.</p>
          <p>• The entire VS Code UI layout state is reactive and persistent across browser refreshes.</p>
          <p>• Have you tried typing <code className="text-pink-400 font-bold">sudo hire piyush</code> into the terminal yet?</p>
        </div>

        <button
          onClick={() => toggleTerminal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-pink-500 text-white font-semibold hover:bg-pink-600 transition-colors"
        >
          <Terminal size={14} />
          <span>Open Terminal to test commands</span>
        </button>
      </div>
    </div>
  )
}
