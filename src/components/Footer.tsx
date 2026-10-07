import { brand, navLinks, profile } from '../data'
import { Icon, Mark, Reveal } from './ui'

export default function Footer() {
  const [build, brk, secure] = brand.signature
  return (
    <footer data-nav="dark" className="relative overflow-hidden bg-black pb-10 text-[13px] text-mute">
      <div className="container-wide">
        {/* Signature */}
        <Reveal className="border-t border-line-dark pb-14 pt-16 md:pb-20 md:pt-24">
          <p className="font-display text-[clamp(52px,11vw,176px)] font-semibold leading-[0.9] tracking-[-0.065em] text-white">
            <span className="text-gradient-build">{build}</span>{' '}
            <span className="text-gradient-break glitch" data-text={brk}>
              {brk}
            </span>{' '}
            <span className="text-white">{secure}</span>
          </p>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-mute">{brand.motto}</p>
        </Reveal>

        <div className="flex flex-col gap-6 border-t border-line-dark pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3 text-white">
            <Mark size={28} />
            <span className="font-display text-[15px] font-semibold tracking-[-0.03em]">{profile.name}</span>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Liens de pied de page">
            {navLinks.map((l) => (
              <a key={l.id} href={`#${l.id}`} className="transition-colors hover:text-white">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <a href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-white">
              <Icon name="github" size={17} />
            </a>
            <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-white">
              <Icon name="linkedin" size={17} />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Email" className="hover:text-white">
              <Icon name="mail" size={17} />
            </a>
            <a
              href="#accueil"
              aria-label="Revenir en haut"
              className="ml-2 grid h-9 w-9 place-items-center rounded-full border border-line-dark transition-colors hover:border-white/40 hover:text-white"
            >
              <Icon name="arrowUp" size={15} />
            </a>
          </div>
        </div>
        <p className="label mt-8 !text-[11px] text-white/30">
          © {new Date().getFullYear()} {profile.name} · Conçu et développé à Strasbourg
        </p>
      </div>
    </footer>
  )
}
