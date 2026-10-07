import { useEffect, useRef } from 'react'
import { site, type Project } from '../data'
import { useContent } from '../i18n'
import { Icon, Label, Reveal, clamp, useMediaQuery, useScrollScene } from './ui'
import { VISUALS } from './ProjectVisuals'

/* ---------- Carte projet ---------- */
const TAGS = {
  build: { label: 'Build', dot: 'bg-build', text: 'text-build-light' },
  break: { label: 'Break', dot: 'bg-break', text: 'text-[#ff7a8c]' },
  secure: { label: 'Secure', dot: 'bg-gradient-to-r from-build to-break', text: 'text-[#c79bff]' },
}

const STATUS = {
  'open-source': { dot: 'bg-[#30d158]' },
  wip: { dot: 'bg-break-2' },
  pro: { dot: 'bg-[#30d158]' },
  soon: { dot: 'bg-break-2' },
}

function ProjectCard({ p, index }: { p: Project; index: number }) {
  const Visual = VISUALS[p.visual]
  const tag = TAGS[p.tag]
  const status = STATUS[p.status]
  const t = useContent().ui.projects
  return (
    <article className="tile-dark flex h-full flex-col border border-white/[0.06] lg:flex-row">
      <div className="relative h-[320px] shrink-0 sm:h-[380px] lg:order-2 lg:h-auto lg:flex-1">
        <Visual />
      </div>
      <div className="flex flex-col justify-between p-7 sm:p-9 lg:w-[44%] lg:shrink-0">
        <div>
          <div className="label flex items-center gap-3">
            <span className="text-white/30">{String(index + 1).padStart(2, '0')}</span>
            <span className={`inline-flex items-center gap-1.5 ${tag.text}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${tag.dot}`} />
              {tag.label}
            </span>
          </div>
          <p className="mt-4 text-[15px] font-medium text-mute">{p.kicker}</p>
          <h3 className="mt-1.5 font-display text-[clamp(28px,2.8vw,38px)] font-semibold leading-[1.06] tracking-[-0.045em] text-white">
            {p.title}
          </h3>
          <p className="mt-3 text-[15.5px] leading-relaxed text-[#a7a7ae]">{p.description}</p>
        </div>
        <div className="mt-6">
          <div className="flex flex-wrap gap-1.5">
            {p.tags.map((t) => (
              <span key={t} className="chip bg-white/[0.07] !px-3 !py-1 !text-[12.5px] text-white/80">
                {t}
              </span>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-[15px]">
            {p.links.demo && (
              <a href={p.links.demo} target="_blank" rel="noreferrer" className="btn-primary !py-2.5 !text-[15px]">
                {t.demo} <Icon name="arrowUpRight" size={15} />
              </a>
            )}
            {p.links.code && (
              <a href={p.links.code} target="_blank" rel="noreferrer" className="link-brand !text-build-light">
                <Icon name="github" size={15} /> {t.code} <Icon name="chevronRight" size={14} />
              </a>
            )}
            {p.links.more && (
              <a href={p.links.more} target="_blank" rel="noreferrer" className="link-brand !text-build-light">
                {t.more} <Icon name="chevronRight" size={14} />
              </a>
            )}
            <span className="inline-flex items-center gap-2 text-white/55">
              <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} /> {t.status[p.status]}
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}

function MoreCard() {
  const t = useContent().ui.projects
  return (
    <a
      href={site.socials.github}
      target="_blank"
      rel="noreferrer"
      className="tile-dark group flex h-full flex-col items-center justify-center border border-white/[0.06] p-10 text-center transition-colors hover:bg-[#1c1c1e]"
    >
      <span className="grid h-16 w-16 place-items-center rounded-full bg-white/[0.08] text-white transition-transform duration-500 group-hover:scale-110">
        <Icon name="github" size={28} />
      </span>
      <p className="mt-6 font-display text-2xl font-semibold tracking-tight text-white">{t.moreTitle}</p>
      <p className="mt-2 text-[15px] text-mute">{t.moreText}</p>
      <span className="link-brand mt-5 !text-build-light">
        {t.moreCta} <Icon name="arrowUpRight" size={15} />
      </span>
    </a>
  )
}

/* ---------- Galerie horizontale épinglée (desktop) ---------- */
function PinnedGallery() {
  const { projects, ui } = useContent()
  const t = ui.projects
  const section = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const bar = useRef<HTMLDivElement>(null)
  const distance = useRef(0)

  useEffect(() => {
    const measure = () => {
      const t = track.current
      const s = section.current
      if (!t || !s) return
      distance.current = Math.max(0, t.offsetWidth - window.innerWidth)
      s.style.height = `${distance.current + window.innerHeight * 1.15}px`
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (track.current) ro.observe(track.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  useScrollScene(section, (p) => {
    const t = track.current
    if (!t) return
    const x = -p * distance.current
    t.style.transform = `translate3d(${x}px, 0, 0)`
    if (bar.current) bar.current.style.transform = `scaleX(${Math.max(0.04, p)})`
    // Les cartes éloignées du centre reculent légèrement.
    const vw = window.innerWidth
    Array.from(t.children).forEach((child) => {
      const el = child as HTMLElement
      const center = el.offsetLeft + x + el.offsetWidth / 2
      const d = clamp(Math.abs(center - vw / 2) / vw)
      el.style.transform = `scale(${1 - d * 0.08})`
      el.style.opacity = String(1 - d * 0.5)
    })
  })

  return (
    <div ref={section} className="relative" style={{ height: '300vh' }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden pt-12">
        <div className="container-wide mb-8 flex items-end justify-between gap-8 xl:mb-10">
          <div>
            <Label index="02" dark>
              {t.eyebrow}
            </Label>
            <h2 className="headline-l mt-4 text-white">
              {t.title}<span className="text-break">.</span>
            </h2>
          </div>
          <p className="hidden max-w-xs pb-2 text-[17px] text-mute xl:block">
            {t.subtitle}
          </p>
        </div>
        <div
          ref={track}
          className="flex w-max gap-6 will-change-transform"
          style={{ paddingLeft: 'max(40px, calc((100vw - 1200px) / 2))', paddingRight: 'max(40px, calc((100vw - 1200px) / 2))' }}
        >
          {projects.map((p, i) => (
            <div key={p.title} className="h-[min(64vh,600px)] w-[min(80vw,1080px)] shrink-0 will-change-transform">
              <ProjectCard p={p} index={i} />
            </div>
          ))}
          <div className="h-[min(64vh,600px)] w-[min(32vw,380px)] shrink-0 will-change-transform">
            <MoreCard />
          </div>
        </div>
        <div className="container-wide mt-8">
          <div className="mx-auto h-[3px] w-40 overflow-hidden rounded-full bg-white/10">
            <div ref={bar} className="h-full w-full origin-left rounded-full bg-white/70" style={{ transform: 'scaleX(0.04)' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const { projects, ui } = useContent()
  const t = ui.projects
  const pinned = useMediaQuery('(min-width: 1024px) and (min-height: 640px)')
  return (
    <section id="projets" data-nav="dark" className="on-dark relative bg-black py-24 lg:py-16">
      {pinned ? (
        <PinnedGallery />
      ) : (
        <div className="container-wide">
          <Reveal>
            <Label index="02" dark>
              {t.eyebrow}
            </Label>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="headline-l mt-4 text-white">
              {t.title}<span className="text-break">.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="lead mt-5 max-w-xl text-mute">
              {t.subtitle}
            </p>
          </Reveal>
          <div className="mt-12 space-y-5">
            {projects.map((p, i) => (
              <Reveal key={p.title} variant="scale">
                <ProjectCard p={p} index={i} />
              </Reveal>
            ))}
            <Reveal variant="scale" className="h-[320px]">
              <MoreCard />
            </Reveal>
          </div>
        </div>
      )}
    </section>
  )
}
