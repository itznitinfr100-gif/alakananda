import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef(null)
  const infoRef = useRef(null)
  const mapRef = useRef(null)

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

      gsap.to(mapRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: mapRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section contact" id="contact">
      <div style={{ marginBottom: '60px' }}>
        <p className="section__label">Get In Touch</p>
        <h2 className="section__title">Let's Plan Something Beautiful</h2>
      </div>

      <div className="contact__container">
        <div ref={infoRef} className="contact__info">
          <div className="contact__item">
            <div className="contact__item-icon">📍</div>
            <div>
              <div className="contact__item-label">Address</div>
              <div className="contact__item-value">
                Alakananda Banquet Hall<br />
                Near Mahabhairab Temple Road<br />
                Tezpur, Sonitpur, Assam — 784001
              </div>
            </div>
          </div>

          <div className="contact__item">
            <div className="contact__item-icon">📞</div>
            <div>
              <div className="contact__item-label">Phone</div>
              <div className="contact__item-value">
                +91 99999 XXXXX<br />
                +91 88888 XXXXX
              </div>
            </div>
          </div>

          <div className="contact__item">
            <div className="contact__item-icon">✉️</div>
            <div>
              <div className="contact__item-label">Email</div>
              <div className="contact__item-value">
                info@alakananda.in<br />
                bookings@alakananda.in
              </div>
            </div>
          </div>

          <div className="contact__item">
            <div className="contact__item-icon">🕐</div>
            <div>
              <div className="contact__item-label">Working Hours</div>
              <div className="contact__item-value">
                Monday – Sunday: 9:00 AM – 10:00 PM<br />
                Events: By Appointment
              </div>
            </div>
          </div>
        </div>

        <div ref={mapRef} className="contact__map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3413.28228630747!2d92.77639577513582!3d26.631453672121577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3744e9d8caeee0fb%3A0xda958c64f6eb02e9!2sAlakananda.Banqueet!5e1!3m2!1sen!2sin!4v1777125623244!5m2!1sen!2sin"
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Alakananda Location - Tezpur, Assam"
          />
        </div>
      </div>
    </section>
  )
}
