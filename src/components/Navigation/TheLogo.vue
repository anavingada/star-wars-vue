<template>
  <section class="col-3 text-center">
    <router-link :to="{ name: 'intro' }">
      <img
        src="~@/assets/images/logo.png"
        :alt="$t('SW_Logo')"
        class="ps-5 pe-5"
      />
    </router-link>
  </section>
</template>

<style scoped>
img {
  max-width: 350px;
}
</style>