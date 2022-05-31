<template>
  <div v-if="isLoading" class="text-center">
    <p>{{ $t('Loading_') }}</p>
  </div>
  <div v-else>
    <div>
      <h1 class="text-center mt-2 mb-4">{{ specieInfo.name }}</h1>
      <hr class="mx-auto col-3" />
      <p class="detailSection fw-bold mt-5">{{ $t('Characteristics') }}:</p>
      <div class="d-flex">
        <div class="col-6">
          <p>{{ $t('Classification') }}: {{ specieInfo.classification }}</p>
          <p>{{ $t('Designation') }}: {{ specieInfo.designation }}</p>
          <p v-if="homeworld.name">
            {{ $t('Planet_Origin') }}: {{ homeworld.name }}
          </p>
          <p>{{ $t('Language') }}: {{ specieInfo.language }}</p>
          <p>{{ $t('Average_lifespan') }}: {{ specieInfo.average_lifespan }}</p>
        </div>
        <div class="col-6">
          <p>{{ $t('Skin_colors') }}: {{ specieInfo.skin_colors }}</p>
          <p>{{ $t('Hair_color') }}: {{ specieInfo.hair_colors }}</p>
          <p>{{ $t('Eye_color') }}: {{ specieInfo.eye_colors }}</p>
          <p>{{ $t('Average_height') }}: {{ specieInfo.average_height }}</p>
        </div>
      </div>
      <div v-if="characters.length">
        <p class="detailSection fw-bold mt-5">{{ $t('Characters') }}:</p>
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
        <p class="detailSection fw-bold mt-5">{{ $t('Movies') }}:</p>
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
      <button class="btn-search" @click="search(specieUrlName)">
        <i class="fas fa-mouse-pointer"></i> {{ $t('Run_Search_On') }}
        {{ $t('specie') }}
      </button>
    </div>
  </div>
  <div class="mt-5 text-center">
    <button class="btn-return" @click="redirectToSpecies()">
      {{ $t('Return_To') }} {{ $t('species') }}
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

import { speciesService } from '@/services/species_service.js';
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
      specieUrlName: '',
      specieId: null,
      specieInfo: [],
      homeworld: '',
      characters: [],
      movies: [],
    };
  },
  methods: {
    async displaySpecieInfo() {
      this.isLoading = true;
      await speciesService.getSpecieInfo(this.specieId).then((response) => {
        if (response == 404) {
          this.pageNotFound();
          return;
        } else if (typeof response === 'object') {
          this.specieInfo = response;
        } else {
          this.somethingWrong();
          return;
        }
      });
      if (this.specieInfo.homeworld != null) {
        this.homeworld = await planetsService.getPlanetInfo(
          this.specieInfo.homeworld
        );
      }
      this.characters = await this.displayCharacters(this.specieInfo.people);
      this.movies = await this.displayMovies(this.specieInfo.films);
      this.isLoading = false;
    },
  },
  mounted() {
    this.specieId = this.$route.params.url;
    if (
      this.specieId == null ||
      this.specieId == 'undefined' ||
      this.specieId == ''
    ) {
      this.redirectToSpecies();
      return;
    } else {
      this.specieUrlName = this.$route.params.name;
      this.displaySpecieInfo();
    }
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/buttons.scss';
@import '@/assets/styles/icons.scss';
@import '@/assets/styles/universe_detail.scss';
</style>