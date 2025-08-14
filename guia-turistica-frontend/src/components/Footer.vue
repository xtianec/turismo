<!-- Footer.vue -->
<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <!-- ✅ usa clase footer para aplicar reglas globales -->
  <footer class="footer">
    <div class="container-app grid gap-6 sm:grid-cols-3">
      <div>
        <div class="brand font-extrabold">GT • GuíaTurística</div>
        <p class="mt-2 max-w-xs">{{ $t('footer.brand') }}</p>
      </div>

      <nav class="grid gap-1">
        <h3 class="title mb-1 font-semibold">{{ $t('common.site') }}</h3>
        <RouterLink class="link" to="/">{{ $t('nav.home') }}</RouterLink>
        <RouterLink class="link" to="/guides">{{ $t('nav.guides') }}</RouterLink>
        <RouterLink class="link" to="/login">{{ $t('nav.login') }}</RouterLink>
      </nav>

      <nav class="grid gap-1">
        <h3 class="title mb-1 font-semibold">{{ $t('common.legal') }}</h3>
        <a class="link" href="#">{{ $t('common.terms') }}</a>
        <a class="link" href="#">{{ $t('common.privacy') }}</a>
      </nav>
    </div>

    <p class="mt-8 text-center text-xs text-ink-500 dark:text-ink-400">
      {{ $t('footer.copyright') }}
    </p>
  </footer>
</template>
