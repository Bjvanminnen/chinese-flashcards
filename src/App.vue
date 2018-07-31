<template>
  <div id="app">
    <LoadFlashCard/>
  </div>
</template>

<script>
import LoadFlashCard from './components/LoadFlashCard'

export default {
  name: 'App',
  components: {
    LoadFlashCard
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
