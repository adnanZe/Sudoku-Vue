<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ greeting() }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: 'fist vue file!'
    }
  },

  methods: {
    greeting: function() {
      return 'heey'
    }
  }
}
</script>

<style>

</style>
