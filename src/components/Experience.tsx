import { education, experiences } from '../data'
import { Reveal, SectionHeading } from './ui'

function Row({
  period,
  current,
  title,
  meta,
  description,
  bullets = [],
  stack = [],
  delay = 0,
}: {
  period: string
  current?: boolean
  title: string
  meta: string
  description: string
  bullets?: string[]
  stack?: string[]
  delay?: number
}) {
  return (
    <Reveal delay={delay} className="grid grid-cols-1 gap-3 py-9 md:grid-cols-[240px_1fr] md:gap-10 md:py-11">
      <div className="flex items-center gap-3 md:block">
        <p className="text-[15px] text-mute-2">{period}</p>
        {current && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e8f2ff] px-2.5 py-0.5 text-[13px] font-medium text-build-ink md:mt-2">
            <span className="h-1.5 w-1.5 rounded-full bg-build-ink" /> En cours
          </span>
        )}
      </div>
      <div>
        <h3 className="text-[clamp(22px,2.2vw,28px)] leading-tight text-ink">{title}</h3>
        <p className="mt-1 text-[17px] text-mute-2">{meta}</p>
        <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink/80">{description}</p>
        {bullets.length > 0 && (
          <ul className="mt-4 max-w-2xl space-y-2">
            {bullets.map((b) => (
              <li key={b} className="flex gap-3 text-[16px] leading-relaxed text-mute-2">
                <span className="mt-[11px] h-1 w-1 shrink-0 rounded-full bg-mute" />
                {b}
              </li>
            ))}
          </ul>
        )}
        {stack.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {stack.map((s) => (
              <span key={s} className="chip bg-white !text-[13px] text-ink">
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </Reveal>
  )
}

export default function Experience() {
  return (
    <section id="parcours" data-nav="light" className="bg-silver py-28 md:py-40">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Parcours"
          index="04"
          title={
            <>
              De l’atelier
              <br className="hidden sm:block" /> au Conseil de l’Europe.
            </>
          }
          subtitle="Quatre expériences, une même ligne directrice : construire des choses utiles, et les rendre sûres."
        />

        <Reveal>
          <p className="eyebrow border-b border-line pb-5 text-ink">Expérience</p>
        </Reveal>
        <div className="divide-y divide-line">
          {experiences.map((e) => (
            <Row
              key={e.role + e.org}
              period={e.period}
              current={e.current}
              title={e.role}
              meta={`${e.org} · ${e.location} · ${e.type}`}
              description={e.description}
              bullets={e.bullets}
              stack={e.stack}
            />
          ))}
        </div>

        <Reveal className="mt-16 md:mt-24">
          <p className="eyebrow border-b border-line pb-5 text-ink">Formation</p>
        </Reveal>
        <div className="divide-y divide-line">
          {education.map((ed) => (
            <Row
              key={ed.degree}
              period={ed.period}
              title={ed.degree}
              meta={`${ed.school} · ${ed.location}`}
              description={ed.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
