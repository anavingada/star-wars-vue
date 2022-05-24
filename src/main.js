import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import TheIntro from './components/General/TheIntro.vue';
import NotFound from './components/General/NotFound.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'intro', component: TheIntro },
        { path: '/error-404', name: 'NotFound', component: NotFound }
    ],
    linkActiveClass: 'active'
});

const app = createApp(App);

app.component('not-found', NotFound);

app.use(router);

app.mount('#app');