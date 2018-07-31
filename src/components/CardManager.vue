<template>
  <div>
    <div class="row">
      <div class="nav-button-container">
        <div class="nav-button" @click="prevChar" v-if="hasPrevious">⏮️</div>
      </div>
      <div>
        <CardCounts/>
        <FlashCard/>
      </div>
      <div class="nav-button-container">
        <div class="nav-button" @click="newChar">⏭️</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { NEXT_CARD, PREV_CARD } from '../store/deck.module';
  import CardCounts from './CardCounts';
  import FlashCard from './FlashCard';

  export default {
    name: 'CardManager',
    components: {
      CardCounts,
      FlashCard
    },
    computed: {
      ...mapGetters([
        'hasPrevious',
      ])
    },
    methods: {
      newChar() {
        this.$store.commit(NEXT_CARD);
        this.hidden = true;
      },
      prevChar() {
        this.$store.commit(PREV_CARD);
      }
    }
  }
</script>

<style>
.row {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.nav-button-container {
  width: 60px;
  display: flex;
  align-items: center;
}

.nav-button {
  font-size: 40px;
  cursor: pointer;
  user-select: none;
  margin: auto;
}

</style>
