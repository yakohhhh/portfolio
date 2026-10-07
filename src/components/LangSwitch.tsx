import { useLang } from '../i18n'
import type { Lang } from '../data'

const LANGS: { code: Lang; name: string }[] = [
  { code: 'fr', name: 'Français' },
  { code: 'en', name: 'English' },
]

/** Sélecteur FR / EN (pastille segmentée). */
export default function LangSwitch({ dark = true, className = '' }: { dark?: boolean; className?: string }) {
  const { lang, setLang, c } = useLang()
  return (
    <div
      role="group"
      aria-label={c.ui.nav.language}
      className={`label inline-flex items-center rounded-full p-0.5 transition-colors ${
        dark ? 'bg-white/10' : 'bg-black/[0.06]'
      } ${className}`}
    >
      {LANGS.map((l) => {
        const active = lang === l.code
        return (
          <button
            key={l.code}
            type="button"
            lang={l.code}
            title={l.name}
            aria-label={l.name}
            aria-pressed={active}
            onClick={() => setLang(l.code)}
            className={`rounded-full px-2.5 py-1 !text-[11px] !tracking-[0.12em] transition-colors ${
              active
                ? dark
                  ? 'bg-white text-black'
                  : 'bg-ink text-white'
                : dark
                  ? 'text-white/60 hover:text-white'
                  : 'text-ink/60 hover:text-ink'
            }`}
          >
            {l.code.toUpperCase()}
          </button>
        )
      })}
    </div>
  )
}
