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
      {{ cell.value }}
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
