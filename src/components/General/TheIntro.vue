<template>
  <h1 class="text-center mt-2 mb-4">{{ $t('Welcome') }}</h1>
  <h2 class="text-center mt-2 mb-4">{{ $t('Find_More_SW_Universe') }}</h2>
  <h3 class="text-center mt-5">
    {{ $t('Characters') }}, {{ $t('Movies') }}, {{ $t('Planets') }},
    {{ $t('Species') }}, {{ $t('Spaceships') }} {{ $t('and') }}
    {{ $t('Vehicles') }}
  </h3>
  <hr class="col-6 mx-auto mt-5 mb-5" />
  <div class="d-flex justify-content-around">
    <p>
      {{ $t('Resources_referenced') }}
      <router-link :to="{ name: 'theMaterials' }">{{ $t('here') }}</router-link
      >.
    </p>
    <p>
      {{ $t('If_Questions') }}
      <a href="mailto:anavingada@gmail.com">{{ $t('Contact_Me') }}</a
      >.
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