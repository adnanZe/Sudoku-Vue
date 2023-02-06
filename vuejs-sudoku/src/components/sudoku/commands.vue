<template>
  <section class="action-controls">
    <button id="new-game" class="new-game">
      {{ newGame }}
    </button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      newGame: "New Game"
    };
  }
};
</script>
