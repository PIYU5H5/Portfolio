import { useState, useRef, useEffect } from 'react'
import {
  Terminal as TerminalIcon,
  X,
  Maximize2,
  Trash2,
} from 'lucide-react'
import confetti from 'canvas-confetti'
import { useTerminalStore } from '../../store/useTerminalStore.js'
import { executeCommand, KNOWN_COMMANDS } from '../../lib/commands.js'
import { PROFILE } from '../../data/profile.js'

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
  const [wizardStep, setWizardStep] = useState(null) // null | 'name' | 'email' | 'message'
  const [wizardData, setWizardData] = useState({ name: '', email: '', message: '' })
  const [isDispatching, setIsDispatching] = useState(false)
  const inputRef = useRef(null)
  const terminalEndRef = useRef(null)

  const getPromptLabel = () => {
    if (wizardStep === 'name') return '[Offer Wizard] Your Name >'
    if (wizardStep === 'email') return '[Offer Wizard] Your Email >'
    if (wizardStep === 'message') return '[Offer Wizard] Offer / Role Message >'
    return 'piyush@portfolio:~$'
  }

  const getPlaceholder = () => {
    if (isDispatching) return 'Dispatching offer email via SMTP...'
    if (wizardStep === 'name') return 'Enter your name or company (or type "cancel")...'
    if (wizardStep === 'email') return 'Enter your email address (or type "cancel")...'
    if (wizardStep === 'message') return 'Enter your message/job details (or type "cancel")...'
    return "Type 'help' or 'open projects'..."
  }

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

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (isDispatching) return

      const rawInput = currentInput.trim()

      // 1. If currently in interactive hire wizard
      if (wizardStep) {
        if (!rawInput) return

        if (
          rawInput.toLowerCase() === 'cancel' ||
          rawInput.toLowerCase() === 'exit' ||
          rawInput.toLowerCase() === 'quit'
        ) {
          addEntry({
            command: rawInput,
            prompt: getPromptLabel(),
            output: '❌ Offer dispatch cancelled. Returned to normal shell.',
          })
          setWizardStep(null)
          setWizardData({ name: '', email: '', message: '' })
          setCurrentInput('')
          return
        }

        if (wizardStep === 'name') {
          addEntry({
            command: rawInput,
            prompt: getPromptLabel(),
            output: `✓ Name recorded: "${rawInput}"\n\nStep 2/3: What is your Email address?`,
          })
          setWizardData((prev) => ({ ...prev, name: rawInput }))
          setWizardStep('email')
          setCurrentInput('')
          return
        }

        if (wizardStep === 'email') {
          if (!rawInput.includes('@') || !rawInput.includes('.')) {
            addEntry({
              command: rawInput,
              prompt: getPromptLabel(),
              output: '⚠️ Please enter a valid email address (e.g. name@company.com), or type "cancel" to abort:',
              isError: true,
            })
            setCurrentInput('')
            return
          }
          addEntry({
            command: rawInput,
            prompt: getPromptLabel(),
            output: `✓ Email recorded: "${rawInput}"\n\nStep 3/3: What is your Offer / Role / Project message?`,
          })
          setWizardData((prev) => ({ ...prev, email: rawInput }))
          setWizardStep('message')
          setCurrentInput('')
          return
        }

        if (wizardStep === 'message') {
          const finalName = wizardData.name
          const finalEmail = wizardData.email
          const finalMessage = rawInput

          addEntry({
            command: rawInput,
            prompt: getPromptLabel(),
            output: `⏳ Connecting to Gmail SMTP server & dispatching offer to ${PROFILE.socials.email}...`,
          })
          setCurrentInput('')
          setIsDispatching(true)

          try {
            const res = await fetch('/api/contact', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name: finalName,
                email: finalEmail,
                message: `[OFFER SUBMITTED VIA TERMINAL 'sudo hire piyush']\n\n${finalMessage}`,
              }),
            })

            const data = await res.json().catch(() => ({}))

            if (!res.ok) {
              throw new Error(data.error || 'SMTP delivery failed')
            }

            if (typeof window !== 'undefined') {
              confetti({
                particleCount: 150,
                spread: 80,
                origin: { y: 0.6 },
                colors: ['#2f81f7', '#3fb950', '#a371f7', '#ffd700'],
              })
            }

            addEntry({
              output:
                "🎉 SUCCESS: Offer email dispatched directly to Piyush's Gmail inbox via SMTP!\n" +
                `Piyush has been notified and will reply directly to ${finalEmail}.\n\n` +
                'Direct channels:\n' +
                `📧 Email:    ${PROFILE.socials.email}\n` +
                `🐙 GitHub:   ${PROFILE.socials.github}\n` +
                `💼 LinkedIn: ${PROFILE.socials.linkedin}\n` +
                `⚡ LeetCode: ${PROFILE.socials.leetcode}`,
            })
          } catch (err) {
            addEntry({
              output:
                `⚠️ SMTP Dispatch notice: ${err.message || 'Server error'}.\n` +
                `Don't worry! You can also reach Piyush directly at ${PROFILE.socials.email}.`,
              isError: true,
            })
          } finally {
            setIsDispatching(false)
            setWizardStep(null)
            setWizardData({ name: '', email: '', message: '' })
          }
          return
        }
      }

      // 2. Normal CLI Command
      const cmd = rawInput
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
        prompt: 'piyush@portfolio:~$',
        output: result.output,
        isError: result.isError,
      })

      if (result.startHireWizard) {
        setWizardStep('name')
        setWizardData({ name: '', email: '', message: '' })
      }

      setCurrentInput('')
    } else if (e.key === 'ArrowUp') {
      if (wizardStep) return
      e.preventDefault()
      navigateHistory('up')
    } else if (e.key === 'ArrowDown') {
      if (wizardStep) return
      e.preventDefault()
      navigateHistory('down')
    } else if (e.key === 'Tab') {
      if (wizardStep) return
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
                <span
                  className={`font-semibold ${
                    entry.prompt?.startsWith('[Offer') ? 'text-amber-400' : 'text-accent'
                  }`}
                >
                  {entry.prompt || 'piyush@portfolio:~$'}
                </span>
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
          <span
            className={`font-semibold shrink-0 ${
              wizardStep ? 'text-amber-400' : 'text-accent'
            }`}
          >
            {getPromptLabel()}
          </span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isDispatching}
            className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-text-main caret-accent focus:ring-0 p-0 disabled:opacity-50"
            placeholder={getPlaceholder()}
            autoComplete="off"
            spellCheck="false"
          />
        </div>
        <div ref={terminalEndRef} />
      </div>
    </div>
  )
}

