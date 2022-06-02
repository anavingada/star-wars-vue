import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import i18n from "./localization/languageIndex";

import TheIntro from './components/General/TheIntro.vue';
import NotFound from './components/General/NotFound.vue';
import SomethingWrong from './components/General/SomethingWrong.vue';
import TheMaterials from './components/General/TheMaterials.vue';

import TheUniverse from './components/Universe/TheUniverse.vue';
import TheMovies from './components/Universe/TheMovies.vue';
import TheCharacters from './components/Universe/TheCharacters.vue';
import ThePlanets from './components/Universe/ThePlanets.vue';
import TheSpaceships from './components/Universe/TheSpaceships.vue';
import TheSpecies from './components/Universe/TheSpecies.vue';
import TheVehicles from './components/Universe/TheVehicles.vue';

import MovieDetail from './components/UniverseDetail/MovieDetail.vue';
import CharacterDetail from './components/UniverseDetail/CharacterDetail.vue';
import PlanetDetail from './components/UniverseDetail/PlanetDetail.vue';
import SpaceshipDetail from './components/UniverseDetail/SpaceshipDetail.vue';
import SpecieDetail from './components/UniverseDetail/SpecieDetail.vue';
import VehicleDetail from './components/UniverseDetail/VehicleDetail.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'intro', component: TheIntro },
    { path: '/error-404', name: 'NotFound', component: NotFound },
    { path: '/error', name: 'SomethingWrong', component: SomethingWrong },
    { path: '/the-sw-universe/materials', name: 'theMaterials', component: TheMaterials },
    { path: '/the-sw-universe', name: 'theUniverse', component: TheUniverse },
    { path: '/the-sw-universe/movies', name: 'theMovies', component: TheMovies },
    { path: '/the-sw-universe/movies/:name', name: 'MovieDetail', component: MovieDetail },
    { path: '/the-sw-universe/characters', name: 'theCharacters', component: TheCharacters },
    { path: '/the-sw-universe/characters/:name', name: 'CharacterDetail', component: CharacterDetail },
    { path: '/the-sw-universe/planets', name: 'thePlanets', component: ThePlanets },
    { path: '/the-sw-universe/planets/:name', name: 'PlanetDetail', component: PlanetDetail },
    { path: '/the-sw-universe/spaceships', name: 'theSpaceships', component: TheSpaceships },
    { path: '/the-sw-universe/spaceships/:name', name: 'SpaceshipDetail', component: SpaceshipDetail },
    { path: '/the-sw-universe/species', name: 'theSpecies', component: TheSpecies },
    { path: '/the-sw-universe/species/:name', name: 'SpecieDetail', component: SpecieDetail },
    { path: '/the-sw-universe/vehicles', name: 'theVehicles', component: TheVehicles },
    { path: '/the-sw-universe/vehicles/:name', name: 'VehicleDetail', component: VehicleDetail }
  ],
  linkActiveClass: 'active'
});

const app = createApp(App);

app.use(router);
app.use(i18n);

app.mount('#app');