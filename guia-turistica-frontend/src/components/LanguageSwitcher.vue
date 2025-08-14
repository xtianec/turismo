<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
const onChange = (e: Event) => {
  locale.value = (e.target as HTMLSelectElement).value as any
  document?.documentElement.setAttribute('lang', locale.value)
  localStorage.setItem('locale', locale.value)
}
</script>

<template>
  <select class="select" :value="locale" @change="onChange" aria-label="Cambiar idioma">
    <option value="es">ES</option>
    <option value="en">EN</option>
    <option value="fr">FR</option>
  </select>
</template>
