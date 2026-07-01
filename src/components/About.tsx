import { motion } from 'framer-motion'
import { GraduationCap, MapPin, Mail } from 'lucide-react'
import { profile, stats, languages, interests } from '../data'
import SectionHeading from './SectionHeading'
import { FadeUp, Stagger, StaggerItem, Kicker } from './ui'

function LanguageBar({ name, level, percent, delay }: { name: string; level: string; percent: number; delay: number }) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-sm font-medium text-ink-800">{name}</span>
        <span className="text-xs text-ink-400">{level}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-paper-200">
        <motion.div
          className="h-full rounded-full bg-ink-900"
          initial={{ width: 0 }}
          whileInView={{ width: `${percent}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

export default function About() {
  return (
    <section id="a-propos" className="scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          label="À propos"
          title="Profil"
          subtitle="Développeur full-stack orienté qualité et sécurité, en formation d'ingénierie logicielle à EPITECH."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[320px_1fr]">
          {/* profile card */}
          <FadeUp>
            <div className="rounded-3xl border border-mist bg-paper-100 p-6 shadow-soft transition-transform duration-300 hover:-translate-y-1 hover:shadow-card">
              <div className="flex items-center gap-4">
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-obsidian text-2xl font-semibold text-paper-50 shadow-tile">
                  {profile.initials}
                </div>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-ink-900">{profile.name}</h3>
                  <p className="text-sm text-ink-500">DevSecOps &amp; Cybersécurité</p>
                </div>
              </div>

              <div className="mt-6 space-y-3 border-t border-mist pt-5 text-sm">
                <div className="flex items-center gap-3 text-ink-600">
                  <GraduationCap size={16} className="shrink-0 text-ink-400" />
                  <span>EPITECH, 3ᵉ année</span>
                </div>
                <div className="flex items-center gap-3 text-ink-600">
                  <MapPin size={16} className="shrink-0 text-ink-400" />
                  <span>{profile.location}</span>
                </div>
                <a
                  href={`mailto:${profile.email}`}
                  className="group flex items-center gap-3 text-ink-600 transition-colors hover:text-ink-900"
                >
                  <Mail size={16} className="shrink-0 text-ink-400 transition-colors group-hover:text-ink-900" />
                  <span className="link-underline truncate">{profile.email}</span>
                </a>
              </div>
            </div>
          </FadeUp>

          {/* right column */}
          <div className="space-y-10">
            <div className="space-y-4">
              {profile.bio.map((p, i) => (
                <FadeUp key={i} delay={i * 0.12}>
                  <p className="text-base leading-relaxed text-ink-600">{p}</p>
                </FadeUp>
              ))}
            </div>

            {/* stats */}
            <Stagger className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-mist bg-mist shadow-soft sm:grid-cols-4">
              {stats.map((s) => (
                <StaggerItem key={s.label} className="bg-paper-100 p-5 text-center">
                  <div className="text-3xl font-semibold tracking-tight text-ink-900">{s.value}</div>
                  <div className="mt-1.5 text-xs font-medium text-ink-500">{s.label}</div>
                  <div className="mt-0.5 text-[11px] text-ink-400">{s.hint}</div>
                </StaggerItem>
              ))}
            </Stagger>

            {/* languages */}
            <FadeUp>
              <Kicker>Langues</Kicker>
              <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                {languages.map((l, i) => (
                  <LanguageBar key={l.name} {...l} delay={i * 0.08} />
                ))}
              </div>
            </FadeUp>

            {/* interests */}
            <div>
              <FadeUp>
                <Kicker>Centres d'intérêt</Kicker>
              </FadeUp>
              <Stagger className="mt-3 flex flex-wrap gap-2">
                {interests.map((it) => (
                  <StaggerItem key={it}>
                    <span className="inline-flex rounded-full border border-mist-strong px-3 py-1.5 text-xs text-ink-600 transition-colors hover:border-ink-900">
                      {it}
                    </span>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
