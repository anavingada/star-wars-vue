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

<style scoped>
.btn-home {
  background-color: #ffe81f;
  padding: 10px;
  margin: 0;
  color: #000000;
  text-decoration: none;
  border: 1px solid #ffe81f;
  font-weight: bold;
  border-radius: 3px;
}
.btn-home:hover {
  background-color: unset;
  color: #ffffff;
}
</style>