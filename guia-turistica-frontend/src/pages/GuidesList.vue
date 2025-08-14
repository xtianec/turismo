<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import GuideCard from '@/components/GuideCard.vue'
import { fetchGuides, type GuideCard as Guide } from '@/services/guides'

const { t } = useI18n()
const q = ref('')
const lang = ref<'all' | 'ES' | 'EN' | 'PT' | 'FR'>('all')
const loading = ref(true)
const guides = ref<Guide[]>([])

async function load() {
  loading.value = true
  try {
    guides.value = await fetchGuides(
      {
        q: q.value.trim() || undefined,
        lang: lang.value === 'all' ? undefined : lang.value,
      },
      true,
    )
  } finally {
    loading.value = false
  }
}

let timer: number
watch([q, lang], () => {
  clearTimeout(timer)
  timer = window.setTimeout(load, 300)
})

onMounted(load)
</script>

<template>
  <div class="mb-2 flex items-center justify-between">
    <h1 class="text-2xl font-bold">{{ $t('nav.guides') }}</h1>
    <p class="text-sm text-ink-600 dark:text-ink-300">
      {{ $t('guide.results', { n: guides.length }) }}
    </p>
  </div>

  <div class="sticky top-[72px] z-40 -mx-4 mb-5 border-y border-black/5 bg-white/80 backdrop-blur-md px-4 py-3 dark:border-white/10 dark:bg-ink-900/60 sm:rounded-2xl sm:border sm:mx-0">
    <div class="mx-auto grid max-w-7xl gap-3 sm:grid-cols-[1fr_auto_auto]">
      <input v-model="q" class="input" :placeholder="$t('guide.filters.search')" />
      <select v-model="lang" class="select">
        <option value="all">{{ $t('guide.filters.allLanguages') }}</option>
        <option value="ES">ES</option><option value="EN">EN</option>
        <option value="PT">PT</option><option value="FR">FR</option>
      </select>
      <button class="btn btn-outline">{{ $t('common.filters') }}</button>
    </div>
  </div>

  <div v-if="loading" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <div v-for="i in 6" :key="i" class="card h-28 animate-pulse duration-[1.6s]"></div>
  </div>

  <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-in fade-in">
    <GuideCard
      v-for="g in guides"
      :key="g.id"
      :name="g.name"
      :city="g.city || ''"
      :price="g.pricePerDay || 0"
      :rating="0"
      :languages="g.languages"
    />
  </div>
</template>
