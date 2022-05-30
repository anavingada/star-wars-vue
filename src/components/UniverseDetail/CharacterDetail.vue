<template>
  <div v-if="isLoading" class="text-center">
    <p>Loading...</p>
  </div>
  <div v-else>
    <div>
      <h1 class="text-center mt-2 mb-4">{{ characterInfo.name }}</h1>
      <hr class="mx-auto col-3" />
      <p class="detailSection fw-bold mt-5">Characteristics:</p>
      <div class="d-flex">
        <div class="col-6">
          <p>Gender: {{ characterInfo.gender }}</p>
          <p>Birth Year: {{ characterInfo.birth_year }}</p>
          <p>Planet of origin: {{ homeworld.name }}</p>
          <p>Height: {{ characterInfo.height }}</p>
        </div>
        <div class="col-6">
          <p>Mass: {{ characterInfo.mass }}</p>
          <p>Skin color: {{ characterInfo.skin_color }}</p>
          <p>Hair color: {{ characterInfo.hair_color }}</p>
          <p>Eye color: {{ characterInfo.eye_color }}</p>
        </div>
      </div>
      <div v-if="movies.length">
        <p class="detailSection fw-bold mt-5">Movies:</p>
        <div class="d-flex flex-wrap align-items-center">
          <div class="col-3" v-for="movie in movies" :key="movie.url">
            <p>
              {{ movie.name }}
              <router-link to="#"
                ><i class="fas fa-angle-right"></i
              ></router-link>
              <!-- <router-link :to="{ name: 'CharactersDetail', path: '/the-sw-universe/characters/:name', params: { name: character.name.replace(/\s+/g, '-').toLowerCase(), url: character.url, }, }" ><i class="fas fa-angle-right"></i></router-link></p> -->
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
      <button class="btn-search" @click="search(characterUrlName)">
        <i class="fas fa-mouse-pointer"></i> Run a google search on this
        character
      </button>
    </div>
  </div>
  <div class="mt-5 text-center">
    <button class="btn-return" @click="redirectToCharacters()">
      Return to characters
    </button>
  </div>
</template>

<script>
import { redirectionLinksMixin } from '@/mixins/redirectionLinks.js';
import { displayInfoMixin } from '@/mixins/displayInfo.js';
import { searchesMixin } from '@/mixins/searches.js';

import { charactersService } from '@/services/characters_service.js';
import { planetsService } from '@/services/planets_service.js';

export default {
  mixins: [redirectionLinksMixin, displayInfoMixin, searchesMixin],
  data() {
    return {
      isLoading: false,
      characterUrlName: '',
      characterId: null,
      characterInfo: [],
      homeworld: '',
      movies: [],
      spaceships: [],
      vehicles: [],
      species: [],
    };
  },
  methods: {
    async displayCharacterInfo() {
      this.isLoading = true;
      await charactersService
        .getCharacterInfo(this.characterId)
        .then((response) => {
          if (response == 404) {
            this.pageNotFound();
            return;
          } else if (typeof response === 'object') {
            this.characterInfo = response;
          } else {
            this.somethingWrong();
            return;
          }
        });
      this.homeworld = await planetsService.getPlanetInfo(
        this.characterInfo.homeworld
      );
      this.movies = await this.displayMovies(this.characterInfo.films);
      this.spaceships = await this.displaySpaceships(
        this.characterInfo.starships
      );
      this.species = await this.displaySpecies(this.characterInfo.species);
      this.vehicles = await this.displayVehicles(this.characterInfo.vehicles);
      this.isLoading = false;
    },
  },
  mounted() {
    this.characterId = this.$route.params.url;
    if (
      this.characterId == null ||
      this.characterId == 'undefined' ||
      this.characterId == ''
    ) {
      this.redirectToCharacters();
      return;
    } else {
      this.characterUrlName = this.$route.params.name;
      this.displayCharacterInfo();
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