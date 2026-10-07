import { interests, languages, profile, stats } from '../data'
import { Break, Counter, Icon, Reveal, SectionHeading, useInView } from './ui'

function Languages() {
  const [ref, inView] = useInView<HTMLDivElement>(0.3)
  return (
    <div ref={ref} className={`mt-6 space-y-5 ${inView ? 'is-in' : ''}`}>
      {languages.map((l, i) => (
        <div key={l.name}>
          <div className="mb-2 flex items-baseline justify-between text-[15px]">
            <span className="font-medium text-ink">{l.name}</span>
            <span className="text-mute">{l.level}</span>
          </div>
          <div className="h-[5px] overflow-hidden rounded-full bg-silver">
            <div
              className="bar-fill h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, var(--color-build), var(--color-secure), var(--color-break))',
                backgroundSize: `${(100 / l.percent) * 100}% 100%`,
                ['--v' as string]: l.percent / 100,
                ['--d' as string]: `${0.1 + i * 0.1}s`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function About() {
  return (
    <section id="a-propos" data-nav="light" className="bg-silver py-28 md:py-40">
      <div className="container-wide">
        <SectionHeading
          eyebrow="À propos"
          index="01"
          title={
            <>
              Un développeur qui pense comme un <Break>attaquant.</Break>
            </>
          }
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-5 lg:grid-cols-12">
          {/* Portrait */}
          <Reveal variant="scale" className="tile min-h-[460px] md:col-span-3 md:row-span-2 lg:col-span-5">
            <picture>
              <source type="image/webp" srcSet={profile.photos.portrait} />
              <img
                src={profile.photos.portraitFallback}
                alt="Portrait d'Ayman Mazroui"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: '50% 22%' }}
              />
            </picture>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent p-7 pt-24">
              <p className="font-display text-2xl font-semibold tracking-tight text-white">{profile.name}</p>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[15px] text-white/75">
                <span className="inline-flex items-center gap-1.5">
                  <Icon name="mapPin" size={15} /> {profile.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Icon name="graduation" size={15} /> EPITECH, 4ᵉ année
                </span>
              </div>
            </div>
          </Reveal>

          {/* Bio */}
          <Reveal delay={0.08} className="tile p-8 md:col-span-3 md:p-10 lg:col-span-7">
            <p className="font-display text-[clamp(22px,2vw,28px)] font-semibold leading-snug tracking-tight text-ink">
              {profile.tagline}
            </p>
            <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-mute-2">
              {profile.bio.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>

          {/* Chiffres */}
          <div className="grid grid-cols-2 gap-4 md:col-span-3 md:gap-5 lg:col-span-7 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.06 * i} className="tile flex flex-col justify-between p-6">
                <p className="font-display text-[clamp(36px,3.3vw,48px)] font-semibold leading-none tracking-[-0.04em] text-ink">
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <div className="mt-6">
                  <p className="text-[15px] font-medium text-ink">{s.label}</p>
                  <p className="text-[13px] text-mute">{s.hint}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Langues */}
          <Reveal className="tile p-8 md:col-span-3 lg:col-span-5">
            <p className="eyebrow text-ink">Langues</p>
            <Languages />
          </Reveal>

          {/* Centres d'intérêt */}
          <Reveal delay={0.08} className="tile p-8 md:col-span-3 lg:col-span-4">
            <p className="eyebrow text-ink">Centres d’intérêt</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {interests.map((it) => (
                <span key={it} className="chip bg-silver text-ink">
                  {it}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Disponibilité */}
          <Reveal delay={0.16} className="tile-dark flex flex-col justify-between p-8 md:col-span-6 lg:col-span-3">
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-60 blur-3xl"
              style={{ background: 'radial-gradient(circle, #2f7bff, transparent 70%)' }}
            />
            <span className="relative flex h-2.5 w-2.5">
              <span className="ping absolute inline-flex h-full w-full rounded-full bg-[#30d158] opacity-70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#30d158]" />
            </span>
            <div className="relative mt-8">
              <p className="font-display text-2xl font-semibold leading-tight tracking-tight text-white">
                Disponible.
              </p>
              <p className="mt-2 text-[15px] leading-snug text-mute">Alternance & stage, dès maintenant.</p>
              <a href="#contact" className="link-brand mt-4 !text-build-light">
                Discutons-en <Icon name="chevronRight" size={15} />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
