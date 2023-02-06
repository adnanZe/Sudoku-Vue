<template>
  <main></main>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped>
main {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

@media only screen and (min-width: 992px) {
  main {
    flex-direction: row;
  }
  .timer {
    height: auto;
    align-self: flex-start;
    transform: translateX(-175px);
  }
}
</style>
