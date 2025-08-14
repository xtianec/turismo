// src/composables/useColorMode.ts
import { ref, computed, onMounted, watch } from 'vue'

type Theme = 'light' | 'dark' | 'system'

// guard para SSR/tests
const doc = typeof document !== 'undefined' ? document : null
const win = typeof window !== 'undefined' ? window : null

const stored = (typeof localStorage !== 'undefined'
  ? (localStorage.getItem('theme') as Theme | null)
  : null) ?? 'system'

const theme = ref<Theme>(stored)
const prefersDark = win
  ? win.matchMedia('(prefers-color-scheme: dark)')
  : ({ matches: false, addEventListener() {}, removeEventListener() {} } as any)

function applyTheme() {
  const isDark = theme.value === 'dark' || (theme.value === 'system' && prefersDark.matches)
  if (doc) doc.documentElement.classList.toggle('dark', isDark)

  // meta theme-color (barra del navegador)
  const light = '#ffffff'
  const dark  = '#0b1220'
  let meta = doc?.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null
  if (!meta && doc) {
    meta = doc.createElement('meta')
    meta.name = 'theme-color'
    doc.head.appendChild(meta)
  }
  if (meta) meta.content = isDark ? dark : light
}

export default function useColorMode() {
  const set = (t: Theme) => {
    theme.value = t
    if (typeof localStorage !== 'undefined') localStorage.setItem('theme', t)
  }
  const toggle = () => {
    // si estás en "system", alterna respecto al estado actual
    const isDark = doc?.documentElement.classList.contains('dark')
    set((isDark ? 'light' : 'dark') as Theme)
  }

  onMounted(() => {
    applyTheme()
    // cuando el usuario elige "system", escucha cambios del SO
    prefersDark.addEventListener?.('change', applyTheme)
  })

  watch(theme, applyTheme, { immediate: true })

  const isDark = computed(() => doc?.documentElement.classList.contains('dark') ?? false)

  return { theme, isDark, set, toggle }
}
