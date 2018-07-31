<template>
  <div>
    <div id="card">
      <div class="loaded">
        <div class="chinese-character">
          <div>{{currentChar.chinese}}</div>
        </div>
        <div class="eye" v-if="answerHidden" @click="unhide">
          👁️
        </div>
        <div class="answer" v-if="!answerHidden">
          <div class="pinyin">{{currentChar.pinyin}}</div>
          <div class="english">{{currentChar.english}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { SHOW_ANSWER } from '../store/deck.module';

export default {
  name: 'FlashCard',
  computed: {
    ...mapGetters([
      'currentChar',
      'answerHidden'
    ])
  },
  methods: {
    ...mapMutations({
      unhide: SHOW_ANSWER
    })
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
