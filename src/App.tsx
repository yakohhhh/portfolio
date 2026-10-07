import { useEffect, useState } from 'react'
import Intro, { shouldPlayIntro } from './components/Intro'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Manifesto from './components/Manifesto'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [playIntro] = useState(shouldPlayIntro)
  const [showIntro, setShowIntro] = useState(playIntro)
  const [ready, setReady] = useState(!playIntro)

  // Retire l'intro du DOM une fois son fondu terminé.
  useEffect(() => {
    if (!ready || !showIntro) return
    const t = window.setTimeout(() => setShowIntro(false), 1000)
    return () => clearTimeout(t)
  }, [ready, showIntro])

  // Pas d'intro : on déclenche l'entrée du hero juste après le premier rendu.
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <>
      {showIntro && <Intro onDone={() => setReady(true)} />}
      <Navbar visible={ready} />
      <main>
        <Hero ready={ready && mounted} />
        <Manifesto />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
