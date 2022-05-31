<template>
  <div v-if="isLoading" class="text-center">
    <p>{{ $t('Loading_') }}</p>
  </div>
  <div v-else>
    <div>
      <h1 class="text-center mt-2 mb-4">{{ vehicleInfo.name }}</h1>
      <hr class="mx-auto col-3" />
      <p class="detailSection fw-bold mt-5">{{ $t('Characteristics') }}:</p>
      <div class="d-flex">
        <div class="col-6">
          <p>{{ $t('Model') }}: {{ vehicleInfo.model }}</p>
          <p>{{ $t('Manufacturer') }}: {{ vehicleInfo.manufacturer }}</p>
          <p>{{ $t('Class') }}: {{ vehicleInfo.vehicle_class }}</p>
          <p>{{ $t('Cost_credits') }}: {{ vehicleInfo.cost_in_credits }}</p>
          <p>{{ $t('Length') }}: {{ vehicleInfo.length }}</p>
        </div>
        <div class="col-6">
          <p>
            {{ $t('Maximum_Speed') }}: {{ vehicleInfo.max_atmosphering_speed }}
          </p>
          <p>{{ $t('Consumables') }}: {{ vehicleInfo.consumables }}</p>
          <p>{{ $t('Cargo_Capacity') }}: {{ vehicleInfo.cargo_capacity }}</p>
          <p>{{ $t('Crew') }}: {{ vehicleInfo.crew }}</p>
          <p>{{ $t('Passengers') }}: {{ vehicleInfo.passengers }}</p>
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
      <button class="btn-search" @click="search(vehicleUrlName)">
        <i class="fas fa-mouse-pointer"></i> {{ $t('Run_Search_On') }}
        {{ $t('vehicle') }}
      </button>
    </div>
  </div>
  <div class="mt-5 text-center">
    <button class="btn-return" @click="redirectToVehicles()">
      {{ $t('Return_To') }} {{ $t('vehicles') }}
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

import { vehiclesService } from '@/services/vehicles_service.js';

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
      vehicleUrlName: '',
      vehicleId: null,
      vehicleInfo: [],
      characters: [],
      movies: [],
    };
  },
  methods: {
    async displayVehicleInfo() {
      this.isLoading = true;
      await vehiclesService.getVehicleInfo(this.vehicleId).then((response) => {
        if (response == 404) {
          this.pageNotFound();
          return;
        } else if (typeof response === 'object') {
          this.vehicleInfo = response;
        } else {
          this.somethingWrong();
          return;
        }
      });
      this.characters = await this.displayCharacters(this.vehicleInfo.pilots);
      this.movies = await this.displayMovies(this.vehicleInfo.films);
      this.isLoading = false;
    },
  },
  mounted() {
    this.vehicleId = this.$route.params.url;
    if (
      this.vehicleId == null ||
      this.vehicleId == 'undefined' ||
      this.vehicleId == ''
    ) {
      this.redirectToVehicles();
      return;
    } else {
      this.vehicleUrlName = this.$route.params.name;
      this.displayVehicleInfo();
    }
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/buttons.scss';
@import '@/assets/styles/icons.scss';
@import '@/assets/styles/universe_detail.scss';
</style>