import {
  ActionTree,
  GetterTree,
  Module,
  MutationTree,
} from 'vuex';
import axios from 'axios';

export interface Vertex {
  x: number;
  y: number;
}

export interface Polygon {
  ancestor: number;
  area: number;
  areaFull: number;
  container: number;
  east: number;
  greenwich: number;
  id: string;
  level: number;
  n: number;
  north: number;
  points: Vertex[];
  source: number;
  south: number;
  version: number;
  west: number;
}

interface GlobeModuleState {
  lowResolution: Polygon[];
}

const defaultState = (): GlobeModuleState => ({
  lowResolution: [] as Polygon[],
});

const getters: GetterTree<GlobeModuleState, any> = {
  getLowResolutionPolygons(state) {
    return state.lowResolution;
  },
};

const mutations: MutationTree<GlobeModuleState> = {
  setLowResolutionPolygons(state, polygons: Polygon[]) {
    state.lowResolution = polygons;
  },
};

const actions: ActionTree<GlobeModuleState, any> = {
  async getLowResolutionGlobe({ commit }) {
    const response = await axios.get('/api/globe/0/-180/-90/360/180');

    if (response.status === 200) {
      const { polygons } = response.data;

      commit('setLowResolutionPolygons', polygons);
      return polygons;
    }

    return null;
  },
};

const module: Module<GlobeModuleState, Record<string, any>> = {
  namespaced: true,
  state: defaultState(),
  getters,
  mutations,
  actions,
};

export default module;
