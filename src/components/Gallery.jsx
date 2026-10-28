import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const galleryImages = [
  { src: '/hoverimg1.jpeg', alt: 'Grand ballroom setup' },
  { src: '/hoverimg2.jpeg', alt: 'Wedding decoration' },
  { src: '/hoverimg3.jpeg', alt: 'Elegant dining arrangement' },
  { src: '/hoverimg1.jpeg', alt: 'Stage decoration' },
  { src: '/hoverimg2.jpeg', alt: 'Floral arrangement' },
  { src: '/hoverimg3.jpeg', alt: 'Reception area' },
]

const ZoomIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
    <path d="M11 8v6M8 11h6" />
  </svg>
)

export default function Gallery() {
  const [lightboxImg, setLightboxImg] = useState(null)
  const sectionRef = useRef(null)
  const itemsRef = useRef([])

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

      itemsRef.current.forEach((item, i) => {
        if (!item) return
        gsap.to(item, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <section ref={sectionRef} className="section gallery" id="gallery">
        <div className="gallery__header">
          <p className="section__label">Gallery</p>
          <h2 className="section__title">Moments Captured in Gold</h2>
          <p className="section__subtitle">
            A glimpse into the elegance and grandeur that defines every event at Alakananda
          </p>
        </div>

        <div className="gallery__grid">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              ref={el => itemsRef.current[i] = el}
              className="gallery__item"
              onClick={() => setLightboxImg(img.src)}
            >
              <img src={img.src} alt={img.alt} loading="lazy" />
              <div className="gallery__item-overlay">
                <ZoomIcon />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <div
        className={`lightbox ${lightboxImg ? 'active' : ''}`}
        onClick={() => setLightboxImg(null)}
      >
        <button className="lightbox__close" onClick={() => setLightboxImg(null)}>✕</button>
        {lightboxImg && (
          <img
            className="lightbox__img"
            src={lightboxImg}
            alt="Full view"
            onClick={e => e.stopPropagation()}
          />
        )}
      </div>
    </>
  )
}
