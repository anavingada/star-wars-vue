<template>
  <div class="d-flex">
    <the-logo></the-logo>
    <the-menus></the-menus>
  </div>
</template>

<script>
import TheLogo from './TheLogo.vue';
import TheMenus from './TheMenus.vue';

export default {
  components: {
    TheLogo,
    TheMenus,
  },
};
</script>
