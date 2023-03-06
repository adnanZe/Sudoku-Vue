<template>
  <main>
    <grid :cells="cells" v-on:onSelectCell="onSelectCell($event)"></grid>
    <commands
      v-on:onAddNumber="onAddNumber($event)"
      :isActiveNotes="isActiveNotes"
      @update-isActiveNotes="onNotes"
      :onErase="onErase"
      :onUndo="onUndo"
    ></commands>
  </main>
</template>

<script>
import grid from "./sudoku/grid.vue";
import commands from "./sudoku/commands.vue";
import {
  generateSudokuCells,
  getIsMatchedNumber
} from "../services/sudokuService";

export default {
  components: {
    grid,
    commands
  },
  data() {
    return {
      cells: [],
      isActiveNotes: false
    };
  },
  methods: {
    onUndo() {},

    onErase() {
      let selectedCell = this.getSelectedCell();

      if (selectedCell.isReadOnly) return;

      this.eraseNumber(selectedCell);
      this.updateMatchedNumber(selectedCell);
    },

    onNotes(isActive) {
      this.isActiveNotes = isActive;
    },

    onAddNumber(number) {
      let selectedCell = this.getSelectedCell();

      if (selectedCell.isReadOnly) return;

      this.addNumber(selectedCell, number);
      this.updateMatchedNumber(selectedCell);
    },

    onSelectCell(selectedCell) {
      this.updateSelectedCell(selectedCell);
      this.updateAssociatedIds(selectedCell);
      this.updateMatchedNumber(selectedCell);
    },

    getSelectedCell() {
      return this.cells.find(cell => cell.isSelected === true);
    },

    eraseNumber(selectedCell) {
      this.cells.map(cell => {
        if (cell.id === selectedCell.id) {
          return (cell.value = "");
        }
      });
    },

    addNumber(selectedCell, number) {
      this.cells.map(cell => {
        if (cell.id === selectedCell.id) {
          return (cell.value = number);
        }
      });
    },

    updateMatchedNumber(selectedCell) {
      this.cells.map(cell => {
        cell.isMatchValue = getIsMatchedNumber(cell.value, selectedCell.value);
      });
    },

    updateSelectedCell(selectedCell) {
      this.cells.map(cell => {
        return (cell.isSelected = selectedCell.id == cell.id ? true : false);
      });
    },

    updateAssociatedIds(selectedCell) {
      this.cells.map(cell => {
        if (cell.associatedIds.includes(selectedCell.id)) {
          cell.isAssociated = true;
        } else {
          cell.isAssociated = false;
        }
      });
    }
  },

  created() {
    const indexFirstElementSelected = "0";
    this.cells = generateSudokuCells();

    this.cells.map(cell => {
      if (cell.associatedIds.includes(indexFirstElementSelected)) {
        cell.isAssociated = true;
      } else {
        cell.isAssociated = false;
      }
    });
  }
};
</script>
