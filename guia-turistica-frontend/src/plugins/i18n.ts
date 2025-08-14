import { createI18n } from 'vue-i18n'
import es from '@/locales/es.json'
import en from '@/locales/en.json'
import fr from '@/locales/fr.json'

type MessageSchema = typeof es
export type Locale = 'es' | 'en' | 'fr'

function pickBrowserLocale(): Locale {
  const raw =
    (typeof navigator !== 'undefined' && (navigator.language || (navigator as any).userLanguage)) ||
    'es'
  const short = raw.split('-')[0] as Locale
  return (['es','en','fr'] as Locale[]).includes(short) ? short : 'es'
}

const stored = typeof localStorage !== 'undefined'
  ? (localStorage.getItem('locale') as Locale | null)
  : null
const initial: Locale = stored ?? pickBrowserLocale()

const i18n = createI18n<[MessageSchema], Locale>({
  legacy: false,
  locale: initial,
  fallbackLocale: 'en',
  globalInjection: true,
  messages: { es, en, fr },
})

// helper para cambiar idioma (evita warning de TS con .value)
export function setLocale(l: Locale) {
 
  i18n.global.locale = l
  if (typeof document !== 'undefined') document.documentElement.setAttribute('lang', l)
  if (typeof localStorage !== 'undefined') localStorage.setItem('locale', l)
}

// set <html lang> inicial
if (typeof document !== 'undefined') {
  document.documentElement.setAttribute('lang', initial)
}

export default i18n
