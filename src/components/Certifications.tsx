import { site } from '../data'
import { useContent } from '../i18n'
import { Icon, Reveal, SectionHeading } from './ui'

export default function Certifications() {
  const { certifications, ui } = useContent()
  const t = ui.certifications
  return (
    <section id="certifications" data-nav="light" className="bg-white py-28 md:py-40">
      <div className="container-wide">
        <SectionHeading
          eyebrow={t.eyebrow}
          index="05"
          title={
            <>
              {t.title[0]}
              <span className="text-mute">{t.title[1]}</span>
            </>
          }
          subtitle={t.subtitle}
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {certifications.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.1}>
              <a
                href={c.url}
                target="_blank"
                rel="noreferrer"
                className="tile group flex h-full flex-col bg-silver p-8 transition-transform duration-500 ease-[var(--ease-brand)] hover:scale-[1.015] md:p-10"
              >
                <div className="flex items-start justify-between">
                  <div className="relative grid h-24 w-24 place-items-center">
                    <div
                      className="absolute inset-0 rounded-[28px] opacity-90"
                      style={{
                        background:
                          c.tone === 'break'
                            ? 'linear-gradient(135deg,#ff3d5a,#ff8a3d)'
                            : 'linear-gradient(135deg,#2f7bff,#00b2ff)',
                      }}
                    />
                    <div className="absolute inset-[3px] rounded-[25px] bg-white" />
                    <span
                      className={`relative font-display text-2xl font-bold tracking-tight ${
                        c.tone === 'break' ? 'text-gradient-break' : 'text-gradient-build'
                      }`}
                    >
                      {c.badge}
                    </span>
                  </div>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-mute-2 transition-colors group-hover:text-ink">
                    <Icon name="arrowUpRight" size={18} />
                  </span>
                </div>
                <h3 className="mt-10 text-[clamp(26px,2.6vw,34px)] leading-tight text-ink">{c.name}</h3>
                <p className="mt-2 flex items-center gap-2 text-[17px] text-mute-2">
                  <Icon name="shieldCheck" size={17} className="text-build-ink" />
                  {c.issuer} · {c.date}
                </p>
                <p className="mt-auto pt-8 font-mono text-[13px] text-mute">ID {c.id}</p>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 text-center">
          <a href={site.socials.tryhackme} target="_blank" rel="noreferrer" className="link-brand text-[17px]">
            {t.profile} <Icon name="chevronRight" size={16} />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
