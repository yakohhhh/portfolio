import { useState, type FormEvent } from 'react'
import { useContent } from '../i18n'
import { Icon, Label, Mark, Reveal } from './ui'

export default function Contact() {
  const { profile, ui } = useContent()
  const t = ui.contact
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = profile.email
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`${t.subject} : ${form.name || t.newMessage}`)
    const body = encodeURIComponent(`${form.message}\n\n${form.name}\n${form.email}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  const field =
    'w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-[17px] text-white placeholder:text-white/30 outline-none transition-colors focus:border-build-light focus:bg-white/[0.06]'

  const socials = [
    { href: profile.socials.linkedin, icon: 'linkedin', label: 'LinkedIn' },
    { href: profile.socials.github, icon: 'github', label: 'GitHub' },
    { href: profile.socials.tryhackme, icon: 'flag', label: 'TryHackMe' },
  ]

  return (
    <section id="contact" data-nav="dark" className="on-dark relative overflow-hidden bg-black py-32 md:py-44">
      {/* halo */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[1000px] max-w-[160vw] -translate-x-1/2 -translate-y-[10%] rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(ellipse, #2f7bff 0%, #a35bff 35%, #ff3d5a 55%, transparent 72%)' }}
      />

      <div className="container-narrow relative text-center">
        <Reveal className="flex flex-col items-center gap-6">
          <Mark size={56} />
          <Label index="06" dark>
            {t.eyebrow}
          </Label>
        </Reveal>
        <Reveal className="mt-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[14px] text-white/70">
            <span className="relative flex h-2 w-2">
              <span className="ping absolute inline-flex h-full w-full rounded-full bg-[#30d158] opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#30d158]" />
            </span>
            {profile.availability}
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="headline-xl mt-8 text-white">
            {t.title[0]}
            <br />
            <span className="text-gradient">{t.title[1]}</span>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="lead mx-auto mt-6 max-w-xl text-mute">
            {t.subtitle}
          </p>
        </Reveal>

        {/* Email */}
        <Reveal delay={0.24} className="mt-12">
          <div className="mx-auto inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] p-1.5 pl-6 backdrop-blur">
            <a
              href={`mailto:${profile.email}`}
              className="truncate font-display text-[clamp(17px,2.2vw,24px)] font-medium tracking-tight text-white hover:underline hover:underline-offset-4"
            >
              {profile.email}
            </a>
            <button
              onClick={copy}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-[15px] font-medium text-black transition-transform active:scale-95"
              aria-label={t.copyAria}
            >
              <Icon name={copied ? 'check' : 'copy'} size={15} strokeWidth={2} />
              <span className="hidden sm:inline">{copied ? t.copied : t.copy}</span>
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.3} className="mt-8 flex flex-wrap justify-center gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-[15px] text-white/80 transition-colors hover:border-white/30 hover:text-white"
            >
              <Icon name={s.icon} size={16} /> {s.label}
            </a>
          ))}
          <a
            href={profile.cv}
            download
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-[15px] text-white/80 transition-colors hover:border-white/30 hover:text-white"
          >
            <Icon name="download" size={16} /> CV
          </a>
        </Reveal>

        {/* Formulaire */}
        <Reveal delay={0.1} className="mx-auto mt-20 max-w-2xl text-left">
          <form onSubmit={submit} className="tile-dark border border-white/[0.06] p-6 md:p-10">
            <p className="font-display text-2xl font-semibold tracking-tight text-white">{t.formTitle}</p>
            <p className="mt-1 text-[15px] text-mute">{t.formText}</p>
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="sr-only">{t.name}</span>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={t.name}
                  autoComplete="name"
                  className={field}
                />
              </label>
              <label className="block">
                <span className="sr-only">Email</span>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder={t.email}
                  autoComplete="email"
                  className={field}
                />
              </label>
            </div>
            <label className="mt-3 block">
              <span className="sr-only">Message</span>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder={t.message}
                className={`${field} resize-none`}
              />
            </label>
            <button type="submit" className="btn-primary mt-6 w-full justify-center sm:w-auto">
              {t.send} <Icon name="send" size={16} />
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
