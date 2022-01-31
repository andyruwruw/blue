<template>
  <div :class="$style.component">
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Home',
});
</script>

<style lang="scss" module>
.component {
  display: block;
}
</style>
