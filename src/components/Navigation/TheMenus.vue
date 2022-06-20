<template>
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
    <ul class="navbar-nav pt-md-3 pb-md-3 col-md-9 col-lg-10">
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
          {{ $t('SW_Universe') }}
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <router-link :to="{ name: 'theUniverse' }" class="dropdown-item">
            {{ $t('All_Universe') }}
          </router-link>
          <router-link
            :to="{ name: 'theCharacters', query: { page: 1 } }"
            class="dropdown-item"
          >
            {{ $t('Characters') }}
          </router-link>
          <router-link
            :to="{ name: 'theMovies', query: { page: 1 } }"
            class="dropdown-item"
          >
            {{ $t('Movies') }}
          </router-link>
          <router-link
            :to="{ name: 'thePlanets', query: { page: 1 } }"
            class="dropdown-item"
          >
            {{ $t('Planets') }}
          </router-link>
          <router-link
            :to="{ name: 'theSpaceships', query: { page: 1 } }"
            class="dropdown-item"
          >
            {{ $t('Spaceships') }}
          </router-link>
          <router-link
            :to="{ name: 'theSpecies', query: { page: 1 } }"
            class="dropdown-item"
          >
            {{ $t('Species') }}
          </router-link>
          <router-link
            :to="{ name: 'theVehicles', query: { page: 1 } }"
            class="dropdown-item"
          >
            {{ $t('Vehicles') }}
          </router-link>
        </div>
      </li>
    </ul>
    <language-selection></language-selection>
  </div>
</template>

<script>
import LanguageSelection from './LanguageSelection.vue';
import { redirectionLinksMixin } from '@/mixins/redirectionLinks.js';

export default {
  mixins: [redirectionLinksMixin],
  components: {
    LanguageSelection,
  },
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

.navbar-toggler {
  color: #ffe81f;
  border: 1px solid #ffe81f;
}
.navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 232, 31, 1)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}
@media only screen and (max-width: 1199px) {
  ul.navbar-nav {
    justify-content: center;
  }
  .dropdown-menu.show {
    columns: 2;
    display: block;
    background-color: #000000;
    border-radius: 5px;
    border: 1px solid #ffe81f;
  }
  .navbar {
    justify-content: end;
  }
}
@media only screen and (max-width: 767px) {
  #navbarSupportedContent.navbar-collapse {
    padding-bottom: 20px;
    border-bottom: 1px solid #ffe81f;
  }
  .nav-item.dropdown {
    margin-bottom: 20px;
  }
  #navbarDropdown {
    text-align: right;
  }
  .dropdown-menu {
    text-align: right;
    border: none !important;
  }
}
@media only screen and (max-width: 299px) {
  .dropdown-menu.show {
    columns: 1;
  }
}
</style>