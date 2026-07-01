import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react'
import { profile } from '../data'
import { FadeUp, Stagger, StaggerItem } from './ui'

export default function Footer() {
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="border-t border-mist py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-5 sm:px-8 md:flex-row">
        <FadeUp className="text-center md:text-left">
          <div className="text-sm font-semibold text-ink-900">{profile.name}</div>
          <p className="mt-1 text-xs text-ink-500">© 2026 · Tous droits réservés</p>
        </FadeUp>

        <Stagger className="flex items-center gap-3">
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
                className="flex h-10 w-10 items-center justify-center rounded-full border border-mist-strong bg-paper-100 text-ink-500 transition-colors hover:border-ink-900 hover:text-ink-900"
              >
                <Icon size={16} />
              </a>
            </StaggerItem>
          ))}
          <StaggerItem>
            <button
              onClick={toTop}
              aria-label="Haut de page"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-mist-strong bg-paper-100 text-ink-500 transition-colors hover:border-ink-900 hover:text-ink-900"
            >
              <ArrowUp size={16} />
            </button>
          </StaggerItem>
        </Stagger>
      </div>
    </footer>
  )
}
