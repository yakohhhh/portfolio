import { Code2, ShieldHalf, Check } from 'lucide-react'
import { devStack, cyberStack, softSkills } from '../data'
import SectionHeading from './SectionHeading'
import { FadeUp, Stagger, StaggerItem, Kicker } from './ui'

function StackCard({
  title,
  subtitle,
  icon,
  items,
}: {
  title: string
  subtitle: string
  icon: React.ReactNode
  items: string[]
}) {
  return (
    <div className="rounded-3xl border border-mist bg-paper-100 p-6 shadow-soft transition-transform duration-300 hover:-translate-y-1 hover:shadow-card sm:p-7">
      <div className="flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-obsidian text-paper-50 shadow-tile">
          {icon}
        </span>
        <div>
          <h3 className="text-2xl font-semibold tracking-tight text-ink-900">{title}</h3>
          <p className="text-sm text-ink-500">{subtitle}</p>
        </div>
      </div>

      <Stagger className="mt-6 flex flex-wrap gap-2">
        {items.map((it) => (
          <StaggerItem key={it}>
            <span className="rounded-full border border-mist-strong px-3 py-1 text-xs text-ink-600">
              {it}
            </span>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="competences" className="scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          label="Compétences"
          title="Compétences & outils"
          subtitle="Deux domaines complémentaires : concevoir des applications fiables et savoir les éprouver."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FadeUp>
            <StackCard
              title="Développement"
              subtitle="Conception & intégration"
              icon={<Code2 size={20} />}
              items={devStack}
            />
          </FadeUp>
          <FadeUp delay={0.08}>
            <StackCard
              title="Cybersécurité"
              subtitle="Tests d'intrusion & défense"
              icon={<ShieldHalf size={20} />}
              items={cyberStack}
            />
          </FadeUp>
        </div>

        {/* soft skills */}
        <FadeUp delay={0.04}>
          <div className="mt-6 rounded-3xl border border-mist bg-paper-100 p-6 shadow-soft sm:p-7">
            <div className="mb-4">
              <Kicker>Savoir-faire</Kicker>
            </div>
            <Stagger className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {softSkills.map((s) => (
                <StaggerItem key={s}>
                  <div className="flex items-center gap-2.5 text-sm text-ink-700">
                    <Check size={15} className="shrink-0 text-ink-900" />
                    {s}
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
