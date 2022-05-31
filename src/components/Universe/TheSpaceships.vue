<template>
  <h1 class="text-center mt-2 mb-4">{{ $t('SW_Spaceships') }}</h1>
  <div v-if="spaceships === null" class="text-center">
    <p>{{ $t('No_Spaceships') }}</p>
  </div>
  <div v-else-if="isLoading" class="text-center">
    <p>{{ $t('Loading_') }}</p>
  </div>
  <div v-else>
    <div class="d-flex justify-content-around ms-3 me-3">
      <p>{{ $t('Total_Of') }} {{ $t('spaceships') }}: {{ totalResults }}</p>
      <p>{{ $t('Page') }} {{ currentPage }} / {{ numberOfPages }}</p>
    </div>
    <div class="mt-4">
      <div v-for="spaceship in spaceships" :key="spaceship.url">
        <div class="d-flex ps-4 pe-4 align-items-center">
          <h2 class="col-5">{{ spaceship.name }}</h2>
          <p class="col-4 noMargin">{{ spaceship.model }}</p>
          <button @click="viewSpaceship(spaceship)" class="btn-view">
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

import { spaceshipsService } from '@/services/spaceships_service.js';

export default {
  mixins: [currentPageMixin, urlsMixin, redirectionLinksMixin, viewDetailMixin],
  components: {
    ThePagination,
  },
  data() {
    return {
      isLoading: false,
      spaceships: [],
      totalResults: '',
      maxPerPage: 10,
      currentURL: '',
      currentPage: null,
      numberOfPages: null,
      queryDone: false,
    };
  },
  methods: {
    async showSpaceships() {
      this.isLoading = true;
      await spaceshipsService
        .getSpaceships(this.currentPage)
        .then((response) => {
          if (response == 404) {
            this.pageNotFound();
            return;
          } else if (response.results) {
            this.spaceships = response.results;
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
        '/the-sw-universe/spaceships',
        'theSpaceships',
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
        name: 'theSpaceships',
        path: '/the-sw-universe/spaceships',
        query: { page: 1 },
      });
    } else {
      if (this.queryDone === false) {
        this.currentPage = this.fetchCurrentPage(this.$route.fullPath);
        await this.showSpaceships();
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
