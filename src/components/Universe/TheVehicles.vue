<template>
  <h1 class="text-center mt-2 mb-4">Star Wars Vehicles</h1>
  <div v-if="vehicles === null" class="text-center">
    <p>No vehicles found!</p>
  </div>
  <div v-else-if="isLoading" class="text-center">
    <p>Loading...</p>
  </div>
  <div v-else>
    <div class="d-flex justify-content-around ms-3 me-3">
      <p>Total of vehicles: {{ totalResults }}</p>
      <p>Page {{ currentPage }} / {{ numberOfPages }}</p>
    </div>
    <div class="mt-4">
      <div v-for="vehicle in vehicles" :key="vehicle.url">
        <div class="d-flex ps-4 pe-4 align-items-center">
          <h2 class="col-5">{{ vehicle.name }}</h2>
          <p class="col-4 noMargin">{{ vehicle.model }}</p>
          <button @click="viewVehicle(vehicle)" class="btn-view">View</button>
        </div>
        <hr />
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

import { vehiclesService } from '@/services/vehicles_service.js';

export default {
  mixins: [currentPageMixin, urlsMixin, redirectionLinksMixin, viewDetailMixin],
  components: {
    ThePagination,
  },
  data() {
    return {
      isLoading: false,
      vehicles: [],
      totalResults: '',
      maxPerPage: 10,
      currentURL: '',
      currentPage: null,
      numberOfPages: null,
      queryDone: false,
    };
  },
  methods: {
    async showVehicles() {
      this.isLoading = true;
      await vehiclesService
        .getVehicles(this.currentPage)
        .then((response) => {
          if (response == 404) {
            this.pageNotFound();
            return;
          } else if (response.results) {
            this.vehicles = response.results;
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
        '/the-sw-universe/vehicles',
        'theVehicles',
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
        name: 'theVehicles',
        path: '/the-sw-universe/vehicles',
        query: { page: 1 },
      });
    } else {
      if (this.queryDone === false) {
        this.currentPage = this.fetchCurrentPage(this.$route.fullPath);
        await this.showVehicles();
        this.queryDone = true;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/buttons.scss';

hr {
  height: 2px;
  color: #ffe81f;
  opacity: 0.8;
  border-radius: 2px;
}
.noMargin {
  margin: 0;
}
p {
  color: #ffffff;
}
a {
  text-decoration: none;
  color: #000000;
  background-color: #ffe81f;
  border: 2px solid #ffe81f;
  font-weight: bold;
}
a p {
  color: #000000;
}
a:hover {
  background-color: unset;
  color: #ffffff;
}
a p:hover {
  color: #ffffff;
}
</style>