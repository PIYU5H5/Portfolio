import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Send,
  Copy,
  Check,
  MessageSquare,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from '../ui/SocialIcons.jsx'
import { PROFILE } from '../../data/profile.js'
import { copyToClipboard } from '../../lib/utils.js'
import { useToastStore } from '../ui/Toast.jsx'

export const ContactFile = () => {
  const { showToast } = useToastStore()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const handleCopyEmail = async () => {
    await copyToClipboard(PROFILE.socials.email)
    setIsCopied(true)
    showToast({
      type: 'success',
      title: 'Email Copied!',
      description: PROFILE.socials.email,
    })
    setTimeout(() => setIsCopied(false), 2000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (formData.honeypot) {
      return
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showToast({
        type: 'error',
        title: 'Validation Error',
        description: 'Please fill in your name, valid email, and message.',
      })
      return
    }

    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      showToast({
        type: 'success',
        title: 'Message Dispatched!',
        description: 'Thank you! Piyush will get back to you shortly.',
      })
      setFormData({ name: '', email: '', message: '', honeypot: '' })
    }, 900)
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-10 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3"
      >
        <div className="font-mono text-xs text-syntax-comment">
          // sendMessage({'{'} to: "piyush", from: you {'}'})
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-main">
          Get in <span className="text-accent">Touch</span>
        </h1>
        <p className="text-sm sm:text-base text-text-muted leading-relaxed max-w-2xl">
          Got an internship, a high-impact engineering role, a collaboration, or an interesting idea?
          Let's talk and build something exceptional together.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-xl border border-border bg-bg-elevated/50 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-text-muted uppercase tracking-wider">
              Direct Inquiries
            </span>
            <button
              onClick={handleCopyEmail}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-bg border border-border text-xs font-mono text-text-main hover:border-accent/40 transition-colors"
            >
              {isCopied ? <Check size={13} className="text-success" /> : <Copy size={13} />}
              <span>{isCopied ? 'Copied!' : 'Copy Email'}</span>
            </button>
          </div>
          <div>
            <div className="text-xs text-text-muted font-mono">Personal Email:</div>
            <a
              href={`mailto:${PROFILE.socials.email}`}
              className="text-base sm:text-lg font-bold text-accent hover:underline font-mono"
            >
              {PROFILE.socials.email}
            </a>
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            Fastest channel for internship inquiries, technical discussions, and hackathon invites.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-border bg-bg-elevated/50 space-y-3">
          <span className="text-xs font-mono text-text-muted uppercase tracking-wider">
            Developer Networks
          </span>
          <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-xs">
            <a
              href={PROFILE.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-lg bg-bg border border-border flex flex-col items-center justify-center gap-1.5 text-text-muted hover:text-sky-400 hover:border-sky-400/40 transition-colors"
            >
              <LinkedinIcon size={20} />
              <span>LinkedIn</span>
            </a>
            <a
              href={PROFILE.socials.github}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-lg bg-bg border border-border flex flex-col items-center justify-center gap-1.5 text-text-muted hover:text-text-main hover:border-accent/40 transition-colors"
            >
              <GithubIcon size={20} />
              <span>GitHub</span>
            </a>
            <a
              href={PROFILE.socials.leetcode}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-lg bg-bg border border-border flex flex-col items-center justify-center gap-1.5 text-text-muted hover:text-amber-400 hover:border-amber-400/40 transition-colors"
            >
              <LeetCodeIcon size={20} />
              <span>LeetCode</span>
            </a>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-6 rounded-xl border border-border bg-bg-elevated/60 backdrop-blur-sm space-y-5 shadow-sm"
      >
        <div className="flex items-center gap-2 font-mono text-xs text-accent font-semibold">
          <MessageSquare size={16} />
          <span>DIRECT MESSAGE TRANSMISSION</span>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-success/20 border border-success/40 flex items-center justify-center text-success">
              <Check size={24} />
            </div>
            <h3 className="text-lg font-bold text-text-main">Message Received!</h3>
            <p className="text-xs text-text-muted max-w-sm mx-auto font-mono">
              Thank you for reaching out. Piyush typically responds within 24 hours.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-2 px-4 py-1.5 rounded-lg bg-bg border border-border text-xs font-mono text-text-main hover:border-accent/40 transition-colors"
            >
              Send Another Note
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
              className="hidden"
              autoComplete="off"
              tabIndex={-1}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-text-muted text-[11px] uppercase tracking-wider">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Satya Nadella"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-bg border border-border text-text-main placeholder:text-text-muted/50 focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-text-muted text-[11px] uppercase tracking-wider">
                  Your Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. satya@microsoft.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-bg border border-border text-text-main placeholder:text-text-muted/50 focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-text-muted text-[11px] uppercase tracking-wider">
                Message Body *
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Hi Piyush, we would love to speak with you regarding a software engineering role..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-bg border border-border text-text-main placeholder:text-text-muted/50 focus:outline-none focus:border-accent transition-colors leading-relaxed font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-accent text-white font-medium hover:bg-accent/90 transition-all ${
                isSubmitting ? 'opacity-70 cursor-wait' : 'active:scale-98'
              }`}
            >
              <Send size={14} />
              <span>{isSubmitting ? 'Transmitting...' : 'Dispatch Message'}</span>
            </button>
          </form>
        )}
      </motion.div>
    </div>
  )
}
