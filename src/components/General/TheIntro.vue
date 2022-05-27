<template>
  <h1 class="text-center mt-2 mb-4">Welcome</h1>
  <h2 class="text-center mt-2 mb-4">Find more about the Star Wars Universe</h2>
  <h3 class="text-center mt-5">
    Characters, Movies, Planets, Species, Spacechips and Vehicles
  </h3>
  <hr class="col-6 mx-auto mt-5 mb-5" />
  <div class="d-flex justify-content-around">
    <p>
      All resources are referenced
      <router-link :to="{ name: 'theMaterials' }">here</router-link>.
    </p>
    <p>
      If you have any questions, please
      <a href="mailto:anavingada@gmail.com">contact me</a>.
    </p>
  </div>
</template>

<style scoped>
h2 {
  font-size: 1.25rem;
}
h3 {
  font-size: 1rem;
  color: #ffffff;
  letter-spacing: 1px;
}
hr {
  color: #ffe81f;
  border: 1px solid #ffe81f;
  opacity: 100%;
}
a {
  color: #ffffff;
  text-decoration: underline;
}
</style>