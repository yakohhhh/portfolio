import { useEffect, useRef, useState } from 'react'
import { brand, introLines, profile } from '../data'
import { Mark } from './ui'

const STEP = 880 // durée d'une phrase (ms)
const LOGO = 1700 // durée du final avec le monogramme
const STORAGE_KEY = 'am-intro-seen'

/** Faut-il jouer l'intro ? (une fois par session, jamais si mouvement réduit) */
export function shouldPlayIntro() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  try {
    return sessionStorage.getItem(STORAGE_KEY) !== '1'
  } catch {
    return true
  }
}

/**
 * Séquence d'ouverture façon keynote : écran noir, halo, phrases qui
 * apparaissent une à une (« Je construis. » en bleu, « Je casse. » en rouge),
 * puis le monogramme AM s'assemble et le rideau se lève sur le hero.
 */
export default function Intro({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0) // 0..n-1 = phrases, n = logo
  const [leaving, setLeaving] = useState(false)
  const done = useRef(false)
  const n = introLines.length
  const total = STEP * n + LOGO

  const finish = () => {
    if (done.current) return
    done.current = true
    setLeaving(true)
    try {
      sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      /* stockage indisponible : l'intro rejouera, ce n'est pas grave */
    }
    onDone()
  }

  useEffect(() => {
    document.documentElement.classList.add('intro-lock')
    const timers = Array.from({ length: n + 1 }, (_, i) => window.setTimeout(() => setStep(i), i * STEP))
    timers.push(window.setTimeout(finish, total))
    const onKey = (e: KeyboardEvent) => {
      if (['Escape', 'Enter', ' '].includes(e.key)) finish()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      timers.forEach(clearTimeout)
      window.removeEventListener('keydown', onKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (leaving) {
      document.documentElement.classList.remove('intro-lock')
      window.scrollTo(0, 0)
    }
  }, [leaving])

  const line = introLines[step]
  const tone = line?.tone
  const glow =
    tone === 'break'
      ? 'radial-gradient(circle, rgba(255,61,90,0.30) 0%, rgba(255,138,61,0.12) 38%, transparent 68%)'
      : tone === 'build'
        ? 'radial-gradient(circle, rgba(47,123,255,0.32) 0%, rgba(0,178,255,0.12) 38%, transparent 68%)'
        : 'radial-gradient(circle, rgba(47,123,255,0.22) 0%, rgba(163,91,255,0.12) 38%, rgba(255,61,90,0.06) 55%, transparent 70%)'

  return (
    <div
      className={`intro fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black ${
        leaving ? 'is-leaving' : ''
      }`}
      aria-hidden={leaving}
      role="presentation"
    >
      <div
        className="intro-glow pointer-events-none absolute left-1/2 top-1/2 h-[75vmin] w-[75vmin] -translate-x-1/2 -translate-y-1/2 rounded-full transition-[background] duration-700"
        style={{ background: glow }}
      />

      {line ? (
        <h1
          key={step}
          className="intro-line relative px-6 text-center font-display text-[clamp(44px,9vw,132px)] font-semibold leading-none tracking-[-0.055em] text-white"
          style={{ ['--dur' as string]: `${STEP}ms` }}
        >
          {tone === 'build' && <span className="text-gradient-build">{line.text}</span>}
          {tone === 'break' && (
            <span className="text-gradient-break glitch" data-text={line.text}>
              {line.text}
            </span>
          )}
          {!tone && line.text}
        </h1>
      ) : (
        <div className="intro-logo relative flex flex-col items-center px-6 text-center" style={{ ['--dur' as string]: `${LOGO}ms` }}>
          <Mark size={112} animated />
          <p className="fade-up-late mt-8 font-display text-[clamp(28px,4vw,44px)] font-semibold tracking-[-0.045em] text-white">
            {profile.name}
          </p>
          <p className="fade-up-late label mt-3 text-white/55" style={{ animationDelay: '0.6s' }}>
            {brand.signature.join('  ·  ').replace(/\./g, '')}
          </p>
        </div>
      )}

      <div className="absolute bottom-10 left-1/2 h-px w-40 -translate-x-1/2 overflow-hidden bg-white/10">
        <div className="intro-progress scroll-progress h-full w-full" style={{ ['--total' as string]: `${total}ms` }} />
      </div>

      <button
        onClick={finish}
        className="label absolute bottom-7 right-6 rounded-full px-4 py-2 text-white/45 transition-colors hover:bg-white/10 hover:text-white md:right-10"
      >
        Passer
      </button>
    </div>
  )
}
