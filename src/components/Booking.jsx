import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Booking() {
  const sectionRef = useRef(null)
  const infoRef = useRef(null)
  const formRef = useRef(null)

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

      gsap.to(infoRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: infoRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      })

      gsap.to(formRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section booking" id="booking">
      <div className="booking__container">
        <div ref={infoRef} className="booking__info">
          <p className="section__label">Reservations</p>
          <h2 className="section__title">
            Begin Your <br />Celebration Journey
          </h2>
          <p className="section__subtitle">
            Let us bring your vision to life. Whether it's a grand wedding, an intimate
            anniversary, or a corporate gala — Alakananda is the perfect stage for your
            most memorable occasions.
          </p>
          <p className="section__subtitle" style={{ marginTop: '16px' }}>
            Fill out the form and our dedicated events team will reach out to you within
            24 hours to discuss your requirements in detail.
          </p>
        </div>

        <div ref={formRef} className="booking__form">
          <div className="booking__form-group">
            <label htmlFor="event-type">Event Type</label>
            <select id="event-type" defaultValue="">
              <option value="" disabled>Select your event type</option>
              <option value="wedding">Wedding</option>
              <option value="reception">Reception</option>
              <option value="birthday">Birthday Celebration</option>
              <option value="corporate">Corporate Event</option>
              <option value="anniversary">Anniversary</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="booking__form-group">
            <label htmlFor="event-date">Preferred Date</label>
            <input
              type="date"
              id="event-date"
              placeholder="Select date"
            />
          </div>

          <div className="booking__form-group">
            <label htmlFor="guest-count">Expected Guests</label>
            <input
              type="number"
              id="guest-count"
              placeholder="Number of guests"
              min="10"
              max="1000"
            />
          </div>

          <div className="booking__form-group">
            <label htmlFor="contact-name">Your Name</label>
            <input
              type="text"
              id="contact-name"
              placeholder="Full name"
            />
          </div>

          <div className="booking__form-group">
            <label htmlFor="contact-phone">Phone Number</label>
            <input
              type="tel"
              id="contact-phone"
              placeholder="+91 XXXXX XXXXX"
            />
          </div>

          <button className="booking__submit" type="button">
            Check Availability
          </button>
        </div>
      </div>
    </section>
  )
}
