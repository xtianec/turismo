<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <div class="app-shell">
    <Navbar />

    <main class="app-main">
      <div class="container-app py-6">
        <RouterView />
      </div>
    </main>

    <!-- Footer fijo al fondo gracias a app-shell/app-main -->
    <footer class="mt-10 border-t border-black/5 py-10 text-sm text-ink-600 dark:border-white/10 dark:text-ink-300">
      <div class="container-app grid gap-6 sm:grid-cols-3">
        <div>
          <div class="font-extrabold text-ink-900 dark:text-white">GT • GuíaTurística</div>
          <p class="mt-2 max-w-xs">Conecta turistas con guías certificados en todo el Perú.</p>
        </div>
        <nav class="grid gap-1">
          <h3 class="mb-1 font-semibold text-ink-900 dark:text-white">Sitio</h3>
          <RouterLink class="link" to="/">Inicio</RouterLink>
          <RouterLink class="link" to="/guides">Guías</RouterLink>
          <RouterLink class="link" to="/login">Ingresar</RouterLink>
        </nav>
        <nav class="grid gap-1">
          <h3 class="mb-1 font-semibold text-ink-900 dark:text-white">Legal</h3>
          <a class="link" href="#">Términos</a>
          <a class="link" href="#">Privacidad</a>
        </nav>
      </div>
      <p class="mt-8 text-center text-xs text-ink-500 dark:text-ink-400">© 2025 GuíaTurística.</p>
    </footer>
  </div>
</template>
