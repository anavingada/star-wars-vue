<template>
  <footer class="mt-5 footer-container">
    <div class="container d-grid d-md-flex footer-minH">
      <section id="rights" class="d-flex col-md-6 text-center">
        <p style="width: 100%">
          {{ $t('SW_App') }} {{ $t('Ana_Vingada') }} {{ $t('Rights_Reserved') }}
        </p>
      </section>
      <section id="quick-links" class="d-flex col-md-6 justify-content-center">
        <p>
          <a href="mailto:anavingada@gmail.com">{{ $t('Contact') }}</a>
        </p>
        <p>
          <router-link :to="{ name: 'theMaterials' }">
            {{ $t('Material_Sources') }}
          </router-link>
        </p>
      </section>
    </div>
  </footer>
</template>

<script>
</script>

<style scoped>
.footer-container {
  border: 3px solid #ffe81f;
  border-radius: 2px;
  bottom: 0;
  position: absolute;
  width: 100%;
}
.footer-minH {
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
@media only screen and (max-width: 767px) {
  #rights {
    order: 2;
  }
  #quick-links {
    order: 1;
  }
}
@media only screen and (max-width: 575px) {
  #quick-links {
    flex-direction: column;
  }
  #quick-links p {
    margin-top: 5px !important;
    margin-bottom: 5px !important;
  }
}
</style>