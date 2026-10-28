import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const imagesRef = useRef(null)
  const img1Ref = useRef(null)
  const img2Ref = useRef(null)
  const img3Ref = useRef(null)
  const [showVideos, setShowVideos] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── SCRUB CLIP-PATH ON THE SECTION ITSELF ──
      gsap.fromTo(sectionRef.current,
        { y: 120, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            end: 'top 30%',
            scrub: true,
          }
        }
      )

      // Text animation
      gsap.to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      })

      // Trigger videos to load exactly when the hero section is completely hidden
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => setShowVideos(true)
      })

      // Images animation (fade in after videos load)
      gsap.to(imagesRef.current, {
        opacity: 1,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 25%',
          toggleActions: 'play none none reverse',
        }
      })

      // Floating continuous animations
      gsap.to(img1Ref.current, {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })

      gsap.to(img2Ref.current, {
        y: 15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.5
      })

      gsap.to(img3Ref.current, {
        y: -12,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.2
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section about" id="about">
      <div className="about__container">
        <div ref={textRef} className="about__text">
          <p className="section__label">Our Story</p>
          <h2 className="section__title">
            A Legacy of <br />Timeless Elegance
          </h2>
          <p className="about__description">
            Nestled in the heart of Tezpur, Assam, Alakananda stands as the region's most
            prestigious banquet hall — a sanctuary where celebrations transcend the ordinary.
            Our grand halls, draped in elegance and illuminated by warm golden hues, provide
            the perfect canvas for your most cherished moments.
          </p>
          <p className="about__description" style={{ marginTop: '16px' }}>
            From intimate gatherings to lavish weddings, every event at Alakananda is curated
            with meticulous attention to detail. Our team of experienced professionals ensures
            that your vision comes to life with perfection, creating memories that last forever.
          </p>
          <div className="about__stats">
            <div>
              <div className="about__stat-number">500+</div>
              <div className="about__stat-label">Events Hosted</div>
            </div>
            <div>
              <div className="about__stat-number">15+</div>
              <div className="about__stat-label">Years of Legacy</div>
            </div>
            <div>
              <div className="about__stat-number">1000</div>
              <div className="about__stat-label">Guest Capacity</div>
            </div>
          </div>
        </div>

        <div ref={imagesRef} className="media-layout">
          <div ref={img1Ref} className="panel panel-large">
            {showVideos && <video autoPlay loop muted playsInline className="fade-in-media" src="./vid1.mp4" />}
          </div>

          <div className="panel-group">
            <div ref={img2Ref} className="panel panel-small">
              {showVideos && <video autoPlay loop muted playsInline className="fade-in-media" src="./vid2.mp4" />}
            </div>
            <div ref={img3Ref} className="panel panel-small">
              {showVideos && <video autoPlay loop muted playsInline className="fade-in-media" src="./vid3.mp4" />}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
