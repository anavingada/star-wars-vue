<template>
  <footer class="mt-5 footer-container d-md-flex">
    <section class="d-flex col-6 text-center">
      <p style="width: 100%">
        {{ $t('SW_App') }} {{ $t('Ana_Vingada') }} {{ $t('Rights_Reserved') }}
      </p>
    </section>
    <section class="d-flex col-6 justify-content-center">
      <p>
        <a href="mailto:anavingada@gmail.com">{{ $t('Contact') }}</a>
      </p>
      <router-link :to="{ name: 'theMaterials' }">
        {{ $t('Material_Sources') }}
      </router-link>
    </section>
  </footer>
</template>

<script>
</script>

<style scoped>
.footer-container {
  border: 3px solid #ffe81f;
  border-radius: 2px;
  min-height: 100px;
  bottom: 0;
  position: absolute;
  width: 100%;
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