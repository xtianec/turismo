// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import i18n from './plugins/i18n' // si lo tienes
import './style.css'   // <= este import

createApp(App)
  .use(createPinia())
  .use(router)
  .use(i18n)
  .mount('#app')
