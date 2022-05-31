<template>
  <div class="text-center">
    <h1 class="mt-2 mb-4">{{ $t('Error') }} 404</h1>
    <h2 class="mb-5">{{ $t('No_Page') }}</h2>
    <router-link :to="{ name: 'intro' }" class="btn-home">
      {{ $t('Go_Homepage') }}
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/buttons.scss';
</style>