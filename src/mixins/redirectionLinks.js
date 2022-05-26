const pageNotFoundMixin = {
    methods: {
        pageNotFound() {
            this.$router.push({
                path: '/error-404',
                name: 'NotFound'
            });
        }
    },
};

const somethingWrongMixin = {
    methods: {
        somethingWrong() {
            this.$router.push({
                path: '/error',
                name: 'SomethingWrong'
            });
        }
    },
};

const redirectHomeMixin = {
    methods: {
        redirectHome() {
            this.$router.push({
                path: '/',
                name: 'intro'
            });
        }
    },
};

const redirectToMoviesMixin = {
    methods: {
        redirectToMovies() {
            this.$router.push({
                path: '/the-sw-universe/movies',
                name: 'theMovies'
            });
        }
    },
};

export {
    pageNotFoundMixin,
    somethingWrongMixin,
    redirectHomeMixin,
    redirectToMoviesMixin
};