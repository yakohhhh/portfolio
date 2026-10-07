import {
  createElement,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from 'react'

/* =============================================================================
 *  Petit moteur de motion design, sans dépendance :
 *  - useScrollScene : progression 0 → 1 d'une scène « sticky » au scroll
 *  - Reveal : apparition douce quand l'élément entre à l'écran
 *  - Counter : compteur animé
 * ========================================================================== */

export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v))
/** Ramène p dans [a, b] → [0, 1]. */
export const range = (p: number, a: number, b: number) => clamp((p - a) / (b - a))
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t
/** Courbe proche de l'easing Apple. */
export const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

/**
 * Appelle `onFrame(progress)` à chaque frame de scroll, où progress vaut 0 quand
 * le haut de la section touche le haut de l'écran et 1 quand son bas touche le
 * bas de l'écran (= durée de la partie « collée »).
 */
export function useScrollScene(
  ref: RefObject<HTMLElement | null>,
  onFrame: (progress: number, rect: DOMRect) => void,
) {
  const cb = useRef(onFrame)
  cb.current = onFrame

  useIsoLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const total = r.height - window.innerHeight
      const p = total > 0 ? clamp(-r.top / total) : r.top <= 0 ? 1 : 0
      cb.current(p, r)
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
  }, [ref])
}

export function useMediaQuery(query: string) {
  const get = () => (typeof window !== 'undefined' ? window.matchMedia(query).matches : false)
  const [matches, setMatches] = useState(get)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setMatches(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return matches
}

export function useReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}

/** Ajoute la classe `is-in` une fois l'élément visible. */
export function useInView<T extends HTMLElement>(threshold = 0.18, rootMargin = '0px 0px -8% 0px') {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold, rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold, rootMargin])
  return [ref, inView] as const
}

export function Reveal({
  children,
  delay = 0,
  className = '',
  variant = 'up',
  as = 'div',
  style,
}: {
  children: ReactNode
  delay?: number
  className?: string
  variant?: 'up' | 'scale'
  as?: string
  style?: CSSProperties
}) {
  const [ref, inView] = useInView<HTMLElement>()
  return createElement(
    as,
    {
      ref,
      className: `${variant === 'scale' ? 'reveal-scale' : 'reveal'} ${inView ? 'is-in' : ''} ${className}`,
      style: { ...style, ['--d' as string]: `${delay}s` },
    },
    children,
  )
}

