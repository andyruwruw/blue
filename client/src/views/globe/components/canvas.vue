<template>
  <div
    id="canvas"
    :class="$style.component">
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import {
  defaultState,
  GlobeState,
  initialize,
} from '../../../scripts/scenes/globe';
import { resize } from '../../../scripts/scenes';

export default Vue.extend<GlobeState, Record<string, any>, Record<string, any>>({
  name: 'Canvas',

  data: (): GlobeState => (defaultState),

  mounted(): void {
    initialize('canvas', this.$data as GlobeState);

    window.addEventListener('resize', () => { resize(this.$data as GlobeState); });
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
