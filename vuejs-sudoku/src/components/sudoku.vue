<template>
  <main>
    <grid :cells="cells" v-on:onSelectCell="onSelectCell($event)"></grid>
    <commands
      v-on:onAddNumber="onAddNumber($event)"
      :isActiveNotes="isActiveNotes"
      v-on:update-isActiveNotes="onNotes"
      :onErase="onErase"
      :onUndo="onUndo"
      :onNewGame="onNewGame"
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
      isActiveNotes: false,
      history: []
    };
  },
  methods: {
    onNewGame() {
      this.createGame();
    },

    onUndo() {
      if (!this.history.length) return;

      const latestUpdate = this.history[this.history.length - 1];
      const cellToUpdate = this.cells.filter(
        cell => cell.id === latestUpdate.id
      );

      if (
        Array.isArray(latestUpdate.value) &&
        Array.isArray(cellToUpdate[0].value)
      ) {
        let diffValue = cellToUpdate[0].value.filter(
          val => !latestUpdate.value.includes(val)
        );

        this.addNumberInNotes(latestUpdate, diffValue[0]);
      } else {
        this.addNumber(latestUpdate, latestUpdate.value);
      }

      this.updateSelectedCell(latestUpdate);
      this.updateMatchedNumber(latestUpdate);
      this.updateAssociatedIds(latestUpdate);

      this.history.pop();
    },

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
      const selectedCell = this.getSelectedCell();

      if (selectedCell.isReadOnly) return;

      this.addInHistory(selectedCell);

      if (this.isActiveNotes) {
        this.addNumberInNotes(selectedCell, number);
      } else {
        this.addNumber(selectedCell, number);
      }

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

    addInHistory(selectedCell) {
      this.history.push({
        ...selectedCell,
        value: JSON.parse(JSON.stringify(selectedCell.value))
      });
    },

    eraseNumber(selectedCell) {
      this.cells.map(cell => {
        if (cell.id === selectedCell.id) {
          return (cell.value = "");
        }
      });
    },

    addNumberInNotes(selectedCell, value) {
      if (!Array.isArray(selectedCell.value)) {
        selectedCell.value = Array(9).fill("");
      }

      if (selectedCell.value[Number(value) - 1] === value) {
        this.$set(selectedCell.value, Number(value) - 1, "");
      } else {
        this.$set(selectedCell.value, Number(value) - 1, value);
      }
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
    },

    createGame() {
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
  },

  created() {
    this.createGame();
  }
};
</script>
