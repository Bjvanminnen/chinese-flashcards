<template>
  <div>
    <div v-if="!isLoaded">Loading...</div>
    <FlashCard v-if="isLoaded"/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import FlashCard from './FlashCard';
  import { GET_CHARACTERS } from '../store/deck.module';

  export default {
    name: 'Loading',
    components: {
      FlashCard,
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
