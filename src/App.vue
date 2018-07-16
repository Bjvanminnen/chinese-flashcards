<template>
  <div id="app">
    <FlashCard/>
  </div>
</template>

<script>
import FlashCard from './components/FlashCard'

export default {
  name: 'App',
  components: {
    FlashCard
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;  
  color: #2c3e50;
}
</style>
