import { useEffect, useRef } from 'react'
import { useThemeStore } from '../store/useThemeStore.js'

/**
 * Custom hook to dynamically animate the browser tab favicon.
 * Renders a high-resolution terminal icon with an animated blinking cursor (> _)
 * and a subtle glowing gradient border.
 */
export function useAnimatedFavicon() {
  const { reduceMotion } = useThemeStore()
  const intervalRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return

    // If user prefers reduced motion, leave the static favicon
    if (reduceMotion) return

    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let frame = 0
    const colors = ['#2f81f7', '#3fb950', '#a371f7']

    const drawRect = (x, y, w, h, r) => {
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(x, y, w, h, r)
      } else {
        ctx.rect(x, y, w, h)
      }
    }

    const renderFavicon = () => {
      try {
        ctx.clearRect(0, 0, 64, 64)

        // 1. Dark background tile with rounded corners
        ctx.fillStyle = '#0d1117'
        ctx.beginPath()
        drawRect(0, 0, 64, 64, 16)
        ctx.fill()

        // 2. Animated gradient border
        const colorIndex = Math.floor(frame / 4) % colors.length
        const nextColorIndex = (colorIndex + 1) % colors.length
        const grad = ctx.createLinearGradient(0, 0, 64, 64)
        grad.addColorStop(0, colors[colorIndex])
        grad.addColorStop(1, colors[nextColorIndex])

        ctx.strokeStyle = grad
        ctx.lineWidth = 4
        ctx.beginPath()
        drawRect(2, 2, 60, 60, 14)
        ctx.stroke()

        // 3. Chevron prompt '>' (accent blue)
        ctx.strokeStyle = '#2f81f7'
        ctx.lineWidth = 6
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.beginPath()
        ctx.moveTo(18, 20)
        ctx.lineTo(31, 32)
        ctx.lineTo(18, 44)
        ctx.stroke()

        // 4. Blinking cursor '_' (accent green)
        const isCursorVisible = frame % 2 === 0
        if (isCursorVisible) {
          ctx.strokeStyle = '#3fb950'
          ctx.lineWidth = 6
          ctx.lineCap = 'round'
          ctx.beginPath()
          ctx.moveTo(35, 44)
          ctx.lineTo(48, 44)
          ctx.stroke()
        }

        const dataUrl = canvas.toDataURL('image/png')
        const currentLink = document.querySelector("link[rel*='icon']")
        const newLink = document.createElement('link')
        newLink.rel = 'icon'
        newLink.type = 'image/png'
        newLink.href = dataUrl

        if (currentLink && currentLink.parentNode) {
          currentLink.parentNode.replaceChild(newLink, currentLink)
        } else {
          document.head.appendChild(newLink)
        }

        frame++
      } catch {
        // Fallback gracefully
      }
    }

    // Initial render
    renderFavicon()

    // Run animation at 500ms intervals (low CPU, crisp blink)
    intervalRef.current = setInterval(renderFavicon, 500)

    // Pause when tab is not visible to preserve battery
    const handleVisibility = () => {
      if (document.hidden) {
        if (intervalRef.current) clearInterval(intervalRef.current)
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current)
        renderFavicon()
        intervalRef.current = setInterval(renderFavicon, 500)
      }
    }

    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      document.removeEventListener('visibilitychange', handleVisibility)
      const currentLink = document.querySelector("link[rel*='icon']")
      if (currentLink) {
        currentLink.href = '/favicon.svg'
      }
    }
  }, [reduceMotion])
}

