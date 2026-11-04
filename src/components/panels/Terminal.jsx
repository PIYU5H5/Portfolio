import { useState, useRef, useEffect } from 'react'
import {
  Terminal as TerminalIcon,
  X,
  Maximize2,
  Trash2,
} from 'lucide-react'
import { useTerminalStore } from '../../store/useTerminalStore.js'
import { executeCommand, KNOWN_COMMANDS } from '../../lib/commands.js'

const formatTerminalOutput = (text) => {
  if (!text) return null
  const tokenRegex = /(https?:\/\/[^\s]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g
  const parts = []
  let lastIndex = 0
  let match

  while ((match = tokenRegex.exec(text)) !== null) {
    const start = match.index
    const end = tokenRegex.lastIndex
    const token = match[0]

    if (start > lastIndex) {
      parts.push(text.slice(lastIndex, start))
    }

    if (token.startsWith('http://') || token.startsWith('https://')) {
      parts.push(
        <a
          key={start}
          href={token}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline hover:opacity-80 transition-opacity font-semibold"
        >
          {token}
        </a>
      )
    } else {
      parts.push(
        <a
          key={start}
          href={`mailto:${token}`}
          className="text-accent underline hover:opacity-80 transition-opacity font-semibold"
        >
          {token}
        </a>
      )
    }
    lastIndex = end
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts
}

export const Terminal = () => {
  const {
    isOpen,
    height,
    setHeight,
    toggleTerminal,
    history,
    addEntry,
    clearHistory,
    navigateHistory,
    currentInput,
    setCurrentInput,
    addToCommandHistory,
    startTime,
  } = useTerminalStore()

  const [isDragging, setIsDragging] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const inputRef = useRef(null)
  const terminalEndRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return
      const newHeight = window.innerHeight - e.clientY - 24
      setHeight(newHeight)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      document.body.style.cursor = 'default'
    }

    if (isDragging) {
      document.body.style.cursor = 'row-resize'
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, setHeight])

  if (!isOpen) return null

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const cmd = currentInput.trim()
      addToCommandHistory(cmd)

      if (cmd.toLowerCase() === 'clear') {
        clearHistory()
        setCurrentInput('')
        return
      }

      const uptimeSec = Math.floor((Date.now() - startTime) / 1000)
      const result = executeCommand(cmd, uptimeSec)

      addEntry({
        command: cmd,
        output: result.output,
        isError: result.isError,
      })

      setCurrentInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      navigateHistory('up')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      navigateHistory('down')
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const query = currentInput.trim().toLowerCase()
      if (query) {
        const match = KNOWN_COMMANDS.find((c) => c.startsWith(query))
        if (match) {
          setCurrentInput(match)
        }
      }
    }
  }

  const effectiveHeight = isMaximized ? 'calc(100vh - 120px)' : `${height}px`

  return (
    <div
      style={{ height: effectiveHeight }}
      className="w-full bg-bg-elevated border-t border-border flex flex-col shrink-0 select-text relative z-20 shadow-2xl transition-[height] duration-100"
      onClick={() => inputRef.current?.focus()}
    >
      <div
        onMouseDown={() => setIsDragging(true)}
        className="absolute top-0 left-0 right-0 h-1.5 cursor-row-resize hover:bg-accent/60 active:bg-accent transition-colors z-30"
        title="Drag to resize terminal"
      />

      <div className="h-8 px-3 border-b border-border bg-bg-activity flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center gap-2 text-xs font-mono">
          <TerminalIcon size={14} className="text-accent" />
          <span className="font-semibold text-text-main text-[11px]">TERMINAL</span>
          <span className="text-[10px] text-text-muted px-1.5 py-0.2 rounded bg-bg border border-border">
            zsh / bash
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation()
              clearHistory()
            }}
            className="p-1 rounded text-text-muted hover:text-text-main hover:bg-bg transition-colors"
            title="Clear terminal buffer"
          >
            <Trash2 size={13} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsMaximized(!isMaximized)
            }}
            className="p-1 rounded text-text-muted hover:text-text-main hover:bg-bg transition-colors"
            title={isMaximized ? 'Restore height' : 'Maximize terminal'}
          >
            <Maximize2 size={13} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleTerminal(false)
            }}
            className="p-1 rounded text-text-muted hover:text-danger hover:bg-bg transition-colors"
            title="Close terminal (Ctrl+`)"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      <div className="flex-1 p-3 overflow-y-auto font-mono text-xs leading-relaxed text-text-main space-y-2 selection:bg-accent selection:text-white">
        {history.map((entry) => (
          <div key={entry.id} className="space-y-1">
            {entry.command && (
              <div className="flex items-center gap-2 text-text-muted">
                <span className="text-accent font-semibold">piyush@portfolio:~$</span>
                <span className="text-text-main font-medium">{entry.command}</span>
              </div>
            )}
            {entry.output && (
              <div
                className={`whitespace-pre-wrap pl-2 border-l-2 ${
                  entry.isError ? 'border-danger text-danger/90' : 'border-accent/40 text-text-main'
                }`}
              >
                {formatTerminalOutput(entry.output)}
              </div>
            )}
          </div>
        ))}

        <div className="flex items-center gap-2 pt-1">
          <span className="text-accent font-semibold shrink-0">piyush@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-text-main caret-accent focus:ring-0 p-0"
            placeholder="Type 'help' or 'open projects'..."
            autoComplete="off"
            spellCheck="false"
          />
        </div>
        <div ref={terminalEndRef} />
      </div>
    </div>
  )
}

