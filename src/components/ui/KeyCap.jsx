export const KeyCap = ({ children, className = '' }) => {
  return (
    <kbd
      className={`inline-flex items-center justify-center px-1.5 py-0.5 text-[11px] font-mono font-medium rounded border border-border bg-bg-elevated text-text-muted shadow-sm ${className}`}
    >
      {children}
    </kbd>
  )
}

