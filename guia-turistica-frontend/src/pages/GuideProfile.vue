<script setup lang="ts">
const guide = {
  name: 'María Quispe',
  city: 'Cusco',
  langs: ['ES','EN'],
  rate: 35, // USD/hora
  rating: 4.9,
  avatar: 'https://i.pravatar.cc/200?img=5',
  cover: 'https://images.unsplash.com/photo-1586878457095-2fdcb8b8f8f3?q=80&w=1200&auto=format&fit=crop'
}
</script>

<template>
  <section>
    <div class="h-60 w-full">
      <img :src="guide.cover" class="h-full w-full object-cover" />
    </div>

    <div class="container -mt-12">
      <div class="card p-6 md:p-8 relative">
        <div class="absolute -top-10 left-8 h-20 w-20 rounded-2xl ring-4 ring-white overflow-hidden shadow-card">
          <img :src="guide.avatar" class="h-full w-full object-cover" />
        </div>

        <div class="md:pl-28">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 class="text-2xl font-semibold">{{ guide.name }}</h1>
              <p class="text-brand-muted text-sm">{{ guide.city }} • {{ guide.langs.join(', ') }}</p>
            </div>
            <div class="text-right">
              <div class="text-2xl font-bold">${{ guide.rate }} <span class="text-sm font-normal text-brand-muted">/hora</span></div>
              <div class="text-sm text-brand-muted">{{ guide.rating }}★</div>
            </div>
          </div>

          <p class="mt-6 text-sm text-brand-muted">
            Guía oficial con 6 años de experiencia en trekking y turismo cultural. Personalizo rutas y
            horarios. Atención en español e inglés. Equipo de primeros auxilios.
          </p>

          <div class="mt-6 flex flex-wrap gap-3">
            <span class="chip">Trekking</span>
            <span class="chip">Arqueología</span>
            <span class="chip">Familias</span>
            <span class="chip">Full day</span>
          </div>

          <div class="mt-8 flex gap-3">
            <button class="btn-primary">Contactar</button>
            <button class="btn-secondary">Reservar</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
