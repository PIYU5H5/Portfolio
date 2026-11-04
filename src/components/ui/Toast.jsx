import { create } from 'zustand'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react'

export const useToastStore = create((set) => ({
  toasts: [],
  showToast: (toast) => {
    const id = Math.random().toString(36).substring(2, 9)
    set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }))

    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }))
    }, 4500)
  },
  removeToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }))
  },
}))

export const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore()

  return (
    <div className="fixed bottom-8 right-6 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
            className="pointer-events-auto flex items-start gap-3 p-3.5 rounded-lg border border-border bg-bg-elevated/95 backdrop-blur-md shadow-xl text-text-main text-sm"
          >
            <div className="mt-0.5 shrink-0">
              {toast.type === 'info' && <Info size={17} className="text-accent" />}
              {toast.type === 'success' && <CheckCircle2 size={17} className="text-success" />}
              {toast.type === 'warning' && <AlertTriangle size={17} className="text-warning" />}
              {toast.type === 'error' && <XCircle size={17} className="text-danger" />}
            </div>
            <div className="flex-1 pr-1">
              <div className="font-medium text-xs text-text-main">{toast.title}</div>
              {toast.description && (
                <div className="text-xs text-text-muted mt-0.5 leading-relaxed">{toast.description}</div>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-text-muted hover:text-text-main transition-colors"
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
