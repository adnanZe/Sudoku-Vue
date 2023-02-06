<template>
  <div>
    <app-header></app-header>
    <sudoku></sudoku>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from "./components/header.vue";
import Footer from "./components/footer.vue";
import Sudoku from "./components/sudoku.vue";

export default {
  components: {
    "app-header": Header,
    "app-footer": Footer,
    sudoku: Sudoku
  },

  data() {
    return {};
  }
};
</script>

<style>
body {
  margin: 0;
}
</style>
