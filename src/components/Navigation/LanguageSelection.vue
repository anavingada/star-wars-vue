<template>
  <div class="col-md-3 col-lg-2 d-grid align-items-center text-center">
    <select v-model="selected" @change="changeLanguage($event)">
      <option class="option" value="en">{{ $t('English') }}</option>
      <option class="option" value="es">{{ $t('Spanish') }}</option>
      <option class="option" value="pt">{{ $t('Portuguese') }}</option>
    </select>
  </div>
</template>

<script>
import { useI18n } from 'vue3-i18n';
export default {
  data() {
    return {
      selected: 'en',
    };
  },
  setup() {
    const locale = useI18n();
    const changeLanguage = (e) => {
      let selectedLang = e.target.value;
      locale.setLocale((locale.value = selectedLang));
    };
    return {
      locale,
      changeLanguage,
    };
  },
};
</script>

<style lang="scss" scoped>
select {
  margin: auto;
  width: 100%;
  min-height: 30px;
  max-width: 150px;
  min-width: 60px;
  background-color: transparent;
  color: #ffffff;
  border: 2px solid #ffe81f;
  border-radius: 5px;
  padding: 10px;
}
.option {
  background-color: #000000;
  color: #ffffff;
}
@media only screen and (max-width: 767px) {
  div {
    float: right;
  }
  select {
    border: none;
    font-size: 18px;
  }
}
</style>
