<template>
  <div
    id="canvas"
    :class="$style.component">
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';

import {
  defaultState,
  GlobeState,
  initialize,
} from '../../../scripts/scenes/globe';
import { resize } from '../../../scripts/scenes';

export default Vue.extend<GlobeState, Record<string, any>, Record<string, any>>({
  name: 'Canvas',

  data: (): GlobeState => (defaultState),

  async mounted(): Promise<void> {
    const polygons = await this.getLowResolutionGlobe();

    initialize(
      'canvas',
      this.$data as GlobeState,
      polygons,
    );

    window.addEventListener('resize', () => { resize(this.$data as GlobeState); });
  },

  methods: {
    ...mapActions('globe', [
      'getLowResolutionGlobe',
    ]),
  },
});
</script>

<style lang="scss" module>
.component {
  display: block;
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
}
</style>
