<template>
  <header class="container mb-5">
    <nav class="navbar navbar-expand-md navbar-dark">
      <the-logo></the-logo>
      <the-menus></the-menus>
    </nav>
  </header>
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
