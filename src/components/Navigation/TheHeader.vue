<template>
  <header class="d-flex">
    <the-logo></the-logo>
    <the-menus></the-menus>
    <language-selection></language-selection>
  </header>
</template>

<script>
import TheLogo from './TheLogo.vue';
import TheMenus from './TheMenus.vue';
import LanguageSelection from './LanguageSelection.vue';

export default {
  components: {
    TheLogo,
    TheMenus,
    LanguageSelection,
  },
};
</script>
