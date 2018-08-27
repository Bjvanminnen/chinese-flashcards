import Vue from 'vue';
import Vuex from 'vuex';

import deck from './deck.module';
import localStatePlugin, { getLocalState } from './localStatePlugin.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    deck
  },
  plugins: [
    localStatePlugin
  ]
});

const localState = getLocalState();
if (localState) {
  store.replaceState(localState);
}

export default store;
