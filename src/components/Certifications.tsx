import { BadgeCheck, ExternalLink } from 'lucide-react'
import { certifications } from '../data'
import SectionHeading from './SectionHeading'
import { Stagger, StaggerItem } from './ui'

export default function Certifications() {
  return (
    <section id="certifications" className="scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          label="Certifications"
          title="Certifications"
          subtitle="Parcours validés sur TryHackMe, côté offensif comme défensif."
        />

        <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {certifications.map((c) => (
            <StaggerItem key={c.id} className="h-full">
              <a
                href={c.url}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col rounded-3xl border border-mist bg-paper-100 p-6 shadow-soft transition-transform duration-300 hover:-translate-y-1 hover:border-accent-300 hover:shadow-card"
              >
                <div className="flex items-start gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-obsidian text-sm font-semibold text-paper-50 shadow-tile">
                    {c.badge}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-base font-semibold tracking-tight text-ink-900">
                        {c.name}
                      </h3>
                      <BadgeCheck size={15} className="shrink-0 text-accent-500" />
                    </div>
                    <p className="text-sm text-ink-500">
                      {c.issuer} · {c.date}
                    </p>
                  </div>
                  <ExternalLink
                    size={15}
                    className="shrink-0 text-ink-300 transition-colors group-hover:text-ink-900"
                  />
                </div>

                <div className="mt-5 border-t border-mist pt-4">
                  <span className="font-mono text-xs text-ink-400">ID : {c.id}</span>
                </div>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
