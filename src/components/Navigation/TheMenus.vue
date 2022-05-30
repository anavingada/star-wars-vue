<template>
  <nav class="col-9 navbar navbar-expand-md navbar-light">
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse col-9" id="navbarSupportedContent">
      <ul class="navbar-nav pt-md-3 pb-md-3">
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            The SW Universe
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <router-link :to="{ name: 'theUniverse' }" class="dropdown-item">
              All Universe
            </router-link>
            <router-link
              :to="{ name: 'theCharacters', query: { page: 1 } }"
              class="dropdown-item"
            >
              Characters
            </router-link>
            <router-link
              :to="{ name: 'theMovies', query: { page: 1 } }"
              class="dropdown-item"
            >
              Movies
            </router-link>
            <router-link
              :to="{ name: 'thePlanets', query: { page: 1 } }"
              class="dropdown-item"
            >
              Planets
            </router-link>
            <router-link
              :to="{ name: 'theSpaceships', query: { page: 1 } }"
              class="dropdown-item"
            >
              Spaceships
            </router-link>
            <router-link to="/" class="dropdown-item"> Species </router-link>
            <router-link to="/" class="dropdown-item"> Vehicles </router-link>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { redirectionLinksMixin } from '@/mixins/redirectionLinks.js';
export default {
  mixins: [redirectionLinksMixin],
};
</script>

<style scoped>
a {
  color: #ffffff !important;
}
ul {
  font-size: 18px;
}
.dropdown-menu {
  background-color: unset;
  font-size: 16px;
  border: none;
}
.dropdown-menu a:hover {
  background-color: unset;
  font-size: 17px;
  font-weight: bold;
}
a.active.router-link-exact-active.dropdown-item {
  background-color: rgba(255, 232, 31, 0.5);
  color: #ffffff !important;
}
.dropdown-menu.show {
  display: flex;
}
@media only screen and (max-width: 767px) {
  .dropdown-menu.show {
    display: block;
  }
}
</style>