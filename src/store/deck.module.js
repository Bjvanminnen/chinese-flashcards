import _ from 'lodash';
// TODO: think about how to differentiate actions/mutations
export const GET_CHARACTERS = 'deck/GET_CHARACTERS';

const INIT_CHARACTERS = 'deck/INIT_CHARACTERS';
const RESET_DECK = 'deck/RESET_DECK';
export const NEXT_CARD = 'deck/NEXT_CARD';
export const PREV_CARD = 'deck/PREV_CARD';

const state = {
  viewedStack: [],
  unseen: [],
  currentIndex: -1,
  unshuffled: [],
  correctStack: [],
  incorrectStack: [],
};

const getters = {
  isLoaded: state => state.viewedStack.length > 0,
  hasPrevious: state => state.currentIndex > 0,
  currentChar: state => state.viewedStack[state.currentIndex],
  onCurrentChar: state => state.currentIndex + 1 === state.viewedStack.length,

  numRemaining: state => state.unseen.length,
  numCorrect: state => state.correctStack.length,
  numIncorrect: state => state.incorrectStack.length,
};

// TODO: should really have deterministic shuffling/randomness
function shuffle(characters) {
  return _.shuffle(characters).map(c => ({
    chinese: c[0],
    pinyin: c[1],
    english: c[2],
  }));
}

const actions = {
  [GET_CHARACTERS] ({ commit, state }, params) {
    if (state.unshuffled.length) {
      // We already got chars from local storage
      return;
    }
    // TODO: could emulate "Service" approach
    fetch('https://raw.githubusercontent.com/Bjvanminnen/chinese-flashcards/master/src/characters.json')
    .then(result => result.json())
    .then(json => {
      commit(INIT_CHARACTERS, json.characters);
      commit(RESET_DECK);
      commit(NEXT_CARD);
    });
  }
};

const mutations = {
  [INIT_CHARACTERS] (state, characters) {
    state.unshuffled = characters;
  },

  [RESET_DECK] (state) {
    if (state.unshuffled.length === 0) {
      throw new Error('no characters available');
    }
    // state.correct = [];
    // state.incorrect = [];
    state.unseen = shuffle(state.unshuffled);
  },

  [NEXT_CARD] (state, correct) {
    if (state.currentIndex + 1 === state.viewedStack.length) {
      if (state.unseen.length === 0 && state.incorrectStack.length === 0) {
        state.unseen = shuffle(state.unshuffled);
        // TODO: In the case where we got a new batch of cards, make sure we have
        // a different character
      }

      let nextChar;
      const r = ~~(Math.random() * (state.unseen.length + state.incorrectStack.length));
      if (r < state.unseen.length) {
        // Just pull the next one off the front since they've already been shuffled
        nextChar = state.unseen.shift();
      } else {
        // pull from incorrect stack
        // TODO: kind of weird that after we've pulled a wrong char, it's not
        // included in any of our counts
        nextChar = state.incorrectStack.splice(r - state.unseen.length, 1)[0];
      }

      // adjust our correct/incorrect stacks
      // Important that this happens after grabbing our next char so that we dont
      // grab this last one we just got wrong
      const curChar = state.viewedStack[state.viewedStack.length - 1];
      if (correct === true) {
        state.correctStack.push(curChar);
      } else if (correct === false) {
        state.incorrectStack.push(curChar);
      }

      state.viewedStack.push(nextChar);
    }

    state.currentIndex++;
  },

  [PREV_CARD] (state) {
    if (state.currentIndex <= 0) {
      throw new Error('cant go back');
    }
    state.currentIndex -= 1;
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
