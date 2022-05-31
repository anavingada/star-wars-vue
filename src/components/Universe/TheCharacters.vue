<template>
  <h1 class="text-center mt-2 mb-4">{{ $t('SW_Characters') }}</h1>
  <div v-if="characters === null" class="text-center">
    <p>{{ $t('No_Characters') }}</p>
  </div>
  <div v-else-if="isLoading" class="text-center">
    <p>{{ $t('Loading_') }}</p>
  </div>
  <div v-else>
    <div class="d-flex justify-content-around ms-3 me-3">
      <p>{{ $t('Total_Of') }} {{ $t('characters') }}: {{ totalResults }}</p>
      <p>{{ $t('Page') }} {{ currentPage }} / {{ numberOfPages }}</p>
    </div>
    <div class="d-md-flex flex-md-wrap mt-4">
      <div
        v-for="character in characters"
        :key="character.url"
        class="col-md-3 p-4 text-center"
      >
        <div class="border">
          <h2 style="min-height: 80px">{{ character.name }}</h2>
          <p>{{ character.gender }}</p>
          <button @click="viewCharacter(character)" class="btn-view">
            {{ $t('View') }}
          </button>
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
import {
  redirectionLinksMixin,
  viewDetailMixin,
} from '@/mixins/redirectionLinks.js';

import { charactersService } from '@/services/characters_service.js';

export default {
  mixins: [currentPageMixin, urlsMixin, redirectionLinksMixin, viewDetailMixin],
  components: {
    ThePagination,
  },
  data() {
    return {
      isLoading: false,
      characters: [],
      totalResults: '',
      maxPerPage: 10,
      currentURL: '',
      currentPage: null,
      numberOfPages: null,
      queryDone: false,
    };
  },
  methods: {
    async showCharacters() {
      this.isLoading = true;
      await charactersService
        .getCharacters(this.currentPage)
        .then((response) => {
          if (response == 404) {
            this.pageNotFound();
            return;
          } else if (response.results) {
            this.characters = response.results;
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
        '/the-sw-universe/characters',
        'theCharacters',
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
        name: 'theCharacters',
        path: '/the-sw-universe/characters',
        query: { page: 1 },
      });
    } else {
      if (this.queryDone === false) {
        this.currentPage = this.fetchCurrentPage(this.$route.fullPath);
        await this.showCharacters();
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