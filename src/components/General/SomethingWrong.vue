<template>
  <div class="text-center">
    <h1 class="mt-2 mb-4">{{ $t('Oops') }} {{ $t('Something_Wrong') }}</h1>
    <h2 class="mb-5">{{ $t('Redirected_In') }} {{ countDown }}.</h2>
    <router-link :to="{ name: 'intro' }" class="btn-home">
      {{ $t('Go_Homepage') }}
    </router-link>
  </div>
</template>

<script>
import { redirectionLinksMixin } from '@/mixins/redirectionLinks.js';

export default {
  mixins: [redirectionLinksMixin],
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