import { useMemo, useRef } from 'react'
import { manifesto } from '../data'
import { Label, range, useScrollScene } from './ui'

/** Couleur interpolée bleu → violet → rouge pour les groupes « secure ». */
function secureColor(t: number) {
  const stops = [
    [47, 123, 255],
    [163, 91, 255],
    [255, 61, 90],
  ]
  const x = t * (stops.length - 1)
  const i = Math.min(stops.length - 2, Math.floor(x))
  const f = x - i
  const c = stops[i].map((v, k) => Math.round(v + (stops[i + 1][k] - v) * f))
  return `rgb(${c.join(',')})`
}

/** Texte qui s'illumine mot à mot au rythme du scroll. */
export default function Manifesto() {
  const section = useRef<HTMLElement>(null)
  const words = useRef<(HTMLSpanElement | null)[]>([])
  const label = useRef<HTMLDivElement>(null)

  const tokens = useMemo(() => {
    // [build]  *break*  {secure}
    type Tone = 'build' | 'break' | 'secure' | null
    const out: { text: string; tone: Tone; pos: number }[] = []
    manifesto.split(/(\[[^\]]+\]|\*[^*]+\*|\{[^}]+\})/g).forEach((chunk) => {
      if (!chunk) return
      const tone: Tone = chunk.startsWith('[')
        ? 'build'
        : chunk.startsWith('*')
          ? 'break'
          : chunk.startsWith('{')
            ? 'secure'
            : null
      const words = chunk.replace(/[[\]*{}]/g, '').split(/ +/).filter(Boolean)
      words.forEach((w, k) => out.push({ text: w, tone, pos: words.length > 1 ? k / (words.length - 1) : 0.5 }))
    })
    return out
  }, [])

  useScrollScene(section, (p) => {
    const n = tokens.length
    if (label.current) label.current.style.opacity = String(0.4 + range(p, 0, 0.1) * 0.6)
    words.current.forEach((el, i) => {
      if (!el) return
      const start = 0.08 + (i / n) * 0.72
      const v = range(p, start, start + 0.06)
      el.style.opacity = String(0.16 + v * 0.84)
    })
  })

  return (
    <section ref={section} data-nav="dark" className="relative h-[260vh] bg-black" aria-label="Manifeste">
      <div className="sticky top-0 flex h-[100svh] items-center">
        <div className="container-narrow">
          <div ref={label} className="mb-6 md:mb-8">
            <Label dark>Ma philosophie</Label>
          </div>
          <p className="font-display text-[clamp(30px,4.6vw,64px)] font-semibold leading-[1.12] tracking-[-0.03em] text-white">
            {tokens.map((t, i) => (
              <span key={i}>
                <span
                  ref={(el) => {
                    words.current[i] = el
                  }}
                  className={`transition-opacity duration-200 ${
                    t.tone === 'build'
                      ? 'text-gradient-build'
                      : t.tone === 'break'
                        ? 'text-gradient-break'
                        : ''
                  }`}
                  style={{ opacity: 0.16, color: t.tone === 'secure' ? secureColor(t.pos) : undefined }}
                >
                  {t.text}
                </span>{' '}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  )
}
