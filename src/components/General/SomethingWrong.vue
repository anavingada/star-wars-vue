<template>
  <div class="text-center">
    <h1 class="mt-2 mb-4">Oops! Something went wrong.</h1>
    <h2 class="mb-5">
      You'll be redirected to the homepage in {{ countDown }}.
    </h2>
    <router-link :to="{ name: 'intro' }" class="btn-home">
      Go to the Homepage
    </router-link>
  </div>
</template>

<script>
import { redirectHomeMixin } from '@/mixins/redirectionLinks.js';

export default {
  mixins: [redirectHomeMixin],
  data() {
    return {
      countDown: 5,
    };
  },
  methods: {
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      }
      if (this.countDown == 0) {
        this.redirectHome(), 5000;
      }
    },
  },
  created() {
    this.countDownTimer();
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/buttons.scss';
</style>