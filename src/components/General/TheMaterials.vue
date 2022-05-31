<template>
  <h1 class="text-center mt-2 mb-4">{{ $t('Materials') }}</h1>
  <p class="text-center">
    {{ $t('Materials_Intro') }}
  </p>
  <p class="text-center">{{ $t('Thank_You') }}.</p>
  <div class="container mt-5 mb-5">
    <h2>{{ $t('API') }}</h2>
    <div v-for="api in apis" :key="api.id">
      <a :href="api.link" target="_blank" class="d-flex"
        ><h3>{{ api.title }}</h3>
        <i class="fas fa-external-link-alt"></i
      ></a>
      <p>{{ api.obs }}</p>
    </div>
    <h2 class="mt-5">{{ $t('Images') }}</h2>
    <div v-for="image in images" :key="image.id">
      <a :href="image.link" target="_blank" class="d-flex"
        ><h3>{{ image.title }}</h3>
        <i class="fas fa-external-link-alt"></i
      ></a>
      <p>{{ image.obs }}</p>
      <hr />
    </div>
  </div>
</template>

<script>
import { ApisSource } from '@/sources/apis.js';
import { ImagesSource } from '@/sources/images.js';

export default {
  data() {
    return {
      apis: ApisSource.apis,
      images: ImagesSource.images,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/icons.scss';

h2 {
  color: #ffe81f;
}
h3 {
  color: #ffffff;
  font-size: 1.35rem !important;
}
a,
i {
  text-decoration: none;
  color: #ffffff;
}
a:hover,
i:hover {
  text-decoration: underline;
  color: #ffffff;
}
hr {
  height: 2px;
  color: #ffe81f;
  opacity: 0.8;
  border-radius: 2px;
}
</style>