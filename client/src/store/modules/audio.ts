import {
  ActionTree,
  GetterTree,
  Module,
  MutationTree,
} from 'vuex';

import { MUSIC } from '../../config';

interface AudioElementTracker {
  element: HTMLAudioElement;

  defaultVolume: number;

  ease: number;

  easeStart: number;
}

interface MusicElement {
  layers: AudioElementTracker[];

  name: string;

  index: number;
}

interface AudioModuleState {
  ready: boolean;

  interval: number;

  music: MusicElement | null;

  volume: {
    music: number;
    interactions: number;
  },
}

const defaultState = (): AudioModuleState => ({
  ready: false,

  interval: 0,

  music: null,

  volume: {
    music: 0.5,
    interactions: 0.5,
  },
});

const getters: GetterTree<AudioModuleState, any> = {
  isReady(state): boolean {
    return state.ready;
  },

  getMusic(state): MusicElement | null {
    return state.music;
  },

  getInterval(state): number {
    return state.interval;
  },

  getMusicVolume(state): number {
    return state.volume.music;
  },

  getInteractionsVolume(state): number {
    return state.volume.interactions;
  },
};

const mutations: MutationTree<AudioModuleState> = {
  setReady(state, ready: boolean): void {
    state.ready = ready;
  },

  setMusic(state, music: MusicElement): void {
    state.music = music;
  },

  setInterval(state, interval: number): void {
    state.interval = interval;
  },

  setMusicVolume(state, value: number): void {
    state.volume.music = value;

    if (state.music) {
      for (let i = 0; i < state.music.layers.length; i += 1) {
        state.music.layers[i].element.volume = value * state.music.layers[i].defaultVolume;
        state.music.layers[i].ease = value * state.music.layers[i].defaultVolume;
      }
    }
  },

  setInteractionsVolume(state, value: number): void {
    state.volume.interactions = value;
  },
};

const actions: ActionTree<AudioModuleState, any> = {
  domInteracted({ commit, dispatch, rootGetters }): void {
    if (rootGetters['audio/isReady']) {
      return;
    }

    commit('setReady', true);

    if (rootGetters['audio/getMusic'] === null) {
      dispatch('playMusic');

      const interval = setInterval(() => dispatch('update'), 500);
      commit('setInterval', interval);
    }
  },

  playMusic({ commit, rootGetters }): void {
    let index = 0;
    if (rootGetters['audio/getMusic'] !== null) {
      const currentlyPlaying = rootGetters['audio/getMusic'];

      index = (currentlyPlaying.index + 1) % MUSIC.length;

      for (let i = 0; i < currentlyPlaying.layers.length; i += 1) {
        currentlyPlaying.layers[i].element.pause();
      }
    }

    const music = MUSIC[index];
    const layers: AudioElementTracker[] = [];

    for (let i = 0; i < music.layers.length; i += 1) {
      const layer = new Audio(`./sound/music/${music.layers[i].fileName}`);
      layer.volume = music.layers[i].defaultVolume * rootGetters['audio/getMusicVolume'];

      layers.push({
        defaultVolume: music.layers[i].defaultVolume,
        ease: music.layers[i].defaultVolume * rootGetters['audio/getMusicVolume'],
        easeStart: -1,
        element: layer,
      } as AudioElementTracker);
    }

    for (let i = 0; i < layers.length; i += 1) {
      layers[i].element.play();
    }

    commit('setMusic', {
      index,
      layers,
      name: music.name,
    });
  },

  update({ dispatch, rootGetters }): void {
    if (rootGetters['audio/getMusic']) {
      const progress = rootGetters['audio/getMusic'].layers[0].element.currentTime / rootGetters['audio/getMusic'].layers[0].element.duration;

      if (progress > 0.99) {
        dispatch('playMusic');
      }
    }
  },
};

const module: Module<AudioModuleState, Record<string, any>> = {
  namespaced: true,
  state: defaultState(),
  getters,
  mutations,
  actions,
};

export default module;
