<template>
  <div class="text-center">
    <h1 class="mt-2 mb-4">Error 404</h1>
    <h2 class="mb-5">Page Not Found</h2>
    <router-link :to="{ name: 'intro' }" class="btn-home">
        Go to the Homepage
    </router-link>
  </div>
</template>

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
  color:#ffffff;
}
</style>