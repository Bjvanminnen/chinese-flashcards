<template>
  <div id="card">
    <div class="chinese-character">{{character}}</div>
    <div class="eye" v-if="hidden" @click="hidden = !hidden">👁️</div>
    <div class="answer" v-if="!hidden">{{answer}}</div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      character: '水',
      hidden: true,
      answer: "water"
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
</style>
