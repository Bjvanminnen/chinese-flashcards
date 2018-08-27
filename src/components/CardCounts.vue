<template>
  <div>
    <div class="count-container">
      <div class="button" @click="reset">🔄</div>
      <div class="count">{{numRemaining}}</div>
      <div class="count correct">{{numCorrect}}</div>
      <div class="count incorrect">{{numIncorrect}}</div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { resetLocalStorage } from '../store/localStatePlugin';

  export default {
    name: 'CardCounts',
    computed: {
      ...mapGetters([
        'numRemaining',
        'numCorrect',
        'numIncorrect',
      ])
    },
    methods: {
      reset() {
        resetLocalStorage();
        window.location.reload();
      }
    }
  }
</script>

<style scoped>
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

.button {
  font-size: 26px;
  line-height: 26px;
  cursor: pointer;
  user-select: none;
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
