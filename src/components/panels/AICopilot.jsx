import { useState, useRef, useEffect } from 'react'
import {
  Bot,
  Send,
  Trash2,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  X,
} from 'lucide-react'
import { useChatStore } from '../../store/useChatStore.js'
import { useAppStore } from '../../store/useAppStore.js'
import { copyToClipboard } from '../../lib/utils.js'
import { FILES } from '../../data/files.js'

export const AICopilot = () => {
  const {
    messages,
    sendMessage,
    isStreaming,
    streamingText,
    clearChat,
  } = useChatStore()

  const { openFile, toggleCopilot } = useAppStore()
  const [inputText, setInputText] = useState('')
  const [copiedId, setCopiedId] = useState(null)
  const chatEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamingText])

  const handleSend = () => {
    if (!inputText.trim() || isStreaming) return
    const text = inputText
    setInputText('')
    sendMessage(text)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSend()
    }
  }

  const handleCopy = async (id, text) => {
    await copyToClipboard(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const promptSuggestions = [
    "What has Piyush built?",
    "What's his tech stack?",
    "Is he available for internships?",
    "Tell me about his hackathons",
    "How do I contact him?",
  ]

  const renderMessageContent = (content) => {
    const fileRegex = /\[(Home\.jsx|About\.jsx|Projects\.js|Skills\.json|Experience\.json|Achievements\.md|Contact\.jsx|README\.md)\]/g

    const parts = (content || '').split(fileRegex)
    return parts.map((part, index) => {
      if (part in FILES) {
        return (
          <button
            key={index}
            onClick={() => openFile(part)}
            className="inline-flex items-center gap-1 px-1.5 py-0.5 mx-0.5 rounded bg-accent/20 hover:bg-accent/30 text-accent font-mono text-[11px] font-semibold transition-colors underline"
            title={`Click to open ${part} in editor tab`}
          >
            <span>{part}</span>
            <ArrowRight size={10} />
          </button>
        )
      }
      return <span key={index}>{part}</span>
    })
  }

  return (
    <div className="h-full flex flex-col bg-bg-sidebar select-text text-xs">
      <div className="h-9 px-3 border-b border-border flex items-center justify-between shrink-0 bg-bg-activity select-none">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent">
            <Bot size={13} />
          </div>
          <span className="font-mono font-semibold text-[11px] text-text-main">
            PIYUSH'S CO-PILOT
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={clearChat}
            className="p-1 rounded text-text-muted hover:text-text-main hover:bg-bg transition-colors"
            title="Clear conversation"
          >
            <Trash2 size={13} />
          </button>
          <button
            onClick={() => toggleCopilot(false)}
            className="p-1 rounded text-text-muted hover:text-text-main hover:bg-bg transition-colors"
            title="Close Co-Pilot panel"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      <div className="flex-1 p-3 overflow-y-auto space-y-3 font-sans">
        {messages.map((m) => {
          const isUser = m.role === 'user'
          return (
            <div
              key={m.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
            >
              <div className="flex items-center gap-1.5 px-1 text-[10px] text-text-muted font-mono">
                {isUser ? <span>You</span> : <span>Co-Pilot AI</span>}
                <span>·</span>
                <span>{m.timestamp}</span>
              </div>
              <div
                className={`relative group max-w-[92%] p-2.5 rounded-lg text-xs leading-relaxed whitespace-pre-wrap ${
                  isUser
                    ? 'bg-accent text-white rounded-br-none shadow-sm'
                    : 'bg-bg-elevated text-text-main border border-border rounded-bl-none shadow-sm'
                }`}
              >
                <div>{renderMessageContent(m.content)}</div>
                {!isUser && (
                  <button
                    onClick={() => handleCopy(m.id, m.content)}
                    className="absolute top-1.5 right-1.5 p-1 rounded bg-bg/70 hover:bg-bg text-text-muted hover:text-text-main opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Copy response"
                  >
                    {copiedId === m.id ? (
                      <Check size={11} className="text-success" />
                    ) : (
                      <Copy size={11} />
                    )}
                  </button>
                )}
              </div>
            </div>
          )
        })}

        {isStreaming && (
          <div className="flex flex-col items-start space-y-1">
            <div className="flex items-center gap-1 px-1 text-[10px] text-text-muted font-mono">
              <Bot size={11} className="text-accent animate-pulse" />
              <span>Co-Pilot thinking...</span>
            </div>
            <div className="max-w-[92%] p-2.5 rounded-lg text-xs leading-relaxed whitespace-pre-wrap bg-bg-elevated text-text-main border border-border rounded-bl-none">
              {renderMessageContent(streamingText)}
              <span className="inline-block w-1.5 h-3 ml-1 bg-accent animate-pulse" />
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {messages.length <= 2 && !isStreaming && (
        <div className="px-3 pb-2 pt-1 border-t border-border/50 bg-bg-elevated/20">
          <div className="text-[10px] font-mono text-text-muted mb-1.5 flex items-center gap-1">
            <Sparkles size={11} className="text-accent" /> Suggested questions:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {promptSuggestions.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => sendMessage(prompt)}
                className="text-[11px] px-2 py-1 rounded bg-bg border border-border/80 hover:border-accent/50 text-text-muted hover:text-text-main transition-colors text-left"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="p-2.5 border-t border-border bg-bg-elevated/40">
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-bg border border-border focus-within:border-accent transition-colors">
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isStreaming}
            placeholder="Ask about Piyush's projects, stack..."
            className="flex-1 bg-transparent border-none outline-none text-xs text-text-main placeholder:text-text-muted/60"
            spellCheck="false"
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim() || isStreaming}
            className={`p-1 rounded transition-colors ${
              inputText.trim() && !isStreaming
                ? 'bg-accent text-white hover:bg-accent/90'
                : 'text-text-muted opacity-40 cursor-not-allowed'
            }`}
          >
            <Send size={13} />
          </button>
        </div>
      </div>
    </div>
  )
}
