<template>
  <h1 class="text-center mt-2 mb-4">Star Wars Planets</h1>
  <div v-if="planets === null" class="text-center">
    <p>No planets found!</p>
  </div>
  <div v-else-if="isLoading" class="text-center">
    <p>Loading...</p>
  </div>
  <div v-else>
    <div class="d-flex justify-content-around ms-3 me-3">
      <p>Total of planets: {{ totalResults }}</p>
      <p>Page {{ currentPage }} / {{ numberOfPages }}</p>
    </div>
    <div class="d-md-flex flex-md-wrap mt-4">
      <div
        v-for="planet in planets"
        :key="planet.url"
        class="col-md-3 p-4 text-center"
      >
        <div class="border">
          <h2 style="min-height: 80px">
            {{ planet.name }}
          </h2>
          <p class="terrain">{{ planet.terrain }}</p>
          <button @click="viewPlanet(planet)" class="btn-view">View</button>
        </div>
      </div>
    </div>
  </div>
  <the-pagination
    ref="pagination"
    :currentPage="currentPage"
    :numberOfPages="numberOfPages"
    @updateCurrentPage="changePage"
  ></the-pagination>
</template>

<script>
import ThePagination from './ThePagination.vue';
import currentPageMixin from '@/mixins/currentPage.js';
import { urlsMixin } from '@/mixins/urls.js';
import { redirectionLinksMixin } from '@/mixins/redirectionLinks.js';

import { planetsService } from '@/services/planets_service.js';

export default {
  mixins: [currentPageMixin, urlsMixin, redirectionLinksMixin],
  components: {
    ThePagination,
  },
  data() {
    return {
      isLoading: false,
      planets: [],
      totalResults: '',
      maxPerPage: 10,
      currentURL: '',
      currentPage: null,
      numberOfPages: null,
      queryDone: false,
    };
  },
  methods: {
    async showPlanets() {
      this.isLoading = true;
      await planetsService.getPlanets(this.currentPage).then((response) => {
        if (response == 404) {
          this.pageNotFound();
          return;
        } else if (response.results) {
          this.planets = response.results;
          this.totalResults = response.count;
          this.numberOfPages = Math.ceil(this.totalResults / this.maxPerPage);
        } else {
          this.somethingWrong();
          return;
        }
      });
      this.$refs.pagination.checkButtons();
      this.isLoading = false;
    },
    changePage(updatedCurrentPage) {
      this.currentPage = updatedCurrentPage;
      this.updateQuery(
        '/the-sw-universe/planets',
        'thePlanets',
        this.currentPage
      );
      this.showPlanets();
      window.scrollTo(0, 0);
    },
    viewPlanet(planet) {
      this.$router.push({
        name: 'PlanetDetail',
        path: '/the-sw-universe/planets/:name',
        params: {
          name: planet.name.replace(/\s+/g, '-').toLowerCase(),
          url: planet.url,
        },
      });
    },
  },
  async mounted() {
    var hasParam = this.checkUrlParams(this.$route.fullPath);
    if (!hasParam) {
      // if the url doesn't have params, add page 1
      await this.$router.push({
        name: 'thePlanets',
        path: '/the-sw-universe/planets',
        query: { page: 1 },
      });
    }

    if (this.queryDone === false) {
      this.currentPage = this.fetchCurrentPage(this.$route.fullPath);
      this.showPlanets();
      this.queryDone = true;
    }
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/buttons.scss';

p {
  color: #ffffff;
}
.border {
  border: 1px solid #ffe81f !important;
  border-radius: 2px;
  padding-top: 10px;
}
a {
  text-decoration: none !important;
}
h2 {
  min-height: 80px;
  align-items: center;
  display: grid;
}
.terrain {
  min-height: 60px;
  padding: 0px 5px;
  align-items: center;
  display: grid;
}
</style>