import { motion } from 'framer-motion'
import { X, Palette, Type, Eye, Sparkles } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore.js'
import { useThemeStore } from '../../store/useThemeStore.js'
import { THEMES } from '../../themes/themes.js'

export const SettingsModal = () => {
  const { isSettingsOpen, toggleSettings } = useAppStore()
  const {
    currentTheme,
    setTheme,
    fontSize,
    setFontSize,
    reduceMotion,
    toggleReduceMotion,
    showMinimap,
    toggleMinimap,
  } = useThemeStore()

  if (!isSettingsOpen) return null

  return (
    <div
      onClick={() => toggleSettings(false)}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 select-none"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-bg-elevated border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col font-mono text-xs"
      >
        <div className="h-10 px-4 border-b border-border bg-bg/40 flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold text-text-main">
            <Palette size={16} className="text-accent" />
            <span>WORKSPACE SETTINGS</span>
          </div>
          <button
            onClick={() => toggleSettings(false)}
            className="p-1 rounded text-text-muted hover:text-text-main transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        <div className="p-4 space-y-5 overflow-y-auto max-h-[80vh]">
          <div>
            <div className="font-semibold text-text-main mb-2 flex items-center gap-1.5">
              <Palette size={14} className="text-accent" />
              <span>Color Themes (7 themes)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {THEMES.map((theme) => {
                const isSelected = currentTheme === theme.id
                return (
                  <button
                    key={theme.id}
                    onClick={() => setTheme(theme.id)}
                    className={`flex items-center justify-between p-2.5 rounded-lg border text-left transition-all ${
                      isSelected
                        ? 'border-accent bg-accent/10 shadow-sm'
                        : 'border-border bg-bg hover:border-accent/40'
                    }`}
                  >
                    <div>
                      <div className="font-medium text-text-main">{theme.name}</div>
                      <div className="text-[10px] text-text-muted">{theme.description}</div>
                    </div>
                    <span
                      className="w-4 h-4 rounded-full border border-border shrink-0 ml-2"
                      style={{ backgroundColor: theme.previewColor }}
                    />
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <div className="font-semibold text-text-main mb-2 flex items-center gap-1.5">
              <Type size={14} className="text-accent" />
              <span>Editor Font Scale</span>
            </div>
            <div className="flex gap-2">
              {['sm', 'base', 'lg'].map((size) => (
                <button
                  key={size}
                  onClick={() => setFontSize(size)}
                  className={`flex-1 py-1.5 px-3 rounded-lg border text-center uppercase tracking-wider transition-colors ${
                    fontSize === size
                      ? 'border-accent bg-accent text-white font-bold'
                      : 'border-border bg-bg text-text-muted hover:text-text-main'
                  }`}
                >
                  {size === 'sm' ? 'Compact' : size === 'base' ? 'Default' : 'Large'}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-2 border-t border-border">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-text-main flex items-center gap-1.5">
                  <Sparkles size={13} className="text-accent" />
                  <span>Reduce Motion</span>
                </div>
                <div className="text-[11px] text-text-muted">
                  Disable spring physics, parallax, and typing loop animations
                </div>
              </div>
              <button
                onClick={toggleReduceMotion}
                className={`w-11 h-6 rounded-full transition-colors p-1 relative ${
                  reduceMotion ? 'bg-accent' : 'bg-bg border border-border'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    reduceMotion ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-text-main flex items-center gap-1.5">
                  <Eye size={13} className="text-accent" />
                  <span>Code Minimap</span>
                </div>
                <div className="text-[11px] text-text-muted">
                  Show miniature visual overview on the right of the editor (desktop)
                </div>
              </div>
              <button
                onClick={toggleMinimap}
                className={`w-11 h-6 rounded-full transition-colors p-1 relative ${
                  showMinimap ? 'bg-accent' : 'bg-bg border border-border'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    showMinimap ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="px-4 py-2 border-t border-border bg-bg/50 flex justify-end">
          <button
            onClick={() => toggleSettings(false)}
            className="px-3 py-1 rounded bg-accent text-white font-medium hover:bg-accent/90 transition-colors"
          >
            Done
          </button>
        </div>
      </motion.div>
    </div>
  )
}
