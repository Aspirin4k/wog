<template>
    <span>
        <h1>{{ greetings }} </h1>
    </span>
</template>

<script>
  module.exports = {
      data: function() {
          return {
              greetings: 'Helloo trash'
          }
      }
  }
</script>

<style lang="sass" src="./styles/app.scss"></style>