import { charactersService } from "../services/characters_service.js";
import { moviesService } from '../services/movies_service.js';
import { planetsService } from '../services/planets_service.js';
import { spaceshipsService } from '../services/spaceships_service.js';
import { speciesService } from '../services/species_service.js';
import { vehiclesService } from '../services/vehicles_service.js';

const displayInfoMixin = {
    data() {
        return {
            charactersInfo: [],
            moviesInfo: [],
            planetsInfo: [],
            spaceshipsInfo: [],
            speciesInfo: [],
            vehiclesInfo: []
        }
    },
    methods: {
        async displayCharacters(characters) {
            for (var i = 0; i < characters.length; i++) {
                await charactersService.getCharacterInfo(characters[i]).then((response) => {
                    this.charactersInfo.push({ name: response.name, url: response.url });
                }).catch((error) => console.log('error', error));
            }
            return this.charactersInfo;
        },
        async displayMovies(movies) {
            for (var i = 0; i < movies.length; i++) {
                await moviesService.getMovieInfo(movies[i]).then((response) => {
                    this.moviesInfo.push({ title: response.title, url: response.url });
                }).catch((error) => console.log('error', error));
            }
            return this.moviesInfo;
        },
        async displayPlanets(planets) {
            for (var i = 0; i < planets.length; i++) {
                await planetsService.getPlanetInfo(planets[i]).then((response) => {
                    this.planetsInfo.push({ name: response.name, url: response.url });
                }).catch((error) => console.log('error', error));
            }
            return this.planetsInfo;
        },
        async displaySpaceships(spaceships) {
            for (var i = 0; i < spaceships.length; i++) {
                await spaceshipsService.getSpaceshipInfo(spaceships[i]).then((response) => {
                    this.spaceshipsInfo.push({ name: response.name, url: response.url });
                }).catch((error) => console.log('error', error));
            }
            return this.spaceshipsInfo;
        },
        async displaySpecies(species) {
            for (var i = 0; i < species.length; i++) {
                await speciesService.getSpecieInfo(species[i]).then((response) => {
                    this.speciesInfo.push({ name: response.name, url: response.url });
                }).catch((error) => console.log('error', error));
            }
            return this.speciesInfo;
        },
        async displayVehicles(vehicles) {
            for (var i = 0; i < vehicles.length; i++) {
                await vehiclesService.getVehicleInfo(vehicles[i]).then((response) => {
                    this.vehiclesInfo.push({ name: response.name, url: response.url });
                }).catch((error) => console.log('error', error));
            }
            return this.vehiclesInfo;
        }
    },
};

export {
    displayInfoMixin
};

