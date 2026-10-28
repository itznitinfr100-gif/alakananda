import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null)
  const logoRef = useRef(null)
  const textRef = useRef(null)
  const circleRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (containerRef.current) {
          containerRef.current.classList.add('hidden')
        }
        onComplete()
      }
    })

    // Logo fades in with glow
    tl.to(logoRef.current, {
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
      filter: 'drop-shadow(0 0 30px rgba(212, 175, 55, 0.6))'
    })

    // Text fades in
    tl.to(textRef.current, {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      y: 0,
    }, '-=0.3')

    // Hold for a moment
    tl.to({}, { duration: 0.6 })

    // Fade out logo and text
    tl.to([logoRef.current, textRef.current], {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
    })

    // Circle expands from bottom center
    tl.to(circleRef.current, {
      width: '300vmax',
      height: '300vmax',
      duration: 1.2,
      ease: 'power3.inOut',
    })

    // Fade out preloader
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out',
    }, '-=0.3')

    return () => tl.kill()
  }, [onComplete])

  return (
    <div ref={containerRef} className="preloader">
      <img
        ref={logoRef}
        className="preloader__logo"
        src="./alakananda logo.png"
        alt="Alakananda Logo"
      />
      <p ref={textRef} className="preloader__text" style={{ transform: 'translateY(10px)' }}>
        Welcome to Alakananda
      </p>
      <div ref={circleRef} className="preloader__circle" />
    </div>
  )
}
