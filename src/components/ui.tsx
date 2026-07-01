import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react'

const EASE = [0.22, 1, 0.36, 1] as const

/* ---------- MaskReveal (le texte monte d'un masque — pour les gros titres) ---------- */
export function MaskReveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  return (
    <span ref={ref} className="block overflow-hidden pb-[0.1em]">
      <motion.span
        className={`block ${className ?? ''}`}
        initial={{ y: '110%' }}
        animate={inView ? { y: 0 } : { y: '110%' }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  )
}

/* ---------- FadeUp (fondu + légère montée, SANS flou — pour le texte courant) ---------- */
export function FadeUp({
  children,
  delay = 0,
  y = 22,
  className,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/* ---------- Stagger (révèle les enfants en cascade — pour les listes/grilles) ---------- */
export function Stagger({
  children,
  className,
  gap = 0.08,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  gap?: number
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ show: { transition: { staggerChildren: gap, delayChildren: delay } } }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
  y = 18,
}: {
  children: ReactNode
  className?: string
  y?: number
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  )
}

/* ---------- Parallax (déplacement doux au scroll) ---------- */
export function Parallax({
  children,
  className,
  distance = 60,
}: {
  children: ReactNode
  className?: string
  distance?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance])
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}

/* ---------- Counter ---------- */
export function Counter({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 2,
}: {
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    })
    return () => controls.stop()
  }, [inView, value, duration])

  const formatted = display.toLocaleString('fr-FR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span ref={ref}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}

/* ---------- Marquee (bandeau de grands mots qui défile — signature penra) ---------- */
export function Marquee({
  items,
  reverse = false,
  className = 'text-3xl sm:text-5xl md:text-6xl font-display font-semibold tracking-tight text-ink-900',
}: {
  items: string[]
  reverse?: boolean
  className?: string
}) {
  const loop = [...items, ...items]
  return (
    <div className="mask-fade-r overflow-hidden">
      <div
        className={`flex w-max items-center ${reverse ? 'animate-marquee-rev' : 'animate-marquee'}`}
      >
        {loop.map((item, i) => (
          <span key={i} className={`flex items-center ${className}`}>
            {item}
            <span className="mx-6 text-ink-300 sm:mx-10" aria-hidden>
              &bull;
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ---------- MagneticButton ---------- */
export function MagneticButton({
  children,
  href = '#',
  className = '',
  strength = 0.3,
  onClick,
}: {
  children: ReactNode
  href?: string
  className?: string
  strength?: number
  onClick?: () => void
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 230, damping: 17, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 230, damping: 17, mass: 0.4 })

  function onMove(e: MouseEvent<HTMLAnchorElement>) {
    if (reduce) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  function reset() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.a>
  )
}

/* ---------- Badge (pastille outline) ---------- */
export function Badge({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-mist-strong bg-paper-100/60 px-4 py-1.5 text-xs font-medium text-ink-600 backdrop-blur ${className}`}
    >
      {children}
    </span>
  )
}

/* ---------- Kicker de section : (LABEL) en parenthèses ---------- */
export function Kicker({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`font-mono text-xs font-medium uppercase tracking-[0.18em] text-ink-500 ${className}`}
    >
      ({children})
    </span>
  )
}
