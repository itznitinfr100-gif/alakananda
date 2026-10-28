import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero({ visible }) {
  const heroRef = useRef(null)
  const logoRef = useRef(null)
  const titleRef = useRef(null)
  const taglineRef = useRef(null)
  const buttonsRef = useRef(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (!visible) return

    const tl = gsap.timeline({ delay: 0.3 })

    tl.to(logoRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'power3.out',
    })
    .to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
    }, '-=0.4')
    .to(taglineRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.3')
    .to(buttonsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
    }, '-=0.2')
    .to(scrollRef.current, {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
    }, '-=0.1')

    return () => tl.kill()
  }, [visible])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(heroRef.current, {
        borderRadius: "50px",
        scale: 0.96,
        y: 30,
        boxShadow: "0px 30px 80px rgba(0,0,0,0.5)",
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      })
    })

    return () => ctx.revert()
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={heroRef} className="hero" id="hero" style={{ zIndex: 1, transformOrigin: 'top center' }}>
      <img
        className="hero__video"
        src="./herosectionvid.webp"
        alt="Alakananda Banquet Hall"
      />
      <div className="hero__overlay" />

      <div className="hero__content">
        <img
          ref={logoRef}
          className="hero__logo"
          src="./alakananda logo.png"
          alt="Alakananda Logo"
          style={{ transform: 'scale(0.8)' }}
        />
        <h1
          ref={titleRef}
          className="hero__title"
          style={{ transform: 'translateY(30px)' }}
        >
          Alakananda
        </h1>
        <p
          ref={taglineRef}
          className="hero__tagline"
          style={{ transform: 'translateY(20px)' }}
        >
          Where Moments Become Forever
        </p>
        <div
          ref={buttonsRef}
          className="hero__buttons"
          style={{ transform: 'translateY(20px)' }}
        >
          <button className="hero__btn hero__btn--primary" onClick={() => scrollTo('booking')}>
            Book Now
          </button>
          <button className="hero__btn hero__btn--secondary" onClick={() => scrollTo('gallery')}>
            View Gallery
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="hero__scroll-indicator">
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  )
}
