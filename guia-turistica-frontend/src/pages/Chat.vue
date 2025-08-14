<template>
  <div class="container-app py-8">
    <div class="grid gap-6 lg:grid-cols-[300px,1fr]">
      <!-- Lista de chats -->
      <aside class="card h-[70vh] overflow-hidden">
        <div class="border-b border-slate-200/70 p-4 dark:border-slate-800">
          <input class="input" placeholder="Buscar conversación" />
        </div>
        <ul class="divide-y divide-slate-200/70 dark:divide-slate-800 overflow-y-auto">
          <li v-for="i in 8" :key="i">
            <button class="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-900">
              <img class="h-9 w-9 rounded-full object-cover" src="https://i.pravatar.cc/100?img=14" />
              <div>
                <div class="font-medium">María Quispe</div>
                <div class="subtle -mt-0.5">Nos vemos 8:00 en la plaza</div>
              </div>
            </button>
          </li>
        </ul>
      </aside>

      <!-- Conversación -->
      <section class="card flex h-[70vh] flex-col">
        <div class="flex items-center gap-3 border-b border-slate-200/70 p-4 dark:border-slate-800">
          <img class="h-9 w-9 rounded-full object-cover" src="https://i.pravatar.cc/100?img=14" />
          <div>
            <div class="font-semibold">María Quispe</div>
            <div class="subtle -mt-0.5">Conectada</div>
          </div>
        </div>

        <div class="flex-1 space-y-3 overflow-y-auto p-4">
          <div class="max-w-[75%] rounded-2xl bg-slate-100 p-3 text-sm dark:bg-slate-800">Hola, ¿qué día llegas?</div>
          <div class="ml-auto max-w-[75%] rounded-2xl bg-indigo-600 p-3 text-sm text-white">El 21. ¿Disponibilidad?</div>
          <div class="max-w-[75%] rounded-2xl bg-slate-100 p-3 text-sm dark:bg-slate-800">Sí, te propongo tour Valle Sagrado + Machu</div>
        </div>

        <form class="border-t border-slate-200/70 p-3 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <input class="input flex-1" placeholder="Escribe un mensaje…" />
            <button class="btn-primary">Enviar</button>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>
