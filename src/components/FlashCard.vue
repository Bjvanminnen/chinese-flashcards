<template>
  <div>
    <div id="card">
      <div class="chinese-character">
        <div>{{currentChar.chinese}}</div>
      </div>
      <div class="eye" v-if="hidden" @click="hidden = false">
        👁️
      </div>
      <div class="answer" v-if="!hidden">
        <div class="pinyin">{{currentChar.pinyin}}</div>
        <div class="english">{{currentChar.english}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'FlashCard',
  data: () => {
    return {
      hidden: true
    };
  },
  computed: {
    ...mapGetters([
      'currentChar',
      'onCurrentChar',
    ])
  },
  watch: {
    currentChar() {
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
  height: calc(100% - 40px);
  width: calc(100% - 40px);
  font-size: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed black;
  cursor: pointer;
  margin: 20px;
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
