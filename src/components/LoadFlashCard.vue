<template>
  <div>
    <div v-if="!isLoaded">Loading...</div>
    <CardManager v-if="isLoaded"/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import CardManager from './CardManager';
  import { GET_CHARACTERS } from '../store/deck.module';

  export default {
    name: 'Loading',
    components: {
      CardManager,
    },
    computed: {
      ...mapGetters([
        'isLoaded'
      ])
    },
    created() {
      this.$store.dispatch(GET_CHARACTERS);
    },
  }
</script>
