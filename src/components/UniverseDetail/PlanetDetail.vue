<template>
  <div v-if="isLoading" class="text-center">
    <p>Loading...</p>
  </div>
  <div v-else>
    <div>
      <h1 class="text-center mt-2 mb-4">{{ planetInfo.name }}</h1>
      <hr class="mx-auto col-3" />
      <p class="detailSection fw-bold mt-5">Characteristics:</p>
      <div class="d-flex">
        <div class="col-6">
          <p>Terrain: {{ planetInfo.terrain }}</p>
          <p>Climate: {{ planetInfo.climate }}</p>
          <p>Surface Water: {{ planetInfo.surface_water }}</p>
          <p>Population: {{ planetInfo.population }}</p>
        </div>
        <div class="col-6">
          <p>Rotarion Period: {{ planetInfo.rotation_period }}</p>
          <p>Orbital Period: {{ planetInfo.orbital_period }}</p>
          <p>Diameter: {{ planetInfo.diameter }}</p>
          <p>Gravity: {{ planetInfo.gravity }}</p>
        </div>
      </div>
      <div v-if="characters.length">
        <p class="detailSection fw-bold mt-5">Residents:</p>
        <div class="d-flex flex-wrap align-items-center">
          <div
            class="col-3"
            v-for="character in characters"
            :key="character.url"
          >
            <p>
              {{ character.name }}
              <button @click="viewCharacter(character)" class="bg-transparent">
                <i class="fas fa-angle-right"></i>
              </button>
            </p>
          </div>
        </div>
      </div>
      <div v-if="movies.length">
        <p class="detailSection fw-bold mt-5">Movies:</p>
        <div class="d-flex flex-wrap align-items-center">
          <div class="col-3" v-for="movie in movies" :key="movie.url">
            <p>
              {{ movie.title }}
              <button @click="viewMovie(movie)" class="bg-transparent">
                <i class="fas fa-angle-right"></i>
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-5 text-center">
      <button class="btn-search" @click="search(planetUrlName)">
        <i class="fas fa-mouse-pointer"></i> Run a google search on this planet
      </button>
    </div>
  </div>
  <div class="mt-5 text-center">
    <button class="btn-return" @click="redirectToPlanets()">
      Return to planets
    </button>
  </div>
</template>

<script>
import {
  redirectionLinksMixin,
  viewDetailMixin,
} from '@/mixins/redirectionLinks.js';
import { displayInfoMixin } from '@/mixins/displayInfo.js';
import { searchesMixin } from '@/mixins/searches.js';

import { planetsService } from '@/services/planets_service.js';

export default {
  mixins: [
    redirectionLinksMixin,
    viewDetailMixin,
    displayInfoMixin,
    searchesMixin,
  ],
  data() {
    return {
      isLoading: false,
      planetUrlName: '',
      planetId: null,
      planetInfo: [],
      characters: [],
      movies: [],
    };
  },
  methods: {
    async displayPlanetInfo() {
      this.isLoading = true;
      await planetsService.getPlanetInfo(this.planetId).then((response) => {
        if (response == 404) {
          this.pageNotFound();
          return;
        } else if (typeof response === 'object') {
          this.planetInfo = response;
        } else {
          this.somethingWrong();
          return;
        }
      });
      this.characters = await this.displayCharacters(this.planetInfo.residents);
      this.movies = await this.displayMovies(this.planetInfo.films);
      this.isLoading = false;
    },
  },
  mounted() {
    this.planetId = this.$route.params.url;
    if (
      this.planetId == null ||
      this.planetId == 'undefined' ||
      this.planetId == ''
    ) {
      this.redirectToPlanets();
      return;
    } else {
      this.planetUrlName = this.$route.params.name;
      this.displayPlanetInfo();
    }
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/buttons.scss';
@import '@/assets/styles/icons.scss';
@import '@/assets/styles/universe_detail.scss';
</style>