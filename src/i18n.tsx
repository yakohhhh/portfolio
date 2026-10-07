import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { content, type Content, type Lang } from './data'

/* =============================================================================
 *  Langue du site
 *  1. Choix enregistré par le visiteur (s'il a déjà cliqué sur FR / EN)
 *  2. Sinon, langue principale du navigateur : français → FR, tout le reste → EN
 *  3. Les robots d'indexation reçoivent la version française (langue des
 *     balises <head>), pour un référencement cohérent.
 * ========================================================================== */

const STORAGE_KEY = 'am-lang'

export function detectLang(): Lang {
  if (typeof window === 'undefined') return 'fr'
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'fr' || saved === 'en') return saved
  } catch {
    /* stockage indisponible */
  }
  const ua = navigator.userAgent || ''
  if (/bot|crawl|spider|slurp|lighthouse|facebookexternalhit|linkedin/i.test(ua)) return 'fr'
  const primary = (navigator.languages && navigator.languages[0]) || navigator.language || 'fr'
  return primary.toLowerCase().startsWith('fr') ? 'fr' : 'en'
}

type LangContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  c: Content
}

const LangContext = createContext<LangContextValue>({ lang: 'fr', setLang: () => {}, c: content.fr })

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang)
  const c = content[lang]

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* stockage indisponible : le choix vaut pour la visite en cours */
    }
  }, [])

  // Synchronise <html lang>, le titre et la description avec la langue.
  useEffect(() => {
    document.documentElement.lang = lang
    document.title = c.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', c.meta.description)
  }, [lang, c])

  const value = useMemo(() => ({ lang, setLang, c }), [lang, setLang, c])
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  return useContext(LangContext)
}

/** Raccourci : le contenu de la langue courante. */
export function useContent() {
  return useContext(LangContext).c
}
