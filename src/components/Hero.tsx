import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react'
import { useLenis } from 'lenis/react'
import { profile } from '../data'
import { Badge, FadeUp, MaskReveal, MagneticButton, Marquee, Parallax, Stagger, StaggerItem } from './ui'

export default function Hero() {
  const lenis = useLenis()
  const go = (id: string) => lenis?.scrollTo(`#${id}`, { offset: 0 })

  return (
    <section id="accueil" className="relative flex min-h-screen items-center overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-5 py-32 sm:px-8">
        <div className="max-w-4xl">
          <FadeUp>
            <Badge>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink-900 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-500" />
              </span>
              {profile.availability}
            </Badge>
          </FadeUp>

          <h1 className="mt-8 text-6xl font-semibold tracking-[-0.04em] text-ink-900 sm:text-7xl md:text-8xl">
            <MaskReveal>{profile.name}</MaskReveal><span className="text-accent-500">.</span>
          </h1>

          <FadeUp delay={0.12}>
            <p className="mt-6 text-lg text-ink-600 sm:text-xl">
              Développeur DevSecOps · <span className="font-serif italic text-ink-800">Étudiant en cybersécurité</span> à EPITECH
            </p>
          </FadeUp>

          <FadeUp delay={0.18}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed">
              <span className="font-serif italic text-ink-700">{profile.tagline}</span>
            </p>
          </FadeUp>

          <FadeUp delay={0.24}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <MagneticButton
                onClick={() => go('contact')}
                className="group inline-flex items-center gap-2 rounded-full bg-accent-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-600"
              >
                Me contacter
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </MagneticButton>
              <a
                href={profile.cv}
                download
                className="inline-flex items-center gap-2 rounded-full border border-mist-strong px-6 py-3 text-sm font-medium text-ink-900 transition-colors hover:border-ink-900"
              >
                <Download size={15} />
                Télécharger le CV
              </a>
            </div>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="mt-12 flex items-center gap-5 text-ink-500">
              <span className="text-sm">{profile.location}</span>
              <span className="h-4 w-px bg-mist" />
              <Stagger className="flex items-center gap-4" gap={0.06}>
                {[
                  { href: profile.socials.github, icon: Github, label: 'GitHub' },
                  { href: profile.socials.linkedin, icon: Linkedin, label: 'LinkedIn' },
                  { href: `mailto:${profile.email}`, icon: Mail, label: 'Email' },
                ].map(({ href, icon: Icon, label }) => (
                  <StaggerItem key={label}>
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      aria-label={label}
                      className="block text-ink-500 transition-colors hover:text-accent-600"
                    >
                      <Icon size={18} />
                    </a>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </FadeUp>
        </div>
      </div>

      <Parallax className="absolute inset-x-0 bottom-10 -z-0" distance={30}>
        <Marquee
          items={['DevSecOps', 'Cybersécurité', 'Full Stack', 'Cloud', 'EPITECH', 'Sécurité applicative']}
          className="text-4xl font-display font-semibold tracking-tight text-stroke text-transparent sm:text-6xl md:text-7xl"
        />
      </Parallax>
    </section>
  )
}
