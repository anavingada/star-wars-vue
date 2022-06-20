<template>
  <section class="col-3 text-center">
    <router-link :to="{ name: 'intro' }">
      <img src="~@/assets/images/logo.png" :alt="$t('SW_Logo')" class="" />
    </router-link>
  </section>
</template>

<style scoped>
img {
  max-width: 250px;
  width: 100%;
  margin: auto;
}
</style>