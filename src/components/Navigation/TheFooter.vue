<template>
  <div class="mt-5 footer-container d-md-flex">
    <div class="d-flex col-6 text-center">
      <p style="width: 100%">Star Wars Vue App. Ana Vingada. All rights reserved.</p>
    </div>
    <div class="d-flex col-6 justify-content-center">
      <p><a href="mailto:anavingada@gmail.com">Contact</a></p>
      <router-link to="/"><!-- <router-link :to="{ name: 'theMaterials' }"> -->
        Material Sources
      </router-link>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
.footer-container {
  border: 3px solid #ffe81f;
  border-radius: 2px;
  min-height: 100px;
}
p,
a {
  font-size: 14px;
  color: #ffe81f;
  text-decoration: none;
  align-self: center;
  margin: 0 1rem !important;
}
a:hover {
    text-decoration: underline;
}
</style>