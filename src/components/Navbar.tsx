import { useEffect, useState } from 'react'
import { Menu, X, Download } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLenis } from 'lenis/react'
import { navLinks, profile } from '../data'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('accueil')

  const lenis = useLenis()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const go = (id: string) => {
    setOpen(false)
    if (lenis) {
      lenis.scrollTo('#' + id, { offset: -80 })
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'border-b border-mist bg-paper-50/80 backdrop-blur'
          : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        {/* wordmark */}
        <button
          onClick={() => go('accueil')}
          className="flex items-center gap-2.5 text-sm font-semibold text-ink-900"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-obsidian text-xs font-bold tracking-tight text-paper-50 shadow-tile">
            AM
          </span>
          Ayman Mazroui
        </button>

        {/* desktop links */}
        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => go(l.id)}
                className={`link-underline text-sm transition-colors ${
                  active === l.id ? 'text-ink-900 border-b-2 border-accent-500' : 'text-ink-600 hover:text-ink-900'
                }`}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        {/* cta + burger */}
        <div className="flex items-center gap-3">
          <a
            href={profile.cv}
            download
            className="group hidden items-center gap-2 rounded-full bg-accent-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-600 sm:inline-flex"
          >
            <Download size={15} className="transition-transform duration-300 group-hover:translate-y-0.5" />
            CV
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-mist-strong text-ink-800 transition-colors hover:border-ink-900 lg:hidden"
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* mobile panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mx-4 mb-3 rounded-3xl border border-mist bg-paper-100 shadow-card lg:hidden"
          >
            <ul className="flex flex-col gap-1 p-3">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => go(l.id)}
                    className={`block w-full rounded-2xl px-3 py-2.5 text-left text-sm transition-colors ${
                      active === l.id ? 'bg-paper-200 text-ink-900' : 'text-ink-600 hover:bg-paper-50'
                    }`}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href={profile.cv}
                  download
                  className="mt-1 flex items-center gap-2 rounded-full bg-ink-900 px-4 py-2.5 text-sm font-medium text-paper-50 transition-colors hover:bg-ink-800"
                >
                  <Download size={15} /> Télécharger le CV
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
