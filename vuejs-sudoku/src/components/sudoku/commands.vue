<template>
  <section class="action-controls">
    <button id="new-game" class="new-game">
      {{ newGame }}
    </button>
    <button id="undo" class="undo">
      <i class="fa-solid fa-rotate-left"></i>
    </button>
    <button id="erase" class="erase">
      <i class="fa-solid fa-eraser"></i>
    </button>
    <button
      class="notes"
      id="notes"
      v-on:click="onNotes()"
      v-bind:class="{ on: this.isActiveNotes }"
    >
      <i class="fa-solid fa-pencil"></i>
    </button>
    <button
      v-for="number in numPad"
      class="number"
      v-on:click="onAddNumber(number)"
    >
      {{ number }}
    </button>
  </section>
</template>

<script>
export default {
  props: {
    isActiveNotes: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      newGame: "New Game",
      numPad: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    };
  },
  methods: {
    onNotes() {
      let isActive = this.isActiveNotes ? false : true;
      this.$emit("update-isActiveNotes", isActive);
    },

    onAddNumber(number) {
      this.$emit("onAddNumber", number);
    }
  }
};
</script>
