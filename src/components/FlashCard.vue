<template>
  <div id="card">
    <div class="chinese-character">
      <div>{{char.chinese}}</div>
    </div>
    <div class="eye" v-if="hidden" @click="hidden = !hidden">
      👁️
    </div>
    <div class="answer" v-if="!hidden">
      <div class="pinyin">{{char.pinyin}}</div>
      <div class="english">{{char.english}}</div>
    </div>
    <div class="next" @click="newChar">⏭️</div>
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
.next {
  text-align: right;
  margin: auto;
  width: 80%;
  font-size: 40px;
  cursor: pointer;
}
.chinese-character {
  font-size: 72px;
}
.eye {
  height: 130px;
  margin: auto;
  width: 80%;
  font-size: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed black;
  cursor: pointer;
  box-sizing: border-box;
}
.answer {
  margin: auto;
  height: 130px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  font-size: 32px;
}
.pinyin {
  font-family: 'Times New Roman', serif;
}
.english {
  margin-bottom: 10px;
}
</style>