export function Counter({ value, suffix = '', duration = 1.8 }: { value: number; suffix?: string; duration?: number }) {
  const [ref, inView] = useInView<HTMLSpanElement>(0.5)
  const [display, setDisplay] = useState(value > 1000 ? value - 40 : 0)
  useEffect(() => {
    if (!inView) return
    const from = value > 1000 ? value - 40 : 0
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const t = clamp((now - start) / (duration * 1000))
      setDisplay(Math.round(lerp(from, value, easeOut(t))))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration])
  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

/* =============================================================================
 *  Identité « Build / Break »
 * ========================================================================== */

/** Monogramme AM : la tuile A (build) est posée, la tuile M (break) est
 *  décalée, comme une pièce qu'on aurait forcée. */
export function Mark({
  size = 28,
  className = '',
  animated = false,
  title = 'Ayman Mazroui',
}: {
  size?: number
  className?: string
  animated?: boolean
  title?: string
}) {
  const id = useId().replace(/:/g, '')
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={`${animated ? 'mark-animated' : ''} ${className}`}
      role="img"
      aria-label={title}
    >
      <defs>
        <linearGradient id={`b${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#00b2ff" />
          <stop offset="1" stopColor="#2f7bff" />
        </linearGradient>
        <linearGradient id={`r${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff3d5a" />
          <stop offset="1" stopColor="#ff8a3d" />
        </linearGradient>
      </defs>
      <g className="mark-build">
        <rect x="2" y="4" width="29" height="52" rx="9" fill={`url(#b${id})`} />
        <path
          d="M9 45 L16.5 17 L24 45 M11.6 35.5 H21.4"
          fill="none"
          stroke="#fff"
          strokeWidth="4.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <g className="mark-break">
        <rect x="33" y="8" width="29" height="52" rx="9" fill={`url(#r${id})`} />
        <path
          d="M39.5 49 V21 L47.5 35 L55.5 21 V49"
          fill="none"
          stroke="#fff"
          strokeWidth="4.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}

/** Mot « construire » : dégradé bleu. */
export function Build({ children }: { children: ReactNode }) {
  return <span className="text-gradient-build">{children}</span>
}

/** Mot « casser » : dégradé rouge-orangé + glitch. */
export function Break({ children, glitch = true }: { children: string; glitch?: boolean }) {
  return (
    <span className={`text-gradient-break ${glitch ? 'glitch' : ''}`} data-text={children}>
      {children}
    </span>
  )
}

/** Étiquette signature : repère fendu + numéro + libellé en mono. */
export function Label({
  index,
  children,
  dark = false,
  className = '',
}: {
  index?: string
  children: ReactNode
  dark?: boolean
  className?: string
}) {
  return (
    <p className={`label inline-flex items-center gap-3 ${dark ? 'text-white/55' : 'text-mute-2'} ${className}`}>
      <span className="split-tick" aria-hidden="true" />
      {index && <span className={dark ? 'text-white/35' : 'text-mute'}>{index}</span>}
      <span>{children}</span>
    </p>
  )
}

/* ---------- En-tête de section ---------- */
export function SectionHeading({
  eyebrow,
  index,
  title,
  subtitle,
  dark = false,
  align = 'left',
}: {
  eyebrow: string
  index?: string
  title: ReactNode
  subtitle?: ReactNode
  dark?: boolean
  align?: 'left' | 'center'
}) {
  return (
    <div className={`mb-12 md:mb-20 ${align === 'center' ? 'mx-auto text-center' : ''} max-w-5xl`}>
      <Reveal>
        <Label index={index} dark={dark}>
          {eyebrow}
        </Label>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className={`headline-l mt-5 ${dark ? 'text-white' : 'text-ink'}`}>{title}</h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.16}>
          <p
            className={`lead mt-6 max-w-2xl ${align === 'center' ? 'mx-auto' : ''} ${
              dark ? 'text-mute' : 'text-mute-2'
            }`}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  )
}

/* ---------- Icônes (traits 1.75, style SF Symbols / Lucide) ---------- */
const ICONS: Record<string, ReactNode> = {
  arrowRight: (
    <>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </>
  ),
  arrowUpRight: (
    <>
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </>
  ),
  arrowUp: (
    <>
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </>
  ),
  chevronRight: <path d="m9 18 6-6-6-6" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  download: (
    <>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="m7 10 5 5 5-5" />
      <path d="M12 15V3" />
    </>
  ),
  github: (
    <>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </>
  ),
  linkedin: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </>
  ),
  copy: (
    <>
      <rect x="8" y="8" width="14" height="14" rx="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </>
  ),
  check: <path d="M20 6 9 17l-5-5" />,
  x: (
    <>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </>
  ),
  mapPin: (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  graduation: (
    <>
      <path d="M22 10v6" />
      <path d="M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </>
  ),
  shield: (
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
  ),
  shieldCheck: (
    <>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  code: (
    <>
      <path d="m16 18 6-6-6-6" />
      <path d="m8 6-6 6 6 6" />
    </>
  ),
  send: (
    <>
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </>
  ),
  flag: (
    <>
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <path d="M4 22v-7" />
    </>
  ),
  terminal: (
    <>
      <path d="m4 17 6-6-6-6" />
      <path d="M12 19h8" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
      <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </>
  ),
  play: <path d="M7 4v16l13-8z" />,
}

export type IconName = keyof typeof ICONS

export function Icon({
  name,
  size = 18,
  className = '',
  strokeWidth = 1.75,
}: {
  name: IconName | string
  size?: number
  className?: string
  strokeWidth?: number
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  )
}
