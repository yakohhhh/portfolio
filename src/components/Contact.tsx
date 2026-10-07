import { useRef, useState, type FormEvent } from 'react'
import { useLang } from '../i18n'
import { Icon, Label, Mark, Reveal } from './ui'

export default function Contact() {
  const { c, lang } = useLang()
  const { profile, ui } = c
  const t = ui.contact
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error' | 'invalid' | 'limited'>('idle')
  const startedAt = useRef(Date.now())
  const honeypot = useRef<HTMLInputElement>(null)
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

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          ...form,
          lang,
          startedAt: startedAt.current,
          website: honeypot.current?.value || '',
        }),
      })
      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', message: '' })
        return
      }
      const data = await res.json().catch(() => ({}))
      setStatus(data.error === 'invalid_email' ? 'invalid' : res.status === 429 ? 'limited' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const mailtoHref = `mailto:${profile.email}?subject=${encodeURIComponent(
    `${t.subject} : ${form.name || t.newMessage}`,
  )}&body=${encodeURIComponent(`${form.message}\n\n${form.name}\n${form.email}`)}`

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
          {status === 'sent' ? (
            <div className="tile-dark border border-white/[0.06] p-6 text-center md:p-10" role="status">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#30d158]/15 text-[#5fe08a]">
                <Icon name="check" size={26} strokeWidth={2.2} />
              </span>
              <p className="mt-5 font-display text-2xl font-semibold tracking-tight text-white">{t.sentTitle}</p>
              <p className="mt-2 text-[15px] text-mute">{t.sentText}</p>
              <button
                type="button"
                onClick={() => {
                  startedAt.current = Date.now()
                  setStatus('idle')
                }}
                className="link-brand mt-6 !text-build-light"
              >
                {t.sendAnother} <Icon name="chevronRight" size={15} />
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="tile-dark border border-white/[0.06] p-6 md:p-10" noValidate={false}>
              <p className="font-display text-2xl font-semibold tracking-tight text-white">{t.formTitle}</p>
              <p className="mt-1 text-[15px] text-mute">{t.formText}</p>
              {/* Champ piège invisible pour les robots */}
              <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
                <label>
                  Website
                  <input ref={honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>
              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="sr-only">{t.name}</span>
                  <input
                    required
                    maxLength={100}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={t.name}
                    autoComplete="name"
                    className={field}
                  />
                </label>
                <label className="block">
                  <span className="sr-only">{t.email}</span>
                  <input
                    required
                    type="email"
                    maxLength={200}
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
                  maxLength={5000}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder={t.message}
                  className={`${field} resize-none`}
                />
              </label>
              {(status === 'error' || status === 'invalid' || status === 'limited') && (
                <p className="mt-4 rounded-xl bg-break/10 px-4 py-3 text-[14px] leading-relaxed text-[#ff9aa8]" role="alert">
                  {status === 'invalid' ? (
                    t.invalidEmail
                  ) : (
                    <>
                      {status === 'limited' ? t.rateLimited : t.errorText}{' '}
                      <a href={mailtoHref} className="underline underline-offset-2 hover:text-white">
                        {profile.email}
                      </a>
                      .
                    </>
                  )}
                </p>
              )}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary mt-6 w-full justify-center disabled:cursor-wait disabled:opacity-70 sm:w-auto"
              >
                {status === 'sending' ? t.sending : t.send}{' '}
                <Icon name="send" size={16} className={status === 'sending' ? 'animate-pulse' : ''} />
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
