import { Github, ExternalLink } from 'lucide-react'
import { projects } from '../data'
import SectionHeading from './SectionHeading'
import { FadeUp, Parallax, Stagger, StaggerItem, Kicker } from './ui'

function LinkButton({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  if (!href) {
    return (
      <span className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-full border border-mist px-4 py-2 text-xs font-medium text-ink-300">
        {icon}
        {label} · bientôt
      </span>
    )
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 rounded-full border border-mist-strong px-4 py-2 text-xs font-medium text-ink-900 transition-colors hover:border-ink-900"
    >
      {icon}
      {label}
    </a>
  )
}

function FeaturedCard({ p }: { p: (typeof projects)[number] }) {
  return (
    <div className="rounded-3xl border border-mist bg-paper-100 p-8 shadow-card sm:p-10">
      <div className="flex items-center justify-between gap-4">
        <Kicker>À la une</Kicker>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-400">
          Projet phare
        </span>
      </div>

      <h3 className="mt-5 text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
        {p.title}
      </h3>
      <p className="mt-3 max-w-2xl font-serif text-lg italic leading-snug text-ink-700">
        Conçu pour durer, pensé dans le détail.
      </p>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-600">{p.description}</p>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {p.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-mist-strong px-3 py-1 text-xs text-ink-600"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <LinkButton href={p.links.demo} icon={<ExternalLink size={14} />} label="Tester la démo" />
        <LinkButton href={p.links.code} icon={<Github size={14} />} label="Code source" />
      </div>
    </div>
  )
}

function ProjectCard({ p, index }: { p: (typeof projects)[number]; index: number }) {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-mist bg-paper-100 p-6 shadow-soft transition-transform duration-300 hover:-translate-y-1 hover:shadow-card">
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-sm text-ink-400">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="shrink-0 rounded-full border border-mist-strong px-3 py-1 text-[11px] text-ink-600">
          Professionnel
        </span>
      </div>

      <h3 className="mt-4 text-2xl font-semibold tracking-tight text-ink-900">{p.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">{p.description}</p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {p.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-mist-strong px-3 py-1 text-xs text-ink-600"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  return (
    <section id="projets" className="scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          label="Réalisations"
          title="Projets"
          subtitle="Une sélection de réalisations, et un emplacement réservé pour ma prochaine release publique."
        />

        <div className="space-y-6">
          {featured.map((p) => (
            <Parallax key={p.title} distance={28}>
              <FadeUp>
                <FeaturedCard p={p} />
              </FadeUp>
            </Parallax>
          ))}

          <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {rest.map((p, i) => (
              <StaggerItem key={p.title} className="h-full">
                <ProjectCard p={p} index={i} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}
