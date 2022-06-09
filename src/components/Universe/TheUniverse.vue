<template>
  <h1 class="text-center mt-2 mb-4">{{ $t('StarWars_Universe') }}</h1>
  <div class="d-md-flex flex-md-wrap">
    <div v-for="topic in topics" :key="topic.id" class="col-md-6 col-xl-4 p-4">
      <div class="container">
        <router-link :to="{ name: topic.link, query: { page: 1 } }">
          <img :src="require(`@/assets/images/${topic.image}`)" class="image" />
          <div class="middle">
            <h2>{{ $t(topic.title) }}</h2>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { AllUniverseSource } from '@/sources/allUniverse.js';

export default {
  data() {
    return {
      topics: AllUniverseSource.allUniverse,
    };
  },
};
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
}
.image {
  opacity: 1;
  display: block;
  width: 100%;
  height: auto;
  transition: 0.5s ease;
  backface-visibility: hidden;
}
.middle {
  transition: 0.5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}
a:hover .image {
  opacity: 0.3;
  border: 1px solid #ffe81f;
}
a:hover .middle {
  opacity: 1;
}
h2 {
  color: #ffe81f;
}
</style>

              