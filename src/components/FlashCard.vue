<template>
  <div>
    <div id="card">
      <div v-if="!isLoaded">Loading</div>
      <div v-if="isLoaded" class="loaded">
        <div class="chinese-character">
          <div>{{currentChar.chinese}}</div>
        </div>
        <div class="eye" v-if="hidden" @click="hidden = !hidden">
          👁️
        </div>
        <div class="answer" v-if="!hidden">
          <div class="pinyin">{{currentChar.pinyin}}</div>
          <div class="english">{{currentChar.english}}</div>
        </div>
        <div class="container">
          <div class="nav-button next" @click="newChar">⏭️</div>
          <div class="nav-button" @click="prevChar" v-if="hasPrevious">⏮️</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { GET_CHARACTERS, NEXT_CARD, PREV_CARD } from '../store/deck.module';

export default {
  name: 'FlashCard',
  data () {
    return {
      hidden: true,
    }
  },
  created() {
    this.$store.dispatch(GET_CHARACTERS);
  },
  computed: {
    ...mapGetters([
      'isLoaded',
      'hasPrevious',
      'currentChar'
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#card {
  border: 1px solid black;
  width: 300px;
  height: 360px;
  display: flex;
  flex-direction: column;
  text-align: center;
}
.loaded {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.container {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
}
.nav-button {
  margin-top: 4px;
  font-size: 40px;
  cursor: pointer;
  user-select: none;
}
.prev {
  text-align: left;
}
.next {
  text-align: right;
}
.chinese-character {
  font-size: 72px;
}
.eye {
  height: 130px;
  font-size: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed black;
  cursor: pointer;
  box-sizing: border-box;
}

.eye, .container {
  margin-left: auto;
  margin-right: auto;
  width: 80%;
}

.answer {
  margin: auto;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.pinyin {
  font-family: 'Times New Roman', serif;
  font-size: 32px;
  margin-bottom: 5px;
}
.english {
  margin-bottom: 10px;
  font-size: 20px;
}
</style>
