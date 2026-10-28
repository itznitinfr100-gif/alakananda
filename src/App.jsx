import { useState, useEffect, useRef } from 'react'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Gallery from './components/Gallery'
import Booking from './components/Booking'
import Offers from './components/Offers'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'

function App() {
  const [preloaderDone, setPreloaderDone] = useState(false)

  return (
    <>
      <CustomCursor />
      {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}
      <Navbar />
      <main>
        <Hero visible={preloaderDone} />
        <About />
        <Gallery />
        <Booking />
        <Offers />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
