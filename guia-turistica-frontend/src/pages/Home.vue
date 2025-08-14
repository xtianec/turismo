<!-- Home.vue (o la página de inicio que mostraste) -->
<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <!-- ✅ añade class="hero" para heredar el tema y el contraste -->
  <section
    class="hero animate-in-up"
  >
    <div class="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
      <div class="flex flex-col justify-center">
        <p class="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-300">
          {{ t('home.kicker') }}
        </p>

        <!-- ✅ color explícito en ambos temas -->
        <h1 class="text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl text-slate-900 dark:text-slate-50">
          {{ t('home.headline') }}
        </h1>

        <p class="mt-4 max-w-prose text-base text-ink-700 dark:text-ink-200">
          {{ t('home.desc') }}
        </p>

        <div class="mt-6 flex flex-wrap gap-3">
          <RouterLink to="/guides" class="btn btn-primary">{{ t('home.ctaSearch') }}</RouterLink>
          <RouterLink to="/register" class="btn btn-ghost">{{ t('home.ctaImGuide') }}</RouterLink>
        </div>

        <dl class="mt-8 grid grid-cols-2 gap-6 text-sm sm:grid-cols-3">
          <div><dt class="text-ink-500 dark:text-ink-300">{{ t('home.stats.active') }}</dt><dd class="text-lg font-semibold text-slate-900 dark:text-slate-50">+1200</dd></div>
          <div><dt class="text-ink-500 dark:text-ink-300">{{ t('home.stats.regions') }}</dt><dd class="text-lg font-semibold text-slate-900 dark:text-slate-50">24</dd></div>
          <div><dt class="text-ink-500 dark:text-ink-300">{{ t('home.stats.support') }}</dt><dd class="text-lg font-semibold text-slate-900 dark:text-slate-50">24/7</dd></div>
        </dl>
      </div>

      <div class="relative">
        <img
          class="aspect-[4/3] w-full rounded-2xl object-cover shadow-md ring-1 ring-black/5 dark:ring-white/10 animate-pulse-soft"
          src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop"
          alt="Machu Picchu" loading="lazy"
        />
      </div>
    </div>
  </section>
</template>
