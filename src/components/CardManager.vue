<template>
  <div>
    <div class="row">
      <div class="nav-button-container">
        <div class="button nav-button" @click="prevChar" v-if="hasPrevious">⏮️</div>
      </div>
      <div>
        <CardCounts/>
        <FlashCard/>
        <div class="answer-button-container">
          <div class="button answer-button" @click="newChar" v-if="onCurrentChar">❌</div>
          <div class="button answer-button" @click="newChar" v-if="onCurrentChar">✅</div>
          <div class="button" v-if="!onCurrentChar">&nbsp;</div>
        </div>
      </div>
      <div class="nav-button-container">
        <div class="button nav-button" @click="newChar" v-if="!onCurrentChar">⏭️</div>
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
        'onCurrentChar',
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

.button {
  font-size: 40px;
  cursor: pointer;
  user-select: none;
}
.button:hover {
  text-shadow: 3px 3px lightgray;
}

.nav-button-container {
  width: 60px;
  display: flex;
  align-self: center;
}

.nav-button {
  margin: auto;
}

.answer-button-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.answer-button {
  margin: 5px;
}
</style>
