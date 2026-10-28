import { useState, useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    text: "Alakananda made our wedding day absolutely magical. The décor, the service, the attention to every little detail — it was beyond what we ever imagined.",
    name: 'Priya & Rahul Sharma',
    role: 'Wedding, December 2025',
  },
  {
    text: "Beautiful ambience and top-class service. We hosted our company's annual gala here and it was phenomenal. A truly premium experience from start to finish.",
    name: 'Ankit Das',
    role: 'Corporate Event, March 2025',
  },
  {
    text: "Every detail was handled perfectly. My daughter's reception was held at Alakananda and every moment was flawless. The food was exquisite.",
    name: 'Sneha & Rohan',
    role: 'Engagement, January 2026',
  },
  {
    text: "Elegant space and amazing decoration. From the moment we walked in, we knew this was the right place. Highly recommended for any celebration.",
    name: 'Meera Gupta',
    role: 'Birthday Celebration, November 2025',
  },
  {
    text: "Professional and well-managed venue. We celebrated our 25th anniversary here and it was spectacular. The team understood our vision perfectly.",
    name: 'Arjun Bora',
    role: 'Corporate Event, February 2026',
  },
]

const loopedTestimonials = [...testimonials, ...testimonials]

export default function Testimonials() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const tweenRef = useRef(null)

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

      if (trackRef.current) {
        tweenRef.current = gsap.to(trackRef.current, {
          xPercent: -50,
          repeat: -1,
          duration: 35,
          ease: 'none'
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section testimonials" id="testimonials">
      <div className="testimonials__header">
        <p className="section__label">Testimonials</p>
        <h2 className="section__title">Words That Warm Our Hearts</h2>
        <p className="section__subtitle">
          Hear from the families and professionals who trusted Alakananda with their most special moments
        </p>
      </div>

      <div 
        className="testimonials__marquee-container"
        onMouseEnter={() => tweenRef.current?.pause()}
        onMouseLeave={() => tweenRef.current?.play()}
      >
        <div ref={trackRef} className="testimonials__marquee-track">
          {loopedTestimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
              <div className="testimonial-card__quote">"</div>
              <p className="testimonial-card__text">{t.text}</p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__name">{t.name}</div>
                <div className="testimonial-card__role">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="review-section">
        <div className="review-section__header">
          <h3>Leave a Review</h3>
          <p>Share your Alakananda experience with us.</p>
        </div>
        <form className="review-form">
          <input type="text" placeholder="Your Name" required className="review-input" />
          <select required className="review-select" defaultValue="">
            <option value="" disabled>Select Event Type</option>
            <option value="wedding">Wedding</option>
            <option value="reception">Reception</option>
            <option value="corporate">Corporate Event</option>
            <option value="birthday">Birthday Celebration</option>
            <option value="other">Other</option>
          </select>
          <textarea placeholder="Your Message" rows="4" required className="review-textarea"></textarea>
          <button type="button" className="btn btn--primary review-btn">Submit Review</button>
        </form>
      </div>
    </section>
  )
}
