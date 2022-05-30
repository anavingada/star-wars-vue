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
        redirectToSpecies() {
            this.$router.push({
                path: '/the-sw-universe/species',
                name: 'theSpecies',
                query: { page: 1 }
            });
        },
        redirectToVehicles() {
            this.$router.push({
                path: '/the-sw-universe/vehicles',
                name: 'theVehicles',
                query: { page: 1 }
            });
        }
    }
};

const viewDetailMixin = {
    methods: {
        viewMovie(movie) {
            this.$router.push({
                name: 'MovieDetail',
                path: '/the-sw-universe/movies/:name',
                params: {
                    name: movie.title.replace(/\s+/g, '-').toLowerCase(),
                    url: movie.url,
                },
            });
        },
        viewCharacter(character) {
            this.$router.push({
                name: 'CharacterDetail',
                path: '/the-sw-universe/characters/:name',
                params: {
                    name: character.name.replace(/\s+/g, '-').toLowerCase(),
                    url: character.url,
                },
            });
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
        viewSpaceship(spaceship) {
            this.$router.push({
                name: 'SpaceshipDetail',
                path: '/the-sw-universe/spaceships/:name',
                params: {
                    name: spaceship.name.replace(/\s+/g, '-').toLowerCase(),
                    url: spaceship.url,
                },
            });
        },
        viewSpecie(specie) {
            this.$router.push({
                name: 'SpecieDetail',
                path: '/the-sw-universe/species/:name',
                params: {
                    name: specie.name.replace(/\s+/g, '-').toLowerCase(),
                    url: specie.url,
                },
            });
        },
        viewVehicle(vehicle) {
            this.$router.push({
                name: 'VehicleDetail',
                path: '/the-sw-universe/vehicles/:name',
                params: {
                    name: vehicle.name.replace(/\s+/g, '-').toLowerCase(),
                    url: vehicle.url,
                },
            });
        },
    }
};

export {
    redirectionLinksMixin,
    viewDetailMixin
};