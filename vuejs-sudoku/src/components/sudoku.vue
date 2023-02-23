<template>
  <main>
    <grid v-bind:cells="cells"></grid>
    <commands></commands>
  </main>
</template>

<script>
import grid from "./sudoku/grid.vue";
import commands from "./sudoku/commands.vue";
import { makepuzzle as generateNumbers } from "sudoku";

export default {
  components: {
    grid,
    commands
  },
  data() {
    return {
      cells: this.generateSudokuCells()
    };
  },
  methods: {
    generateSudokuCells() {
      const rawNumbers = generateNumbers();

      const gameState = rawNumbers.map((number, index) => {
        let value = number == null ? "" : `${number + 1}`;

        return {
          value
        };
      });

      return gameState;
    }
  }
};
</script>
