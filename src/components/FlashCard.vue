<template>
  <div id="card">
    <div v-if="characters.length === 0">Loading</div>
    <div v-if="characters.length > 0">
      <div class="chinese-character">
        <div>{{char.chinese}}</div>
      </div>
      <div class="inner">
        <div class="eye" v-if="hidden" @click="hidden = !hidden">
          👁️
        </div>
        <div class="answer" v-if="!hidden">
          <div class="pinyin">{{char.pinyin}}</div>
          <div class="english">{{char.english}}</div>
        </div>
        <div class="container">
          <div class="nav-button next" @click="newChar">⏭️</div>
          <div class="nav-button" @click="prevChar" v-if="characterIndex !== 0">⏮️</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getShuffledCharacters } from '../library';

export default {
  name: 'HelloWorld',
  data () {
    return {
      unshuffled: [],
      characters: [],
      characterIndex: 0,
      hidden: true,
    }
  },
  created() {
    // Get our characters async from github so I don't need to redeploy app whenever i add
    // characters (all i need to do is edit the json file)
    fetch('https://raw.githubusercontent.com/Bjvanminnen/chinese-flashcards/master/src/characters.json')
      .then(result => result.json())
      .then(json => {
        this.unshuffled.push(...json.characters);
        this.characters = getShuffledCharacters(this.unshuffled);
      });
  },
  computed: {
    char() {
      return this.characters[this.characterIndex];
    }
  },
  methods: {
    newChar() {
      this.characterIndex += 1;
      if (this.characterIndex >= this.characters.length) {
        this.characters.push(...getShuffledCharacters(this.unshuffled));
        if (this.characters[this.characterIndex].chinese ===
            this.characters[this.characterIndex - 1].chinese) {
          // if same as last letter, swap this with last new char
          const temp = this.characters[this.characterIndex];
          this.characters[this.characterIndex] = this.characters[this.characters.length - 1];
          this.characters[this.characters.length - 1] = temp;
        }
      }
      this.hidden = true;
    },
    prevChar() {
      if (this.characterIndex === 0) {
        return;
      }
      this.characterIndex -= 1;
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
.inner {
  margin: auto;
  width: 80%;
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
