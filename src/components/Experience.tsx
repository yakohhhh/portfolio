import { Briefcase, GraduationCap } from 'lucide-react'
import { experiences, education } from '../data'
import SectionHeading from './SectionHeading'
import { Stagger, StaggerItem, Kicker } from './ui'

const subLabel =
  'mb-8 flex items-center gap-2.5 font-mono text-xs font-medium uppercase tracking-[0.18em] text-ink-500'

function TimelineExperience() {
  return (
    <div>
      <div className={subLabel}>
        <Briefcase size={15} className="text-ink-700" />
        <Kicker>Expérience</Kicker>
      </div>
      <Stagger className="relative space-y-8 border-l border-mist pl-7">
        {experiences.map((exp, i) => (
          <StaggerItem key={i}>
            <div className="relative">
              {exp.current ? (
                <span className="absolute -left-[35px] top-1.5 h-3 w-3 rounded-full bg-accent-500 ring-4 ring-paper-50" />
              ) : (
                <span className="absolute -left-[33px] top-2 h-2.5 w-2.5 rounded-full bg-ink-300" />
              )}

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="font-mono text-xs text-ink-500">{exp.period}</span>
                {exp.current && (
                  <span className="rounded-full border border-accent-200 px-2.5 py-0.5 text-xs text-accent-600">
                    En cours
                  </span>
                )}
              </div>

              <h4 className="mt-2 text-xl font-semibold tracking-tight text-ink-900">{exp.role}</h4>
              <p className="text-sm text-ink-600">
                {exp.org} · {exp.location}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{exp.description}</p>

              {exp.bullets.length > 0 && (
                <ul className="mt-3 space-y-1.5">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="flex gap-2.5 text-sm text-ink-600">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-400" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}

              {exp.stack.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {exp.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-mist-strong px-3 py-1 text-xs text-ink-600"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  )
}

function TimelineEducation() {
  return (
    <div>
      <div className={subLabel}>
        <GraduationCap size={15} className="text-ink-700" />
        <Kicker>Formation</Kicker>
      </div>
      <Stagger className="relative space-y-8 border-l border-mist pl-7">
        {education.map((ed, i) => (
          <StaggerItem key={i}>
            <div className="relative">
              <span className="absolute -left-[33px] top-2 h-2.5 w-2.5 rounded-full bg-ink-300" />
              <span className="font-mono text-xs text-ink-500">{ed.period}</span>
              <h4 className="mt-2 text-xl font-semibold tracking-tight text-ink-900">{ed.degree}</h4>
              <p className="text-sm text-ink-600">
                {ed.school} · {ed.location}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{ed.description}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  )
}

export default function Experience() {
  return (
    <section id="parcours" className="scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          label="Parcours"
          title="Expérience & formation"
          subtitle="De l'atelier de contrôle technique au Conseil de l'Europe, en passant par EPITECH."
        />
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <TimelineExperience />
          <TimelineEducation />
        </div>
      </div>
    </section>
  )
}
