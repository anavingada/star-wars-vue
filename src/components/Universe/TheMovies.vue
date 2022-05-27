<template>
  <h1 class="text-center mt-2 mb-4">Star Wars Movies</h1>
  <div v-if="movies === null" class="text-center">
    <p>No movies found!</p>
  </div>
  <div v-else-if="isLoading" class="text-center">
    <p>Loading...</p>
  </div>
  <div v-else>
    <div class="d-flex justify-content-around ms-3 me-3">
      <p>Total of movies: {{ totalResults }}</p>
      <p>Page {{ currentPage }} / {{ numberOfPages }}</p>
    </div>
    <div class="d-md-flex flex-md-wrap mt-4">
      <div
        v-for="movie in movies"
        :key="movie.url"
        class="col-md-4 p-4 text-center"
      >
        <div class="border">
          <h2 style="min-height: 80px">
            {{ movie.title }}
          </h2>
          <p>Episode {{ movie.episode_id }}</p>
          <button @click="viewMovie(movie)" class="btn-view">View</button>
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
import urlParamsMixin from '@/mixins/urlParams.js';
import { redirectionLinksMixin } from '@/mixins/redirectionLinks.js';
import { moviesService } from '@/services/movies_service.js';

export default {
  mixins: [currentPageMixin, urlParamsMixin, redirectionLinksMixin],
  components: {
    ThePagination,
  },
  data() {
    return {
      isLoading: false,
      movies: [],
      totalResults: '',
      maxPerPage: 10,
      currentURL: '',
      currentPage: null,
      numberOfPages: null,
      queryDone: false,
    };
  },
  methods: {
    async displayMovies() {
      this.isLoading = true;
      await moviesService.getMovies(this.currentPage).then((response) => {
        if (response == 404) {
          this.pageNotFound();
          return;
        } else if (response.results) {
          this.movies = response.results;
          this.totalResults = response.count;
          this.numberOfPages = Math.ceil(this.totalResults / this.maxPerPage);
          // console.log('results length: ' + this.totalResults);
          // console.log('Max per page: ' + this.maxPerPage);
          // console.log('Number of pages: ' + this.numberOfPages);
          // console.log('Current page: ' + this.currentPage);
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
      this.updateQuery();
      this.displayMovies();
      window.scrollTo(0, 0);
    },
    updateQuery() {
      this.$router.push({
        path: '/the-sw-universe/movies',
        name: 'theMovies',
        query: {
          page: this.currentPage,
        },
      });
    },
    viewMovie(movie) {
      this.$router.push({
        name: 'MovieDetail',
        path: '/the-sw-universe/movies/:name',
        params: {
          name: movie.title.replace(/\s+/g, '-').toLowerCase(),
          url: movie.url,
          data: movie,
        },
      });
    },
  },
  async mounted() {
    var hasParam = this.checkUrlParams(this.$route.fullPath);
    if (!hasParam) {
      // if the url doesn't have params, add page 1
      await this.$router.push({
        name: 'theMovies',
        path: '/the-sw-universe/movies',
        query: { page: 1 },
      });
    }

    if (this.queryDone === false) {
      this.currentPage = this.fetchCurrentPage(this.$route.fullPath);
      this.displayMovies();
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
</style>