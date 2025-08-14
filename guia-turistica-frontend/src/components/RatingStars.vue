<template>
  <div class="flex items-center gap-1">
    <template v-for="i in 5" :key="i">
      <svg :class="i <= Math.round(value) ? 'text-amber-500' : 'text-slate-300 dark:text-slate-600'"
           xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
           class="h-4 w-4" fill="currentColor">
        <path d="M12 17.3l-6.18 3.25 1.18-6.88L2 8.75l6.91-1 3.09-6.25 3.09 6.25 6.91 1-5 4.92 1.18 6.88L12 17.3Z"/>
      </svg>
    </template>
    <span class="ml-1 text-xs font-medium text-slate-500">{{ value.toFixed(1) }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{ value: number }>()
</script>
