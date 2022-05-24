<template>
  <div>
    <the-header></the-header>
    <div class="container">
      <router-view></router-view>
    </div>
    <the-footer></the-footer>
  </div>
</template>

<script>

import TheHeader from './components/Navigation/TheHeader.vue';
import TheFooter from './components/Navigation/TheFooter.vue';
export default {
  components: {
    TheHeader, 
    TheFooter
  }
};
</script>

<style>
/* Font styles */
* {
  box-sizing: border-box;
  font-family: "Work Sans Light 300", verdana, arial, sans-serif;
}
html {
  font-family: sans-serif;
}
@font-face {
  font-family: "Work Sans Extra-light 200";
  src: local("Work Sans"),
   url(./assets/fonts/Work_Sans/WorkSans-ExtraLight.ttf) format("truetype");
}
@font-face {
  font-family: "Work Sans Light 300";
  src: local("Work Sans"),
   url(./assets/fonts/Work_Sans/WorkSans-Light.ttf) format("truetype");
}
@font-face {
  font-family: "Work Sans Regular 400";
  src: local("Work Sans"),
   url(./assets/fonts/Work_Sans/WorkSans-Regular.ttf) format("truetype");
}
body {
  margin: 0;
  background-image: url('~@/assets/images/back_sky.jpg');
}
h1, h2 {
  color: #ffffff;
}
p {
  color:#ffffff;
}
img {
  max-width: 100%;
}
</style>