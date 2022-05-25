import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import TheIntro from './components/General/TheIntro.vue';
import NotFound from './components/General/NotFound.vue';
import SomethingWrong from './components/General/SomethingWrong.vue';
import TheMaterials from './components/General/TheMaterials.vue';

import TheUniverse from './components/Universe/TheUniverse.vue';
import TheMovies from './components/Universe/TheMovies.vue';

import MovieDetail from './components/UniverseDetail/MovieDetail.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'intro', component: TheIntro },
        { path: '/error-404', name: 'NotFound', component: NotFound },
        { path: '/error', name: 'SomethingWrong', component: SomethingWrong },
        { path: '/the-sw-universe/materials', name: 'theMaterials', component: TheMaterials },
        { path: '/the-sw-universe', name: 'theUniverse', component: TheUniverse },
        { path: '/the-sw-universe/movies', name: 'theMovies', component: TheMovies },
        { path: '/the-sw-universe/movies/:name', name: 'MovieDetail', component: MovieDetail }
    ],
    linkActiveClass: 'active'
});

const app = createApp(App);

app.use(router);

app.mount('#app');