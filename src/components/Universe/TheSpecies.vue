<template>
  <h1 class="text-center mt-2 mb-4">Star Wars Species</h1>
  <div v-if="species === null" class="text-center">
    <p>No species found!</p>
  </div>
  <div v-else-if="isLoading" class="text-center">
    <p>Loading...</p>
  </div>
  <div v-else>
    <div class="d-flex justify-content-around ms-3 me-3">
      <p>Total of species: {{ totalResults }}</p>
      <p>Page {{ currentPage }} / {{ numberOfPages }}</p>
    </div>
    <div class="d-md-flex flex-md-wrap mt-4">
      <div
        v-for="specie in species"
        :key="specie.url"
        class="col-md-4 p-4 text-center"
      >
        <div class="border">
          <h2 style="min-height: 80px">
            {{ specie.name }}
          </h2>
          <p>{{ specie.classification }}</p>
          <button @click="viewSpecie(specie)" class="btn-view">View</button>
        </div>
      </div>
    </div>
  </div>
  <the-pagination
    v-show="!isLoading"
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
import { redirectionLinksMixin, viewDetailMixin } from '@/mixins/redirectionLinks.js';

import { speciesService } from '@/services/species_service.js';

export default {
  mixins: [currentPageMixin, urlsMixin, redirectionLinksMixin, viewDetailMixin],
  components: {
    ThePagination,
  },
  data() {
    return {
      isLoading: false,
      species: [],
      totalResults: '',
      maxPerPage: 10,
      currentURL: '',
      currentPage: null,
      numberOfPages: null,
      queryDone: false,
    };
  },
  methods: {
    async showSpecies() {
      this.isLoading = true;
      await speciesService
        .getSpecies(this.currentPage)
        .then((response) => {
          if (response == 404) {
            this.pageNotFound();
            return;
          } else if (response.results) {
            this.species = response.results;
            this.totalResults = response.count;
            this.numberOfPages = Math.ceil(this.totalResults / this.maxPerPage);
          } else {
            this.somethingWrong();
            return;
          }
        })
        .finally(() => {
          this.$refs.pagination.checkButtons();
          this.isLoading = false;
        });
    },
    changePage(updatedCurrentPage) {
      this.currentPage = updatedCurrentPage;
      this.updateQuery(
        '/the-sw-universe/species',
        'theSpecies',
        this.currentPage
      );
      window.scrollTo(0, 0);
    }
  },
  async mounted() {
    var hasParam = this.checkUrlParams(this.$route.fullPath);
    if (!hasParam) {
      // if the url doesn't have params, add page 1
      await this.$router.push({
        name: 'theSpecies',
        path: '/the-sw-universe/species',
        query: { page: 1 },
      });
    } else {
      if (this.queryDone === false) {
        this.currentPage = this.fetchCurrentPage(this.$route.fullPath);
        await this.showSpecies();
        this.queryDone = true;
      }
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
</style>