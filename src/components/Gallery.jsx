import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FlexCarousel from './FlexCarousel'

gsap.registerPlugin(ScrollTrigger)

const galleryItems = [
  {
    src: './hoverimg1.jpeg',
    alt: 'Grand ballroom arrangement with banquet dining',
    title: 'Grand Ballroom',
    subtitle: 'Royal Seating & Architecture'
  },
  {
    src: './hoverimg2.jpeg',
    alt: 'Opulent wedding stage decoration with golden lights',
    title: 'Imperial Stage',
    subtitle: 'Vows in Golden Splendor'
  },
  {
    src: './hoverimg3.jpeg',
    alt: 'Fine dining banquet table arrangement and florals',
    title: 'Culinary Grandeur',
    subtitle: 'Five-Star Hospitality'
  },
  {
    src: './fourthsectionbg.png',
    alt: 'Architectural entrance with ambient lighting',
    title: 'The Grand Entrance',
    subtitle: 'First Impressions of Luxury'
  },
  {
    src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80&auto=format&fit=max',
    alt: 'Luminescent golden chandeliers',
    title: 'Golden Chandeliers',
    subtitle: 'Illuminating Forever'
  },
  {
    src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=80&auto=format&fit=max',
    alt: 'Lavish floral decor and ceremonial walkway',
    title: 'Floral Tapestry',
    subtitle: 'Bespoke Celebration Styling'
  },
  {
    src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80&auto=format&fit=max',
    alt: 'Celebration toast and banquet gathering',
    title: 'Evening Celebrations',
    subtitle: 'Unforgettable Soirées'
  },
  {
    src: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1200&q=80&auto=format&fit=max',
    alt: 'Royal wedding aisle and ambient lighting',
    title: 'The Royal Aisle',
    subtitle: 'Cinematic Grandeur'
  }
]

export default function Gallery() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section gallery" id="gallery">
      <div className="gallery__header">
        <p className="section__label">Gallery</p>
        <h2 className="section__title">Moments Captured in Gold</h2>
        <p className="section__subtitle">
          Swipe, scroll, or click cards to explore the grandeur that defines every celebration at Alakananda
        </p>
      </div>

      <div className="gallery__carousel-wrapper">
        <FlexCarousel
          items={galleryItems}
          preset="liquid"
          intro="rise"
          cardHeight={0.54}
          gap={16}
          radius={12}
          squeeze={0.2}
          focusOnClick
          captions
          autoplay
          interval={4}
        />
      </div>
    </section>
  )
}
