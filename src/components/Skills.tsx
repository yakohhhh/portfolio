import { cyberStack, devStack, softSkills } from '../data'
import { Icon, Reveal, SectionHeading } from './ui'

function DisciplineCard({
  word,
  gradientClass,
  glow,
  icon,
  title,
  text,
  items,
  delay,
  glitch = false,
}: {
  word: string
  gradientClass: string
  glow: string
  icon: string
  title: string
  text: string
  items: string[]
  delay: number
  glitch?: boolean
}) {
  return (
    <Reveal delay={delay} className="tile group flex flex-col bg-silver p-8 md:p-12">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-25 blur-3xl transition-opacity duration-700 group-hover:opacity-45"
        style={{ background: glow }}
      />
      <div className="relative flex items-center justify-between">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-ink shadow-sm">
          <Icon name={icon} size={22} />
        </span>
      </div>
      <p className="relative mt-10 font-display text-[clamp(56px,7vw,96px)] font-semibold leading-none tracking-[-0.06em]">
        <span className={`${gradientClass} ${glitch ? 'glitch' : ''}`} data-text={word}>
          {word}
        </span>
      </p>
      <h3 className="relative mt-5 text-[clamp(22px,2vw,28px)] leading-tight text-ink">{title}</h3>
      <p className="relative mt-3 max-w-md text-[17px] leading-relaxed text-mute-2">{text}</p>
      <div className="relative mt-8 flex flex-wrap gap-2">
        {items.map((it) => (
          <span key={it} className="chip bg-white text-ink">
            {it}
          </span>
        ))}
      </div>
    </Reveal>
  )
}

export default function Skills() {
  return (
    <section id="competences" data-nav="light" className="bg-white py-28 md:py-40">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Compétences"
          index="03"
          title={
            <>
              Deux disciplines.
              <br />
              <span className="text-mute">Un même niveau d’exigence.</span>
            </>
          }
        />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <DisciplineCard
            word="Construire."
            gradientClass="text-gradient-build"
            glow="radial-gradient(circle, #2f7bff, transparent 70%)"
            icon="code"
            title="Développement full-stack"
            text="Des API NestJS aux interfaces React et Ionic : des applications fiables, testées et déployées en continu."
            items={devStack}
            delay={0}
          />
          <DisciplineCard
            word="Casser."
            gradientClass="text-gradient-break"
            glow="radial-gradient(circle, #ff3d5a, transparent 70%)"
            icon="shield"
            title="Cybersécurité offensive & défensive"
            text="Tests d’intrusion, analyse réseau et réponse à incidents : trouver la faille avant qu’un autre ne la trouve."
            items={cyberStack}
            delay={0.1}
            glitch
          />
        </div>

        <Reveal className="tile mt-5 bg-silver p-8 md:p-10">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[220px_1fr] md:items-center">
            <p className="eyebrow text-ink">Savoir-faire</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {softSkills.map((s) => (
                <div key={s} className="flex items-center gap-3 text-[17px] text-ink">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-build-ink">
                    <Icon name="check" size={15} strokeWidth={2.4} />
                  </span>
                  {s}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
