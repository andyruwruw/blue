import {
  ActionTree,
  GetterTree,
  Module,
  MutationTree,
} from 'vuex';

interface GlobeModuleState {
}

const defaultState = (): GlobeModuleState => ({

});

const getters: GetterTree<GlobeModuleState, any> = {

};

const mutations: MutationTree<GlobeModuleState> = {

};

const actions: ActionTree<GlobeModuleState, any> = {

};

const module: Module<GlobeModuleState, Record<string, any>> = {
  namespaced: true,
  state: defaultState(),
  getters,
  mutations,
  actions,
};

export default module;
