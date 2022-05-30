<template>
  <div v-if="isLoading" class="text-center">
    <p>Loading...</p>
  </div>
  <div v-else>
    <div>
      <h1 class="text-center mt-2 mb-4">{{ movieInfo.title }}</h1>
      <hr class="mx-auto col-3" />
      <h2 class="text-center mt-2 mb-5">Episode {{ movieInfo.episode_id }}</h2>
      <div class="d-flex justify-content-between">
        <p class="detailSection fw-bold">
          Director: <span>{{ movieInfo.director }}</span>
        </p>
        <p class="detailSection fw-bold">
          Producer(s): <span>{{ movieInfo.producer }}</span>
        </p>
        <p class="detailSection fw-bold">
          Release date: <span>{{ movieInfo.release_date }}</span>
        </p>
      </div>
      <div v-if="characters.length">
        <p class="detailSection fw-bold mt-5">Characters:</p>
        <div class="d-flex flex-wrap align-items-center">
          <div
            class="col-3"
            v-for="character in characters"
            :key="character.url"
          >
            <p>
              {{ character.name }}
              <router-link to="#"
                ><i class="fas fa-angle-right"></i
              ></router-link>
              <!-- <router-link :to="{ name: 'CharactersDetail', path: '/the-sw-universe/characters/:name', params: { name: character.name.replace(/\s+/g, '-').toLowerCase(), url: character.url, }, }" ><i class="fas fa-angle-right"></i></router-link></p> -->
            </p>
          </div>
        </div>
      </div>
      <div v-if="planets.length">
        <p class="detailSection fw-bold mt-5">Planets:</p>
        <div class="d-flex flex-wrap align-items-center">
          <div class="col-3" v-for="planet in planets" :key="planet.url">
            <p>
              {{ planet.name }}
              <router-link to="#"
                ><i class="fas fa-angle-right"></i
              ></router-link>
              <!-- <router-link :to="{ name: 'PlanetsDetail', path: '/the-sw-universe/planets/:name', params: { name: planet.name.replace(/\s+/g, '-').toLowerCase(), url: planet.url, }, }" ><i class="fas fa-angle-right"></i></router-link> -->
            </p>
          </div>
        </div>
      </div>
      <div v-if="spaceships.length">
        <p class="detailSection fw-bold mt-5">Spaceships:</p>
        <div class="d-flex flex-wrap align-items-center">
          <div
            class="col-3"
            v-for="spaceship in spaceships"
            :key="spaceship.url"
          >
            <p>
              {{ spaceship.name }}
              <router-link to="#"
                ><i class="fas fa-angle-right"></i
              ></router-link>
              <!-- <router-link :to="{ name: 'spaceshipsDetail', path: '/the-sw-universe/spaceships/:name', params: { name: spaceship.name.replace(/\s+/g, '-').toLowerCase(), url: spaceship.url, }, }" ><i class="fas fa-angle-right"></i></router-link> -->
            </p>
          </div>
        </div>
      </div>
      <div v-if="species.length">
        <p class="detailSection fw-bold mt-5">Species:</p>
        <div class="d-flex flex-wrap align-items-center">
          <div class="col-3" v-for="specie in species" :key="specie.url">
            <p>
              {{ specie.name }}
              <router-link to="#"
                ><i class="fas fa-angle-right"></i
              ></router-link>
              <!-- <router-link :to="{ name: 'SpeciesDetail', path: '/the-sw-universe/species/:name', params: { name: specie.name.replace(/\s+/g, '-').toLowerCase(), url: specie.url, }, }" ><i class="fas fa-angle-right"></i></router-link> -->
            </p>
          </div>
        </div>
      </div>
      <div v-if="vehicles.length">
        <p class="detailSection fw-bold mt-5">Vehicles:</p>
        <div class="d-flex flex-wrap align-items-center">
          <div class="col-3" v-for="vehicle in vehicles" :key="vehicle.url">
            <p>
              {{ vehicle.name }}
              <router-link to="#"
                ><i class="fas fa-angle-right"></i
              ></router-link>
              <!-- <router-link :to="{ name: 'VehiclesDetail', path: '/the-sw-universe/vehicles/:name', params: { name: vehicle.name.replace(/\s+/g, '-').toLowerCase(), url: vehicle.url, }, }" ><i class="fas fa-angle-right"></i></router-link> -->
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-5 text-center">
      <button class="btn-search" @click="search(movieUrlName)">
        <i class="fas fa-mouse-pointer"></i> Run a google search on this movie
      </button>
    </div>
  </div>
  <div class="mt-5 text-center">
    <button class="btn-return" @click="redirectToMovies()">
      Return to movies
    </button>
  </div>
</template>

<script>
import { redirectionLinksMixin } from '@/mixins/redirectionLinks.js';
import { displayInfoMixin } from '@/mixins/displayInfo.js';
import { searchesMixin } from '@/mixins/searches.js';
import { moviesService } from '@/services/movies_service.js';

export default {
  mixins: [redirectionLinksMixin, displayInfoMixin, searchesMixin],
  data() {
    return {
      isLoading: false,
      movieUrlName: '',
      movieId: null,
      movieInfo: [],
      characters: [],
      planets: [],
      spaceships: [],
      vehicles: [],
      species: [],
    };
  },
  methods: {
    async displayMovieInfo() {
      this.isLoading = true;
      await moviesService.getMovieInfo(this.movieId).then((response) => {
        if (response == 404) {
          this.pageNotFound();
          return;
        } else if (typeof response === 'object') {
          this.movieInfo = response;
        } else {
          this.somethingWrong();
          return;
        }
      });
      this.characters = await this.displayCharacters(this.movieInfo.characters);
      this.planets = await this.displayPlanets(this.movieInfo.planets);
      this.spaceships = await this.displaySpaceships(this.movieInfo.starships);
      this.species = await this.displaySpecies(this.movieInfo.species);
      this.vehicles = await this.displayVehicles(this.movieInfo.vehicles);
      this.isLoading = false;
    },
  },
  mounted() {
    this.movieId = this.$route.params.url;
    if (
      this.movieId == null ||
      this.movieId == 'undefined' ||
      this.movieId == ''
    ) {
      this.redirectToMovies();
      return;
    } else {
      this.movieUrlName = this.$route.params.name;
      this.displayMovieInfo();
    }
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/buttons.scss';
@import '@/assets/styles/icons.scss';

hr {
  color: #ffe81f;
  opacity: 100%;
}
p {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.detailSection {
  color: #ffe81f;
  letter-spacing: 1px;
}
span {
  color: #ffffff;
  letter-spacing: 0;
  font-weight: 100;
}
</style>