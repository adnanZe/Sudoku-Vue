<template>
  <footer>
    <a href="">
      <i className="fa-brands fa-github"></i>
      {{ seeCode }}
    </a>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      seeCode: "see my code"
    };
  }
};
</script>

<style scoped>
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
}

i {
  width: 2rem;
  color: white;
  font-size: 1.5rem;
  margin-right: 0.5rem;
}

a {
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
