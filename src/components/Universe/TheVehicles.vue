<template>
  <h1 class="text-center mt-2 mb-4">{{ $t('SW_Vehicles') }}</h1>
  <div v-if="vehicles === null" class="text-center">
    <p>{{ $t('No_Vehicles') }}</p>
  </div>
  <div v-else-if="isLoading" class="text-center">
    <p>{{ $t('Loading_') }}</p>
  </div>
  <div v-else>
    <div class="d-flex justify-content-around ms-3 me-3">
      <p>{{ $t('Total_Of') }} {{ $t('vehicles') }}: {{ totalResults }}</p>
      <p>{{ $t('Page') }} {{ currentPage }} / {{ numberOfPages }}</p>
    </div>
    <div class="mt-4">
      <div v-for="vehicle in vehicles" :key="vehicle.url">
        <div class="d-flex ps-4 pe-4 align-items-center">
          <h2 class="col-5">{{ vehicle.name }}</h2>
          <p class="col-4 noMargin">{{ vehicle.model }}</p>
          <button @click="viewVehicle(vehicle)" class="btn-view">
            {{ $t('View') }}
          </button>
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
import {
  redirectionLinksMixin,
  viewDetailMixin,
} from '@/mixins/redirectionLinks.js';

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
    },
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
@import '@/assets/styles/universe.scss';
</style>