<template>
  <div v-if="isLoading" class="text-center">
    <p>{{ $t('Loading_') }}</p>
  </div>
  <div v-else>
    <div>
      <h1 class="text-center mt-2 mb-4">{{ spaceshipInfo.name }}</h1>
      <hr class="mx-auto col-3" />
      <p class="detailSection fw-bold mt-5">{{ $t('Characteristics') }}:</p>
      <div class="d-flex">
        <div class="col-6">
          <p>{{ $t('Model') }}: {{ spaceshipInfo.model }}</p>
          <p>{{ $t('Manufacturer') }}: {{ spaceshipInfo.manufacturer }}</p>
          <p>{{ $t('Class') }}: {{ spaceshipInfo.starship_class }}</p>
          <p>{{ $t('Cost_credits') }}: {{ spaceshipInfo.cost_in_credits }}</p>
          <p>{{ $t('Length') }}: {{ spaceshipInfo.length }}</p>
          <p>
            {{ $t('Maximum_Speed') }}:
            {{ spaceshipInfo.max_atmosphering_speed }}
          </p>
        </div>
        <div class="col-6">
          <p>{{ $t('Consumables') }}: {{ spaceshipInfo.consumables }}</p>
          <p>
            {{ $t('Hyperdrive_Rating') }}: {{ spaceshipInfo.hyperdrive_rating }}
          </p>
          <p>{{ $t('MGLT') }}: {{ spaceshipInfo.MGLT }}</p>
          <p>{{ $t('Cargo_Capacity') }}: {{ spaceshipInfo.cargo_capacity }}</p>
          <p>{{ $t('Crew') }}: {{ spaceshipInfo.crew }}</p>
          <p>{{ $t('Passengers') }}: {{ spaceshipInfo.passengers }}</p>
        </div>
      </div>
      <div v-if="characters.length">
        <p class="detailSection fw-bold mt-5">{{ $t('Pilots') }}:</p>
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
      <button class="btn-search" @click="search(spaceshipUrlName)">
        <i class="fas fa-mouse-pointer"></i> {{ $t('Run_Search_On') }}
        {{ $t('spaceship') }}
      </button>
    </div>
  </div>
  <div class="mt-5 text-center">
    <button class="btn-return" @click="redirectToSpaceships()">
      {{ $t('Return_To') }} {{ $t('spaceships') }}
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

import { spaceshipsService } from '@/services/spaceships_service.js';

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
      spaceshipUrlName: '',
      spaceshipId: null,
      spaceshipInfo: [],
      characters: [],
      movies: [],
    };
  },
  methods: {
    async displaySpaceshipInfo() {
      this.isLoading = true;
      await spaceshipsService
        .getSpaceshipInfo(this.spaceshipId)
        .then((response) => {
          if (response == 404) {
            this.pageNotFound();
            return;
          } else if (typeof response === 'object') {
            this.spaceshipInfo = response;
          } else {
            this.somethingWrong();
            return;
          }
        });
      this.characters = await this.displayCharacters(this.spaceshipInfo.pilots);
      this.movies = await this.displayMovies(this.spaceshipInfo.films);
      this.isLoading = false;
    },
  },
  mounted() {
    this.spaceshipId = this.$route.params.url;
    if (
      this.spaceshipId == null ||
      this.spaceshipId == 'undefined' ||
      this.spaceshipId == ''
    ) {
      this.redirectToSpaceships();
      return;
    } else {
      this.spaceshipUrlName = this.$route.params.name;
      this.displaySpaceshipInfo();
    }
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/buttons.scss';
@import '@/assets/styles/icons.scss';
@import '@/assets/styles/universe_detail.scss';
</style>