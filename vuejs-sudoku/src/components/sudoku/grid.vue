<template>
  <section class="sudoku">
    <div v-for="cell in cells" v-on:click="">
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
    onCell: function() {
      console.log("hit");
    }
  }
};
</script>
