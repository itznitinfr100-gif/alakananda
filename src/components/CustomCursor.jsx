import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const glowRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    // Hide custom cursor on touch devices
    if ('ontouchstart' in window) return

    const glow = glowRef.current
    const dot = dotRef.current

    let mouseX = 0, mouseY = 0
    let glowX = 0, glowY = 0

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dot) {
        dot.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`
      }
    }

    const animate = () => {
      glowX += (mouseX - glowX) * 0.12
      glowY += (mouseY - glowY) * 0.12
      if (glow) {
        glow.style.transform = `translate(${glowX - 14}px, ${glowY - 14}px)`
      }
      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    animate()

    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Don't render on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null

  return (
    <>
      <div ref={glowRef} className="cursor-glow" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  )
}
