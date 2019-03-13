<template>
  <div>
    <div id="card">
      <div class="chinese-character">
        <div>
          {{currentChar.chinese}}
        </div>
      </div>
      <div>
        <audio ref="audio" v-bind:src="audioUrl" v-on:error="audioCantPlay" type="audio/mp3"/>
        <div class="button" @click="play" v-if="canPlay">▶️</div>
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

function numericize(pinyin) {
  // Note: still missing some (ie. differences in third tone accents)
  return pinyin
    .replace(/ā/g, 'a1')
    .replace(/á/g, 'a2')
    .replace(/ǎ/g, 'a3')
    .replace(/à/g, 'a4')

    .replace(/ē/g, 'e1')
    .replace(/é/g, 'e2')
    .replace(/ĕ/g, 'e3')
    .replace(/ě/g, 'e3')
    .replace(/è/g, 'e4')

    .replace(/ī/g, 'i1')
    .replace(/í/g, 'i2')
    .replace(/ǐ/g, 'i3')
    .replace(/ì/g, 'i4')

    .replace(/ō/g, 'o1')
    .replace(/ó/g, 'o2')
    .replace(/ǒ/g, 'o3')
    .replace(/ò/g, 'o4')

    .replace(/ū/g, 'u1')
    .replace(/ú/g, 'u2')
    .replace(/ǔ/g, 'u3')
    .replace(/ǔ/g, 'u3')
    .replace(/ù/g, 'u4')

    .replace(/ǚ/g, 'v3')
}

export default {
  name: 'FlashCard',
  data: () => {
    return {
      hidden: true,
      canPlay: true,
    };
  },
  computed: {
    ...mapGetters([
      'currentChar',
      'onCurrentChar',
    ]),
    audioUrl: state => {
      const numericalPinyin = numericize(state.currentChar.pinyin);
      return `https://www.hantrainerpro.de/resources/pronunciations/${numericalPinyin}.mp3`;
    }
  },
  methods: {
    play() {
      this.$refs.audio.play();
    },
    audioCantPlay() {
      this.canPlay = false;
    }
  },
  watch: {
    currentChar() {
      this.canPlay = true;
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
  height: 350px;
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

/* same as CardManager.vue, which seems like an anti-pattern*/
.button {
  font-size: 40px;
  cursor: pointer;
  user-select: none;
  display: inline-block;
}
.button:hover {
  text-shadow: 3px 3px lightgray;
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
