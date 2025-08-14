<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import GuideCard from '@/components/GuideCard.vue'

const { t } = useI18n()
const q = ref('')
const lang = ref<'all' | 'ES' | 'EN' | 'PT' | 'FR'>('all')
const loading = ref(true)

const data = ref([
  { name: 'María López',   city: 'Cusco',    price: 180, rating: 4.9, languages: ['ES','EN'], avatar: '' },
  { name: 'Jorge Paredes', city: 'Arequipa', price: 160, rating: 4.7, languages: ['ES'],     avatar: '' },
  { name: 'Ana Souza',     city: 'Lima',     price: 200, rating: 4.8, languages: ['ES','EN','PT'], avatar: '' },
])

const list = computed(() =>
  data.value.filter(g =>
    (lang.value === 'all' || g.languages.includes(lang.value)) &&
    (q.value.trim() === '' || [g.name, g.city].join(' ').toLowerCase().includes(q.value.toLowerCase()))
  )
)

onMounted(() => setTimeout(() => (loading.value = false), 400))
</script>

<template>
  <div class="mb-2 flex items-center justify-between">
    <h1 class="text-2xl font-bold">{{ $t('nav.guides') }}</h1>
    <p class="text-sm text-ink-600 dark:text-ink-300">
      {{ $t('guide.results', { n: list.length }) }}
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
    <div v-for="i in 6" :key="i" class="card h-28 animate-pulse-soft"></div>
  </div>

  <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-fade">
    <GuideCard v-for="g in list" :key="g.name" v-bind="g" />
  </div>
</template>
