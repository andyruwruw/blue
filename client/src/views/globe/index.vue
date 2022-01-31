<template>
  <div :class="$style.component">
    <globe-canvas />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import GlobeCanvas from './components/canvas.vue';

export default Vue.extend({
  name: 'Globe',

  components: {
    GlobeCanvas,
  },
});
</script>

<style lang="scss" module>
.component {
  display: block;
}
</style>
