import Vue from 'vue';
import Vuex from 'vuex';

import audio from './modules/audio';
import globe from './modules/globe';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    audio,
    globe,
  },
});
