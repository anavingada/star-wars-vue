<template>
  <the-header></the-header>
  <main class="container">
    <router-view :key="$route.fullPath"></router-view>
  </main>
  <the-footer></the-footer>
</template>

<script>
import TheHeader from './components/Navigation/TheHeader.vue';
import TheFooter from './components/Navigation/TheFooter.vue';

export default {
  components: {
    TheHeader,
    TheFooter,
  },
};
</script>

<style lang="scss">
@import '@/assets/styles/standard.scss';
</style>