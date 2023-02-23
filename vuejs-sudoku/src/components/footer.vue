<template>
  <footer>
    <a v-bind:href="website" target="_blank">
      <i class="fa-brands fa-github"></i>
      {{ seeCode }}
    </a>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      seeCode: "see my code",
      website: "https://github.com/adnanZe/Sudoku-Vue"
    };
  }
};
</script>
