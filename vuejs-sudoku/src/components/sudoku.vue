<template>
  <main>
    <grid></grid>
    <commands></commands>
  </main>
</template>

<script>
import grid from "./sudoku/grid.vue";
import commands from "./sudoku/commands.vue";

export default {
  components: {
    grid,
    commands
  },
  data() {
    return {};
  }
};
</script>
