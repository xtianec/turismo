<script setup lang="ts">
import { ref } from 'vue';
const role = ref<'turist'|'guide'>('turist');
</script>

<template>
  <section class="mx-auto max-w-2xl space-y-6">
    <header class="space-y-2">
      <h1 class="text-2xl font-extrabold sm:text-3xl">Crea tu cuenta</h1>
      <p class="text-ink-600 dark:text-ink-200">Turista o guía, te tomará 1 minuto.</p>
    </header>

    <!-- Tabs -->
    <div class="inline-flex rounded-lg bg-black/5 p-1 dark:bg-white/10">
      <button
        class="tab"
        :class="role === 'turist' && 'tab-active'"
        @click="role = 'turist'"
      >Turista</button>
      <button
        class="tab"
        :class="role === 'guide' && 'tab-active'"
        @click="role = 'guide'"
      >Guía</button>
    </div>

    <form class="space-y-4 rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5 dark:bg-[#0f172a] dark:ring-white/10">
      <div class="grid gap-4 sm:grid-cols-2">
        <label class="field">
          <span>Nombre completo</span>
          <input class="input" placeholder="Tu nombre" />
        </label>

        <label class="field">
          <span>Correo</span>
          <input type="email" class="input" placeholder="tu@correo.com" />
        </label>

        <label class="field">
          <span>Contraseña</span>
          <input type="password" class="input" placeholder="********" />
        </label>

        <label class="field">
          <span>Idiomas</span>
          <input class="input" placeholder="ES, EN, FR..." />
        </label>

        <label v-if="role === 'guide'" class="field sm:col-span-2">
          <span>Ciudad base</span>
          <input class="input" placeholder="Cusco, Lima..." />
        </label>
      </div>

      <button class="btn btn-primary w-full">Crear cuenta</button>
    </form>
  </section>
</template>

<style scoped>
.tab {
  @apply rounded-md px-4 py-1.5 text-sm font-semibold text-ink-700 hover:bg-white hover:text-ink-900
         dark:text-ink-100 dark:hover:bg-white/10;
}
.tab-active {
  @apply bg-white text-ink-900 shadow-sm dark:bg-white/20 dark:text-white;
}
.field span { @apply mb-1 block text-sm text-ink-600 dark:text-ink-300; }
.input {
  @apply w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm shadow-sm outline-none
         focus:ring-2 focus:ring-brand-400 dark:border-white/10 dark:bg-[#0f172a] dark:text-ink-50
         dark:placeholder:text-ink-400;
}
</style>
