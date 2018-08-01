<template>
  <div>
    <div class="count-container">
      <div class="count">{{numRemaining}}</div>
      <div class="count correct">{{numCorrect}}</div>
      <div class="count incorrect">{{numIncorrect}}</div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'CardCounts',
    computed: {
      ...mapGetters([
        'numRemaining',
        'numCorrect',
        'numIncorrect',
      ])
    }
  }
</script>

<style>
.count-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: auto;
  margin-right: auto;
  margin-top: 4px;
  margin-bottom: 4px;
  width: 40%;
}

.count {
  font-size: 20px;
}

.correct {
  color: green;
  font-weight: bold;
}

.incorrect {
  color: red;
  font-weight: bold;
}
</style>
