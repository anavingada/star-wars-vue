<template>
  <div>
    <the-header></the-header>
    <div class="container">
      <router-view></router-view>
    </div>
    <the-footer></the-footer>
  </div>
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