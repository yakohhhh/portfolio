import { useState } from 'react'
import { Mail, Phone, MapPin, Send, Github, Linkedin, ArrowUpRight } from 'lucide-react'
import { profile } from '../data'
import SectionHeading from './SectionHeading'
import { Badge, FadeUp, Stagger, StaggerItem } from './ui'

const contactItems = [
  { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: 'Téléphone', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
  { icon: MapPin, label: 'Localisation', value: profile.location, href: '' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Contact portfolio - ${form.name || 'Anonyme'}`)
    const body = encodeURIComponent(`${form.message}\n\n- ${form.name}\n${form.email}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  const field =
    'w-full rounded-xl border border-mist bg-paper-50 px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 outline-none transition-colors focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20'

  return (
    <section id="contact" className="scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          label="Contact"
          title="Me contacter"
          subtitle="Une alternance, un stage ou un projet ? Ma boîte mail est ouverte."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.1fr]">
          {/* left - infos */}
          <div className="space-y-4">
            <FadeUp>
              <Badge>
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-500 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-500" />
                </span>
                {profile.availability}
              </Badge>
            </FadeUp>

            <Stagger className="space-y-4">
              {contactItems.map((c) => {
                const Inner = (
                  <div className="flex items-center gap-4 rounded-3xl border border-mist bg-paper-100 p-4 shadow-soft transition-transform duration-300 hover:-translate-y-1 hover:shadow-card">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-obsidian text-paper-50 shadow-tile">
                      <c.icon size={17} />
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs text-ink-500">{c.label}</div>
                      <div className="truncate text-sm font-medium text-ink-800">{c.value}</div>
                    </div>
                    {c.href && <ArrowUpRight size={16} className="ml-auto text-ink-300" />}
                  </div>
                )
                return (
                  <StaggerItem key={c.label}>
                    {c.href ? (
                      <a href={c.href} className="block">
                        {Inner}
                      </a>
                    ) : (
                      Inner
                    )}
                  </StaggerItem>
                )
              })}
            </Stagger>

            <FadeUp delay={0.18}>
              <div className="flex gap-3 pt-1">
                {[
                  { href: profile.socials.github, icon: Github, label: 'GitHub' },
                  { href: profile.socials.linkedin, icon: Linkedin, label: 'LinkedIn' },
                ].map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-mist-strong bg-paper-50 text-ink-500 transition-colors hover:border-accent-500 hover:text-accent-600"
                  >
                    <Icon size={17} />
                  </a>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* right - form */}
          <FadeUp delay={0.08}>
            <form
              onSubmit={submit}
              className="rounded-3xl border border-mist bg-paper-100 p-6 shadow-card sm:p-8"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-ink-600">Nom</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Votre nom"
                    className={field}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-ink-600">Email</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="vous@exemple.com"
                    className={field}
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="mb-1.5 block text-xs font-medium text-ink-600">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Bonjour Ayman,"
                  className={`${field} resize-none`}
                />
              </div>
              <button
                type="submit"
                className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent-500 px-6 py-3.5 text-sm font-medium text-white shadow-soft transition-colors hover:bg-accent-600 sm:w-auto"
              >
                Envoyer le message
                <Send size={15} className="transition-transform group-hover:translate-x-0.5" />
              </button>
              <p className="mt-3 text-xs text-ink-400">
                Ouvre votre messagerie avec le message pré-rempli.
              </p>
            </form>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
