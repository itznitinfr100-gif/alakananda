import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const offers = [
  {
    icon: '💍',
    title: 'Wedding Special',
    desc: 'Create your dream wedding with our exclusive package — premium décor, gourmet catering, and personalized event coordination included.',
    badge: '20% Off',
  },
  {
    icon: '🎉',
    title: 'Weekday Celebrations',
    desc: 'Host your celebration on weekdays and enjoy premium services at special rates. Perfect for milestone birthdays and anniversaries.',
    badge: 'Special Rates',
  },
  {
    icon: '🏢',
    title: 'Corporate Excellence',
    desc: 'Impress your clients and partners. Our corporate packages include AV setup, bespoke menus, and dedicated event managers.',
    badge: 'All-Inclusive',
  },
]

export default function Offers() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

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

      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: i * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section offers" id="offers">
      <div className="offers__header">
        <p className="section__label">Exclusive Offers</p>
        <h2 className="section__title">Celebrations Made Exceptional</h2>
        <p className="section__subtitle">
          Take advantage of our curated packages designed to make your event truly unforgettable
        </p>
      </div>

      <div className="offers__grid">
        {offers.map((offer, i) => (
          <div
            key={i}
            ref={el => cardsRef.current[i] = el}
            className="offers__card"
          >
            <div className="offers__card-icon">{offer.icon}</div>
            <h3 className="offers__card-title">{offer.title}</h3>
            <p className="offers__card-desc">{offer.desc}</p>
            <span className="offers__card-badge">{offer.badge}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
