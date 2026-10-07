import { useEffect, useRef, useState } from 'react'
import { useContent } from '../i18n'
import LangSwitch from './LangSwitch'
import { Icon, Mark } from './ui'

/**
 * Barre de navigation fine et translucide (façon apple.com).
 * Elle passe automatiquement en clair ou en sombre selon la section
 * qui se trouve dessous (attribut data-nav des sections).
 */
export default function Navbar({ visible }: { visible: boolean }) {
  const { navLinks, profile, ui } = useContent()
  const t = ui.nav
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const progress = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      setScrolled(window.scrollY > 10)
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (progress.current) progress.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`
      const probe = 24
      const sections = document.querySelectorAll<HTMLElement>('[data-nav]')
      for (const s of sections) {
        const r = s.getBoundingClientRect()
        if (r.top <= probe && r.bottom > probe) {
          setTheme((s.dataset.nav as 'dark' | 'light') ?? 'dark')
          break
        }
      }
      const mid = window.innerHeight * 0.4
      let current = ''
      for (const l of navLinks) {
        const el = document.getElementById(l.id)
        if (!el) continue
        const r = el.getBoundingClientRect()
        if (r.top <= mid && r.bottom > mid) current = l.id
      }
      setActive(current)
    }
    const request = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', request)
    }
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
  }, [open])

  const dark = theme === 'dark' || open
  const go = (id: string) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)] ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-full opacity-0'
      }`}
    >
      <div
        className={`relative transition-colors duration-500 ${
          open
            ? 'bg-black'
            : scrolled
              ? dark
                ? 'bg-black/70 backdrop-blur-xl backdrop-saturate-150'
                : 'bg-[rgba(251,251,253,0.78)] backdrop-blur-xl backdrop-saturate-150'
              : 'bg-transparent'
        } ${scrolled && !open ? (dark ? 'shadow-[0_1px_0_rgba(255,255,255,0.06)]' : 'shadow-[0_1px_0_rgba(0,0,0,0.08)]') : ''}`}
      >
        <nav className="container-wide flex h-12 items-center justify-between">
          <button
            onClick={() => go('accueil')}
            className={`flex items-center gap-2.5 font-display text-[16px] font-semibold tracking-[-0.03em] transition-colors ${
              dark ? 'text-white' : 'text-ink'
            }`}
            aria-label={t.home}
          >
            <Mark size={24} />
            {profile.name}
          </button>

          <ul className="hidden items-center gap-8 lg:flex">
            {navLinks.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => go(l.id)}
                  className={`text-[13px] tracking-[-0.01em] transition-colors ${
                    active === l.id
                      ? dark
                        ? 'text-white'
                        : 'text-ink'
                      : dark
                        ? 'text-white/65 hover:text-white'
                        : 'text-ink/65 hover:text-ink'
                  }`}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <LangSwitch dark={dark} />
            <a
              href={profile.cv}
              download
              className="hidden rounded-full bg-build-ink px-3.5 py-1 text-[13px] text-white transition-colors hover:bg-build-hover sm:inline-flex"
            >
              {t.cv}
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              className={`-mr-2 grid h-10 w-10 place-items-center lg:hidden ${dark ? 'text-white' : 'text-ink'}`}
              aria-label={open ? t.closeMenu : t.openMenu}
              aria-expanded={open}
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 h-[1.5px] w-4 rounded bg-current transition-all duration-300 ${
                    open ? 'top-[5px] rotate-45' : 'top-0.5'
                  }`}
                />
                <span
                  className={`absolute left-0 h-[1.5px] w-4 rounded bg-current transition-all duration-300 ${
                    open ? 'top-[5px] -rotate-45' : 'top-[9px]'
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
        {/* progression de lecture build → break */}
        <div ref={progress} className="scroll-progress absolute inset-x-0 bottom-0 h-[2px]" style={{ transform: 'scaleX(0)' }} />
      </div>
    </header>

      {/* Menu mobile plein écran (hors du header pour que « fixed » couvre tout l'écran) */}
      <div
        className={`fixed inset-x-0 bottom-0 top-12 z-40 overflow-y-auto bg-black transition-[opacity,visibility] duration-500 lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        aria-hidden={!open}
      >
        <ul className="container-wide pt-8">
          {navLinks.map((l, i) => (
            <li
              key={l.id}
              className="transition-all duration-500 ease-[var(--ease-out-expo)]"
              style={{
                transitionDelay: open ? `${80 + i * 45}ms` : '0ms',
                opacity: open ? 1 : 0,
                transform: open ? 'none' : 'translateY(-8px)',
              }}
            >
              <button
                onClick={() => go(l.id)}
                className="block w-full py-2.5 text-left font-display text-[28px] font-semibold tracking-tight text-[#e8e8ed] hover:text-white"
              >
                {l.label}
              </button>
            </li>
          ))}
          <li
            className="mt-8 transition-all duration-500"
            style={{ transitionDelay: open ? '400ms' : '0ms', opacity: open ? 1 : 0 }}
          >
            <a href={profile.cv} download className="btn-primary">
              <Icon name="download" size={16} /> {t.cv}
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}
