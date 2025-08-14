<script setup lang="ts">
defineProps<{
  name: string
  city: string
  price: number
  rating: number
  languages: string[]
  avatar?: string
}>()
</script>

<template>
  <article class="card card-hover flex gap-4">
    <img :src="avatar || 'https://i.pravatar.cc/160'" alt="" class="size-20 rounded-2xl object-cover ring-1 ring-black/5 dark:ring-white/10" />
    <div class="min-w-0 flex-1">
      <div class="flex items-start justify-between gap-3">
        <div>
          <h3 class="truncate text-lg font-semibold">{{ name }}</h3>
          <p class="text-sm text-ink-600 dark:text-ink-300">{{ city }}</p>
        </div>
        <div class="text-right">
          <div class="text-lg font-semibold">S/ {{ price }}</div>
          <div class="text-xs text-ink-500 dark:text-ink-300">/día</div>
        </div>
      </div>

      <div class="mt-2 flex flex-wrap items-center gap-2">
        <div class="text-sm">⭐ {{ rating.toFixed(1) }}</div>
        <div class="hidden h-3 w-px bg-black/10 dark:bg-white/15 sm:block" />
        <div class="flex flex-wrap gap-1">
          <span v-for="l in languages" :key="l" class="badge">{{ l }}</span>
        </div>
      </div>

      <div class="mt-3 flex gap-2">
        <button class="btn btn-primary">Contactar</button>
        <button class="btn btn-ghost">Ver perfil</button>
      </div>
    </div>
  </article>
</template>
