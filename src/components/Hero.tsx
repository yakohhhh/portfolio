import { useRef } from 'react'
import { profile } from '../data'
import { Break, Build, Icon, Label, ease, lerp, range, useScrollScene } from './ui'

/**
 * Scène d'ouverture « keynote » :
 * 1. Le titre est présenté, la photo attend en dessous dans une fenêtre arrondie.
 * 2. Au scroll, le titre s'efface et la photo s'ouvre jusqu'à remplir l'écran.
 * 3. Deux phrases apparaissent par-dessus, puis la scène plonge dans le noir.
 */
export default function Hero({ ready }: { ready: boolean }) {
  const section = useRef<HTMLElement>(null)
  const headline = useRef<HTMLDivElement>(null)
  const frame = useRef<HTMLDivElement>(null)
  const photo = useRef<HTMLImageElement>(null)
  const scrim = useRef<HTMLDivElement>(null)
  const line1 = useRef<HTMLParagraphElement>(null)
  const line2 = useRef<HTMLParagraphElement>(null)
  const fade = useRef<HTMLDivElement>(null)
  const cue = useRef<HTMLDivElement>(null)

  useScrollScene(section, (p) => {
    const vh = window.innerHeight
    const vw = window.innerWidth
    const h = headline.current
    if (!h || !frame.current || !photo.current) return

    // Position de départ de la fenêtre photo : juste sous le titre.
    const headBottom = h.offsetTop + h.offsetHeight
    const top0 = Math.min(72, ((headBottom + (vw < 768 ? 28 : 48)) / vh) * 100)
    const side0 = vw < 768 ? 5 : vw < 1200 ? 14 : 20
    const bottom0 = vw < 768 ? 4 : 5
    const radius0 = vw < 768 ? 22 : 30

    // 1. Le titre s'efface
    const t = range(p, 0, 0.26)
    h.style.opacity = String(1 - t)
    h.style.transform = `translate3d(0, ${-t * 90}px, 0) scale(${1 - t * 0.07})`
    if (cue.current) cue.current.style.opacity = String(1 - range(p, 0, 0.06))

    // 2. La fenêtre s'ouvre
    const e = ease(range(p, 0.02, 0.5))
    const top = lerp(top0, 0, e)
    const side = lerp(side0, 0, e)
    const bottom = lerp(bottom0, 0, e)
    const radius = lerp(radius0, 0, e)
    frame.current.style.clipPath = `inset(${top}% ${side}% ${bottom}% ${side}% round ${radius}px)`

    // La photo glisse pour garder le visage dans la fenêtre
    const center0 = (top0 + 100 - bottom0) / 2
    const ty = lerp(center0 - 34, 0, e)
    photo.current.style.transform = `translate3d(0, ${ty}vh, 0) scale(${lerp(1.08, 1, e)})`

    // 3. Les phrases
    if (scrim.current) scrim.current.style.opacity = String(range(p, 0.42, 0.6))
    const l1 = ease(range(p, 0.5, 0.64))
    const l2 = ease(range(p, 0.64, 0.78))
    if (line1.current) {
      line1.current.style.opacity = String(l1)
      line1.current.style.transform = `translate3d(0, ${(1 - l1) * 40}px, 0)`
    }
    if (line2.current) {
      line2.current.style.opacity = String(l2)
      line2.current.style.transform = `translate3d(0, ${(1 - l2) * 40}px, 0)`
    }

    // 4. Fondu au noir vers la scène suivante
    if (fade.current) fade.current.style.opacity = String(range(p, 0.86, 1))
  })

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="accueil"
      ref={section}
      data-nav="dark"
      className={`relative h-[320vh] bg-black ${ready ? 'is-ready' : ''}`}
      aria-label="Présentation"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Photo dans sa fenêtre */}
        <div className="hero-photo-enter absolute inset-0">
          <div
            ref={frame}
            className="absolute inset-0 will-change-[clip-path]"
            style={{ clipPath: 'inset(62% 20% 5% 20% round 30px)' }}
          >
            <picture>
              <source
                type="image/webp"
                srcSet={`${profile.photos.heroSmall} 1280w, ${profile.photos.hero} 2400w`}
                sizes="100vw"
              />
              <img
                ref={photo}
                src={profile.photos.heroFallback}
                alt="Ayman Mazroui, micro en main, sur scène devant un écran géant"
                className="h-full w-full object-cover will-change-transform"
                style={{ objectPosition: '46% 30%' }}
              />
            </picture>
            <div
              ref={scrim}
              className="absolute inset-0 opacity-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 28%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.88) 100%), linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 60%)',
              }}
            />
            <div className="absolute inset-x-0 bottom-0">
              <div className="container-wide pb-[9vh] md:pb-[11vh]">
                <p
                  ref={line1}
                  className="font-display text-[clamp(34px,4.6vw,68px)] font-semibold leading-[1.05] tracking-[-0.035em] text-white opacity-0"
                >
                  Je <Build>construis</Build> des applications solides.
                </p>
                <p
                  ref={line2}
                  className="mt-1 font-display text-[clamp(34px,4.6vw,68px)] font-semibold leading-[1.05] tracking-[-0.035em] opacity-0"
                >
                  <span className="text-white">Puis j’essaie de les </span>
                  <Break>casser.</Break>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Titre */}
        <div ref={headline} className="relative z-10 pt-[max(96px,13vh)] text-center will-change-transform">
          <div className="container-narrow">
            <div className="hero-enter flex justify-center" style={{ ['--d' as string]: '0s' }}>
              <Label dark>
                Build · Break · Secure<span className="hidden sm:inline"> · Portfolio 2026</span>
              </Label>
            </div>
            <h1
              className="hero-enter headline-xl mt-3 font-display font-semibold text-white"
              style={{ ['--d' as string]: '0.08s' }}
            >
              {profile.name}
              <span className="text-break">.</span>
            </h1>
            <p
              className="hero-enter lead mx-auto mt-5 max-w-2xl text-[#a1a1a6]"
              style={{ ['--d' as string]: '0.18s' }}
            >
              {profile.headline} <span className="text-white">{profile.subheadline}</span>
            </p>
            <div
              className="hero-enter mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
              style={{ ['--d' as string]: '0.28s' }}
            >
              <button onClick={() => go('contact')} className="btn-primary">
                Me contacter
              </button>
              <a href={profile.cv} download className="link-brand text-[17px] !text-build-light">
                Télécharger le CV <Icon name="chevronRight" size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Indice de scroll */}
        <div
          ref={cue}
          className="pointer-events-none absolute inset-x-0 bottom-[1.2vh] z-10 hidden justify-center text-white/40 md:flex"
        >
          <span className="hero-enter" style={{ ['--d' as string]: '0.9s' }}>
            <Icon name="chevronDown" size={22} className="float-slow" />
          </span>
        </div>

        <div ref={fade} className="pointer-events-none absolute inset-0 bg-black opacity-0" />
      </div>
    </section>
  )
}
