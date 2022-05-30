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
                name: 'theMovies',
                query: { page: 1 }
            });
        },
        redirectToCharacters() {
            this.$router.push({
                path: '/the-sw-universe/characters',
                name: 'theCharacters',
                query: { page: 1 }
            });
        },
        redirectToPlanets() {
            this.$router.push({
                path: '/the-sw-universe/planets',
                name: 'thePlanets',
                query: { page: 1 }
            });
        },
        redirectToSpaceships() {
            this.$router.push({
                path: '/the-sw-universe/spaceships',
                name: 'theSpaceships',
                query: { page: 1 }
            });
        },
            });
        }
    }
};

export {
    redirectionLinksMixin
};