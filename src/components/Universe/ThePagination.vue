<template>
  <div id="pagination">
    <div class="text-center mt-5 mb-5">
      <button id="prev" class="ms-3 me-3" disabled @click="previousPage()">
        &lt;
      </button>
      <button id="next" class="ms-3 me-3" @click="nextPage()">&gt;</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['currentPage', 'numberOfPages'],
  data() {
    return {
      updatedCurrentPage: null,
    };
  },
  methods: {
    checkButtons() {
      document.getElementById('next').disabled =
        this.currentPage == this.numberOfPages ? true : false;
      document.getElementById('prev').disabled =
        this.currentPage == 1 ? true : false;
    },
    nextPage() {
      this.updatedCurrentPage = this.currentPage;
      this.updatedCurrentPage++;
      this.$emit('updateCurrentPage', this.updatedCurrentPage);
    },
    previousPage() {
      this.updatedCurrentPage = this.currentPage;
      this.updatedCurrentPage--;
      this.$emit('updateCurrentPage', this.updatedCurrentPage);
    },
  },
};
</script>

<style scoped>
button:disabled {
  border: 1px solid rgba(255, 232, 31, 0.5);
  background-color: rgba(255, 232, 31, 0.5);
  color: rgba(0, 0, 0, 0.5);
}
button {
  border: 1px solid #ffe81f;
  background-color: #ffe81f;
  color: #000000;
  padding: 5px 15px;
  border-radius: 2px;
  font-weight: bold;
}
</style>
