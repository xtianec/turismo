<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="mx-auto max-w-md">
    <h1 class="mb-4 text-2xl font-bold">{{ $t('auth.signIn') }}</h1>
    <form class="card space-y-4">
      <div>
        <label class="label">{{ $t('auth.email') }}</label>
        <input class="input" type="email" :placeholder="$t('auth.email')" />
      </div>
      <div>
        <label class="label">{{ $t('auth.password') }}</label>
        <input class="input" type="password" :placeholder="$t('auth.password')" />
      </div>
      <button class="btn btn-primary w-full">{{ $t('auth.signIn') }}</button>
      <p class="text-center text-sm">
        {{ $t('auth.haveAccount') }}
        <RouterLink class="link" to="/register">{{ $t('auth.signUp') }}</RouterLink>
      </p>
    </form>
  </section>
</template>
