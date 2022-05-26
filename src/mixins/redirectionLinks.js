const redirectionLinksMixin = {
    methods: {
        pageNotFound() {
            this.$router.push({
                path: '/error-404',
                name: 'NotFound'
            });
        },
        somethingWrong() {
            this.$router.push({
                path: '/error',
                name: 'SomethingWrong'
            });
        },
        redirectHome() {
            this.$router.push({
                path: '/',
                name: 'intro'
            });
        },
        redirectToMovies() {
            this.$router.push({
                path: '/the-sw-universe/movies',
                name: 'theMovies'
            });
        }
    }
};

export {
    redirectionLinksMixin
};