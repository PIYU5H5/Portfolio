import { useEffect, useState, useRef } from 'react'
import { useThemeStore } from '../../store/useThemeStore.js'

export const Minimap = ({ scrollContainerRef }) => {
  const { showMinimap } = useThemeStore()
  const [sliderTop, setSliderTop] = useState(0)
  const [sliderHeight, setSliderHeight] = useState(30)
  const minimapRef = useRef(null)

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container
      if (scrollHeight <= clientHeight) {
        setSliderHeight(100)
        setSliderTop(0)
        return
      }

      const ratio = clientHeight / scrollHeight
      const calculatedHeight = Math.max(20, ratio * 100)
      const maxScroll = scrollHeight - clientHeight
      const scrollPercent = scrollTop / maxScroll
      const calculatedTop = scrollPercent * (100 - calculatedHeight)

      setSliderHeight(calculatedHeight)
      setSliderTop(calculatedTop)
    }

    container.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => container.removeEventListener('scroll', handleScroll)
  }, [scrollContainerRef])

  if (!showMinimap) return null

  const handleMinimapClick = (e) => {
    const container = scrollContainerRef.current
    const minimap = minimapRef.current
    if (!container || !minimap) return

    const rect = minimap.getBoundingClientRect()
    const clickY = e.clientY - rect.top
    const percent = clickY / rect.height
    const targetScroll = percent * (container.scrollHeight - container.clientHeight)
    container.scrollTo({ top: targetScroll, behavior: 'smooth' })
  }

  return (
    <div
      ref={minimapRef}
      onClick={handleMinimapClick}
      className="hidden xl:block w-16 h-full bg-bg/50 border-l border-border/60 shrink-0 relative select-none cursor-pointer overflow-hidden opacity-60 hover:opacity-100 transition-opacity"
      title="Code Minimap"
    >
      <div className="p-1 space-y-1 opacity-25 pointer-events-none scale-75 origin-top-left">
        {Array.from({ length: 42 }).map((_, i) => (
          <div
            key={i}
            className="h-1 rounded bg-text-muted"
            style={{ width: `${30 + ((i * 17) % 65)}%` }}
          />
        ))}
      </div>

      <div
        style={{
          top: `${sliderTop}%`,
          height: `${sliderHeight}%`,
        }}
        className="absolute left-0 right-0 bg-accent/20 border-y border-accent/40 pointer-events-none transition-all duration-75 shadow-sm"
      />
    </div>
  )
}
