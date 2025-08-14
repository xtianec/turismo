<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import useColorMode from '@/composables/useColorMode'
import { computed, ref } from 'vue'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'

const { isDark, toggle } = useColorMode()
const route = useRoute()
const open = ref(false)
const active = (p: string) => computed(() => route.path.startsWith(p))
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-black/5 bg-white/75 backdrop-blur-md dark:border-white/10 dark:bg-ink-900/60">
    <nav class="container-app flex items-center justify-between gap-3 py-3">
      <RouterLink to="/" class="flex items-center gap-2 text-xl font-extrabold">
        <span class="grid size-8 place-items-center rounded-lg bg-brand-600 text-white shadow-sm">GT</span>
        <span class="font-extrabold tracking-tight text-ink-900 dark:text-white">GuíaTurística</span>
      </RouterLink>

      <!-- Desktop -->
      <div class="hidden items-center gap-2 sm:flex">
        <RouterLink :class="['navlink', active('/guides').value && 'navlink--active']" to="/guides">Guías</RouterLink>
        <RouterLink :class="['navlink', active('/login').value && 'navlink--active']"  to="/login">Ingresar</RouterLink>
        <RouterLink class="btn btn-primary" to="/register">Registrarse</RouterLink>

        <LanguageSwitcher />
        <button class="btn btn-ghost" @click="toggle" :aria-pressed="isDark">
          <span v-if="isDark">🌙</span><span v-else>☀️</span>
        </button>
      </div>

      <!-- Mobile -->
      <div class="flex items-center gap-2 sm:hidden">
        <LanguageSwitcher />
        <button class="btn btn-ghost" @click="toggle" :aria-pressed="isDark">
          <span v-if="isDark">🌙</span><span v-else>☀️</span>
        </button>
        <button class="btn btn-outline" @click="open = !open" :aria-expanded="open">☰</button>
      </div>
    </nav>

    <div v-show="open" class="sm:hidden border-t border-black/5 bg-white/90 px-4 py-3 dark:border-white/10 dark:bg-ink-900/80">
      <div class="flex flex-col gap-1">
        <RouterLink @click="open=false" :class="['navlink', active('/guides').value && 'navlink--active']" to="/guides">Guías</RouterLink>
        <RouterLink @click="open=false" :class="['navlink', active('/login').value && 'navlink--active']"  to="/login">Ingresar</RouterLink>
        <RouterLink @click="open=false" class="btn btn-primary" to="/register">Registrarse</RouterLink>
      </div>
    </div>
  </header>
</template>
