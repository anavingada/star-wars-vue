<template>
  <div class="text-center">
    <h1 class="mt-2 mb-4">Error 404</h1>
    <h2 class="mb-5">Page Not Found</h2>
    <router-link :to="{ name: 'intro' }" class="btn-home">
        Go to the Homepage
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/buttons.scss';
</style>