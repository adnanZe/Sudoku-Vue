<template>
  <section class="sudoku">
    <div
      v-for="cell in cells"
      v-on:click="onCell(cell)"
      v-bind:class="{
        generated: cell.isReadOnly,
        active: cell.isSelected,
        associated: cell.isAssociated,
        matchNumber: cell.isMatchValue,
        displayNotes: Array.isArray(cell.value),
        wrong: cell.isWrongValue
      }"
    >
      <span v-if="Array.isArray(cell.value)" v-for="cellNotes in cell.value">{{
        cellNotes
      }}</span>

      <p v-if="!Array.isArray(cell.value)">{{ cell.value }}</p>
    </div>
  </section>
</template>

<script>
export default {
  props: ["cells"],
  data() {
    return {};
  },
  methods: {
    onCell: function(selectedCell) {
      this.$emit("onSelectCell", selectedCell);
    }
  }
};
</script>
