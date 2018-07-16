<template>
  <div id="card">
    <div class="chinese-character">{{char.chinese}}</div>
    <div class="eye" v-if="hidden" @click="hidden = !hidden">👁️</div>
    <div class="answer" v-if="!hidden">
      <div class="pinyin">{{char.pinyin}}</div>
      <div>{{char.english}}</div>
    </div>
    <div @click="newChar">Next</div>
  </div>
</template>

<script>
import { getCharacter } from '../library';

export default {
  name: 'HelloWorld',
  data () {
    return {
      char: getCharacter(),
      hidden: true,
    }
  },
  methods: {
    newChar() {
      this.char = getCharacter();
      this.hidden = true;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#card {
  border: 1px solid black;
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  text-align: center;
}
.chinese-character {
  font-size: 72px;
}
.eye {
  height: 150px;
  margin: auto;
  width: 80%;
  font-size: 50px;
  border: 1px dashed black;
  cursor: pointer;
}
.answer {
  margin: auto
}
.pinyin {
  font-family: 'Times New Roman', serif;
}
</style>
